import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/fog.frag.glsl?raw';

/**
 * V2: Fog/Mist Experiment
 *
 * Layered translucent clouds that drift slowly with depth perception.
 * Features:
 * - Multiple fog layers moving at different speeds (parallax)
 * - Far layers = slow, large shapes
 * - Near layers = faster, finer detail
 * - Mouse creates subtle "parting" effect
 * - Theme-aware coloring (dark/light mode)
 *
 * Inspiration: Morning mist, atmospheric fog, clouds
 * Feel: Calming, mysterious, depth
 */
const FogExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V2: FOG"
    />
  );
};

export default FogExperiment;
