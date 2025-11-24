import React from 'react';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/liquid.frag.glsl?raw';

/**
 * V4: LIQUID - Metaball-style organic blob experiment
 *
 * Visual Style:
 * - Organic blob shapes that merge and separate like a lava lamp
 * - 5 animated blobs with varying sizes and speeds
 * - Mouse-controlled interactive blob
 * - Blue-pink color gradient with subtle rainbow accents
 *
 * Technical:
 * - Metaball technique: Sum of inverse distances, threshold for surface
 * - John Whitney-inspired harmonic motion (never-repeating animation)
 * - Aspect ratio correction for circular blobs
 * - Theme-responsive background integration
 *
 * Inspiration: Lava lamps, viscous fluids, oil in water
 * Feel: Organic, hypnotic, fluid
 */
const LiquidExperiment = () => {
  return (
    <BaseExperimentShader
      fragmentShader={fragmentShader}
      title="V4: LIQUID"
    />
  );
};

export default LiquidExperiment;
