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

  return (
    <div className="page-container">
      <h1>Избранное</h1>
      <div className="library-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск в избранном..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} showActions={true} />
          ))}
        </div>
      ) : (
        <p>У вас пока нет избранных книг. Добавьте их, нажав на сердечко.</p>
      )}
    </div>
  );
};

export default Favorites;