import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * ShaderControls - Draggable panel for real-time shader uniform adjustments
 *
 * Features:
 * - Collapsible accordion sections by category
 * - Draggable positioning
 * - Preset system (Cinematic, Retro, Clean, Experimental)
 * - Copy values as JSON
 * - Reset per-category and global
 * - Real-time uniform updates
 * - Theme-aware styling
 */

//=============================================================================
// CONFIGURATION - Shader Parameters
//=============================================================================

const SHADER_PARAMS = [
  // FOG & ATMOSPHERE
  {
    name: 'u_fogDensity',
    label: 'Fog Density',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.65,
    category: 'FOG & ATMOSPHERE',
    description: 'How much fog patches affect overall color'
  },
  {
    name: 'u_noiseScale',
    label: 'Noise Scale',
    min: 0.1,
    max: 3,
    step: 0.1,
    default: 1.2,
    category: 'FOG & ATMOSPHERE',
    description: 'Scale of fog patches (larger = bigger patches)'
  },
  {
    name: 'u_fogPatchStrength',
    label: 'Patch Strength',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.4,
    category: 'FOG & ATMOSPHERE',
    description: 'Visibility of thick/thin fog patches'
  },
  {
    name: 'u_depthLayers',
    label: 'Depth Layers',
    min: 1,
    max: 5,
    step: 1,
    default: 2,
    category: 'FOG & ATMOSPHERE',
    description: 'Number of fog depth layers (parallax)'
  },

  // FILM GRAIN
  {
    name: 'u_grainIntensity',
    label: 'Grain Intensity',
    min: 0,
    max: 0.3,
    step: 0.01,
    default: 0.1,
    category: 'FILM GRAIN',
    description: 'Strength of film grain effect'
  },
  {
    name: 'u_grainScale',
    label: 'Grain Scale',
    min: 1000,
    max: 10000,
    step: 100,
    default: 5000,
    category: 'FILM GRAIN',
    description: 'Grain particle size (higher = finer)'
  },

  // VOLUMETRIC GRAIN (NEW - grain lives IN the fog)
  {
    name: 'u_grainDepthEnabled',
    label: 'Volumetric Mode',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0,
    category: 'VOLUMETRIC GRAIN',
    description: '0=flat screen grain, 1=grain embedded in fog'
  },
  {
    name: 'u_grainFogBinding',
    label: 'Fog Binding',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.8,
    category: 'VOLUMETRIC GRAIN',
    description: 'How much grain follows fog density (0=everywhere, 1=only in dense fog)'
  },
  {
    name: 'u_grainLightFalloff',
    label: 'Light Falloff',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    category: 'VOLUMETRIC GRAIN',
    description: 'Grain fades in bright light (like real particles)'
  },
  {
    name: 'u_grainLayerVariation',
    label: 'Layer Variation',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.6,
    category: 'VOLUMETRIC GRAIN',
    description: 'Different grain patterns at different depths'
  },
  {
    name: 'u_grainParticleSize',
    label: 'Particle Size',
    min: 0.5,
    max: 3,
    step: 0.1,
    default: 1.5,
    category: 'VOLUMETRIC GRAIN',
    description: 'Size of grain particles in the fog volume'
  },

  // DEPTH GRAIN SIZE (per-layer grain sizing)
  {
    name: 'u_grainSizeFront',
    label: 'Front Grain Size',
    min: 0.5,
    max: 4,
    step: 0.1,
    default: 2.0,
    category: 'DEPTH GRAIN SIZE',
    description: 'Grain size for nearest fog layer (larger = bigger particles)'
  },
  {
    name: 'u_grainSizeBack',
    label: 'Back Grain Size',
    min: 0.2,
    max: 2,
    step: 0.1,
    default: 0.5,
    category: 'DEPTH GRAIN SIZE',
    description: 'Grain size for farthest fog layer (smaller = finer particles)'
  },
  {
    name: 'u_grainSizeVariation',
    label: 'Size Variation',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.7,
    category: 'DEPTH GRAIN SIZE',
    description: 'How much grain size changes between layers (0=uniform, 1=max variation)'
  },

  // GRAIN CLUSTERING (organic clumping)
  {
    name: 'u_grainClustering',
    label: 'Cluster Strength',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.3,
    category: 'GRAIN CLUSTERING',
    description: 'How much grain particles clump together (0=random, 1=highly clustered)'
  },
  {
    name: 'u_grainClusterSize',
    label: 'Cluster Scale',
    min: 1,
    max: 10,
    step: 0.5,
    default: 3,
    category: 'GRAIN CLUSTERING',
    description: 'Size of grain cluster regions (larger = bigger clumps)'
  },

  // DEPTH FOG CONTROL
  {
    name: 'u_fogLayerSeparation',
    label: 'Layer Separation',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    category: 'DEPTH FOG',
    description: 'Visual separation between depth layers (higher = more distinct layers)'
  },
  {
    name: 'u_fogFrontOpacity',
    label: 'Front Opacity',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.8,
    category: 'DEPTH FOG',
    description: 'Opacity of nearest fog layer (0=transparent, 1=opaque)'
  },
  {
    name: 'u_fogBackOpacity',
    label: 'Back Opacity',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.4,
    category: 'DEPTH FOG',
    description: 'Opacity of farthest fog layer (0=transparent, 1=opaque)'
  },

  // LIGHT & DIFFUSION
  {
    name: 'u_lightRadius',
    label: 'Light Radius',
    min: 0.3,
    max: 3,
    step: 0.1,
    default: 1.2,
    category: 'LIGHT & DIFFUSION',
    description: 'Width of light spread'
  },
  {
    name: 'u_lightSoftness',
    label: 'Light Softness',
    min: 0.5,
    max: 15,
    step: 0.1,
    default: 7.2,
    category: 'LIGHT & DIFFUSION',
    description: 'Softness of light falloff (higher = softer)'
  },

  // CINEMATIC LIGHTING
  {
    name: 'u_lightWarmth',
    label: 'Light Warmth',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.3,
    category: 'CINEMATIC LIGHTING',
    description: 'Warm yellow/orange tint in lit areas (0=neutral, 1=very warm)'
  },
  {
    name: 'u_shadowCoolness',
    label: 'Shadow Coolness',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.2,
    category: 'CINEMATIC LIGHTING',
    description: 'Cool blue tint in shadow areas (0=neutral, 1=very cool)'
  },
  {
    name: 'u_lightContrast',
    label: 'Light Contrast',
    min: 0.5,
    max: 2,
    step: 0.1,
    default: 1.2,
    category: 'CINEMATIC LIGHTING',
    description: 'Contrast between light and shadow areas (1=normal, >1=higher contrast)'
  },

  // VIGNETTE
  {
    name: 'u_vignetteStrength',
    label: 'Vignette Strength',
    min: 0,
    max: 2,
    step: 0.1,
    default: 1.0,
    category: 'VIGNETTE',
    description: 'Darkness of edge vignette'
  },
  {
    name: 'u_vignetteSize',
    label: 'Vignette Size',
    min: 0.1,
    max: 2,
    step: 0.1,
    default: 1.3,
    category: 'VIGNETTE',
    description: 'Size of vignette area'
  },

  // COLOR GRADING
  {
    name: 'u_colorNoiseAmount',
    label: 'Color Noise',
    min: 0,
    max: 0.1,
    step: 0.001,
    default: 0.025,
    category: 'COLOR GRADING',
    description: 'Subtle color variation for organic feel'
  },
  {
    name: 'u_breathAmount',
    label: 'Breath Amount',
    min: 0,
    max: 0.05,
    step: 0.001,
    default: 0.015,
    category: 'COLOR GRADING',
    description: 'Breathing/pulsing effect intensity'
  },
  {
    name: 'u_breathSpeed',
    label: 'Breath Speed',
    min: 0.1,
    max: 1,
    step: 0.05,
    default: 0.25,
    category: 'COLOR GRADING',
    description: 'Speed of breathing animation'
  },

  // HALFTONE
  {
    name: 'u_halftoneEnabled',
    label: 'Halftone Enabled',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    category: 'HALFTONE',
    description: 'Enable halftone dot pattern effect'
  },
  {
    name: 'u_halftoneScale',
    label: 'Dot Size',
    min: 2,
    max: 50,
    step: 1,
    default: 20,
    category: 'HALFTONE',
    description: 'Number of halftone dots per unit'
  },
  {
    name: 'u_halftoneAngle',
    label: 'Dot Angle',
    min: 0,
    max: 90,
    step: 5,
    default: 45,
    category: 'HALFTONE',
    description: 'Rotation angle of dot pattern (degrees)'
  },
  {
    name: 'u_halftoneContrast',
    label: 'Dot Contrast',
    min: 0.5,
    max: 2,
    step: 0.1,
    default: 1.0,
    category: 'HALFTONE',
    description: 'Contrast boost for halftone effect'
  },

  // DITHERING
  {
    name: 'u_ditherEnabled',
    label: 'Dither Enabled',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    category: 'DITHERING',
    description: 'Enable ordered dithering effect'
  },
  {
    name: 'u_ditherScale',
    label: 'Dither Scale',
    min: 1,
    max: 8,
    step: 1,
    default: 4,
    category: 'DITHERING',
    description: 'Pixel size of dither pattern'
  },
  {
    name: 'u_ditherIntensity',
    label: 'Dither Intensity',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    category: 'DITHERING',
    description: 'Strength of dither effect'
  },

  // CHROMATIC ABERRATION
  {
    name: 'u_chromaticEnabled',
    label: 'Aberration Enabled',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    category: 'CHROMATIC ABERRATION',
    description: 'Enable RGB color separation'
  },
  {
    name: 'u_chromaticStrength',
    label: 'Aberration Strength',
    min: 0,
    max: 0.02,
    step: 0.001,
    default: 0.005,
    category: 'CHROMATIC ABERRATION',
    description: 'Amount of color channel separation'
  },

  // ENHANCED VIGNETTE
  {
    name: 'u_vignetteRadius',
    label: 'Vignette Radius',
    min: 0.3,
    max: 1.5,
    step: 0.1,
    default: 0.8,
    category: 'VIGNETTE',
    description: 'Inner radius of vignette effect'
  },
  {
    name: 'u_vignetteSoftness',
    label: 'Vignette Softness',
    min: 0.1,
    max: 1,
    step: 0.1,
    default: 0.5,
    category: 'VIGNETTE',
    description: 'Edge softness of vignette'
  },

  // COLOR GRADING (ADVANCED)
  {
    name: 'u_contrast',
    label: 'Contrast',
    min: 0.5,
    max: 2,
    step: 0.1,
    default: 1.0,
    category: 'COLOR GRADING',
    description: 'Overall image contrast'
  },
  {
    name: 'u_saturation',
    label: 'Saturation',
    min: 0,
    max: 2,
    step: 0.1,
    default: 1.0,
    category: 'COLOR GRADING',
    description: 'Color saturation level'
  },
  {
    name: 'u_colorTemperature',
    label: 'Color Temperature',
    min: -1,
    max: 1,
    step: 0.1,
    default: 0,
    category: 'COLOR GRADING',
    description: 'Cool (blue) to warm (orange) shift'
  },
  {
    name: 'u_exposure',
    label: 'Exposure',
    min: -2,
    max: 2,
    step: 0.1,
    default: 0,
    category: 'COLOR GRADING',
    description: 'Overall brightness adjustment'
  },

  // SCANLINES
  {
    name: 'u_scanlinesEnabled',
    label: 'Scanlines Enabled',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    category: 'SCANLINES',
    description: 'Enable CRT-style scanline effect'
  },
  {
    name: 'u_scanlinesIntensity',
    label: 'Scanline Intensity',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.3,
    category: 'SCANLINES',
    description: 'Darkness of scanline pattern'
  },
  {
    name: 'u_scanlinesCount',
    label: 'Scanline Count',
    min: 100,
    max: 800,
    step: 50,
    default: 400,
    category: 'SCANLINES',
    description: 'Number of horizontal scanlines'
  },

  // BLOOM
  {
    name: 'u_bloomEnabled',
    label: 'Bloom Enabled',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    category: 'BLOOM',
    description: 'Enable bloom/glow effect'
  },
  {
    name: 'u_bloomThreshold',
    label: 'Bloom Threshold',
    min: 0.3,
    max: 1,
    step: 0.05,
    default: 0.7,
    category: 'BLOOM',
    description: 'Brightness level where bloom starts'
  },
  {
    name: 'u_bloomIntensity',
    label: 'Bloom Intensity',
    min: 0,
    max: 2,
    step: 0.1,
    default: 0.5,
    category: 'BLOOM',
    description: 'Strength of bloom effect'
  },
  {
    name: 'u_bloomRadius',
    label: 'Bloom Radius',
    min: 0.001,
    max: 0.02,
    step: 0.001,
    default: 0.005,
    category: 'BLOOM',
    description: 'Size of bloom spread'
  },

  // PARTICLE DISTRIBUTION (randomness controls)
  {
    name: 'u_grainRandomness',
    label: 'Grain Randomness',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    category: 'PARTICLE DISTRIBUTION',
    description: '0=uniform grid pattern, 1=fully scattered random positions'
  },
  {
    name: 'u_grainJitter',
    label: 'Grain Jitter',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.3,
    category: 'PARTICLE DISTRIBUTION',
    description: 'Position jitter within grid cells (organic displacement)'
  },
  {
    name: 'u_particleScatter',
    label: 'Particle Scatter',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.2,
    category: 'PARTICLE DISTRIBUTION',
    description: 'Overall scatter/dispersion of all particles'
  },
  {
    name: 'u_halftoneRandomness',
    label: 'Halftone Randomness',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.0,
    category: 'PARTICLE DISTRIBUTION',
    description: '0=perfect grid dots, 1=scattered organic dots'
  },
  {
    name: 'u_halftoneJitter',
    label: 'Halftone Size Jitter',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.0,
    category: 'PARTICLE DISTRIBUTION',
    description: 'Variation in dot sizes (print imperfection look)'
  },

  // PATTERN OVERLAY (texture effects)
  {
    name: 'u_patternMode',
    label: 'Pattern Mode',
    min: 0,
    max: 4,
    step: 1,
    default: 0,
    category: 'PATTERN OVERLAY',
    description: '0=Off, 1=Glitch Blocks, 2=Crosses, 3=Shape Halftone, 4=Contours'
  },
  {
    name: 'u_patternIntensity',
    label: 'Pattern Intensity',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0,
    category: 'PATTERN OVERLAY',
    description: 'Overall visibility of the pattern effect'
  },
  {
    name: 'u_patternScale',
    label: 'Pattern Scale',
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    category: 'PATTERN OVERLAY',
    description: 'Size/density of the pattern'
  },
  {
    name: 'u_patternThreshold',
    label: 'Luminance Threshold',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    category: 'PATTERN OVERLAY',
    description: 'Patterns appear above this brightness level'
  },
  {
    name: 'u_glitchBlockSize',
    label: 'Glitch Block Size',
    min: 2,
    max: 50,
    step: 1,
    default: 20,
    category: 'PATTERN OVERLAY',
    description: 'Size of pixelated glitch blocks (Mode 1)'
  },
  {
    name: 'u_glitchChance',
    label: 'Glitch Probability',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.3,
    category: 'PATTERN OVERLAY',
    description: 'Chance of glitch appearing in each block (Mode 1)'
  },
  {
    name: 'u_crossSize',
    label: 'Cross Size',
    min: 0.5,
    max: 5,
    step: 0.1,
    default: 1.5,
    category: 'PATTERN OVERLAY',
    description: 'Size of X marks (Mode 2)'
  },
  {
    name: 'u_crossDensity',
    label: 'Cross Density',
    min: 10,
    max: 200,
    step: 5,
    default: 50,
    category: 'PATTERN OVERLAY',
    description: 'Number of crosses across screen (Mode 2)'
  },
  {
    name: 'u_contourCount',
    label: 'Contour Lines',
    min: 5,
    max: 100,
    step: 1,
    default: 30,
    category: 'PATTERN OVERLAY',
    description: 'Number of topographic contour lines (Mode 4)'
  },
  {
    name: 'u_contourWidth',
    label: 'Contour Thickness',
    min: 0.01,
    max: 0.3,
    step: 0.01,
    default: 0.08,
    category: 'PATTERN OVERLAY',
    description: 'Line thickness for contours (Mode 4)'
  },
  {
    name: 'u_shapeType',
    label: 'Halftone Shape',
    min: 0,
    max: 3,
    step: 0.1,
    default: 0,
    category: 'PATTERN OVERLAY',
    description: '0=Circle, 1=Square, 2=Diamond, 3=Cross (Mode 3)'
  },
];

