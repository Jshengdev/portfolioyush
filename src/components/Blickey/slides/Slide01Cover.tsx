import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

export default function Slide01Cover({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const donutRef = useRef<HTMLDivElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(donutRef.current,
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)' }
    )
    .fromTo(blikiRef.current,
      { opacity: 0, scale: 0, rotation: 360 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' },
      '-=0.5'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center slide--dark" style={{ background: '#0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        <div ref={donutRef}>
          <svg viewBox="0 0 160 160" width={120} height={120} style={{ animation: 'donut-float 2s ease-in-out infinite' }}>
            <circle cx="80" cy="80" r="60" fill="none" stroke="#635BFF" strokeWidth="8" />
            <circle cx="80" cy="80" r="36" fill="#0A0A0A" />
            <rect x="72" y="16" width="8" height="8" fill="#00D4FF" opacity="0.6" />
            <rect x="128" y="72" width="8" height="8" fill="#7A73FF" opacity="0.6" />
            <rect x="72" y="132" width="8" height="8" fill="#00E096" opacity="0.6" />
          </svg>
        </div>
        <div ref={blikiRef} style={{ opacity: 0 }}>
          <BlikiCharacter size={56} animationState="wave" style={{ position: 'relative' }} />
        </div>
      </div>
      <h1 ref={titleRef} className="slide-title" style={{ color: '#FFFFFF', fontSize: 96, letterSpacing: '-3px' }}>
        Blickey
      </h1>
      <p ref={subtitleRef} className="slide-subtitle" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 28, fontWeight: 400, maxWidth: 720, lineHeight: 1.4, padding: '0 40px' }}>
        A desktop agent that learns how you work and starts doing things before you ask.
      </p>
    </div>
  );
}
