import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ProjectsList.css';

interface Project {
  name: string;
  locationKey: string;
  year: string;
  servicesKey: string;
  image: string;
  link?: string;
  descriptionKey: string;
  tags: string[];
  gallery: string[];
}

const projects: Project[] = [
  {
    name: "Axiom Realty",
    locationKey: "projects.axiom.location",
    year: "2025",
    servicesKey: "projects.axiom.services",
    image: "/images/axiomrealty_screenshot1.png",
    link: "https://axiomrealty.ca/",
    descriptionKey: "projects.axiom.description",
    tags: ["Development", "Creative Dev", "React"],
    gallery: [
      "/images/axiomrealty_screenshot1.png",
      "/images/axiomrealty_screenshot2.png",
      "/images/axiomrealty_screenshot3.png"
    ]
  },
  {
    name: "Dr. Ali Izadpanah",
    locationKey: "projects.drali.location",
    year: "2025",
    servicesKey: "projects.drali.services",
    image: "/images/drali_screenshot1.png",
    link: "#",
    descriptionKey: "projects.drali.description",
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
  const { t, i18n } = useTranslation();
  
  // Fallback for location/services if key not found
  const getTranslation = (key: string, fallback: string) => {
    const result = t(key);
    return result === key ? fallback : result;
  };

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

    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    items.forEach((item, index) => {
      const handleMouseEnter = () => {
        if (expandedIndex !== null) return;
        
        const forward = prevIndex === null || index > prevIndex;
        prevIndex = index;

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

        const visual = item.querySelector('[data-follower-visual]');
        if (!visual) return;
        const clone = visual.cloneNode(true) as HTMLElement;
        followerInner.appendChild(clone);

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

    const handleCollectionLeave = () => {
      follower.querySelectorAll('[data-follower-visual]').forEach((el) => {
        gsap.killTweensOf(el);
        gsap.delayedCall(duration, () => el.remove());
      });
      firstEntry = true;
      prevIndex = null;
    };
    collection.addEventListener('mouseleave', handleCollectionLeave);

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
      <div className="projects-list-header">
        <h2 className="projects-list-title">{t('projects.selectedWork')}</h2>
      </div>

      <div data-follower-wrap="" className="preview-container" ref={wrapRef}>
        <div className="preview-item__row preview-table-header tablet--hide">
          <div className="preview-item__col is--large">
            <span className="preview-container__label">{t('projects.client')}</span>
          </div>
          <div className="preview-item__col is--small">
            <span className="preview-container__label">{t('projects.location')}</span>
          </div>
          <div className="preview-item__col is--small">
            <span className="preview-container__label">{t('projects.year')}</span>
          </div>
          <div className="preview-item__col is--medium">
            <span className="preview-container__label">{t('projects.type')}</span>
          </div>
        </div>

        <div data-follower-collection="" className="preview-collection">
          <div className="preview-list">
            {projects.map((project, index) => (
              <div 
                key={index} 
                data-follower-item="" 
                className={`preview-item ${expandedIndex === index ? 'is-expanded' : ''}`}
              >
                <div 
                  className="preview-item__inner"
                  onClick={() => handleItemClick(index)}
                >
                  <div className="preview-item__row">
                    <div className="preview-item__col is--large">
                      <h2 className="preview-item__heading">{project.name}</h2>
                    </div>
                    <div className="preview-item__col is--small tablet--hide">
                      <p className="preview-item__text">{getTranslation(project.locationKey, 'Montreal')}</p>
                    </div>
                    <div className="preview-item__col is--small">
                      <p className="preview-item__text">{project.year}</p>
                    </div>
                    <div className="preview-item__col is--medium">
                      <p className="preview-item__text">{getTranslation(project.servicesKey, 'Web Design')}</p>
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
                        <p className="preview-item__description">
                          {t(project.descriptionKey)}
                        </p>

                        {project.link && project.link !== '#' && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="preview-item__link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t('projects.seeWebsite')}
                          </a>
                        )}

                        <div className="preview-item__tags">
                          {project.tags.map((tag, i) => (
                            <div key={i} className="preview-item__tag">
                              <span className="preview-item__tag-dot" />
                              {tag}
                            </div>
                          ))}
                        </div>

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

        <div 
          data-follower-cursor="" 
          className={`preview-follower ${expandedIndex !== null ? 'is-hidden' : ''}`}
        >
          <div data-follower-cursor-inner="" className="preview-follower__inner">
            <div className="preview-follower__label">
              <div className="preview-follower__label-span">{t('projects.viewCase')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;