import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePage() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    category: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-library-backend-gaw0.onrender.com/api/books/create', form);
      alert(res.data.msg);
      setForm({ title: '', author: '', description: '', category: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error submitting form');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📘 Add a New Book</h1>
      <p className="text-gray-600 mb-8">
        Fill in the details below to add a new book to the eLibrary.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {['title', 'author', 'description', 'category'].map(field => (
          <div key={field}>
            <label className="block text-gray-700 font-semibold mb-1 capitalize">{field}</label>
            {field === 'description' ? (
              <textarea
                name={field}
                value={form[field]}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md"
                placeholder={`Enter ${field}`}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder={`Enter ${field}`}
              />
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Book
        </button>
      </form>
    </div>
  );
}
