import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-100 via-indigo-100 to-sky-100 py-12 text-gray-800 shadow-inner border-t border-gray-300 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-heading font-bold text-purple-700 mb-4">📚 About eLibrary</h3>
          <p className="text-sm leading-relaxed">
            Discover a vast collection of academic, technical, and non-fiction books. Learn anytime, anywhere — your knowledge partner for life.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xl font-heading font-bold text-purple-700 mb-4">🔍 Explore</h3>
          <ul className="space-y-2 text-sm">
            {["New Arrivals", "Categories", "Popular", "Support"].map((item, index) => (
              <li key={index} className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-heading font-bold text-purple-700 mb-4">📞 Contact</h3>
          <p className="text-sm leading-relaxed">
            Email: <span className="text-indigo-600">support@elibrary.com</span><br />
            Phone: <span className="text-indigo-600">+91-939860661</span>
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-heading font-bold text-purple-700 mb-4">🌐 Social</h3>
          <div className="flex space-x-4 text-indigo-600 text-xl">
            <a href="#" className="hover:text-pink-500 transition-transform transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition-transform transform hover:scale-110">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-blue-700 transition-transform transform hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-purple-700">eLibrary</span>. All rights reserved.
      </div>
    </footer>
  );
}
