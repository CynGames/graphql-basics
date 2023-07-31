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

export const CREATE_BOOK = gql`
    mutation CreateBook($input: BookMutation!) {
        createBook(input: $input) {
            id
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
