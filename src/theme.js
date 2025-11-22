/**
 * Centralized design system with all design tokens
 * @module theme
 *
 * Usage: Access via ThemeContext or styled-components ThemeProvider
 * Example: ${props => props.theme.colors.text.primary}
 *
 * Contains:
 * - darkTheme: Dark mode color palette
 * - lightTheme: Light mode color palette
 * - sharedTokens: Fonts, spacing, breakpoints, transitions (theme-agnostic)
 */

/**
 * Shared design tokens that remain constant across themes
 * These values don't change between dark and light modes
 */
const sharedTokens = {
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

/**
 * Dark theme color palette
 * Original portfolio design - white text on black backgrounds
 */
export const darkTheme = {
  colors: {
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',      // Highest emphasis text
      secondary: 'rgba(255, 255, 255, 0.7)',    // Body text, most common
      tertiary: 'rgba(255, 255, 255, 0.6)',     // Supporting text
      muted: 'rgba(255, 255, 255, 0.5)',        // Decorative, labels
      emphasis: 'rgba(249, 255, 251, 0.95)',    // Bold text emphasis
      hover: 'rgba(255, 255, 255, 1.0)',        // Hover states
    },
    background: {
      primary: '#000000',                        // Main background
      secondary: 'rgba(255, 255, 255, 0.03)',   // Cards, panels (glass)
      overlay: 'rgba(0, 0, 0, 0.8)',            // Modal overlays
      overlayLight: 'rgba(0, 0, 0, 0.16)',      // Light overlay
    },
    accent: {
      blue: 'rgba(136, 169, 215, 0.5)',         // Primary accent (solutions)
      blueBright: 'rgba(136, 169, 215, 0.47)',  // Frame border
      red: 'rgba(255, 128, 128, 0.5)',          // Problem indicator
      glow: 'rgba(255, 255, 255, 0.8)',         // General glow effects
    },
    border: {
      primary: 'rgba(136, 169, 215, 0.47)',     // Main frame border (blue)
      secondary: 'rgba(255, 255, 255, 0.3)',    // Section dividers
      subtle: 'rgba(255, 255, 255, 0.1)',       // Card borders
    },
    shadow: {
      glow: 'rgba(255, 255, 255, 0.1)',         // White glow effect
      glowStrong: 'rgba(255, 255, 255, 0.3)',   // Stronger white glow
      accentGlow: 'rgba(136, 169, 215, 0.2)',   // Blue accent glow
      accentGlowStrong: 'rgba(153, 190, 255, 0.2)', // Brighter blue glow
      subtle: 'rgba(0, 0, 0, 0.1)',             // Subtle dark shadow
    },
    gradient: {
      overlayStart: 'rgba(0, 0, 0, 0.7)',       // Dark gradient start
      overlayMid: 'rgba(0, 0, 0, 0.4)',         // Dark gradient middle
      overlayEnd: 'rgba(0, 0, 0, 0)',           // Transparent end
    },
  },
  ...sharedTokens,
};

/**
 * Light theme color palette
 * Inverted design - dark text on white backgrounds
 */
export const lightTheme = {
  colors: {
    text: {
      primary: 'rgba(0, 0, 0, 0.9)',            // Highest emphasis text
      secondary: 'rgba(0, 0, 0, 0.8)',          // Body text, most common
      tertiary: 'rgba(0, 0, 0, 0.7)',           // Supporting text
      muted: 'rgba(0, 0, 0, 0.6)',              // Decorative, labels
      emphasis: 'rgba(0, 0, 0, 0.95)',          // Bold text emphasis
      hover: 'rgba(0, 0, 0, 1.0)',              // Hover states
    },
    background: {
      primary: '#FFFFFF',                        // Main background
      secondary: 'rgba(0, 0, 0, 0.05)',         // Cards, panels (glass)
      overlay: 'rgba(255, 255, 255, 0.9)',      // Modal overlays
      overlayLight: 'rgba(255, 255, 255, 0.7)', // Light overlay
    },
    accent: {
      blue: 'rgba(100, 140, 200, 0.6)',         // Primary accent (solutions)
      blueBright: 'rgba(100, 140, 200, 0.5)',   // Frame border
      red: 'rgba(220, 100, 100, 0.6)',          // Problem indicator
      glow: 'rgba(0, 0, 0, 0.8)',               // General glow effects
    },
    border: {
      primary: 'rgba(100, 140, 200, 0.5)',      // Main frame border (blue)
      secondary: 'rgba(0, 0, 0, 0.2)',          // Section dividers
      subtle: 'rgba(0, 0, 0, 0.1)',             // Card borders
    },
    shadow: {
      glow: 'rgba(0, 0, 0, 0.05)',              // Subtle glow effect
      glowStrong: 'rgba(0, 0, 0, 0.1)',         // Stronger glow
      accentGlow: 'rgba(100, 140, 200, 0.15)',  // Blue accent glow
      accentGlowStrong: 'rgba(100, 140, 200, 0.2)', // Brighter blue glow
      subtle: 'rgba(0, 0, 0, 0.05)',            // Subtle shadow
    },
    gradient: {
      overlayStart: 'rgba(0, 0, 0, 0.6)',       // Dark gradient start (for images)
      overlayMid: 'rgba(0, 0, 0, 0.3)',         // Dark gradient middle
      overlayEnd: 'rgba(0, 0, 0, 0)',           // Transparent end
    },
  },
  ...sharedTokens,
};

/**
 * Default theme export (dark mode)
 * Maintained for backward compatibility
 * @deprecated Use darkTheme or lightTheme directly
 */
export const theme = darkTheme;
