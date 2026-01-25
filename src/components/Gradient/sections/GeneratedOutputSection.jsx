import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenSideImg from '../assets/raven-side.png';

gsap.registerPlugin(ScrollTrigger);

export default function GeneratedOutputSection() {
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
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        scale: 0.95,
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
      id="generated-output"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-right"
        style={{
          right: '-18%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '65%',
          maxWidth: '950px',
        }}
      >
        <DotMatrixImage
          src={ravenSideImg}
          alt="Raven AR glasses side view"
          className="w-full"
          animated={true}
          config={{
            gridSize: 6,
            scanSpeed: 2,
            canvasSize: 1100,
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="flex justify-start">
          <div
            ref={contentRef}
            className="p-10 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.0,
              }}
            >
              <span style={{ color: '#2E2E2E' }}>Your</span>{' '}
              <span className="gradient-text">Tool.</span>
            </h2>

            <p
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: '#6E6E6E',
              }}
            >
              Built in 45 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
