import React from 'react' 
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../componenets/Spinner'
import BackButton from '../componenets/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const UpdateBooks = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setLoading(false)
        setAuthor(response.data.author)
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        enqueueSnackbar('Book Updated Successfully', {variant: 'success'})
      })
      .catch((error)=>{
        enqueueSnackbar('Error', {variant: 'error'})
        alert("An error happened. Please check console")
        console.log(error)
        setLoading(false)
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title, 
      author, 
      publishYear,
    };
    setLoading(true)
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false)
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        alert("An error happened. Please check console")
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='my-4 text-3xl'>Edit Book</h1>
      {loading ? <Spinner /> : ""}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor='title' className='text-xl text-gray-500 block mb-2'>Title</label>
          <input 
              id='title'
              type="text" 
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label htmlFor='author' className='text-xl text-gray-500 block mb-2'>Author</label>
          <input 
              id='author'
              type="text" 
              value={author}
              onChange={(e)=>{setAuthor(e.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label htmlFor='publishYear' className='text-xl text-gray-500 block mb-2'>Publish Year</label>
          <input 
              id='publishYear'
              type="number" 
              value={publishYear}
              onChange={(e)=>{setPublishYear(e.target.value)}}
              className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default UpdateBooks
