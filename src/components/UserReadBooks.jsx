import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [readBooks, setReadBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadBooks();
  }, []);

  const fetchReadBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view your read books.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://e-library-backend-gaw0.onrender.com/api/read-books/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.books) {
        setReadBooks(response.data.books);
      } else {
        alert("Invalid response from server.");
      }
    } catch (error) {
      console.error("Failed to load read books:", error.response || error.message);
      alert("Failed to load read books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteReadBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/read-books/unmark/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReadBooks((prev) => prev.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error("Failed to unmark book:", error.response || error.message);
      alert("Failed to remove book from read list.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Read Books</h2>

      {loading ? (
        <p className="text-gray-600">Loading your books...</p>
      ) : readBooks.length === 0 ? (
        <p className="text-gray-500">You haven’t marked any books as read yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {readBooks.map((book) => (
            <div
              key={book.bookId}
              className="bg-white shadow-md rounded-xl p-4 relative border border-gray-200"
            >
              <img
                src={
                  book.coverImage ||
                  "https://via.placeholder.com/300x450?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-60 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="font-semibold text-indigo-800 text-lg truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {book.author || "Unknown Author"}
                </p>
              </div>
              <button
                onClick={() => deleteReadBook(book.bookId)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm"
              >
                Remove from Read
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
