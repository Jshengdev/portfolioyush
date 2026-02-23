import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { SlideProps } from '../types';

interface Plan {
  name: string;
  desc: string;
  price: string;
  suffix: string;
  featured: boolean;
}

const plans: Plan[] = [
  { name: 'Free', desc: 'Core screen awareness, basic suggestions, 3 app integrations', price: '$0', suffix: '', featured: false },
  { name: 'Premium', desc: 'Unlimited integrations, full automation, priority learning', price: '$10-15', suffix: '/mo', featured: true },
  { name: 'Enterprise', desc: 'Team workflows, admin controls, compliance, dedicated support', price: 'Custom', suffix: '', featured: false },
];

const unitEcon = [
  { value: '<$0.50', label: 'Inference cost / user / month' },
  { value: '~85%', label: 'Gross margin at scale' },
  { value: '14 mo', label: 'Target payback period' },
];

export default function Slide10BusinessModel({ active }: SlideProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const econRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' },
        0.4 + i * 0.12
      );
    });
    if (econRef.current) {
      tl.fromTo(econRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.0
      );
    }
    return () => { tl.kill(); };
  }, [active]);

  return (
    <div className="slide" style={{ background: '#F7F9FC' }}>
      <h1 ref={titleRef} className="slide-title">Business Model</h1>
      <p className="slide-body" style={{ marginBottom: 40, color: 'var(--gray-500)', fontSize: 20 }}>Freemium with a clear upgrade path.</p>
      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
            ref={el => { cardsRef.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <h3>{plan.name}</h3>
            <p>{plan.desc}</p>
            <div className="price">
              {plan.price}
              {plan.suffix && <span>{plan.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
      <div ref={econRef} className="unit-econ" style={{ opacity: 0 }}>
        {unitEcon.map((item, i) => (
          <div key={i} className="unit-econ-item">
            <div className="unit-econ-value">{item.value}</div>
            <div className="unit-econ-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
