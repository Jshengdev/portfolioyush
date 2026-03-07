import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import {
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06,
  Slide07, Slide08, Slide09, Slide10,
  SlideAppendix, SlideBridge, SlideEnd, SlideProForma,
  SlideWalk01, SlideWalk02, SlideWalk03,
} from './slides'
import './styles/mimo-slides.css'

const SLIDES = [
  { component: Slide01, title: 'Mimo', bg: '#FAFAF8', dark: false },
  { component: Slide02, title: 'The Problem — Setup', bg: '#FAFAF8', dark: false },
  { component: Slide03, title: 'The Problem — Meet Teri', bg: '#FAFAF8', dark: false },
  { component: Slide04, title: 'The Problem — Consequence', bg: '#FAFAF8', dark: false },
  { component: SlideBridge, title: 'Introducing Mimo', bg: '#FAFAF8', dark: false },
  { component: Slide05, title: 'The Shift', bg: '#FAFAF8', dark: false },
  { component: Slide06, title: 'The Solution', bg: '#FAFAF8', dark: false },
  { component: SlideWalk01, title: 'Connect Platforms', bg: '#FAFAF8', dark: false },
  { component: SlideWalk02, title: 'AI Sorts & Actions', bg: '#FAFAF8', dark: false },
  { component: SlideWalk03, title: 'Smart Prioritization', bg: '#FAFAF8', dark: false },
  { component: Slide07, title: 'The Market', bg: '#FAFAF8', dark: false },
  { component: Slide08, title: 'Why Now', bg: '#FAFAF8', dark: false },
  { component: Slide09, title: 'The Team', bg: '#FAFAF8', dark: false },
  { component: Slide10, title: 'Use of Proceeds', bg: '#FAFAF8', dark: false },
  { component: SlideAppendix, title: 'Appendix', bg: '#FAFAF8', dark: false },
  { component: SlideProForma, title: 'Financial Pro Forma', bg: '#FAFAF8', dark: false },
  { component: SlideEnd, title: 'Landing Page', bg: '#FAFAF8', dark: false },
]

export default function MimoSlidesApp() {
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [hintsVisible, setHintsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const transitioning = useRef(false)
  const slideRef = useRef(null)

  // Loading
  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min((elapsed / 800) * 100, 100)
      setLoadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 400)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Slide transition animation
  useEffect(() => {
    if (loading) return
    const el = slideRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    )
  }, [current, loading])

  const navigate = useCallback((direction) => {
    const atBoundary = direction === 1
      ? current >= SLIDES.length - 1
      : current <= 0
    if (transitioning.current || atBoundary) return
    transitioning.current = true
    setHintsVisible(false)
    const el = slideRef.current
    if (el) {
      gsap.to(el, {
        opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setCurrent(c => c + direction)
          transitioning.current = false
        }
      })
    } else {
      setCurrent(c => c + direction)
      transitioning.current = false
    }
  }, [current])

  const goNext = useCallback(() => navigate(1), [navigate])
  const goPrev = useCallback(() => navigate(-1), [navigate])

  // Keyboard
  useEffect(() => {
    function handleKey(e) {
      if (showShortcuts && e.key !== '?' && e.key !== 'Escape') return
      switch (e.key) {
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case '?':
          setShowShortcuts(s => !s)
          break
        case 'Escape':
          setShowShortcuts(false)
          break
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {})
          } else {
            document.exitFullscreen()
          }
          break
        case ' ':
          e.preventDefault()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, showShortcuts])

  // Track fullscreen state
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  }, [])

  const slide = SLIDES[current]
  const SlideComponent = slide.component
  const progress = ((current + 1) / SLIDES.length) * 100

  // Loading screen
  if (loading) {
    return (
      <div className="mimo-slides-root">
        <div className="loading-screen">
          <div className="loading-content">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="22" fill="#4A85B5" />
              <circle cx="13" cy="22" r="3.5" fill="white" />
              <circle cx="22" cy="22" r="3.5" fill="white" />
              <circle cx="31" cy="22" r="3.5" fill="white" />
            </svg>
            <p className="loading-text">Loading</p>
            <div className="loading-bar">
              <div className="loading-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mimo-slides-root">
      <div className="slideshow" style={{ background: slide.bg }}>
        <div className="slide-wrapper" ref={slideRef}>
          <SlideComponent active={true} />
        </div>

        <div className={`nav-hint nav-hint--left ${!hintsVisible || current === 0 ? 'nav-hint--hidden' : ''}`}>
          <span className="nav-arrow">&#9664;</span>
          <span className="nav-label">prev</span>
        </div>
        <div className={`nav-hint nav-hint--right ${!hintsVisible || current === SLIDES.length - 1 ? 'nav-hint--hidden' : ''}`}>
          <span className="nav-label">next</span>
          <span className="nav-arrow">&#9654;</span>
        </div>

        <div className="slide-counter">
          <span>{current + 1}/{SLIDES.length}</span>
          <div className="counter-tooltip">{slide.title}</div>
        </div>

        <button
          onClick={toggleFullscreen}
          className="fullscreen-btn"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 2 6 6 2 6" />
              <polyline points="10 14 10 10 14 10" />
              <polyline points="14 6 10 6 10 2" />
              <polyline points="2 10 6 10 6 14" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 6 2 2 6 2" />
              <polyline points="14 10 14 14 10 14" />
              <polyline points="10 2 14 2 14 6" />
              <polyline points="6 14 2 14 2 10" />
            </svg>
          )}
        </button>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {showShortcuts && (
          <div className="shortcuts-overlay" onClick={() => setShowShortcuts(false)}>
            <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
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
  )
}
