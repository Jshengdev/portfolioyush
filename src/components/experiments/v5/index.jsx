import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/waves.frag.glsl?raw';

/**
 * V5: Waves Experiment
 *
 * A calming gradient wave shader inspired by:
 * - Calm ocean water
 * - Meditation apps
 * - Zen garden aesthetics
 *
 * Features:
 * - Multiple layered horizontal waves at different frequencies
 * - Very slow, meditative animation pace
 * - Soft pastel color palette (blue, purple, teal)
 * - Mouse-reactive ripple effect
 * - Theme-aware (dark/light mode support)
 */
const WavesExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V5: WAVES"
    />
  );
};

export default WavesExperiment;
