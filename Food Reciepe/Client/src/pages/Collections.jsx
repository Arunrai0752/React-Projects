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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 border border-purple-700 text-red-400 px-4 py-3 rounded-lg shadow-lg">
        <p className="font-mono">Error: {error}</p>
        <button 
          onClick={fetchAllBooks}
          className="mt-2 bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg font-serif">The library appears to be empty...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-600 font-serif">The Black Library</h1>
      
      <div className="grid grid-cols-2  items-center justify-between gap-6">
        {books.map((book, index) => (
          <div key={book._id} className="bg-gray-800 rounded-lg shadow-lg w-[700px] overflow-hidden hover:shadow-xl transition-all border border-gray-700 hover:border-purple-500">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-200">
                <span className="text-purple-400">{index+1}.</span> {book.title}
              </h2>
              <p className="text-gray-300 mb-1"><span className="text-purple-300">Author:</span> {book.author}</p>
              <p className="text-gray-300 mb-4"><span className="text-purple-300">Category:</span> {book.category}</p>
              
              {book.description && (
                <p className="text-gray-400 text-sm mb-4 italic">
                  {book.description.length > 100 
                    ? `${book.description.substring(0, 100)}...` 
                    : book.description}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${book.isFree ? 'text-green-400' : 'text-amber-400'}`}>
                  {book.isFree ? 'Free' : `$${book.price}`}
                </span>
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors border border-purple-600">
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