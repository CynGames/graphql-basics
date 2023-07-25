export default `
    type Query {
        books: [Book!]!
        book(title: String!): Book!
    }
    
    type Mutation {
        createBook(input: BookMutation): Book!
        updateBook(title: String!, input: BookMutation): Book!
        deleteBook(title: String!): Book!
    }
    
    type Subscription {
        newBook: Book!
    }
    
    type Book {
        id: ID!
        title: String!
        published: Int
        author: Author
        genres: [String!]!
    }
    
    input BookMutation {
        id: ID
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    }
`;
