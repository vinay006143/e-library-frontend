import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FaArrowLeft, FaMoon, FaSun, FaStar } from "react-icons/fa";
import Navbar from "./Navbar";

const SERVER_URL = "https://e-library-backend-gaw0.onrender.com";

const BookReading = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data.book);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book)
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  const avgRating =
    book.reviews?.length
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
      : 0;

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
    ));

  const handleAddReview = async () => {
    try {
      await api.post(`/books/${book._id}/review`, {
        rating: reviewRating,
        text: reviewText,
      });
      setReviewText("");
      setReviewRating(5);
      fetchBook();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >  
    <Navbar/>
      {/* Header */}
      <div className="flex justify-between items-center p-4 shadow-md bg-white rounded-b-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            {showSidebar ? "Hide Info" : "Show Info"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar / Book Info */}
        {showSidebar && (
          <div className="md:w-1/3 p-6 bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 shadow-lg rounded-xl text-gray-800 space-y-4 transition-all duration-300">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-purple-600">by {book.author}</p>
            <p className="text-gray-600">{book.genre} • {book.publishedYear}</p>
            <div className="flex items-center gap-1">
              {renderStars(Math.round(avgRating))} 
              <span className="text-gray-500 text-sm">({book.reviews?.length || 0})</span>
            </div>
            <p className="text-gray-700 mt-2">{book.description}</p>

            {/* Reviews */}
            <div className="mt-4">
              <h2 className="font-semibold text-lg mb-2 border-b border-gray-300 pb-1">User Reviews</h2>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {book.reviews?.length > 0 ? (
                  book.reviews.map((rev, idx) => (
                    <div key={idx} className="border-b border-gray-200 py-2 last:border-b-0">
                      <div className="flex items-center gap-1">{renderStars(rev.rating)}</div>
                      <p className="text-gray-700">{rev.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>

              {/* Add Review */}
              <div className="mt-4">
                <h3 className="font-semibold mb-1">Add Your Review</h3>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-16 p-2 border rounded text-gray-800"
                  />
                  {renderStars(reviewRating)}
                </div>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-2 border rounded mb-2 text-gray-800"
                  placeholder="Write your review..."
                />
                <button
                  onClick={handleAddReview}
                  className="px-4 py-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 rounded-lg hover:opacity-90 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Reader */}
        <div className="flex-1 p-4">
          {book.pdf ? (
            <iframe
              src={`${SERVER_URL}${book.pdf}`}
              title={book.title}
              className="w-full h-[90vh] border-4 border-gray-300 rounded-xl shadow-lg"
            ></iframe>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">PDF not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReading;
