// ═══════════════════════════════════════════════════════════════════
// PΕBL ONBOARDING ANIMATIONS
// Framer Motion variants - soft, unhurried, organic
// ═══════════════════════════════════════════════════════════════════

import { TIMING } from './onboardingConfig';

// ═══════════════════════════════════════════════════════════════════
// SCREEN TRANSITION VARIANTS
// ═══════════════════════════════════════════════════════════════════

export const screenVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: TIMING.screenFade / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: TIMING.screenFade / 1000,
      ease: 'easeIn',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// TEXT ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

export const textFadeVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.textFadeIn / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

// Staggered text container
export const staggerContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: TIMING.textStagger / 1000,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

// Individual staggered line
export const staggeredLineVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.textFadeIn / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// GLOW ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

export const glowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.glowFadeIn / 1000,
      ease: 'easeOut',
    },
  },
  breathing: {
    scale: [1, 1.02, 1],
    transition: {
      duration: TIMING.breatheCycle / 1000,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
  enterBreathing: {
    scale: [1, 1.04, 1],
    transition: {
      duration: TIMING.breatheCycleEnter / 1000,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// PORTAL TRANSITION
// ═══════════════════════════════════════════════════════════════════

export const portalFlashVariants = {
  initial: {
    opacity: 0,
  },
  flash: {
    opacity: [0, 0.8, 0],
    transition: {
      duration: TIMING.portalTotal / 1000,
      times: [0, 0.3, 1],
      ease: 'easeInOut',
    },
  },
};

export const portalExpandVariants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  expand: {
    scale: 1.3,
    opacity: 0,
    transition: {
      duration: TIMING.portalExpand / 1000,
      ease: 'easeIn',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// PARTICLE ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

export const particleFadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeIn',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// TAP INDICATOR
// ═══════════════════════════════════════════════════════════════════

export const tapIndicatorVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: [0, 0.6, 0.6, 0],
    scale: [0.8, 1, 1, 0.9],
    transition: {
      duration: 3,
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// RIPPLE DEMO ANIMATION
// ═══════════════════════════════════════════════════════════════════

export const rippleDemoVariants = {
  initial: {
    width: 10,
    height: 10,
    opacity: 0.6,
  },
  animate: {
    width: 160,
    height: 160,
    opacity: 0,
    transition: {
      duration: TIMING.rippleDuration / 1000,
      ease: 'easeOut',
    },
  },
};
