import React from 'react';
import { useBooks } from '../context/BookContext';
import './BookCard.css';

const BookCard = ({ book, showActions = true }) => {
  const { userBooks, addToLibrary, updateBookStatus, removeFromLibrary, toggleFavorite, isFavorite } = useBooks();
  
  const userBook = userBooks.find(b => b.id === book.id);
  const status = userBook?.status || null;
  const favorite = isFavorite(book.id);
  const isInLibrary = !!userBook;

  const handleStatusClick = (newStatus) => {
    if (!isInLibrary) {
      // Если книги нет в библиотеке, сначала добавляем, затем меняем статус
      addToLibrary(book, newStatus);
    } else {
      updateBookStatus(book.id, newStatus === status ? null : newStatus);
    }
  };

  const handleRemove = () => {
    removeFromLibrary(book.id);
  };

  const handleFavorite = () => {
    toggleFavorite(book.id);
  };

  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.cover} alt={book.title} />
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <div className="book-divider"></div>
      <div className="book-actions">
        {showActions && (
          <>
            {isInLibrary ? (
              <>
                <button 
                  className={`action-btn ${status === 'reading' ? 'active' : ''}`}
                  onClick={() => handleStatusClick('reading')}
                >
                  Читаю
                </button>
                <button 
                  className={`action-btn ${status === 'read' ? 'active' : ''}`}
                  onClick={() => handleStatusClick('read')}
                >
                  Прочитал
                </button>
                <button 
                  className="action-btn remove-btn"
                  onClick={handleRemove}
                >
                  Удалить
                </button>
              </>
            ) : (
              <button 
                className="action-btn add-btn"
                onClick={() => addToLibrary(book)}
              >
                Добавить
              </button>
            )}
            <button 
              className={`favorite-btn ${favorite ? 'active' : ''}`}
              onClick={handleFavorite}
            >
              ❤️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;