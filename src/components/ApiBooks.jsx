import React, { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("popular fiction");

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  const fetchBooks = async (query) => {
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await res.json();
      setBooks(data.docs.slice(0, 20)); // Limit to 20 books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1); // generates 3.0–5.0

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-indigo-700">
        📚 Discover Amazing Books
      </h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or keyword..."
        className="w-full md:w-1/2 mx-auto block px-5 py-3 border border-indigo-300 rounded-full text-indigo-700 placeholder-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-10 transition"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/150x220.png?text=No+Cover"
              }
              alt={book.title}
              className="w-36 h-52 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg text-indigo-800 truncate w-full">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {book.author_name?.[0] || "Unknown Author"}
            </p>
            <p className="text-xs text-gray-400">
              📅 {book.first_publish_year || "N/A"}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(getRandomRating()) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09L5.82 12 1 7.91l6.09-.91L10 2l2.91 5 6.09.91L14.18 12l1.698 6.09z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                {getRandomRating()} / 5
              </span>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
