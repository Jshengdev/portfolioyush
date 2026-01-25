/**
 * Dot Matrix Effect Configuration
 *
 * Based on the "Soft Ground" palette from Gradient brand.
 * Adjust these values to change how the effect looks across ALL images.
 */

export const dotMatrixConfig = {
  // Grid settings
  gridSize: 4,           // Size of each dot cell (smaller = more detail)
  canvasSize: 800,       // Default canvas size (max dimension)

  // Brightness thresholds for color banding
  lightThreshold: 240,   // Skip pixels brighter than this
  darkThreshold: 15,     // Skip pixels darker than this
  thresholds: [60, 120, 180], // Brightness bands: [dark, mid1, mid2, light]

  // Color palette - "Soft Ground" from Gradient brand
  palette: {
    dark: '#2E2E2E',     // Charcoal - primary text
    mid1: '#6E6E6E',     // Soft gray - secondary text
    mid2: '#9FB8A0',     // Muted sage green - primary accent
    light: '#D8B4A0',    // Warm clay/skin tone - secondary accent
  },

  // Animation settings
  scanWidth: 60,         // Width of the scan line effect
  scanSpeed: 3,          // Speed of scan line movement
  loadDuration: 120,     // Frames for load-in animation
  loadDelay: 10,         // Delay before load animation starts

  // Shape variation
  // Shapes are selected based on noise: circle (50%), diamond (30%), square (20%)
};

/**
 * Process an image into dot matrix effect
 * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on
 * @param {HTMLImageElement} img - Source image
 * @param {number} canvasWidth - Width of the canvas
 * @param {number} canvasHeight - Height of the canvas (optional, defaults to canvasWidth for square)
 * @param {Object} overrideSettings - Optional settings overrides
 * @param {Object} animationState - Optional animation state { scanX, frameCount }
 */
export function processDotMatrix(ctx, img, canvasWidth, canvasHeight = null, overrideSettings = {}, animationState = undefined) {
  // Support legacy calls with single canvasSize parameter
  if (canvasHeight === null || typeof canvasHeight === 'object') {
    // Old API: processDotMatrix(ctx, img, size, overrideSettings, animationState)
    if (typeof canvasHeight === 'object') {
      animationState = overrideSettings;
      overrideSettings = canvasHeight;
    }
    canvasHeight = canvasWidth;
  }

  const s = { ...dotMatrixConfig, ...overrideSettings };
  const { gridSize, lightThreshold, darkThreshold, thresholds, palette, scanWidth, loadDuration, loadDelay } = s;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Create temp canvas to sample image pixels - use actual dimensions
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvasWidth;
  tempCanvas.height = canvasHeight;
  const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
  if (!tempCtx) return;

  // Draw image to fill the entire canvas (canvas dimensions should match image aspect ratio)
  tempCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  const imageData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight);
  const pixels = imageData.data;

  const useAnimation = animationState !== undefined;
  const adjustedFrameCount = useAnimation ? Math.max(0, (animationState.frameCount ?? 0) - loadDelay) : 0;
  const loadProgress = useAnimation ? Math.min(adjustedFrameCount / loadDuration, 1) : 1;
  const scanX = useAnimation ? animationState.scanX : 0;
  const relativeFrameCount = animationState?.frameCount ?? 0;

  // Deterministic noise function for shape selection (seeded)
  const noise2D = (px, py) => {
    const n = Math.sin(1 + px * 12.9898 + py * 78.233) * 43758.5453;
    return n - Math.floor(n);
  };

  // Flicker hash for load animation
  const flickerHash = (px, py, t) => {
    const n = Math.sin(2 + px * 12.9898 + py * 78.233 + t * 97.393) * 43758.5453;
    return n - Math.floor(n);
  };

  for (let y = 0; y < canvasHeight; y += gridSize) {
    for (let x = 0; x < canvasWidth; x += gridSize) {
      const index = (x + y * canvasWidth) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = pixels[index + 3];

      // Skip transparent pixels
      if (a < 10) continue;

      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // Skip very light or very dark pixels
      if (brightness > lightThreshold || brightness < darkThreshold) continue;

      // Determine color band based on brightness
      let band;
      if (brightness < thresholds[0]) band = 0;
      else if (brightness < thresholds[1]) band = 1;
      else if (brightness < thresholds[2]) band = 2;
      else band = 3;

      // Select color from palette
      let col;
      if (band === 0) col = palette.dark;
      else if (band === 1) col = palette.mid1;
      else if (band === 2) col = palette.mid2;
      else col = palette.light;

      // Load animation - stagger appearance based on position
      if (useAnimation) {
        const appearThreshold = (x + y) / (canvasWidth + canvasHeight);
        if (loadProgress < appearThreshold && flickerHash(x, y, animationState.frameCount) < 0.5) continue;
      }

      const cx = x + gridSize / 2;
      const cy = y + gridSize / 2;

      // Select shape based on deterministic noise
      const baseRand = noise2D(x * 0.12, y * 0.12);
      const baseShape = baseRand < 0.5 ? "circle" : baseRand < 0.8 ? "diamond" : "square";

      // Check if in scan line area
      const inScan = useAnimation && Math.abs(cx - scanX) < scanWidth / 2;

      ctx.fillStyle = col;
      ctx.save();
      ctx.translate(cx, cy);

      if (baseShape === "circle") {
        if (inScan) {
          // Transform to square when scan passes
          ctx.fillRect(-gridSize / 2, -gridSize / 2, gridSize, gridSize);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, gridSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (baseShape === "square") {
        if (inScan) {
          // Rotate when scan passes
          ctx.rotate(relativeFrameCount * 0.08);
          ctx.fillRect(-(gridSize * 0.7) / 2, -(gridSize * 0.7) / 2, gridSize * 0.7, gridSize * 0.7);
        } else {
          ctx.fillRect(-gridSize / 2, -gridSize / 2, gridSize, gridSize);
        }
      } else {
        // Diamond shape
        if (inScan) {
          // Rotate opposite direction when scan passes
          ctx.rotate(-relativeFrameCount * 0.08);
          ctx.fillRect(-gridSize / 2, -gridSize / 2, gridSize, gridSize);
        } else {
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-(gridSize * 0.7) / 2, -(gridSize * 0.7) / 2, gridSize * 0.7, gridSize * 0.7);
        }
      }

      ctx.restore();
    }
  }
}

export default dotMatrixConfig;
