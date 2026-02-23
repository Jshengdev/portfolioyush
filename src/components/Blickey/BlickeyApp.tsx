import { useState, useEffect, useCallback, useRef, type FC } from 'react';
import gsap from 'gsap';
import type { SlideProps } from './types';
import Slide01Cover from './slides/Slide01Cover';
import Slide02Problem from './slides/Slide02Problem';
import Slide03Cost from './slides/Slide03Cost';
import Slide03Solution from './slides/Slide03Solution';
import Slide07HowItWorks from './slides/Slide07HowItWorks';
import Slide04DemoSelection from './slides/Slide04DemoSelection';
import Slide07Demo from './slides/Slide07Demo';
import Slide08Traction from './slides/Slide08Traction';
import Slide09Market from './slides/Slide09Market';
import Slide10BusinessModel from './slides/Slide10BusinessModel';
import Slide11Competition from './slides/Slide11Competition';
import Slide11Team from './slides/Slide11Team';
import Slide12Ask from './slides/Slide12Ask';
import Slide14ThankYou from './slides/Slide14ThankYou';
import './blickey.css';

interface SlideConfig {
  component: FC<SlideProps>;
  title: string;
  bg: string;
  dark: boolean;
}

const SLIDES: SlideConfig[] = [
  { component: Slide01Cover, title: 'Title', bg: '#0A0A0A', dark: true },
  { component: Slide02Problem, title: 'The Problem', bg: '#FFFFFF', dark: false },
  { component: Slide03Cost, title: 'The Cost', bg: '#FFFFFF', dark: false },
  { component: Slide03Solution, title: 'Behavior Prompting', bg: '#FFFFFF', dark: false },
  { component: Slide07HowItWorks, title: 'The Solution', bg: '#FFFFFF', dark: false },
  { component: Slide04DemoSelection, title: 'Use Cases', bg: '#FFFFFF', dark: false },
  { component: Slide07Demo, title: 'Live Demo', bg: '#0A0A0A', dark: true },
  { component: Slide08Traction, title: 'Why Now', bg: '#FFFFFF', dark: false },
  { component: Slide09Market, title: 'Market', bg: '#FFFFFF', dark: false },
  { component: Slide10BusinessModel, title: 'Business Model', bg: '#F7F9FC', dark: false },
  { component: Slide11Competition, title: 'Competition', bg: '#FFFFFF', dark: false },
  { component: Slide11Team, title: 'Team', bg: '#FFFFFF', dark: false },
  { component: Slide12Ask, title: 'Vision', bg: '#0A0A0A', dark: true },
  { component: Slide14ThankYou, title: 'Close', bg: '#0A0A0A', dark: true },
];

interface DonutLogoProps {
  size?: number;
  strokeWidth?: number;
  innerRadius?: number;
}

function DonutLogo({ size = 40, strokeWidth = 4, innerRadius = 16 }: DonutLogoProps) {
  const outer = size / 2;
  return (
    <svg className="donut-logo" viewBox={`0 0 ${size * 2} ${size * 2}`} width={size} height={size}>
      <circle cx={size} cy={size} r={outer - strokeWidth} fill="none" stroke="#635BFF" strokeWidth={strokeWidth} />
      <circle cx={size} cy={size} r={innerRadius} fill="#0A0A0A" />
    </svg>
  );
}

export default function BlickeyApp() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(true);
  const transitioning = useRef(false);
  const slideRef = useRef<HTMLDivElement>(null);

  // Set body background for isolated route
  useEffect(() => {
    document.body.style.backgroundColor = '#0A0A0A';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Loading
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min((elapsed / 800) * 100, 100);
      setLoadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Slide transition animation
  useEffect(() => {
    if (loading) return;
    const el = slideRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [current, loading]);

  const navigate = useCallback((direction: 1 | -1) => {
    const atBoundary = direction === 1
      ? current >= SLIDES.length - 1
      : current <= 0;
    if (transitioning.current || atBoundary) return;
    transitioning.current = true;
    setHintsVisible(false);
    const el = slideRef.current;
    if (el) {
      gsap.to(el, {
        opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setCurrent(c => c + direction);
          transitioning.current = false;
        }
      });
    } else {
      setCurrent(c => c + direction);
      transitioning.current = false;
    }
  }, [current]);

  const goNext = useCallback(() => navigate(1), [navigate]);
  const goPrev = useCallback(() => navigate(-1), [navigate]);

  // Keyboard
  useEffect(() => {
    function handleKey(e: KeyboardEvent): void {
      if (showShortcuts && e.key !== '?' && e.key !== 'Escape') return;
      switch (e.key) {
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case '?':
          setShowShortcuts(s => !s);
          break;
        case 'Escape':
          setShowShortcuts(false);
          break;
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen();
          }
          break;
        case ' ':
          e.preventDefault();
          break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, showShortcuts]);

  const slide = SLIDES[current];
  const SlideComponent = slide.component;
  const progress = ((current + 1) / SLIDES.length) * 100;

  // Loading screen
  if (loading) {
    return (
      <div className="blickey-root">
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              <DonutLogo size={64} strokeWidth={6} innerRadius={20} />
            </div>
            <p className="loading-text">loading blickey</p>
            <div className="loading-bar">
              <div className="loading-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blickey-root">
      <div className="slideshow" style={{ background: slide.bg }}>
        {/* Header donut logo */}
        <div className={`header-logo ${current === 0 ? 'header-logo--hidden' : ''}`}>
          <DonutLogo size={40} strokeWidth={4} innerRadius={16} />
        </div>

        {/* Slide */}
        <div className="slide-wrapper" ref={slideRef}>
          <SlideComponent active={true} />
        </div>

        {/* Click zones for navigation */}
        {current > 0 && (
          <div className="click-zone click-zone--left" onClick={goPrev} />
        )}
        {current < SLIDES.length - 1 && (
          <div className="click-zone click-zone--right" onClick={goNext} />
        )}

        {/* Navigation hints */}
        <div className={`nav-hint nav-hint--left ${!hintsVisible || current === 0 ? 'nav-hint--hidden' : ''}`}>
          <span className="nav-arrow">&#9664;</span>
          <span className="nav-label">prev</span>
        </div>
        <div className={`nav-hint nav-hint--right ${!hintsVisible || current === SLIDES.length - 1 ? 'nav-hint--hidden' : ''}`}>
          <span className="nav-label">next</span>
          <span className="nav-arrow">&#9654;</span>
        </div>

        {/* Slide counter */}
        <div className={`slide-counter ${slide.dark ? 'slide-counter--dark' : ''}`}>
          <span>{current + 1}/{SLIDES.length}</span>
          <div className="counter-tooltip">{slide.title}</div>
        </div>

        {/* Progress bar */}
        <div className={`progress-bar ${slide.dark ? 'progress-bar--dark' : ''}`}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Keyboard shortcuts overlay */}
        {showShortcuts && (
          <div className="shortcuts-overlay" onClick={() => setShowShortcuts(false)}>
            <div className="shortcuts-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <h2>Keyboard shortcuts</h2>
              <div className="shortcut-grid">
                <div className="shortcut">
                  <kbd>&larr;</kbd><kbd>&rarr;</kbd>
                  <span>Navigate slides</span>
                </div>
                <div className="shortcut">
                  <kbd>F</kbd>
                  <span>Fullscreen</span>
                </div>
                <div className="shortcut">
                  <kbd>?</kbd>
                  <span>Toggle this menu</span>
                </div>
              </div>
              <p className="close-hint">Press <kbd>esc</kbd> or <kbd>?</kbd> to close</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
