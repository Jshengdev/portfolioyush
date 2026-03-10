import { interpolate, Easing } from 'remotion'

/**
 * Drop-in replacement for interpolate() that applies cubic ease-in-out
 * per segment instead of linear. For multi-keyframe calls, finds the active
 * segment and applies easing independently so transitions don't snap.
 */
export function smoothInterpolate(frame, inputRange, outputRange, options = {}) {
  const { extrapolateLeft = 'clamp', extrapolateRight = 'clamp', ...rest } = options

  // 2-keyframe: just pass easing directly
  if (inputRange.length === 2) {
    return interpolate(frame, inputRange, outputRange, {
      extrapolateLeft,
      extrapolateRight,
      easing: Easing.inOut(Easing.cubic),
      ...rest,
    })
  }

  // Multi-keyframe: find active segment, apply easing per-segment
  const clamped = Math.max(inputRange[0], Math.min(frame, inputRange[inputRange.length - 1]))

  for (let i = 0; i < inputRange.length - 1; i++) {
    const segStart = inputRange[i]
    const segEnd = inputRange[i + 1]

    if (clamped >= segStart && clamped <= segEnd) {
      // Holding value (same output on both ends) — skip easing
      if (outputRange[i] === outputRange[i + 1]) {
        return outputRange[i]
      }

      const t = segEnd === segStart ? 1 : (clamped - segStart) / (segEnd - segStart)
      const eased = Easing.inOut(Easing.cubic)(t)
      return outputRange[i] + (outputRange[i + 1] - outputRange[i]) * eased
    }
  }

  // Extrapolation fallback
  if (frame <= inputRange[0]) return outputRange[0]
  return outputRange[outputRange.length - 1]
}

/** Shared color tokens */
export const COLORS = {
  bg: '#0D0F1A',
  card: '#1A1B2E',
  text: '#E2E0F0',
  textDim: '#7B7899',
  textMuted: '#4B4869',
  border: 'rgba(255,255,255,0.08)',
  indigo: '#6366F1',
  indigoLight: '#A5B4FC',
  green: '#10B981',
  greenBright: '#22C55E',
  red: '#EF4444',
  amber: '#F59E0B',
}

/** Syntax highlighting token colors */
export const SYNTAX = {
  keyword: '#C084FC',   // purple — import, from, const
  string: '#86EFAC',    // green — string literals
  function: '#93C5FD',  // blue — function calls
  property: '#67E8F9',  // cyan — object properties
  variable: '#FDE68A',  // yellow — variable names
  punctuation: '#7B7899', // dim — brackets, dots, parens
  comment: '#4B4869',   // muted — comments
  command: '#E2E0F0',   // bright — shell commands
  output: '#7B7899',    // dim — terminal output
}
