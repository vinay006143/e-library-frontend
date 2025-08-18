import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "./Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BookOpenIcon } from "@heroicons/react/24/solid";
export default function DiscoverBooks() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("free");
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    fetchBooks(query);
    fetchUserBooks();
  }, []);

  const fetchBooks = async (search = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&limit=20`
      );
      const bookList = res.data.docs.map(book => ({
        ...book,
        key: book.key.replace("/works/", "")
      }));

      const newRatings = {};
      bookList.forEach((book) => {
        newRatings[book.key] = Math.floor(Math.random() * 3 + 3);
      });

      setRatings(newRatings);
      setBooks(bookList);
    } catch (err) {
      console.error("Failed to fetch books", err);
      setBooks([]);
    } finally {
      setLoading(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    fetchBooks(query);
  };

  const openPreview = (book) => {
    if (book.ia?.length > 0) {
      setSelectedBook(book);
    } else {
      window.open(`https://openlibrary.org/works/${book.key}`, "_blank");
    }
  };

  const closeModal = () => setSelectedBook(null);

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
        await axios.post(
          "http://localhost:5000/api/favorites/mark",
          {
            bookId,
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown",
            cover: book.cover_i || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
        await axios.post(
          "http://localhost:5000/api/read-books/mark",
          {
            bookId,
            title: book.title || "Untitled",
            author: book.author_name?.join(", ") || "Unknown",
            coverImage: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReadBooks((prev) => [...prev, bookId]);
      } else {
        await axios.delete(
          `http://localhost:5000/api/read-books/unmark/${bookId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReadBooks((prev) => prev.filter((id) => id !== bookId));
      }
    } catch (err) {
      console.error("Toggle read failed:", err);
      alert("Could not update read status.");
    }
  };

  const isFavorite = (key) => favorites.includes(key);
  const isRead = (key) => readBooks.includes(key);

  return (
    <>
      <title>Books | e-library</title>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          Discover Books
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-4 mb-8 flex-wrap"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 w-full md:w-1/2 rounded-xl shadow border border-indigo-300 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
          >
            Search
          </button>
        </form>

        {loading ? (
          <>
          <p className="text-center text-indigo-600">Loading books...</p>
  <div className="flex items-center justify-center h-60">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

        {/* Static icon in the center */}
        <BookOpenIcon className="w-8 h-8 text-blue-600 z-10" />
      </div>
    </div>



</>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, idx) => (
              <motion.div
                key={idx}
                className="relative bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : "https://via.placeholder.com/300x450?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-indigo-800 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">
                    {book.author_name?.join(", ") || "Unknown Author"}
                  </p>
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {"⭐".repeat(ratings[book.key] || 3)}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md text-sm"
                      onClick={() => openPreview(book)}
                    >
                      Read Book
                    </button>
                    <button
                      className={`w-full ${
                        isRead(book.key)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white py-1.5 rounded-md text-sm`}
                      onClick={() => toggleReadStatus(book)}
                    >
                      {isRead(book.key) ? "Readed" : "Mark as Read"}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(book)}
                  className="absolute top-3 right-3 bg-white shadow-md p-2 rounded-full hover:bg-red-100"
                >
                  {isFavorite(book.key) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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
    </>
  );
} 