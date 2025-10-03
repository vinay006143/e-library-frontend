import React, { useState } from "react";
import axios from "axios";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const toggleCurrent = () => setShowCurrent(!showCurrent);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://e-library-backend-gaw0.onrender.com/api/users/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password.");
    }
  };

  const renderPasswordInput = (
    label,
    value,
    setValue,
    show,
    toggleShow
  ) => (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold text-center mb-4 text-indigo-700 flex items-center justify-center gap-2">
        <AiOutlineLock className="text-2xl" />
        Change Password
      </h2>

      {message && (
        <div className="flex items-center gap-2 text-green-600 mb-3 text-center justify-center">
          <AiOutlineCheckCircle className="text-lg" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-500 mb-3 text-center justify-center">
          <AiOutlineCloseCircle className="text-lg" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderPasswordInput(
          "Current Password",
          currentPassword,
          setCurrentPassword,
          showCurrent,
          toggleCurrent
        )}

        {renderPasswordInput(
          "New Password",
          newPassword,
          setNewPassword,
          showNew,
          toggleNew
        )}

        {renderPasswordInput(
          "Confirm New Password",
          confirmPassword,
          setConfirmPassword,
          showConfirm,
          toggleConfirm
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
