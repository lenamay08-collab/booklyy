import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCarousel from '../components/BookCarousel';  // импортируем карусель
import './Catalog.css';

const chashka = '/chashka.png';
const loopa = '/loopa.png';

const Catalog = () => {
  const { catalogBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = catalogBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        <div className="catalog-header">
          <div className="catalog-title-section">
            <h1 className="catalog-title">Каталог книг</h1>
            <p className="catalog-subtitle">Выберите книгу для чтения</p>
          </div>
          <div className="catalog-search">
            <input
              type="text"
              placeholder="Поиск книг или авторов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"><img src={loopa} alt="" /></span>
          </div>
        </div>
        <div className="catalog-decor">
          <div className="decor-items">
              <img src={chashka} alt="" />
          </div>
        </div>
        {filteredBooks.length > 0 ? (
          <BookCarousel books={filteredBooks} />   // ← вместо сетки
        ) : (
          <div className="no-results">
            <p>Книги не найдены</p>
            <p className="no-results-sub">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;