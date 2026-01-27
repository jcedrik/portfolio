import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './TimelinePathFramer.css';

const TimelinePath = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  const timelineData = [
    { year: '2020', descriptionKey: 'journey.items.2020_tav' },
    { year: '2021', descriptionKey: 'journey.items.2021_biron' },
    { year: '2021', descriptionKey: 'journey.items.2021_concordia' },
    { year: '2023', descriptionKey: 'journey.items.2023_poly' }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Line grows as you scroll
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="timeline-section" id="journey">
      {/* Title */}
      <motion.h2 
        className="timeline-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {t('journey.title')}
      </motion.h2>

      {/* Timeline Container */}
      <div className="timeline-container">
        {/* Timeline Items */}
        <div className="timeline-items">
          {/* Animated Line - inside items so it stops with them */}
          <div className="timeline-line-wrapper">
            <div className="timeline-line-bg" />
            <motion.div 
              className="timeline-line"
              style={{ height: lineHeight }}
            />
          </div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Dot */}
              <motion.div 
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              
              {/* Content Card */}
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <p className="timeline-description">{t(item.descriptionKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Conclusion */}
        <motion.div
          className="timeline-conclusion"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>{t('journey.conclusion')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelinePath;