import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../componenets/Spinner'
import BackButton from '../componenets/BackButton.jsx'
import { useParams } from 'react-router-dom'
import axios from "axios"

const ShowBooks = () => {

  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true)
    axios
        .get(`http://localhost:5555/books/${id}`)
        .then((response)=>{
          console.log("No error. App connected to backend")
          console.log(response.data)
          setBook(response.data)
          setLoading(false)
        })
        .catch((error)=>{
          console.log(error)
          setLoading(false)
        })

  }, [])
  
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>
        Show Book
      </h1>
      {
        loading? 
        (<Spinner/>):
        (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>ID</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Time Created</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Updated</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowBooks
