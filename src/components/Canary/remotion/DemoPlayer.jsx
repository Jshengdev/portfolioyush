import { useCallback } from 'react'
import { Player } from '@remotion/player'

export default function DemoPlayer() {
  const lazyComponent = useCallback(
    () => import('./CanaryDemo').then(m => ({ default: m.CanaryDemo })),
    []
  )

  return (
    <div className="demo-player-wrap">
      <Player
        lazyComponent={lazyComponent}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={900}
        fps={30}
        style={{
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        autoPlay
        loop
        clickToPlay
        showVolumeControls={false}
        renderLoading={useCallback(() => (
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            background: '#0D0F1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7B7899',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 14,
          }}>
            loading demo...
          </div>
        ), [])}
      />
    </div>
  )
}
