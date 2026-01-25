import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenFrontImg from '../assets/raven-front.png';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: 1, text: "Answer open-ended experience questions" },
  { num: 2, text: "LLM asks clarifying follow-ups" },
  { num: 3, text: "Describe your ideal scenario" },
];

export default function OnboardingSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        x: -30,
        duration: 0.6,
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
      id="onboarding"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-right"
        style={{
          right: '-15%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60%',
          maxWidth: '900px',
        }}
      >
        <DotMatrixImage
          src={ravenFrontImg}
          alt="Raven AR glasses"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1100,
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-start">
          <div
            ref={contentRef}
            className="lg:w-1/2 p-8 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2
              className="animate-in text-4xl md:text-5xl lg:text-6xl mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              How It <span className="gradient-text">Works</span>
            </h2>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.num} className="animate-in flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: '#9FB8A0' }}
                  >
                    {step.num}
                  </div>
                  <span
                    className="text-lg md:text-xl"
                    style={{ color: '#2E2E2E', fontFamily: 'var(--font-bullets)' }}
                  >
                    {step.text}
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
