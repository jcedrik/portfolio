import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import AnimatedBackground from "./components/AnimatedBackground";
import SideMenu from "./components/SideMenu";
import Hero from "./components/Hero";
import ScrollIndicator from "./components/ScrollIndicator";
import MouseTrailGallery from "./components/MouseTrailGallery";
import Preloader from "./components/Preloader";
import TimelinePath from "./components/TimelinePathFramer";
import TextAlongPath from "./components/TextAlongPath/TextAlongPath";
import ProjectsInline from "./components/ProjectsPage/ProjectsInline";
import HorizontalScrollSection from "./components/HorizontalScroll/HorizontalScrollSection";
import StickyFooter from "./components/StickyFooter/StickyFooter";

function App() {
  const container = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll progress entre Hero et About
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Preloader timer - adapté pour 9 mots
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2400);
  }, []);

  // Lenis pour smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Rendre Lenis accessible globalement pour d'autres composants
    (window as any).lenis = lenis;

    // Support pour les liens d'ancrage
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: 0,
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* PRELOADER avec AnimatePresence */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <AnimatedBackground />
      <SideMenu />

      {/* CONTAINER pour l'effet de transition (Hero + About) */}
      <main ref={container} style={{ position: 'relative', height: '200vh' }}>
        <HeroSection scrollYProgress={scrollYProgress} />
        <AboutSection scrollYProgress={scrollYProgress} />
      </main>

      {/* SECTIONS SUIVANTES (scroll normal) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        background: '#0A0F2C'
      }}>
        {/* Timeline Path */}
        <section id="journey">
          <TimelinePath />
        </section>

        {/* ✅ TEXT ALONG PATH - Transition vers Projects */}
        <TextAlongPath />

        {/* Projects Section */}
        <section id="projects">
          <ProjectsInline />
        </section>

        {/* Horizontal Scroll - Transition vers Skills */}
        <HorizontalScrollSection />

        {/* Sticky Footer - Contact Section */}
        <StickyFooter />
      </div>
    </>
  );
}

// HERO SECTION avec effet de zoom out et rotation
const HeroSection = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      style={{ 
        scale, 
        rotate,
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Hero />
      <ScrollIndicator />
    </motion.div>
  );
};

// ABOUT SECTION avec effet de zoom in et rotation inverse
const AboutSection = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div
      id="about"
      style={{ 
        scale, 
        rotate,
        position: 'relative',
        height: '100vh'
      }}
    >
      {/* Overlay flou */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(10, 15, 44, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 0
      }} />

      {/* Contenu About */}
      <div style={{ 
        position: "relative", 
        zIndex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Titre About Me */}
        <div style={{ 
          position: "absolute",
          top: "30px",
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: "clamp(1.6rem, 8vw, 10rem)",
            fontWeight: 900,
            fontFamily: "'Departure Mono', 'Courier New', monospace",
            color: "#ffffff",
            margin: 0
          }}>
            About Me
          </h2>
        </div>

        {/* Mouse Trail Gallery */}
        <MouseTrailGallery />

        {/* Texte About */}
        <div style={{ 
          position: "absolute",
          bottom: "40px",
          maxWidth: "700px",
          padding: "20px 30px",
          color: "white",
          textAlign: "center",
          fontSize: "0.95rem",
          lineHeight: "1.7",
          fontFamily: "'Departure Mono', 'Courier New', monospace",
          zIndex: 10,
          background: "rgba(10, 15, 44, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px"
        }}>
          <p style={{ marginBottom: "12px", opacity: 0.95 }}>
            I am Jean-Cedrik Dorelas, a web developer and computer engineering student with a strong interest in cybersecurity, passionate about building innovative and interactive digital experiences. I am currently pursuing studies in Computer Engineering while also training in Cybersecurity, allowing me to combine software development with a strong understanding of systems, security, and performance.
          </p>
          <p style={{ opacity: 0.95, marginBottom: 0 }}>
            My background in athletics and basketball has shaped a disciplined and resilient mindset that values collaboration, continuous improvement, and personal excellence—qualities I bring into every technical and team-based project.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default App;