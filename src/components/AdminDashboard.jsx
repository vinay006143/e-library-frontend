import { useState } from "react";
import {
  Book,
  Users,
  BarChart3,
  LayoutGrid,
  Star,
  Home,
  LogOut,
} from "lucide-react";
import Navbar from "./Navbar";
import CategoryManager from "./CategoryManager";
import UserManager from "./UserManager";
import ApiBooks from "./ApiBooks";  
import BookRatingLevels from "./BookRatingLevels";
import BookForm from "./BookForm";

const navItems = [
  { icon: <BarChart3 size={20} />, label: "Dashboard" },
  { icon: <Book size={20} />, label: "Books" },
  { icon: <Users size={20} />, label: "Users" },
  { icon: <LayoutGrid size={20} />, label: "Categories" },
  { icon: <Star size={20} />, label: "Ratings" },
  { icon: <Home size={20} />, label: "Home Section" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [accessGranted, setAccessGranted] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const handleAccess = () => {
    if (passwordInput === "ADMIN") {
      setAccessGranted(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardOverview />;
      case "Books":
        return <BookForm />;
      case "Users":
        return <UserManager />;
      case "Categories":
        return <CategoryManager />;
      case "Ratings":
        return <BookRatingLevels/>;
      case "Home Section":
        return <HomeManagement />;
      default:
        return null;
    }
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter Access Code"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAccess}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-semibold"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Admin Dashboard | e-library</title>
     <Navbar/>
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 via-indigo-50 to-blue-100">
     
      {/* Sidebar */}
      <aside className="w-64 hidden sm:flex flex-col bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-2xl p-6">
        <h1 className="text-2xl font-bold mb-8">Admin</h1>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-violet-500/20 ${
                active === item.label ? "bg-white text-indigo-700 font-bold" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/20">
          <button className="flex items-center gap-2 text-red-300 hover:text-red-100 transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10 animate-fadeIn">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">{active}</h2>
        {renderContent()}
      </main>
    </div>
    
</>
  );
}

// Reusable Section
function Section({ title }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl animate-fadeIn border-l-4 border-indigo-500">
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>
      <p className="text-slate-600">Manage and edit the {title.toLowerCase()} here.</p>
    </div>
  );
}

// Dashboard Cards
function DashboardOverview() {
  const stats = [
    { title: "Total Books", value: "1,254" },
    { title: "Total Users", value: "15" },
    { title: "Categories", value: "25" },
    { title: "Avg Rating", value: "4.7 / 5" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-fadeIn">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-tr from-indigo-100 to-violet-200 p-6 rounded-3xl shadow-lg transform hover:scale-[1.02] transition"
        >
          <h4 className="text-sm text-indigo-800 font-medium">{item.title}</h4>
          <p className="text-3xl font-bold text-indigo-900 mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// Home Management
function HomeManagement() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-blue-100 to-sky-200 rounded-3xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">📖 Latest Books</h2>
        <p className="text-slate-600">Update the latest books shown on the homepage.</p>
      </div>
      <div className="bg-gradient-to-br from-purple-100 to-fuchsia-200 rounded-3xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">🔥 Popular Books</h2>
        <p className="text-slate-600">Set popular books that appear on the homepage.</p>
      </div>
      <div className="bg-gradient-to-br from-blue-100 to-sky-200 rounded-3xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">📖 Technology Books</h2>
        <p className="text-slate-600">Update the latest books shown on the homepage.</p>
      </div>
      <div className="bg-gradient-to-br from-purple-100 to-fuchsia-200 rounded-3xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">🔥 Story Books</h2>
        <p className="text-slate-600">Set popular books that appear on the homepage.</p>
      </div>
    </div>
    
  );
}
