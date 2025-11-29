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

const ZIndexContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 14px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const ZIndexLabel = styled.span`
  font-size: 10px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
`;

const ZIndexInput = styled.input`
  width: 50px;
  height: 28px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(136, 169, 215, 0.4);
  border-radius: 4px;
  color: rgba(136, 169, 215, 0.9);
  font-family: monospace;
  font-size: 12px;
  text-align: center;
  outline: none;

  &:focus {
    border-color: rgba(136, 169, 215, 0.8);
    box-shadow: 0 0 8px rgba(136, 169, 215, 0.3);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
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

  // Reaction-Diffusion state
  const [showReactionDiffusion, setShowReactionDiffusion] = useState(false);
  const [rdFeedRate, setRdFeedRate] = useState(0.055);      // f: 0.01-0.1 (sweet spot ~0.055)
  const [rdKillRate, setRdKillRate] = useState(0.062);      // k: 0.045-0.07 (sweet spot ~0.062)
  const [rdDiffusionA, setRdDiffusionA] = useState(1.0);    // dA: 0.5-1.0
  const [rdDiffusionB, setRdDiffusionB] = useState(0.5);    // dB: 0.1-0.5
  const [rdSpeed, setRdSpeed] = useState(1.0);              // Simulation speed multiplier
  const [rdScale, setRdScale] = useState(2.0);              // Pattern scale

  // Ridgeline state (Joy Division style)
  const [showRidgeline, setShowRidgeline] = useState(false);
  const [ridgeCount, setRidgeCount] = useState(60);         // Number of lines
  const [ridgeAmplitude, setRidgeAmplitude] = useState(1.0); // Displacement amount
  const [ridgeThickness, setRidgeThickness] = useState(2.0); // Line thickness
  const [ridgeGlow, setRidgeGlow] = useState(1.0);          // Glow intensity
  const [ridgeSpeed, setRidgeSpeed] = useState(0.3);        // Animation speed
  const [ridgeSharpness, setRidgeSharpness] = useState(3.0); // Peak sharpness
  const [ridgeFillStyle, setRidgeFillStyle] = useState(0.0); // Fill: 0=black, 0.5=gradient, 1=depth
  const [ridgeWaveFreq, setRidgeWaveFreq] = useState(5.0);   // Wave frequency along X

  // Z-Index layer ordering (Photoshop-like stacking)
  // Lower values = behind, Higher values = in front
  const [zindexContours, setZindexContours] = useState(1);
  const [zindexScanlines, setZindexScanlines] = useState(2);
  const [zindexStipple, setZindexStipple] = useState(3);
  const [zindexRD, setZindexRD] = useState(4);
  const [zindexRidgeline, setZindexRidgeline] = useState(0);

  // Create a placeholder texture
  const createPlaceholderTexture = () => {
    const data = new Uint8Array([128, 128, 128, 255]);
    const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  };

  // Initialize custom uniforms - these will be passed to BaseExperimentShader
  // NOTE: Initial values here should match React state defaults above
  const [customUniforms] = useState(() => {
    const placeholder = createPlaceholderTexture();

    return {
      // Depth map texture
      u_depthMap: { value: placeholder },

      // Layer toggles (match React state: showContours=true, showScanlines=true, showStipple=false, debugMode=false)
      u_showContours: { value: true },
      u_showScanlines: { value: true },
      u_showStipple: { value: false },
      u_showDissolution: { value: false },
      u_debugMode: { value: false },

      // Contour layer
      u_contour_interval: { value: 0.015 },
      u_contour_thickness: { value: 1.0 },
      u_contour_alpha: { value: 0.9 },

      // Scanline layer (Joy Division style)
      u_scanline_count: { value: 80.0 },
      u_scanline_displacement: { value: 0.3 },
      u_scanline_thickness: { value: 2.0 },
      u_scanline_scrollSpeed: { value: 0.03 },

      // Stipple layer
      u_stipple_scale: { value: 1.0 },
      u_stipple_threshold: { value: 0.6 },
      u_stipple_alpha: { value: 0.35 },

      // Dissolution layer
      u_dissolve_progress: { value: 0.0 },
      u_dissolve_noiseScale: { value: 4.0 },
      u_dissolve_edgeWidth: { value: 0.08 },
      u_dissolve_edgeColor: { value: new THREE.Vector3(0.53, 0.66, 0.84) },

      // Reaction-Diffusion layer
      u_showReactionDiffusion: { value: false },
      u_rd_feedRate: { value: 0.055 },
      u_rd_killRate: { value: 0.062 },
      u_rd_diffusionA: { value: 1.0 },
      u_rd_diffusionB: { value: 0.5 },
      u_rd_speed: { value: 1.0 },
      u_rd_scale: { value: 2.0 },

      // Ridgeline layer (Joy Division style)
      u_showRidgeline: { value: false },
      u_ridge_count: { value: 60.0 },
      u_ridge_amplitude: { value: 1.0 },
      u_ridge_thickness: { value: 2.0 },
      u_ridge_glow: { value: 1.0 },
      u_ridge_speed: { value: 0.3 },
      u_ridge_sharpness: { value: 3.0 },
      u_ridge_fillStyle: { value: 0.0 },
      u_ridge_waveFreq: { value: 5.0 },

      // Z-Index layer ordering
      u_zindex_contours: { value: 1.0 },
      u_zindex_scanlines: { value: 2.0 },
      u_zindex_stipple: { value: 3.0 },
      u_zindex_rd: { value: 4.0 },
      u_zindex_ridgeline: { value: 0.0 },
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

  // Update Reaction-Diffusion uniforms
  useEffect(() => {
    customUniforms.u_showReactionDiffusion.value = showReactionDiffusion;
    customUniforms.u_rd_feedRate.value = rdFeedRate;
    customUniforms.u_rd_killRate.value = rdKillRate;
    customUniforms.u_rd_diffusionA.value = rdDiffusionA;
    customUniforms.u_rd_diffusionB.value = rdDiffusionB;
    customUniforms.u_rd_speed.value = rdSpeed;
    customUniforms.u_rd_scale.value = rdScale;
  }, [showReactionDiffusion, rdFeedRate, rdKillRate, rdDiffusionA, rdDiffusionB, rdSpeed, rdScale]);

  // Update Ridgeline uniforms
  useEffect(() => {
    customUniforms.u_showRidgeline.value = showRidgeline;
    customUniforms.u_ridge_count.value = ridgeCount;
    customUniforms.u_ridge_amplitude.value = ridgeAmplitude;
    customUniforms.u_ridge_thickness.value = ridgeThickness;
    customUniforms.u_ridge_glow.value = ridgeGlow;
    customUniforms.u_ridge_speed.value = ridgeSpeed;
    customUniforms.u_ridge_sharpness.value = ridgeSharpness;
    customUniforms.u_ridge_fillStyle.value = ridgeFillStyle;
    customUniforms.u_ridge_waveFreq.value = ridgeWaveFreq;
  }, [showRidgeline, ridgeCount, ridgeAmplitude, ridgeThickness, ridgeGlow, ridgeSpeed, ridgeSharpness, ridgeFillStyle, ridgeWaveFreq]);

  // Update Z-Index uniforms
  useEffect(() => {
    customUniforms.u_zindex_contours.value = zindexContours;
    customUniforms.u_zindex_scanlines.value = zindexScanlines;
    customUniforms.u_zindex_stipple.value = zindexStipple;
    customUniforms.u_zindex_rd.value = zindexRD;
    customUniforms.u_zindex_ridgeline.value = zindexRidgeline;
  }, [zindexContours, zindexScanlines, zindexStipple, zindexRD, zindexRidgeline]);

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
      if (e.key === '4') setShowReactionDiffusion(prev => !prev);
      if (e.key === '5') setShowRidgeline(prev => !prev);

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

      {/* Layer Controls */}
      <ControlPanel>
        {/* Debug Toggle */}
        <ToggleButton
          $active={debugMode}
          onClick={() => setDebugMode(prev => !prev)}
          style={{ borderColor: debugMode ? 'rgba(255, 100, 100, 0.6)' : undefined }}
        >
          <span>{debugMode ? 'DEBUG ON' : 'DEBUG OFF'}</span>
          <span className="key">D</span>
        </ToggleButton>

        {/* Layer Toggles */}
        <SectionLabel>Layers</SectionLabel>
        <ToggleButton
          $active={showContours}
          onClick={() => setShowContours(prev => !prev)}
        >
          <span>CONTOURS</span>
          <span className="key">1</span>
        </ToggleButton>
        <ToggleButton
          $active={showScanlines}
          onClick={() => setShowScanlines(prev => !prev)}
        >
          <span>SCANLINES</span>
          <span className="key">2</span>
        </ToggleButton>
        <ToggleButton
          $active={showStipple}
          onClick={() => setShowStipple(prev => !prev)}
        >
          <span>STIPPLE</span>
          <span className="key">3</span>
        </ToggleButton>

        {/* Contour Sliders */}
        <SectionLabel>Contours</SectionLabel>
        <SliderContainer className={!showContours ? 'disabled' : ''}>
          <SliderLabel>
            <span>DENSITY</span>
            <span className="value">{contourInterval.toFixed(3)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.005"
            max="0.05"
            step="0.001"
            value={contourInterval}
            onChange={(e) => setContourInterval(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showContours ? 'disabled' : ''}>
          <SliderLabel>
            <span>THICKNESS</span>
            <span className="value">{contourThickness.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={contourThickness}
            onChange={(e) => setContourThickness(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showContours ? 'disabled' : ''}>
          <SliderLabel>
            <span>OPACITY</span>
            <span className="value">{contourAlpha.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={contourAlpha}
            onChange={(e) => setContourAlpha(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Scanline Sliders */}
        <SectionLabel>Scanlines</SectionLabel>
        <SliderContainer className={!showScanlines ? 'disabled' : ''}>
          <SliderLabel>
            <span>COUNT</span>
            <span className="value">{scanlineCount}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="20"
            max="200"
            step="5"
            value={scanlineCount}
            onChange={(e) => setScanlineCount(parseInt(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showScanlines ? 'disabled' : ''}>
          <SliderLabel>
            <span>DISPLACEMENT</span>
            <span className="value">{scanlineDisplacement.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={scanlineDisplacement}
            onChange={(e) => setScanlineDisplacement(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showScanlines ? 'disabled' : ''}>
          <SliderLabel>
            <span>THICKNESS</span>
            <span className="value">{scanlineThickness.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="5"
            step="0.25"
            value={scanlineThickness}
            onChange={(e) => setScanlineThickness(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showScanlines ? 'disabled' : ''}>
          <SliderLabel>
            <span>SCROLL SPEED</span>
            <span className="value">{scanlineSpeed.toFixed(3)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="0.2"
            step="0.005"
            value={scanlineSpeed}
            onChange={(e) => setScanlineSpeed(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Stipple Sliders */}
        <SectionLabel>Stipple</SectionLabel>
        <SliderContainer className={!showStipple ? 'disabled' : ''}>
          <SliderLabel>
            <span>SCALE</span>
            <span className="value">{stippleScale.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={stippleScale}
            onChange={(e) => setStippleScale(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showStipple ? 'disabled' : ''}>
          <SliderLabel>
            <span>DENSITY</span>
            <span className="value">{stippleThreshold.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.2"
            max="1"
            step="0.05"
            value={stippleThreshold}
            onChange={(e) => setStippleThreshold(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showStipple ? 'disabled' : ''}>
          <SliderLabel>
            <span>OPACITY</span>
            <span className="value">{stippleAlpha.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={stippleAlpha}
            onChange={(e) => setStippleAlpha(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Reaction-Diffusion Sliders */}
        <SectionLabel>Reaction-Diffusion</SectionLabel>
        <ToggleButton
          $active={showReactionDiffusion}
          onClick={() => setShowReactionDiffusion(prev => !prev)}
        >
          <span>REACTION-DIFF</span>
          <span className="key">4</span>
        </ToggleButton>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>FEED RATE</span>
            <span className="value">{rdFeedRate.toFixed(3)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.01"
            max="0.1"
            step="0.001"
            value={rdFeedRate}
            onChange={(e) => setRdFeedRate(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>KILL RATE</span>
            <span className="value">{rdKillRate.toFixed(3)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.045"
            max="0.07"
            step="0.001"
            value={rdKillRate}
            onChange={(e) => setRdKillRate(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>DIFFUSION A</span>
            <span className="value">{rdDiffusionA.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="1.0"
            step="0.05"
            value={rdDiffusionA}
            onChange={(e) => setRdDiffusionA(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>DIFFUSION B</span>
            <span className="value">{rdDiffusionB.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.1"
            max="0.5"
            step="0.025"
            value={rdDiffusionB}
            onChange={(e) => setRdDiffusionB(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>SPEED</span>
            <span className="value">{rdSpeed.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.1"
            max="3.0"
            step="0.1"
            value={rdSpeed}
            onChange={(e) => setRdSpeed(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showReactionDiffusion ? 'disabled' : ''}>
          <SliderLabel>
            <span>SCALE</span>
            <span className="value">{rdScale.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="5.0"
            step="0.25"
            value={rdScale}
            onChange={(e) => setRdScale(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Ridgeline Sliders (Joy Division) */}
        <SectionLabel>Ridgeline</SectionLabel>
        <ToggleButton
          $active={showRidgeline}
          onClick={() => setShowRidgeline(prev => !prev)}
        >
          <span>RIDGELINE</span>
          <span className="key">5</span>
        </ToggleButton>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>LINE COUNT</span>
            <span className="value">{ridgeCount}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="20"
            max="150"
            step="5"
            value={ridgeCount}
            onChange={(e) => setRidgeCount(parseInt(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>AMPLITUDE</span>
            <span className="value">{ridgeAmplitude.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.1"
            max="2.0"
            step="0.05"
            value={ridgeAmplitude}
            onChange={(e) => setRidgeAmplitude(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>THICKNESS</span>
            <span className="value">{ridgeThickness.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="5.0"
            step="0.25"
            value={ridgeThickness}
            onChange={(e) => setRidgeThickness(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>SHARPNESS</span>
            <span className="value">{ridgeSharpness.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={ridgeSharpness}
            onChange={(e) => setRidgeSharpness(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>GLOW</span>
            <span className="value">{ridgeGlow.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={ridgeGlow}
            onChange={(e) => setRidgeGlow(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>SPEED</span>
            <span className="value">{ridgeSpeed.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={ridgeSpeed}
            onChange={(e) => setRidgeSpeed(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>FILL STYLE</span>
            <span className="value">{ridgeFillStyle.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={ridgeFillStyle}
            onChange={(e) => setRidgeFillStyle(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer className={!showRidgeline ? 'disabled' : ''}>
          <SliderLabel>
            <span>WAVE FREQ</span>
            <span className="value">{ridgeWaveFreq.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={ridgeWaveFreq}
            onChange={(e) => setRidgeWaveFreq(parseFloat(e.target.value))}
          />
        </SliderContainer>
      </ControlPanel>

      {/* Info Panel */}
      <InfoPanel>
        <h3>Topographic Hand</h3>
        <p>
          Depth map visualization with toggleable layers.
          Use sliders to fine-tune each effect.
        </p>
        <p className="mode-info">
          {debugMode ? 'DEBUG MODE' : `Active: ${[
            showContours && 'Contours',
            showScanlines && 'Scanlines',
            showStipple && 'Stipple',
            showReactionDiffusion && 'R-D',
            showRidgeline && 'Ridge'
          ].filter(Boolean).join(', ') || 'None'}`}
          {!textureLoaded && ' (Loading...)'}
        </p>
      </InfoPanel>
    </>
  );
};

export default TopographicHandExperiment;
