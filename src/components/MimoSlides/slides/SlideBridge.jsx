import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* Color tokens */
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

/* Shared icons */
const BubbleIcon = ({ size = 12 }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size} style={{ flexShrink: 0, opacity: 0.5, marginTop: 1 }}>
    <path d="M2 2h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3v-3H2a1 1 0 01-1-1V3a1 1 0 011-1z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11}>
    <rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <line x1="5" y1="1" x2="5" y2="4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="11" y1="1" x2="11" y2="4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="2" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" width={10} height={10}>
    <circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 10v.5" />
  </svg>
);

/* Message item */
function MessageItem({ sender, avatar, platform, summary, original, actionType }) {
  const [showOriginal, setShowOriginal] = useState(actionType === "message");
  const isFollowUp = actionType === "message";

  const btnColors = {
    schedule: { bg: "rgba(74,133,181,0.1)", color: colors.accent, hoverBg: "rgba(74,133,181,0.2)" },
    approve: { bg: "rgba(139,113,176,0.1)", color: colors.purple, hoverBg: "rgba(139,113,176,0.2)" },
    message: { bg: "rgba(90,158,130,0.1)", color: colors.green, hoverBg: "rgba(90,158,130,0.2)" },
    decline: { bg: "rgba(0,0,0,0.04)", color: colors.textTertiary, hoverBg: "rgba(0,0,0,0.07)" },
  };

  const ActionBtn = ({ type, label, icon }) => {
    const [hov, setHov] = useState(false);
    const c = btnColors[type];
    return (
      <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.62rem", fontWeight: 600, padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 4, background: hov ? c.hoverBg : c.bg, color: c.color }}>
        {icon}{label}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 600, color: "white", fontFamily: "'Sora', sans-serif", background: avatar.color }}>{avatar.letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 500, color: colors.text }}>{sender}</span>
          <span style={{ fontSize: "0.55rem", fontWeight: 600, color: colors.textTertiary, letterSpacing: "0.04em", textTransform: "uppercase", background: "rgba(0,0,0,0.04)", padding: "2px 6px", borderRadius: 4 }}>{platform}</span>
        </div>
        {!isFollowUp && !showOriginal && (
          <div style={{ fontSize: "0.74rem", color: colors.text, marginTop: 3, fontWeight: 400, display: "flex", alignItems: "center", gap: 5, lineHeight: 1.4 }}>{summary}</div>
        )}
        {(isFollowUp || showOriginal) && (
          <div style={{ fontSize: "0.72rem", color: colors.textSecondary, marginTop: 3, fontStyle: "italic", display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.4 }}>
            <BubbleIcon />{original}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          {actionType === "schedule" && <ActionBtn type="schedule" label="Schedule" icon={<CalendarIcon />} />}
          {actionType === "approve" && <><ActionBtn type="approve" label="Approve" /><ActionBtn type="decline" label="Decline" /></>}
          {actionType === "message" && <ActionBtn type="message" label="Message" icon={<BubbleIcon size={11} />} />}
          {!isFollowUp && (
            <button onClick={() => setShowOriginal(!showOriginal)} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.58rem", color: colors.textTertiary, cursor: "pointer", border: "none", background: "none", padding: "2px 0", marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s" }}>
              <InfoIcon />{showOriginal ? "show summary" : "show original"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Message category */
function MessageCategory({ label, icon, count, color, children }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.04)", transition: "transform 0.3s ease, box-shadow 0.3s ease", transform: hov ? "translateY(-2px)" : "none", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.04)" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color }}>{icon} {label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: colors.textTertiary, background: "rgba(0,0,0,0.03)", padding: "3px 8px", borderRadius: 6 }}>{count} new</span>
      </div>
      {children}
    </div>
  );
}

