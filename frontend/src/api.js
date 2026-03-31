import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Har request ke saath token bhejne ke liye middleware
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);