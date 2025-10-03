// src/pages/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false };
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        if (isMounted.current) setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://e-library-backend-gaw0.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToastMsg("✅ Login successful!");
      setShowToast(true);
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToastMsg("❌ Login failed: " + err.message);
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 animate-fadeIn">
      {/* ✅ Navbar */}
      <nav className="bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 shadow-lg px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:scale-105 transition-transform">
          <BookOpenIcon className="w-7 h-7" />
          eLibrary
        </Link>
        <div className="text-sm text-gray-900 font-bold gap-8">
          <span>New here?{" "} </span>
           <Link
              to="/register"
              className="inline-block px-6 py-2 text-white bg-blue-600 font-semibold rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Register
            </Link>
        </div>
      </nav>

      {/* ✅ Login Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-slideUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <LockClosedIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Login to eLibrary</h2>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-2 rounded shadow-lg transition-all duration-300 animate-fadeInUp">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Login;
