import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SlideAppendix({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="appendix-line"]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.out' }
    )
    .fromTo('[data-anim="appendix-title"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="appendix-sub"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          data-anim="appendix-line"
          style={{ width: 48, height: 3, background: 'var(--accent)', marginBottom: 32, transformOrigin: 'center' }}
        />

        <h1
          data-anim="appendix-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}
        >
          Appendix
        </h1>

        <p
          data-anim="appendix-sub"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--text-tertiary)',
          }}
        >
          Supporting materials
        </p>
      </div>
    </div>
  );
}
