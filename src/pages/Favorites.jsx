import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import './Pages.css';

const Favorites = () => {
  const { favorites, getBookById } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');

  const favoriteBooks = favorites
    .map(id => getBookById(id))
    .filter(book => book);

  const filteredBooks = favoriteBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasBooks = favoriteBooks.length > 0;

  return (
    <div className="page-container favorites-page">
      <div className="library-header">
        <h1>Избранное</h1>
        {hasBooks && (
          <div className="library-search">
            <input
              type="text"
              placeholder="Поиск в избранном..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">
              <img src="/loopa.png" alt="Поиск" />
            </span>
          </div>
        )}
      </div>

      {hasBooks && (
        <div className="favorites-decor">
          <img src="/chashka.png" alt="" />
        </div>
      )}

      <div className="library-content">
        {!hasBooks ? (
          <div className="empty-library-container">
            <img src="/openbook.png" alt="" className="empty-library-image" />
            <div className="empty-library-message">
              <p>
                У вас пока ничего не добавлено в «Избранное».
                <br />
                Нажмите на сердечко рядом с книгой,
                <br />
                чтобы сохранить её сюда.
              </p>
            </div>
          </div>
        ) : (
          <>
            {filteredBooks.length > 0 ? (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} showActions={true} />
                ))}
              </div>
            ) : (
              <div className="no-results-message">
                <p>Нет книг по вашему запросу.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;