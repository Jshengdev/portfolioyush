import { useCallback } from 'react'
import StepItem from '../design-system/StepItem'
import NotifCard from '../design-system/NotifCard'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function HowItWorks() {
  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    tl.from(el.querySelector('.section-center'), {
      opacity: 0, y: 30, duration: 0.5, ease: 'power2.out',
    })
    tl.from(el.querySelectorAll('.step'), {
      opacity: 0, y: 40, duration: 0.5, stagger: 0.2, ease: 'power2.out',
    }, '-=0.2')

    const line = el.querySelector('.steps-connector')
    if (line) {
      const length = line.getTotalLength()
      tl.fromTo(line,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' },
        '-=0.8'
      )
    }

    tl.from(el.querySelector('.how-example'), {
      opacity: 0, y: 20, duration: 0.4, ease: 'power2.out',
    }, '-=0.3')
  }, []))

  return (
    <section className="section-light" id="how" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-center">
          <span className="section-label">[HOW IT WORKS]</span>
          <h2 className="section-headline">Plug in. Watch everything.</h2>
        </div>

        <div className="steps-row-wrap">
          {/* SVG connector line */}
          <svg className="steps-svg" aria-hidden="true">
            <line className="steps-connector" x1="12.5%" y1="50%" x2="87.5%" y2="50%" />
          </svg>

          <div className="steps-row">
            <StepItem num={1} title="CONNECT SDK" desc={<>One npm install.<br />Three lines of code.</>} code="npm install @canary/sdk" />
            <StepItem num={2} title="AGENT RUNS" desc="Your agent does its work normally. No changes." />
            <StepItem num={3} title="ACTIONS OBSERVED" desc="Every click, file access, and command. Automatically." />
            <StepItem num={4} title="PATTERNS SURFACED" desc="Dashboard, alerts, and cross-agent intelligence." />
          </div>
        </div>

        <div className="how-example">
          <NotifCard dot="green" agent="AGENT_01" action="form.submit() on /checkout" detail="eval: correct · 142ms · task_complete: true · safety: pass" badge="OBSERVED · 142ms" badgeVariant="green" theme="light" />
        </div>
      </div>
    </section>
  )
}
