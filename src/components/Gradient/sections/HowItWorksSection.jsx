import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenExplodedImg from '../assets/raven-exploded.png';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: 1, title: "Conversation + intent" },
  { number: 2, title: "AI selects features" },
  { number: 3, title: "A tool is generated" }
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect
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

      // Entrance animation
      gsap.from(imageRef.current, {
        x: -150,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
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
      id="how-it-works"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Edge-bleeding image - extends past left edge */}
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-left"
        style={{
          left: '-15%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70%',
          maxWidth: '1050px',
        }}
      >
        <DotMatrixImage
          src={ravenExplodedImg}
          alt="Raven glasses exploded view"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1200,
          }}
        />
      </div>

      {/* Content with glassmorphism */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
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
              className="animate-in text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              How It Works
            </h2>

            <p
              className="animate-in text-lg md:text-xl mb-8"
              style={{
                color: '#6E6E6E',
                fontFamily: 'var(--font-sans)'
              }}
            >
              Instead of asking what's wrong, Gradient starts with how life feels to you.
            </p>

            {/* Steps */}
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.number} className="animate-in flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: '#9FB8A0' }}
                  >
                    {step.number}
                  </div>
                  <span
                    className="text-lg md:text-xl"
                    style={{
                      color: '#2E2E2E',
                      fontFamily: 'var(--font-bullets)'
                    }}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
