// ═══════════════════════════════════════════════════════════════════
// PΕBL ONBOARDING CONFIGURATION
// All constants, timing, colors, and copy in one place
// ═══════════════════════════════════════════════════════════════════

// Screen identifiers
export const SCREENS = {
  SPLASH: 0,       // NEW: Black grain + PEBL logo
  AWAKENING: 1,    // Rock appears with glow
  WELCOME: 2,
  PHILOSOPHY: 3,
  HOW_IT_WORKS: 4,
  ENTER: 5,
};

export const SCREEN_NAMES = ['splash', 'awakening', 'welcome', 'philosophy', 'howItWorks', 'enter'];

// ═══════════════════════════════════════════════════════════════════
// COLORS - PΕBL Brand Palette
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  cream: '#F5F0E8',           // Background
  rose: '#C4A4A4',            // Glow, soft accents
  darkRose: '#A25160',        // Strong accent (ripples)
  sage: '#8B9E7C',            // Secondary accent
  terracotta: '#C9A88E',      // Warm accent
  earth: '#7A6E5D',           // Text color

  // Derived colors for effects
  glowRose: 'rgba(196, 164, 164, 0.4)',
  glowRoseStrong: 'rgba(196, 164, 164, 0.6)',
  particleColor: 'rgba(122, 110, 93, 0.25)',
  rippleColor: 'rgba(162, 81, 96, 0.6)',
};

// ═══════════════════════════════════════════════════════════════════
// TIMING - All in milliseconds
// ═══════════════════════════════════════════════════════════════════

export const TIMING = {
  // Splash screen
  splashDuration: 2500,       // How long splash shows before auto-fade
  splashFadeOut: 1200,        // Fade out duration

  // Screen transitions
  screenFade: 1000,           // Fade between screens (slower = luxe)

  // Rock animations
  glowFadeIn: 2000,           // Initial glow appearance (slower)
  breatheCycle: 5000,         // Normal breathing cycle (slower = calmer)
  breatheCycleEnter: 3500,    // Faster on Enter screen

  // Text animations
  textFadeIn: 1400,           // Single text fade (slower)
  textStagger: 500,           // Delay between staggered lines

  // Effects
  rippleInterval: 3000,       // Auto-ripple on How It Works
  rippleDuration: 1800,       // Single ripple animation
  particleDrift: 25000,       // Particle travel time (slower)

  // Portal transition
  portalFlash: 300,           // Initial glow flash
  portalExpand: 1000,         // Radial expansion
  portalFade: 500,            // Final fade
  portalTotal: 1500,          // Total transition time

  // UI hints
  tapIndicatorDelay: 4000,    // Show tap hint after this (more patience)
};

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  letterSpacing: '0.12em',
  textTransform: 'lowercase',
  sizes: {
    hero: '48px',      // For big branding moments
    large: '36px',
    medium: '32px',
    small: '28px',
    hint: '14px',      // Bigger hint text
  },
  lineHeight: 1.5,
};

// ═══════════════════════════════════════════════════════════════════
// SCREEN CONTENT - Copy for each screen
// ═══════════════════════════════════════════════════════════════════

export const SCREEN_CONTENT = {
  [SCREENS.SPLASH]: {
    // Big PEBL logo on black grain - auto advances
    text: null,
    showLogo: true,
    autoAdvance: true,
  },
  [SCREENS.AWAKENING]: {
    // Rock appears with glow - no text, just visual
    text: null,
  },
  [SCREENS.WELCOME]: {
    text: ['welcome to your pebl'],
    fontSize: TYPOGRAPHY.sizes.large,
  },
  [SCREENS.PHILOSOPHY]: {
    text: ['tap to be present', 'see others who are too'],
    fontSize: TYPOGRAPHY.sizes.medium,
    staggered: true,
  },
  [SCREENS.HOW_IT_WORKS]: {
    text: ['rubbbbb'],
    fontSize: TYPOGRAPHY.sizes.medium,
    showRippleDemo: true,
  },
  [SCREENS.ENTER]: {
    text: ['touch the rock to enter'],
    fontSize: TYPOGRAPHY.sizes.large,
  },
};

// ═══════════════════════════════════════════════════════════════════
// PARTICLE SYSTEM
// ═══════════════════════════════════════════════════════════════════

export const PARTICLES = {
  count: { min: 15, max: 25 },
  size: { min: 2, max: 6 },
  opacity: { min: 0.15, max: 0.4 },
  driftSpeed: { min: 15000, max: 30000 }, // ms for full travel
};

// ═══════════════════════════════════════════════════════════════════
// GLOW SETTINGS
// ═══════════════════════════════════════════════════════════════════

export const GLOW = {
  normal: {
    intensity: 1.0,
    breatheScale: 0.05,  // Scale variation during breath
  },
  enter: {
    intensity: 1.5,
    breatheScale: 0.08,  // More pronounced on Enter
  },
};

// ═══════════════════════════════════════════════════════════════════
// ROCK CLICK DETECTION
// ═══════════════════════════════════════════════════════════════════

export const ROCK_DETECTION = {
  // Approximate rock position (center of screen)
  center: { x: 0.5, y: 0.5 },
  // Radius for click detection (as fraction of screen)
  radius: 0.15,
};
