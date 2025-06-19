import dotenv from 'dotenv'
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};