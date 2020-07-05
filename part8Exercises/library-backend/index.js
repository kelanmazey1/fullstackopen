const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
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

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/


const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
      ): [Book!]
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
    allBooks: async (root, args) => {
      const { author, genre } = args;
      const books = await Book.find({})
        .populate('author', {
          name: 1,
          bookCount: 1, 
        });
      const authors = await Author.find({});
      
      const booksWrittenByAuthor = books.filter((book) =>
        book.author.currentAuthorNames === author);

      const booksInGenre = books.filter((book) => 
        book.genres.includes(genre));
      
      if (!genre) {
        return books
      } else {
        return booksInGenre
      }
      // } else if (!author && genre) {
      //   return booksInGenre
      // } else {
      //   const booksInGenreAndByAuthor = booksWrittenByAuthor.filter((book) =>
      //     booksInGenre.includes(book));
      //   return booksInGenreAndByAuthor;
      // }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticat")
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
    login: async(root, args) => {
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