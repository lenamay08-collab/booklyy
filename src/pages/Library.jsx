import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import './Pages.css';

const Library = () => {
  const { userBooks, getBookById } = useBooks();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const libraryWithDetails = userBooks.map(ub => {
    const fullBook = getBookById(ub.id);
    return fullBook ? { ...fullBook, status: ub.status } : null;
  }).filter(book => book);

  const filteredBooks = libraryWithDetails.filter(book => {
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="page-container">
      <h1>Моя библиотека</h1>
      <div className="library-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск в библиотеке..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button onClick={() => setStatusFilter('all')} className={statusFilter === 'all' ? 'active' : ''}>Все</button>
          <button onClick={() => setStatusFilter('reading')} className={statusFilter === 'reading' ? 'active' : ''}>Читаю</button>
          <button onClick={() => setStatusFilter('read')} className={statusFilter === 'read' ? 'active' : ''}>Прочитано</button>
        </div>
      </div>
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} showActions={true} />
          ))}
        </div>
      ) : (
        <p>В вашей библиотеке пока нет книг. Добавьте их из каталога!</p>
      )}
    </div>
  );
};

export default Library;