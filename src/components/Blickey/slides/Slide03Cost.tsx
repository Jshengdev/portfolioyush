import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

const costs = [
  { value: '$8,700', label: 'Lost per employee per year to context switching' },
  { value: '9.3 hrs', label: 'Spent weekly on duplicated or avoidable work' },
  { value: '$1.8T', label: 'U.S. productivity loss annually from information overload' },
  { value: '60%', label: 'Of meetings could be replaced by async summaries' },
];

export default function Slide03Cost({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sourceRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    statsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.4 + i * 0.15
      );
    });
    if (sourceRef.current) {
      tl.fromTo(sourceRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.4, ease: 'power2.out' },
        1.2
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF' }}>
      <h1 ref={titleRef} className="slide-title">The Cost</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>
        Distraction is not just annoying. It is expensive.
      </p>
      <div className="stat-punch-grid">
        {costs.map((stat, i) => (
          <div
            key={i}
            className="stat-punch"
            ref={el => { statsRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <div className="stat-punch-value">{stat.value}</div>
            <div className="stat-punch-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <p ref={sourceRef} className="slide-sources">
        Sources: Harvard Business Review, McKinsey Global Institute, Asana Anatomy of Work
      </p>
    </div>
  );
}
