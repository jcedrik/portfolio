import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ProjectsTitle.css';

export default function ProjectsTitle() {
  const { t } = useTranslation();
  
  return (
    <div className="projects-title-container">
      <motion.div 
        className="projects-title-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span 
          className="projects-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <h2 className="projects-title">{t('projects.title')}</h2>
        <motion.span 
          className="projects-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </div>
  );
}