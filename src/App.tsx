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
import TimelineMobile from "./components/TimelineMobile";
import MouseTrailGalleryMobile from "./components/MouseTrailGalleryMobile";
import TextAlongPath from "./components/TextAlongPath/TextAlongPath";
import ProjectsInline from "./components/ProjectsPage/ProjectsInline";
import HorizontalScrollSection from "./components/HorizontalScroll/HorizontalScrollSection";
import StickyFooter from "./components/StickyFooter/StickyFooter";

function App() {
  const container = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Scroll progress entre Hero et About
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Check device type - includes tablets up to 1024px
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Use mobile/tablet timeline for screens <= 1024px
  const useSimpleTimeline = isMobile || isTablet;

  // Preloader timer
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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: false,
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
      infinite: false,
    });

    (window as any).lenis = lenis;

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
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <AnimatedBackground />
      <SideMenu />

      <main ref={container} style={{ position: 'relative', height: '200vh' }}>
        <HeroSection scrollYProgress={scrollYProgress} />
        <AboutSection scrollYProgress={scrollYProgress} isMobile={isMobile} isTablet={isTablet} />
      </main>

      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        background: '#0A0F2C'
      }}>
        {/* Timeline - Use simple version for mobile AND tablets */}
        <section id="journey">
          {useSimpleTimeline ? <TimelineMobile /> : <TimelinePath />}
        </section>

        <TextAlongPath />

        <section id="projects">
          <ProjectsInline />
        </section>

        <HorizontalScrollSection />

        <StickyFooter />
      </div>
    </>
  );
}

// HERO SECTION
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

// ABOUT SECTION - Responsive pour mobiles et tablettes
const AboutSection = ({ scrollYProgress, isMobile, isTablet }: { scrollYProgress: any; isMobile: boolean; isTablet: boolean }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  
  const isSmallScreen = isMobile || isTablet;
  
  // Detect iPhone SE size (375px or less)
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsIPhoneSE(window.innerWidth <= 375);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Short text for iPhone SE only
  const shortText1 = "I'm Jean-Cedrik Dorelas, a software developer and computer engineering student passionate about cybersecurity and building interactive digital experiences.";
  const shortText2 = "My athletics background shaped a disciplined mindset that values collaboration and continuous improvement.";
  
  // Full text for other devices
  const fullText1 = "I am Jean-Cedrik Dorelas, a software developer and computer engineering student with a strong interest in cybersecurity, passionate about building innovative and interactive digital experiences. I am currently pursuing studies in Computer Engineering while also training in Cybersecurity, allowing me to combine software development with a strong understanding of systems, security, and performance.";
  const fullText2 = "My background in athletics and basketball has shaped a disciplined and resilient mindset that values collaboration, continuous improvement, and personal excellence—qualities I bring into every technical and team-based project.";

  return (
    <motion.div
      id="about"
      style={{ 
        scale, 
        rotate,
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
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
        justifyContent: isMobile ? "flex-start" : "center",
        padding: isMobile ? "20px 15px" : isTablet ? "30px 40px" : "0"
      }}>
        {/* Titre About Me */}
        <div style={{ 
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "0" : "30px",
          zIndex: 10,
          marginBottom: isMobile ? "auto" : "0",
          paddingTop: isMobile ? "10px" : "0"
        }}>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.5rem, 7vw, 2.2rem)" : isTablet ? "clamp(2rem, 6vw, 3rem)" : "clamp(1.6rem, 8vw, 10rem)",
            fontWeight: 900,
            fontFamily: "'Departure Mono', 'Courier New', monospace",
            color: "#ffffff",
            margin: 0,
            textAlign: "center"
          }}>
            About Me
          </h2>
        </div>

        {/* Mouse Trail Gallery - Desktop or Mobile version */}
        {!isSmallScreen && <MouseTrailGallery />}
        {isSmallScreen && <MouseTrailGalleryMobile />}

        {/* Texte About */}
        <div style={{ 
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "0" : "40px",
          maxWidth: isMobile ? "100%" : isTablet ? "85%" : "700px",
          padding: isMobile ? "15px" : isTablet ? "25px 35px" : "20px 30px",
          color: "white",
          textAlign: "center",
          fontSize: isMobile ? "0.75rem" : isTablet ? "0.9rem" : "0.95rem",
          lineHeight: isMobile ? "1.5" : "1.7",
          fontFamily: "'Departure Mono', 'Courier New', monospace",
          zIndex: 10,
          background: "rgba(10, 15, 44, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          marginTop: isMobile ? "auto" : "0",
          marginBottom: isMobile ? "20px" : "0"
        }}>
          <p style={{ 
            marginBottom: isMobile ? "10px" : "12px", 
            opacity: 0.95,
            fontSize: "inherit"
          }}>
            {isIPhoneSE ? shortText1 : fullText1}
          </p>
          <p style={{ 
            opacity: 0.95, 
            marginBottom: 0,
            fontSize: "inherit"
          }}>
            {isIPhoneSE ? shortText2 : fullText2}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default App;