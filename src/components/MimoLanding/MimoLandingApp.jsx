import { useState, useEffect, useRef } from "react";

/* ── COLOR TOKENS ── */
const colors = {
  bg: "#FAFAF8",
  bgAlt: "#F1F0EC",
  text: "#18181B",
  textSecondary: "#63635E",
  textTertiary: "#A1A09A",
  accent: "#4A85B5",
  accentLight: "rgba(74,133,181,0.10)",
  accentMid: "rgba(74,133,181,0.18)",
  pink: "#B5637A",
  purple: "#8B71B0",
  green: "#5A9E82",
  orange: "#C4854A",
  yellow: "#BFA24A",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.7)",
  cardBg: "rgba(255,255,255,0.6)",
};

/* ── SHARED ICONS ── */
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

const LogoBubble = () => (
  <span style={{ display: "inline-block", width: "0.72em", height: "0.72em", verticalAlign: "bottom", position: "relative", bottom: "0.23em", marginLeft: "-0.01em" }}>
    <svg viewBox="0 0 18 18" fill="none" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect x="1" y="1" width="16" height="16" rx="8" fill={colors.accent} />
      <circle cx="5.8" cy="9" r="1.2" fill="white" />
      <circle cx="9" cy="9" r="1.2" fill="white" />
      <circle cx="12.2" cy="9" r="1.2" fill="white" />
    </svg>
  </span>
);

