import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";

const SERVER_URL = "http://localhost:5000";

const UserRatedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Fetch userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch books rated by user
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/books/user/${userId}/rated`); // backend must return all books with reviews by this user
      setBooks(res.data.books);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={`text-yellow-500 ${i < rating ? "" : "text-gray-300"}`}>★</span>
    ));

  // Save review (Add/Edit)
  const handleSaveReview = async () => {
    if (!selectedBook) return;

    const existingReview = selectedBook.reviews.find(r => r.user._id === userId);

    try {
      if (existingReview) {
        await api.put(`/books/${selectedBook._id}/review/${existingReview._id}`, {
          rating: reviewRating,
          text: reviewText,
        });
      } else {
        await api.post(`/books/${selectedBook._id}/review`, {
          rating: reviewRating,
          text: reviewText,
        });
      }

      fetchBooks();
      setSelectedBook(null);
      setReviewText("");
      setReviewRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete review
  const handleDeleteReview = async () => {
    if (!selectedBook) return;
    const existingReview = selectedBook.reviews.find(r => r.user._id === userId);
    if (!existingReview) return;

    try {
      await api.delete(`/books/${selectedBook._id}/review/${existingReview._id}`);
      fetchBooks();
      setSelectedBook(null);
      setReviewText("");
      setReviewRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-pink-50 py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">⭐ My Rated Books</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">You haven't rated any books yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map(book => {
            const userReview = book.reviews.find(r => r.user._id === userId);

            return (
              <motion.div
                key={book._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedBook(book);
                  setReviewText(userReview?.text || "");
                  setReviewRating(userReview?.rating || 5);
                }}
              >
                <div className="h-64 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={book.thumbnail ? `${SERVER_URL}${book.thumbnail}` : "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{book.title}</h3>
                  <p className="text-gray-600 mb-1 truncate">by {book.author}</p>
                  {userReview && (
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(userReview.rating)}
                      <span className="text-gray-500 text-sm">({userReview.rating})</span>
                    </div>
                  )}
                  {userReview && <p className="text-gray-700 text-sm line-clamp-3">{userReview.text}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Review Management Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {selectedBook.thumbnail && (
                <img
                  src={selectedBook.thumbnail ? `${SERVER_URL}${selectedBook.thumbnail}` : ""}
                  alt={selectedBook.title}
                  className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                />
              )}

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-1">by {selectedBook.author}</p>
                <p className="text-gray-500 mb-2">{selectedBook.genre} • {selectedBook.publishedYear}</p>

                <div className="mb-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Your Review:</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(reviewRating)}
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-16 p-1 border rounded"
                    />
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={handleSaveReview}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save Review
                    </button>
                    <button
                      onClick={handleDeleteReview}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete Review
                    </button>
                    {selectedBook.pdf && (
                      <a
                        href={selectedBook.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        📄 Read PDF
                      </a>
                    )}
                  </div>
                </div>

                {/* All Reviews */}
                {selectedBook.reviews?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">All Reviews:</h3>
                    {selectedBook.reviews.map((rev) => (
                      <div key={rev._id} className="border-b py-2">
                        <div className="flex items-center gap-1">
                          {renderStars(rev.rating)}
                        </div>
                        <p className="text-gray-700">{rev.text}</p>
                        <p className="text-gray-400 text-sm">User: {rev.user._id === userId ? "You" : rev.user._id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRatedBooks;
  