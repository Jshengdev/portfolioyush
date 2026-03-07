import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TIERS = [
  {
    tag: 'TAM',
    title: 'Total Addressable Market',
    headline: '$50B',
    subtitle: '1.25B knowledge workers globally',
    desc: 'Every professional drowning in messages, at ~$40/yr productivity spend.',
    color: '#4A85B5',
    size: 340,
  },
  {
    tag: 'SAM',
    title: 'Serviceable Addressable Market',
    headline: '$4.8B',
    subtitle: '120M Mac-using professionals, 22–40',
    desc: 'English-speaking, managing 3+ platforms daily.',
    color: '#8B71B0',
    size: 230,
  },
  {
    tag: 'SOM',
    title: 'Serviceable Obtainable Market',
    headline: '$5.7M',
    subtitle: '~120K users in year one',
    desc: '0.1% SAM capture at ~$4/mo blended.',
    color: '#5A9E82',
    size: 130,
  },
];

export default function Slide07({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow7"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="title7"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="circle"]',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.2 },
      '-=0.2'
    )
    .fromTo('[data-anim="label"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.15 },
      '-=0.6'
    )
    .fromTo('[data-anim="footnote7"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FAFAF8', flexDirection: 'row', alignItems: 'center', gap: 60 }} ref={containerRef}>
      {/* Left: concentric circles */}
      <div style={{ position: 'relative', width: 380, height: 380, flexShrink: 0 }}>
        {TIERS.map((t) => (
          <div
            key={t.tag}
            data-anim="circle"
            style={{
              position: 'absolute',
              width: t.size,
              height: t.size,
              borderRadius: '50%',
              border: `2px solid ${t.color}`,
              background: `${t.color}08`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t.tag === 'SOM' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: t.color,
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {t.tag}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  fontWeight: 500,
                  color: t.color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {t.headline}
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          data-anim="label"
          style={{
            position: 'absolute',
            top: 12,
            left: 24,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', color: TIERS[0].color, textTransform: 'uppercase' }}>
            TAM
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 500, color: TIERS[0].color, letterSpacing: '-0.03em' }}>
            {TIERS[0].headline}
          </div>
        </div>

        <div
          data-anim="label"
          style={{
            position: 'absolute',
            top: 68,
            right: 28,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', color: TIERS[1].color, textTransform: 'uppercase' }}>
            SAM
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 500, color: TIERS[1].color, letterSpacing: '-0.03em' }}>
            {TIERS[1].headline}
          </div>
        </div>
      </div>

      {/* Right: details */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <div data-anim="eyebrow7" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
          The Market
        </div>

        <h2
          data-anim="title7"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: 36,
          }}
        >
          TAM / SAM / <span style={{ color: 'var(--accent)' }}>SOM</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
          {TIERS.map((t) => (
            <div key={t.tag} data-anim="label" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: t.color,
                marginTop: 6,
                flexShrink: 0,
                boxShadow: `0 0 8px ${t.color}30`,
              }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: t.color, textTransform: 'uppercase' }}>
                    {t.tag}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, color: t.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {t.headline}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {t.subtitle}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-tertiary)' }}>
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          data-anim="footnote7"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          The bottleneck isn't market size — it's whether categorization is good enough to create the
          <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}> daily habit</span> that drives retention.
        </p>
      </div>
    </div>
  );
}
