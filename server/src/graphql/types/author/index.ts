export default `
    type Query {
        authors: [Author]
        author(id: ID!): Author
    }
    
    type Mutation {
        createAuthor(input: AuthorMutation): Author
        updateAuthor(input: AuthorMutation): Author
        deleteAuthor: String
    }
    
    type Subscription {
        newAuthor: Author!
    }
    
    type Author {
        id: ID!
        name: String!
        dateOfBirth: Int
    }
    
    input AuthorMutation {
        id: ID
        name: String!
        dateOfBirth: Int
    }
`;
