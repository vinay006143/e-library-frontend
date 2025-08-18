import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.map(cat => cat.name)); // only names for display
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
 
  return (
    <section className="py-10 px-4 sm:px-10 bg-white rounded-xl max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        Explore Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CategoryCard title={cat} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
