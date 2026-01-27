import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import "./SideMenu.css";

// Animation 3D en perspective pour les titres
const linkVariants = {
  hidden: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1] as const,
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }
  }
};

// Animation pour les footer links
const slideIn = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1] as const
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }
  }
};

// Animation du menu window
const menuVariants = {
  open: {
    width: "380px",
    height: "85vh",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const }
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] as const }
  }
};

// Perspective Text Component (Olivier Larose style)
function PerspectiveText({ label }: { label: string }) {
  return (
    <div className="perspective-text">
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}

export default function SideMenu() {
  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const { t } = useTranslation();

  const navLinks = [
    { titleKey: "nav.about", href: "#about" },
    { titleKey: "nav.journey", href: "#journey" },
    { titleKey: "nav.projects", href: "#projects" },
    { titleKey: "nav.skills", href: "#skills" },
    { titleKey: "nav.contact", href: "#contact" },
  ];

  const footerLinks = [
    { titleKey: "social.linkedin", href: "https://www.linkedin.com/in/jean-c%C3%A9drik-dor%C3%A9las-71a5a9356" },
    { titleKey: "social.email", href: "mailto:jcedrik100@gmail.com" },
    { titleKey: "social.phone", href: "tel:+14384029966" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY > heroHeight * 0.5) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="menu"
            variants={menuVariants}
            animate={isActive ? "open" : "closed"}
            initial="closed"
          >
            <AnimatePresence>
              {isActive && (
                <div className="nav">
                  <div className="nav-body">
                    {navLinks.map((link, i) => (
                      <div key={link.href} className="link-container">
                        <motion.a
                          href={link.href}
                          custom={i}
                          variants={linkVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onClick={(e) => {
                            e.preventDefault();
                            const targetElement = document.querySelector(link.href);
                            if (targetElement) {
                              targetElement.scrollIntoView({ behavior: 'smooth' });
                            }
                            setIsActive(false);
                          }}
                        >
                          {t(link.titleKey)}
                        </motion.a>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer section */}
                  <div className="nav-footer-wrapper">
                    {/* Social links line */}
                    <motion.div className="nav-footer">
                      {footerLinks.map((link, i) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          custom={i}
                          variants={slideIn}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {t(link.titleKey)}
                        </motion.a>
                      ))}
                    </motion.div>
                    
                    {/* Language switcher on separate line */}
                    <motion.div 
                      className="nav-language"
                      custom={footerLinks.length}
                      variants={slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <LanguageSwitcher />
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Button with perspective effect */}
          <div className="menu-button">
            <motion.div
              className="menu-slider"
              animate={{ top: isActive ? "-100%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
            >
              <div className="menu-el" onClick={() => setIsActive(!isActive)}>
                <PerspectiveText label={t('nav.menu')} />
              </div>
              <div className="menu-el" onClick={() => setIsActive(!isActive)}>
                <PerspectiveText label={t('nav.close')} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}