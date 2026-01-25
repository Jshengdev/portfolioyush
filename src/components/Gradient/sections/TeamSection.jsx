import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import headshotJohnny from '../assets/headshot-johnny.png';
import headshotAlan from '../assets/headshot-alan.png';
import headshotJack from '../assets/headshot-jack.jpg';
import headshotChris from '../assets/headshot-chris.png';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Johnny Sheng",
    role: "AI Orchestration",
    headshot: headshotJohnny,
    education: "USC",
    description: "Building intelligent agents that understand human intent."
  },
  {
    name: "Alan Wu",
    role: "Neuroscience",
    headshot: headshotAlan,
    education: "Cornell",
    description: "Understanding how the brain processes sensory experiences."
  },
  {
    name: "Jack Yuan",
    role: "UX / Interaction",
    headshot: headshotJack,
    education: "Parsons",
    description: "Designing intuitive interfaces for human-AI interaction."
  },
  {
    name: "Chris Park",
    role: "Visual / Motion",
    headshot: headshotChris,
    education: "USC",
    description: "Creating immersive visual experiences and animations."
  }
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background faces
      gsap.to(bgRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Entrance animation for background
      gsap.from(bgRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      const elements = contentRef.current.querySelectorAll('.animate-in');
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Interactive columns with large headshots */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 grid grid-cols-4"
      >
        {team.map((member, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer transition-all duration-400"
            style={{
              opacity: hoveredIndex === null ? 0.7 : hoveredIndex === index ? 1 : 0.15,
              transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
              filter: hoveredIndex === index
                ? 'brightness(1.4) contrast(1.2) saturate(1.8)'
                : 'brightness(0.9) saturate(0.7)',
              zIndex: hoveredIndex === index ? 10 : 1,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Vibrant glow effect on hover */}
            {hoveredIndex === index && (
              <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 150px rgba(159, 184, 160, 0.5), inset 0 0 80px rgba(216, 180, 160, 0.3)',
                }}
              />
            )}

            {/* Face background */}
            <div
              className="absolute inset-0"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <DotMatrixImage
                src={member.headshot}
                alt={`${member.name} background`}
                className="w-full h-full object-cover"
                config={{
                  gridSize: 3,
                  canvasSize: 800,
                }}
              />
            </div>

            {/* Hover overlay with details */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-400"
              style={{
                background: hoveredIndex === index
                  ? 'linear-gradient(to top, rgba(30,30,30,0.98) 0%, rgba(30,30,30,0.85) 40%, rgba(30,30,30,0.4) 70%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
              }}
            >
              {/* Name - always visible */}
              <h3
                className="font-bold mb-2 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: '#FFFFFF',
                  fontSize: hoveredIndex === index ? '2.5rem' : '1.5rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                {member.name}
              </h3>

              {/* Details - visible on hover */}
              <div
                className="transition-all duration-400 overflow-hidden"
                style={{
                  maxHeight: hoveredIndex === index ? '250px' : '0px',
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {/* Education */}
                <p
                  className="text-base mb-2 font-semibold"
                  style={{ color: '#FFFFFF' }}
                >
                  {member.education}
                </p>

                {/* Role */}
                <p
                  className="text-xl font-bold mb-4"
                  style={{ color: '#9FB8A0' }}
                >
                  {member.role}
                </p>

                {/* Description */}
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#F0F0F0' }}
                >
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Title overlay */}
      <div className="w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-16 relative z-10 pointer-events-none">
        <div ref={contentRef}>
          {/* Title */}
          <div className="animate-in mb-12 text-center">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ color: '#2E2E2E' }}>Meet the </span>
              <span className="gradient-text">Team</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