/* ── REVEAL HOOK ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" } };
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => {
    const scrollContainer = rootRef.current?.closest('.mimo-landing-root');
    if (!scrollContainer) return;
    const h = () => setScrolled(scrollContainer.scrollTop > 50);
    scrollContainer.addEventListener("scroll", h);
    return () => scrollContainer.removeEventListener("scroll", h);
  }, []);
  return (
    <nav ref={rootRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10001, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(24px) saturate(1.5)", WebkitBackdropFilter: "blur(24px) saturate(1.5)", background: scrolled ? "rgba(250,250,248,0.92)" : "rgba(250,250,248,0.75)", borderBottom: "1px solid rgba(0,0,0,0.03)", transition: "all 0.3s ease" }}>
      <a href="#" style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.03em", color: colors.text, textDecoration: "none" }}>mim<LogoBubble /></a>
      <ul style={{ display: "flex", gap: 36, alignItems: "center", listStyle: "none" }}>
        {["Problem", "Features", "How it works"].map(t => (
          <li key={t}><a href={`#${t.toLowerCase().replace(/ /g, "")}`} style={{ fontSize: "0.84rem", fontWeight: 400, color: colors.textSecondary, textDecoration: "none", letterSpacing: "0.01em" }}>{t}</a></li>
        ))}
        <li><a href="#cta" style={{ background: colors.text, color: colors.bg, padding: "10px 24px", borderRadius: 100, fontWeight: 500, fontSize: "0.82rem", textDecoration: "none" }}>Join Waitlist</a></li>
      </ul>
    </nav>
  );
}

/* ── MESSAGE ITEM ── */
function MessageItem({ sender, avatar, platform, summary, original, actionType, id }) {
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
          {actionType === "approve" && <><ActionBtn type="approve" label="✓ Approve" /><ActionBtn type="decline" label="✗ Decline" /></>}
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

/* ── MESSAGE CATEGORY ── */
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

/* ── MOCKUP ── */
function AppMockup() {
  return (
    <div style={{ marginTop: 72, width: "100%", maxWidth: 900, position: "relative", opacity: 0, animation: "mimo-fadeUp 1s ease 0.6s forwards" }}>
      <div style={{ background: colors.glass, backdropFilter: "blur(24px) saturate(1.5)", WebkitBackdropFilter: "blur(24px) saturate(1.5)", border: `1px solid ${colors.glassBorder}`, borderRadius: 20, padding: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.03), 0 24px 64px rgba(0,0,0,0.05)" }}>
        <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            {["#FF605C", "#FFBD44", "#00CA4E"].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
          </div>
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minHeight: 380 }}>
            <MessageCategory label="Scheduling" icon="⏱" count="3" color={colors.accent}>
              <MessageItem sender="Sarah K." avatar={{ letter: "S", color: colors.accent }} platform="iMessage" summary="Thursday coffee catch-up" original="Are you free Thursday for coffee? Been ages!" actionType="schedule" />
              <MessageItem sender="Manager" avatar={{ letter: "M", color: "#6B9AC4" }} platform="Slack" summary="Sync tomorrow at 3pm" original="Can we sync at 3pm tomorrow? Need to go over the sprint retro" actionType="schedule" />
              <MessageItem sender="David R." avatar={{ letter: "D", color: colors.purple }} platform="WhatsApp" summary="Dinner Saturday, 7pm" original="Dinner Saturday? Thinking 7pm at that new place" actionType="schedule" />
            </MessageCategory>

            <MessageCategory label="Deliverables" icon="📎" count="3" color={colors.orange}>
              <MessageItem sender="James T." avatar={{ letter: "J", color: colors.orange }} platform="Gmail" summary="Q3 presentation deck — due Friday" original="Hey, can you send me the Q3 deck by Friday? Need it for the board meeting" actionType="deliverable" />
              <MessageItem sender="Lisa W." avatar={{ letter: "L", color: colors.pink }} platform="Slack" summary="Updated wireframes for homepage" original="Update the wireframes when you can — the homepage ones especially" actionType="deliverable" />
              <MessageItem sender="Client — Arch" avatar={{ letter: "C", color: colors.green }} platform="Instagram" summary="Revised invoice for March retainer" original="Where's the revised invoice? I need it before end of month for accounting" actionType="deliverable" />
            </MessageCategory>

            <MessageCategory label="Approvals" icon="✓" count="2" color={colors.purple}>
              <MessageItem sender="Alex P." avatar={{ letter: "A", color: colors.purple }} platform="Slack" summary="$2,400 event budget approval" original="Is the $2,400 budget okay for the team offsite? Need to book venue by Tuesday" actionType="approve" />
              <MessageItem sender="Kim" avatar={{ letter: "K", color: colors.pink }} platform="iMessage" summary="RSVP for March 15th dinner" original="RSVP for the 15th — yes or no? Need headcount by tomorrow!" actionType="approve" />
            </MessageCategory>

            <MessageCategory label="Follow-ups" icon="↩" count="3" color={colors.green}>
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

/* ── HERO ── */
function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 40px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-25%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: `radial-gradient(ellipse, rgba(74,133,181,0.12) 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none", animation: "mimo-glowPulse 10s ease-in-out infinite" }} />
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", background: colors.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${colors.glassBorder}`, borderRadius: 100, fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", fontWeight: 500, color: colors.textSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 40, opacity: 0, animation: "mimo-fadeUp 0.8s ease forwards", position: "relative" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.accent, animation: "mimo-pulse 2s ease-in-out infinite" }} />
        Coming to Mac
      </div>
      <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2.8rem, 6.5vw, 5rem)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.04em", maxWidth: 780, color: colors.text, opacity: 0, animation: "mimo-fadeUp 0.8s ease 0.15s forwards", position: "relative" }}>
        Your messages, sorted by what they <span style={{ color: colors.accent }}>actually are.</span>
      </h1>
      <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: colors.textSecondary, maxWidth: 500, lineHeight: 1.7, marginTop: 28, fontWeight: 300, opacity: 0, animation: "mimo-fadeUp 0.8s ease 0.3s forwards", position: "relative" }}>
        Mimo pulls messages from every platform and organizes them not by time — but by task type. Scheduling. Deliverables. Follow-ups. Each in its own lane.
      </p>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 48, opacity: 0, animation: "mimo-fadeUp 0.8s ease 0.45s forwards", position: "relative" }}>
        <a href="#cta" style={{ background: colors.accent, color: "white", padding: "15px 34px", borderRadius: 100, fontFamily: "'Sora', sans-serif", fontSize: "0.88rem", fontWeight: 500, textDecoration: "none", letterSpacing: "-0.01em" }}>Get Early Access</a>
        <a href="#features" style={{ color: colors.textSecondary, padding: "15px 24px", fontSize: "0.88rem", fontWeight: 400, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>See how it works ↓</a>
      </div>
      <AppMockup />
    </section>
  );
}

