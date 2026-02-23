import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

export default function Slide03Solution({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contrastRef = useRef<HTMLDivElement>(null);
  const oldColRef = useRef<HTMLDivElement>(null);
  const newColRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    tl.fromTo(oldColRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      0.4
    );
    tl.fromTo(newColRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      0.55
    );
    if (questionRef.current) {
      tl.fromTo(questionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      );
    }
    if (blikiRef.current) {
      tl.fromTo(blikiRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.2
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF', position: 'relative' }}>
      <h1 ref={titleRef} className="slide-title">The Insight</h1>
      <div ref={contrastRef} className="insight-contrast">
        <div ref={oldColRef} className="insight-column insight-column--old" style={{ opacity: 0 }}>
          <div className="insight-label">Text Prompting</div>
          <div className="insight-desc">
            You type what you want. The AI responds. You refine. You wait. You type again. Every interaction starts from scratch.
          </div>
        </div>
        <div ref={newColRef} className="insight-column insight-column--new" style={{ opacity: 0 }}>
          <div className="insight-label">Behavior Prompting</div>
          <div className="insight-desc">
            The AI watches how you work. It learns your patterns. It acts before you ask. Every interaction builds on the last.
          </div>
        </div>
      </div>
      <p ref={questionRef} className="insight-question">
        What if your behavior was the prompt?
      </p>
      <div ref={blikiRef} style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0 }}>
        <BlikiCharacter size={36} animationState="idle" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
