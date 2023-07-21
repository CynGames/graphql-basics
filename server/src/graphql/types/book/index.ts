export default `
    type Query {
        books: [Book]
        book(id: ID!): Book
    }
    
    type Mutation {
        createBook(input: BookMutation): Book
        updateBook(input: BookMutation): Book
        deleteBook: String
    }
    
    type Subscription {
        newBook: Book!
    }
    
    type Book {
        id: ID!
        title: String!
        published: Int!
        author: Author!
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
