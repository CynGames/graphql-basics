export default `    
    type Query {
        users: [User!]!
        user(username: String!): User!
    }
    
    type Mutation {
        createUser(input: UserMutation!): User!
        updateUser(username: String!, input: UserMutation): User!
        deleteUser(username: String!): User!
        login(username: String!, password: String!): Token!
    }
    
    type User {
        id: ID!
        username: String!
        favoriteGenre: String
    }
    
    input UserMutation {
        username: String!
        password: String
        favoriteGenre: String
    }
    
    type Token {
        value: String!
    }
`;
