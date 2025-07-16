import React, { useState, useEffect } from 'react';
import api from '../config/api';

const Collection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/book/books');
      setBooks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <button 
          onClick={fetchAllBooks}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No books found in the collection</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Book Collection</h1>
      
      <div className="grid items-center justify-center  gap-6">
        {books.map((book , index) => (
          <div key={book._id} className="bg-white rounded-lg shadow-md w-[500px] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{index+1}. {book.title}</h2>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-4">Category: {book.category}</p>
              
              {book.description && (
                <p className="text-gray-500 text-sm mb-4">
                  {book.description.length > 100 
                    ? `${book.description.substring(0, 100)}...` 
                    : book.description}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {book.isFree ? 'Free' : `$${book.price}`}
                </span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;