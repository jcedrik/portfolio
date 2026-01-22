import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectsList.css';

interface Project {
  name: string;
  location: string;
  year: string;
  services: string;
  image: string;
  link?: string;
  description: string;
  tags: string[];
  gallery: string[];
}

const projects: Project[] = [
  {
    name: "Axiom Realty",
    location: "Montreal",
    year: "2025",
    services: "Web Design, Development",
    image: "/images/axiomrealty_screenshot1.png",
    link: "https://axiomrealty.ca/",
    description: "Developed a luxury real estate platform with sophisticated UI components, featuring black/gold/white color palettes and Cormorant Garamond typography. Built with React, TypeScript, and advanced GSAP animations for a premium user experience.",
    tags: ["Development", "Creative Dev", "React"],
    gallery: [
      "/images/axiomrealty_screenshot1.png",
      "/images/axiomrealty_screenshot2.png",
      "/images/axiomrealty_screenshot3.png"
    ]
  },
  {
    name: "Dr. Ali Izadpanah",
    location: "Montreal",
    year: "2025",
    services: "Web Design, SEO",
    image: "/images/drali_screenshot1.png",
    link: "#",
    description: "Redesigned and optimized Dr. Ali Izadpanah's medical website, improving visual consistency, credibility, and patient experience. Implemented on-page SEO, and refined UX details to increase clarity and trust.",
    tags: ["Web Design", "SEO", "UX / Performance"],
    gallery: [
      "/images/drali_screenshot1.png",
      "/images/drali_screenshot2.png",
      "/images/drali_screenshot3.png"
    ]
  }
];

const ProjectsList = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const collection = wrap.querySelector('[data-follower-collection]');
    const items = wrap.querySelectorAll('[data-follower-item]');
    const follower = wrap.querySelector('[data-follower-cursor]') as HTMLElement;
    const followerInner = wrap.querySelector('[data-follower-cursor-inner]') as HTMLElement;
    
    if (!collection || !follower || !followerInner) return;

    let prevIndex: number | null = null;
    let firstEntry = true;
    const offset = 100;
    const duration = 0.5;
    const ease = 'power2.inOut';

    // Initialize follower position
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // Quick setters for x/y
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });

    // Move follower on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Enter/leave per item
    items.forEach((item, index) => {
      const handleMouseEnter = () => {
        // Don't show cursor preview if item is expanded
        if (expandedIndex !== null) return;
        
        const forward = prevIndex === null || index > prevIndex;
        prevIndex = index;

        // Animate out existing visuals
        follower.querySelectorAll('[data-follower-visual]').forEach((el) => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            yPercent: forward ? -offset : offset,
            duration,
            ease,
            overwrite: 'auto',
            onComplete: () => el.remove()
          });
        });

        // Clone & insert new visual
        const visual = item.querySelector('[data-follower-visual]');
        if (!visual) return;
        const clone = visual.cloneNode(true) as HTMLElement;
        followerInner.appendChild(clone);

        // Animate it in (unless it's the very first entry)
        if (!firstEntry) {
          gsap.fromTo(clone,
            { yPercent: forward ? offset : -offset },
            { yPercent: 0, duration, ease, overwrite: 'auto' }
          );
        } else {
          firstEntry = false;
        }
      };

      const handleMouseLeave = () => {
        const el = follower.querySelector('[data-follower-visual]');
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.to(el, {
          yPercent: -offset,
          duration,
          ease,
          overwrite: 'auto',
          onComplete: () => el.remove()
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    // If pointer leaves the collection, clear any visuals
    const handleCollectionLeave = () => {
      follower.querySelectorAll('[data-follower-visual]').forEach((el) => {
        gsap.killTweensOf(el);
        gsap.delayedCall(duration, () => el.remove());
      });
      firstEntry = true;
      prevIndex = null;
    };
    collection.addEventListener('mouseleave', handleCollectionLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      collection.removeEventListener('mouseleave', handleCollectionLeave);
    };
  }, [expandedIndex]);

  const handleItemClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="projects-list-section" id="work">
      {/* Section Header */}
      <div className="projects-list-header">
        <h2 className="projects-list-title">Selected Work</h2>
      </div>

      {/* Preview Container - Osmo Structure */}
      <div data-follower-wrap="" className="preview-container" ref={wrapRef}>
        {/* Table Header */}
        <div className="preview-item__row preview-table-header tablet--hide">
          <div className="preview-item__col is--large">
            <span className="preview-container__label">Client</span>
          </div>
          <div className="preview-item__col is--small">
            <span className="preview-container__label">Location</span>
          </div>
          <div className="preview-item__col is--small">
            <span className="preview-container__label">Year</span>
          </div>
          <div className="preview-item__col is--medium">
            <span className="preview-container__label">Type</span>
          </div>
        </div>

        {/* Projects Collection */}
        <div data-follower-collection="" className="preview-collection">
          <div className="preview-list">
            {projects.map((project, index) => (
              <div 
                key={index} 
                data-follower-item="" 
                className={`preview-item ${expandedIndex === index ? 'is-expanded' : ''}`}
              >
                {/* Clickable Row */}
                <div 
                  className="preview-item__inner"
                  onClick={() => handleItemClick(index)}
                >
                  <div className="preview-item__row">
                    <div className="preview-item__col is--large">
                      <h2 className="preview-item__heading">{project.name}</h2>
                    </div>
                    <div className="preview-item__col is--small tablet--hide">
                      <p className="preview-item__text">{project.location}</p>
                    </div>
                    <div className="preview-item__col is--small">
                      <p className="preview-item__text">{project.year}</p>
                    </div>
                    <div className="preview-item__col is--medium">
                      <p className="preview-item__text">{project.services}</p>
                    </div>
                  </div>
                  <div data-follower-visual="" className="preview-item__visual">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="preview-item__visual-img" 
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      className="preview-item__expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="preview-item__expanded-content">
                        {/* Description */}
                        <p className="preview-item__description">
                          {project.description}
                        </p>

                        {/* See Website Button */}
                        {project.link && project.link !== '#' && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="preview-item__link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            See website
                          </a>
                        )}

                        {/* Tags */}
                        <div className="preview-item__tags">
                          {project.tags.map((tag, i) => (
                            <div key={i} className="preview-item__tag">
                              <span className="preview-item__tag-dot" />
                              {tag}
                            </div>
                          ))}
                        </div>

                        {/* Gallery */}
                        <div className="preview-item__gallery">
                          {project.gallery.map((img, i) => (
                            <div key={i} className="preview-item__gallery-img">
                              <img src={img} alt={`${project.name} screenshot ${i + 1}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Cursor Follower - Hidden when expanded */}
        <div 
          data-follower-cursor="" 
          className={`preview-follower ${expandedIndex !== null ? 'is-hidden' : ''}`}
        >
          <div data-follower-cursor-inner="" className="preview-follower__inner">
            <div className="preview-follower__label">
              <div className="preview-follower__label-span">View case</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;