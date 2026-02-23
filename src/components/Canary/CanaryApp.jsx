import { useEffect, useRef } from 'react'
import './styles/canary.css'
import Nav from './components/sections/Nav'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import HowItWorks from './components/sections/HowItWorks'
import LiveFeed from './components/sections/LiveFeed'
import Invitation from './components/sections/Invitation'
import useCustomCursor from './hooks/useCustomCursor'
import useSpotlight from './hooks/useSpotlight'

export default function CanaryApp() {
  const rootRef = useRef(null)
  const cursorRef = useCustomCursor()
  useSpotlight(rootRef)

  // Neutralize all portfolio global styles for full isolation
  useEffect(() => {
    const prev = {
      bg: document.body.style.backgroundColor,
      overflow: document.body.style.overflow,
      cursor: document.body.style.cursor,
      margin: document.body.style.margin,
      padding: document.body.style.padding,
    }
    document.body.style.backgroundColor = '#0D0F1A'
    document.body.style.overflow = 'auto'
    document.body.style.cursor = 'none'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    return () => {
      document.body.style.backgroundColor = prev.bg
      document.body.style.overflow = prev.overflow
      document.body.style.cursor = prev.cursor
      document.body.style.margin = prev.margin
      document.body.style.padding = prev.padding
    }
  }, [])

  return (
    <div className="canary-root" ref={rootRef}>
      <canvas ref={cursorRef} id="canary-cursor" width="120" height="120" />
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <LiveFeed />
      <Invitation />
    </div>
  )
}