// Helper to get all default values
const getDefaultValues = () => {
  const defaults = {};
  SHADER_PARAMS.forEach(param => {
    defaults[param.name] = param.default;
  });
  return defaults;
};

// PRESETS - Different cinematic looks
const PRESETS = {
  cinematic: {
    label: 'Cinematic',
    description: 'Soft, filmic atmosphere (default)',
    values: {
      ...getDefaultValues(),
      // Override specific values
      u_fogDensity: 0.65,
      u_grainIntensity: 0.1,
      u_noiseScale: 1.2,
      u_lightSoftness: 7.2,
    }
  },
  retro: {
    label: 'Retro',
    description: 'Heavy grain + scanlines',
    values: {
      ...getDefaultValues(),
      u_fogDensity: 0.75,
      u_grainIntensity: 0.2,
      u_noiseScale: 0.8,
      u_lightSoftness: 5.0,
      u_vignetteStrength: 1.8,
      u_scanlinesEnabled: 1,
      u_scanlinesIntensity: 0.4,
      u_scanlinesCount: 400,
      u_halftoneEnabled: 1,
      u_halftoneScale: 30,
    }
  },
  clean: {
    label: 'Clean',
    description: 'Minimal effects, soft light',
    values: {
      ...getDefaultValues(),
      u_fogDensity: 0.5,
      u_grainIntensity: 0.03,
      u_noiseScale: 1.5,
      u_lightSoftness: 10.0,
      u_vignetteStrength: 0.5,
      u_exposure: 0.2,
    }
  },
  experimental: {
    label: 'Glitch',
    description: 'All effects maxed',
    values: {
      ...getDefaultValues(),
      u_fogDensity: 0.85,
      u_grainIntensity: 0.15,
      u_depthLayers: 5,
      u_chromaticEnabled: 1,
      u_chromaticStrength: 0.01,
      u_ditherEnabled: 1,
      u_ditherIntensity: 0.8,
      u_bloomEnabled: 1,
      u_bloomIntensity: 1.2,
      u_contrast: 1.5,
      u_saturation: 0.5,
    }
  },
};

