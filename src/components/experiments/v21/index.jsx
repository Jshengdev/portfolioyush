import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/contour_luminance.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V21: Oscilloscope Waveform Hand (Enhanced)
 *
 * Joy Division meets CRT oscilloscope
 * - FBM noise for complex, organic displacement
 * - Exponential amplitude mapping (highlights dramatic, shadows calm)
 * - Variable line thickness (bold highlights, whisper shadows)
 * - Edge-enhanced displacement (form boundaries ripple more)
 * - Vertical micro-displacement (lines wrap around form)
 */

const CURRENT_ID = 'v21';

// ═══════════════════════════════════════════════════════════════════
// TENDRIL SYSTEM CONSTANTS
// ═══════════════════════════════════════════════════════════════════
const MAX_TENDRILS = 20;

// Create initial tendril state
const createTendril = () => ({
  active: false,
  p0: { x: 0, y: 0 },        // Origin (on hand)
  p1: { x: 0, y: 0 },        // Control point (creates arc)
  p2: { x: 0, y: 0 },        // End point (toward cursor)
  target: { x: 0, y: 0 },    // Where P2 is trying to reach
  velocity: { x: 0, y: 0 },  // Spring velocity
  activationTime: 0,
  extension: 0,              // 0-1 how far it's grown
  thickness: 1.0,
  wobblePhase: Math.random() * Math.PI * 2,
  growthSpeed: 0.8 + Math.random() * 0.4,
});

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

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
  & > * { pointer-events: auto; }
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
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;
  width: 200px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const SectionLabel = styled.div`
  font-size: 8px;
  letter-spacing: 1.5px;
  color: rgba(136, 169, 215, 0.8);
  text-transform: uppercase;
  margin-top: 8px;
  margin-bottom: 2px;
  padding-left: 2px;
  font-weight: 500;
`;

