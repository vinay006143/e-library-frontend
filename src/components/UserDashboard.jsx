import React, { useState,useEffect } from "react";
import {
  Home,
  BookOpen,
  Star,
  UserRoundPen,
  Heart,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import FavoriteBooks from "./FavoriteBooks";
import TopRatedBooks from "./TopRatedBooks";
import UserProfileSection from "./UserProfileSection";
import UserProfileDetailsSection from "./UserProfileDetailsSection";
import UserReadBooks from "./UserReadBooks";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(true);
  



const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser._id); 

const userId = storedUser._id


  // 👇 Dynamic user state
  const [user, setUser] = useState({ name: "", email: "" });
 
  useEffect(() => {
    // Example: Assuming user is stored in localStorage as a JSON string
   const storedUser = JSON.parse(localStorage.getItem("user")); // { _id, username, ... }
    // const userprofile = JSON.parse(localStorage.getItem("userprofile")); 
    // console.log(userprofile)
    if (storedUser) {
      setUser({
        name: storedUser.username || "Unknown User",
        email: storedUser.email || "unknown@example.com",
      });
    }
  }, []);
  const menuItems = [
    { label: "Dashboard", icon: <Home />, key: "dashboard" },
    { label: "Read Books", icon: <BookOpen />, key: "read" },
    { label: "Favorites", icon: <Heart />, key: "favorites" },
    { label: "Rated", icon: <Star />, key: "rated" },
     { label: "Update Profile", icon: <UserRoundPen />, key: "updateprofile" },
    { label: "Settings", icon: <Settings />, key: "settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
         return       <UserProfileDetailsSection  />;
      case "read":
        return <UserReadBooks/>;
      case "favorites":
        return <FavoriteBooks/>;
      case "rated":
        return <TopRatedBooks/>;
      case "updateprofile":
        return <UpdateProfile userId={userId}/>
      case "settings":
        return <ChangePassword/>;
      default:
        return <h2 className="text-xl">Select a tab from sidebar</h2>;
    }
  };
   const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        if (parsedProfile.profileImage) {
          setProfileImage(parsedProfile.profileImage);
          console.log(parsedProfile.profileImage)
        }
      } catch (error) {
        console.error('Invalid JSON in localStorage userProfile:', error);
      }
    }
  }, []);
  

  return (
    <>
      <title> UserDashboard | e-library</title>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
        {/* Sidebar */}
        <aside
          className={`bg-gradient-to-b from-white via-indigo-100 to-blue-100 text-gray-800 transition-all duration-500 ease-in-out ${
            isOpen ? "w-64" : "w-20"
          } relative shadow-lg rounded-tr-3xl rounded-br-3xl border-r border-blue-200`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 right-2 text-gray-700 focus:outline-none hover:scale-110 transition"
          >
            <Menu />
          </button>

          {/* User Icon and Info */}
        
          <div className="flex flex-col items-center mt-16 px-3">
            <div className="w-14 h-14 rounded-full bg-indigo-200 flex items-center justify-center shadow-md mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
      {profileImage ? (
        <img
          src={`https://e-library-backend-gaw0.onrender.com${profileImage}`}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="text-indigo-700 w-full h-full" size={28} />
      )}
    </div>
            </div>
            {isOpen && (
              <>
                <h2 className="text-md font-semibold mt-1">{user.name}</h2>
    <p className="text-sm text-gray-600">{user.email}</p>
              </>
            )}
          </div>

          {/* Menu Items */}
          <nav className="mt-10 space-y-2 px-3">
            {menuItems.map(({ label, icon, key }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.03 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-md"
                    : "hover:bg-indigo-200 text-gray-800"
                }`}
                onClick={() => setActiveTab(key)}
              >
                <span className="text-xl">{icon}</span>
                {isOpen && <span className="text-md font-medium">{label}</span>}
              </motion.div>
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-6 w-full px-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Logged out!")}
              className="w-full flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white py-2 rounded-xl transition"
            >
              {isOpen ? (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              ) : (
                <LogOut className="mx-auto" />
              )}
            </motion.button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 min-h-[400px] border border-gray-200"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </>
  );
}