/* ── STAT CARD ── */
function StatCard({ number, label }) {
  const [hov, setHov] = useState(false);
  const r = useReveal();
  return (
    <div ref={r.ref} style={{ ...r.style, background: colors.cardBg, backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 20, padding: "36px 32px", transition: "transform 0.3s ease", transform: hov ? "translateY(-4px)" : r.style.transform, position: "relative", overflow: "hidden" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: colors.accent, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: colors.accent }}>{number}</div>
      <div style={{ fontSize: "0.88rem", color: colors.textSecondary, marginTop: 8, lineHeight: 1.5, fontWeight: 300 }}>{label}</div>
    </div>
  );
}

/* ── PROBLEM SECTION ── */
function ProblemSection() {
  const r = useReveal();
  return (
    <section id="problem" style={{ padding: "120px 40px", background: colors.bgAlt, position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={r.ref} style={r.style}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textTertiary, marginBottom: 20 }}>The Problem</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 660, color: colors.text }}>Every message is a task pretending to be a <span style={{ color: colors.accent }}>conversation.</span></h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: colors.textSecondary, maxWidth: 560, marginTop: 24, fontWeight: 300 }}>"Are you free Thursday?" is a scheduling decision. "Can you send the deck?" is a deliverable. But every messaging app shows them exactly the same way: reverse-chronological, one long scroll. The result isn't poor communication — it's cognitive paralysis.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 60 }}>
          <StatCard number="4-8" label="Messaging platforms the average person juggles daily" />
          <StatCard number="50+" label="Distinct tasks hiding inside your unread messages right now" />
          <StatCard number="0" label="Tools that sort across platforms by what messages actually are" />
        </div>
      </div>
    </section>
  );
}

/* ── QUOTE SECTION ── */
function QuoteSection() {
  const r = useReveal();
  return (
    <section style={{ padding: "120px 40px", background: colors.bg, position: "relative", overflow: "hidden" }}>
      <div ref={r.ref} style={r.style}>
        <blockquote style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)", fontWeight: 400, lineHeight: 1.45, color: colors.text, maxWidth: 660, margin: "0 auto", position: "relative", letterSpacing: "-0.02em", textAlign: "center" }}>
          <span style={{ fontSize: "5rem", lineHeight: 1, color: colors.accent, opacity: 0.3, position: "absolute", top: -30, left: -24, fontFamily: "Georgia, serif" }}>"</span>
          If I tried to process all my messages across all my different platforms at the same time, I would have a 50-item to-do list. It's impossible.
        </blockquote>
        <p style={{ marginTop: 28, fontSize: "0.85rem", color: colors.textTertiary, fontWeight: 400, textAlign: "center" }}>— Teri Shim, Founding Designer & Target User</p>
      </div>
    </section>
  );
}

/* ── FEATURE CARD ── */
function FeatureCard({ icon, title, description, children, large }) {
  const [hov, setHov] = useState(false);
  const r = useReveal();
  return (
    <div ref={r.ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ ...r.style, background: colors.cardBg, backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 20, padding: large ? "48px 44px" : "40px 36px", transition: "all 0.35s ease", position: "relative", overflow: "hidden", transform: hov ? "translateY(-4px)" : r.style.transform, boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.05)" : "none", ...(large ? { gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" } : {}) }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: colors.accent, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
      <div>
        <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: 20, background: colors.accentLight }}>{icon}</div>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 10 }}>{title}</h3>
        <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: colors.textSecondary, fontWeight: 300 }}>{description}</p>
      </div>
      {children}
    </div>
  );
}

