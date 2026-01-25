import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenExplodedImg from '../assets/raven-exploded.png';

gsap.registerPlugin(ScrollTrigger);

export default function BeatDropSection() {
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

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
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
      id="beat-drop"
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
            src={ravenExplodedImg}
            alt="Raven AR glasses exploded view"
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

      <div className="w-full max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        <div
          ref={contentRef}
          className="text-center p-10 rounded-3xl"
          style={{
            background: 'rgba(246, 244, 240, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              color: '#2E2E2E',
              lineHeight: 1.3,
            }}
          >
            The ones who would benefit most from XR<br />
            <span
              className="gradient-text"
              style={{ fontSize: '1.2em' }}
            >
              are the ones who can't build with it yet.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
