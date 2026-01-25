import { useRef, useEffect } from 'react';
import { useScroll, useSpring } from 'framer-motion';

export default function ParticleBlob({
    className = "",
    particleCount = 2000,
    colors = ['#9FB8A0', '#D8B4A0', '#C4956A']
}) {
    const canvasRef = useRef(null);
    const { scrollY } = useScroll();

    // Smooth out scroll values for softer animation
    const smoothScroll = useSpring(scrollY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Particle system state
        const particles = [];

        const initParticles = () => {
            const { width, height } = canvas;
            particles.length = 0; // Clear existing

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    initialX: Math.random() * width,
                    initialY: Math.random() * height,
                });
            }
        };

        const handleResize = () => {
            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Set actual size in memory (scaled to account for extra pixel density)
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Normalize coordinate system to use css pixels
            ctx.scale(dpr, dpr);

            initParticles();
        };

        // Initial setup
        handleResize();
        window.addEventListener('resize', handleResize);

        // Animation Loop
        const render = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;

            ctx.clearRect(0, 0, width, height);

            // Get scroll influence
            const scrollYValue = smoothScroll.get();

            particles.forEach(p => {
                // Update simple physics (Brownian motion)
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Scroll Interaction: Shift opacity or slight position based on scroll
                // Creating a "wave" effect with scroll
                const waveX = Math.sin(scrollYValue * 0.002 + p.initialY * 0.01) * 20;
                const waveY = Math.cos(scrollYValue * 0.002 + p.initialX * 0.01) * 20;

                const drawX = p.x + waveX;
                const drawY = p.y + waveY;

                // Draw particle
                ctx.beginPath();
                ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;

                // Opacity flicker based on position and scroll logic for "living" feel
                const opacity = 0.4 + 0.4 * Math.sin(p.x * 0.01 + p.y * 0.01 + scrollYValue * 0.005);
                ctx.globalAlpha = opacity;

                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothScroll, particleCount, colors]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
