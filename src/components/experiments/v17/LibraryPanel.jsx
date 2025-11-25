import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * LibraryPanel - Preset library for browsing and applying shader configurations
 *
 * Features:
 * - Organized presets by category (Retro Film, Organic Nature, Sci-Fi Digital, Ethereal Dream)
 * - Collapsible accordion sections
 * - Visual gradient indicators based on key colors
 * - One-click preset application
 * - Currently selected preset indicator
 * - Smooth transitions between presets
 * - Draggable positioning
 */

//=============================================================================
// PRESET LIBRARY - Curated shader looks organized by aesthetic
//=============================================================================

const PRESET_LIBRARY = {
  'Graphic Print': {
    'Newspaper Halftone': {
      description: 'Classic CMYK print with scattered dots and crosses',
      colors: ['#1A1A1A', '#666666', '#FFFFFF'],
      values: {
        u_fogDensity: 0.3,
        u_grainIntensity: 0.02,
        u_noiseScale: 0.5,
        u_lightSoftness: 15.0,
        u_fogPatchStrength: 0.1,
        u_depthLayers: 1.0,
        u_vignetteStrength: 0.2,
        u_saturation: 0.0,
        u_contrast: 1.8,
        // Pattern: Multi-shape halftone with circles
        u_patternMode: 3.0,
        u_patternIntensity: 0.9,
        u_patternScale: 40.0,
        u_patternThreshold: 0.2,
        u_shapeType: 0.0,
        // Halftone randomness for organic print feel
        u_halftoneEnabled: 1.0,
        u_halftoneScale: 25.0,
        u_halftoneRandomness: 0.4,
        u_halftoneJitter: 0.3,
      }
    },
    'Risograph Crosses': {
      description: 'Dense X marks like screen-printed art',
      colors: ['#FF5733', '#1A1A1A', '#FFFFFF'],
      values: {
        u_fogDensity: 0.4,
        u_grainIntensity: 0.08,
        u_noiseScale: 0.8,
        u_lightSoftness: 8.0,
        u_fogPatchStrength: 0.2,
        u_depthLayers: 2.0,
        u_vignetteStrength: 0.5,
        u_saturation: 0.3,
        u_contrast: 1.5,
        // Pattern: Crosses
        u_patternMode: 2.0,
        u_patternIntensity: 0.85,
        u_crossSize: 2.5,
        u_crossDensity: 80.0,
        u_patternThreshold: 0.3,
        // Grain distribution
        u_grainRandomness: 0.8,
        u_grainJitter: 0.5,
      }
    },
    'Topographic Map': {
      description: 'Elevation contours like a terrain chart',
      colors: ['#2C3E50', '#7F8C8D', '#ECF0F1'],
      values: {
        u_fogDensity: 0.5,
        u_grainIntensity: 0.03,
        u_noiseScale: 2.5,
        u_lightSoftness: 10.0,
        u_fogPatchStrength: 0.6,
        u_depthLayers: 5.0,
        u_vignetteStrength: 0.3,
        u_saturation: 0.2,
        u_contrast: 1.2,
        // Pattern: Contour lines
        u_patternMode: 4.0,
        u_patternIntensity: 0.95,
        u_contourCount: 60.0,
        u_contourWidth: 0.04,
        u_patternThreshold: 0.1,
        // Deep volumetric fog
        u_grainDepthEnabled: 0.8,
        u_fogLayerSeparation: 0.8,
      }
    },
    'Diamond Grid': {
      description: 'Geometric diamond halftone pattern',
      colors: ['#E74C3C', '#2C3E50', '#F1C40F'],
      values: {
        u_fogDensity: 0.35,
        u_grainIntensity: 0.05,
        u_noiseScale: 0.6,
        u_lightSoftness: 12.0,
        u_fogPatchStrength: 0.15,
        u_depthLayers: 2.0,
        u_vignetteStrength: 0.4,
        u_saturation: 0.8,
        u_contrast: 1.3,
        // Pattern: Diamond halftone
        u_patternMode: 3.0,
        u_patternIntensity: 0.8,
        u_patternScale: 35.0,
        u_shapeType: 2.0,
        u_patternThreshold: 0.25,
      }
    },
  },

  'Digital Chaos': {
    'Corrupted Signal': {
      description: 'Heavy glitch blocks with scan artifacts',
      colors: ['#00FF00', '#FF0000', '#0000FF'],
      values: {
        u_fogDensity: 0.6,
        u_grainIntensity: 0.2,
        u_noiseScale: 0.4,
        u_lightSoftness: 3.0,
        u_fogPatchStrength: 0.7,
        u_depthLayers: 3.0,
        u_vignetteStrength: 1.5,
        u_saturation: 1.8,
        u_contrast: 2.0,
        u_exposure: -0.2,
        // Pattern: Glitch blocks
        u_patternMode: 1.0,
        u_patternIntensity: 0.7,
        u_glitchBlockSize: 15.0,
        u_glitchChance: 0.5,
        u_patternThreshold: 0.2,
        // Chromatic + scanlines
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.015,
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.5,
        u_scanlinesCount: 300.0,
        // Max grain chaos
        u_grainRandomness: 1.0,
        u_particleScatter: 0.8,
      }
    },
    'Data Moshing': {
      description: 'Pixelated compression artifacts',
      colors: ['#FF00FF', '#00FFFF', '#FFFF00'],
      values: {
        u_fogDensity: 0.5,
        u_grainIntensity: 0.15,
        u_noiseScale: 0.3,
        u_lightSoftness: 5.0,
        u_fogPatchStrength: 0.5,
        u_depthLayers: 2.0,
        u_vignetteStrength: 0.8,
        u_saturation: 2.0,
        u_contrast: 1.7,
        // Pattern: Large glitch blocks
        u_patternMode: 1.0,
        u_patternIntensity: 0.6,
        u_glitchBlockSize: 40.0,
        u_glitchChance: 0.7,
        u_patternThreshold: 0.15,
        // Dithering
        u_ditherEnabled: 1.0,
        u_ditherScale: 8.0,
        u_ditherIntensity: 0.9,
        // Bloom for glow
        u_bloomEnabled: 1.0,
        u_bloomIntensity: 1.5,
        u_bloomThreshold: 0.5,
      }
    },
    'Binary Rain': {
      description: 'Vertical scanlines with cross markers',
      colors: ['#001100', '#00FF00', '#003300'],
      values: {
        u_fogDensity: 0.7,
        u_grainIntensity: 0.12,
        u_noiseScale: 0.5,
        u_lightSoftness: 4.0,
        u_fogPatchStrength: 0.4,
        u_depthLayers: 4.0,
        u_vignetteStrength: 1.8,
        u_saturation: 0.1,
        u_contrast: 1.9,
        u_colorTemperature: 0.3,
        // Pattern: Crosses (like binary/code marks)
        u_patternMode: 2.0,
        u_patternIntensity: 0.7,
        u_crossSize: 1.0,
        u_crossDensity: 150.0,
        u_patternThreshold: 0.4,
        // Heavy scanlines
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.6,
        u_scanlinesCount: 800.0,
        // Volumetric grain
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 0.9,
        u_grainSizeFront: 3.0,
        u_grainSizeBack: 0.3,
      }
    },
    'Quantum Noise': {
      description: 'Extreme particle scatter with shape morphing',
      colors: ['#9B59B6', '#3498DB', '#1ABC9C'],
      values: {
        u_fogDensity: 0.8,
        u_grainIntensity: 0.25,
        u_noiseScale: 1.0,
        u_lightSoftness: 6.0,
        u_fogPatchStrength: 0.8,
        u_depthLayers: 5.0,
        u_vignetteStrength: 1.0,
        u_saturation: 1.2,
        u_contrast: 1.4,
        // Pattern: Shape halftone morphing between all shapes
        u_patternMode: 3.0,
        u_patternIntensity: 0.5,
        u_patternScale: 25.0,
        u_shapeType: 1.5,
        u_patternThreshold: 0.3,
        // Maximum particle chaos
        u_grainRandomness: 1.0,
        u_grainJitter: 1.0,
        u_particleScatter: 1.0,
        u_grainClustering: 0.8,
        u_grainClusterSize: 8.0,
        // Chromatic
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.01,
      }
    },
  },

  'Cinematic Depth': {
    'Film Noir 3D': {
      description: 'Deep volumetric shadows with layered grain',
      colors: ['#0A0A0A', '#2A2A2A', '#E8E8E8'],
      values: {
        u_fogDensity: 0.9,
        u_grainIntensity: 0.18,
        u_noiseScale: 1.2,
        u_lightSoftness: 3.0,
        u_fogPatchStrength: 0.7,
        u_depthLayers: 5.0,
        u_vignetteStrength: 2.5,
        u_vignetteSize: 0.9,
        u_saturation: 0.0,
        u_contrast: 2.0,
        u_exposure: -0.4,
        // Deep volumetric grain
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 1.0,
        u_grainLightFalloff: 0.8,
        u_grainLayerVariation: 0.9,
        u_grainSizeFront: 3.5,
        u_grainSizeBack: 0.2,
        // Fog depth separation
        u_fogLayerSeparation: 0.9,
        u_fogFrontOpacity: 1.0,
        u_fogBackOpacity: 0.2,
        // Cinematic lighting
        u_lightWarmth: 0.1,
        u_shadowCoolness: 0.4,
        u_lightContrast: 1.8,
      }
    },
    'Dusty Projector': {
      description: 'Floating dust particles in projector beam',
      colors: ['#1A1A1A', '#D4A574', '#FFFFFF'],
      values: {
        u_fogDensity: 0.6,
        u_grainIntensity: 0.22,
        u_noiseScale: 0.7,
        u_lightRadius: 0.8,
        u_lightSoftness: 2.5,
        u_fogPatchStrength: 0.3,
        u_depthLayers: 4.0,
        u_vignetteStrength: 1.8,
        u_saturation: 0.4,
        u_colorTemperature: 0.5,
        u_exposure: 0.2,
        // Heavy volumetric particles
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 0.5,
        u_grainLightFalloff: 0.2,
        u_grainParticleSize: 2.5,
        u_grainSizeFront: 4.0,
        u_grainSizeBack: 1.0,
        u_grainSizeVariation: 1.0,
        // Clustering for dust clumps
        u_grainClustering: 0.6,
        u_grainClusterSize: 5.0,
        u_grainRandomness: 0.7,
        // Warm light, cool shadows
        u_lightWarmth: 0.7,
        u_shadowCoolness: 0.3,
        u_lightContrast: 1.5,
      }
    },
    'Foggy Window': {
      description: 'Condensation layers with visible depth',
      colors: ['#2C3E50', '#BDC3C7', '#FFFFFF'],
      values: {
        u_fogDensity: 0.75,
        u_grainIntensity: 0.08,
        u_noiseScale: 2.0,
        u_lightSoftness: 8.0,
        u_fogPatchStrength: 0.5,
        u_depthLayers: 4.0,
        u_vignetteStrength: 0.6,
        u_saturation: 0.3,
        u_colorTemperature: -0.2,
        // Distinct fog layers
        u_fogLayerSeparation: 1.0,
        u_fogFrontOpacity: 0.9,
        u_fogBackOpacity: 0.5,
        // Volumetric with varying sizes
        u_grainDepthEnabled: 0.9,
        u_grainFogBinding: 0.8,
        u_grainSizeFront: 2.0,
        u_grainSizeBack: 0.4,
        u_grainSizeVariation: 0.9,
        // Contour lines for condensation
        u_patternMode: 4.0,
        u_patternIntensity: 0.3,
        u_contourCount: 25.0,
        u_contourWidth: 0.1,
        u_patternThreshold: 0.4,
        // Bloom for light diffusion
        u_bloomEnabled: 1.0,
        u_bloomIntensity: 0.8,
        u_bloomThreshold: 0.6,
      }
    },
    'Stage Smoke': {
      description: 'Concert fog with dramatic lighting',
      colors: ['#0D0D0D', '#8E44AD', '#F39C12'],
      values: {
        u_fogDensity: 0.85,
        u_grainIntensity: 0.1,
        u_noiseScale: 1.5,
        u_lightRadius: 1.2,
        u_lightSoftness: 5.0,
        u_fogPatchStrength: 0.6,
        u_depthLayers: 5.0,
        u_vignetteStrength: 1.2,
        u_saturation: 1.4,
        u_contrast: 1.3,
        // Multi-layer fog
        u_fogLayerSeparation: 0.7,
        u_fogFrontOpacity: 0.7,
        u_fogBackOpacity: 0.3,
        // Volumetric smoke particles
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 0.7,
        u_grainParticleSize: 2.0,
        u_grainLayerVariation: 0.8,
        // Warm spotlight, cool ambient
        u_lightWarmth: 0.8,
        u_shadowCoolness: 0.5,
        u_lightContrast: 2.0,
        // Bloom for light beams
        u_bloomEnabled: 1.0,
        u_bloomIntensity: 1.2,
        u_bloomThreshold: 0.4,
        u_bloomRadius: 0.012,
      }
    },
  },

  'Experimental': {
    'Stipple Mesh': {
      description: 'Dense cross pattern forming a mesh',
      colors: ['#1A1A1A', '#888888', '#F5F5F5'],
      values: {
        u_fogDensity: 0.2,
        u_grainIntensity: 0.05,
        u_noiseScale: 1.0,
        u_lightSoftness: 15.0,
        u_fogPatchStrength: 0.1,
        u_depthLayers: 1.0,
        u_vignetteStrength: 0.3,
        u_saturation: 0.0,
        u_contrast: 1.6,
        // Dense cross mesh
        u_patternMode: 2.0,
        u_patternIntensity: 1.0,
        u_crossSize: 0.8,
        u_crossDensity: 200.0,
        u_patternThreshold: 0.1,
        // No grain distraction
        u_grainRandomness: 0.0,
        u_grainJitter: 0.0,
      }
    },
    'Contour Scan': {
      description: 'Medical scan aesthetic with fine contours',
      colors: ['#001428', '#00A8E8', '#FFFFFF'],
      values: {
        u_fogDensity: 0.4,
        u_grainIntensity: 0.03,
        u_noiseScale: 1.8,
        u_lightSoftness: 10.0,
        u_fogPatchStrength: 0.4,
        u_depthLayers: 3.0,
        u_vignetteStrength: 0.5,
        u_saturation: 0.5,
        u_contrast: 1.4,
        u_colorTemperature: -0.5,
        // Fine contour lines
        u_patternMode: 4.0,
        u_patternIntensity: 0.9,
        u_contourCount: 100.0,
        u_contourWidth: 0.02,
        u_patternThreshold: 0.15,
        // Subtle scanlines
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.2,
        u_scanlinesCount: 600.0,
        // Bloom for glow
        u_bloomEnabled: 1.0,
        u_bloomIntensity: 0.6,
        u_bloomThreshold: 0.5,
      }
    },
    'Particle Storm': {
      description: 'Maximum chaos with all systems active',
      colors: ['#FF1744', '#00E5FF', '#FFEA00'],
      values: {
        u_fogDensity: 0.7,
        u_grainIntensity: 0.3,
        u_noiseScale: 0.8,
        u_lightSoftness: 4.0,
        u_fogPatchStrength: 0.6,
        u_depthLayers: 5.0,
        u_vignetteStrength: 1.0,
        u_saturation: 1.5,
        u_contrast: 1.5,
        // Maximum volumetric grain
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 0.8,
        u_grainParticleSize: 3.0,
        u_grainSizeFront: 4.0,
        u_grainSizeBack: 0.5,
        // Maximum scatter
        u_grainRandomness: 1.0,
        u_grainJitter: 1.0,
        u_particleScatter: 1.0,
        u_grainClustering: 0.9,
        u_grainClusterSize: 10.0,
        // Glitch overlay
        u_patternMode: 1.0,
        u_patternIntensity: 0.4,
        u_glitchBlockSize: 25.0,
        u_glitchChance: 0.4,
        // All effects
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.008,
        u_bloomEnabled: 1.0,
        u_bloomIntensity: 1.0,
      }
    },
    'Void Shapes': {
      description: 'Abstract shapes emerging from darkness',
      colors: ['#000000', '#1A1A2E', '#E94560'],
      values: {
        u_fogDensity: 0.95,
        u_grainIntensity: 0.08,
        u_noiseScale: 3.0,
        u_lightRadius: 0.6,
        u_lightSoftness: 2.0,
        u_fogPatchStrength: 0.9,
        u_depthLayers: 5.0,
        u_vignetteStrength: 2.0,
        u_saturation: 0.6,
        u_contrast: 2.0,
        u_exposure: -0.5,
        // Cross halftone for abstract shapes
        u_patternMode: 3.0,
        u_patternIntensity: 0.7,
        u_patternScale: 20.0,
        u_shapeType: 3.0,
        u_patternThreshold: 0.5,
        // Deep fog layers
        u_fogLayerSeparation: 1.0,
        u_fogFrontOpacity: 1.0,
        u_fogBackOpacity: 0.1,
        // Dramatic lighting
        u_lightWarmth: 0.6,
        u_shadowCoolness: 0.8,
        u_lightContrast: 2.0,
      }
    },
  },
};

