import { useRef } from 'react'
import DemoPlayer from '../../remotion/DemoPlayer'
import Button from '../design-system/Button'
import useBayerDither from '../../hooks/useBayerDither'
import { HERO_DITHER_OPTS } from '../../lib/constants'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useBayerDither(HERO_DITHER_OPTS, true, sectionRef)

  return (
    <section className="hero" ref={sectionRef}>
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--75" />

      <div className="hero-content">
        <div className="hero-label">
          <span>●</span> THE FUTURE OF AGENTS IS ON DESKTOP
        </div>

        <h1 className="hero-title">
          See what your<br /><em>agents actually do.</em>
        </h1>

        <p className="hero-sub">
          Current eval tools check what agents say.<br />
          Canary watches what they do — every click, file, command.
        </p>

        <DemoPlayer />

        <div className="hero-actions">
          <Button href="#early-access">Request early access →</Button>
          <Button href="#how" variant="ghost">See how it works</Button>
        </div>
      </div>
    </section>
  )
}
