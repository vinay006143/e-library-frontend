import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserReadBooks() {
  const [readBooks, setReadBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const res = await axios.get("https://e-library-backend-gaw0.onrender.com/api/read-books/my-reads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const booksArray = Array.isArray(res.data.books) ? res.data.books : [];
        setReadBooks(booksArray);
      } catch (err) {
        console.error("Error fetching read books:", err);
        setError("Failed to fetch read books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadBooks();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading...</div>;

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  if (readBooks.length === 0) {
    return <div className="p-4 text-center text-gray-500">You haven’t marked any books as read.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Your Read Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {readBooks.map((book) => (
          <div key={book._id || book.bookId} className="bg-white shadow rounded overflow-hidden">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-60 object-cover" />
            ) : (
              <div className="w-full h-60 flex items-center justify-center bg-gray-200 text-gray-600">
                No Cover
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  