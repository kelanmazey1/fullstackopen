import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
    }
  }`

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

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($name: String!, $year: Int!){
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      name
      born
    }
  }`