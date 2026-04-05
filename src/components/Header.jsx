import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import './Header.css';

const logo = '/logo.png';

const Header = () => {
  const location = useLocation();
  const { user, logout, openLoginModal } = useBooks();

  const isActive = (path) => location.pathname === path;

  const handleSignInClick = (e) => {
    e.preventDefault();
    openLoginModal();
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
      <nav className="header-nav">
        <Link to="/" className={(isActive('/') ? 'active' : '') + ' nav_buttons'}>Главная</Link>
        <Link to="/library" className={(isActive('/library') ? 'active' : '') + ' nav_buttons'}>Моя библиотека</Link>
        <Link to="/favorites" className={(isActive('/favorites') ? 'active' : '') + ' nav_buttons'}>Избранное</Link>
        {user ? (
          <div className="user-info">
            <p id = "user-name">Привет, {user.username}</p>
            <button onClick={logout} className="logout-btn">Выйти</button>
          </div>
        ) : (
          <a href="#" onClick={handleSignInClick}>Войти</a>
        )}

      </nav>
    </header>
  );
};

export default Header;


