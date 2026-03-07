import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Package, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';

const LANES = [
  { label: 'Scheduling', Icon: Calendar, color: '#4A85B5', desc: 'Every "are you free?" across all platforms' },
  { label: 'Deliverables', Icon: Package, color: '#C4854A', desc: 'Auto-extracted cross-platform to-do list' },
  { label: 'Approvals', Icon: CheckCircle, color: '#B5637A', desc: 'Sign-offs, RSVPs, and permission requests' },
  { label: 'Follow-ups', Icon: RefreshCw, color: '#5A9E82', desc: 'The threads you said you\'d get back to' },
  { label: 'Fun', Icon: Sparkles, color: '#BFA24A', desc: 'Memes, articles, group chat noise — separated' },
];

const DIFFERENTIATORS = [
  { num: '01', title: 'Learns your patterns', desc: 'Drafts responses in YOUR voice — professional for managers, casual for friends.', color: '#4A85B5' },
  { num: '02', title: 'Earns trust progressively', desc: 'Week 1: sorts. Week 3: nudges. Month 2: suggests. Month 3: acts. You control the gradient.', color: '#8B71B0' },
  { num: '03', title: 'Everything is transparent', desc: 'Every action logged with reasoning and confidence. You see what it did and why.', color: '#5A9E82' },
];

export default function Slide06({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow6"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title6"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="lane6"]',
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', stagger: 0.07 },
      '-=0.2'
    )
    .fromTo('[data-anim="diff6"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow6" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        The Solution
      </div>

      <h2
        data-anim="title6"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          maxWidth: 600,
          marginBottom: 40,
        }}
      >
        Your messages become a <span style={{ color: 'var(--accent)' }}>command center.</span>
      </h2>

      <div className="solution-grid" style={{ marginBottom: 48 }}>
        {LANES.map((lane) => (
          <div
            key={lane.label}
            data-anim="lane6"
            className="glass-card"
            style={{ padding: '24px 18px', textAlign: 'center', borderTop: `3px solid ${lane.color}` }}
          >
            <lane.Icon size={26} color={lane.color} strokeWidth={1.5} style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: lane.color, letterSpacing: '-0.01em', marginBottom: 8 }}>
              {lane.label}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
              {lane.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 700 }}>
        {DIFFERENTIATORS.map((d) => (
          <div key={d.num} data-anim="diff6" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: d.color, minWidth: 32, paddingTop: 2 }}>
              {d.num}
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
                {d.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {d.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
