/**
 * Centralized design system with all design tokens
 * @module theme
 *
 * Usage: Access via ThemeContext or styled-components ThemeProvider
 * Example: ${props => props.theme.colors.text.primary}
 *
 * Contains:
 * - colors: Text, background, and accent colors
 * - fonts: Font family definitions
 * - spacing: Layout spacing values
 * - breakpoints: Responsive breakpoints
 * - transitions: Animation timing functions
 */

// Shared theme properties (fonts, spacing, breakpoints, transitions)
const baseTheme = {
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
};

// Dark theme (original)
export const darkTheme = {
  ...baseTheme,
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
};

// Light theme
export const lightTheme = {
  ...baseTheme,
  colors: {
    text: {
      primary: 'rgba(0, 0, 0, 0.9)',
      secondary: 'rgba(0, 0, 0, 0.7)',
      tertiary: 'rgba(0, 0, 0, 0.6)',
      muted: 'rgba(0, 0, 0, 0.5)',
    },
    background: {
      primary: '#ffffff',
      overlay: 'rgba(255, 255, 255, 0.8)',
    },
    accent: {
      glow: 'rgba(0, 0, 0, 0.8)',
    },
  },
};

// Default theme export (for backwards compatibility)
export const theme = darkTheme;
