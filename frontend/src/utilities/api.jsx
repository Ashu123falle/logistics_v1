import axios from "axios";

export const API = axios.create({
  baseURL: "https://logistics-v1.onrender.com/api", 
  // baseURL: "http://localhost:8080/api", 
});

// Add JWT token to all outgoing requests (if token exists)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


