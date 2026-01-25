import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenFrontImg from '../assets/raven-front.png';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Creators work differently",
  "Developers think differently",
  "Bodies & senses differ too"
];

export default function HumanFrameSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image - moves slower than scroll
      gsap.to(imageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Entrance animation for image
      gsap.from(imageRef.current, {
        x: -150,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Staggered text animation
      const contentElements = contentRef.current.querySelectorAll('.animate-in');
      gsap.from(contentElements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
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
      id="human-frame"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Large edge-bleeding image - extends past left edge */}
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-left"
        style={{
          left: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70%',
          maxWidth: '1000px',
        }}
      >
        <DotMatrixImage
          src={ravenFrontImg}
          alt="Raven AR glasses front view"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1100,
          }}
        />
      </div>

      {/* Content - positioned right with glassmorphism backdrop */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-end">
          <div
            ref={contentRef}
            className="lg:w-1/2 lg:pl-8 p-8 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2
              className="animate-in text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              Human<br />Frame
            </h2>

            <p
              className="animate-in text-xl md:text-2xl mb-8"
              style={{
                color: '#6E6E6E',
                fontFamily: 'var(--font-sans)'
              }}
            >
              People experience the world differently.
            </p>

            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="animate-in flex items-center gap-4"
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#9FB8A0' }}
                  />
                  <span
                    className="text-lg md:text-xl"
                    style={{
                      color: '#6E6E6E',
                      fontFamily: 'var(--font-bullets)'
                    }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
