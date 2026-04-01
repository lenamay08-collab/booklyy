import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import './Pages.css';

const Library = () => {
  const { userBooks, getBookById } = useBooks();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const libraryWithDetails = userBooks
    .map(ub => {
      const fullBook = getBookById(ub.book_id);
      return fullBook ? { ...fullBook, status: ub.status } : null;
    })
    .filter(book => book);

  const filteredBooks = libraryWithDetails.filter(book => {
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const hasBooks = libraryWithDetails.length > 0;

  return (
    <div className="page-container library-page">
      <div className="library-header">
        <h1>Моя библиотека</h1>
        {hasBooks && (
          <div className="library-search">
            <input
              type="text"
              placeholder="Поиск в библиотеке..."
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
        <div className="library-decor">
          <img src="/chashka.png" alt="Декорация" />
        </div>
      )}

      <div className="library-content">
        {!hasBooks ? (
          <div className="empty-library-container">
            <img src="/openbook.png" alt="Открытая книга" className="empty-library-image" />
            <div className="empty-library-message">
              <p>
                В Вашей библиотеке пока нет книг.
                <br />
                Нажмите «Добавить» в каталоге, выберите «Читаю»/«Прочитал»,
                <br />
                чтобы сохранить книгу сюда.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="filter-buttons">
              <button
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'active' : ''}
              >
                Все
              </button>
              <button
                onClick={() => setStatusFilter('reading')}
                className={statusFilter === 'reading' ? 'active' : ''}
              >
                Читаю
              </button>
              <button
                onClick={() => setStatusFilter('read')}
                className={statusFilter === 'read' ? 'active' : ''}
              >
                Прочитано
              </button>
            </div>

            {filteredBooks.length > 0 ? (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} showActions={true} />
                ))}
              </div>
            ) : (
              <div className="no-results-message">
                <p>Нет книг с выбранным статусом или по вашему запросу.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;