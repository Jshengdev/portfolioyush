import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';
import BlikiCharacter from '../components/BlikiCharacter';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

const team: TeamMember[] = [
  { initials: 'JS', name: 'Johnny Sheng', role: 'CTO', bio: 'Full-stack engineer + designer. Built the Blickey prototype end-to-end.' },
  { initials: 'SF', name: 'Sarah Fan', role: 'Marketing Lead', bio: 'Growth strategy and go-to-market. Previously at early-stage B2B SaaS.' },
  { initials: 'TS', name: 'Teri Shim', role: 'Design Lead', bio: 'Product design and user research. Obsessed with seamless UX.' },
];

export default function Slide11Team({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const avatarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infosRef = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const blikiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    avatarsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
        0.4 + i * 0.15
      );
    });
    infosRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.7 + i * 0.15
      );
    });
    if (closingRef.current) {
      tl.fromTo(closingRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.4
      );
    }
    if (blikiRef.current) {
      tl.fromTo(blikiRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
        1.6
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#FFFFFF', position: 'relative' }}>
      <h1 ref={titleRef} className="slide-title">Team</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>Design, engineering, and growth -- under one roof.</p>
      <div className="team-grid">
        {team.map((m, i) => (
          <div key={i} className="team-card">
            <div
              className="team-avatar"
              ref={el => { avatarsRef.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              {m.initials}
            </div>
            <div ref={el => { infosRef.current[i] = el; }} style={{ opacity: 0 }}>
              <h4>{m.name}</h4>
              <p>{m.role}</p>
              <p className="team-bio">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <p ref={closingRef} className="team-closing">
        "We build at the convergence of design, AI, and human behavior."
      </p>
      <div ref={blikiRef} style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0 }}>
        <BlikiCharacter size={36} animationState="wave" style={{ position: 'relative' }} />
      </div>
    </div>
  );
}
