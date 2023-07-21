import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      dateOfBirth,
      id,
      bookCount
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      dateOfBirth
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthorByName($name: String!, $dateOfBirth: Int!) {
    editAuthor(name: $name, dateOfBirth: $dateOfBirth) {
      name
      dateOfBirth
      id
    }
}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      id,
      author {
        name
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
        dateOfBirth
        bookCount
      }
    }
  }
`