const SliderContainer = styled.div`
  padding: 4px 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;

  span {
    font-size: 8px;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.5);
  }

  .value {
    color: rgba(255, 255, 255, 0.7);
    font-family: monospace;
    font-size: 9px;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 2px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 8px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 8px;
    height: 8px;
    background: rgba(136, 169, 215, 0.9);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const InfoPanel = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  max-width: 220px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;

  h3 {
    margin: 0 0 6px 0;
    font-size: 11px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    font-weight: 400;
  }

  p {
    margin: 0;
    font-size: 10px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.5);
  }

  .status {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(136, 169, 215, 0.8);
    font-size: 9px;
  }
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const ModeButton = styled.button`
  flex: 1;
  padding: 4px 0;
  font-size: 8px;
  letter-spacing: 0.5px;
  border: 1px solid ${props => props.$active ? 'rgba(136, 169, 215, 0.8)' : 'rgba(255, 255, 255, 0.15)'};
  background: ${props => props.$active ? 'rgba(136, 169, 215, 0.2)' : 'transparent'};
  color: ${props => props.$active ? 'rgba(136, 169, 215, 1)' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'PP Neue Montreal', sans-serif;

  &:hover {
    border-color: rgba(136, 169, 215, 0.5);
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const ToggleLabel = styled.span`
  font-size: 8px;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.5);
`;

const Toggle = styled.button`
  width: 32px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$on ? 'rgba(136, 169, 215, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$on ? 'rgba(136, 169, 215, 0.4)' : 'rgba(0, 0, 0, 0.3)'};
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$on ? '16px' : '2px'};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.$on ? 'rgba(136, 169, 215, 1)' : 'rgba(255, 255, 255, 0.4)'};
    transition: all 0.15s ease;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// EXPERIMENT
// ═══════════════════════════════════════════════════════════════════

const Experiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const depthTexRef = useRef(null);
  const originalTexRef = useRef(null);

  // Scanline parameters
  const [lineCount, setLineCount] = useState(180);
  const [lineThickness, setLineThickness] = useState(1.4);

  // FBM Noise parameters
  const [amplitude, setAmplitude] = useState(1.5);
  const [noiseScale, setNoiseScale] = useState(6.0);
  const [noiseSpeed, setNoiseSpeed] = useState(0.3);
  const [octaves, setOctaves] = useState(4);
  const [lacunarity, setLacunarity] = useState(2.0);
  const [persistence, setPersistence] = useState(0.45);

  // Amplitude mapping
  const [amplitudeGamma, setAmplitudeGamma] = useState(1.8);
  const [bgAmplitude, setBgAmplitude] = useState(0.2);

  // Variable thickness
  const [thicknessRange, setThicknessRange] = useState(2.5);

  // Edge enhancement
  const [edgeMultiplier, setEdgeMultiplier] = useState(1.3);
  const [edgeThreshold, setEdgeThreshold] = useState(0.05);

  // Vertical displacement
  const [verticalScale, setVerticalScale] = useState(0.05);

  // Dash parameters
  const [dashWidth, setDashWidth] = useState(0.012);
  const [dashDensity, setDashDensity] = useState(0.9);

  // Bloom parameters
  const [bloomStrength, setBloomStrength] = useState(1.4);
  const [bloomRadius, setBloomRadius] = useState(2.5);
  const [contrast, setContrast] = useState(2.0);

  // Phase 2: Parallax parameters
  const [parallaxStrength, setParallaxStrength] = useState(0.03);
  const [depthInfluence, setDepthInfluence] = useState(0.7);

  // Phase 2: Cursor deformation parameters (emphasized defaults)
  const [cursorRadius, setCursorRadius] = useState(0.25);
  const [cursorStrength, setCursorStrength] = useState(1.5);
  const [cursorFalloff, setCursorFalloff] = useState(1.5);
  const [cursorMode, setCursorMode] = useState(0); // 0=Tangential, 1=Magnetic, 2=Cymatic
  const [tensionStrength, setTensionStrength] = useState(0.7);
  const [waveFrequency, setWaveFrequency] = useState(5.0);
  const [waveSpeed, setWaveSpeed] = useState(2.5);

  // Debug/Visibility toggles
  const [debugMode, setDebugMode] = useState(0); // 0=normal, 1=depth, 2=luminance
  const [useDepth, setUseDepth] = useState(true);
  const [useLuminance, setUseLuminance] = useState(true);
  const [useBloom, setUseBloom] = useState(false); // Default OFF to hide ghost image

  // ═══════════════════════════════════════════════════════════════════
  // TENDRIL SYSTEM STATE
  // ═══════════════════════════════════════════════════════════════════
  const tendrilsRef = useRef(Array(MAX_TENDRILS).fill(null).map(() => createTendril()));
  const hoverTimeRef = useRef(0);
  const [hoverTime, setHoverTime] = useState(0); // For UI display
  const [activeTendrilCount, setActiveTendrilCount] = useState(0); // For UI display

  // Tendril parameters
  const [tendrilTaper, setTendrilTaper] = useState(0.5);
  const [tendrilWobble, setTendrilWobble] = useState(0.1);
  const [tendrilGlow, setTendrilGlow] = useState(0.3);

  const createPlaceholderTexture = () => {
    const data = new Uint8Array([128, 128, 128, 255]);
    const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  };

  const [customUniforms] = useState(() => {
    const placeholder = createPlaceholderTexture();
    return {
      u_depthMap: { value: placeholder },
      u_originalImage: { value: placeholder },
      u_lineCount: { value: 180.0 },
      u_lineThickness: { value: 1.4 },
      u_amplitude: { value: 1.5 },
      u_noiseScale: { value: 6.0 },
      u_noiseSpeed: { value: 0.3 },
      u_octaves: { value: 4.0 },
      u_lacunarity: { value: 2.0 },
      u_persistence: { value: 0.45 },
      u_amplitudeGamma: { value: 1.8 },
      u_bgAmplitude: { value: 0.2 },
      u_thicknessRange: { value: 2.5 },
      u_edgeMultiplier: { value: 1.3 },
      u_edgeThreshold: { value: 0.05 },
      u_verticalScale: { value: 0.05 },
      u_dashWidth: { value: 0.012 },
      u_dashDensity: { value: 0.9 },
      u_bloomStrength: { value: 1.4 },
      u_bloomRadius: { value: 2.5 },
      u_contrast: { value: 2.0 },
      // Phase 2: Parallax
      u_parallaxStrength: { value: 0.03 },
      u_depthInfluence: { value: 0.7 },
      // Phase 2: Cursor deformation (emphasized defaults)
      u_cursorRadius: { value: 0.25 },
      u_cursorStrength: { value: 1.5 },
      u_cursorFalloff: { value: 1.5 },
      u_cursorMode: { value: 0.0 },
      u_tensionStrength: { value: 0.7 },
      u_waveFrequency: { value: 5.0 },
      u_waveSpeed: { value: 2.5 },
      // Debug toggles
      u_debugMode: { value: 0.0 },
      u_useDepth: { value: 1.0 },
      u_useLuminance: { value: 1.0 },
      u_useBloom: { value: 0.0 }, // Default OFF
      // Tendril system
      u_hoverTime: { value: 0.0 },
      u_tendrilCount: { value: 0.0 },
      u_tendrilData: { value: Array(160).fill(0.0) },
      u_tendrilTaper: { value: 0.5 },
      u_tendrilWobble: { value: 0.1 },
      u_tendrilGlow: { value: 0.3 },
    };
  });

  // Load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const depthPath = '/assets/hand/hand2_depth.png';
    const originalPath = '/assets/hand/imagehand2.jpeg';

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) setTexturesLoaded(true);
    };

    loader.load(depthPath, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      depthTexRef.current = texture;
      customUniforms.u_depthMap.value = texture;
      checkLoaded();
    }, undefined, () => checkLoaded());

    loader.load(originalPath, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      originalTexRef.current = texture;
      customUniforms.u_originalImage.value = texture;
      checkLoaded();
    }, undefined, () => checkLoaded());

    return () => {
      if (depthTexRef.current) depthTexRef.current.dispose();
      if (originalTexRef.current) originalTexRef.current.dispose();
    };
  }, []);

  // Update uniforms
  useEffect(() => {
    customUniforms.u_lineCount.value = lineCount;
    customUniforms.u_lineThickness.value = lineThickness;
    customUniforms.u_amplitude.value = amplitude;
    customUniforms.u_noiseScale.value = noiseScale;
    customUniforms.u_noiseSpeed.value = noiseSpeed;
    customUniforms.u_octaves.value = octaves;
    customUniforms.u_lacunarity.value = lacunarity;
    customUniforms.u_persistence.value = persistence;
    customUniforms.u_amplitudeGamma.value = amplitudeGamma;
    customUniforms.u_bgAmplitude.value = bgAmplitude;
    customUniforms.u_thicknessRange.value = thicknessRange;
    customUniforms.u_edgeMultiplier.value = edgeMultiplier;
    customUniforms.u_edgeThreshold.value = edgeThreshold;
    customUniforms.u_verticalScale.value = verticalScale;
    customUniforms.u_dashWidth.value = dashWidth;
    customUniforms.u_dashDensity.value = dashDensity;
    customUniforms.u_bloomStrength.value = bloomStrength;
    customUniforms.u_bloomRadius.value = bloomRadius;
    customUniforms.u_contrast.value = contrast;
    // Phase 2
    customUniforms.u_parallaxStrength.value = parallaxStrength;
    customUniforms.u_depthInfluence.value = depthInfluence;
    customUniforms.u_cursorRadius.value = cursorRadius;
    customUniforms.u_cursorStrength.value = cursorStrength;
    customUniforms.u_cursorFalloff.value = cursorFalloff;
    customUniforms.u_cursorMode.value = cursorMode;
    customUniforms.u_tensionStrength.value = tensionStrength;
    customUniforms.u_waveFrequency.value = waveFrequency;
    customUniforms.u_waveSpeed.value = waveSpeed;
    customUniforms.u_debugMode.value = debugMode;
    customUniforms.u_useDepth.value = useDepth ? 1.0 : 0.0;
    customUniforms.u_useLuminance.value = useLuminance ? 1.0 : 0.0;
    customUniforms.u_useBloom.value = useBloom ? 1.0 : 0.0;
  }, [lineCount, lineThickness, amplitude, noiseScale, noiseSpeed, octaves, lacunarity, persistence, amplitudeGamma, bgAmplitude, thicknessRange, edgeMultiplier, edgeThreshold, verticalScale, dashWidth, dashDensity, bloomStrength, bloomRadius, contrast, parallaxStrength, depthInfluence, cursorRadius, cursorStrength, cursorFalloff, cursorMode, tensionStrength, waveFrequency, waveSpeed, debugMode, useDepth, useLuminance, useBloom]);

  // ═══════════════════════════════════════════════════════════════════
  // TENDRIL ANIMATION SYSTEM
  // ═══════════════════════════════════════════════════════════════════

  // Check if cursor is roughly over the hand (simple bounding box)
  const checkCursorOnHand = (mousePos) => {
    // Hand is roughly in center-right of image
    // Approximate bounding box in normalized UV coordinates
    const handBounds = {
      minX: 0.25,
      maxX: 0.75,
      minY: 0.2,
      maxY: 0.85
    };
    return mousePos.x >= handBounds.minX && mousePos.x <= handBounds.maxX &&
           mousePos.y >= handBounds.minY && mousePos.y <= handBounds.maxY;
  };

  // Spawn a new tendril at a random point near cursor
  const spawnTendril = (mousePos) => {
    const slot = tendrilsRef.current.findIndex(t => !t.active);
    if (slot === -1) return;

    const t = tendrilsRef.current[slot];
    t.active = true;
    t.activationTime = performance.now();

    // P0: Random point around cursor (origin on hand)
    const angle = Math.random() * Math.PI * 2;
    const dist = 0.05 + Math.random() * 0.1;
    t.p0.x = mousePos.x + Math.cos(angle) * dist;
    t.p0.y = mousePos.y + Math.sin(angle) * dist;

    // P1: Control point between P0 and cursor with perpendicular offset
    const perpAngle = angle + Math.PI / 2;
    const arcOffset = (Math.random() - 0.5) * 0.1;
    t.p1.x = (t.p0.x + mousePos.x) / 2 + Math.cos(perpAngle) * arcOffset;
    t.p1.y = (t.p0.y + mousePos.y) / 2 + Math.sin(perpAngle) * arcOffset;

    // P2: Starts at P0, will grow toward cursor
    t.p2.x = t.p0.x;
    t.p2.y = t.p0.y;
    t.target.x = mousePos.x;
    t.target.y = mousePos.y;

    t.extension = 0;
    t.velocity = { x: 0, y: 0 };
    t.thickness = 0.8 + Math.random() * 0.4;
    t.wobblePhase = Math.random() * Math.PI * 2;
    t.growthSpeed = 0.8 + Math.random() * 0.4;
  };

  // Update a single tendril with spring physics
  const updateTendril = (t, deltaTime, mousePos) => {
    const SPRING_STRENGTH = 2.5;
    const FRICTION = 0.85;
    const GROWTH_SPEED = 0.5;

    // Update target to current cursor position
    t.target.x = mousePos.x;
    t.target.y = mousePos.y;

    // Spring physics on P2 (end point chases cursor)
    const dx = t.target.x - t.p2.x;
    const dy = t.target.y - t.p2.y;

    t.velocity.x += dx * SPRING_STRENGTH * deltaTime;
    t.velocity.y += dy * SPRING_STRENGTH * deltaTime;

    t.velocity.x *= Math.pow(FRICTION, deltaTime * 60);
    t.velocity.y *= Math.pow(FRICTION, deltaTime * 60);

    t.p2.x += t.velocity.x * deltaTime;
    t.p2.y += t.velocity.y * deltaTime;

    // Extension grows over time (0 → 1 over ~2 seconds)
    t.extension = Math.min(1.0, t.extension + GROWTH_SPEED * t.growthSpeed * deltaTime);

    // Update control point to create arc with wobble
    const midX = (t.p0.x + t.p2.x) / 2;
    const midY = (t.p0.y + t.p2.y) / 2;
    const perpX = -(t.p2.y - t.p0.y);
    const perpY = (t.p2.x - t.p0.x);
    const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);

    if (perpLen > 0.001) {
      const wobble = Math.sin(performance.now() * 0.003 + t.wobblePhase) * tendrilWobble;
      t.p1.x = midX + (perpX / perpLen) * (0.05 + wobble);
      t.p1.y = midY + (perpY / perpLen) * (0.05 + wobble);
    }
  };

  // Retract a tendril (when cursor leaves hand)
  const retractTendril = (t, deltaTime) => {
    const RETRACT_SPEED = 1.5;
    t.extension = Math.max(0, t.extension - RETRACT_SPEED * deltaTime);
    if (t.extension <= 0) {
      t.active = false;
    }
  };

  // Pack tendril data into uniform array for shader
  const packTendrilUniforms = (uniforms) => {
    const data = uniforms.u_tendrilData.value;
    let count = 0;

    tendrilsRef.current.forEach((t) => {
      if (!t.active) return;
      const offset = count * 8;

      data[offset + 0] = t.p0.x;
      data[offset + 1] = t.p0.y;
      data[offset + 2] = t.p1.x;
      data[offset + 3] = t.p1.y;
      data[offset + 4] = t.p2.x;
      data[offset + 5] = t.p2.y;
      data[offset + 6] = t.extension;
      data[offset + 7] = t.thickness;

      count++;
    });

    uniforms.u_tendrilCount.value = count;
    setActiveTendrilCount(count);
  };

  // Main tendril update function called every frame
  const updateTendrils = (deltaTime, uniforms) => {
    // Defensive check - ensure uniforms exist
    if (!uniforms || !uniforms.u_mouse || !uniforms.u_tendrilData) {
      return;
    }

    const mousePos = {
      x: 1.0 - uniforms.u_mouse.value.x, // Flip X to match texture space
      y: uniforms.u_mouse.value.y
    };

    const cursorOnHand = checkCursorOnHand(mousePos);

    if (cursorOnHand) {
      // Accumulate hover time
      hoverTimeRef.current += deltaTime;

      // Calculate target tendril count based on escalation
      const escalation = Math.min(hoverTimeRef.current / 5.0, 1.0);
      const targetCount = Math.floor(3 + escalation * 17); // 3 at start, 20 at max

      // Spawn tendrils up to target count
      const activeCount = tendrilsRef.current.filter(t => t.active).length;
      if (activeCount < targetCount) {
        // Spawn one per frame for gradual buildup
        spawnTendril(mousePos);
      }

      // Update active tendrils
      tendrilsRef.current.forEach((t) => {
        if (t.active) {
          updateTendril(t, deltaTime, mousePos);
        }
      });
    } else {
      // Decay hover time
      hoverTimeRef.current = Math.max(0, hoverTimeRef.current - deltaTime * 0.5);

      // Retract all tendrils
      tendrilsRef.current.forEach((t) => {
        if (t.active) {
          retractTendril(t, deltaTime);
        }
      });
    }

    // Update uniforms
    uniforms.u_hoverTime.value = hoverTimeRef.current;
    uniforms.u_tendrilTaper.value = tendrilTaper;
    uniforms.u_tendrilWobble.value = tendrilWobble;
    uniforms.u_tendrilGlow.value = tendrilGlow;

    packTendrilUniforms(uniforms);

    // Update UI state (throttled to ~10fps to avoid too many re-renders)
    if (Math.floor(hoverTimeRef.current * 10) !== Math.floor(hoverTime * 10)) {
      setHoverTime(hoverTimeRef.current);
    }
  };

  // onFrame callback for BaseExperimentShader
  const handleFrame = useCallback((deltaTime, uniforms) => {
    updateTendrils(deltaTime, uniforms);
  }, [tendrilTaper, tendrilWobble, tendrilGlow]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Waveform'}`}
        customUniforms={customUniforms}
        onFrame={handleFrame}
      />

      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>← BACK</NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id}`)}>← PREV</NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id}`)}>NEXT →</NavButton>
        </NavGroup>
      </NavOverlay>

      <ControlPanel>
        <SectionLabel>Debug / Layers</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>View</span></SliderLabel>
          <ModeSelector>
            <ModeButton $active={debugMode === 0} onClick={() => setDebugMode(0)}>Effect</ModeButton>
            <ModeButton $active={debugMode === 1} onClick={() => setDebugMode(1)}>Depth</ModeButton>
            <ModeButton $active={debugMode === 2} onClick={() => setDebugMode(2)}>Photo</ModeButton>
          </ModeSelector>
        </SliderContainer>
        <ToggleRow>
          <ToggleLabel>Use Depth Map</ToggleLabel>
          <Toggle $on={useDepth} onClick={() => setUseDepth(!useDepth)} />
        </ToggleRow>
        <ToggleRow>
          <ToggleLabel>Use Luminance</ToggleLabel>
          <Toggle $on={useLuminance} onClick={() => setUseLuminance(!useLuminance)} />
        </ToggleRow>
        <ToggleRow>
          <ToggleLabel>Show Bloom (ghost)</ToggleLabel>
          <Toggle $on={useBloom} onClick={() => setUseBloom(!useBloom)} />
        </ToggleRow>

        <SectionLabel>Scanlines</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Lines</span><span className="value">{lineCount}</span></SliderLabel>
          <Slider type="range" min="40" max="180" step="5" value={lineCount} onChange={(e) => setLineCount(parseInt(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Thickness</span><span className="value">{lineThickness.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="0.3" max="2.0" step="0.1" value={lineThickness} onChange={(e) => setLineThickness(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Thickness Range</span><span className="value">{thicknessRange.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="0" max="4" step="0.2" value={thicknessRange} onChange={(e) => setThicknessRange(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>FBM Noise</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Amplitude</span><span className="value">{amplitude.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="2" step="0.05" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Octaves</span><span className="value">{octaves}</span></SliderLabel>
          <Slider type="range" min="2" max="6" step="1" value={octaves} onChange={(e) => setOctaves(parseInt(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Lacunarity</span><span className="value">{lacunarity.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1.5" max="2.5" step="0.1" value={lacunarity} onChange={(e) => setLacunarity(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Persistence</span><span className="value">{persistence.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.3" max="0.7" step="0.05" value={persistence} onChange={(e) => setPersistence(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Scale</span><span className="value">{noiseScale.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1" max="10" step="0.5" value={noiseScale} onChange={(e) => setNoiseScale(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Speed</span><span className="value">{noiseSpeed.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="1" step="0.05" value={noiseSpeed} onChange={(e) => setNoiseSpeed(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Amplitude Mapping</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Gamma</span><span className="value">{amplitudeGamma.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1" max="4" step="0.1" value={amplitudeGamma} onChange={(e) => setAmplitudeGamma(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>BG Amplitude</span><span className="value">{bgAmplitude.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="0.3" step="0.02" value={bgAmplitude} onChange={(e) => setBgAmplitude(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Edge Enhancement</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Multiplier</span><span className="value">{edgeMultiplier.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="0" max="5" step="0.25" value={edgeMultiplier} onChange={(e) => setEdgeMultiplier(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Threshold</span><span className="value">{edgeThreshold.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.01" max="0.1" step="0.005" value={edgeThreshold} onChange={(e) => setEdgeThreshold(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Vertical</span><span className="value">{verticalScale.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="0.5" step="0.02" value={verticalScale} onChange={(e) => setVerticalScale(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Dashes</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Width</span><span className="value">{dashWidth.toFixed(3)}</span></SliderLabel>
          <Slider type="range" min="0.005" max="0.05" step="0.002" value={dashWidth} onChange={(e) => setDashWidth(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Density</span><span className="value">{dashDensity.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.3" max="1" step="0.05" value={dashDensity} onChange={(e) => setDashDensity(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Bloom</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Strength</span><span className="value">{bloomStrength.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="2" step="0.1" value={bloomStrength} onChange={(e) => setBloomStrength(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Radius</span><span className="value">{bloomRadius.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1" max="5" step="0.25" value={bloomRadius} onChange={(e) => setBloomRadius(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Contrast</span><span className="value">{contrast.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1" max="3" step="0.1" value={contrast} onChange={(e) => setContrast(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Parallax</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Strength</span><span className="value">{parallaxStrength.toFixed(3)}</span></SliderLabel>
          <Slider type="range" min="0" max="0.1" step="0.005" value={parallaxStrength} onChange={(e) => setParallaxStrength(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Depth Influence</span><span className="value">{depthInfluence.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="1" step="0.05" value={depthInfluence} onChange={(e) => setDepthInfluence(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Cursor Deformation</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Mode</span></SliderLabel>
          <ModeSelector>
            <ModeButton $active={cursorMode === 0} onClick={() => setCursorMode(0)}>Flow</ModeButton>
            <ModeButton $active={cursorMode === 1} onClick={() => setCursorMode(1)}>Bulge</ModeButton>
            <ModeButton $active={cursorMode === 2} onClick={() => setCursorMode(2)}>Ripple</ModeButton>
          </ModeSelector>
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Radius</span><span className="value">{cursorRadius.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.05" max="0.4" step="0.01" value={cursorRadius} onChange={(e) => setCursorRadius(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Strength</span><span className="value">{cursorStrength.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="2" step="0.05" value={cursorStrength} onChange={(e) => setCursorStrength(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Falloff</span><span className="value">{cursorFalloff.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.5" max="3" step="0.1" value={cursorFalloff} onChange={(e) => setCursorFalloff(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Tension</span><span className="value">{tensionStrength.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="1" step="0.05" value={tensionStrength} onChange={(e) => setTensionStrength(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Cymatic (Ripple Mode)</SectionLabel>
        <SliderContainer>
          <SliderLabel><span>Wave Freq</span><span className="value">{waveFrequency.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="1" max="10" step="0.5" value={waveFrequency} onChange={(e) => setWaveFrequency(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Wave Speed</span><span className="value">{waveSpeed.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="5" step="0.1" value={waveSpeed} onChange={(e) => setWaveSpeed(parseFloat(e.target.value))} />
        </SliderContainer>

        <SectionLabel>Tendrils (The Reaching)</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>Hover Time</span>
            <span className="value">{hoverTime.toFixed(1)}s</span>
          </SliderLabel>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(hoverTime / 5.0, 1.0) * 100}%`,
              height: '100%',
              background: hoverTime >= 5 ? 'rgba(255,100,100,0.8)' : 'rgba(136, 169, 215, 0.6)',
              transition: 'width 0.1s'
            }} />
          </div>
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>Active Tendrils</span>
            <span className="value">{activeTendrilCount}/20</span>
          </SliderLabel>
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Taper</span><span className="value">{tendrilTaper.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="1" step="0.05" value={tendrilTaper} onChange={(e) => setTendrilTaper(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Wobble</span><span className="value">{tendrilWobble.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="0.3" step="0.02" value={tendrilWobble} onChange={(e) => setTendrilWobble(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Glow</span><span className="value">{tendrilGlow.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="1" step="0.05" value={tendrilGlow} onChange={(e) => setTendrilGlow(parseFloat(e.target.value))} />
        </SliderContainer>
      </ControlPanel>

      <InfoPanel>
        <h3>Oscilloscope</h3>
        <p>
          Lines deform like fabric. Hover over the hand and tendrils will reach toward your cursor. The longer you stay, the more they reach.
        </p>
        <p className="status">
          {texturesLoaded ? '● Loaded' : '○ Loading...'}
        </p>
      </InfoPanel>
    </>
  );
};

export default Experiment;
