import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, } from "react-icons/fa";

const generateRandomRating = () => Math.floor(Math.random() * 3) + 3; // 3 to 5

export default function TopRatedBooksSection() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://openlibrary.org/subjects/bestsellers.json?limit=6")
      .then((res) => {
        const ratedBooks = res.data.works.map((book) => ({
          ...book,
          rating: generateRandomRating(),
        }));
        setBooks(ratedBooks);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Top Rated Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-50 rounded-lg overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={
                book.cover_id
                  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                  : "https://via.placeholder.com/200x300?text=No+Cover"
              }
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-md font-semibold text-gray-700 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-gray-500">
                {book.authors?.[0]?.name || "Unknown Author"}
              </p>

              <div className="flex items-center mt-2 mb-2">
                {[...Array(5)].map((_, i) =>
                  i < book.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-sm mr-1" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-sm mr-1" />
                  )
                )}
                <span className="text-xs text-gray-500 ml-2">({book.rating}/5)</span>
              </div>

            
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
