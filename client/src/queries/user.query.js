import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query {
        users {
            username
            favoriteGenre
        }
    }
`

export const GET_USER_BY_NAME = gql`
    query User($username: String!){
        user (username: $username) {
            username
            favoriteGenre
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($input: UserMutation!) {
        createUser(input: $input) {
            username
            favoriteGenre
        }
    }
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
            username
            favoriteGenre
            id
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($username: String!) {
        deleteUser(username: $username) {
            username
            favoriteGenre
            id
        }
    }
`
