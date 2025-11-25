import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/atmosphere.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';
import ShaderControls from './ShaderControls';
import LibraryPanel from './LibraryPanel';

/**
 * V17: Atmosphere Experiment
 *
 * Visual Effect:
 * - Cinematic grainy fog with depth and light diffusion
 * - Base fog layer with smooth gradient (lighter center, darker edges)
 * - Consistent film grain across everything (analog feel)
 * - Noise-based density variation (organic thicker/thinner patches)
 * - Subtle color shift (warm in light center, cool blue-gray at edges)
 *
 * Technical Details:
 * - Multi-octave FBM noise for organic fog patches
 * - Film grain that flickers per-frame
 * - Soft exponential light falloff with glow
 * - Vignette for depth
 * - Theme-aware (inverts for light mode)
 */

const CURRENT_ID = 'v17';

const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px 16px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlsToggle = styled(NavButton)`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 100;
`;

const LibraryToggle = styled(NavButton)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;
`;

const AtmosphereExperiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const uniformsRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Initialize custom uniforms with default values
  const [customUniforms] = useState({
    // Base fog & atmosphere
    u_fogDensity: { value: 0.65 },
    u_grainIntensity: { value: 0.1 },
    u_noiseScale: { value: 1.2 },
    u_lightRadius: { value: 1.2 },
    u_lightSoftness: { value: 7.2 },
    u_fogPatchStrength: { value: 0.4 },
    u_depthLayers: { value: 2.0 },
    u_grainScale: { value: 5000.0 },
    u_vignetteStrength: { value: 1.0 },
    u_vignetteSize: { value: 1.3 },
    u_colorNoiseAmount: { value: 0.025 },
    u_breathAmount: { value: 0.015 },
    u_breathSpeed: { value: 0.25 },

    // Post-processing effects
    // Halftone
    u_halftoneEnabled: { value: 0.0 },
    u_halftoneScale: { value: 20.0 },
    u_halftoneAngle: { value: 45.0 },
    u_halftoneContrast: { value: 1.0 },

    // Dithering
    u_ditherEnabled: { value: 0.0 },
    u_ditherScale: { value: 4.0 },
    u_ditherIntensity: { value: 0.5 },

    // Chromatic aberration
    u_chromaticEnabled: { value: 0.0 },
    u_chromaticStrength: { value: 0.005 },
    u_chromaticOffset: { value: new THREE.Vector2(1.0, 0.0) },

    // Enhanced vignette
    u_vignetteRadius: { value: 0.8 },
    u_vignetteSoftness: { value: 0.5 },

    // Color grading
    u_contrast: { value: 1.0 },
    u_saturation: { value: 1.0 },
    u_colorTemperature: { value: 0.0 },
    u_exposure: { value: 0.0 },

    // Scanlines
    u_scanlinesEnabled: { value: 0.0 },
    u_scanlinesIntensity: { value: 0.3 },
    u_scanlinesCount: { value: 400.0 },

    // Bloom
    u_bloomEnabled: { value: 0.0 },
    u_bloomThreshold: { value: 0.7 },
    u_bloomIntensity: { value: 0.5 },
    u_bloomRadius: { value: 0.005 },

    // Volumetric Grain (grain IN the fog, not ON the screen)
    u_grainDepthEnabled: { value: 0.0 },      // 0=screen grain, 1=volumetric
    u_grainFogBinding: { value: 0.8 },        // How much grain follows fog density
    u_grainLightFalloff: { value: 0.5 },      // Grain fades in bright areas
    u_grainLayerVariation: { value: 0.6 },    // Different grain per depth layer
    u_grainParticleSize: { value: 1.5 },      // Size of grain particles

    // Per-layer Grain Size (depth-aware grain sizing)
    u_grainSizeFront: { value: 2.0 },         // Grain size for nearest layer (0.5-4.0)
    u_grainSizeBack: { value: 0.5 },          // Grain size for farthest layer (0.2-2.0)
    u_grainSizeVariation: { value: 0.7 },     // How much size varies between layers (0-1)

    // Grain Clustering (organic clumping)
    u_grainClustering: { value: 0.3 },        // How much grain clumps together (0-1)
    u_grainClusterSize: { value: 3.0 },       // Size of grain clusters (1-10)

    // Depth Fog Control
    u_fogLayerSeparation: { value: 0.5 },     // Visual separation between fog layers (0-1)
    u_fogFrontOpacity: { value: 0.8 },        // Opacity of front fog layer (0-1)
    u_fogBackOpacity: { value: 0.4 },         // Opacity of back fog layer (0-1)

    // Cinematic Lighting
    u_lightWarmth: { value: 0.3 },            // Warm tint in light areas (0-1)
    u_shadowCoolness: { value: 0.2 },         // Cool tint in shadow areas (0-1)
    u_lightContrast: { value: 1.2 },          // Light/shadow contrast (0.5-2.0)

    // Particle Distribution (randomness controls)
    u_grainRandomness: { value: 0.5 },        // 0=uniform grid, 1=fully random scatter
    u_grainJitter: { value: 0.3 },            // Position jitter within cells
    u_halftoneRandomness: { value: 0.0 },     // Randomize halftone dot positions
    u_halftoneJitter: { value: 0.0 },         // Jitter halftone dot sizes
    u_particleScatter: { value: 0.2 },        // Overall scatter/dispersion amount

    // Texture Overlay Patterns
    u_patternMode: { value: 0.0 },          // 0=none, 1=glitch, 2=crosses, 3=multi-halftone, 4=contours
    u_patternIntensity: { value: 0.0 },     // Overall pattern visibility
    u_patternScale: { value: 30.0 },        // Pattern size/density
    u_patternThreshold: { value: 0.5 },     // Luminance threshold for patterns
    u_glitchBlockSize: { value: 20.0 },     // Size of glitch blocks
    u_glitchChance: { value: 0.3 },         // Probability of glitch
    u_crossSize: { value: 1.5 },            // Size of cross marks
    u_crossDensity: { value: 50.0 },        // Number of crosses
    u_contourCount: { value: 30.0 },        // Number of contour lines
    u_contourWidth: { value: 0.08 },        // Thickness of contours
    u_shapeType: { value: 0.0 },            // 0=circle, 1=square, 2=diamond, 3=cross
  });

  // Store uniforms ref for ShaderControls access
  useEffect(() => {
    uniformsRef.current = customUniforms;
  }, [customUniforms]);

  // Handle uniform updates from ShaderControls
  const handleUniformUpdate = (name, value) => {
    if (customUniforms[name]) {
      customUniforms[name].value = value;
    }
  };

  // Handle preset application from LibraryPanel
  const handleApplyPreset = (presetValues) => {
    Object.entries(presetValues).forEach(([name, value]) => {
      if (customUniforms[name]) {
        customUniforms[name].value = value;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showControls) {
          setShowControls(false);
        } else if (showLibrary) {
          setShowLibrary(false);
        } else {
          navigate('/experiments');
        }
      }
      if (e.key === 'ArrowLeft' && !showControls && !showLibrary) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && !showControls && !showLibrary) navigate(`/experiments/${next.id}`);
      // Toggle controls with 'C' key
      if (e.key === 'c' || e.key === 'C') setShowControls(prev => !prev);
      // Toggle library with 'L' key
      if (e.key === 'l' || e.key === 'L') setShowLibrary(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next, showControls, showLibrary]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Atmosphere'}`}
        customUniforms={customUniforms}
      />
      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>

      <ControlsToggle theme={theme} onClick={() => setShowControls(prev => !prev)}>
        {showControls ? '✕ CLOSE' : '⚙ CONTROLS'}
      </ControlsToggle>

      <LibraryToggle theme={theme} onClick={() => setShowLibrary(prev => !prev)}>
        {showLibrary ? '✕ CLOSE' : '📚 LIBRARY'}
      </LibraryToggle>

      <ShaderControls
        uniforms={uniformsRef}
        onUpdate={handleUniformUpdate}
        visible={showControls}
        onClose={() => setShowControls(false)}
      />

      <LibraryPanel
        currentValues={uniformsRef}
        onApplyPreset={handleApplyPreset}
        visible={showLibrary}
        onClose={() => setShowLibrary(false)}
      />
    </>
  );
};

export default AtmosphereExperiment;
