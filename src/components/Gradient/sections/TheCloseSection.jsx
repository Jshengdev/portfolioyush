import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenSideAltImg from '../assets/raven-side-alt.png';

gsap.registerPlugin(ScrollTrigger);

export default function TheCloseSection() {
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
      id="the-close"
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
          src={ravenSideAltImg}
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
                color: '#6E6E6E',
              }}
            >
              Built with Raven Resonance
            </p>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.1,
              }}
            >
              AR for <span className="gradient-text">Everyone.</span>
            </h2>

            <p
              className="text-xl md:text-2xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: '#6E6E6E',
              }}
            >
              Gradient is the SaaS layer that makes it possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
