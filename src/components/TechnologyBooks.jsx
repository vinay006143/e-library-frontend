import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const generateRandomRating = () => Math.floor(Math.random() * 3) + 3;

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
      const res = await axios.get("https://openlibrary.org/subjects/computer_science.json?limit=8");
      const ratedBooks = res.data.works.map((book) => ({
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
        axios.get("http://localhost:5000/api/favorites/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/read-books/my", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      setFavorites(favRes.data.books.map(b => b.bookId));
      setReadBooks(readRes.data.books.map(b => b.bookId));
    } catch (err) {
      console.error("Failed to fetch user books:", err);
    }
  };

  const toggleFavorite = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save favorites.");
      return;
    }

    const bookId = book.key;
    const isFav = favorites.includes(bookId);

    try {
      if (isFav) {
        await axios.delete(`http://localhost:5000/api/favorites/unmark/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => prev.filter((id) => id !== bookId));
      } else {
        await axios.post("http://localhost:5000/api/favorites/mark", {
          bookId,
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown",
          cover: book.cover_id || null,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => [...prev, bookId]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const toggleReadStatus = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to mark as read.");
      return;
    }

    const bookId = book.key;
    const isRead = readBooks.includes(bookId);

    try {
      if (!isRead) {
        await axios.post("http://localhost:5000/api/read-books/mark", {
          bookId,
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown",
          coverImage: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : "",
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReadBooks((prev) => [...prev, bookId]);
      } else {
        await axios.delete(`http://localhost:5000/api/read-books/unmark/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReadBooks((prev) => prev.filter((id) => id !== bookId));
      }
    } catch (err) {
      console.error("Toggle read failed:", err);
      alert("Could not update read status.");
    }
  };

  const openPreview = (book) => {
    if (book.ia?.length > 0) {
      setSelectedBook(book);
    } else {
      window.open(`https://openlibrary.org${book.key}`, "_blank");
    }
  };

  const closeModal = () => setSelectedBook(null);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 mt-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        🌟 Top-Rated Technology Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition cursor-pointer overflow-hidden group relative"
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
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {book.authors?.[0]?.name || "Unknown Author"}
              </p>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) =>
                  i < book.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-sm mr-1" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-sm mr-1" />
                  )
                )}
                <span className="text-xs text-gray-600 ml-2">({book.rating}/5)</span>
              </div>

              {/* ✅ Read Book Button Added */}
              <button
                onClick={() => openPreview(book)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md text-sm mb-2"
              >
                Read Book
              </button>

              {/* <button
                onClick={() => toggleReadStatus(book)}
                className={`w-full text-white text-sm py-1.5 rounded-md ${
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

      {/* Modal for Read Preview */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] h-[90%] relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded z-10"
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
          </div>
        </div>
      )}
    </div>
  );
}
