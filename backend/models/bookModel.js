//the above is a simple way to create a model for book
//used mongoose.js for this //should create separate folders for models 

import mongoose, { mongo } from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type: String, 
            required: true,
        },
        author:{
            type: String, 
            required: true,
        },
        publishYear :{
            type: Number, 
            required: true,
        }
        

    },
    {
        timestamps: true
    }
)

export const Book = mongoose.model('Book', bookSchema);