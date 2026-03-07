import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageSquare } from 'lucide-react';

const MESSAGES = [
  { from: 'Sarah K.', preview: 'Hey! Are you free for coffee this week?', platform: 'iMessage' },
  { from: 'Client — Haus', preview: 'Can you send the updated deck by EOD?', platform: 'Slack' },
  { from: 'Daniel R.', preview: 'Quick question about the layout...', platform: 'Gmail' },
  { from: 'Asana Bot', preview: 'Reminder: Homepage redesign due Friday', platform: 'Slack' },
  { from: 'Alex M.', preview: 'Saw your work — would love to connect', platform: 'Instagram' },
  { from: 'Mom', preview: 'Did you eat today?', platform: 'iMessage' },
  { from: 'Jordan P.', preview: 'Invoice #4021 attached — please confirm', platform: 'Gmail' },
  { from: 'Figma', preview: 'Natalie left a comment on Homepage v3', platform: 'Email' },
  { from: 'Leo T.', preview: 'Yo did you see this lmao', platform: 'Discord' },
  { from: 'Recruiter', preview: 'Exciting opportunity at...', platform: 'LinkedIn' },
  { from: 'Amy W.', preview: 'Can you review the contracts today?', platform: 'Slack' },
  { from: 'Group Chat', preview: 'who\'s coming Saturday?', platform: 'iMessage' },
  { from: 'Client — Oliv', preview: 'Hey — blue or green for the CTA?', platform: 'Instagram' },
  { from: 'Stripe', preview: 'Your payout of $2,400 is on the way', platform: 'Email' },
  { from: 'Kira L.', preview: 'Let\'s catch up soon, it\'s been ages', platform: 'WhatsApp' },
  { from: 'Calendar', preview: 'Reminder: Standup in 15 minutes', platform: 'Google' },
  { from: 'Mike D.', preview: 'Thoughts on the new nav structure?', platform: 'Slack' },
  { from: 'Landlord', preview: 'Rent confirmation for March received', platform: 'Email' },
  { from: 'Notion', preview: 'You have 3 overdue tasks in Sprint 4', platform: 'Email' },
  { from: 'Dad', preview: 'Call me when you get a chance', platform: 'iMessage' },
];

const COLS = 4;
const PER_COL = Math.ceil(MESSAGES.length / COLS);
const COLUMNS = Array.from({ length: COLS }, (_, i) =>
  MESSAGES.slice(i * PER_COL, (i + 1) * PER_COL)
);

export default function Slide02({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('[data-anim="msg"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', stagger: { each: 0.04, from: 'random' } }
    )
    .fromTo('[data-anim="overlay-bg"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '+=0.3'
    )
    .fromTo('[data-anim="punchline2"]',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', padding: 0, alignItems: 'stretch', justifyContent: 'stretch' }} ref={containerRef}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: 8,
        padding: '24px 24px',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {COLUMNS.map((col, ci) => (
          <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.map((msg) => (
              <div
                key={msg.from}
                data-anim="msg"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: 10,
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  flexShrink: 0,
                  opacity: 0.7,
                }} />
                <MessageSquare size={13} color="var(--text-tertiary)" strokeWidth={1.5} style={{ flexShrink: 0, opacity: 0.5 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}>
                      {msg.from}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.03em',
                      opacity: 0.6,
                    }}>
                      {msg.platform}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 300,
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {msg.preview}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <div
          data-anim="overlay-bg"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(250,250,248,0.92) 0%, rgba(250,250,248,0.75) 50%, rgba(250,250,248,0.3) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', maxWidth: 600 }}>
          <p
            data-anim="punchline2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            They all look the same.
            <br />
            <span style={{ color: 'var(--accent)' }}>They are not.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
