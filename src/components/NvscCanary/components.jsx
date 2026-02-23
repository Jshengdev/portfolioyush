import { useRef, useEffect } from 'react'

// ─── Bayer Dither ────────────────────────────────────────────────
const BAYER = [
  [0/16, 8/16, 2/16, 10/16],
  [12/16, 4/16, 14/16, 6/16],
  [3/16, 11/16, 1/16, 9/16],
  [15/16, 7/16, 13/16, 5/16],
]

function drawDither(canvas, mx, my) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width, H = canvas.height, D = 5
  ctx.clearRect(0, 0, W, H)
  const cols = Math.ceil(W / D), rows = Math.ceil(H / D)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rawT = r / rows
      const t = rawT * rawT * (3 - 2 * rawT)
      const thr = BAYER[r % 4][c % 4]
      let boost = 0
      if (mx !== undefined && my !== undefined) {
        boost = Math.max(0, 1 - Math.hypot(c * D + D/2 - mx, r * D + D/2 - my) / 150) * 0.6
      }
      const eff = Math.min(1, t + boost)
      if (eff > thr) {
        const alpha = 0.22 * t * Math.min(1, eff * 1.6)
        ctx.fillStyle = `rgba(79,70,229,${alpha.toFixed(3)})`
        ctx.fillRect(c * D, r * D, D - 1, D - 1)
      }
    }
  }
}

export function DitherCanvas({ className = 'dither-bottom' }) {
  const ref = useRef(null)
  const mouse = useRef({})
  const raf = useRef(0)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const resize = () => {
      el.width = el.offsetWidth || window.innerWidth
      el.height = el.offsetHeight || window.innerHeight * 0.62
      drawDither(el, mouse.current.x, mouse.current.y)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  return (
    <canvas
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return
        const r = el.getBoundingClientRect()
        mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
        cancelAnimationFrame(raf.current)
        raf.current = requestAnimationFrame(() => drawDither(el, mouse.current.x, mouse.current.y))
      }}
    />
  )
}

// ─── Shared Components ───────────────────────────────────────────
export function Label({ children, light }) {
  return <div className={`label${light ? ' label--light' : ''}`}>{children}</div>
}

export function NotifCard({ dot, agent, action, sub, badge, type, light }) {
  return (
    <div className={`nc${light ? ' nc--light' : ''}`}>
      <div className={`dot dot-${dot}`} />
      <div className="nc-body">
        <div className={`nc-l1${light ? ' nc-l1--light' : ''}`}>
          <span className={`nc-agent${light ? ' nc-agent--light' : ''}`}>{agent}</span>
          <span className="nc-arrow">→</span>
          <span className={`nc-action${light ? ' nc-action--light' : ''}`}>{action}</span>
        </div>
        {sub && <div className="nc-l2">{sub}</div>}
      </div>
      <div className={`badge badge-${type}`}>[{badge}]</div>
    </div>
  )
}

export function CanaryLogo({ size = 48, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="canary-logo">
      <g clipPath="url(#clip0_logo)">
        <rect width="27" height="100" rx="4" fill={color} />
        <rect x="36.5" width="27" height="100" rx="4" fill={color} />
        <rect x="73" width="27" height="100" rx="4" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_logo">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function ImgPlaceholder({ label, light }) {
  return (
    <div className={`img-ph${light ? ' img-ph--light' : ''}`}>
      <span className="img-ph-icon">🖼</span>
      <span className="img-ph-text">{label}</span>
    </div>
  )
}
