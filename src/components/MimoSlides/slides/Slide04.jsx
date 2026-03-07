import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Slide04({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="eyebrow4"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="lead"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="divider4"]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.out' },
      '+=0.2'
    )
    .fromTo('[data-anim="line-a"]',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('[data-anim="line-b"]',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('[data-anim="line-c"]',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div data-anim="eyebrow4" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
        The Problem
      </div>

      <div style={{ maxWidth: 800, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p
          data-anim="lead"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: 36,
          }}
        >
          All of this information creates <span style={{ color: 'var(--accent)' }}>cognitive load</span> that completely overwhelms Teri.
        </p>

        <div
          data-anim="divider4"
          style={{ width: 48, height: 3, background: 'var(--accent)', marginBottom: 36, transformOrigin: 'center' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p data-anim="line-a" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'var(--text-secondary)',
            lineHeight: 1.25,
          }}>
            This is why Teri <span style={{ fontWeight: 600, color: 'var(--accent)' }}>avoids her apps.</span>
          </p>

          <p data-anim="line-b" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'var(--text-secondary)',
            lineHeight: 1.25,
          }}>
            This is why <span style={{ fontWeight: 600, color: '#C4854A' }}>messages pile up.</span>
          </p>

          <p data-anim="line-c" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'var(--text-secondary)',
            lineHeight: 1.25,
          }}>
            This is why <span style={{ fontWeight: 600, color: '#B5637A' }}>deadlines get missed</span> and <span style={{ fontWeight: 600, color: '#8B71B0' }}>friends get left on read.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
