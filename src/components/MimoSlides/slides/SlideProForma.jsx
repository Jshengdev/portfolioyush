import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileSpreadsheet } from 'lucide-react';

export default function SlideProForma({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('[data-anim="pf-eyebrow"]',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo('[data-anim="pf-title"]',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="pf-card"]',
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('[data-anim="pf-note"]',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    );

    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center" style={{ background: '#FAFAF8' }} ref={containerRef}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600 }}>
        <div data-anim="pf-eyebrow" className="slide-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
          Appendix
        </div>

        <h2
          data-anim="pf-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          Financial <span style={{ color: 'var(--accent)' }}>Pro Forma</span>
        </h2>

        <a
          href="https://docs.google.com/spreadsheets/d/1OSyhoq9Qm9huLWGz6lpIvGamPhEKXoMR/edit?usp=sharing&ouid=115114635588543669377&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          data-anim="pf-card"
          className="glass-card"
          style={{
            padding: '32px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            textDecoration: 'none',
            cursor: 'pointer',
            borderTop: '3px solid var(--accent)',
            marginBottom: 24,
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: 'rgba(74,133,181,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileSpreadsheet size={24} color="var(--accent)" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 4,
            }}>
              View Full Financial Pro Forma
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 400,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.02em',
            }}>
              Google Sheets — Revenue projections, cost breakdown & milestones
            </div>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            color: 'var(--accent)',
            marginLeft: 'auto',
            flexShrink: 0,
          }}>
            &#8599;
          </span>
        </a>

        <p
          data-anim="pf-note"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--text-tertiary)',
            textAlign: 'center',
          }}
        >
          Click the card above to open the full spreadsheet
        </p>
      </div>
    </div>
  );
}
