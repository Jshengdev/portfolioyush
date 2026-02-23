import { useRef, useCallback, useEffect, useState } from 'react'
import NotifCard from '../design-system/NotifCard'
import useBayerDither from '../../hooks/useBayerDither'
import { STATIC_DITHER_OPTS } from '../../lib/constants'
import useScrollReveal from '../../hooks/useScrollReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CODE_LINES = [
  '// npm install @canary/sdk',
  "import canary from '@canary/sdk'",
  "canary.connect(myAgent, { apiKey: 'ck_...' })",
]

const NOTIF_DATA = [
  { dot: 'green', agent: 'AGENT_01', action: 'opened /contracts/Q4_vendor.pdf', detail: '14:32:07 · eval: on_task · 89ms', badge: 'OBSERVED', badgeVariant: 'green' },
  { dot: 'green', agent: 'AGENT_01', action: 'input.fill on #compose_message', detail: '14:32:09 · eval: safe_content · no PII', badge: 'OBSERVED', badgeVariant: 'green' },
  { dot: 'red', agent: 'AGENT_02', action: 'attempted policy-restricted file write', detail: '14:32:17 · intervention triggered', badge: 'BLOCKED', badgeVariant: 'red' },
]

export default function Solution() {
  const canvasRef = useBayerDither(STATIC_DITHER_OPTS)
  const codeRef = useRef(null)
  const notifsRef = useRef(null)
  const [codeText, setCodeText] = useState('')
  const [visibleNotifs, setVisibleNotifs] = useState(0)

  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    // Fade in the text content
    tl.from(el.querySelector('.z-elevated:first-child'), {
      opacity: 0, y: 40, duration: 0.6, ease: 'power2.out',
    })
  }, []))

  // Typing + notification orchestration triggered by scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const codeEl = codeRef.current
    if (!codeEl) return

    let typingInterval = null
    const fullText = CODE_LINES.join('\n')
    let charIndex = 0

    const st = ScrollTrigger.create({
      trigger: codeEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        typingInterval = setInterval(() => {
          charIndex++
          setCodeText(fullText.substring(0, charIndex))

          // Show notifications at line boundaries
          const typed = fullText.substring(0, charIndex)
          const lineCount = typed.split('\n').length
          setVisibleNotifs(Math.min(lineCount, NOTIF_DATA.length))

          if (charIndex >= fullText.length) {
            clearInterval(typingInterval)
          }
        }, 35)
      },
    })

    return () => {
      if (typingInterval) clearInterval(typingInterval)
      st.kill()
    }
  }, [sectionRef])

  return (
    <section id="solution" className="section-dark" ref={sectionRef}>
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--70" />
      <div className="section-inner">
        <div className="solution-grid">
          <div className="z-elevated">
            <span className="section-label">{'{SOLUTION}'}</span>
            <h2 className="section-headline">One line of code.<br />Every action traced.</h2>
            <p className="section-body">
              Canary automatically observes every computer-use action, scores it against your
              requirements, and surfaces patterns across all your agents.
            </p>
            <div className="solution-code" ref={codeRef}>
              {codeText || '\u00A0'}
              {codeText.length < CODE_LINES.join('\n').length && codeText.length > 0 && (
                <span className="typing-cursor">|</span>
              )}
            </div>
          </div>
          <div className="z-elevated" ref={notifsRef}>
            <div className="solution-notifs">
              {NOTIF_DATA.slice(0, visibleNotifs).map((item, i) => (
                <div className="solution-notif-item" key={i}>
                  <NotifCard
                    dot={item.dot}
                    agent={item.agent}
                    action={item.action}
                    detail={item.detail}
                    badge={item.badge}
                    badgeVariant={item.badgeVariant}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
