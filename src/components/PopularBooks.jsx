import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const generateRandomRating = () => Math.floor(Math.random() * 3) + 3;
const POPULAR_QUERY = "harry potter";

export default function TopRatedBooksSection() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchUserBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${POPULAR_QUERY}&limit=8`
      );
      const ratedBooks = res.data.docs.map((book) => ({
        ...book,
        rating: generateRandomRating(),
      }));
      setBooks(ratedBooks);
    } catch (err) {
      console.error("Fetch error:", err);
    }
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
      console.error("Failed to fetch user books:", err);
    }
  };

  const toggleFavorite = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to save favorites.");

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
            cover: book.cover_i || null,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites((prev) => [...prev, bookId]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const toggleReadStatus = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to mark as read.");

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
            coverImage: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReadBooks((prev) => [...prev, bookId]);
      } else {
        await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/read-books/unmark/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReadBooks((prev) => prev.filter((id) => id !== bookId));
      }
    } catch (err) {
      console.error("Toggle read failed:", err);
    }
  };

  const openPreview = (book) => {
    if (book.ia?.length > 0) {
      setSelectedBook(book);
    } else {
      window.open(`https://openlibrary.org${book.key}`, "_blank");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-blue-200 to-indigo-300 py-16 px-4 sm:px-8">
      <motion.h2
        className="text-5xl font-bold text-center text-indigo-900 mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌟 Popular Books
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {books.map((book, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group transition-all duration-300 relative"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/300x400?text=No+Cover"
              }
              alt={book.title}
              className="w-full h-64 object-cover group-hover:opacity-90 transition"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-800 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                by {book.author_name?.[0] || "Unknown"}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) =>
                  i < book.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  )
                )}
              </div>
              <div className="flex flex-col gap-2 pt-3">
                <button
                  onClick={() => openPreview(book)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-md transition"
                >
                  📖 Read Preview
                </button>
                {/* <button
                  onClick={() => toggleReadStatus(book)}
                  className={`w-full py-2 rounded-md font-semibold transition shadow-md ${
                    readBooks.includes(book.key)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  {readBooks.includes(book.key) ? "✅ Read" : "📘 Mark as Read"}
                </button> */}
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(book)}
              className="absolute top-4 right-4 bg-white shadow p-2 rounded-full hover:bg-red-100 transition"
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

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <motion.div
            className="bg-white rounded-xl w-[90%] h-[90%] overflow-hidden relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Close
            </button>
            <iframe
              src={`https://archive.org/stream/${selectedBook.ia[0]}`}
              title={selectedBook.title}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      )}
    </div>
  );
}
