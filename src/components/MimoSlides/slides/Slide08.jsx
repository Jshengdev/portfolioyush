import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, ListTodo, Ban, Cpu, Apple } from 'lucide-react';

const PLATFORMS = [
  { name: 'iMessage', color: '#A1A09A' },
  { name: 'Slack', color: '#A1A09A' },
  { name: 'Gmail', color: '#A1A09A' },
  { name: 'Instagram', color: '#A1A09A' },
  { name: 'Discord', color: '#A1A09A' },
  { name: 'LinkedIn', color: '#A1A09A' },
  { name: 'WhatsApp', color: '#A1A09A' },
];

const REASONS = [
  {
    Icon: Layers,
    stat: '4–8',
    label: 'platforms checked daily',
    desc: null,
    platforms: PLATFORMS,
    color: '#4A85B5',
  },
  {
    Icon: ListTodo,
    stat: '50+',
    label: 'hidden tasks',
    desc: 'Buried across unread messages with no triage layer',
    platforms: null,
    color: '#C4854A',
  },
  {
    Icon: Ban,
    stat: '0',
    label: 'existing solutions',
    desc: 'No tool addresses cross-platform message triage by intent',
    platforms: null,
    color: '#B5637A',
  },
  {
    Icon: Cpu,
    stat: null,
    label: 'LLM inference is ready',
    desc: 'Fast and cheap enough to categorize messages in real-time',
    platforms: null,
    color: '#8B71B0',
  },
  {
    Icon: Apple,
    stat: null,
    label: 'Apple is opening up',
    desc: 'On-device AI and new integration APIs make a Mac menu bar app viable',
    platforms: null,
    color: '#5A9E82',
  },
];

export default function Slide08({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow8"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title8"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="reason"]',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
      '-=0.2'
    )
    .fromTo('[data-anim="platform-bubble"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.7)', stagger: 0.05 },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow8" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        Why Now
      </div>

      <h2
        data-anim="title8"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: 44,
        }}
      >
        The problem is <span style={{ color: 'var(--accent)' }}>peaking.</span>
        <br />
        The technology is <span style={{ color: 'var(--accent)' }}>ready.</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760, width: '100%' }}>
        {REASONS.map((r) => (
          <div
            key={r.label}
            data-anim="reason"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              padding: '24px 28px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,0,0,0.04)',
              borderRadius: 20,
              borderLeft: `3px solid ${r.color}`,
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `${r.color}10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <r.Icon size={20} color={r.color} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                {r.stat && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 26,
                    fontWeight: 500,
                    color: r.color,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}>
                    {r.stat}
                  </span>
                )}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {r.label}
                </span>
              </div>
              {r.platforms ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                  {r.platforms.map((p) => (
                    <div
                      key={p.name}
                      data-anim="platform-bubble"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '4px 10px', borderRadius: 100,
                        background: `${p.color}10`, border: `1px solid ${p.color}20`,
                        fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 500, color: p.color,
                      }}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color }} />
                      {p.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: 'var(--text-tertiary)',
                }}>
                  {r.desc}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
