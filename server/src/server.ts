import express, { Express } from 'express';
import {ApolloServer} from 'apollo-server-express';

import BookRepository from "./repository/book";
import AuthorRepository from "./repository/author";

import schema from './graphql';

export async function createExpressServer(): Promise<Express> {
    const app = express();

    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                bookRepository: new BookRepository(),
                authorRepository: new AuthorRepository(),
            };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    return app;
}
