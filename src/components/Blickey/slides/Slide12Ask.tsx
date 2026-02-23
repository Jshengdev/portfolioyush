import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

export default function Slide12Ask({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(titleRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide slide--center slide--dark" style={{ background: '#0A0A0A' }}>
      <h1 ref={titleRef} className="slide-title" style={{ color: '#FFFFFF' }}>BEHAVIOR PROMPTING</h1>
      <div ref={contentRef} className="ask-content">
        <p className="ask-statement">
          The next generation of AI is not something you talk to. It is something that works for you.
        </p>
      </div>
    </div>
  );
}
