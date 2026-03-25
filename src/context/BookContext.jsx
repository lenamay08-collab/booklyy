import React, { createContext, useState, useContext, useEffect } from 'react';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  // Пользователь
  const [user, setUser] = useState(null);
  
  // Все книги пользователя (личная библиотека)
  const [userBooks, setUserBooks] = useState([]);
  
  // Избранное — просто список ID книг
  const [favorites, setFavorites] = useState([]);
  
  // Статический каталог книг
  const [catalogBooks] = useState([
    { id: 1, title: "Мастер и Маргарита", author: "Михаил Булгаков", cover: "/book1.png" },
    { id: 2, title: "Бесы", author: "Фёдор Достоевский", cover: "https://via.placeholder.com/280x320/8B7355/FFFFFF?text=Преступление+и+наказание" },
    { id: 3, title: "Анна Каренина", author: "Лев Толстой", cover: "https://via.placeholder.com/280x320/A58E6F/FFFFFF?text=Анна+Каренина" },
    { id: 4, title: "1984", author: "Джордж Оруэлл", cover: "https://via.placeholder.com/280x320/C4A27A/FFFFFF?text=1984" },
    { id: 5, title: "Война и мир", author: "Лев Толстой", cover: "https://via.placeholder.com/280x320/B88B4A/FFFFFF?text=Война+и+мир" },
    { id: 6, title: "Идиот", author: "Фёдор Достоевский", cover: "https://via.placeholder.com/280x320/D4B48C/FFFFFF?text=Идиот" },
  ]);

  // Состояние модального окна входа
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Загрузка из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('bookly_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    const storedUserBooks = localStorage.getItem('bookly_userBooks');
    if (storedUserBooks) setUserBooks(JSON.parse(storedUserBooks));
    
    const storedFavorites = localStorage.getItem('bookly_favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('bookly_userBooks', JSON.stringify(userBooks));
  }, [userBooks]);
  
  useEffect(() => {
    localStorage.setItem('bookly_favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    if (user) localStorage.setItem('bookly_user', JSON.stringify(user));
    else localStorage.removeItem('bookly_user');
  }, [user]);

  const login = (username) => {
    setUser({ username });
  };
  
  const logout = () => {
    setUser(null);
    setUserBooks([]);
    setFavorites([]);
  };

  const addToLibrary = (book, status = null) => {
    setUserBooks(prev => {
      if (prev.some(b => b.id === book.id)) return prev;
      return [...prev, { ...book, status }];
    });
  };

  const updateBookStatus = (bookId, status) => {
    setUserBooks(prev =>
      prev.map(book =>
        book.id === bookId ? { ...book, status } : book
      )
    );
  };

  const removeFromLibrary = (bookId) => {
    setUserBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const toggleFavorite = (bookId) => {
    setFavorites(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const isFavorite = (bookId) => favorites.includes(bookId);

  const getBookById = (id) => catalogBooks.find(b => b.id === id);

  return (
  <BookContext.Provider value={{
    user,
    login,
    logout,
    catalogBooks,
    userBooks,
    favorites,          // <-- добавлено
    addToLibrary,
    updateBookStatus,
    removeFromLibrary,
    toggleFavorite,
    isFavorite,
    getBookById,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  }}>
      {children}
    </BookContext.Provider>
  );
};