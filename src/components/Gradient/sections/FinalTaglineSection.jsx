import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

gsap.registerPlugin(ScrollTrigger);

export default function FinalTaglineSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        scale: 0.8,
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
        y: 30,
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
      id="final-tagline"
      className="min-h-screen w-full flex items-center justify-center relative overflow-visible"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="w-full max-w-4xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="text-center">
          {/* Full Logo - Icon + Text */}
          <div ref={logoRef} className="flex items-center justify-center gap-6 mb-12">
            {/* Bar chart icon - large */}
            <svg width="80" height="80" viewBox="0 0 40 44" fill="none">
              <defs>
                <linearGradient id="finalLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7A9A7A" />
                  <stop offset="35%" stopColor="#9FB8A0" />
                  <stop offset="65%" stopColor="#B8A080" />
                  <stop offset="100%" stopColor="#D8B4A0" />
                </linearGradient>
              </defs>
              <rect x="2" y="10" width="6" height="28" rx="2" fill="url(#finalLogoGradient)" />
              <rect x="11" y="6" width="6" height="32" rx="2" fill="url(#finalLogoGradient)" opacity="0.85" />
              <rect x="20" y="16" width="6" height="22" rx="2" fill="url(#finalLogoGradient)" opacity="0.65" />
              <rect x="29" y="22" width="6" height="16" rx="2" fill="url(#finalLogoGradient)" opacity="0.45" />
            </svg>

            {/* Text */}
            <span
              className="text-5xl md:text-6xl lg:text-7xl pb-2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                background: 'linear-gradient(135deg, #7A9A7A 0%, #9FB8A0 35%, #B8A080 65%, #D8B4A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2,
              }}
            >
              gradient.
            </span>
          </div>

          <div ref={contentRef}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.3,
              }}
            >
              1.3 Billion People.
            </h2>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl gradient-text pb-2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              Finally Included.
            </h2>
          </div>
        </div>
      </div>

      {/* Footer - absolute bottom */}
      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center">
        <p className="text-sm" style={{ color: '#6E6E6E' }}>
          © 2026 Gradient. Tools that adapt to people.
        </p>
      </footer>
    </section>
  );
}
