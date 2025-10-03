// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://e-library-backend-gaw0.onrender.com/api",
});

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
