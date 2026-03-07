import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEAM = [
  {
    initials: 'JS',
    name: 'Johnny Sheng',
    role: 'AI Engineer',
    major: 'IYA \'26',
    color: '#4A85B5',
    points: [
      'Built production 14-agent orchestration framework',
      'Managed $5M project; achieved 90% cost reductions (twice)',
      'Deep expertise: agent systems, MCP, context orchestration',
    ],
  },
  {
    initials: 'TS',
    name: 'Teri Shim',
    role: 'Product Designer',
    major: 'IYA \'26',
    color: '#8B71B0',
    points: [
      'Product designer at Riot Games, National Geographic, Guardian Inc',
      'Three-time founding designer at 0-to-1 products',
      'Designs AND codes — 20+ bilingual user interviews',
    ],
  },
  {
    initials: 'SL',
    name: 'Sky Lam',
    role: 'Business & Product Strategy',
    major: 'USC Marshall, Business Administration',
    color: '#5A9E82',
    points: [
      'Incoming Product Deployment Strategist at Persona (identity infrastructure)',
      'PM at Riot Games — esports fan engagement for 10M+ users',
      'Co-founded DUE (AI homework platform) — 8x completion rate, 6 LOIs',
    ],
  },
];

export default function Slide09({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow9"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title9"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="card9"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 },
      '-=0.2'
    )
    .fromTo('[data-anim="footer9"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow9" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        The Team
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
        <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="22" fill="#4A85B5" />
          <circle cx="13" cy="22" r="3.5" fill="white" />
          <circle cx="22" cy="22" r="3.5" fill="white" />
          <circle cx="31" cy="22" r="3.5" fill="white" />
        </svg>
        <h2
          data-anim="title9"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          Mimo
        </h2>
      </div>

      <div className="team-grid">
        {TEAM.map((member) => (
          <div
            key={member.initials}
            data-anim="card9"
            className="glass-card"
            style={{ padding: '36px 28px', textAlign: 'left' }}
          >
            <div className="team-avatar" style={{ background: member.color }}>
              {member.initials}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: 4,
            }}>
              {member.name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: member.color,
              marginBottom: 4,
            }}>
              {member.role}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 300,
              color: 'var(--text-tertiary)',
              marginBottom: 20,
            }}>
              {member.major}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {member.points.map((point, i) => (
                <li key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: 'var(--text-tertiary)',
                  paddingLeft: 14,
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 7,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: member.color,
                    display: 'inline-block',
                  }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
