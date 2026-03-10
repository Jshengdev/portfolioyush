import { DitherCanvas, NotifCard, CanaryLogo } from '../components'

export default function S02() {
  return (
    <div className="slide slide-dark">
      <DitherCanvas />
      <div className="slide-center">
        <div className="s01-label">
          <span className="pulse-dot" />
          NVSC 2026 · USC MARSHALL · IOVINE AND YOUNG ACADEMY
        </div>
        <div className="s01-logo"><CanaryLogo size={56} color="#fff" /></div>
        <div className="s01-wordmark">CANARY</div>
        <div className="s01-tagline">QA for Computer-Use AI Agents.</div>
        <p className="s01-sub">
          Johnny Sheng &amp; Teri Shim
        </p>
        <div className="s01-card">
          <NotifCard
            dot="indigo"
            agent="EVAL_001"
            action="agent.capability_assessment.running"
            sub="scoring: task_completion · safety · drift_detection · action_fidelity"
            badge="EVALUATING"
            type="indigo"
          />
        </div>
      </div>
    </div>
  )
}
