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

    // Engine
    const engine = Engine.create();
    engine.gravity.y = 1;

    // Renderer - laisse Matter créer son propre canvas
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

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions), // bottom
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions), // left
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions), // right
      Bodies.rectangle(width / 2, -25, width, 50, wallOptions), // top - AJOUTÉ
    ];
    Composite.add(engine.world, walls);

    // Capsules
    const capsules: Matter.Body[] = [];
    
    skills.forEach((skill, i) => {
      const capsuleWidth = skill.name.length * 15 + 40;
      const capsuleHeight = 40;
      
      // Position de départ DANS le conteneur (pas au-dessus)
      const startX = 100 + Math.random() * (width - 200);
      const startY = 50 + (i % 3) * 60; // Répartis sur 3 rangées en haut
      
      const capsule = Bodies.rectangle(
        startX,
        startY,
        capsuleWidth,
        capsuleHeight,
        {
          chamfer: { radius: 20 },
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

    // Fix scroll issue
    const removeMouseWheelListener = () => {
      render.canvas.removeEventListener('wheel', mouse.mousewheel as EventListener);
    };
    removeMouseWheelListener();

    // Draw text on capsules
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      
      capsules.forEach((capsule) => {
        const { x, y } = capsule.position;
        const angle = capsule.angle;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = "bold 13px 'Departure Mono', monospace";
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