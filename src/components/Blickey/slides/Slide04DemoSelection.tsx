import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

const useCases = [
  {
    scenario: 'Scenario 1',
    text: 'You open the same three apps every Monday morning. Blickey notices and starts opening them for you by Week 2.',
  },
  {
    scenario: 'Scenario 2',
    text: 'You always search for the same Figma file after a Slack message from your designer. Blickey surfaces it automatically.',
  },
  {
    scenario: 'Scenario 3',
    text: 'You copy data from a spreadsheet into an email every Friday. Blickey drafts the email with the latest numbers.',
  },
  {
    scenario: 'Scenario 4',
    text: 'You get distracted by social media during deep work. Blickey gently suggests you close it and shows your focus timer.',
  },
];

export default function Slide04DemoSelection({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.4 + i * 0.15
      );
    });
    if (blikiRef.current) {
      tl.fromTo(blikiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.2
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF', position: 'relative' }}>
      <h1 ref={titleRef} className="slide-title">Use Cases</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>
        Real workflows. Real automation. No setup required.
      </p>
      <div className="use-case-grid">
        {useCases.map((uc, i) => (
          <div
            key={i}
            className="use-case-card"
            ref={el => { cardsRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <div className="use-case-scenario">{uc.scenario}</div>
            <div className="use-case-text">{uc.text}</div>
          </div>
        ))}
      </div>
      <div ref={blikiRef} style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0 }}>
        <BlikiCharacter size={36} animationState="idle" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
