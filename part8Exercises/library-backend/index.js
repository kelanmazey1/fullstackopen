const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);

console.log('connecting to', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const pubsub = new PubSub();

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type BookList {
    genre: String,
    books: [Book!]
  }

  type Author {
    name: String
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    getBooks(
      author: String
      genre: String
      showRecommended: Boolean!
      ): BookList
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: ()  => Book.collection.countDocuments(),
    authorCount: ()  => Author.collection.countDocuments(),
    getBooks: async (root, args, context) => {
      const { showRecommended } = args;
      const { currentUser } = context;

      let userFavGenre;
      // if there is a user in the context and recommended books are requested set genre
      if (currentUser && showRecommended) {
        userFavGenre = currentUser.favouriteGenre;
      }

      // otherwise return all books in the DB
        const books = await Book.find({})
        .populate('author', {
          name: 1,
          bookCount: 1,
          genres: 1, 
        });
        // filter list of books
        const booksInGenre = books.filter((book) =>
          book.genres.includes(userFavGenre) || book.genres.map((genre) => genre.toLowerCase()).includes(userFavGenre)
        );
        
        if (!userFavGenre) {
          return {
            genre: 'all',
            books
          }
        } else {
          return {
            genre: userFavGenre,
            books: booksInGenre
          }
        }
    },
    allAuthors: () => Author.find({}).populate('bookCount'),
    me: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      return context.currentUser;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      // check if author being added is already in database
      const currentAuthors = await Author.find({});

      const currentAuthorNames = currentAuthors.map((a) => a.name);
      // create new author object and save to DB if they're not currently there
      if (!((currentAuthorNames).includes(args.author))) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
      }
      // if author is already in DB find document
      const authorDocument = await Author.findOne({ name: args.author });
      
      // create new book object to save

      const book = new Book({
        ...args,
        author: authorDocument,
      });

      // save the book 
      try {
        await book.save();
        // add book to author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) {
        return null;
      }
      authorToEdit.born = args.setBornTo;
      authorToEdit.save();
      return authorToEdit;
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args; 
      const user = new User({
        username,
        favouriteGenre
        });

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
     
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }

  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Author: {
    bookCount: async (root) => {
      // get all books currently in the DB
      const books = await Book.find({})
        .populate('author', { name: 1, born: 1 })

      // return all the books where the authors name matches 
      return books.filter((book) => book.author.name === root.name).length;
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if ( auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})