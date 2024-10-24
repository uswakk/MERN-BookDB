import express, { request } from "express"
import {PORT, mongoDBUrl} from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import router from "./routes/booksRoute.js";
import cors from "cors"

const app = express();

//creating a new route since the application can not get an existing rounte 
//error was connot get route 
app.use(cors());
//middleware for parsing the body
app.use(express.json())

app.get('/', (request, response)=>{
console.log(response)

return response.status(234).send("WELCOME TO USWA's BOOKSTORE")

})

app.use('/books', router)

mongoose
    .connect(mongoDBUrl)
    .then(()=>{
        console.log("App Connected To The DataBase")
        app.listen(PORT, ()=>{
            console.log(`Listening form PORT ${PORT}`)
        })
        
       
    })
    .catch((error)=>{
        console.log(error)
    })