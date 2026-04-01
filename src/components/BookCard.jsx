import React from 'react';
import { useBooks } from '../context/BookContext';
import './BookCard.css';

const BookCard = ({ book, showActions = true }) => {
  console.log('BookCard book:', book);
  const { userBooks, addToLibrary, updateBookStatus, removeFromLibrary, toggleFavorite, isFavorite, isBookInLibrary, getUserBookStatus } = useBooks();
  
  const isInLibrary = isBookInLibrary(book.id);
  const status = getUserBookStatus(book.id);
  const favorite = isFavorite(book.id);

  const handleStatusClick = (newStatus) => {
    if (!isInLibrary) {
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
        <div className="action-buttons">
          {showActions && (
            isInLibrary ? (
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
                  Прочитано
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
            )
          )}
        </div>
        <div className="favorite-wrapper">
          <button className="favorite-btn" onClick={handleFavorite}>
            <img 
              src={favorite ? "/serd.png" : "/serd-not.png"} 
              alt={favorite ? "Убрать из избранного" : "Добавить в избранное"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;