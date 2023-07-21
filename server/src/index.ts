import mongoose from 'mongoose';
import { createExpressServer } from './server';

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB');

        const server = createExpressServer();
        const PORT = process.env.PORT || 4000;

        server.then(app => {
            app.listen(PORT, () => {
                console.log(`Server ready at http://localhost:${PORT}/graphql`);
            });
        });
    })
    .catch((error: Error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });
