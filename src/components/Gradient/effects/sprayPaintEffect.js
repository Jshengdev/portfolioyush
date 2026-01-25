/**
 * Spray Paint / Noise Effect Configuration
 *
 * Adjust these values to change how the effect looks across ALL images.
 * Changes here will apply to every ParticleImageContainer in the app.
 */

export const effectConfig = {
  // Particle density - higher = more particles (affects performance)
  particleDensity: 0.15, // 0.05 (sparse) to 0.3 (dense)

  // Particle size range
  minParticleSize: 1,
  maxParticleSize: 3,

  // Noise settings
  noiseScale: 0.01,      // How "zoomed in" the noise is (smaller = more variation)
  noiseStrength: 2,      // How much particles move from noise

  // Color sampling
  sampleRadius: 2,       // Radius to sample colors from source image
  colorVariation: 15,    // Random color offset (+/- this value for RGB)

  // Animation
  animated: true,        // Whether particles move over time
  animationSpeed: 0.005, // Speed of noise movement

  // Transparency
  minAlpha: 150,         // Minimum particle opacity (0-255)
  maxAlpha: 255,         // Maximum particle opacity (0-255)

  // Spray pattern
  spraySpread: 1.5,      // How spread out the spray effect is

  // Custom color palette (optional - leave empty to use image colors)
  // Add colors in hex format: ['#7A9A7A', '#D8B4A0', '#C4956A']
  colorPalette: [],

  // Blend mode: 'normal', 'multiply', 'screen', 'overlay'
  blendMode: 'normal',
};

/**
 * Creates the p5 sketch function for the spray paint effect
 * @param {HTMLImageElement} sourceImage - The source image to process
 * @param {Object} customConfig - Optional config overrides
 */
export function createSprayPaintSketch(sourceImage, customConfig = {}) {
  const config = { ...effectConfig, ...customConfig };

  return (p) => {
    let particles = [];
    let img;
    let noiseOffset = 0;

    p.preload = () => {
      // Load image if it's a URL string
      if (typeof sourceImage === 'string') {
        img = p.loadImage(sourceImage);
      }
    };

    p.setup = () => {
      // Create canvas matching container size
      const canvas = p.createCanvas(p.width || 400, p.height || 400);
      canvas.style('display', 'block');

      // If image was passed as element, convert to p5 image
      if (sourceImage instanceof HTMLImageElement) {
        img = p.createImage(sourceImage.naturalWidth, sourceImage.naturalHeight);
        img.drawingContext.drawImage(sourceImage, 0, 0);
      }

      // Wait for image to load
      if (img) {
        initParticles();
      }

      p.noStroke();
    };

    function initParticles() {
      particles = [];

      // Calculate number of particles based on density
      const numParticles = Math.floor(
        p.width * p.height * config.particleDensity
      );

      // Scale factors for image sampling
      const scaleX = img.width / p.width;
      const scaleY = img.height / p.height;

      img.loadPixels();

      for (let i = 0; i < numParticles; i++) {
        // Random position
        const x = p.random(p.width);
        const y = p.random(p.height);

        // Sample color from image
        const imgX = Math.floor(x * scaleX);
        const imgY = Math.floor(y * scaleY);
        const idx = (imgY * img.width + imgX) * 4;

        let r = img.pixels[idx] || 0;
        let g = img.pixels[idx + 1] || 0;
        let b = img.pixels[idx + 2] || 0;
        let a = img.pixels[idx + 3] || 255;

        // Skip fully transparent pixels
        if (a < 10) continue;

        // Apply color variation
        if (config.colorPalette.length > 0) {
          // Use custom palette
          const paletteColor = p.random(config.colorPalette);
          const c = p.color(paletteColor);
          r = p.red(c) + p.random(-config.colorVariation, config.colorVariation);
          g = p.green(c) + p.random(-config.colorVariation, config.colorVariation);
          b = p.blue(c) + p.random(-config.colorVariation, config.colorVariation);
        } else {
          // Add random variation to sampled color
          r += p.random(-config.colorVariation, config.colorVariation);
          g += p.random(-config.colorVariation, config.colorVariation);
          b += p.random(-config.colorVariation, config.colorVariation);
        }

        // Clamp values
        r = p.constrain(r, 0, 255);
        g = p.constrain(g, 0, 255);
        b = p.constrain(b, 0, 255);

        particles.push({
          x: x + p.random(-config.spraySpread, config.spraySpread),
          y: y + p.random(-config.spraySpread, config.spraySpread),
          baseX: x,
          baseY: y,
          size: p.random(config.minParticleSize, config.maxParticleSize),
          color: [r, g, b],
          alpha: p.random(config.minAlpha, config.maxAlpha),
          noiseOffsetX: p.random(1000),
          noiseOffsetY: p.random(1000),
        });
      }
    }

    p.draw = () => {
      p.clear();

      // Set blend mode
      switch (config.blendMode) {
        case 'multiply':
          p.blendMode(p.MULTIPLY);
          break;
        case 'screen':
          p.blendMode(p.SCREEN);
          break;
        case 'overlay':
          p.blendMode(p.OVERLAY);
          break;
        default:
          p.blendMode(p.BLEND);
      }

      // Draw particles
      for (const particle of particles) {
        let x = particle.baseX;
        let y = particle.baseY;

        // Apply noise-based movement if animated
        if (config.animated) {
          const noiseX = p.noise(
            particle.noiseOffsetX + noiseOffset,
            particle.noiseOffsetY
          );
          const noiseY = p.noise(
            particle.noiseOffsetX,
            particle.noiseOffsetY + noiseOffset
          );

          x += (noiseX - 0.5) * config.noiseStrength * 10;
          y += (noiseY - 0.5) * config.noiseStrength * 10;
        }

        // Add spray spread
        x += p.random(-config.spraySpread, config.spraySpread) * 0.5;
        y += p.random(-config.spraySpread, config.spraySpread) * 0.5;

        p.fill(
          particle.color[0],
          particle.color[1],
          particle.color[2],
          particle.alpha
        );

        p.ellipse(x, y, particle.size, particle.size);
      }

      // Update noise offset for animation
      if (config.animated) {
        noiseOffset += config.animationSpeed;
      }

      // Reset blend mode
      p.blendMode(p.BLEND);
    };

    // Handle resize
    p.windowResized = () => {
      if (p.canvas && p.canvas.parentElement) {
        const parent = p.canvas.parentElement;
        p.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
        if (img) {
          initParticles();
        }
      }
    };

    // Public method to update config
    p.updateConfig = (newConfig) => {
      Object.assign(config, newConfig);
      if (img) {
        initParticles();
      }
    };

    // Public method to reinitialize with new image
    p.setImage = (newImage) => {
      if (typeof newImage === 'string') {
        p.loadImage(newImage, (loadedImg) => {
          img = loadedImg;
          initParticles();
        });
      } else if (newImage instanceof HTMLImageElement) {
        img = p.createImage(newImage.naturalWidth, newImage.naturalHeight);
        img.drawingContext.drawImage(newImage, 0, 0);
        initParticles();
      }
    };
  };
}

export default effectConfig;
