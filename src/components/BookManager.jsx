import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    language: "English",
    pageCount: 0,
    publicationYear: "",
    publisher: "",
    tags: "",
    coverImageUrl: "",
    fileUrl: "",
  });
  const [toast, setToast] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get("https://e-library-backend-gaw0.onrender.com/api/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
        pageCount: Number(form.pageCount),
        publicationYear: Number(form.publicationYear),
      };
      await axios.post("https://e-library-backend-gaw0.onrender.com/api/books", payload);
      setToast("✅ Book uploaded successfully!");
      setForm({
        title: "",
        author: "",
        description: "",
        category: "",
        language: "English",
        pageCount: 0,
        publicationYear: "",
        publisher: "",
        tags: "",
        coverImageUrl: "",
        fileUrl: "",
      });
      fetchBooks();
    } catch (err) {
      setToast("❌ Upload failed. Please check your input.");
    } finally {
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📚 Admin Dashboard</h1>

      {toast && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{toast}</div>}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="input" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" required />
        <input name="language" value={form.language} onChange={handleChange} placeholder="Language" className="input" />
        <input name="pageCount" value={form.pageCount} onChange={handleChange} placeholder="Page Count" className="input" type="number" />
        <input name="publicationYear" value={form.publicationYear} onChange={handleChange} placeholder="Publication Year" className="input" type="number" />
        <input name="publisher" value={form.publisher} onChange={handleChange} placeholder="Publisher" className="input" />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="input" />
        <input name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange} placeholder="Cover Image URL" className="input" />
        <input name="fileUrl" value={form.fileUrl} onChange={handleChange} placeholder="Book File URL" className="input" required />

        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
          Upload Book
        </button>
      </form>

      {/* Book List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map(book => (
          <div key={book._id} className="bg-white shadow p-4 rounded border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-700">{book.title}</h2>
            <p className="text-gray-600">By {book.author}</p>
            <a href={book.fileUrl} className="text-sm text-green-600 underline" target="_blank" rel="noopener noreferrer">
              Read/Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
