import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const Card = ({i, title, description, challenge, src, link, color, progress, range, targetScale, imagePosition = 'center', scaleRange = [2, 1], objectFit = 'cover', tags}) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], scaleRange)
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div 
      ref={container} 
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: '0px'
      }}
    >
      <motion.div 
        style={{
          backgroundColor: color, 
          scale, 
          top: `calc(-5vh + ${i * 25}px)`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '450px',
          width: '900px',
          maxWidth: '90%',
          borderRadius: '25px',
          padding: '40px',
          transformOrigin: 'top',
          overflow: 'hidden'
        }}
      >
        <h2 style={{
          textAlign: 'center',
          margin: '0px',
          fontSize: '24px',
          fontFamily: "'Departure Mono', monospace",
          color: '#000'
        }}>{title}</h2>
        
        <div style={{
          display: 'flex',
          height: '100%',
          marginTop: '30px',
          gap: '40px'
        }}>
          <div style={{
            width: '40%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <p style={{ 
              fontSize: '14px',
              fontFamily: "'Departure Mono', monospace",
              color: '#000',
              lineHeight: '1.6',
              margin: 0,
              marginBottom: '15px'
            }}>{description}</p>
            
            {challenge && (
              <p style={{
                fontSize: '12px',
                fontFamily: "'Departure Mono', monospace",
                color: 'rgba(0, 0, 0, 0.85)',
                lineHeight: '1.5',
                margin: 0,
                marginBottom: '15px',
                fontStyle: 'italic',
                paddingLeft: '10px',
                borderLeft: '2px solid rgba(0, 0, 0, 0.3)'
              }}>
                <strong style={{ fontStyle: 'normal' }}>Challenge:</strong> {challenge}
              </p>
            )}
            
            {tags && (
              <p style={{
                fontSize: '11px',
                fontFamily: "'Departure Mono', monospace",
                color: 'rgba(0, 0, 0, 0.7)',
                lineHeight: '1.4',
                margin: 0,
                fontWeight: '500'
              }}>{tags}</p>
            )}
          </div>

          <div style={{
            position: 'relative',
            width: '60%',
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div
              style={{
                scale: imageScale,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={`/images/${src}`}
                alt={title} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: '100%',
                  objectFit: objectFit,
                  objectPosition: imagePosition
                }}
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Card;