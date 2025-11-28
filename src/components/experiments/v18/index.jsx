import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/topographic_hand.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V18: Topographic Hand - Depth Map Contour Visualization
 *
 * Features toggleable visual modes:
 * - Mode 1: Pure contour lines only (Joy Division style)
 * - Mode 2: Contours + Stipple texture (organic grain)
 * - Mode 3: Full effect (contours + stipple + dissolution)
 *
 * Controls:
 * - Press 1/2/3 or click buttons to switch modes
 * - Press D to toggle debug mode
 * - Arrow keys for prev/next experiment
 * - Escape to return to gallery
 */

const CURRENT_ID = 'v18';

// ============================================
// STYLED COMPONENTS
// ============================================

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
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const SectionLabel = styled.div`
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-top: 12px;
  margin-bottom: 4px;
  padding-left: 4px;
`;

const ToggleButton = styled.button`
  background: ${props => props.$active ? 'rgba(136, 169, 215, 0.25)' : 'rgba(0, 0, 0, 0.6)'};
  border: 1px solid ${props => props.$active ? 'rgba(136, 169, 215, 0.6)' : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)'};
  padding: 10px 16px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 11px;
  letter-spacing: 1.5px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(136, 169, 215, 0.4);
  }

  .key {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 9px;
  }
`;

const SliderContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 14px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  span {
    font-size: 10px;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
  }

  .value {
    color: rgba(136, 169, 215, 0.9);
    font-family: monospace;
    font-size: 11px;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const ModeButton = styled.button`
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.6)'};
  border: 1px solid ${props => props.$active ? 'rgba(136, 169, 215, 0.6)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)'};
  padding: 12px 20px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 11px;
  letter-spacing: 1.5px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(136, 169, 215, 0.4);
  }

  .key {
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: 8px;
    font-size: 10px;
  }
`;

const InfoPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  max-width: 280px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;

  h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    font-weight: 400;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
  }

  .mode-info {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(136, 169, 215, 0.8);
    font-size: 11px;
  }
