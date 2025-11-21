/**
 * Centralized design system with all design tokens
 * @module theme
 *
 * Usage: Access via styled-components ThemeProvider
 * Example: ${props => props.theme.colors.text.primary}
 *
 * Contains:
 * - colors: Text, background, and accent colors
 * - fonts: Font family definitions
 * - spacing: Layout spacing values
 * - breakpoints: Responsive breakpoints
 * - transitions: Animation timing functions
 */
export const theme = {
  colors: {
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
      muted: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      primary: '#000000',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    accent: {
      glow: 'rgba(255, 255, 255, 0.8)',
    },
  },

  fonts: {
    primary: "'work sans', sans-serif",
    display: "'ade', serif",
  },

  spacing: {
    frame: '20px',
    section: '60px',
    element: '20px',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },

  transitions: {
    standard: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
}