// Get preset count per category
const getCategoryCount = (category) => {
  return Object.keys(PRESET_LIBRARY[category] || {}).length;
};

//=============================================================================
// STYLED COMPONENTS
//=============================================================================

const LibraryOverlay = styled.div`
  position: fixed;
  top: ${props => props.$position.y}px;
  right: 40px;
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
  min-width: 340px;
  max-width: 380px;
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

const CloseButton = styled.button`
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

const CategoryTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-block;
  background: ${props => props.theme.colors.accent.blue};
  color: ${props => props.theme.colors.text.primary};
  font-size: 8px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const CategoryContent = styled.div`
  max-height: ${props => props.$isExpanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => props.$isExpanded ? '12px' : '0'};
`;

const PresetCard = styled.div`
  background: ${props => props.$isSelected
    ? props.theme.colors.background.secondary
    : 'transparent'};
  border: 1px solid ${props => props.$isSelected
    ? props.theme.colors.accent.blue
    : props.theme.colors.border.subtle};
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.standard};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.accent.blue};
    transform: translateX(2px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const GradientBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    ${props => props.$colors[0]},
    ${props => props.$colors[1]},
    ${props => props.$colors[2]}
  );
  opacity: 0.8;
`;

const PresetName = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-size: 11px;
  letter-spacing: 0.5px;
  font-weight: 500;
  margin-bottom: 4px;
  margin-left: 8px;
