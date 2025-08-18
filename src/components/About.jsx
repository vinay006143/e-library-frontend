import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
    <title>About | e-library</title>
      <Navbar />
      <div className="bg-gradient-to-br from-sky-50 via-purple-50 to-indigo-50 text-gray-800 font-sans">
        
       
    
         {/* Hero Section */}
      <section className="text-center py-10 px-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Welcome to eLibrary
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-lg max-w-3xl mx-auto"
        >Your gateway to a smarter way of reading, exploring, and learning. Browse thousands of books across disciplines — all in one place.

          
        </motion.p>
        <Link to="/books">
        <button className="my-3 bg-pink-500 hover:bg-purple-700 text-white px-2 py-2 rounded-xl shadow-md transition duration-300 align-middle items-center">
          Explore Now
        </button>
        </Link>
      </section>
     
      {/* Vision, Mission, Features */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">🎯 Our Mission</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            To empower students and lifelong learners by providing easy, free, and inclusive access to digital learning materials and quality academic content.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">🚀 Why Choose Us?</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>Extensive academic and technical content</li>
            <li>User-friendly & responsive design</li>
            <li>Accessible to all — completely free</li>
            <li>Built for learners, by learners</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">🌍 Our Vision</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            To become the world’s most trusted and accessible digital learning platform, offering equal learning opportunities for students from every background.
          </p>
        </div>
      </section>


        {/* Features */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-100 px-6 md:px-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-blue-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Why Choose eLibrary?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { title: "Instant Access", desc: "Read books online anytime, anywhere.", icon: "📖" },
              { title: "Smart History", desc: "Track your favorites & reading sessions.", icon: "⭐" },
              { title: "Ratings & Reviews", desc: "Share feedback & discover top reads.", icon: "📝" },
              { title: "Mobile Optimized", desc: "Perfectly responsive across devices.", icon: "📱" },
              { title: "Powerful Search", desc: "Find books effortlessly.", icon: "🔍" },
              { title: "Top Authors", desc: "Get to know trending authors.", icon: "👩‍💻" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-12 bg-purple-700 text-white text-center px-6">
          <h2 className="text-2xl font-bold mb-2">“Books are a uniquely portable magic.”</h2>
          <p className="italic">– Stephen King</p>
        </section>

        {/* Featured Author */}
        <section className="py-20 bg-white px-6 md:px-20">
          <motion.div 
            className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80"
              alt="Author"
              className="w-full md:w-1/3 rounded-xl shadow-lg"
            />
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">Featured Author: John Doe</h2>
              <p className="text-gray-700 leading-relaxed">
                John Doe is a renowned author with over 20 titles spanning drama, thriller, and sci-fi. His bestseller "The Silent Page" is a favorite among our readers for its plot depth and immersive world-building.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Customer Feedback */}
        <section className="py-20 bg-gradient-to-br from-blue-100 to-purple-100 px-6 md:px-20">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">What Our Readers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Anjali R.", review: "Absolutely love the convenience. UI is great & the book collection is impressive!" },
              { name: "Ravi K.", review: "Perfect for students. Easy to search and find academic material quickly." },
              { name: "Sneha M.", review: "I read at night from my phone — works like magic!" },
            ].map((fb, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <p className="italic text-gray-600 mb-3">“{fb.review}”</p>
                <p className="font-bold text-purple-700">— {fb.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white px-6 md:px-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              Our support team is here 24/7 to help you with book access, payments, or general queries.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">Contact Support</button>
          </motion.div>
        </section>

        {/* Footer */}
      <Footer/>
      </div>
    </>
  );
};

export default About;
