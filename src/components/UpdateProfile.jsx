import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileUploader() {
  const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
  const userId = user?._id;

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle image file preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch existing profile if available
  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/profiles/user/${userId}`);
      setProfile(res.data);
      setFullName(res.data.fullName || "");
      setBio(res.data.bio || "");
      if (res.data.profileImage) {
        setPreview(`http://localhost:5000${res.data.profileImage}`);
      }

      // Store in localStorage
      localStorage.setItem("userProfile", JSON.stringify(res.data));
    } catch (err) {
      console.log("No existing profile or fetch failed.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  // Handle submit: upload to DB and store in localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", fullName);
    formData.append("bio", bio);
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/profiles/upload", formData);
      setProfile(res.data.profile);
      setMessage(res.data.message || "Profile updated");

      // ✅ Save profile in localStorage
      localStorage.setItem("userProfile", JSON.stringify(res.data.profile));
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio"
          className="w-full border p-2 rounded mb-3"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mb-3"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {message && <p className="mt-3 text-green-600">{message}</p>}
      </form>

      {profile && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Profile Info</h3>
          <p><strong>Name:</strong> {profile.fullName}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          {profile.profileImage && (
            <img
              src={`http://localhost:5000${profile.profileImage}`}
              alt="Profile"
              className="w-32 h-32 mt-2 object-cover rounded-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
