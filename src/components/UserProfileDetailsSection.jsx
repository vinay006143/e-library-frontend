import React, { useEffect, useState } from "react";
import { User2Icon, BookOpenIcon, ImageIcon } from "lucide-react";

export default function UserDashboard() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-indigo-100">Here’s your profile overview.</p>
      </div>

      {userProfile ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            {userProfile.profileImage ? (
              <img
                src={`http://localhost:5000${userProfile.profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-4xl font-bold shadow-md">
                {userProfile.fullName?.charAt(0) || "?"}
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-lg text-indigo-700 font-semibold">
                <User2Icon className="w-5 h-5" />
                {userProfile.fullName}
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <BookOpenIcon className="w-5 h-5 mt-1" />
                <p className="italic">{userProfile.bio || "No bio available."}</p>
              </div>
              <p className="text-sm text-gray-400">
                Joined on{" "}
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No profile loaded.</p>
        </div>
      )}
    </div>
  );
}