// Group parameters by category
const CATEGORIES = [...new Set(SHADER_PARAMS.map(p => p.category))];

//=============================================================================
// STYLED COMPONENTS
//=============================================================================

const ControlsOverlay = styled.div`
  position: fixed;
  top: ${props => props.$position.y}px;
  left: ${props => props.$position.x}px;
  z-index: 200;
  font-family: ${props => props.theme.fonts.primary};
  user-select: none;
  pointer-events: auto;
  cursor: ${props => props.$isDragging ? 'grabbing' : 'auto'};
`;

const Panel = styled.div`
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 4px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 320px;
  max-width: 360px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  padding: 12px 16px;
  background: ${props => props.theme.colors.background.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Title = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.muted};
  cursor: pointer;
  padding: 4px 6px;
  font-size: 12px;
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    color: ${props => props.theme.colors.text.hover};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  padding: 0;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border.subtle};
    border-radius: 3px;
  }
`;

const PresetSection = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

const PresetButton = styled.button`
  background: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.secondary};
  padding: 6px 10px;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: ${props => props.theme.transitions.standard};
  border-radius: 2px;

  &:hover {
    background: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CategorySection = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryHeader = styled.div`
  padding: 10px 16px;
  background: ${props => props.$isExpanded
    ? props.theme.colors.background.secondary
    : 'transparent'};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.hover};
  }
