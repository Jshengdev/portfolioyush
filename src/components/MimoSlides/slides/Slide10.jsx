import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BUDGET = [
  { amount: '$1,500', label: 'API & Infrastructure', desc: 'Cloud hosting, messaging APIs, LLM inference', color: '#4A85B5' },
  { amount: '$1,500', label: 'Design & Prototyping', desc: 'Interface design, user testing, iterations', color: '#8B71B0' },
  { amount: '$1,000', label: 'User Research', desc: '30+ interviews across segments', color: '#5A9E82' },
  { amount: '$1,000', label: 'Launch & Distribution', desc: 'Mac App Store, landing page, beta community', color: '#C4854A' },
];

const MILESTONES = [
  { month: 'Month 1', goal: 'Working prototype', detail: 'iMessage + Slack, 3 categories', metric: '10 beta users', color: '#4A85B5' },
  { month: 'Month 2', goal: 'Expand + draft', detail: 'Gmail + Instagram, response drafting', metric: '50 users, >40% DAU', color: '#8B71B0' },
  { month: 'Month 3', goal: 'Public beta', detail: 'Mac App Store launch', metric: '2,000+ downloads', color: '#5A9E82' },
];

export default function Slide10({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow10"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title10"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="budget10"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
      '-=0.2'
    )
    .fromTo('[data-anim="mlabel10"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="mile10"]',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 },
      '-=0.2'
    )
    .fromTo('[data-anim="closing10"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow10" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        Intended Use of Proceeds
      </div>

      <h2
        data-anim="title10"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: 48,
        }}
      >
        <span style={{ color: 'var(--accent)' }}>$5,000</span> Grant Allocation
      </h2>

      <div className="budget-grid" style={{ marginBottom: 56 }}>
        {BUDGET.map((item) => (
          <div
            key={item.label}
            data-anim="budget10"
            className="glass-card"
            style={{ padding: '28px 24px', textAlign: 'left', borderTop: `3px solid ${item.color}` }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 500, color: item.color, letterSpacing: '-0.03em', marginBottom: 8 }}>
              {item.amount}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8 }}>
              {item.label}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      <div data-anim="mlabel10" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
        marginBottom: 20,
      }}>
        3-Month Milestones
      </div>

      <div className="timeline-grid" style={{ marginBottom: 48 }}>
        {MILESTONES.map((m) => (
          <div key={m.month} data-anim="mile10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, boxShadow: `0 0 12px ${m.color}30` }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: m.color, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {m.month}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {m.goal}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 300, color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.5 }}>
              {m.detail}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              background: 'var(--accent-light)',
              padding: '6px 14px',
              borderRadius: 100,
              border: '1px solid rgba(0,0,0,0.05)',
            }}>
              {m.metric}
            </div>
          </div>
        ))}
      </div>

      <p data-anim="closing10" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--text-tertiary)',
        letterSpacing: '-0.01em',
      }}>
        Mimo — your messages, sorted by what they actually are.
      </p>
    </div>
  );
}
