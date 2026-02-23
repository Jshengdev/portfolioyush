import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

export default function Slide14ThankYou({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.5, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(blikiRef.current,
      { opacity: 0, y: 40, scale: 0.3 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
      '-=0.1'
    );
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center slide--dark" style={{ background: '#0A0A0A' }}>
      <h1 ref={titleRef} className="slide-title" style={{ color: '#FFFFFF', fontSize: 96, letterSpacing: '-3px' }}>
        BLICKEY
      </h1>
      <p ref={subtitleRef} className="slide-subtitle" style={{ color: 'var(--stripe-blue)', fontWeight: 600, fontSize: 32, marginBottom: 16 }}>
        Behavior Prompting
      </p>
      <p ref={taglineRef} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 24, fontWeight: 400 }}>
        Your workflow is the prompt.
      </p>
      <div ref={blikiRef} style={{ marginTop: 48, opacity: 0 }}>
        <BlikiCharacter size={64} animationState="jump" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
