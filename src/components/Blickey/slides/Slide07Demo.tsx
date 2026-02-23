import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

export default function Slide07Demo({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.6, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(blikiRef.current,
      { opacity: 0, y: 30, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
      '-=0.2'
    );
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center slide--dark" style={{ background: '#0A0A0A' }}>
      <h1 ref={titleRef} className="slide-title" style={{ color: '#FFFFFF', fontSize: 96, letterSpacing: '-3px' }}>
        LIVE DEMO
      </h1>
      <p ref={subtitleRef} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 24, fontWeight: 400 }}>
        Let us show you how Blickey works.
      </p>
      <div ref={blikiRef} style={{ marginTop: 48, opacity: 0 }}>
        <BlikiCharacter size={80} animationState="wave" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
