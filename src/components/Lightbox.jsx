import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Lightbox.css';

export default function Lightbox({ images = [], initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  if (!images.length) return null;

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close Lightbox">
        &times;
      </button>

      {images.length > 1 && (
        <button className="lightbox-arrow lightbox-arrow-left" onClick={handlePrev} aria-label="Previous Image">
          &#10094;
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrapper">
          <img 
            src={images[currentIndex]} 
            alt={`Gallery image ${currentIndex + 1}`} 
            className="lightbox-image"
          />
        </div>
        <div className="lightbox-counter">
          <span className="current">{currentIndex + 1}</span>
          <span className="divider">/</span>
          <span className="total">{images.length}</span>
        </div>
      </div>

      {images.length > 1 && (
        <button className="lightbox-arrow lightbox-arrow-right" onClick={handleNext} aria-label="Next Image">
          &#10095;
        </button>
      )}
    </div>,
    document.body
  );
}
