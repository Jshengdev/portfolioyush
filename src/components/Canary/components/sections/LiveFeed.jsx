import { useCallback } from 'react'
import NotifCard from '../design-system/NotifCard'
import useBayerDither from '../../hooks/useBayerDither'
import useLiveFeedTicker from '../../hooks/useLiveFeedTicker'
import useScrollReveal from '../../hooks/useScrollReveal'
import { STATIC_DITHER_OPTS } from '../../lib/constants'

const initialFeedItems = [
  { id: 'init-1', dot: 'green',  agent: 'AGENT_01', action: 'opened /contracts/Q4_vendor.pdf', detail: '14:32:07 · 89ms · task_match: true', badge: 'OBSERVED', badgeVariant: 'green' },
  { id: 'init-2', dot: 'amber',  agent: 'AGENT_02', action: 'navigated to unexpected domain', detail: '14:32:09 · outside expected path · reviewing', badge: 'FLAGGED', badgeVariant: 'amber' },
  { id: 'init-3', dot: 'green',  agent: 'AGENT_03', action: 'form.submit() on /checkout', detail: '14:32:14 · 142ms · conversion: success', badge: 'OBSERVED', badgeVariant: 'green' },
  { id: 'init-4', dot: 'red',    agent: 'AGENT_02', action: 'attempted policy-restricted file write', detail: '14:32:17 · intervention triggered · team notified', badge: 'BLOCKED', badgeVariant: 'red' },
  { id: 'init-5', dot: 'green',  agent: 'AGENT_01', action: 'task.complete: contract_review_done', detail: '14:33:02 · 7/7 evals passed · score: 98.4', badge: 'COMPLETE', badgeVariant: 'green' },
]

export default function LiveFeed() {
  const canvasRef = useBayerDither(STATIC_DITHER_OPTS)
  const items = useLiveFeedTicker(initialFeedItems)

  const sectionRef = useScrollReveal(useCallback((tl, el) => {
    tl.from(el.querySelector('.feed-grid > div:first-child'), {
      opacity: 0, x: -40, duration: 0.6, ease: 'power2.out',
    })
    tl.from(el.querySelector('.feed-grid > div:last-child'), {
      opacity: 0, x: 40, duration: 0.6, ease: 'power2.out',
    }, '-=0.4')
  }, []))

  return (
    <section id="live" className="section-dark" ref={sectionRef}>
      <canvas ref={canvasRef} className="dither-canvas dither-canvas--75" />
      <div className="section-inner z-elevated">
        <div className="feed-grid">
          <div>
            <span className="section-label">[OBSERVE]</span>
            <h2 className="section-headline">Every agent.<br />Every action.<br />In real time.</h2>
            <p className="section-body">
              Canary surfaces what's actually happening across your entire agent fleet.
              Not API logs. Not text outputs. What the agent did on the computer.
            </p>
            <p className="section-body section-body--spaced">
              Flag anomalies before they compound. Build trust with every deployment.
            </p>
          </div>
          <div>
            <div className="feed-header">
              <div className="feed-dot-live" />
              CANARY · LIVE FEED · 3 AGENTS RUNNING
            </div>
            <div className="feed-stream">
              {items.map((item) => (
                <div className="feed-item" key={item.id}>
                  <NotifCard
                    dot={item.dot}
                    agent={item.agent}
                    action={item.action}
                    detail={item.detail || `${item.timestamp} · canary.observed`}
                    badge={item.badge}
                    badgeVariant={item.badgeVariant}
                    theme="light"
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
