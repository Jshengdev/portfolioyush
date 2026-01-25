import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 50;
const COLORS = ['#9FB8A0', '#D8B4A0', '#C4956A', '#8FA88F', '#A0987D'];

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    // Start at random position
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + 10;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 0.3 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    // Subtle drift oscillation
    this.oscillationSpeed = Math.random() * 0.02 + 0.01;
    this.oscillationAmount = Math.random() * 30 + 10;
    this.oscillationOffset = Math.random() * Math.PI * 2;
  }

  update(time) {
    this.y -= this.speedY;
    this.x += this.speedX + Math.sin(time * this.oscillationSpeed + this.oscillationOffset) * 0.1;

    // Reset when out of view
    if (this.y < -10) {
      this.reset();
    }

    // Wrap horizontally
    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.x > this.canvas.width + 10) this.x = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function AmbientParticles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(canvas)
    );

    // Animation loop
    let startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update(elapsed);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
