import { motion } from "framer-motion";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import FeaturesSection from "../components/FeaturesSection";
import AboutUs from "./About";
import HomeCategories from './HomeCategories'
import ApiBooks from './ApiBooks'
import PopularBooks from "./PopularBooks";
import TechnologyBooks from "./TechnologyBooks";
import { Link } from "react-router-dom";
import StoryBooks from "./StoryBooks";

export default function HomePage() {
  



  return (
    <>
      <title> Home | e-library</title>
      <Navbar />
      <div className="space-y-16 px-6 py-10 ">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl py-20 text-center shadow-lg my-1"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-4">Welcome to eLibrary</h1>
          <p className="text-lg max-w-xl mx-auto">
            Dive into a world of knowledge. Explore thousands of academic and
            competitive books with just one click.
          </p>

          <Link to="/books">
        
          <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:scale-105 transition-transform">
            Browse Collection
          </button>
            </Link>
        </motion.section>

        {/* Categories Section */}
      <HomeCategories/>
        {/* Latest Books */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
            Latest Arrivals
          </h2>
          
          <TechnologyBooks/>
         
        </section>

        {/* Popular Books */}
        <PopularBooks />
        {/* <ApiBooks/> */}
        <StoryBooks/>
        {/* Features section */}
        <FeaturesSection />
       
        {/* Testimonials */}
        <section className="bg-gray-100 p-8 rounded shadow">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <p className="text-gray-600">
                “This platform is amazing for finding all my academic books in
                one place.”
              </p>
              <p className="mt-2 font-semibold text-blue-700">— Anjali, B.Tech</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="text-gray-600">
                “User-friendly interface and tons of useful resources.”
              </p>
              <p className="mt-2 font-semibold text-blue-700">— Rakesh, MBA</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="text-gray-600">
                “Highly recommended for students across all fields.”
              </p>
              <p className="mt-2 font-semibold text-blue-700">— Priya, MCA</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-pink-500 to-indigo-600 text-white text-center py-16 rounded-xl shadow">
          <h2 className="text-4xl font-bold mb-4">Start Your Learning Journey Today</h2>
          <p className="mb-6 text-lg">
            Register now and get access to 1000+ educational books and resources.
          </p>
        <Link to="/books"> <button className="bg-white text-pink-600 px-6 py-3 font-semibold rounded hover:bg-gray-100">
            Get Started
          </button></Link> 
        </section>

      
      </div>
      <Footer />
    </>
  );
}
