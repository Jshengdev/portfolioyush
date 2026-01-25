import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenCloseupImg from '../assets/raven-closeup.png';

gsap.registerPlugin(ScrollTrigger);

export default function HowMightWeSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
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
      id="how-might-we"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-left"
        style={{
          left: '-12%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60%',
          maxWidth: '900px',
        }}
      >
        <DotMatrixImage
          src={ravenCloseupImg}
          alt="Raven AR glasses close-up"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1200,
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-end">
          <div
            ref={contentRef}
            className="lg:w-1/2 p-8 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <p
              className="text-lg md:text-xl mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#9FB8A0',
                fontWeight: 500,
              }}
            >
              The Question
            </p>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.2,
              }}
            >
              How might we make XR work for{' '}
              <span className="gradient-text">everyone?</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
