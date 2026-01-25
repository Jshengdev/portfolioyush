import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenFrameImg from '../assets/raven-frame.png';

gsap.registerPlugin(ScrollTrigger);

const simulatorWindows = [
  { name: "Alex", need: "Light sensitivity", built: "Adaptive Dimmer" },
  { name: "Jordan", need: "Focus issues", built: "Task Pacer" },
  { name: "Sam", need: "Audio processing", built: "Visual Translator" },
  { name: "Riley", need: "Social anxiety", built: "Calm Coach" },
  { name: "Morgan", need: "Motor disability", built: "Voice Navigator" },
  { name: "Casey", need: "Memory support", built: "Context Keeper" },
  { name: "Taylor", need: "Sensory overload", built: "Stimulus Filter" },
  { name: "Avery", need: "Reading difficulty", built: "Text Helper" },
  { name: "Quinn", need: "Chronic pain", built: "Comfort Guide" },
];

export default function SimulatorGridSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.15,
        y: -60,
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

      const windows = contentRef.current.querySelectorAll('.sim-window');
      gsap.from(windows, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="simulator-grid"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none edge-fade-full"
        style={{ opacity: 0.15 }}
      >
        <div style={{ width: '140%', maxWidth: '1900px' }}>
          <DotMatrixImage
            src={ravenFrameImg}
            alt="Raven AR glasses"
            className="w-full"
            animated={true}
            config={{
              gridSize: 8,
              scanSpeed: 2,
              canvasSize: 1500,
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div ref={contentRef}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-center mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              color: '#2E2E2E',
              lineHeight: 1.1,
            }}
          >
            Infinite <span className="gradient-text">Possibilities</span>
          </h2>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {simulatorWindows.map((item, index) => (
              <div
                key={index}
                className="sim-window aspect-[4/3] rounded-xl p-3 md:p-4 flex flex-col justify-between"
                style={{
                  background: 'rgba(46, 46, 46, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(159, 184, 160, 0.2)',
                }}
              >
                <div>
                  <p
                    className="text-xs md:text-sm font-semibold text-white mb-1"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-[10px] md:text-xs"
                    style={{ color: '#9FB8A0' }}
                  >
                    {item.need}
                  </p>
                </div>
                <p
                  className="text-[10px] md:text-xs font-medium"
                  style={{ color: '#D8B4A0' }}
                >
                  → {item.built}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
