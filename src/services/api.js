import axios from 'axios';
//В КОНЦЕ /api PORT 5000 !!!!!!!!!!!!!!!!!!!!!
const API_URL = 'https://ad0d8abe69a5c7be-185-191-56-132.serveousercontent.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (username, email, password) =>
  api.post('/auth/register', { username, email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const getUserLibrary = () => api.get('/books/library');
export const addBookToLibrary = (bookId, status) => api.post('/books/library', { bookId, status });
export const updateBookStatus = (bookId, status) => api.put(`/books/library/${bookId}`, { status });
export const removeBookFromLibrary = (bookId) => api.delete(`/books/library/${bookId}`);
export const getUserFavorites = () => api.get('/books/favorites');
export const addBookToFavorites = (bookId) => api.post('/books/favorites', { bookId });
export const removeBookFromFavorites = (bookId) => api.delete(`/books/favorites/${bookId}`);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, newPassword) => api.post('/auth/reset-password', { token, newPassword });

export default api;