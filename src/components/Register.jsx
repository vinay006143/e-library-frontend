import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        if (isMounted.current) setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = async () => {
    try {
      if (!username || !email || !password) {
        setToastMsg("⚠️ All fields are required");
        setShowToast(true);
        return;
      }

      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToastMsg("✅ Registered successfully!");
        setShowToast(true);
        setUsername("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setToastMsg(`❌ ${data.message || "Registration failed"}`);
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error at registration:", error);
      setToastMsg("❌ Server error");
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 animate-fadeIn">
      {/* ✅ Navbar */}
      <nav className="bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 shadow-lg px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:scale-105 transition-transform"
        >
          <BookOpenIcon className="w-7 h-7" />
          eLibrary
        </Link>
        <div className="text-sm text-gray-900 font-bold" >
          Already have an account?{" "}
        
  <Link
    to="/login"
    className="inline-block px-6 py-2 text-white bg-blue-600 font-semibold rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
  >
    Login
  </Link>

        </div>
      </nav>

      {/* ✅ Register Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-slideUp">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Account</h2>
          <div className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password with Eye Icon */}
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-8 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <input
              type="submit"
              value="Register"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 px-4 rounded-xl font-semibold cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ✅ Toast Message */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-2 rounded shadow-lg transition-all duration-300 animate-fadeInUp">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Register;
