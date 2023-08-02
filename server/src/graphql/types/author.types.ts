export default `
    type Query {
        authors: [Author]!
        author(name: String!): Author!
    }
    
    type Mutation {
        createAuthor(input: AuthorMutation!): Author!
        updateAuthor(name: String!, input: AuthorMutation): Author!
        deleteAuthor(name: String!): Author!
    }
    
    type Author {
        id: ID!
        name: String!
        dateOfBirth: Int
    }
    
    input AuthorMutation {
        name: String!
        dateOfBirth: Int!
    }
`;
