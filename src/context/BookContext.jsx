import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getUserLibrary, addBookToLibrary, updateBookStatus as apiUpdateBookStatus, removeBookFromLibrary, getUserFavorites, addBookToFavorites, removeBookFromFavorites } from '../services/api';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [catalogBooks] = useState([
    { id: 1, title: "Евгений Онегин", author: "Александр Пушкин", cover: "/1.png" },
    { id: 2, title: "Отцы и Дети", author: "Иван Тургенев", cover: "/2.png" },
    { id: 3, title: "Герой нашего времени", author: "Михаил Лермонтов", cover: "/3.png" },
    { id: 4, title: "Метро 2033", author: "Дмитрий Глуховский", cover: "/4.png" },
    { id: 5, title: "Ночной дозор", author: "Сергей Лукьяненко", cover: "/5.png" },
    { id: 6, title: "Лавр", author: "Евгений Водолазкин", cover: "/6.png" },
    { id: 7, title: "Мастер и Маргарита", author: "Михаил Булгаков", cover: "/7.png" },
    { id: 8, title: "Война и Мир", author: "Лев Толстой", cover: "/8.png" },
    { id: 9, title: "Мы", author: "Евгений Замятин", cover: "/9.png" },
  ]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const loadUserData = async () => {
    try {
      const [libraryRes, favoritesRes] = await Promise.all([
        getUserLibrary(),
        getUserFavorites()
      ]);
      setUserBooks(libraryRes.data);
      setFavorites(favoritesRes.data.map(item => item.book_id));
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      loadUserData().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      await loadUserData();
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || 'Ошибка входа' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await apiRegister(username, email, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      await loadUserData();
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || 'Ошибка регистрации' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserBooks([]);
    setFavorites([]);
  };

  const addToLibrary = async (book, status = null) => {
    if (userBooks.some(b => b.book_id === book.id)) return;
    try {
      await addBookToLibrary(book.id, status);
      setUserBooks(prev => [...prev, { book_id: book.id, status }]);
    } catch (error) {
      console.error('Ошибка добавления книги в библиотеку:', error);
    }
  };

  const updateBookStatus = async (bookId, newStatus) => {
    try {
      await apiUpdateBookStatus(bookId, newStatus);
      setUserBooks(prev =>
        prev.map(b => b.book_id === bookId ? { ...b, status: newStatus } : b)
      );
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
    }
  };

  const removeFromLibrary = async (bookId) => {
    try {
      await removeBookFromLibrary(bookId);
      setUserBooks(prev => prev.filter(b => b.book_id !== bookId));
    } catch (error) {
      console.error('Ошибка удаления книги:', error);
    }
  };

  const toggleFavorite = async (bookId) => {
    const isFav = favorites.includes(bookId);
    try {
      if (isFav) {
        await removeBookFromFavorites(bookId);
        setFavorites(prev => prev.filter(id => id !== bookId));
      } else {
        await addBookToFavorites(bookId);
        setFavorites(prev => [...prev, bookId]);
      }
    } catch (error) {
      console.error('Ошибка избранного:', error);
    }
  };

  const isFavorite = (bookId) => favorites.includes(bookId);

  const getBookById = (id) => catalogBooks.find(b => b.id === id);

  const getUserBookStatus = (bookId) => {
    const entry = userBooks.find(b => b.book_id === bookId);
    return entry ? entry.status : null;
  };

  const isBookInLibrary = (bookId) => userBooks.some(b => b.book_id === bookId);

  return (
    <BookContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        catalogBooks,
        userBooks,
        favorites,
        addToLibrary,
        updateBookStatus,
        removeFromLibrary,
        toggleFavorite,
        isFavorite,
        getBookById,
        getUserBookStatus,
        isBookInLibrary,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};