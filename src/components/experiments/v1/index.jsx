import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/aurora.frag.glsl?raw';

/**
 * V1: Aurora Borealis Experiment
 *
 * Visual Effect:
 * - Flowing horizontal bands resembling northern lights
 * - Green → Cyan → Purple color progression
 * - Very slow, hypnotic curtain-like movement
 * - Subtle mouse interaction influences band shapes
 *
 * Technical Details:
 * - 4 layered bands with wave deformation
 * - Noise-based organic movement
 * - Theme-aware: adapts intensity to dark/light mode
 * - 60fps optimized with minimal GPU overhead
 */
const AuroraExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V1: AURORA"
    />
  );
};

export default AuroraExperiment;
