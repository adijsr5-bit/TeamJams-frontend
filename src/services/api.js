import axios from 'axios';

// Ensure this matches your deployment backend URL in production
// In production, use VITE_API_BASE_URL from environment variables
// Make sure to add VITE_API_BASE_URL in your Vercel Dashboard!
export const BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_BASE_URL || 'https://restaurant-project-185t.onrender.com')
  : 'http://localhost:5000';

export const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Add token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
