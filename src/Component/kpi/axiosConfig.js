// src/api/axiosConfig.js

import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://apiv2.humanmaximizer.com/api/v1/", // Backend server URL
  // baseURL: "https://apiv2.humanmaximizer.com/api/v1/", // Backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add any auth tokens if required
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // If using authentication
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle known errors
      toast.error(error.response.data.message || "An error occurred.");
    } else if (error.request) {
      // Handle no response
      toast.error("No response from server. Please try again later.");
    } else {
      // Handle other errors
      toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
