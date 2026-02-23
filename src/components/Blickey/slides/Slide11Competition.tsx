import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

const features = [
  'Screen-aware context',
  'Proactive suggestions',
  'Behavior-based learning',
  'Desktop-native agent',
  'No prompting required',
  'Privacy-first (on-device)',
];

const competitors = [
  { name: 'Blickey', values: [true, true, true, true, true, true] },
  { name: 'Copilot', values: [false, false, false, false, false, false] },
  { name: 'Notion AI', values: [false, false, false, false, false, true] },
  { name: 'Rewind', values: [true, false, false, true, false, true] },
  { name: 'Granola', values: [false, true, false, false, false, true] },
];

export default function Slide11Competition({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('tr');
      rows.forEach((row, i) => {
        tl.fromTo(row,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.4 + i * 0.08
        );
      });
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF' }}>
      <h1 ref={titleRef} className="slide-title">Competition</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>
        Everyone else waits for you to ask. We act first.
      </p>
      <table ref={tableRef} className="competition-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Feature</th>
            {competitors.map((c, i) => (
              <th key={i} className={i === 0 ? 'col-highlight-header' : ''}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, fi) => (
            <tr key={fi} style={{ opacity: 0 }}>
              <td>{feature}</td>
              {competitors.map((c, ci) => (
                <td key={ci} className={ci === 0 ? 'col-highlight' : ''}>
                  {c.values[fi]
                    ? <span className="check">&#10003;</span>
                    : <span className="cross">&mdash;</span>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
