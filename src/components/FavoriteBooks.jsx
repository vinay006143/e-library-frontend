import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function UserFavoriteBooks() {
  const [favorites, setFavorites] = useState([]);

  // Fetch all favorite books and get cover for each
  const fetchFavoriteBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("https://e-library-backend-gaw0.onrender.com/api/favorites/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const books = res.data.books || [];

      // Enrich each book with a coverUrl fetched from Open Library
      const enrichedBooks = await Promise.all(
        books.map(async (book) => {
          const coverUrl = await fetchCoverFromOpenLibrary(book.title, book.author);
          return { ...book, coverUrl };
        })
      );

      setFavorites(enrichedBooks);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  // Fetch book cover from Open Library API
  const fetchCoverFromOpenLibrary = async (title, author) => {
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author || "")}&limit=1`
      );
      const doc = res.data.docs[0];
      if (doc?.cover_i) {
        return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
      }
    } catch (err) {
      console.error(`Failed to fetch cover for "${title}"`, err);
    }
    return "https://via.placeholder.com/150x220?text=No+Cover";
  };

  // Remove a favorite book
  const removeFavorite = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/favorites/unmark/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = favorites.filter((book) => book.bookId !== bookId);
      setFavorites(updated);
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Favorite Books</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((book) => (
            <div
              key={book.bookId}
              className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold text-indigo-800">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {book.author || "Unknown Author"}
              </p>
              <button
                onClick={() => removeFavorite(book.bookId)}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md w-full"
              >
                <FaTrashAlt /> Remove Unlike
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
