import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AlertTriangle, Clock, ArrowUp, BrainCircuit } from 'lucide-react';

const colors = {
  text: "#18181B",
  textSecondary: "#63635E",
  textTertiary: "#A1A09A",
  accent: "#4A85B5",
  pink: "#B5637A",
  orange: "#C4854A",
  green: "#5A9E82",
  yellow: "#BFA24A",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.7)",
};

const avatarStyle = (bg) => ({
  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '0.62rem', fontWeight: 600, color: 'white',
  fontFamily: "'Sora', sans-serif", background: bg,
});

const senderStyle = { fontFamily: "'Sora', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: colors.text };
const textStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: colors.textSecondary, lineHeight: 1.4, marginTop: 2 };

const PRIORITY_MSGS = [
  {
    sender: 'James T.', letter: 'J', lc: colors.orange, platform: 'Gmail',
    text: 'Q3 presentation deck — due Friday',
    badge: 'Due in 2 days', badgeColor: colors.pink, urgent: true,
  },
  {
    sender: 'Asana Bot', letter: 'A', lc: colors.pink, platform: 'Slack',
    text: 'Homepage redesign — deadline Friday',
    badge: 'Due in 2 days', badgeColor: colors.pink, urgent: true,
  },
  {
    sender: 'Client — Arch', letter: 'C', lc: colors.green, platform: 'Instagram',
    text: 'Revised invoice — needed before end of month',
    badge: 'Due in 5 days', badgeColor: colors.orange, urgent: false,
  },
];

const OTHER_MSGS = [
  { sender: 'Sarah K.', letter: 'S', lc: colors.accent, platform: 'iMessage', text: 'Coffee this week?', tag: 'Scheduling' },
  { sender: 'Leo T.', letter: 'L', lc: colors.yellow, platform: 'Discord', text: 'Yo did you see this lmao', tag: 'Fun' },
  { sender: 'Kira L.', letter: 'K', lc: colors.green, platform: 'WhatsApp', text: 'Let\'s catch up soon!', tag: 'Follow-up' },
];

export default function SlideWalk03({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="w3-eyebrow"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="w3-title"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w3-mockup"]',
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="w3-priority"]',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.08 },
      '-=0.3'
    )
    .fromTo('[data-anim="w3-other"]',
      { opacity: 0 },
      { opacity: 0.5, duration: 0.3, ease: 'power2.out', stagger: 0.05 },
      '-=0.2'
    )
    .fromTo('[data-anim="w3-insight"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', flexDirection: 'row', alignItems: 'center', gap: 56 }} ref={containerRef}>
      {/* Left: mockup */}
      <div
        data-anim="w3-mockup"
        style={{
          flex: '0 0 440px',
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
              color: colors.pink, letterSpacing: '0.04em', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <AlertTriangle size={10} strokeWidth={2} /> Priority View
            </span>
          </div>

          <div style={{ padding: '14px 18px' }}>
            <div style={{
              fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: colors.pink, marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <ArrowUp size={10} strokeWidth={2} /> Needs Attention
            </div>

            {PRIORITY_MSGS.map((msg) => (
              <div
                key={msg.sender}
                data-anim="w3-priority"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 12px', marginBottom: 6, borderRadius: 10,
                  background: msg.urgent ? 'rgba(181,99,122,0.05)' : 'rgba(196,133,74,0.04)',
                  border: `1px solid ${msg.urgent ? 'rgba(181,99,122,0.12)' : 'rgba(196,133,74,0.10)'}`,
                }}
              >
                <div style={avatarStyle(msg.lc)}>{msg.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={senderStyle}>{msg.sender}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', fontWeight: 500,
                      color: msg.badgeColor, background: `${msg.badgeColor}12`,
                      padding: '2px 6px', borderRadius: 4,
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>
                      <Clock size={8} strokeWidth={2} /> {msg.badge}
                    </span>
                  </div>
                  <div style={textStyle}>{msg.text}</div>
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: 'rgba(0,0,0,0.04)', margin: '14px 0 12px' }} />

            <div style={{
              fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: colors.textTertiary, marginBottom: 10,
            }}>
              Can Wait
            </div>

            {OTHER_MSGS.map((msg) => (
              <div
                key={msg.sender}
                data-anim="w3-other"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.02)',
                }}
              >
                <div style={avatarStyle(msg.lc)}>{msg.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: colors.textTertiary }}>{msg.sender}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: colors.textTertiary, background: 'rgba(0,0,0,0.03)', padding: '2px 6px', borderRadius: 4 }}>{msg.tag}</span>
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: colors.textTertiary, lineHeight: 1.4 }}>{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: text */}
      <div style={{ flex: 1, maxWidth: 380 }}>
        <div data-anim="w3-eyebrow" style={{
          fontFamily: "'Sora', sans-serif", fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: colors.textTertiary, marginBottom: 20,
        }}>
          How It Works — Step 3
        </div>

        <h2
          data-anim="w3-title"
          style={{
            fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 600,
            letterSpacing: '-0.04em', lineHeight: 1.15, color: colors.text,
            marginBottom: 24,
          }}
        >
          Deadlines detected.
          <br />
          <span style={{ color: colors.accent }}>Priorities surfaced.</span>
        </h2>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300,
          lineHeight: 1.65, color: colors.textSecondary, marginBottom: 32,
        }}>
          Mimo detects time-sensitive messages and surfaces them first — so the things that actually matter don't get buried under noise.
        </p>

        <div
          data-anim="w3-insight"
          style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            padding: '20px 24px', borderRadius: 14,
            background: 'rgba(74,133,181,0.06)', border: '1px solid rgba(74,133,181,0.12)',
          }}
        >
          <BrainCircuit size={22} color={colors.accent} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
              The mental load disappears.
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.55, color: colors.textTertiary }}>
              You no longer have to organize everything yourself. Mimo does the triage — you just respond.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
