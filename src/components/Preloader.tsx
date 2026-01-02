import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './preloaderAnim';
import './Preloader.css';

const words = [
  "Watkwanonhwerá:ton",  // Mohawk
  "Bienvenue",           // Français
  "Welcome",             // Anglais
  "Bienvenidos",         // Espagnol
  "欢迎",                // Chinois
  "いらっしゃいませ",     // Japonais
  "مرحباً",              // Arabe
  "Добро пожаловать",    // Russe
  "Willkommen"           // Allemand
];

interface Dimension {
  width: number;
  height: number;
}

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    
    setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      className="preloader-introduction"
    >
      {dimension.width > 0 && (
        <>
          <motion.p 
            variants={opacity} 
            initial="initial" 
            animate="enter"
          >
            <span></span>
            {words[index]}
          </motion.p>
          <svg>
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}