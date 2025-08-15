import React, { useState, useEffect } from 'react';
import api from '../config/api';

const Collection = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/book/books');
      setBooks(response.data || []);
      setFilteredBooks(response.data || []);
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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-600 font-serif">The Black Library</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search by title, author, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Results Count */}
      {searchTerm && (
        <div className="mb-4 text-gray-400">
          Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} matching "{searchTerm}"
        </div>
      )}

      {filteredBooks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg font-serif">
            {searchTerm 
              ? `No books found matching "${searchTerm}"`
              : 'The library appears to be empty...'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 items-center justify-between gap-6">
          {filteredBooks.map((book, index) => (
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
      )}
    </div>
  );
};

export default Collection;