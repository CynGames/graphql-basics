import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
    fragment UserDetails on User {
        username
        favoriteGenre
    }
`

export const GET_ALL_USERS = gql`
    query {
        users {
            ...UserDetails
        }
    }
    ${USER_DETAILS}
`

export const GET_USER_BY_NAME = gql`
    query User($username: String!){
        user (username: $username) {
            ...UserDetails
        }
    }
    ${USER_DETAILS}
`

export const CREATE_USER = gql`
    mutation CreateUser($input: UserMutation!) {
        createUser(input: $input) {
            ...UserDetails
        }
    }
    ${USER_DETAILS}
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($username: String!, $input: UserMutation!) {
        updateUser(username: $username, input: $input) {
            ...UserDetails
            id
        }
    }
    ${USER_DETAILS}
`

export const DELETE_USER = gql`
    mutation DeleteUser($username: String!) {
        deleteUser(username: $username) {
            ...UserDetails
            id
        }
    }
    ${USER_DETAILS}
`
