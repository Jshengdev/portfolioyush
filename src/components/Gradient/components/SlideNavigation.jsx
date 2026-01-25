import { useState, useEffect } from 'react';

const slideNames = [
  'Gradient',
  'The Analogy',
  'Spectrum',
  'Beat Drop',
  'How Might We',
  'The Answer',
  'Personas',
  'Profile',
  'Onboarding',
  'Orchestration',
  'Output',
  'Vision',
  'Possibilities',
  'The Close',
  'Team',
  'Tagline'
];

export default function SlideNavigation({ totalSlides = 16 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const newSlide = Math.round(window.scrollY / slideHeight);
      setCurrentSlide(Math.min(Math.max(newSlide, 0), totalSlides - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSlides]);

  const scrollToSlide = (index) => {
    const slideHeight = window.innerHeight;
    window.scrollTo({
      top: index * slideHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Side dot navigation */}
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        aria-label="Slide navigation"
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className="transition-all duration-300"
            aria-label={`Go to slide ${index + 1}: ${slideNames[index]}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          >
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-3 h-3 scale-125'
                  : 'w-2 h-2 hover:scale-125'
              }`}
              style={{
                backgroundColor: currentSlide === index ? '#9FB8A0' : 'rgba(46, 46, 46, 0.4)',
              }}
            />
          </button>
        ))}
      </nav>

      {/* Slide counter */}
      <div
        className="fixed bottom-6 right-6 z-50 px-3 py-2 rounded-lg"
        style={{
          backgroundColor: 'rgba(46, 46, 46, 0.8)',
          fontFamily: 'var(--font-sans)'
        }}
      >
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            background: 'linear-gradient(90deg, #9FB8A0, #D8B4A0)'
          }}
        />
      </div>

      {/* Scroll hint on first slide */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span
          className="text-sm"
          style={{ color: '#6E6E6E', fontFamily: 'var(--font-sans)' }}
        >
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-[#6E6E6E]/50 flex justify-center pt-2">
          <div
            className="w-1.5 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: '#9FB8A0' }}
          />
        </div>
      </div>
    </>
  );
}
