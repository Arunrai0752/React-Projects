import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../config/api';

const Post = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/getData");
        if (res.data.data?.email) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBookData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddBook = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Please login to add a book");
        navigate('/');
        return;
      }

      if (!bookData.title || !bookData.author || !bookData.category) {
        toast.error("Please fill all required fields");
        return;
      }

      setIsLoading(true);
      
      // const formData = new FormData();
      // formData.append('title', bookData.title);
      // formData.append('author', bookData.author);
      // formData.append('description', bookData.description);
      // formData.append('category', bookData.category);
      // formData.append('price', bookData.price);
     

      // console.log(formData);
     
       await api.post("/book/add", bookData);

      toast.success("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        description: "",
        category: "",
        price: "",
      });

    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className='w-full h-screen max-h-[88.5vh] bg-gradient-to-br from-gray-900 to-black flex justify-center items-center'>
  <div className='h-[80vh] w-[90vw] md:w-[60vw] bg-gray-800 relative rounded-lg border border-gray-600 shadow-lg shadow-purple-900/50 overflow-y-auto'>
          <h1 className='text-center text-white text-3xl p-4 font-serif tracking-wider sticky top-0 bg-gray-800 z-10'>
            <span className='text-purple-400'>Add</span> Your <span className='text-red-500'>Book</span>
          </h1>

          <div className='p-6 md:p-10 grid gap-6'>
            <div className='flex flex-col md:flex-row w-full justify-around gap-6'>
              <div className='flex-1'>
                <label className='block text-gray-300 mb-2'>Book Title*</label>
                <input
                  type="text"
                  name='title'
                  onChange={handleOnChange}
                  value={bookData.title}
                  placeholder='Enter Book title'
                  className='border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400'
                  required
                />
              </div>

              <div className='flex-1'>
                <label className='block text-gray-300 mb-2'>Author Name*</label>
                <input
                  type="text"
                  name='author'
                  onChange={handleOnChange}
                  value={bookData.author}
                  placeholder='Enter Book Author Name'
                  className='border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400'
                  required
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row w-full justify-around gap-6'>
              <div className='flex-1'>
                <label className='block text-gray-300 mb-2'>Price</label>
                <input
                  type="number"
                  name='price'
                  onChange={handleOnChange}
                  value={bookData.price}
                  placeholder='Enter Book Price'
                  min={0}
                  className='border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400'
                />
              </div>

              <div className='flex-1'>
                <label className='block text-gray-300 mb-2'>Category*</label>
                <select
                  name="category"
                  onChange={handleOnChange}
                  value={bookData.category}
                  className='border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className='w-full'>
              <label className='block text-gray-300 mb-2'>Description</label>
              <textarea
                name="description"
                value={bookData.description}
                onChange={handleOnChange}
                placeholder='Enter book description'
                className='w-full h-32 border border-gray-600 bg-gray-700 text-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400'
              ></textarea>
            </div>

            <div className='w-full'>
              <label className='block text-gray-300 mb-2'>Book Cover Image</label>
              <input
                type="file"
                name='image'
                accept='image/*'
                className='border border-gray-600 bg-gray-700 text-gray-200 p-2 rounded-lg w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-900 file:text-white hover:file:bg-purple-800'
              />
            </div>

            <div className='w-full py-6 flex justify-center items-center'>
              <button
                className='bg-purple-900 px-10 py-3 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 shadow-lg shadow-purple-900/30 font-medium tracking-wider disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleAddBook}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='flex items-center gap-2'>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add Book'
                )}
              </button>
            </div>
          </div>
        </div>      </main>
    </>
  )
}

export default Post;