import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import './Hero.css';

const heroImage = '/books-stack.png';

const Hero = () => {
    const { openLoginModal } = useBooks();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Ваша личная <br />
          библиотека <br />
          в одном месте 
          
        </h1>
        <p className="hero-description">
          Отмечайте прочитанные книги, <br />
          сохраняйте избранное и следите за прогрессом
        </p>
        <div className="hero-buttons">
          <Link to="/catalog" className="btn btn-primary">Начать читать</Link> 
 <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); openLoginModal(); }}
            className="btn btn-secondary"
          >
            Войти
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
};

export default Hero;