`;

const CategoryContent = styled.div`
  max-height: ${props => props.$isExpanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => props.$isExpanded ? '12px 16px' : '0 16px'};
`;

const SliderGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.tertiary};
  font-size: 11px;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-size: 10px;
  font-family: 'Courier New', monospace;
  padding: 2px 6px;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 2px;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${props => props.theme.colors.background.secondary};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent.blue};
    cursor: pointer;
    transition: ${props => props.theme.transitions.standard};

    &:hover {
      background: ${props => props.theme.colors.accent.blueBright};
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent.blue};
    cursor: pointer;
    border: none;
    transition: ${props => props.theme.transitions.standard};

    &:hover {
      background: ${props => props.theme.colors.accent.blueBright};
      transform: scale(1.1);
    }
  }
`;

const Description = styled.div`
  color: ${props => props.theme.colors.text.muted};
  font-size: 9px;
  margin-top: 2px;
  line-height: 1.3;
`;

const Footer = styled.div`
  padding: 10px 16px;
  background: ${props => props.theme.colors.background.secondary};
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
  display: flex;
  gap: 8px;
`;

const FooterButton = styled.button`
  flex: 1;
  background: ${props => props.$primary
    ? props.theme.colors.accent.blue
    : 'transparent'};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.$primary
    ? props.theme.colors.text.primary
    : props.theme.colors.text.secondary};
  padding: 6px 12px;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: ${props => props.theme.transitions.standard};
  border-radius: 2px;
  font-family: ${props => props.theme.fonts.primary};

  &:hover {
    background: ${props => props.$primary
      ? props.theme.colors.accent.blueBright
      : props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NotificationToast = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.accent.blue};
  color: ${props => props.theme.colors.text.primary};
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 11px;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 300;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? 0 : '20px'});
  transition: all 0.3s ease;
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
`;

