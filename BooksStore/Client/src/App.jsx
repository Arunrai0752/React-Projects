import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Post from './pages/Post';
import About from './pages/About';
import Collection from './pages/Collections';
import MyBooks from './pages/MyBooks';



function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
mybooks          <Route path='/' element={<Home/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/collections' element={<Collection/>} />
          <Route path='/mybooks' element={<MyBooks/>} />
        </Routes>
      </BrowserRouter>

   
  )
}

export default App
