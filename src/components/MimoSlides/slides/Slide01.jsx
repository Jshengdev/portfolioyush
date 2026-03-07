import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Slide01({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo('[data-anim="logo1"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('[data-anim="brand1"]',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('[data-anim="line1"]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="tagline1"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="sub1"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        <svg data-anim="logo1" width="52" height="52" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="22" fill="#4A85B5" />
          <circle cx="13" cy="22" r="3.5" fill="white" />
          <circle cx="22" cy="22" r="3.5" fill="white" />
          <circle cx="31" cy="22" r="3.5" fill="white" />
        </svg>
        <h1
          data-anim="brand1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.05em',
            color: 'var(--text-primary)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Mimo
        </h1>
      </div>

      <div
        data-anim="line1"
        className="accent-line"
        style={{ width: 48, marginBottom: 32, transformOrigin: 'center' }}
      />

      <p
        data-anim="tagline1"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
          maxWidth: 500,
        }}
      >
        Your messages, sorted by
        <br />
        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>what they actually are.</span>
      </p>

      <p
        data-anim="sub1"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginTop: 48,
        }}
      >
        IYA Venture Showcase 2026
      </p>
    </div>
  );
}
