import express from "express"
import { Book } from "../models/bookModel.js"
const router = express.Router()
//to update the books
router.post('/', async(request, response)=>{
    try{
        if(!request.body.author || !request.body.title || !request.body.publishYear)
        {
            return response.status(400).send({
                message: "Send All Required Fields",
            })
        }
        const newBook = {
           author:   request.body.author,
           title : request.body.title,
           publishYear: request.body.publishYear
        };

        const book = await(Book).create(newBook);

        return response.status(201).send(book)
       
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
})


//to get one book 
router.get("/:id", async(request, response)=>{
    try {
        
        const {id} = request.params;

        const book = await Book.findById(id)

        return response.status(200).json(book)
        
    } catch (error) {
        
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//to get all the books
router.get("/", async(request, response)=>{
    try {
        
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
        
    } catch (error) {
        
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//new route to put a book
router.put("/:id", async(request, response)=>{
    try {

        if(!request.body.author || !request.body.title || !request.body.publishYear)
            {
                return response.status(400).send({
                    message: "Send All Required Fields",
                })
            }
        
            const {id} = request.params;
            const result = await Book.findByIdAndUpdate(id, request.body) 
            
            if(!result)
            {
                return response.status(404).json({message: 'Book Not Found'})
            }
            
            
            return response.status(200).json({message: 'Found The Book and Updated'})
            
        
    } catch (error) {
        
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//delteing a book
router.delete("/:id", async (request, response)=>{
    try {

        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id)
        
        if(!result)
        {
            return response.status(404).json({"message": "Book Not Found"})
        }
        return response.status(200).json({"message": "Book Deleted Successfully"})
        
    } catch (error) {

        console.log(error.message)
        response.status(500).send({message: error.message})
        
    }
})

export default router;