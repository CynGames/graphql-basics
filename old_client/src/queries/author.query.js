import {gql} from '@apollo/client';

export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        dateOfBirth
    }
`
export const GET_ALL_AUTHORS = gql`
    query {
        authors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const GET_AUTHOR_BY_NAME = gql`
    query GetAuthorByName($name: String!) {
        author(name: $name) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const CREATE_AUTHOR = gql`
    mutation CreateAuthor($input: AuthorMutation!) {
        createAuthor(input: $input) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const UPDATE_AUTHOR = gql`
    mutation UpdateAuthor($name: String!, $input: AuthorMutation!) {
        updateAuthor(name: $name, input: $input) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const DELETE_AUTHOR = gql`
    mutation DeleteAuthor($name: String!) {
        deleteAuthor(name: $name) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`
