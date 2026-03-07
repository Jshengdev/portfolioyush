import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Package, HelpCircle, Clock, ArrowRight } from 'lucide-react';

const BEFORE = [
  { label: 'Message', opacity: 0.3 },
  { label: 'Message', opacity: 0.3 },
  { label: 'Message', opacity: 0.3 },
  { label: 'Message', opacity: 0.3 },
];

const AFTER = [
  { label: 'Scheduling', Icon: Calendar, color: '#4A85B5', desc: 'Low-stakes, fast' },
  { label: 'Deliverable', Icon: Package, color: '#C4854A', desc: 'Time-bound, specific' },
  { label: 'Question', Icon: HelpCircle, color: '#8B71B0', desc: 'Batch when ready' },
  { label: 'Deadline', Icon: Clock, color: '#B5637A', desc: 'Act now' },
];

export default function Slide05({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow5"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title5"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="before"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.08 },
      '-=0.1'
    )
    .fromTo('[data-anim="arrow5"]',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.1'
    )
    .fromTo('[data-anim="after"]',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
      '-=0.2'
    )
    .fromTo('[data-anim="insight5"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '+=0.2'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow5" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        The Problem &rarr; The Shift
      </div>

      <h2
        data-anim="title5"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: 48,
        }}
      >
        Convert <span style={{ color: 'var(--accent)' }}>unknown</span> costs into <span style={{ color: 'var(--accent)' }}>known</span> ones.
      </h2>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        marginBottom: 48,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: 4,
          }}>
            Before
          </div>
          {BEFORE.map((b, i) => (
            <div
              key={i}
              data-anim="before"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                background: 'rgba(0,0,0,0.03)',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-tertiary)', opacity: 0.3 }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--text-tertiary)',
                opacity: b.opacity + 0.3,
              }}>
                {b.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-tertiary)',
                opacity: 0.4,
                marginLeft: 'auto',
              }}>
                ???
              </span>
            </div>
          ))}
        </div>

        <div data-anim="arrow5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <ArrowRight size={28} color="var(--accent)" strokeWidth={1.5} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Mimo
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 260 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: 4,
          }}>
            After
          </div>
          {AFTER.map((a) => (
            <div
              key={a.label}
              data-anim="after"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: `${a.color}08`,
                borderRadius: 10,
                border: `1px solid ${a.color}20`,
              }}
            >
              <a.Icon size={16} color={a.color} strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: 600,
                color: a.color,
              }}>
                {a.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 300,
                color: 'var(--text-tertiary)',
                marginLeft: 'auto',
              }}>
                {a.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p
        data-anim="insight5"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: 'var(--text-secondary)',
          maxWidth: 580,
          lineHeight: 1.5,
        }}
      >
        Just knowing the category before engaging changes the entire experience.
        <br />
        <span style={{ color: 'var(--accent)' }}>Choose what you have capacity for.</span>
      </p>
    </div>
  );
}
