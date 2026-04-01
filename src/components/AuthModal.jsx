import React, { useState } from 'react';
import { forgotPassword } from '../services/api';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (mode === 'login') {
      const result = await onLogin(email, password);
      if (result.success) onClose();
      else setError(result.message);
    } else if (mode === 'register') {
      const result = await onRegister(username, email, password);
      if (result.success) onClose();
      else setError(result.message);
    } else if (mode === 'forgot') {
      try {
        const response = await forgotPassword(email);
        setSuccessMessage(response.data.message);
        setMode('login');
        setEmail('');
        setError('');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка отправки');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          {mode === 'login' && 'Вход'}
          {mode === 'register' && 'Регистрация'}
          {mode === 'forgot' && 'Восстановление пароля'}
        </h2>
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {mode !== 'forgot' && (
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <button type="submit">
            {mode === 'login' && 'Войти'}
            {mode === 'register' && 'Зарегистрироваться'}
            {mode === 'forgot' && 'Отправить'}
          </button>
        </form>
        <div className="modal-footer">
          {mode === 'login' && (
            <>
              <button onClick={() => setMode('register')}>Нет аккаунта? Зарегистрироваться</button>
              <button onClick={() => setMode('forgot')}>Забыли пароль?</button>
            </>
          )}
          {mode === 'register' && (
            <button onClick={() => setMode('login')}>Уже есть аккаунт? Войти</button>
          )}
          {mode === 'forgot' && (
            <button onClick={() => setMode('login')}>Вернуться ко входу</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;