import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CapsulePhysics from '../CapsulePhysics/CapsulePhysics';
import './HorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const panels = track.querySelectorAll('.horizontal-panel');
    
    // Calculer la distance totale à parcourir
    const totalWidth = (panels.length - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="horizontal-scroll-container" id="skills">
      <div ref={trackRef} className="horizontal-scroll-track">
        {/* Panel 1 - Transition Message */}
        <div className="horizontal-panel panel-transition">
          <div className="panel-content">
            <p className="transition-text">Now let's explore</p>
            <h2 className="transition-title">What I Work With</h2>
            <div className="scroll-hint">
              <span>Keep scrolling</span>
              <div className="arrow-right">→</div>
            </div>
          </div>
        </div>

        {/* Panel 2 - Skills */}
        <div className="horizontal-panel panel-skills">
          <CapsulePhysics />
        </div>
      </div>
    </section>
  );
}