import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }`

export const GET_BOOKS = gql`
  query getBooks($showRecommended: Boolean!){
    getBooks(showRecommended: $showRecommended) {
      genre
      books {   
        title
        author {
          name
          born
          bookCount
        }
      published
      genres
        }
    }
  }
  `

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($name: String!, $year: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      name
      born
      bookCount
    }
  }`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      id
      favouriteGenre
    }
  }
`