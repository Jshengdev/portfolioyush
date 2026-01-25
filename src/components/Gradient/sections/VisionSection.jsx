import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenCloseupImg from '../assets/raven-closeup.png';

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        y: 40,
        duration: 1,
        stagger: 0.3,
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
      id="vision"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none edge-fade-full"
        style={{ opacity: 0.25 }}
      >
        <div style={{ width: '130%', maxWidth: '1700px' }}>
          <DotMatrixImage
            src={ravenCloseupImg}
            alt="Raven AR glasses"
            className="w-full"
            animated={true}
            config={{
              gridSize: 7,
              scanSpeed: 2,
              canvasSize: 1400,
            }}
          />
        </div>
      </div>

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
            className="animate-in text-xl md:text-2xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#6E6E6E'
            }}
          >
            One app. One person.
          </p>

          <h2
            className="animate-in text-3xl md:text-4xl lg:text-5xl mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              color: '#2E2E2E',
              lineHeight: 1.3,
            }}
          >
            Unlock <span className="gradient-text">1.3 billion</span> into the market.
          </h2>
        </div>
      </div>
    </section>
  );
}
