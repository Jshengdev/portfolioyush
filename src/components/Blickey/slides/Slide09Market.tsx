import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

interface MarketData {
  label: string;
  value: string;
  desc: string;
}

const markets: MarketData[] = [
  { label: 'TAM', value: '$11.1B', desc: 'Global desktop productivity + AI assistant market' },
  { label: 'SAM', value: '$3.4B', desc: 'Proactive, screen-aware AI agents (emerging category)' },
  { label: 'SOM', value: '$168M', desc: 'Power users, developers, and creators (Year 3 target)' },
];

export default function Slide09Market({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    blocksRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.4 + i * 0.15
      );
    });
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF' }}>
      <h1 ref={titleRef} className="slide-title">Market</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>The productivity tool market is massive -- and ready for disruption.</p>
      <div className="market-content">
        {markets.map((m, i) => (
          <div
            key={i}
            className="market-block"
            ref={el => { blocksRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <h3>{m.label}</h3>
            <p className="market-value">{m.value}</p>
            <p className="market-desc">{m.desc}</p>
          </div>
        ))}
      </div>
      <p className="slide-sources" style={{ position: 'static', marginTop: 32 }}>
        Sources: Grand View Research 2024, Gartner AI Market Forecast, IDC Worldwide AI Spending Guide
      </p>
    </div>
  );
}
