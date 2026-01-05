import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TimelinePathFramer.css';

const TimelinePath = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.93], [0, 1]);

  return (
    <section ref={containerRef} className="timeline-path-section" id="journey">
      <h2 style={{
        textAlign: 'center',
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        color: '#2EC4FF',
        marginBottom: '50px',
        fontFamily: "'Departure Mono', monospace",
        fontWeight: 900,
        paddingTop: '100px'
      }}>
        My Journey
      </h2>

      <div className="timeline-content">
        <svg 
          id="svg-stage" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1400 2700"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Le path animé - PLUS ÉPAIS */}
          <motion.path
            d="M 450 20 L 380 200 C 180 450 420 680 300 850 C 150 1150 320 1250 300 1450 C 480 1750 320 1950 300 2150"
            fill="none"
            stroke="#2EC4FF"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength,
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 0.9))'
            }}
          />

          {/* Bulles animées - PLUS GRANDES */}
          <motion.circle 
            cx="450" cy="20" r="25" 
            fill="#2EC4FF"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
              opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 1))'
            }}
          />
          
          <motion.circle 
            cx="380" cy="200" r="25" 
            fill="#2EC4FF"
            style={{
              scale: useTransform(scrollYProgress, [0.18, 0.26], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.18, 0.26], [0, 1]),
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 1))'
            }}
          />

          <motion.circle 
            cx="300" cy="850" r="25" 
            fill="#2EC4FF"
            style={{
              scale: useTransform(scrollYProgress, [0.38, 0.46], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.38, 0.46], [0, 1]),
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 1))'
            }}
          />

          <motion.circle 
            cx="300" cy="1450" r="25" 
            fill="#2EC4FF"
            style={{
              scale: useTransform(scrollYProgress, [0.65, 0.73], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.65, 0.73], [0, 1]),
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 1))'
            }}
          />

          <motion.circle 
            cx="300" cy="2150" r="25" 
            fill="#2EC4FF"
            style={{
              scale: useTransform(scrollYProgress, [0.85, 0.93], [0, 1]),
              opacity: useTransform(scrollYProgress, [0.85, 0.93], [0, 1]),
              filter: 'drop-shadow(0 0 20px rgba(46, 196, 255, 1))'
            }}
          />

          {/* Texte des années - DANS le SVG */}
          <motion.text 
            x="480" y="30" 
            fill="#2EC4FF" 
            fontSize="28"
            fontFamily="'Departure Mono', monospace"
            fontWeight="700"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
          >
            2020
          </motion.text>

          <motion.text 
            x="410" y="210" 
            fill="#2EC4FF" 
            fontSize="28"
            fontFamily="'Departure Mono', monospace"
            fontWeight="700"
            style={{ opacity: useTransform(scrollYProgress, [0.18, 0.26], [0, 1]) }}
          >
            2021
          </motion.text>

          <motion.text 
            x="330" y="860" 
            fill="#2EC4FF" 
            fontSize="28"
            fontFamily="'Departure Mono', monospace"
            fontWeight="700"
            style={{ opacity: useTransform(scrollYProgress, [0.38, 0.46], [0, 1]) }}
          >
            2021
          </motion.text>

          <motion.text 
            x="330" y="1460" 
            fill="#2EC4FF" 
            fontSize="28"
            fontFamily="'Departure Mono', monospace"
            fontWeight="700"
            style={{ opacity: useTransform(scrollYProgress, [0.65, 0.73], [0, 1]) }}
          >
            2023
          </motion.text>

          <motion.text 
            x="330" y="2160" 
            fill="#2EC4FF" 
            fontSize="28"
            fontFamily="'Departure Mono', monospace"
            fontWeight="700"
            style={{ opacity: useTransform(scrollYProgress, [0.85, 0.93], [0, 1]) }}
          >
            2025
          </motion.text>

          {/* Textes descriptifs - DANS le SVG pour alignement parfait */}
          <motion.foreignObject 
            x="650" y="0" width="700" height="100"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '24px',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              DEC in Health and Life Sciences, TAV College
            </p>
          </motion.foreignObject>

          <motion.foreignObject 
            x="600" y="180" width="700" height="100"
            style={{ opacity: useTransform(scrollYProgress, [0.18, 0.26], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '24px',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              Data Entry Officer, Biron Groupe Santé
            </p>
          </motion.foreignObject>

          <motion.foreignObject 
            x="550" y="830" width="700" height="100"
            style={{ opacity: useTransform(scrollYProgress, [0.38, 0.46], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '24px',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              BEng in Computer Engineering - Ongoing, Concordia University
            </p>
          </motion.foreignObject>

          <motion.foreignObject 
            x="550" y="1430" width="700" height="120"
            style={{ opacity: useTransform(scrollYProgress, [0.65, 0.73], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '24px',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              BSc (Cumulative) in Cybersecurity - Ongoing, Polytechnique Montréal
            </p>
          </motion.foreignObject>

          <motion.foreignObject 
            x="550" y="2130" width="700" height="120"
            style={{ opacity: useTransform(scrollYProgress, [0.85, 0.93], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '24px',
              margin: 0,
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              Software Developer & SEO Specialist (Freelance), Dr. Ali Izadpanah
            </p>
          </motion.foreignObject>

          {/* Paragraphe de conclusion à GAUCHE EN BAS - HAUTEUR AUGMENTÉE */}
          <motion.foreignObject 
            x="-450" y="2300" width="600" height="500"
            style={{ opacity: useTransform(scrollYProgress, [0.85, 0.93], [0, 1]) }}
          >
            <p style={{ 
              fontFamily: "'Departure Mono', monospace", 
              color: '#ffffff', 
              fontSize: '22px',
              margin: 0,
              lineHeight: '1.7',
              fontWeight: '400',
              textAlign: 'left'
            }}>
              My path has been shaped by curiosity and a constant desire to understand how things work beneath the surface. I enjoy building, breaking, and improving systems, blending creativity with technical rigor. Through engineering, cybersecurity, and personal projects, I've learned to grow through experimentation and discipline. I'm now preparing for the OSCP certification, pushing myself further into hands-on security while continuing to evolve as both a technologist and a problem solver.
            </p>
          </motion.foreignObject>
        </svg>
      </div>
    </section>
  );
};

export default TimelinePath;