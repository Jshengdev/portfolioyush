import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/bloom.frag.glsl?raw';

/**
 * V3: BLOOM - Light Bloom Experiment
 *
 * Visual effect inspired by camera bokeh and out-of-focus lights.
 *
 * Features:
 * - 6 soft circular glows drifting across the screen
 * - Each glow has different size, color, and speed
 * - Harmonic motion for smooth, non-repeating movement
 * - Glows overlap to create additive brightness
 * - Mouse acts as an interactive light source
 * - Theme-adaptive (works in dark and light mode)
 *
 * Color palette:
 * - Warm orange-gold (primary)
 * - Cool blue (balance)
 * - Pink accent
 * - Light green-yellow sparkle
 * - Soft purple ambient
 * - Soft teal accent
 * - Warm white (mouse)
 */
const BloomExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V3: BLOOM"
    />
  );
};

export default BloomExperiment;
