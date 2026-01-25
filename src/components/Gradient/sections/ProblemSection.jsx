import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenStrapImg from '../assets/raven-strap.png';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  "One-size-fits-all modes",
  "Clinical labels",
  "Static settings"
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -100,
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
        x: 150,
        opacity: 0,
        duration: 1.2,
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
      id="problem"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Edge-bleeding image - extends past right edge */}
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-right"
        style={{
          right: '-15%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '65%',
          maxWidth: '950px',
        }}
      >
        <DotMatrixImage
          src={ravenStrapImg}
          alt="Raven AR glasses with strap"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1100,
          }}
        />
      </div>

      {/* Content with glassmorphism */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-start">
          <div
            ref={contentRef}
            className="lg:w-1/2 lg:pr-8 p-8 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2
              className="animate-in text-5xl md:text-6xl lg:text-7xl mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              The Problem
            </h2>

            <p
              className="animate-in text-2xl md:text-3xl mb-8"
              style={{
                color: '#2E2E2E',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Accessibility today:
            </p>

            <ul className="space-y-5">
              {problems.map((problem, index) => (
                <li
                  key={index}
                  className="animate-in flex items-center gap-5"
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#9FB8A0' }}
                  />
                  <span
                    className="text-xl md:text-2xl"
                    style={{
                      color: '#6E6E6E',
                      fontFamily: 'var(--font-bullets)'
                    }}
                  >
                    {problem}
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
