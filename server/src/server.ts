import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import schema from './graphql';
import authenticateToken from './middleware/auth.middleware';

import {BookRepository, AuthorRepository, UserRepository} from './repository';
import {UserService, AuthorService, BookService} from './service';

import {WebSocketServer} from "ws";
import {useServer} from "graphql-ws/lib/use/ws";



// Cual es el rule de thumb para los types?
export async function createExpressServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })

    const bookRepository = new BookRepository();
    const authorRepository = new AuthorRepository();
    const userRepository = new UserRepository();

    const bookService = new BookService(bookRepository);
    const authorService = new AuthorService(authorRepository);
    const userService = new UserService(userRepository);

    const contextObject = {
        bookService,
        authorService,
        userService
    };

    const serverCleanup = useServer({schema}, wsServer)
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }],
    });

    await server.start();

    app.use('/',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        authenticateToken(userRepository),
        expressMiddleware(server, {
            context: async ({req}: any) => {
                const user = req.user;

                return {
                    ...contextObject,
                    user
                }
            },
        }),
    );

    return app;
}
