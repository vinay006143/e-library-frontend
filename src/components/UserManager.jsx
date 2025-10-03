import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye } from "lucide-react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://e-library-backend-gaw0.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  // Delete user by ID
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`https://e-library-backend-gaw0.onrender.com/api/users/${id}`);
      fetchUsers(); // Refresh list after deletion
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center">
        👥 User Management
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-4 justify-center">
                    <button
                      title="View"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
