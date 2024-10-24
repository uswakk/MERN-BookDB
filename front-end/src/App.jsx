import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./assets/pages/Home.jsx"
import DeleteBooks from "./assets/pages/DeleteBook.jsx"
import CreateBooks from './assets/pages/CreateBooks.jsx'
import ShowBooks from "./assets/pages/ShowBooks.jsx"
import UpdateBooks from "./assets/pages/UpdateBooks.jsx"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books/create' element={<CreateBooks/>}></Route>
      <Route path='/books/details/:id' element={<ShowBooks/>}></Route>
      <Route path='/books/edit/:id' element={<UpdateBooks/>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBooks/>}></Route>
    </Routes>
  )
}

export default App
