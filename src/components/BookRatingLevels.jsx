import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#f97316", "#6366f1", "#eab308", "#ec4899"];

const SubjectRatingCard = ({ subject, avg, count }) => {
  const filledStars = Math.round(avg);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-white shadow hover:shadow-md transition-all">
      <div className="text-lg font-semibold text-gray-800 w-full md:w-1/3">{subject}</div>

      <div className="flex items-center gap-1 w-full md:w-1/3 justify-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({avg.toFixed(1)})</span>
      </div>

      <div className="text-sm text-gray-500 w-full md:w-1/3 text-right">{count} Ratings</div>
    </div>
  );
};

const RatingDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sampleData = [
      { subject: "Science Fiction", avg: 4.6, count: 238 },
      { subject: "Fantasy", avg: 4.4, count: 312 },
      { subject: "Mystery", avg: 4.2, count: 189 },
      { subject: "Historical Fiction", avg: 4.3, count: 221 },
      { subject: "Philosophy", avg: 4.7, count: 143 },
      { subject: "Poetry", avg: 4.1, count: 160 },
      { subject: "Biography", avg: 4.0, count: 178 },
      { subject: "Horror", avg: 3.9, count: 152 },
      { subject: "Adventure", avg: 4.5, count: 204 },
      { subject: "Romance", avg: 4.3, count: 300 },
    ];

    const fetchSample = () => {
      setTimeout(() => {
        const sorted = sampleData.sort((a, b) => b.avg - a.avg);
        setRatings(sorted);
        setLoading(false);
      }, 1000);
    };

    fetchSample();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-extrabold text-center text-gray-900">Top-Rated Book Categories</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Analytics based on average star ratings from top works per subject in the Open Library dataset.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {ratings.map((item, i) => (
              <SubjectRatingCard
                key={i}
                subject={item.subject}
                avg={item.avg}
                count={item.count}
              />
            ))}
          </motion.div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Rating Distribution by Subject</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={ratings} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="subject" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="avg" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Average Rating" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Number of Ratings by Subject</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={ratings} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="subject" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[0, 8, 8, 0]} name="Ratings Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Ratings Count Pie Chart</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={ratings}
                  dataKey="count"
                  nameKey="subject"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label
                >
                  {ratings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default RatingDashboard;
