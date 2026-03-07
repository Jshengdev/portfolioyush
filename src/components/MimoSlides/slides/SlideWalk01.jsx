import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const colors = {
  text: "#18181B",
  textSecondary: "#63635E",
  textTertiary: "#A1A09A",
  accent: "#4A85B5",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.7)",
};

const BubbleIcon = ({ size = 12 }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size} style={{ flexShrink: 0, opacity: 0.5, marginTop: 1 }}>
    <path d="M2 2h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3v-3H2a1 1 0 01-1-1V3a1 1 0 011-1z" />
  </svg>
);

const PLATFORMS = [
  { name: 'iMessage', color: '#34C759' },
  { name: 'Slack', color: '#E01E5A' },
  { name: 'Gmail', color: '#EA4335' },
  { name: 'Instagram', color: '#C13584' },
  { name: 'Discord', color: '#5865F2' },
  { name: 'LinkedIn', color: '#0A66C2' },
  { name: 'WhatsApp', color: '#25D366' },
];

const MESSAGES = [
  { from: 'Sarah K.', text: 'Hey! Are you free for coffee this week?', platform: 'iMessage', platformColor: '#34C759' },
  { from: 'Client — Haus', text: 'Can you send the updated deck by EOD?', platform: 'Slack', platformColor: '#E01E5A' },
  { from: 'James T.', text: 'Q3 presentation deck — need it for the board meeting', platform: 'Gmail', platformColor: '#EA4335' },
  { from: 'Alex M.', text: 'Saw your work — would love to connect', platform: 'Instagram', platformColor: '#C13584' },
  { from: 'Nisha', text: 'Lmk what you think of the designs!', platform: 'Discord', platformColor: '#5865F2' },
  { from: 'Tom H.', text: 'Following up on the contract — any updates?', platform: 'LinkedIn', platformColor: '#0A66C2' },
  { from: 'David R.', text: 'Dinner Saturday? Thinking 7pm', platform: 'WhatsApp', platformColor: '#25D366' },
  { from: 'Manager', text: 'Can we sync at 3pm tomorrow?', platform: 'Slack', platformColor: '#E01E5A' },
];

export default function SlideWalk01({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="w1-eyebrow"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="w1-title"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w1-platform"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)', stagger: 0.05 },
      '-=0.2'
    )
    .fromTo('[data-anim="w1-arrow"]',
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="w1-mockup"]',
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w1-msg"]',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out', stagger: 0.04 },
      '-=0.3'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', flexDirection: 'row', alignItems: 'center', gap: 56 }} ref={containerRef}>
      {/* Left: text + platforms */}
      <div style={{ flex: '0 0 360px' }}>
        <div data-anim="w1-eyebrow" style={{
          fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: colors.textTertiary, marginBottom: 20,
        }}>
          How It Works — Step 1
        </div>

        <h2
          data-anim="w1-title"
          style={{
            fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 600,
            letterSpacing: '-0.04em', lineHeight: 1.15, color: colors.text,
            marginBottom: 32,
          }}
        >
          Connect your platforms.
          <br />
          <span style={{ color: colors.accent }}>See everything in one place.</span>
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              data-anim="w1-platform"
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '12px 22px', borderRadius: 100,
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)',
                fontFamily: "'Sora', sans-serif", fontSize: '0.84rem', fontWeight: 400,
                color: colors.textSecondary,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
              {p.name}
            </div>
          ))}
        </div>

        <div data-anim="w1-arrow" style={{
          width: 48, height: 3, background: colors.accent,
          transformOrigin: 'left', marginBottom: 16,
        }} />

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', fontWeight: 300,
          lineHeight: 1.7, color: colors.textSecondary,
        }}>
          Mimo pulls messages from every platform into a single, unified inbox. No more switching between 7 apps.
        </p>
      </div>

      {/* Right: unified inbox mockup */}
      <div
        data-anim="w1-mockup"
        style={{
          flex: 1, maxWidth: 480,
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
            <span style={{
              marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
              color: colors.textTertiary, letterSpacing: '0.04em', fontWeight: 500,
            }}>
              All Messages
            </span>
          </div>

          <div style={{ padding: '8px 18px' }}>
            {MESSAGES.map((msg) => (
              <div
                key={msg.from}
                data-anim="w1-msg"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors.accent, opacity: 0.7, flexShrink: 0 }} />
                <BubbleIcon />
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.62rem', fontWeight: 600, color: 'white',
                  fontFamily: "'Sora', sans-serif", background: msg.platformColor,
                }}>
                  {msg.from[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: colors.text }}>{msg.from}</span>
                    <span style={{
                      fontSize: '0.55rem', fontWeight: 600, color: colors.textTertiary,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      background: 'rgba(0,0,0,0.04)', padding: '2px 6px', borderRadius: 4,
                    }}>
                      {msg.platform}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 300,
                    color: colors.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis', lineHeight: 1.4, marginTop: 2,
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
