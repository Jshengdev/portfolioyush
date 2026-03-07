import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { User, Coffee, FolderOpen, HelpCircle, Clock } from 'lucide-react';

const COSTS = [
  {
    Icon: Coffee,
    label: '"Are you free for coffee?"',
    color: '#BFA24A',
    costs: ['Assess social bandwidth', 'Check calendar', 'Weigh the relationship'],
  },
  {
    Icon: FolderOpen,
    label: '"Can you send the deck?"',
    color: '#C4854A',
    costs: ['Context-switch to a closed project', 'Recall where you left off', 'Find the file, verify it\'s current'],
  },
  {
    Icon: HelpCircle,
    label: '"Quick question about the layout"',
    color: '#8B71B0',
    costs: ['Open-ended thinking', 'No clear endpoint', 'Could take 5 min or 45 min'],
  },
  {
    Icon: Clock,
    label: '"Deadline: Friday"',
    color: '#B5637A',
    costs: ['Time-sensitive', 'Immediate low-grade anxiety', 'Cascading priority shift'],
  },
];

const PLATFORMS = [
  { name: 'Slack', color: '#A1A09A' },
  { name: 'iMessage', color: '#A1A09A' },
  { name: 'Instagram', color: '#A1A09A' },
  { name: 'Asana', color: '#A1A09A' },
  { name: 'LinkedIn', color: '#A1A09A' },
  { name: 'Gmail', color: '#A1A09A' },
  { name: 'Discord', color: '#A1A09A' },
];

export default function Slide03({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="p-icon"]',
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    )
    .fromTo('[data-anim="p-name"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="p-role"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="p-desc"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="p-pill"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)', stagger: 0.04 },
      '-=0.2'
    );

    tl.fromTo('[data-anim="title3"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    const cards = containerRef.current.querySelectorAll('[data-anim="cost-card"]');
    cards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        i === 0 ? '-=0.2' : '-=0.2'
      );
      const items = card.querySelectorAll('[data-anim="cost-item"]');
      tl.fromTo(items,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out', stagger: 0.04 },
        '-=0.15'
      );
    });

    tl.fromTo('[data-anim="insight3"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', flexDirection: 'row', alignItems: 'center', gap: 56 }} ref={containerRef}>
      {/* Left: Persona */}
      <div style={{ flex: '0 0 300px' }}>
        <div
          data-anim="p-icon"
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(74,133,181,0.08)',
            border: '2px solid rgba(74,133,181,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <User size={26} color="var(--accent)" strokeWidth={1.5} />
        </div>

        <h2
          data-anim="p-name"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: 4,
          }}
        >
          Teri
        </h2>

        <p
          data-anim="p-role"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Freelance Designer
        </p>

        <p
          data-anim="p-desc"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            marginBottom: 20,
          }}
        >
          On any given day she juggles client deliverables, group hangouts, LinkedIn messages, deadline reminders, and DMs for more work — all across 7+ platforms. Every notification looks the same, but each one demands a completely different kind of mental energy.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              data-anim="p-pill"
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
      </div>

      {/* Right: Energy costs */}
      <div style={{ flex: 1, maxWidth: 560 }}>
        <h2
          data-anim="title3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: 24,
          }}
        >
          Every message is an <span style={{ color: 'var(--accent)' }}>unknown energy cost</span> until she opens it.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {COSTS.map((c) => (
            <div
              key={c.label}
              data-anim="cost-card"
              className="glass-card"
              style={{
                padding: '18px 16px',
                borderTop: `3px solid ${c.color}`,
              }}
            >
              <c.Icon size={18} color={c.color} strokeWidth={1.5} style={{ marginBottom: 8 }} />
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: 10,
                lineHeight: 1.35,
                fontStyle: 'italic',
              }}>
                {c.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {c.costs.map((cost, i) => (
                  <div
                    key={i}
                    data-anim="cost-item"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 300,
                      color: 'var(--text-tertiary)',
                      lineHeight: 1.4,
                      paddingLeft: 10,
                      position: 'relative',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 5,
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: c.color,
                      opacity: 0.6,
                      display: 'block',
                    }} />
                    {cost}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          data-anim="insight3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          She can't tell from the outside whether responding will take
          <span style={{ color: 'var(--accent)' }}> 30 seconds or 30 minutes.</span>
        </p>
      </div>
    </div>
  );
}
