import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "./Navbar";

const SERVER_URL = "https://e-library-backend-gaw0.onrender.com";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const navigate = useNavigate();

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data.books);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Render stars
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={`text-yellow-400 ${i < rating ? "" : "text-gray-300"}`}>
        ★
      </span>
    ));

  // Handle add or edit review
  const handleReviewSubmit = async () => {
    if (!selectedBook) return;
    try {
      if (editingReviewId) {
        // Edit review
        await api.put(`/books/${selectedBook._id}/review/${editingReviewId}`, {
          rating: reviewRating,
          text: reviewText,
        });
      } else {
        // Add new review
        await api.post(`/books/${selectedBook._id}/review`, {
          rating: reviewRating,
          text: reviewText,
        });
      }
      setReviewText("");
      setReviewRating(5);
      setEditingReviewId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (!selectedBook) return;
    try {
      await api.delete(`/books/${selectedBook._id}/review/${reviewId}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">📚 Explore Books</h2>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => {
            const avgRating = book.reviews?.length
              ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
              : 0;

            return (
              <motion.div
                key={book._id}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="h-56 w-full overflow-hidden rounded-t-2xl shadow-inner">
                  <img
                    src={book.thumbnail ? `${SERVER_URL}${book.thumbnail}` : "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 truncate">{book.title}</h3>
                    <p className="text-gray-700 mb-2 truncate">by {book.author}</p>
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(avgRating))}
                      <span className="text-gray-500 text-sm">({book.reviews?.length || 0})</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    {book.pdf && (
                      <button
                        onClick={() => navigate(`/read/${book._id}`)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
                      >
                        📄 Read Book
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm md:text-base"
                    >
                      ℹ️ Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Details Popup */}
        <AnimatePresence>
          {selectedBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4"
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 relative"
              >
                <button
                  onClick={() => { setSelectedBook(null); setEditingReviewId(null); }}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold mb-2 text-indigo-700">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-1 font-medium">by {selectedBook.author}</p>
                <p className="text-gray-500 mb-4">{selectedBook.genre} • {selectedBook.publishedYear}</p>

                {/* Average Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(Math.round(
                    selectedBook.reviews?.length
                      ? selectedBook.reviews.reduce((sum, r) => sum + r.rating, 0) / selectedBook.reviews.length
                      : 0
                  ))}
                  <span className="text-gray-500 text-sm">({selectedBook.reviews?.length || 0} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>

                {/* Reviews */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-indigo-600">User Reviews</h3>
                  <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-2">
                    {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
                      selectedBook.reviews.map((rev, idx) => (
                        <div key={idx} className="border-b py-1 last:border-b-0 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1">{renderStars(rev.rating)}</div>
                            <p className="text-gray-700">{rev.text}</p>
                          </div>
                          {/* Edit/Delete buttons for logged-in user */}
                          {rev.userId === api.getUserId() && (
                            <div className="flex flex-col gap-1 ml-2">
                              <button
                                onClick={() => {
                                  setReviewText(rev.text);
                                  setReviewRating(rev.rating);
                                  setEditingReviewId(rev._id);
                                }}
                                className="text-blue-500 text-sm hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteReview(rev._id)}
                                className="text-red-500 text-sm hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                </div>

                {/* Add / Edit Review */}
                <div>
                  <h3 className="font-semibold mb-2 text-indigo-600">
                    {editingReviewId ? "Edit Your Review" : "Add Your Review"}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-16 p-2 border rounded"
                    />
                    {renderStars(reviewRating)}
                  </div>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Write your review..."
                  />
                  <button
                    onClick={handleReviewSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {editingReviewId ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BookList;
