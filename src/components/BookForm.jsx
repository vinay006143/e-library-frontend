// src/components/BookManager.jsx
import React, { useEffect, useState } from "react";
import api from "../utils/api";

const SERVER_URL = "https://e-library-backend-gaw0.onrender.com"; // Add your server URL here

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishedYear: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data.books);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const resetForm = () => {
    setForm({ title: "", author: "", description: "", genre: "", publishedYear: "" });
    setThumbnail(null);
    setPdf(null);
    setEditingBookId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let savedBook;
      if (editingBookId) {
        savedBook = await api.put(`/books/${editingBookId}`, form);
        setSuccessMessage("✅ Book updated successfully!");
      } else {
        savedBook = await api.post("/books", form);
        setSuccessMessage("✅ Book added successfully!");
      }

      if (thumbnail || pdf) {
        const data = new FormData();
        if (thumbnail) data.append("thumbnail", thumbnail);
        if (pdf) data.append("pdf", pdf);
        await api.post(`/books/upload/${savedBook.data._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchBooks();
      resetForm();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      publishedYear: book.publishedYear,
    });
    setEditingBookId(book._id);
    setSuccessMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
      setSuccessMessage("✅ Book deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
          {successMessage}
        </div>
      )}

      {/* Add/Edit Book Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">
          {editingBookId ? "✏️ Edit Book" : "➕ Add Book"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "author", "genre", "publishedYear"].map((field) => (
            <input
              key={field}
              type={field === "publishedYear" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div>
            <label className="block mb-1 font-medium">Thumbnail Image</label>
            <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Book PDF</label>
            <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {editingBookId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transform transition duration-300"
          >
            {book.thumbnail ? (
              <img
                src={`${SERVER_URL}${book.thumbnail}`}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-1 truncate">{book.title}</h3>
              <p className="text-gray-600 mb-2 truncate">{book.author}</p>
              <p className="text-gray-500 text-sm flex-1 truncate">{book.description}</p>

              <div className="mt-3 flex justify-between items-center">
                {book.pdf && (
                  <a
                    href={`${SERVER_URL}${book.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📄 Read PDF
                  </a>
                )}
                <div>
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