/* Slide */
export default function SlideBridge({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="bridge-intro"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="bridge-logo"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo('[data-anim="bridge-name"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('[data-anim="bridge-tagline"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="mockup"]',
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8', padding: '60px 60px 40px' }} ref={containerRef}>
      <p
        data-anim="bridge-intro"
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--text-tertiary)', marginBottom: 16,
        }}
      >
        Introducing
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <svg data-anim="bridge-logo" width="40" height="40" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="22" fill="#4A85B5" />
          <circle cx="13" cy="22" r="3.5" fill="white" />
          <circle cx="22" cy="22" r="3.5" fill="white" />
          <circle cx="31" cy="22" r="3.5" fill="white" />
        </svg>
        <h2
          data-anim="bridge-name"
          style={{
            fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700,
            letterSpacing: '-0.05em', color: 'var(--text-primary)', lineHeight: 1, margin: 0,
          }}
        >
          Mimo
        </h2>
      </div>

      <p
        data-anim="bridge-tagline"
        style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400,
          letterSpacing: '-0.02em', color: 'var(--text-secondary)', marginBottom: 32,
        }}
      >
        Your messages, sorted by <span style={{ color: 'var(--accent)', fontWeight: 500 }}>what they actually are.</span>
      </p>

      {/* App mockup */}
      <div
        data-anim="mockup"
        style={{
          width: '100%', maxWidth: 900,
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
            {['#FF605C', '#FFBD44', '#00CA4E'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 380 }}>
            <MessageCategory label="Scheduling" icon="&#9201;" count="3" color={colors.accent}>
              <MessageItem sender="Sarah K." avatar={{ letter: "S", color: colors.accent }} platform="iMessage" summary="Thursday coffee catch-up" original="Are you free Thursday for coffee? Been ages!" actionType="schedule" />
              <MessageItem sender="Manager" avatar={{ letter: "M", color: "#6B9AC4" }} platform="Slack" summary="Sync tomorrow at 3pm" original="Can we sync at 3pm tomorrow? Need to go over the sprint retro" actionType="schedule" />
              <MessageItem sender="David R." avatar={{ letter: "D", color: colors.purple }} platform="WhatsApp" summary="Dinner Saturday, 7pm" original="Dinner Saturday? Thinking 7pm at that new place" actionType="schedule" />
            </MessageCategory>

            <MessageCategory label="Deliverables" icon="&#128206;" count="3" color={colors.orange}>
              <MessageItem sender="James T." avatar={{ letter: "J", color: colors.orange }} platform="Gmail" summary="Q3 presentation deck — due Friday" original="Hey, can you send me the Q3 deck by Friday? Need it for the board meeting" actionType="deliverable" />
              <MessageItem sender="Lisa W." avatar={{ letter: "L", color: colors.pink }} platform="Slack" summary="Updated wireframes for homepage" original="Update the wireframes when you can — the homepage ones especially" actionType="deliverable" />
              <MessageItem sender="Client — Arch" avatar={{ letter: "C", color: colors.green }} platform="Instagram" summary="Revised invoice for March retainer" original="Where's the revised invoice? I need it before end of month for accounting" actionType="deliverable" />
            </MessageCategory>

            <MessageCategory label="Approvals" icon="&#10003;" count="2" color={colors.purple}>
              <MessageItem sender="Alex P." avatar={{ letter: "A", color: colors.purple }} platform="Slack" summary="$2,400 event budget approval" original="Is the $2,400 budget okay for the team offsite? Need to book venue by Tuesday" actionType="approve" />
              <MessageItem sender="Kim" avatar={{ letter: "K", color: colors.pink }} platform="iMessage" summary="RSVP for March 15th dinner" original="RSVP for the 15th — yes or no? Need headcount by tomorrow!" actionType="approve" />
            </MessageCategory>

            <MessageCategory label="Follow-ups" icon="&#8617;" count="3" color={colors.green}>
              <MessageItem sender="Rachel M." avatar={{ letter: "R", color: colors.green }} platform="iMessage · 3d" summary="" original="Hey! Still on for hiking this weekend?" actionType="message" />
              <MessageItem sender="Tom H." avatar={{ letter: "T", color: colors.accent }} platform="LinkedIn · 1w" summary="" original="Following up on the contract — any updates on your end?" actionType="message" />
              <MessageItem sender="Nisha" avatar={{ letter: "N", color: colors.orange }} platform="Discord · 2d" summary="" original="Lmk what you think of the designs! No rush btw" actionType="message" />
            </MessageCategory>
          </div>
        </div>
      </div>
    </div>
  );
}
