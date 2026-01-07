import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import './CapsulePhysics.css';

const skills = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Python', color: '#3776AB' },
  { name: 'C', color: '#A8B9CC' },
  { name: 'C++', color: '#00599C' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'GSAP', color: '#88CE02' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'SEO', color: '#47A248' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Wireshark', color: '#1679A7' },
  { name: 'Nmap', color: '#4B275F' },
  { name: 'Burp Suite', color: '#FF6633' },
  { name: 'Cybersecurity', color: '#E63946' },
];

export default function CapsulePhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body, Events } = Matter;

    const container = sceneRef.current;
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 500;

    // Responsive sizing
    const isSmall = width < 500;
    const isMedium = width >= 500 && width < 900;
    
    const charWidth = isSmall ? 9 : isMedium ? 11 : 15;
    const basePadding = isSmall ? 25 : isMedium ? 32 : 40;
    const capsuleHeight = isSmall ? 30 : isMedium ? 36 : 40;
    const fontSize = isSmall ? 10 : isMedium ? 12 : 13;

    // Engine
    const engine = Engine.create();
    engine.gravity.y = 1;

    // Renderer
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Walls - thick walls to prevent any escape
    const wallOptions = { isStatic: true, render: { visible: false }, friction: 1 };
    const wallThickness = 200;
    const walls = [
      // Bottom - below the container
      Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width * 2, wallThickness, wallOptions),
      // Left - outside left edge
      Bodies.rectangle(-wallThickness / 2 + 10, height / 2, wallThickness, height * 2, wallOptions),
      // Right - outside right edge  
      Bodies.rectangle(width + wallThickness / 2 - 10, height / 2, wallThickness, height * 2, wallOptions),
      // Top - above the container
      Bodies.rectangle(width / 2, -wallThickness / 2 + 10, width * 2, wallThickness, wallOptions),
    ];
    Composite.add(engine.world, walls);

    // Capsules - positioned in a grid that falls
    const capsules: Matter.Body[] = [];
    
    const cols = isSmall ? 3 : 4;
    
    skills.forEach((skill, i) => {
      const capsuleWidth = skill.name.length * charWidth + basePadding;
      
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const spacingX = width / (cols + 1);
      const spacingY = 50;
      
      const startX = spacingX * (col + 1) + (Math.random() - 0.5) * 30;
      const startY = 40 + row * spacingY + (Math.random() - 0.5) * 15;
      
      const capsule = Bodies.rectangle(
        startX,
        startY,
        capsuleWidth,
        capsuleHeight,
        {
          chamfer: { radius: capsuleHeight / 2 },
          render: { fillStyle: skill.color },
          label: skill.name,
          restitution: 0.5,
          friction: 0.1,
        }
      );
      
      Body.setAngle(capsule, (Math.random() - 0.5) * 0.5);
      capsules.push(capsule);
    });
    
    Composite.add(engine.world, capsules);

    // Mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Fix scroll issue - prevent wheel events on canvas
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };
    render.canvas.addEventListener('wheel', handleWheel, { passive: true });

    // Draw text on capsules
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      
      capsules.forEach((capsule) => {
        const { x, y } = capsule.position;
        const angle = capsule.angle;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = `bold ${fontSize}px 'Departure Mono', monospace`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(capsule.label || '', 0, 0);
        ctx.restore();
      });
    });

    // Run
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup
    return () => {
      render.canvas.removeEventListener('wheel', handleWheel);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <section id="skills" className="capsule-physics-section">
      <h2 className="capsule-physics-title">Skills</h2>
      <p className="capsule-physics-subtitle">Drag and play with my tech stack</p>
      <div ref={sceneRef} className="capsule-physics-container" />
    </section>
  );
}