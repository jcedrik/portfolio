import { projects } from './data';
import Card from './CardInline';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import ProjectsTitle from './ProjectsTitle';

export default function ProjectsInline() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <main 
      ref={container} 
      id="projects"
      style={{
        position: 'relative',
        marginTop: '0',
      }}
    >
      {/* Titre animé */}
      <ProjectsTitle />
      
      {/* Cartes de projets */}
      <div style={{ background: '#0A0F2C', paddingTop: '50px' }}>
        {
          projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
          })
        }
      </div>
    </main>
  )
}