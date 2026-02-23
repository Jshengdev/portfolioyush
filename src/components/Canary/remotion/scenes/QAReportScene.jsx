import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const STATS = [
  { label: 'Total Tests', value: 47, delay: 0, color: '#E2E0F0' },
  { label: 'Passed', value: 44, delay: 8, color: '#22C55E' },
  { label: 'Failed', value: 3, delay: 16, color: '#EF4444' },
  { label: 'Coverage', value: 94, delay: 24, color: '#6366F1', suffix: '%' },
]

const STEPS = [
  { label: 'Navigate to login', status: 'pass', start: 40, dur: 20 },
  { label: 'Enter credentials', status: 'pass', start: 60, dur: 15 },
  { label: 'Click submit', status: 'pass', start: 75, dur: 12 },
  { label: 'Verify dashboard', status: 'pass', start: 87, dur: 18 },
  { label: 'Search products', status: 'fail', start: 105, dur: 15 },
]

export default function QAReportScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Dashboard zoom in
  const zoomIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } })
  const entryScale = interpolate(zoomIn, [0, 1], [0.9, 1])
  const entryOpacity = interpolate(zoomIn, [0, 1], [0, 1])

  // Camera zoom keyframes:
  // 0-35: overview entry
  // 35-65: zoom into stats row
  // 65-95: ease back slightly
  // 95-130: zoom into failed test step (bottom area)
  // 130-155: hold on failed step
  // 155-179: zoom out for exit
  const camScale = interpolate(
    frame,
    [0, 35, 50, 65, 95, 110, 130, 155, 179],
    [1, 1, 1.3, 1.3, 1, 1.25, 1.25, 1.25, 0.92],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const camY = interpolate(
    frame,
    [0, 35, 50, 65, 95, 110, 130, 155, 179],
    [0, 0, -10, -10, 0, 12, 12, 12, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  const exitOpacity = interpolate(frame, [168, 179], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0F1A' }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${camScale}) translateY(${camY}%)`,
        transformOrigin: 'center center',
        opacity: exitOpacity,
      }}>
        <div style={{
          transform: `scale(${entryScale})`,
          opacity: entryOpacity,
          width: 860,
          background: '#1A1B2E',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 36,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28,
          }}>
            <div>
              <div style={{ color: '#E2E0F0', fontSize: 22, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, system-ui' }}>
                QA Report — Session #247
              </div>
              <div style={{ color: '#7B7899', fontSize: 14, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
                AGENT_01 · checkout_flow · 14:32:07
              </div>
            </div>
            <div style={{
              padding: '8px 18px',
              borderRadius: 6,
              background: 'rgba(34,197,94,0.12)',
              color: '#22C55E',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              PASSED
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {STATS.map((stat, i) => {
              const enter = spring({
                frame: frame - stat.delay,
                fps,
                config: { damping: 12, stiffness: 100 },
              })
              const s = interpolate(enter, [0, 1], [0.5, 1])
              const o = interpolate(enter, [0, 1], [0, 1])

              // Count up
              const countStart = stat.delay + 10
              const countDur = 25
              const displayVal = Math.round(interpolate(
                frame,
                [countStart, countStart + countDur],
                [0, stat.value],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ))

              return (
                <div key={i} style={{
                  transform: `scale(${s})`,
                  opacity: o,
                  textAlign: 'center',
                  padding: '18px 0',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 8,
                }}>
                  <div style={{ fontSize: 40, fontWeight: 700, color: stat.color, fontFamily: 'Plus Jakarta Sans' }}>
                    {displayVal}{stat.suffix || ''}
                  </div>
                  <div style={{ fontSize: 13, color: '#7B7899', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STEPS.map((step, i) => {
              const prog = interpolate(
                frame, [step.start, step.start + step.dur], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )
              const isDone = frame >= step.start + step.dur
              const isActive = frame >= step.start && !isDone
              const barColor = step.status === 'pass' ? '#22C55E' : '#EF4444'
              const dotColor = isDone ? barColor : isActive ? '#F59E0B' : '#2A2B40'

              // Highlight failed step
              const isFailed = step.status === 'fail'
              const failGlow = isFailed && isDone
                ? interpolate(Math.sin(frame * 0.12), [-1, 1], [0.15, 0.35])
                : 0

              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: failGlow > 0 ? `rgba(239,68,68,${failGlow * 0.3})` : 'transparent',
                  border: failGlow > 0 ? `1px solid rgba(239,68,68,${failGlow})` : '1px solid transparent',
                }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: dotColor,
                    boxShadow: isActive ? `0 0 10px ${dotColor}` : isDone && isFailed ? `0 0 8px ${barColor}` : 'none',
                    flexShrink: 0,
                  }} />
                  <div style={{
                    flex: 1,
                    height: 5,
                    background: '#2A2B40',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${prog * 100}%`,
                      height: '100%',
                      background: barColor,
                      borderRadius: 2,
                    }} />
                  </div>
                  <span style={{
                    color: isDone ? (isFailed ? '#EF4444' : '#7B7899') : isActive ? '#E2E0F0' : '#4B4869',
                    fontSize: 14,
                    fontWeight: isFailed && isDone ? 600 : 400,
                    fontFamily: 'JetBrains Mono, monospace',
                    width: 200,
                  }}>
                    {step.label}
                    {isFailed && isDone && ' ✗'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
