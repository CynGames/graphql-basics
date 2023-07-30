import express, {Express} from 'express';
import {ApolloServer} from 'apollo-server-express';

import BookRepository from "./repository/book";
import AuthorRepository from "./repository/author";
import UserRepository from "./repository/user";

import UserService from "./service/user";
import AuthorService from "./service/author";
import BookService from "./service/book";

import schema from './graphql';
import authenticateToken from "./middleware/auth";


export async function createExpressServer(): Promise<Express> {
    const app = express();

    const bookRepository = new BookRepository();
    const authorRepository = new AuthorRepository();
    const userRepository = new UserRepository();

    const bookService = new BookService(bookRepository);
    const authorService = new AuthorService(authorRepository);
    const userService = new UserService(userRepository);

    // Maybe later split the repos and the services into separate objects
    const contextObject = {
        bookRepository,
        authorRepository,
        userRepository,
        bookService,
        authorService,
        userService
    };

    app.use(authenticateToken(userRepository));

    const server = new ApolloServer({
        schema,
        context: async ( {req}: any ) => {
            const user = req.user;

            return {
                ...contextObject,
                user
            }
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    return app;
}
