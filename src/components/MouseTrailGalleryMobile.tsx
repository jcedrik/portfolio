import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MouseTrailGalleryMobile.css';

const images = [
  '/images/1.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/8.jpg'
];

export default function MouseTrailGalleryMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  // Generate random positions on mount
  useEffect(() => {
    const generatePositions = () => {
      return images.map(() => ({
        x: 15 + Math.random() * 70, // 15% to 85% of container width
        y: 15 + Math.random() * 70, // 15% to 85% of container height
      }));
    };
    setPositions(generatePositions());
  }, []);

  // Auto-cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      
      // Regenerate position for variety
      setPositions((prev) => {
        const newPositions = [...prev];
        const nextIndex = (currentIndex + 1) % images.length;
        newPositions[nextIndex] = {
          x: 15 + Math.random() * 70,
          y: 15 + Math.random() * 70,
        };
        return newPositions;
      });
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (positions.length === 0) return null;

  return (
    <div className="mobile-gallery-container">
      <AnimatePresence mode="popLayout">
        {images.map((src, index) => {
          // Show current and previous 2 images
          const distance = (currentIndex - index + images.length) % images.length;
          const isVisible = distance < 3;
          
          if (!isVisible) return null;

          return (
            <motion.div
              key={`${src}-${index}`}
              className="mobile-gallery-image-wrapper"
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                x: '-50%',
                y: '-50%'
              }}
              animate={{ 
                opacity: distance === 0 ? 1 : 0.6 - distance * 0.2,
                scale: distance === 0 ? 1 : 0.85 - distance * 0.1,
                x: '-50%',
                y: '-50%',
                left: `${positions[index]?.x || 50}%`,
                top: `${positions[index]?.y || 50}%`,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.3,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                zIndex: images.length - distance,
              }}
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="mobile-gallery-image"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="mobile-gallery-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`mobile-gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}