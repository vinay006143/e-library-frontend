import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 shadow-lg px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500">
     <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:scale-105 transition-transform">
          <BookOpenIcon className="w-7 h-7" />
          eLibrary
        </Link>

      {/* <input
        type="text"
        placeholder="Search books..."
        className="w-full md:w-1/3 px-4 py-2 border border-indigo-300 bg-white rounded-full text-blue-800 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out"
      /> */}

      <div className="space-x-4 flex flex-wrap justify-center items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                Home
              </button>
            </Link>
             <Link to="/books">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
               Online Books
              </button>
            </Link>
            <Link to="/mybooks">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                My Books
              </button>
            </Link>
            <Link to="/about">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                About Us
              </button>
            </Link>
            <Link to="/features">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                Features
              </button>
            </Link>
            <Link to="/userdashboard">
              <button className="text-indigo-700 font-semibold hover:text-white hover:bg-indigo-500 px-4 py-2 rounded transition-all duration-300">
                Dashboard
              </button>
            </Link>
            <button
              name="logout"
              onClick={() => {
                localStorage.clear();
                alert("Logout successfully");
                setIsLoggedIn(false);
                navigate("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
