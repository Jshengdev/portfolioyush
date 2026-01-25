import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import GenerativeAvatar from '../components/GenerativeAvatar';

gsap.registerPlugin(ScrollTrigger);

const disabilities = [
  "Vision Impairment",
  "Hearing Loss",
  "ADHD",
  "Autism",
  "Anxiety",
  "Motor Disability",
  "Cognitive Disability",
  "Chronic Pain"
];

const profiles = [
  {
    name: "Alex",
    color: "#9FB8A0",
    stats: [
      { label: 'Visual Sensitivity', value: 85 },
      { label: 'Audio Processing', value: 45 },
      { label: 'Focus Duration', value: 70 },
      { label: 'Sensory Threshold', value: 90 },
    ]
  },
  {
    name: "Jordan",
    color: "#D8B4A0",
    stats: [
      { label: 'Visual Sensitivity', value: 40 },
      { label: 'Audio Processing', value: 75 },
      { label: 'Focus Duration', value: 35 },
      { label: 'Sensory Threshold', value: 55 },
    ]
  },
  {
    name: "Sam",
    color: "#A0987D",
    stats: [
      { label: 'Visual Sensitivity', value: 60 },
      { label: 'Audio Processing', value: 30 },
      { label: 'Focus Duration', value: 80 },
      { label: 'Sensory Threshold', value: 45 },
    ]
  }
];

export default function SpectrumSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const avatarRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Track when section is in view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });

      // Parallax for large avatar
      gsap.to(avatarRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.from(avatarRef.current, {
        scale: 0.8,
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
        x: -40,
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

  // Auto-cycle through disabilities (but NOT profiles)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < disabilities.length) return prev + 1;
        return prev; // Stop at max, don't reset
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isInView]);

  // Reset disabilities when entering view
  useEffect(() => {
    if (isInView) {
      setVisibleCount(0);
    }
  }, [isInView]);

  // Handle keyboard navigation for profile switching
  const handleKeyDown = useCallback((e) => {
    if (!isInView) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setCurrentProfile(p => (p + 1) % profiles.length);
      setVisibleCount(0); // Reset disabilities animation
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setCurrentProfile(p => (p - 1 + profiles.length) % profiles.length);
      setVisibleCount(0);
    }
  }, [isInView]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const profile = profiles[currentProfile];

  return (
    <section
      ref={sectionRef}
      id="spectrum"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Large Generative Avatar as background asset - centered more */}
      <div
        ref={avatarRef}
        className="absolute z-0 pointer-events-none"
        style={{
          right: '15%',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.9,
        }}
      >
        <GenerativeAvatar
          name={profile.name}
          size={450}
          color={profile.color}
          secondaryColor="#D8B4A0"
          animated={true}
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
              className="text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              One Size<br />
              <span className="gradient-text">Fits None</span>
            </h2>

            {/* Cycling disabilities */}
            <div className="flex flex-wrap items-start content-start gap-2 mb-6 min-h-[80px]">
              {disabilities.slice(0, visibleCount).map((disability, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 rounded-full text-sm flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(159, 184, 160, 0.2)',
                    color: '#2E2E2E',
                    fontFamily: 'var(--font-bullets)',
                    animation: 'fadeIn 0.3s ease-out'
                  }}
                >
                  {disability}
                </span>
              ))}
            </div>

            {/* Profile Card - NO avatar image */}
            <div
              className="p-5 rounded-xl transition-all duration-500"
              style={{
                background: 'rgba(46, 46, 46, 0.85)',
                borderLeft: `3px solid ${profile.color}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-lg font-medium">
                  {profile.name}
                </span>
                <span className="text-gray-400 text-xs">
                  ← → to switch
                </span>
              </div>

              <div className="space-y-2">
                {profile.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-28">{stat.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${stat.value}%`,
                          background: `linear-gradient(90deg, ${profile.color}, #D8B4A0)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {profiles.map((p, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentProfile(index);
                    setVisibleCount(0);
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: currentProfile === index ? profile.color : 'rgba(46, 46, 46, 0.3)',
                    transform: currentProfile === index ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
