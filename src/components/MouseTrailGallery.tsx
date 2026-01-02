import { useRef } from 'react';
import './MouseTrailGallery.css';

export default function MouseTrailGallery() {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const stepsRef = useRef(0);
  const currentIndexRef = useRef(0);
  const nbOfImagesRef = useRef(0);
  const maxNumberOfImages = 4;  // ✅ Max 4 images à la fois
  const numberOfImages = 5;      // ✅ 5 images totales

  const manageMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, movementX, movementY } = e;

    stepsRef.current += Math.abs(movementX) + Math.abs(movementY);

    if (stepsRef.current >= currentIndexRef.current * 120) {  // ✅ Moins sensible
      moveImage(clientX, clientY);

      if (nbOfImagesRef.current === maxNumberOfImages) {
        removeImage();
      }
    }

    if (currentIndexRef.current === refs.current.length) {
      currentIndexRef.current = 0;
      stepsRef.current = -120;
    }
  };

  const moveImage = (x: number, y: number) => {
    const currentImage = refs.current[currentIndexRef.current];
    if (currentImage) {
      currentImage.style.left = x + "px";
      currentImage.style.top = y + "px";
      currentImage.style.display = "block";
      currentIndexRef.current++;
      nbOfImagesRef.current++;
      setZIndex();
    }
  };

  const setZIndex = () => {
    const images = getCurrentImages();
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        images[i]!.style.zIndex = String(i);
      }
    }
  };

  const removeImage = () => {
    const images = getCurrentImages();
    if (images[0]) {
      images[0].style.display = "none";
      nbOfImagesRef.current--;
    }
  };

  const getCurrentImages = () => {
    const images: (HTMLImageElement | null)[] = [];
    let indexOfFirst = currentIndexRef.current - nbOfImagesRef.current;
    for (let i = indexOfFirst; i < currentIndexRef.current; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += refs.current.length;
      images.push(refs.current[targetIndex]);
    }
    return images;
  };

  // ✅ PHOTOS 1, 3, 4, 5, 8
  const images = [
    '/images/1.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/8.jpg'
  ];

  return (
    <div 
      onMouseMove={manageMouseMove} 
      className="mouse-trail-gallery"
    >
      {images.map((src, index) => (
        <img
          key={index}
          ref={(el) => (refs.current[index] = el)}
          src={src}
          alt={`Gallery ${index + 1}`}
        />
      ))}
    </div>
  );
}