import axios from 'axios';

// Create API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;