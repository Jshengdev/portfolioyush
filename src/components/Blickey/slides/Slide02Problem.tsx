import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

const stats = [
  { value: '75%', label: 'Of workers feel less productive due to information overload' },
  { value: '71%', label: 'Report frequent interruptions during focused work' },
  { value: '-18%', label: 'Drop in cognitive performance from heavy multitasking' },
  { value: '42%', label: 'Of work time spent on "work about work" rather than skilled tasks' },
];

export default function Slide02Problem({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);
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
    if (quoteRef.current) {
      tl.fromTo(quoteRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.1
      );
    }
    if (sourceRef.current) {
      tl.fromTo(sourceRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.4, ease: 'power2.out' },
        1.4
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF' }}>
      <h1 ref={titleRef} className="slide-title">The Problem</h1>
      <div className="stat-punch-grid" style={{ marginBottom: 0 }}>
        {stats.map((stat, i) => (
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
      <p ref={quoteRef} className="slide-quote">
        "People don't need another tool. They need fewer things competing for their attention."
      </p>
      <p ref={sourceRef} className="slide-sources">
        Sources: Asana Anatomy of Work 2023, APA Multitasking Research, Microsoft Work Trend Index
      </p>
    </div>
  );
}
