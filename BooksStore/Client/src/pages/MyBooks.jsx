import React, { useState, useEffect } from 'react';
import api from '../config/api';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, bookId: null });
  const [editModal, setEditModal] = useState({ open: false, book: null });
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    isFree: false
  });

  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        console.log("User not found");
        return;
      }

      const response = await api.get(`/book/mybooks/${user._id}`);
      setBooks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch your books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/book/mybooks/${deleteModal.bookId}`);
      setBooks(books.filter(book => book._id !== deleteModal.bookId));
      setDeleteModal({ open: false, bookId: null });

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/book/mybooks/${editModal.book._id}`, formData);
      console.log(response.data.message);

      setBooks(books.map(book =>
        book._id === editModal.book._id ? response.data.data : book
      ));
      setEditModal({ open: false });
      setFormData({
        title: '',
        author: '',
        description: '',
        category: '',
        price: ''
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book');
      console.error('Error updating book:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openEditModal = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      price: book.price,
      isFree: book.isFree
    });
    setEditModal({ open: true, book });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 border border-purple-700 text-red-400 px-4 py-3 rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <p className="font-mono">Error: {error}</p>
        <button
          onClick={fetchMyBooks}
          className="mt-2 bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-600 font-serif">My Books</h1>

      {books.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg font-serif">You haven't added any books yet.</p>
          <button
            onClick={() => window.location.href = '/post'}
            className="mt-4 bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Add Your First Book
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-700 hover:border-purple-500">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-purple-200">{book.title}</h2>
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
                  <div className="space-x-2">
                    <button
                      onClick={() => openEditModal(book)}
                      className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded transition-colors border border-purple-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, bookId: book._id })}
                      className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors border border-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-purple-700">
            <h3 className="text-xl font-bold text-purple-200 mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModal({ open: false, bookId: null })}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-purple-700">
            <h3 className="text-xl font-bold text-purple-200 mb-4">Edit Book</h3>
            <form onSubmit={handleEdit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      disabled={formData.isFree}
                    />
                  </div>
                  <div className="flex items-center mt-5">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 rounded"
                    />
                    <label className="ml-2 text-gray-300">Free</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, book: null })}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;