//=============================================================================
// COMPONENT
//=============================================================================

const ShaderControls = ({ uniforms, onUpdate, visible, onClose }) => {
  const { theme } = useContext(ThemeContext);

  // Local state for uniform values
  const [values, setValues] = useState(() => {
    const initial = {};
    SHADER_PARAMS.forEach(param => {
      initial[param.name] = param.default;
    });
    return initial;
  });

  // UI state
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Start with first category expanded
    return { [CATEGORIES[0]]: true };
  });
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [notification, setNotification] = useState({ visible: false, message: '' });

  // Show notification toast
  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 2000);
  };

  // Handle slider change
  const handleChange = (name, value) => {
    const numValue = parseFloat(value);
    setValues(prev => ({ ...prev, [name]: numValue }));

    // Update shader uniform if callback provided
    if (onUpdate) {
      onUpdate(name, numValue);
    }
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Apply preset
  const applyPreset = (presetName) => {
    const preset = PRESETS[presetName];
    if (!preset) return;

    setValues(preset.values);

    // Update all shader uniforms
    if (onUpdate) {
      Object.entries(preset.values).forEach(([name, value]) => {
        onUpdate(name, value);
      });
    }

    showNotification(`Preset "${preset.label}" applied`);
  };

  // Reset all to defaults
  const resetAll = () => {
    const defaults = {};
    SHADER_PARAMS.forEach(param => {
      defaults[param.name] = param.default;
    });
    setValues(defaults);

    // Update all shader uniforms
    if (onUpdate) {
      Object.entries(defaults).forEach(([name, value]) => {
        onUpdate(name, value);
      });
    }

    showNotification('All parameters reset to defaults');
  };

  // Copy current values as JSON
  const copyJSON = () => {
    const json = JSON.stringify(values, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      showNotification('Values copied to clipboard');
    }).catch(() => {
      showNotification('Failed to copy');
    });
  };

  // Dragging logic
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 360, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Don't render if not visible
  if (!visible) return null;

  return (
    <>
      <ControlsOverlay
        $position={position}
        $isDragging={isDragging}
        theme={theme}
      >
        <Panel theme={theme}>
          <Header theme={theme} onMouseDown={handleMouseDown}>
            <Title theme={theme}>Shader Controls</Title>
            <HeaderButtons>
              <IconButton theme={theme} onClick={copyJSON} title="Copy JSON">
                📋
              </IconButton>
              <IconButton theme={theme} onClick={onClose} title="Close">
                ✕
              </IconButton>
            </HeaderButtons>
          </Header>

          <Content theme={theme}>
            {/* PRESETS */}
            <PresetSection theme={theme}>
              <Label theme={theme}>Presets</Label>
              <PresetGrid>
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <PresetButton
                    key={key}
                    theme={theme}
                    onClick={() => applyPreset(key)}
                    title={preset.description}
                  >
                    {preset.label}
                  </PresetButton>
                ))}
              </PresetGrid>
            </PresetSection>

            {/* CATEGORIES */}
            {CATEGORIES.map(category => {
              const categoryParams = SHADER_PARAMS.filter(p => p.category === category);
              const isExpanded = expandedCategories[category];

              return (
                <CategorySection key={category} theme={theme}>
                  <CategoryHeader
                    theme={theme}
                    $isExpanded={isExpanded}
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category}</span>
                    <span>{isExpanded ? '▼' : '▶'}</span>
                  </CategoryHeader>

                  <CategoryContent $isExpanded={isExpanded} theme={theme}>
                    {categoryParams.map(param => (
                      <SliderGroup key={param.name}>
                        <SliderLabel>
                          <Label theme={theme}>{param.label}</Label>
                          <Value theme={theme}>
                            {values[param.name]?.toFixed(param.step >= 1 ? 0 : 2)}
                          </Value>
                        </SliderLabel>
                        <Slider
                          type="range"
                          theme={theme}
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={values[param.name] || param.default}
                          onChange={(e) => handleChange(param.name, e.target.value)}
                        />
                        {param.description && (
                          <Description theme={theme}>{param.description}</Description>
                        )}
                      </SliderGroup>
                    ))}
                  </CategoryContent>
                </CategorySection>
              );
            })}
          </Content>

          <Footer theme={theme}>
            <FooterButton theme={theme} onClick={resetAll}>
              Reset All
            </FooterButton>
            <FooterButton theme={theme} $primary onClick={copyJSON}>
              Copy Values
            </FooterButton>
          </Footer>
        </Panel>
      </ControlsOverlay>

      {/* Notification Toast */}
      <NotificationToast
        theme={theme}
        $visible={notification.visible}
      >
        {notification.message}
      </NotificationToast>
    </>
  );
};

export default ShaderControls;
