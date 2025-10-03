import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";

const STORY_QUERY = "children story books";

const generateRandomRating = () => Math.floor(Math.random() * 3) + 3;

export default function StoryBooks() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchUserBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${STORY_QUERY}&limit=8`
    );
    const data = await res.json();
    const formatted = data.docs.map((book) => ({
      ...book,
      key: book.key,
      cover_id: book.cover_i,
      rating: generateRandomRating(),
    }));
    setBooks(formatted);
  };

  const fetchUserBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const [favRes, readRes] = await Promise.all([
        axios.get("https://e-library-backend-gaw0.onrender.com/api/favorites/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://e-library-backend-gaw0.onrender.com/api/read-books/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setFavorites(favRes.data.books.map((b) => b.bookId));
      setReadBooks(readRes.data.books.map((b) => b.bookId));
    } catch (err) {
      console.error("Error fetching user books", err);
    }
  };

  const toggleFavorite = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    const bookId = book.key;
    const isFav = favorites.includes(bookId);

    try {
      if (isFav) {
        await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/favorites/unmark/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => prev.filter((id) => id !== bookId));
      } else {
        await axios.post(
          "https://e-library-backend-gaw0.onrender.com/api/favorites/mark",
          {
            bookId,
            title: book.title,
            author: book.author_name?.[0] || "Unknown",
            cover: book.cover_id || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites((prev) => [...prev, bookId]);
      }
    } catch (err) {
      console.error("Toggle favorite error", err);
    }
  };

  const toggleReadStatus = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    const bookId = book.key;
    const isRead = readBooks.includes(bookId);

    try {
      if (!isRead) {
        await axios.post(
          "https://e-library-backend-gaw0.onrender.com/api/read-books/mark",
          {
            bookId,
            title: book.title,
            author: book.author_name?.[0] || "Unknown",
            coverImage: book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
              : "",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReadBooks((prev) => [...prev, bookId]);
      } else {
        await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/read-books/unmark/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReadBooks((prev) => prev.filter((id) => id !== bookId));
      }
    } catch (err) {
      console.error("Toggle read error", err);
    }
  };

  const handleRead = (book) => {
    if (book.ia?.[0]) {
      setPreviewUrl(`https://archive.org/embed/${book.ia[0]}`);
    } else {
      setPreviewUrl(`https://openlibrary.org${book.key}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-yellow-100 px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-8">
        📖 Best Story Books
      </h1>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {books.map((book, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden group relative"
          >
            <img
              src={
                book.cover_id
                  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                  : "https://via.placeholder.com/200x300?text=No+Cover"
              }
              alt={book.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {book.author_name?.[0] || "Unknown Author"}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) =>
                  i < book.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-sm mr-1" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-sm mr-1" />
                  )
                )}
                <span className="text-xs text-gray-600 ml-2">
                  ({book.rating}/5)
                </span>
              </div>

              {/* Read Button */}
              <button
                onClick={() => handleRead(book)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-1.5 rounded-md text-sm mb-2 transition"
              >
                Read Book
              </button>

              {/* Mark as Read */}
              {/* <button
                onClick={() => toggleReadStatus(book)}
                className={`w-full text-white text-sm py-1.5 rounded-md mb-2 transition ${
                  readBooks.includes(book.key)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {readBooks.includes(book.key) ? "Readed" : "Mark as Read"}
              </button> */}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(book)}
              className="absolute top-3 right-3 bg-white shadow p-2 rounded-full hover:bg-red-100 z-10"
            >
              {favorites.includes(book.key) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="relative w-full h-[80vh]">
                <iframe
                  src={previewUrl}
                  title="Book Preview"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
