import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url= process.env.DB_URL;

export const connectusingMongoose = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