/* ── TRUST GRADIENT VISUAL ── */
function TrustGradient() {
  const phases = [
    { week: "WK 1-2", label: "Observe", width: "25%" },
    { week: "WK 3-4", label: "Nudge", width: "50%" },
    { week: "MO 2", label: "Suggest", width: "75%" },
    { week: "MO 3+", label: "Act", width: "100%" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {phases.map(p => (
        <div key={p.week} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.03)", transition: "all 0.3s" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: colors.textTertiary, minWidth: 56 }}>{p.week}</span>
          <div style={{ flex: 1, height: 4, background: "rgba(0,0,0,0.04)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 2, background: colors.accent, width: p.width, transition: "width 1.5s ease" }} />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: colors.textSecondary, minWidth: 72, textAlign: "right" }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── FEATURES SECTION ── */
function FeaturesSection() {
  const r = useReveal();
  return (
    <section id="features" style={{ padding: "120px 40px", background: colors.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={r.ref} style={r.style}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textTertiary, marginBottom: 20 }}>The Solution</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 660, color: colors.text }}>A command center for the messages that <span style={{ color: colors.accent }}>matter.</span></h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: colors.textSecondary, maxWidth: 560, marginTop: 24, fontWeight: 300 }}>Mimo sits in your Mac menu bar. Click to reveal your entire communication world — organized by intent, not arrival time.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 60 }}>
          <FeatureCard icon="⏱" title="Smart Scheduling" description='Every "are you free?" from every platform in one view. Calendar conflicts highlighted inline. Batch-respond in minutes, not hours.' />
          <FeatureCard icon="📎" title="Auto-Extracted Tasks" description="Deliverables and action items pulled from your messages automatically. Deadlines detected. Source conversations always linked." />
          <FeatureCard icon="🧠" title="Learns Your Voice" description="Professional for your manager, casual for friends, warm for family. Same intent, different expression — learned from your actual messages." />
          <FeatureCard icon="↩" title="Nothing Falls Through" description={`That friend you said "let's hang" to a month ago. The Slack thread with pending replies. Mimo surfaces what you've forgotten to follow up on.`} />
          <FeatureCard icon="🤝" title="Trust is Earned, Not Configured" description="Mimo doesn't start by acting. It starts by watching. Like a new assistant who proves themselves — autonomy is progressively unlocked as accuracy improves." large>
            <TrustGradient />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

/* ── PLATFORMS SECTION ── */
function PlatformsSection() {
  const r = useReveal();
  const platforms = [
    { icon: "💬", name: "iMessage" }, { icon: "⚡", name: "Slack" }, { icon: "✉️", name: "Gmail" }, { icon: "📸", name: "Instagram" },
    { icon: "🎮", name: "Discord" }, { icon: "💼", name: "LinkedIn" }, { icon: "📱", name: "WhatsApp" }, { icon: "📅", name: "Calendar" },
  ];
  return (
    <section style={{ padding: "120px 40px", background: colors.bg, textAlign: "center" }}>
      <div ref={r.ref} style={r.style}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textTertiary, marginBottom: 20 }}>Integrations</div>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 660, color: colors.text, margin: "0 auto" }}>One dashboard. <span style={{ color: colors.accent }}>Every</span> platform.</h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: colors.textSecondary, maxWidth: 560, marginTop: 24, fontWeight: 300, margin: "24px auto 0" }}>The gap isn't email — email has been solved. The gap is everything else.</p>
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 56, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
        {platforms.map(p => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 22px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 100, fontSize: "0.84rem", fontWeight: 400, color: colors.textSecondary, transition: "all 0.3s", cursor: "default" }}>
            <span style={{ fontSize: "1.05rem" }}>{p.icon}</span> {p.name}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── HOW STEP CARD (extracted to fix rules-of-hooks) ── */