`;

const PresetDescription = styled.div`
  color: ${props => props.theme.colors.text.muted};
  font-size: 9px;
  line-height: 1.4;
  margin-left: 8px;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  color: ${props => props.theme.colors.accent.blue};
  font-size: 10px;
  font-weight: 600;
`;

const Footer = styled.div`
  padding: 10px 16px;
  background: ${props => props.theme.colors.background.secondary};
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
  font-size: 9px;
  color: ${props => props.theme.colors.text.muted};
  text-align: center;
  letter-spacing: 0.5px;
`;

//=============================================================================
// COMPONENT
//=============================================================================

const LibraryPanel = ({ presets, currentValues, onApplyPreset, visible, onClose }) => {
  const { theme } = useContext(ThemeContext);

  // Use provided presets or fall back to built-in library
  const library = presets || PRESET_LIBRARY;

  // UI state
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Start with first category expanded
    const categories = Object.keys(library);
    return { [categories[0]]: true };
  });
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Apply preset with smooth transition
  const applyPreset = (categoryName, presetName) => {
    const preset = library[categoryName][presetName];
    if (!preset || !onApplyPreset) return;

    // Update selected indicator
    setSelectedPreset(`${categoryName}/${presetName}`);

    // Apply all uniform values at once
    onApplyPreset(preset.values);
  };

  // Dragging logic
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target !== e.currentTarget) return;

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
        x: Math.max(0, Math.min(window.innerWidth - 420, e.clientX - dragOffset.x)),
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
    <LibraryOverlay
      $position={position}
      $isDragging={isDragging}
      theme={theme}
    >
      <Panel theme={theme}>
        <Header theme={theme} onMouseDown={handleMouseDown}>
          <Title theme={theme}>Preset Library</Title>
          <CloseButton theme={theme} onClick={onClose} title="Close">
            ✕
          </CloseButton>
        </Header>

        <Content theme={theme}>
          {Object.entries(library).map(([categoryName, categoryPresets]) => {
            const isExpanded = expandedCategories[categoryName];
            const presetCount = Object.keys(categoryPresets).length;

            return (
              <CategorySection key={categoryName} theme={theme}>
                <CategoryHeader
                  theme={theme}
                  $isExpanded={isExpanded}
                  onClick={() => toggleCategory(categoryName)}
                >
                  <CategoryTitle>
                    {categoryName}
                    <Badge theme={theme}>{presetCount}</Badge>
                  </CategoryTitle>
                  <span>{isExpanded ? '▼' : '▶'}</span>
                </CategoryHeader>

                <CategoryContent $isExpanded={isExpanded} theme={theme}>
                  {Object.entries(categoryPresets).map(([presetName, preset]) => {
                    const fullPresetName = `${categoryName}/${presetName}`;
                    const isSelected = selectedPreset === fullPresetName;

                    return (
                      <PresetCard
                        key={presetName}
                        theme={theme}
                        $isSelected={isSelected}
                        onClick={() => applyPreset(categoryName, presetName)}
                      >
                        <GradientBar $colors={preset.colors} />
                        <PresetName theme={theme}>{presetName}</PresetName>
                        <PresetDescription theme={theme}>
                          {preset.description}
                        </PresetDescription>
                        {isSelected && (
                          <SelectedIndicator theme={theme}>✓</SelectedIndicator>
                        )}
                      </PresetCard>
                    );
                  })}
                </CategoryContent>
              </CategorySection>
            );
          })}
        </Content>

        <Footer theme={theme}>
          {Object.keys(library).length} Categories • {
            Object.values(library).reduce((sum, cat) => sum + Object.keys(cat).length, 0)
          } Presets
        </Footer>
      </Panel>
    </LibraryOverlay>
  );
};

export default LibraryPanel;
