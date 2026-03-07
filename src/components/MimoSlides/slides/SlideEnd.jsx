import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SlideEnd({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="end-logo"]',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
    )
    .fromTo('[data-anim="end-tagline"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('[data-anim="end-line"]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="end-url"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg data-anim="end-logo" width="64" height="64" viewBox="0 0 44 44" fill="none" style={{ marginBottom: 32 }}>
          <circle cx="22" cy="22" r="22" fill="#4A85B5" />
          <circle cx="13" cy="22" r="3.5" fill="white" />
          <circle cx="22" cy="22" r="3.5" fill="white" />
          <circle cx="31" cy="22" r="3.5" fill="white" />
        </svg>

        <p
          data-anim="end-tagline"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--text-secondary)',
            marginBottom: 40,
          }}
        >
          Your messages, sorted by <span style={{ color: 'var(--accent)', fontWeight: 500 }}>what they actually are.</span>
        </p>

        <div
          data-anim="end-line"
          style={{ width: 48, height: 3, background: 'var(--accent)', marginBottom: 40, transformOrigin: 'center' }}
        />

        <p
          data-anim="end-url"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--accent)',
          }}
        >
          johnnysheng.com/mimo
        </p>
      </div>
    </div>
  );
}