function HowStepCard({ index, title, desc }) {
  const sr = useReveal();
  return (
    <div ref={sr.ref} style={{ ...sr.style, padding: "36px 32px", background: colors.cardBg, border: "1px solid rgba(0,0,0,0.04)", borderRadius: 20, backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: colors.accent, letterSpacing: "0.02em", display: "block", marginBottom: 20, fontWeight: 500 }}>{String(index + 1).padStart(2, "0")}</span>
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 10, letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: colors.textSecondary, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

/* ── HOW IT WORKS SECTION ── */
function HowSection() {
  const r = useReveal();
  const steps = [
    { title: "Connect Your Platforms", desc: "Start with one — iMessage is already on your Mac. Add Slack, Gmail, Instagram, and more as you go. Each one makes Mimo smarter." },
    { title: "Messages Sort Themselves", desc: "AI-powered categorization classifies every message by intent: scheduling, deliverables, approvals, follow-ups, and social. No manual effort." },
    { title: "Batch, Respond, Breathe", desc: "Clear all your scheduling requests in one session. Knock out approvals in two taps. Handle deliverables with full context. Then enjoy the memes." },
  ];
  return (
    <section id="howitworks" style={{ padding: "120px 40px", background: colors.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={r.ref} style={r.style}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textTertiary, marginBottom: 20 }}>How It Works</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 660, color: colors.text }}>Three steps to <span style={{ color: colors.accent }}>clarity.</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 60 }}>
          {steps.map((s, i) => (
            <HowStepCard key={i} index={i} title={s.title} desc={s.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA SECTION ── */
function CTASection() {
  const r = useReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      setSubmitted(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <section id="cta" style={{ textAlign: "center", padding: "140px 40px", position: "relative", overflow: "hidden", background: colors.bg }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, background: `radial-gradient(ellipse, rgba(74,133,181,0.08) 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      <div ref={r.ref} style={r.style}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textTertiary, marginBottom: 20 }}>Early Access</div>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.035em", maxWidth: 560, color: colors.text, margin: "0 auto" }}>Stop scrolling. Start <span style={{ color: colors.accent }}>clearing.</span></h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: colors.textSecondary, maxWidth: 440, marginTop: 20, fontWeight: 300, marginLeft: "auto", marginRight: "auto" }}>Join the waitlist for the Mac beta. Be one of the first to experience messages organized by what they actually are.</p>
        <div style={{ marginTop: 40, display: "flex", gap: 8, justifyContent: "center", position: "relative" }}>
          <div style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} disabled={submitted} placeholder="your@email.com" style={{ flex: 1, padding: "15px 22px", borderRadius: 100, border: `1px solid ${error ? colors.accent : "rgba(0,0,0,0.08)"}`, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: colors.text, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", opacity: submitted ? 0.5 : 1, boxShadow: error ? `0 0 0 3px rgba(74,133,181,0.15)` : "none" }} />
            <button onClick={handleSubmit} style={{ background: submitted ? colors.green : colors.accent, color: "white", padding: "15px 34px", borderRadius: 100, fontFamily: "'Sora', sans-serif", fontSize: "0.88rem", fontWeight: 500, border: "none", cursor: "pointer", letterSpacing: "-0.01em", transition: "all 0.25s ease" }}>{submitted ? "You're in!" : "Join Waitlist"}</button>
          </div>
        </div>
        <p style={{ fontSize: "0.78rem", color: colors.textTertiary, marginTop: 16, position: "relative" }}>Mac only · Free beta · Launching Summer 2026</p>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ padding: "60px 40px", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.15rem", fontWeight: 600, color: colors.text, letterSpacing: "-0.02em" }}>mim<LogoBubble /></div>
      <ul style={{ display: "flex", gap: 28, listStyle: "none" }}>
        {["About", "Privacy", "Twitter", "Discord"].map(t => (
          <li key={t}><a href="#" style={{ fontSize: "0.82rem", color: colors.textTertiary, textDecoration: "none" }}>{t}</a></li>
        ))}
      </ul>
      <span style={{ fontSize: "0.78rem", color: colors.textTertiary }}>© 2026 Mimo</span>
    </footer>
  );
}

/* ── SCOPED GLOBAL STYLES (keyframes + grain + base) ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
    .mimo-landing-root {
      all: initial;
      display: block;
      position: fixed;
      inset: 0;
      z-index: 9999;
      overflow-y: auto;
      overflow-x: hidden;
      font-family: 'DM Sans', -apple-system, sans-serif;
      background: ${colors.bg};
      color: ${colors.text};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      scroll-behavior: smooth;
    }
    .mimo-landing-root * { margin: 0; padding: 0; box-sizing: border-box; }
    .mimo-landing-root::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 10002;
      opacity: 0.22;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 200px 200px;
    }
    @keyframes mimo-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes mimo-glowPulse { 0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); } 50% { opacity: 0.7; transform: translateX(-50%) scale(1.05); } }
    @keyframes mimo-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
  `}</style>
);

/* ── APP ── */
export default function MimoLandingApp() {
  return (
    <div className="mimo-landing-root">
      <GlobalStyles />
      <Nav />
      <Hero />
      <ProblemSection />
      <QuoteSection />
      <FeaturesSection />
      <PlatformsSection />
      <HowSection />
      <CTASection />
      <Footer />
    </div>
  );
}
