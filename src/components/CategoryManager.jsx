import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/categories", { name });
      setName("");
      setError("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl w-full max-w-4xl mx-auto mt-8">
      <div className="border-b pb-4 mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          📁 Manage Categories
        </h2>
        <span className="text-gray-400 text-sm">
          Total: {categories.length}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          Add Category
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition duration-200"
          >
            <div className="text-gray-800 font-medium">{cat.name}</div>
            <button
              onClick={() => handleDelete(cat._id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
