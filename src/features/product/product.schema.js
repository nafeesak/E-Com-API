import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    inStock: {
        type: Number,
    }
});