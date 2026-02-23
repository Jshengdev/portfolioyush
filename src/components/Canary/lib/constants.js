const DITHER_BASE = { colorR: 79, colorG: 70, colorB: 229, dotSize: 5 };

export const HERO_DITHER_OPTS = {
  ...DITHER_BASE,
  maxOpacity: 0.22, direction: 'bottom',
  cursorRadius: 160, cursorBoost: 0.6,
};

export const STATIC_DITHER_OPTS = {
  ...DITHER_BASE,
  maxOpacity: 0.2, direction: 'top',
};

export const CTA_DITHER_OPTS = {
  ...DITHER_BASE,
  maxOpacity: 0.25, direction: 'top',
};

export const FEED_TICK_MS = 2800;

export const CURSOR = {
  SIZE: 120,
  CENTER: 60,
  EASING: 0.18,
  PULSE_SPEED: 0.045,
  PULSE_AMP: 0.18,
  OUTER_FREQ: 0.7,
  OUTER_RADIUS: 22,
  OUTER_VARIANCE: 3,
};
