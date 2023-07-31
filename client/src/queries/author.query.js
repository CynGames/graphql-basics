import {gql} from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
    query {
        authors {
            name
            dateOfBirth
        }
    }
`

export const GET_AUTHOR_BY_NAME = gql`
    query GetAuthorByName($name: String!) {
        author(name: $name) {
            name
            dateOfBirth
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation UpdateAuthor($name: String!, $input: AuthorMutation!) {
        updateAuthor(name: $name, input: $input) {
            name
            dateOfBirth
        }
    }
`
