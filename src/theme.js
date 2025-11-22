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
      emphasis: 'rgba(255, 255, 255, 1)',
      hover: 'rgba(255, 255, 255, 0.9)',
    },
    background: {
      primary: '#000000',
      secondary: 'rgba(20, 20, 20, 0.9)',
      overlay: 'rgba(0, 0, 0, 0.9)',
      overlayLight: 'rgba(20, 20, 20, 0.3)',
    },
    border: {
      primary: 'rgba(136, 169, 215, 0.47)',
      secondary: 'rgba(136, 169, 215, 0.3)',
      subtle: 'rgba(255, 255, 255, 0.1)',
    },
    accent: {
      blue: 'rgba(136, 169, 215, 0.47)',
      blueBright: 'rgba(136, 169, 215, 0.8)',
      red: 'rgba(255, 128, 128, 0.5)',
      glow: 'rgba(255, 255, 255, 0.8)',
    },
    shadow: {
      soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 16px rgba(0, 0, 0, 0.2)',
      strong: '0 8px 32px rgba(0, 0, 0, 0.3)',
      glow: '0 0 20px rgba(136, 169, 215, 0.3)',
    },
    gradient: {
      primary: 'linear-gradient(135deg, rgba(136, 169, 215, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
      overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)',
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
