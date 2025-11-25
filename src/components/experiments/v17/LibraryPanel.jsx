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
  'Retro Film': {
    '70s Kodachrome': {
      description: 'Warm, saturated colors with heavy grain',
      colors: ['#FF6B35', '#FFD700', '#FF8C42'],
      values: {
        u_fogDensity: 0.7,
        u_grainIntensity: 0.18,
        u_noiseScale: 1.0,
        u_lightRadius: 1.4,
        u_lightSoftness: 6.0,
        u_fogPatchStrength: 0.35,
        u_depthLayers: 2.0,
        u_grainScale: 4000.0,
        u_vignetteStrength: 1.2,
        u_vignetteSize: 1.4,
        u_colorNoiseAmount: 0.04,
        u_breathAmount: 0.02,
        u_breathSpeed: 0.3,
        u_halftoneEnabled: 1.0,
        u_halftoneScale: 25.0,
        u_halftoneAngle: 45.0,
        u_halftoneContrast: 1.2,
        u_saturation: 1.4,
        u_colorTemperature: 0.3,
        u_exposure: 0.2,
      }
    },
    'Noir Smoke': {
      description: 'High contrast black & white with heavy vignette',
      colors: ['#1A1A1A', '#4A4A4A', '#FFFFFF'],
      values: {
        u_fogDensity: 0.85,
        u_grainIntensity: 0.15,
        u_noiseScale: 0.8,
        u_lightRadius: 0.9,
        u_lightSoftness: 4.0,
        u_fogPatchStrength: 0.6,
        u_depthLayers: 3.0,
        u_grainScale: 6000.0,
        u_vignetteStrength: 2.0,
        u_vignetteSize: 1.0,
        u_colorNoiseAmount: 0.01,
        u_breathAmount: 0.01,
        u_breathSpeed: 0.2,
        u_saturation: 0.0,
        u_contrast: 1.8,
        u_exposure: -0.3,
      }
    },
    'VHS Decay': {
      description: 'Scanlines, chromatic aberration, and tape artifacts',
      colors: ['#2C2C54', '#574B90', '#706FD3'],
      values: {
        u_fogDensity: 0.75,
        u_grainIntensity: 0.2,
        u_noiseScale: 1.5,
        u_lightRadius: 1.3,
        u_lightSoftness: 5.5,
        u_fogPatchStrength: 0.45,
        u_depthLayers: 2.0,
        u_grainScale: 3500.0,
        u_vignetteStrength: 1.5,
        u_vignetteSize: 1.2,
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.4,
        u_scanlinesCount: 400.0,
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.008,
        u_ditherEnabled: 1.0,
        u_ditherScale: 4.0,
        u_ditherIntensity: 0.6,
        u_saturation: 0.7,
        u_colorTemperature: -0.2,
      }
    },
    'Silent Film': {
      description: 'Sepia tone with subtle flicker and edge grain',
      colors: ['#704214', '#9C6D47', '#C9A580'],
      values: {
        u_fogDensity: 0.6,
        u_grainIntensity: 0.12,
        u_noiseScale: 1.3,
        u_lightRadius: 1.5,
        u_lightSoftness: 8.0,
        u_fogPatchStrength: 0.3,
        u_depthLayers: 1.0,
        u_grainScale: 7000.0,
        u_vignetteStrength: 1.8,
        u_vignetteSize: 1.1,
        u_colorNoiseAmount: 0.03,
        u_breathAmount: 0.025,
        u_breathSpeed: 0.15,
        u_saturation: 0.3,
        u_colorTemperature: 0.5,
        u_contrast: 1.3,
      }
    },
  },

  'Organic Nature': {
    'Morning Mist': {
      description: 'Soft, cool fog with gentle light diffusion',
      colors: ['#A8DADC', '#E0F7FA', '#FFFFFF'],
      values: {
        u_fogDensity: 0.55,
        u_grainIntensity: 0.06,
        u_noiseScale: 1.8,
        u_lightRadius: 1.6,
        u_lightSoftness: 9.0,
        u_fogPatchStrength: 0.25,
        u_depthLayers: 3.0,
        u_grainScale: 6000.0,
        u_vignetteStrength: 0.6,
        u_vignetteSize: 1.5,
        u_colorNoiseAmount: 0.02,
        u_breathAmount: 0.02,
        u_breathSpeed: 0.2,
        u_saturation: 0.8,
        u_colorTemperature: -0.3,
        u_exposure: 0.3,
      }
    },
    'Forest Canopy': {
      description: 'Dappled light through organic fog patches',
      colors: ['#2D5016', '#52734D', '#91C788'],
      values: {
        u_fogDensity: 0.65,
        u_grainIntensity: 0.08,
        u_noiseScale: 2.2,
        u_lightRadius: 1.2,
        u_lightSoftness: 7.5,
        u_fogPatchStrength: 0.5,
        u_depthLayers: 4.0,
        u_grainScale: 5500.0,
        u_vignetteStrength: 1.1,
        u_vignetteSize: 1.3,
        u_colorNoiseAmount: 0.035,
        u_breathAmount: 0.015,
        u_breathSpeed: 0.25,
        u_grainDepthEnabled: 0.6,
        u_grainFogBinding: 0.7,
        u_grainLightFalloff: 0.4,
        u_colorTemperature: 0.2,
        u_saturation: 1.1,
      }
    },
    'Desert Haze': {
      description: 'Shimmering heat waves with warm particles',
      colors: ['#D4A574', '#E8C4A0', '#FFF8DC'],
      values: {
        u_fogDensity: 0.5,
        u_grainIntensity: 0.1,
        u_noiseScale: 0.9,
        u_lightRadius: 2.0,
        u_lightSoftness: 10.0,
        u_fogPatchStrength: 0.4,
        u_depthLayers: 2.0,
        u_grainScale: 4500.0,
        u_vignetteStrength: 0.8,
        u_vignetteSize: 1.6,
        u_colorNoiseAmount: 0.045,
        u_breathAmount: 0.03,
        u_breathSpeed: 0.4,
        u_grainDepthEnabled: 0.8,
        u_grainParticleSize: 2.0,
        u_colorTemperature: 0.6,
        u_saturation: 1.2,
        u_exposure: 0.4,
      }
    },
    'Ocean Depths': {
      description: 'Deep blue volumetric fog with particulate',
      colors: ['#0A2463', '#1E488F', '#3E92CC'],
      values: {
        u_fogDensity: 0.8,
        u_grainIntensity: 0.05,
        u_noiseScale: 1.1,
        u_lightRadius: 1.0,
        u_lightSoftness: 6.0,
        u_fogPatchStrength: 0.35,
        u_depthLayers: 5.0,
        u_grainScale: 8000.0,
        u_vignetteStrength: 1.5,
        u_vignetteSize: 1.2,
        u_colorNoiseAmount: 0.02,
        u_breathAmount: 0.02,
        u_breathSpeed: 0.15,
        u_grainDepthEnabled: 1.0,
        u_grainFogBinding: 0.9,
        u_grainLightFalloff: 0.6,
        u_grainLayerVariation: 0.8,
        u_colorTemperature: -0.6,
        u_saturation: 0.9,
      }
    },
  },

  'Sci-Fi Digital': {
    'Cyberpunk Neon': {
      description: 'Glitchy digital fog with chromatic aberration',
      colors: ['#FF006E', '#00F5FF', '#8338EC'],
      values: {
        u_fogDensity: 0.7,
        u_grainIntensity: 0.12,
        u_noiseScale: 0.7,
        u_lightRadius: 1.1,
        u_lightSoftness: 4.5,
        u_fogPatchStrength: 0.5,
        u_depthLayers: 3.0,
        u_grainScale: 3000.0,
        u_vignetteStrength: 1.3,
        u_vignetteSize: 1.1,
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.012,
        u_ditherEnabled: 1.0,
        u_ditherScale: 2.0,
        u_ditherIntensity: 0.7,
        u_bloomEnabled: 1.0,
        u_bloomThreshold: 0.6,
        u_bloomIntensity: 1.2,
        u_bloomRadius: 0.008,
        u_saturation: 1.5,
        u_contrast: 1.4,
      }
    },
    'Holographic Interface': {
      description: 'Clean digital fog with scanlines and bloom',
      colors: ['#00D9FF', '#00F0FF', '#E0FFFF'],
      values: {
        u_fogDensity: 0.45,
        u_grainIntensity: 0.04,
        u_noiseScale: 0.5,
        u_lightRadius: 1.8,
        u_lightSoftness: 12.0,
        u_fogPatchStrength: 0.2,
        u_depthLayers: 2.0,
        u_grainScale: 9000.0,
        u_vignetteStrength: 0.5,
        u_vignetteSize: 1.7,
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.15,
        u_scanlinesCount: 600.0,
        u_bloomEnabled: 1.0,
        u_bloomThreshold: 0.5,
        u_bloomIntensity: 0.8,
        u_bloomRadius: 0.006,
        u_saturation: 0.6,
        u_colorTemperature: -0.4,
        u_exposure: 0.2,
      }
    },
    'Matrix Rain': {
      description: 'Green monochrome with digital artifacts',
      colors: ['#003B00', '#00FF41', '#39FF14'],
      values: {
        u_fogDensity: 0.6,
        u_grainIntensity: 0.15,
        u_noiseScale: 0.6,
        u_lightRadius: 1.3,
        u_lightSoftness: 5.0,
        u_fogPatchStrength: 0.4,
        u_depthLayers: 4.0,
        u_grainScale: 3500.0,
        u_vignetteStrength: 1.4,
        u_vignetteSize: 1.2,
        u_scanlinesEnabled: 1.0,
        u_scanlinesIntensity: 0.3,
        u_scanlinesCount: 500.0,
        u_ditherEnabled: 1.0,
        u_ditherScale: 3.0,
        u_ditherIntensity: 0.5,
        u_bloomEnabled: 1.0,
        u_bloomThreshold: 0.7,
        u_bloomIntensity: 1.0,
        u_saturation: 0.2,
        u_colorTemperature: 0.1,
        u_contrast: 1.6,
      }
    },
    'Alien Atmosphere': {
      description: 'Otherworldly fog with unusual color shifts',
      colors: ['#4B0082', '#9D00FF', '#D896FF'],
      values: {
        u_fogDensity: 0.75,
        u_grainIntensity: 0.1,
        u_noiseScale: 1.4,
        u_lightRadius: 1.5,
        u_lightSoftness: 8.0,
        u_fogPatchStrength: 0.55,
        u_depthLayers: 4.0,
        u_grainScale: 5000.0,
        u_vignetteStrength: 1.2,
        u_vignetteSize: 1.3,
        u_colorNoiseAmount: 0.06,
        u_breathAmount: 0.025,
        u_breathSpeed: 0.35,
        u_grainDepthEnabled: 0.7,
        u_grainFogBinding: 0.8,
        u_grainLayerVariation: 0.9,
        u_chromaticEnabled: 1.0,
        u_chromaticStrength: 0.006,
        u_colorTemperature: -0.5,
        u_saturation: 1.3,
      }
    },
  },

  'Ethereal Dream': {
    'Soft Focus': {
      description: 'Dreamy, gentle atmosphere with minimal grain',
      colors: ['#FFF8F0', '#FFE8D6', '#FFD6BA'],
      values: {
        u_fogDensity: 0.4,
        u_grainIntensity: 0.03,
        u_noiseScale: 2.0,
        u_lightRadius: 2.2,
        u_lightSoftness: 12.0,
        u_fogPatchStrength: 0.15,
        u_depthLayers: 2.0,
        u_grainScale: 8000.0,
        u_vignetteStrength: 0.3,
        u_vignetteSize: 1.8,
        u_colorNoiseAmount: 0.015,
        u_breathAmount: 0.02,
        u_breathSpeed: 0.2,
        u_saturation: 0.7,
        u_colorTemperature: 0.4,
        u_exposure: 0.5,
        u_contrast: 0.9,
      }
    },
    'Celestial Glow': {
      description: 'Radiant bloom with soft volumetric fog',
      colors: ['#FFD700', '#FFF4C7', '#FFFEF0'],
      values: {
        u_fogDensity: 0.5,
        u_grainIntensity: 0.05,
        u_noiseScale: 1.6,
        u_lightRadius: 2.0,
        u_lightSoftness: 11.0,
        u_fogPatchStrength: 0.2,
        u_depthLayers: 3.0,
        u_grainScale: 7000.0,
        u_vignetteStrength: 0.4,
        u_vignetteSize: 1.6,
        u_colorNoiseAmount: 0.02,
        u_breathAmount: 0.03,
        u_breathSpeed: 0.25,
        u_bloomEnabled: 1.0,
        u_bloomThreshold: 0.4,
        u_bloomIntensity: 1.5,
        u_bloomRadius: 0.01,
        u_grainDepthEnabled: 0.3,
        u_grainLightFalloff: 0.8,
        u_saturation: 1.1,
        u_colorTemperature: 0.3,
        u_exposure: 0.4,
      }
    },
    'Twilight Vapor': {
      description: 'Purple-blue gradient with soft particle glow',
      colors: ['#5A189A', '#7209B7', '#B5179E'],
      values: {
        u_fogDensity: 0.6,
        u_grainIntensity: 0.07,
        u_noiseScale: 1.5,
        u_lightRadius: 1.7,
        u_lightSoftness: 9.5,
        u_fogPatchStrength: 0.3,
        u_depthLayers: 3.0,
        u_grainScale: 6500.0,
        u_vignetteStrength: 0.9,
        u_vignetteSize: 1.4,
        u_colorNoiseAmount: 0.03,
        u_breathAmount: 0.025,
        u_breathSpeed: 0.2,
        u_grainDepthEnabled: 0.5,
        u_grainFogBinding: 0.6,
        u_grainLightFalloff: 0.7,
        u_grainParticleSize: 1.8,
        u_bloomEnabled: 1.0,
        u_bloomThreshold: 0.6,
        u_bloomIntensity: 0.7,
        u_colorTemperature: -0.2,
        u_saturation: 1.2,
      }
    },
    'Liminal Space': {
      description: 'Unsettling clean fog with subtle unease',
      colors: ['#F0EAD6', '#DDE5B6', '#A0C4A9'],
      values: {
        u_fogDensity: 0.55,
        u_grainIntensity: 0.04,
        u_noiseScale: 1.3,
        u_lightRadius: 1.9,
        u_lightSoftness: 10.0,
        u_fogPatchStrength: 0.25,
        u_depthLayers: 2.0,
        u_grainScale: 7500.0,
        u_vignetteStrength: 0.7,
        u_vignetteSize: 1.5,
        u_colorNoiseAmount: 0.02,
        u_breathAmount: 0.015,
        u_breathSpeed: 0.3,
        u_saturation: 0.5,
        u_colorTemperature: 0.1,
        u_exposure: 0.1,
        u_contrast: 1.1,
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
