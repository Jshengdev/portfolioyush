import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const STATS = [
  { label: 'Total Tests', value: 47, delay: 0, color: '#E2E0F0' },
  { label: 'Passed', value: 44, delay: 8, color: '#22C55E' },
  { label: 'Failed', value: 3, delay: 16, color: '#EF4444' },
  { label: 'Coverage', value: 94, delay: 24, color: '#6366F1', suffix: '%' },
]

const STEPS = [
  { label: 'Navigate to login', status: 'pass', start: 40, dur: 25 },
  { label: 'Enter credentials', status: 'pass', start: 65, dur: 20 },
  { label: 'Click submit', status: 'pass', start: 85, dur: 15 },
  { label: 'Verify dashboard', status: 'pass', start: 100, dur: 25 },
  { label: 'Search products', status: 'fail', start: 125, dur: 20 },
]

export default function QAReportScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Dashboard zoom in
  const zoomIn = spring({ frame, fps, config: { damping: 14, stiffness: 80 } })
  const scale = interpolate(zoomIn, [0, 1], [0.9, 1])
  const opacity = interpolate(zoomIn, [0, 1], [0, 1])

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0D0F1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        width: 800,
        background: '#1A1B2E',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 32,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}>
          <div>
            <div style={{ color: '#E2E0F0', fontSize: 20, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, system-ui' }}>
              QA Report — Session #247
            </div>
            <div style={{ color: '#7B7899', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
              AGENT_01 · checkout_flow · 14:32:07
            </div>
          </div>
          <div style={{
            padding: '6px 16px',
            borderRadius: 6,
            background: 'rgba(34,197,94,0.12)',
            color: '#22C55E',
            fontSize: 13,
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
            const countDur = 30
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
                padding: '16px 0',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: stat.color, fontFamily: 'Plus Jakarta Sans' }}>
                  {displayVal}{stat.suffix || ''}
                </div>
                <div style={{ fontSize: 12, color: '#7B7899', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STEPS.map((step, i) => {
            const prog = interpolate(
              frame, [step.start, step.start + step.dur], [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
            const isDone = frame >= step.start + step.dur
            const isActive = frame >= step.start && !isDone
            const barColor = step.status === 'pass' ? '#22C55E' : '#EF4444'
            const dotColor = isDone ? barColor : isActive ? '#F59E0B' : '#2A2B40'

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: dotColor,
                  boxShadow: isActive ? `0 0 8px ${dotColor}` : 'none',
                  flexShrink: 0,
                }} />
                <div style={{
                  flex: 1,
                  height: 4,
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
                  color: isDone ? '#7B7899' : isActive ? '#E2E0F0' : '#4B4869',
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono, monospace',
                  width: 180,
                }}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}
