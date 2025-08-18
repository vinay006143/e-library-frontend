import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from './Navbar'
import Footer from './Footer'

export default function FeaturesPage() {
  useEffect(() => {
    document.title = "Features | eLibrary";
  }, []);

  return (
    <div className="font-sans bg-gradient-to-b from-white to-purple-50 text-gray-800">
      <Navbar/>
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Discover eLibrary Features
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-lg max-w-3xl mx-auto"
        >
          Everything you need to succeed in your academic and personal learning journey.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          {
            title: "Unlimited Access",
            desc: "Access thousands of books anytime, anywhere without limits.",
            icon: "📚",
          },
          {
            title: "Smart Search",
            desc: "Quickly find what you need using our intelligent search engine.",
            icon: "🔍",
          },
          {
            title: "Readed Books",
            desc: "Save your readed books and return anytime.",
            icon: "🔖",
          },
          {
            title: "Download Books",
            desc: "Download books and read them offline.",
            icon: "📥",
          },
          {
            title: "Favorite Books",
            desc: "Mark and organize the books you love the most.",
            icon: "❤️",
          },
          {
            title: "Access Anywhere ",
            desc: "Read books in world wide location are avaliable.",
            icon: "🌐",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="text-xl font-bold mt-4 text-purple-700">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Visual Showcase */}
      <section className="bg-purple-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Visual Experience</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Our design emphasizes clarity, simplicity, and user focus. Below is a glimpse of the actual UI design.
          </p>
   <img
      src="https://img.freepik.com/free-photo/hands-working-digital-device-network-graphic-overlay_53876-123863.jpg?t=st=1753784487~exp=1753788087~hmac=22b64217088d1bf2733af8c3be59415a439833b369131b338f7d05e72d9eac1b&w=1480"
      alt="Digital eLibrary Features Illustration"
      className="rounded-2xl mx-auto shadow-xl h-80 w-150"
    />


        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Aarav K.",
                msg: "eLibrary transformed my studies. It's like having a library in my pocket!",
              },
              {
                name: "Sneha D.",
                msg: "Simple, elegant, and powerful. I love the offline access feature!",
              },
              {
                name: "Rohit M.",
                msg: "I finally found a platform that helps me stay ahead in college. Amazing UX.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md transition"
              >
                <p className="text-sm text-gray-600 italic">"{t.msg}"</p>
                <p className="mt-4 text-purple-700 font-semibold">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Dive Into the eLibrary?</h2>
        <p className="mb-6 text-lg">Create your free account and start reading today.</p>
        <a
          href="/register"
          className="inline-block bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Join Now
        </a>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
}
