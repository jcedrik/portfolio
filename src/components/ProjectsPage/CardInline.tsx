import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CardProps {
  i: number;
  titleKey: string;
  descriptionKey: string;
  challengeKey?: string;
  src: string;
  link?: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  imagePosition?: string;
  scaleRange?: [number, number];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  tags?: string;
  tagsKey?: string;
}

const Card = ({
  i, 
  titleKey, 
  descriptionKey, 
  challengeKey, 
  src, 
  color, 
  progress, 
  range, 
  targetScale, 
  imagePosition = 'center', 
  scaleRange = [2, 1], 
  objectFit = 'cover', 
  tags,
  tagsKey
}: CardProps) => {

  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const scale = useTransform(progress, range, [1, targetScale]);

  // Get challenge label based on language
  const challengeLabel = i18n.language?.startsWith('fr') ? 'Défi' : 'Challenge';
  
  // Get tags - use translated tags if tagsKey exists, otherwise use default tags
  const displayTags = tagsKey ? t(tagsKey) : tags;

  // Styles for desktop
  const desktopStyles = {
    container: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky' as const,
      top: '0px'
    },
    card: {
      backgroundColor: color, 
      scale, 
      top: `calc(-5vh + ${i * 25}px)`,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      height: '450px',
      width: '900px',
      maxWidth: '90%',
      borderRadius: '25px',
      padding: '40px',
      transformOrigin: 'top',
      overflow: 'hidden'
    },
    title: {
      textAlign: 'center' as const,
      margin: '0px',
      fontSize: '24px',
      fontFamily: "'Departure Mono', monospace",
      color: '#000'
    },
    body: {
      display: 'flex',
      height: '100%',
      marginTop: '30px',
      gap: '40px'
    },
    textContent: {
      width: '40%',
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center'
    },
    description: { 
      fontSize: '14px',
      fontFamily: "'Departure Mono', monospace",
      color: '#000',
      lineHeight: '1.6',
      margin: 0,
      marginBottom: '15px'
    },
    challenge: {
      fontSize: '12px',
      fontFamily: "'Departure Mono', monospace",
      color: 'rgba(0, 0, 0, 0.85)',
      lineHeight: '1.5',
      margin: 0,
      marginBottom: '15px',
      fontStyle: 'italic' as const,
      paddingLeft: '10px',
      borderLeft: '2px solid rgba(0, 0, 0, 0.3)'
    },
    tags: {
      fontSize: '11px',
      fontFamily: "'Departure Mono', monospace",
      color: 'rgba(0, 0, 0, 0.7)',
      lineHeight: '1.4',
      margin: 0,
      fontWeight: '500'
    },
    imageContainer: {
      position: 'relative' as const,
      width: '60%',
      height: '100%',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageInner: {
      scale: imageScale,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
      objectFit: objectFit,
      objectPosition: imagePosition
    }
  };

  // Styles for mobile
  const mobileStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky' as const,
      top: '0px',
      padding: '20px 0'
    },
    card: {
      backgroundColor: color, 
      scale, 
      top: `calc(-5vh + ${i * 25}px)`,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      height: 'auto',
      width: '92%',
      maxWidth: '92%',
      borderRadius: '20px',
      padding: '25px 20px',
      transformOrigin: 'top',
      overflow: 'hidden'
    },
    title: {
      textAlign: 'center' as const,
      margin: '0 0 20px 0',
      fontSize: '18px',
      fontFamily: "'Departure Mono', monospace",
      color: '#000',
      lineHeight: '1.3'
    },
    body: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px'
    },
    textContent: {
      width: '100%',
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      order: 2
    },
    description: { 
      fontSize: '13px',
      fontFamily: "'Departure Mono', monospace",
      color: '#000',
      lineHeight: '1.5',
      margin: 0,
      marginBottom: '12px'
    },
    challenge: {
      fontSize: '11px',
      fontFamily: "'Departure Mono', monospace",
      color: 'rgba(0, 0, 0, 0.85)',
      lineHeight: '1.4',
      margin: 0,
      marginBottom: '12px',
      fontStyle: 'italic' as const,
      paddingLeft: '10px',
      borderLeft: '2px solid rgba(0, 0, 0, 0.3)'
    },
    tags: {
      fontSize: '10px',
      fontFamily: "'Departure Mono', monospace",
      color: 'rgba(0, 0, 0, 0.7)',
      lineHeight: '1.4',
      margin: 0,
      fontWeight: '500'
    },
    imageContainer: {
      position: 'relative' as const,
      width: '100%',
      height: '200px',
      borderRadius: '15px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      order: 1
    },
    imageInner: {
      scale: imageScale,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      objectPosition: imagePosition
    }
  };

  // Use mobile or desktop styles
  const styles = isMobile ? mobileStyles : desktopStyles;
 
  return (
    <div 
      ref={container} 
      style={styles.container}
    >
      <motion.div style={styles.card}>
        <h2 style={styles.title}>{t(titleKey)}</h2>
        
        <div style={styles.body}>
          <div style={styles.textContent}>
            <p style={styles.description}>{t(descriptionKey)}</p>
            
            {challengeKey && (
              <p style={styles.challenge}>
                <strong style={{ fontStyle: 'normal' }}>{challengeLabel}:</strong> {t(challengeKey)}
              </p>
            )}
            
            {displayTags && (
              <p style={styles.tags}>{displayTags}</p>
            )}
          </div>

          <div style={styles.imageContainer}>
            <motion.div style={styles.imageInner}>
              <img
                src={`/images/${src}`}
                alt={t(titleKey)} 
                style={styles.image}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card;