import { React, useState }from 'react'
import Spinner from '../componenets/Spinner'
import BackButton from '../componenets/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteBook = () =>{
    setLoading(true)

    axios.delete(`http://localhost:5555/books/${id}`)
      .then(()=>{
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'})
        setLoading(true)
        navigate('/')

      }).catch(error)
      {
        setLoading(false)
        enqueueSnackbar('Error', {variant: 'error'})
        alert("An error occured. Check console")
        console.log(error)
      }
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      <div>
        {
          loading? <Spinner/>: (
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w=[600px] p-8 mx-auto'>
              <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
              <button
                className='p-4 bg-red-400 text-white m-8 w-full'
                onClick={handleDeleteBook}
              >Yes</button>
            </div>
          )
        }
      </div>
      
    </div>
  )
}

export default DeleteBook
