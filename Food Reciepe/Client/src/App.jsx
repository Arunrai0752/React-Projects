import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Post from './pages/Post';
import About from './pages/About';
import Collection from './pages/Collections';



function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/collections' element={<Collection/>} />
        </Routes>
      </BrowserRouter>

   
  )
}

export default App
