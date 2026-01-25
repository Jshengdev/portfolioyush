import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import GenerativeAvatar from '../components/GenerativeAvatar';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    name: "Alex",
    color: "#9FB8A0",
    stats: [
      { label: 'Visual Sensitivity', value: 85 },
      { label: 'Audio Processing', value: 45 },
      { label: 'Focus Duration', value: 70 },
      { label: 'Sensory Threshold', value: 90 },
    ],
    traits: [
      "High sensitivity to bright lights",
      "Prefers quiet environments",
      "Benefits from visual schedules"
    ]
  },
  {
    name: "Maya",
    color: "#D8B4A0",
    stats: [
      { label: 'Visual Sensitivity', value: 40 },
      { label: 'Audio Processing', value: 75 },
      { label: 'Focus Duration', value: 35 },
      { label: 'Sensory Threshold', value: 55 },
    ],
    traits: [
      "Variable focus throughout day",
      "Responds well to motion cues",
      "Needs frequent task switching"
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
    ],
    traits: [
      "Audio-first learner",
      "Low light preference",
      "Benefits from haptic feedback"
    ]
  }
];

export default function PersonaSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const avatarRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for avatar
      gsap.to(avatarRef.current, {
        y: -60,
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

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setFlippedCard(flippedCard === index ? null : index);
  };

  const currentPersona = personas[selectedCard];

  return (
    <section
      ref={sectionRef}
      id="persona"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Large Generative Avatar as background asset */}
      <div
        ref={avatarRef}
        className="absolute z-0 pointer-events-none"
        style={{
          right: '12%',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.85,
        }}
      >
        <GenerativeAvatar
          name={currentPersona.name}
          size={420}
          color={currentPersona.color}
          secondaryColor="#D8B4A0"
          animated={true}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex justify-start">
          <div
            ref={contentRef}
            className="lg:w-3/5 p-8 rounded-2xl"
            style={{
              background: 'rgba(246, 244, 240, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                color: '#2E2E2E',
                lineHeight: 1.0,
              }}
            >
              Pick a <span className="gradient-text">Card</span>
            </h2>
            <p
              className="text-lg md:text-xl mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: '#6E6E6E',
              }}
            >
              You ARE this person.
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
              {personas.map((persona, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(index)}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative w-full transition-transform duration-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0)',
                    }}
                  >
                    {/* Front - Profile Card */}
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: selectedCard === index
                          ? 'rgba(46, 46, 46, 0.95)'
                          : 'rgba(46, 46, 46, 0.75)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderLeft: `3px solid ${persona.color}`,
                        backfaceVisibility: 'hidden',
                        minHeight: '200px',
                        boxShadow: selectedCard === index
                          ? `0 0 20px ${persona.color}40`
                          : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white text-base font-medium">
                          {persona.name}
                        </span>
                        {selectedCard === index && (
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: persona.color }}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        {persona.stats.map((stat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 w-20">{stat.label}</span>
                            <div className="flex-1 h-1 rounded-full bg-gray-700 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: selectedCard === index ? `${stat.value}%` : '0%',
                                  background: `linear-gradient(90deg, ${persona.color}, #D8B4A0)`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[10px] text-gray-500 text-center mt-3">Click to flip</p>
                    </div>

                    {/* Back - Traits */}
                    <div
                      className="absolute inset-0 rounded-xl p-4"
                      style={{
                        background: 'rgba(46, 46, 46, 0.9)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderLeft: `3px solid ${persona.color}`,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        minHeight: '200px',
                      }}
                    >
                      <h3 className="text-base font-semibold text-white mb-3">
                        You are {persona.name}
                      </h3>
                      <ul className="space-y-2">
                        {persona.traits.map((trait, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: persona.color }}
                            />
                            <span className="text-xs text-gray-300">{trait}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] text-gray-500 text-center mt-3">Click to flip back</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