`;

// ============================================
// COMPONENT
// ============================================

const TopographicHandExperiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const textureRef = useRef(null);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Layer toggle states
  const [showContours, setShowContours] = useState(true);
  const [showScanlines, setShowScanlines] = useState(true);
  const [showStipple, setShowStipple] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Slider values - Scanlines
  const [scanlineCount, setScanlineCount] = useState(80);
  const [scanlineDisplacement, setScanlineDisplacement] = useState(0.3);
  const [scanlineThickness, setScanlineThickness] = useState(2.0);
  const [scanlineSpeed, setScanlineSpeed] = useState(0.03);

  // Slider values - Contours
  const [contourInterval, setContourInterval] = useState(0.015);
  const [contourThickness, setContourThickness] = useState(1.0);
  const [contourAlpha, setContourAlpha] = useState(0.9);

  // Slider values - Stipple
  const [stippleScale, setStippleScale] = useState(1.0);
  const [stippleThreshold, setStippleThreshold] = useState(0.6);
  const [stippleAlpha, setStippleAlpha] = useState(0.35);

  // Create a placeholder texture
  const createPlaceholderTexture = () => {
    const data = new Uint8Array([128, 128, 128, 255]);
    const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  };

  // Initialize custom uniforms - these will be passed to BaseExperimentShader
  const [customUniforms] = useState(() => {
    const placeholder = createPlaceholderTexture();

    return {
      // Depth map texture
      u_depthMap: { value: placeholder },

      // Layer toggles
      u_showContours: { value: true },
      u_showStipple: { value: false },
      u_showDissolution: { value: false },
      u_debugMode: { value: true },

      // Contour layer
      u_contour_interval: { value: 0.015 },  // Smaller = more lines
      u_contour_thickness: { value: 1.0 },
      u_contour_alpha: { value: 0.9 },

      // Scanline layer (Joy Division style)
      u_showScanlines: { value: true },
      u_scanline_count: { value: 80.0 },        // Number of horizontal lines
      u_scanline_displacement: { value: 0.3 },  // How much depth pushes lines
      u_scanline_thickness: { value: 2.0 },     // Line thickness
      u_scanline_scrollSpeed: { value: 0.03 },  // Very slow upward drift

      // Stipple layer
      u_stipple_scale: { value: 1.0 },
      u_stipple_threshold: { value: 0.6 },
      u_stipple_alpha: { value: 0.35 },

      // Dissolution layer
      u_dissolve_progress: { value: 0.0 },
      u_dissolve_noiseScale: { value: 4.0 },
      u_dissolve_edgeWidth: { value: 0.08 },
      u_dissolve_edgeColor: { value: new THREE.Vector3(0.53, 0.66, 0.84) },
    };
  });

  // Load depth map texture
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/hand/hand_depth.png',
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        customUniforms.u_depthMap.value = texture;
        textureRef.current = texture;
        setTextureLoaded(true);
        console.log('V18: Depth map texture loaded successfully');
      },
      (progress) => {
        console.log('V18: Loading texture...', progress);
      },
      (error) => {
        console.error('V18: Error loading depth map texture:', error);
      }
    );

    // Cleanup
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, []);

  // Update layer toggle uniforms
  useEffect(() => {
    customUniforms.u_showContours.value = showContours;
    customUniforms.u_showScanlines.value = showScanlines;
    customUniforms.u_showStipple.value = showStipple;
    customUniforms.u_debugMode.value = debugMode;
  }, [showContours, showScanlines, showStipple, debugMode]);

  // Update scanline uniforms
  useEffect(() => {
    customUniforms.u_scanline_count.value = scanlineCount;
    customUniforms.u_scanline_displacement.value = scanlineDisplacement;
    customUniforms.u_scanline_thickness.value = scanlineThickness;
    customUniforms.u_scanline_scrollSpeed.value = scanlineSpeed;
  }, [scanlineCount, scanlineDisplacement, scanlineThickness, scanlineSpeed]);

  // Update contour uniforms
  useEffect(() => {
    customUniforms.u_contour_interval.value = contourInterval;
    customUniforms.u_contour_thickness.value = contourThickness;
    customUniforms.u_contour_alpha.value = contourAlpha;
  }, [contourInterval, contourThickness, contourAlpha]);

  // Update stipple uniforms
  useEffect(() => {
    customUniforms.u_stipple_scale.value = stippleScale;
    customUniforms.u_stipple_threshold.value = stippleThreshold;
    customUniforms.u_stipple_alpha.value = stippleAlpha;
  }, [stippleScale, stippleThreshold, stippleAlpha]);

  // Keyboard navigation and layer toggling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);

      // Layer toggles with number keys
      if (e.key === '1') setShowContours(prev => !prev);
      if (e.key === '2') setShowScanlines(prev => !prev);
      if (e.key === '3') setShowStipple(prev => !prev);

      // Debug toggle with D key
      if (e.key === 'd' || e.key === 'D') {
        setDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Topographic'}`}
        customUniforms={customUniforms}
      />

      {/* Navigation */}
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id || 'v17'}`)}>
            ← PREV
          </NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id || 'v1'}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>

      {/* Mode Controls */}
      <ControlPanel>
        <ModeButton
          $active={debugMode}
          onClick={() => setDebugMode(prev => !prev)}
          style={{ marginBottom: '16px', borderColor: debugMode ? 'rgba(255, 100, 100, 0.6)' : undefined }}
        >
          <span className="key">D</span>
          {debugMode ? 'DEBUG ON' : 'DEBUG OFF'}
        </ModeButton>
        <ModeButton
          $active={visualMode === 1}
          onClick={() => setVisualMode(1)}
        >
          <span className="key">1</span>
          CONTOURS
        </ModeButton>
        <ModeButton
          $active={visualMode === 2}
          onClick={() => setVisualMode(2)}
        >
          <span className="key">2</span>
          + STIPPLE
        </ModeButton>
        <ModeButton
          $active={visualMode === 3}
          onClick={() => setVisualMode(3)}
        >
          <span className="key">3</span>
          + DISSOLVE
        </ModeButton>
      </ControlPanel>

      {/* Info Panel */}
      <InfoPanel>
        <h3>Topographic Hand</h3>
        <p>
          Depth map visualization with toggleable layers.
          Contour lines follow the hand's surface topology.
        </p>
        <p className="mode-info">
          Current: {debugMode ? 'DEBUG MODE' : modeDescriptions[visualMode]}
          {!textureLoaded && ' (Loading texture...)'}
        </p>
      </InfoPanel>
    </>
  );
};

export default TopographicHandExperiment;
