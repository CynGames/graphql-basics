import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
    query {
        books {
            title
            published
            genres
            author {
                name
                dateOfBirth
            }
        }
    }
`

export const GET_ALL_BOOKS_WITH_PARAMS = gql`
    query Books($title: String, $genres: [String!]) {
        books(title: $title, genres: $genres) {
            title
            published
            genres
            author {
                name
                dateOfBirth
            }
        }
    }
`

export const GET_BOOK_BY_NAME = gql`
    query GetBookByName($title: String!) {
        book(title: $title) {
            title
            published
            author {
                name
                dateOfBirth
            }
        }
    }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($input: BookMutation!) {
        createBook(input: $input) {
            id
            title
            published
            genres
        }
    }
`

export const UPDATE_BOOK = gql`
    mutation UpdateBook($title: String!, $input: BookMutation!) {
        updateBook(title: $title, input: $input) {
            id
            title
            published
            genres
        }
    }
`

export const DELETE_BOOK = gql`
    mutation DeleteBook($title: String!) {
        deleteBook(title: $title) {
            title
        }
    }
`

