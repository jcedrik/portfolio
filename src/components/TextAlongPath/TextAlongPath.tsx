import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from 'framer-motion';
import './TextAlongPath.css';

export default function TextAlongPath() {
    const container = useRef<HTMLDivElement>(null);
    const paths = useRef<(SVGTextPathElement | null)[]>([]);
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end end']
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (e) => {
            paths.current.forEach((path, i) => {
                if (path) {
                    // Ajusté pour 2 répétitions (50% d'écart)
                    path.setAttribute("startOffset", -50 + (i * 50) + (e * 50) + "%");
                }
            });
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    // Texte personnalisé
    const text = "THIS JOURNEY LED ME FROM CURIOSITY TO CREATION • ";

    return (
        <div ref={container} className="text-along-path-container">
            {/* SVG avec viewBox plus large pour éviter le chevauchement */}
            <svg 
                className="text-along-path-svg" 
                viewBox="0 0 500 180"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Path courbe élargi */}
                <path 
                    fill="none" 
                    id="curve" 
                    d="m0,177c122.74,0,123-136,253-136,116,0,102,136,246,136"
                />
                
                {/* Texte qui suit le path - 2 répétitions seulement */}
                <text className="curved-text">
                    {[...Array(2)].map((_, i) => (
                        <textPath 
                            key={i} 
                            ref={ref => paths.current[i] = ref} 
                            startOffset={i * 50 + "%"} 
                            href="#curve"
                        >
                            {text}
                        </textPath>
                    ))}
                </text>
            </svg>

            {/* Sticky Footer qui soulève vers Projects */}
            <StickyFooter scrollProgress={scrollYProgress} />
        </div>
    );
}

// Composant Sticky Footer avec effet parallaxe
interface StickyFooterProps {
    scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const StickyFooter = ({ scrollProgress }: StickyFooterProps) => {
    const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

    return (
        <div className="sticky-footer-wrapper">
            <motion.div 
                style={{ y }} 
                className="sticky-footer-content"
            >
                <span className="footer-arrow">↓</span>
                <span className="footer-text">PROJECTS</span>
                <span className="footer-arrow">↓</span>
            </motion.div>
        </div>
    );
};