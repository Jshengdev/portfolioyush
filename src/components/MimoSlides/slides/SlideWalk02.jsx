import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const colors = {
  text: "#18181B",
  textSecondary: "#63635E",
  textTertiary: "#A1A09A",
  accent: "#4A85B5",
  pink: "#B5637A",
  purple: "#8B71B0",
  green: "#5A9E82",
  orange: "#C4854A",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.7)",
};

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11}>
    <rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <line x1="5" y1="1" x2="5" y2="4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="11" y1="1" x2="11" y2="4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="2" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width={11} height={11} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M5.5 8l2 2 3-3.5" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" width={11} height={11} strokeLinecap="round">
    <path d="M3 4h10M3 8h7M3 12h10" />
  </svg>
);

const btnColors = {
  schedule: { bg: "rgba(74,133,181,0.1)", color: colors.accent, hoverBg: "rgba(74,133,181,0.2)" },
  approve: { bg: "rgba(139,113,176,0.1)", color: colors.purple, hoverBg: "rgba(139,113,176,0.2)" },
  decline: { bg: "rgba(0,0,0,0.04)", color: colors.textTertiary, hoverBg: "rgba(0,0,0,0.07)" },
  deliverable: { bg: "rgba(196,133,74,0.1)", color: colors.orange, hoverBg: "rgba(196,133,74,0.2)" },
};

function ActionBtn({ type, label, icon }) {
  const [hov, setHov] = useState(false);
  const c = btnColors[type];
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      fontFamily: "'Sora', sans-serif", fontSize: "0.62rem", fontWeight: 600,
      padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer",
      transition: "all 0.2s", letterSpacing: "0.02em",
      display: "flex", alignItems: "center", gap: 4,
      background: hov ? c.hoverBg : c.bg, color: c.color,
    }}>
      {icon}{label}
    </button>
  );
}

const avatarStyle = (bg) => ({
  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '0.62rem', fontWeight: 600, color: 'white',
  fontFamily: "'Sora', sans-serif", background: bg,
});

const senderStyle = { fontFamily: "'Sora', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: colors.text };
const textStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: colors.textSecondary, lineHeight: 1.4, marginTop: 2 };
const platformBadge = {
  fontSize: '0.55rem', fontWeight: 600, color: colors.textTertiary,
  letterSpacing: '0.04em', textTransform: 'uppercase',
  background: 'rgba(0,0,0,0.04)', padding: '2px 6px', borderRadius: 4,
};

export default function SlideWalk02({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="w2-eyebrow"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="w2-title"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w2-mockup"]',
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w2-feat"]',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', flexDirection: 'row', alignItems: 'center', gap: 56 }} ref={containerRef}>
      {/* Left: mockup */}
      <div
        data-anim="w2-mockup"
        style={{
          flex: '0 0 520px',
          background: colors.glass,
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          border: `1px solid ${colors.glassBorder}`,
          borderRadius: 20, padding: 2,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.03), 0 24px 64px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            {['#FF605C', '#FFBD44', '#00CA4E'].map(c => (
              <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>

          <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {/* Scheduling */}
            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.accent }}>&#9201; Scheduling</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: colors.textTertiary, background: 'rgba(0,0,0,0.03)', padding: '3px 8px', borderRadius: 6 }}>2</span>
              </div>

              <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={avatarStyle(colors.accent)}>S</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={senderStyle}>Sarah K.</span>
                      <span style={platformBadge}>iMessage</span>
                    </div>
                    <div style={textStyle}>Thursday coffee catch-up</div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                      <ActionBtn type="schedule" label="Schedule" icon={<CalendarIcon />} />
                    </div>
                    <div style={{
                      marginTop: 6, padding: '5px 8px', borderRadius: 6,
                      background: 'rgba(74,133,181,0.06)', border: '1px solid rgba(74,133,181,0.12)',
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: colors.accent,
                    }}>
                      Thu 2:00-3:00 PM - Free
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={avatarStyle('#6B9AC4')}>M</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={senderStyle}>Manager</span>
                      <span style={platformBadge}>Slack</span>
                    </div>
                    <div style={textStyle}>Sync tomorrow at 3pm</div>
                    <div style={{ marginTop: 6 }}>
                      <ActionBtn type="schedule" label="Schedule" icon={<CalendarIcon />} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Approvals */}
            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.purple }}>&#10003; Approvals</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: colors.textTertiary, background: 'rgba(0,0,0,0.03)', padding: '3px 8px', borderRadius: 6 }}>2</span>
              </div>

              <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={avatarStyle(colors.purple)}>A</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={senderStyle}>Alex P.</span>
                      <span style={platformBadge}>Slack</span>
                    </div>
                    <div style={textStyle}>$2,400 event budget</div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                      <ActionBtn type="approve" label="Approve" />
                      <ActionBtn type="decline" label="Decline" />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={avatarStyle(colors.pink)}>K</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={senderStyle}>Kim</span>
                      <span style={platformBadge}>iMessage</span>
                    </div>
                    <div style={textStyle}>RSVP March 15th dinner</div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                      <ActionBtn type="approve" label="Yes" />
                      <ActionBtn type="decline" label="No" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.orange }}>&#128206; Deliverables</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: colors.textTertiary, background: 'rgba(0,0,0,0.03)', padding: '3px 8px', borderRadius: 6 }}>3</span>
              </div>

              {[
                { sender: 'James T.', letter: 'J', lc: colors.orange, platform: 'Gmail', text: 'Q3 deck - due Friday' },
                { sender: 'Lisa W.', letter: 'L', lc: colors.pink, platform: 'Slack', text: 'Homepage wireframes' },
                { sender: 'Client', letter: 'C', lc: colors.green, platform: 'Instagram', text: 'Revised March invoice' },
              ].map((item) => (
                <div key={item.sender} style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={avatarStyle(item.lc)}>{item.letter}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={senderStyle}>{item.sender}</span>
                        <span style={platformBadge}>{item.platform}</span>
                      </div>
                      <div style={textStyle}>{item.text}</div>
                      <div style={{ marginTop: 6 }}>
                        <ActionBtn type="deliverable" label="To-do" icon={<ListIcon />} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: text */}
      <div style={{ flex: 1, maxWidth: 360 }}>
        <div data-anim="w2-eyebrow" style={{
          fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: colors.textTertiary, marginBottom: 20,
        }}>
          How It Works — Step 2
        </div>

        <h2
          data-anim="w2-title"
          style={{
            fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 600,
            letterSpacing: '-0.04em', lineHeight: 1.15, color: colors.text,
            marginBottom: 32,
          }}
        >
          AI sorts. <span style={{ color: colors.accent }}>You act.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: <CalendarIcon />, color: colors.accent, title: 'Schedule in one click', desc: 'See where you\'re free in Google Calendar and book directly from the message.' },
            { icon: <CheckIcon />, color: colors.purple, title: 'Quick approvals', desc: 'Budget sign-offs, RSVPs, yes/no decisions — clear them in seconds.' },
            { icon: <ListIcon />, color: colors.orange, title: 'Auto-extracted to-dos', desc: 'Every deliverable across every platform, surfaced as a single task list.' },
          ].map((f) => (
            <div key={f.title} data-anim="w2-feat" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: `${f.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: f.color,
              }}>
                {f.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: colors.text, letterSpacing: '-0.01em', marginBottom: 4 }}>
                  {f.title}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.55, color: colors.textTertiary }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
