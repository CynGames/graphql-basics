import { createExpressServer } from './server';

import mongoose from 'mongoose';
import config from "../src/config";

require('dotenv').config();

console.log('Connecting to MongoDB...');

mongoose.connect(config.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB');

        const server = createExpressServer();
        const PORT = config.PORT || 4000;

        server.then(app => {
            app.listen(PORT, () => {
                console.log(`Server ready at http://localhost:${PORT}/graphql`);
            });
        });
    })
    .catch((error: Error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

// mongoose.set('debug', true);
