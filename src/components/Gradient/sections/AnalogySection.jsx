import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenFrontImg from '../assets/raven-front.png';

gsap.registerPlugin(ScrollTrigger);

export default function AnalogySection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);

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

      // Animate the big number
      gsap.from(numberRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      const elements = contentRef.current.querySelectorAll('.animate-in');
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="analogy"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute z-0 pointer-events-none edge-fade-left"
        style={{
          left: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '55%',
          maxWidth: '800px',
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
        <div className="flex justify-end">
          <div
            ref={contentRef}
            className="lg:w-3/5 p-8 rounded-2xl text-center"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div
              ref={numberRef}
              className="mb-4"
            >
              <span
                className="gradient-text"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(5rem, 15vw, 12rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                1.3B
              </span>
            </div>

            <p
              className="animate-in text-2xl md:text-3xl lg:text-4xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#2E2E2E',
                lineHeight: 1.3,
              }}
            >
              people have accessibility needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
