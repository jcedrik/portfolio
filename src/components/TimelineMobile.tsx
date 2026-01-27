import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './TimelineMobile.css';

const TimelineMobile = () => {
  const { t } = useTranslation();

  const timelineData = [
    { year: "2020", titleKey: "journey.items.2020_tav" },
    { year: "2021", titleKey: "journey.items.2021_biron" },
    { year: "2021", titleKey: "journey.items.2021_concordia" },
    { year: "2023", titleKey: "journey.items.2023_poly" },
  ];

  return (
    <section className="timeline-mobile-section" id="journey">
      <h2 className="timeline-mobile-title">{t('journey.title')}</h2>
      
      <div className="timeline-mobile-container">
        {timelineData.map((item, index) => (
          <motion.div 
            key={index}
            className="timeline-mobile-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="timeline-mobile-dot" />
            <div className="timeline-mobile-content">
              <span className="timeline-mobile-year">{item.year}</span>
              <p className="timeline-mobile-text">{t(item.titleKey)}</p>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          className="timeline-mobile-conclusion"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>{t('journey.conclusion')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineMobile;