import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

const reasons = [
  { stat: 'GPT-4o, Claude 3.5, Gemini', text: ' -- foundation models are finally fast and cheap enough for always-on desktop inference.' },
  { stat: 'Apple Intelligence, Copilot+', text: ' -- the major platforms are training users to expect on-device AI.' },
  { stat: '73% of knowledge workers', text: ' say they would use an AI that proactively managed routine tasks (Salesforce 2024).' },
  { stat: 'Screen context', text: ' is the last major untapped input for AI. Text, voice, and camera are solved. The desktop is not.' },
  { stat: 'No dominant player', text: ' owns the "proactive desktop agent" category yet. Rewind pivoted. Copilot is cloud-first.' },
  { stat: 'Enterprise IT spend on AI', text: ' is projected to reach $300B by 2027 (IDC). Budget is moving fast.' },
];

export default function Slide08Traction({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0.4 + i * 0.12
      );
    });
    if (closingRef.current) {
      tl.fromTo(closingRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.3
      );
    }
    if (blikiRef.current) {
      tl.fromTo(blikiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.5
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF', position: 'relative' }}>
      <h1 ref={titleRef} className="slide-title">Why Now</h1>
      <div className="why-now-list">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="why-now-item"
            ref={el => { itemsRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <strong>{r.stat}</strong>{r.text}
          </div>
        ))}
      </div>
      <p ref={closingRef} className="why-now-closing">
        The window is open. The technology is ready. The category is unclaimed.
      </p>
      <div ref={blikiRef} style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0 }}>
        <BlikiCharacter size={36} animationState="idle" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
