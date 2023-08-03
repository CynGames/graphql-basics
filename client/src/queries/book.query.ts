import { gql } from '@apollo/client';
import {AUTHOR_DETAILS} from "./author.query";

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
    }
`

export const GET_ALL_BOOKS = gql`
    query {
        books {
            ...BookDetails
            author {
                ...AuthorDetails
            }
        }
    }
    ${BOOK_DETAILS}
    ${AUTHOR_DETAILS}
`

export const GET_ALL_BOOKS_WITH_PARAMS = gql`
    query Books($title: String, $genres: [String!]) {
        books(title: $title, genres: $genres) {
            ...BookDetails
            author {
                ...AuthorDetails
            }
        }
    }
    ${BOOK_DETAILS}
    ${AUTHOR_DETAILS}
`

export const GET_BOOK_BY_NAME = gql`
    query GetBookByName($title: String!) {
        book(title: $title) {
            ...BookDetails
            author {
                ...AuthorDetails
            }
        }
    }
    ${BOOK_DETAILS}
    ${AUTHOR_DETAILS}
`

export const CREATE_BOOK = gql`
    mutation CreateBook($input: BookMutation!) {
        createBook(input: $input) {
            id
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const UPDATE_BOOK = gql`
    mutation UpdateBook($title: String!, $input: BookMutation!) {
        updateBook(title: $title, input: $input) {
            id
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const DELETE_BOOK = gql`
    mutation DeleteBook($title: String!) {
        deleteBook(title: $title) {
            title
        }
    }
`

export const BOOK_ADDED = gql`
    subscription  {
        createBook {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
