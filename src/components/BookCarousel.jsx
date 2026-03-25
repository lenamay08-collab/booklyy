import React, { useRef } from 'react';
import BookCard from './BookCard';
import './BookCarousel.css';

const BookCarousel = ({ books }) => {
  const carouselRef = useRef(null);

  const cardWidth = 240;
  const gap = 24;
  const scrollStep = 3 * (cardWidth + gap) - gap; // ширина трёх карточек с промежутками

  const scroll = (direction) => {
    if (carouselRef.current) {
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollStep : scrollStep);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={() => scroll('left')}>
        ←
      </button>
      <div className="carousel-track" ref={carouselRef}>
        {books.map((book) => (
          <div className="carousel-slide" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
      <button className="carousel-btn next" onClick={() => scroll('right')}>
        →
      </button>
    </div>
  );
};

export default BookCarousel;