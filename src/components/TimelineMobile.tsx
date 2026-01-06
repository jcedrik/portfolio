import { motion } from 'framer-motion';
import './TimelineMobile.css';

// Timeline data
const timelineData = [
  { year: "2020", title: "DEC in Health and Life Sciences, TAV College" },
  { year: "2021", title: "Data Entry Officer, Biron Groupe Santé" },
  { year: "2021", title: "BEng in Computer Engineering - Ongoing, Concordia University" },
  { year: "2023", title: "BSc (Cumulative) in Cybersecurity - Ongoing, Polytechnique Montréal" },
  { year: "2025", title: "Software Developer & SEO Specialist (Freelance), Dr. Ali Izadpanah" },
];

const conclusionText = "My path has been shaped by curiosity and a constant desire to understand how things work beneath the surface. I enjoy building, breaking, and improving systems, blending creativity with technical rigor. Through engineering, cybersecurity, and personal projects, I've learned to grow through experimentation and discipline. I'm now preparing for the OSCP certification, pushing myself further into hands-on security while continuing to evolve as both a technologist and a problem solver.";

const TimelineMobile = () => {
  return (
    <section className="timeline-mobile-section" id="journey">
      <h2 className="timeline-mobile-title">My Journey</h2>
      
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
              <p className="timeline-mobile-text">{item.title}</p>
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
          <p>{conclusionText}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineMobile;