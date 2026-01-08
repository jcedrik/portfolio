import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TimelinePathFramer.css';

interface TimelineItem {
  year: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2020',
    description: 'DEC in Health and Life Sciences, TAV College'
  },
  {
    year: '2021',
    description: 'Data Entry Officer, Biron Groupe Santé'
  },
  {
    year: '2021',
    description: 'BEng in Computer Engineering - Ongoing, Concordia University'
  },
  {
    year: '2023',
    description: 'BSc (Cumulative) in Cybersecurity - Ongoing, Polytechnique Montréal'
  },
  {
    year: '2025',
    description: 'Software Developer & SEO Specialist (Freelance), Dr. Ali Izadpanah'
  }
];

const conclusionText = "My path has been shaped by curiosity and a constant desire to understand how things work beneath the surface. I enjoy building, breaking, and improving systems, blending creativity with technical rigor. Through engineering, cybersecurity, and personal projects, I've learned to grow through experimentation and discipline. I'm now preparing for the OSCP certification, pushing myself further into hands-on security while continuing to evolve as both a technologist and a problem solver.";

const TimelinePath = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
        My Journey
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
                <p className="timeline-description">{item.description}</p>
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
          <p>{conclusionText}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelinePath;