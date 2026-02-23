import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

const flowSteps = ['OBSERVE', 'LEARN', 'SUGGEST', 'CONFIRM', 'AUTOMATE'];

const timeline = [
  { period: 'Day 1', event: 'Blickey watches silently. Learns your apps, tabs, and patterns.' },
  { period: 'Week 2', event: 'Starts making suggestions. "You usually open Figma now."' },
  { period: 'Month 2', event: 'Fully autonomous. Opens apps, drafts emails, blocks distractions.' },
];

export default function Slide07HowItWorks({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const arrowsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.3
      );
    }
    // Flow steps + arrows staggered
    flowSteps.forEach((_, i) => {
      const step = stepsRef.current[i];
      if (step) {
        tl.fromTo(step,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.5 + i * 0.12
        );
      }
      if (i < flowSteps.length - 1) {
        const arrow = arrowsRef.current[i];
        if (arrow) {
          tl.fromTo(arrow,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: 'power2.out' },
            0.55 + i * 0.12
          );
        }
      }
    });
    // Timeline cards
    timelineRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.1 + i * 0.15
      );
    });
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF' }}>
      <h1 ref={titleRef} className="slide-title">BLICKEY</h1>
      <p ref={taglineRef} className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>
        A desktop agent that learns how you work and starts doing things before you ask.
      </p>
      <div className="flow-steps">
        {flowSteps.map((step, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div
              className="flow-step"
              ref={el => { stepsRef.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              <h4>{step}</h4>
            </div>
            {i < flowSteps.length - 1 && (
              <span
                className="flow-arrow"
                ref={el => { arrowsRef.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                &#8594;
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="timeline-grid">
        {timeline.map((t, i) => (
          <div
            key={i}
            className="timeline-card"
            ref={el => { timelineRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <div className="timeline-period">{t.period}</div>
            <div className="timeline-event">{t.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
