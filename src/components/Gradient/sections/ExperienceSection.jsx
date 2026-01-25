import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenFrameImg from '../assets/raven-frame.png';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax - image scales up slightly as you scroll
      gsap.to(imageRef.current, {
        scale: 1.1,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Entrance animation
      gsap.from(imageRef.current, {
        scale: 0.9,
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
        scale: 0.95,
        y: 30,
        duration: 1,
        stagger: 0.15,
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
      id="experience"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Full-bleed background image - edge to edge */}
      <div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none edge-fade-full"
        style={{ opacity: 0.35 }}
      >
        <div style={{ width: '120%', maxWidth: '1600px' }}>
          <DotMatrixImage
            src={ravenFrameImg}
            alt="Raven AR glasses frame close-up"
            className="w-full"
            animated={true}
            config={{
              gridSize: 8,
              scanSpeed: 2,
              canvasSize: 1400,
            }}
          />
        </div>
      </div>

      {/* Centered content with backdrop */}
      <div className="w-full max-w-4xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div
          ref={contentRef}
          className="text-center p-10 rounded-3xl"
          style={{
            background: 'rgba(246, 244, 240, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <p
            className="animate-in text-2xl md:text-3xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#2E2E2E'
            }}
          >
            This is
          </p>

          <h2
            className="animate-in text-6xl md:text-7xl lg:text-8xl mb-6 gradient-text"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.0,
            }}
          >
            GRADIENT
          </h2>

          <p
            className="animate-in text-2xl md:text-3xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#6E6E6E'
            }}
          >
            Experience With Us!
          </p>
        </div>
      </div>
    </section>
  );
}
