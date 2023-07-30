require('dotenv').config();

export default {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
}
