// src/axios.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://backend-express-self.vercel.app", // ⭐ Your backend base URL
});

// Automatically attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ⭐ Read token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // ⭐ Attach token
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
