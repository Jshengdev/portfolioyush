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
// LASERROPE SYSTEM CONSTANTS (per LASERROPE_SPEC.md)
// ═══════════════════════════════════════════════════════════════════
const MAX_LASERROPES = 7;

// Laserrope phases
const PHASE_IGNITING = 0;   // Glow appearing at origin
const PHASE_EXTENDING = 1;  // Beam growing toward cursor
const PHASE_HOLDING = 2;    // Fully extended, following cursor
const PHASE_RETRACTING = 3; // Pulling back to origin
const PHASE_SNAPPING = 4;   // Snap animation (flash + whip + settle)

// Create initial laserrope state
const createLaserrope = () => ({
  active: false,
  phase: PHASE_IGNITING,
  p0: { x: 0, y: 0 },        // Origin (on oscilloscope line)
  p1: { x: 0, y: 0 },        // Control point (creates arc)
  p2: { x: 0, y: 0 },        // End point (toward cursor)
  target: { x: 0, y: 0 },    // Where P2 is trying to reach
  velocity: { x: 0, y: 0 },  // Spring velocity
  activationTime: 0,
  phaseTime: 0,              // Time in current phase
  extension: 0,              // 0-1 how far it's grown (raw time-based)
  easedExtension: 0,         // 0-1 eased extension for shader
  ignitionGlow: 0,           // 0-1 ignition glow intensity
  thickness: 1.0,
  wobblePhase: Math.random() * Math.PI * 2,
  speedMultiplier: 0.8 + Math.random() * 0.4,  // Per-rope speed variation (0.8-1.2)
  reachFactor: 0.4 + Math.random() * 0.6,      // Per-rope reach variation (0.4-1.0) - some stop short
  // Snap system state (per LASERROPE_SPEC.md)
  restLength: 0,             // Original length when spawned (for stretch calculation)
  stretchRatio: 1.0,         // Current stretch ratio (length / restLength)
  snapFlash: 0,              // 0-1 snap flash intensity
  snapPoint: { x: 0, y: 0 }, // Where the rope snapped (for flash effect)
  snapInertia: { x: 0, y: 0 }, // Velocity at snap moment (for curved retraction)
  cooldownTime: 0,           // Time remaining before can spawn again
  // Curl system state (per LASERROPE_SPEC.md)
  wrapAngle: 0,              // Current wrap angle in degrees (0-180)
  wrapDirection: 1,          // 1 or -1 (clockwise/counter-clockwise)
  contactPoint: { x: 0, y: 0 }, // Point where rope touches bounding circle
  isWrapping: false,         // Whether rope is currently wrapping
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
  // LASERROPE SYSTEM STATE (per LASERROPE_SPEC.md)
  // ═══════════════════════════════════════════════════════════════════
  const laseropesRef = useRef(Array(MAX_LASERROPES).fill(null).map(() => createLaserrope()));
  const hoverTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0.5, y: 0.5 }); // Track cursor for velocity
  const cursorVelocityRef = useRef(0); // Actual cursor speed
  const [hoverTime, setHoverTime] = useState(0); // For UI display
  const [activeLaseropeCount, setActiveLaseropeCount] = useState(0); // For UI display

  // LASERROPE structure parameters (per spec)
  const [ropeDashFrequency, setRopeDashFrequency] = useState(12.0);
  const [ropeGlowRadius, setRopeGlowRadius] = useState(0.006);
  const [ropeGlowIntensity, setRopeGlowIntensity] = useState(0.15);
  const [ropeThickness, setRopeThickness] = useState(0.002);
  const [ropeTipFadeStart, setRopeTipFadeStart] = useState(0.85);

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
      // LASERROPE system (per LASERROPE_SPEC.md)
      u_hoverTime: { value: 0.0 },
      u_laseropeCount: { value: 0.0 },
      u_laseropeData: { value: Array(70).fill(0.0) }, // 7 ropes * 10 floats (added wrap data)
      // Structure parameters
      u_ropeDashFrequency: { value: 12.0 },
      u_ropeGlowRadius: { value: 0.006 },
      u_ropeGlowIntensity: { value: 0.15 },
      u_ropeThickness: { value: 0.002 },
      u_ropeTipFadeStart: { value: 0.85 },
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
  // LASERROPE ANIMATION SYSTEM (per LASERROPE_SPEC.md)
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

  // Spawn a new laserrope - origin on oscilloscope line near cursor
  // Balanced distribution - tries to spawn away from existing lines
  const spawnLaserrope = (mousePos) => {
    const slot = laseropesRef.current.findIndex(t => !t.active);
    if (slot === -1) return;

    const rope = laseropesRef.current[slot];
    rope.active = true;
    rope.activationTime = performance.now();
    rope.phase = PHASE_IGNITING;  // Start with ignition glow
    rope.phaseTime = 0;
    rope.ignitionGlow = 0;

    // Find angles of existing active ropes to avoid clustering
    const activeAngles = laseropesRef.current
      .filter((r, i) => r.active && i !== slot)
      .map(r => Math.atan2(r.p0.y - mousePos.y, r.p0.x - mousePos.x));

    // Find best angle - furthest from existing ropes
    let bestAngle = Math.random() * Math.PI * 2;
    if (activeAngles.length > 0) {
      let maxMinDist = 0;
      for (let i = 0; i < 12; i++) {
        const testAngle = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
        let minDist = Math.PI * 2;
        for (const existingAngle of activeAngles) {
          let diff = Math.abs(testAngle - existingAngle);
          if (diff > Math.PI) diff = Math.PI * 2 - diff;
          minDist = Math.min(minDist, diff);
        }
        if (minDist > maxMinDist) {
          maxMinDist = minDist;
          bestAngle = testAngle;
        }
      }
    }

    // Vary spawn distance more dramatically (0.06-0.18)
    const dist = 0.06 + Math.random() * 0.12;
    rope.p0.x = mousePos.x + Math.cos(bestAngle) * dist;
    rope.p0.y = mousePos.y + Math.sin(bestAngle) * dist * 0.6; // Slightly flattened

    // P1: Control point starts between P0 and cursor
    const perpAngle = bestAngle + Math.PI / 2;
    const arcOffset = (Math.random() - 0.5) * 0.08; // More curve variation
    rope.p1.x = (rope.p0.x + mousePos.x) / 2 + Math.cos(perpAngle) * arcOffset;
    rope.p1.y = (rope.p0.y + mousePos.y) / 2 + Math.sin(perpAngle) * arcOffset;

    // P2: Starts at P0, will chase cursor via spring physics
    rope.p2.x = rope.p0.x;
    rope.p2.y = rope.p0.y;
    rope.target.x = mousePos.x;
    rope.target.y = mousePos.y;

    rope.extension = 0;
    rope.easedExtension = 0;
    rope.velocity = { x: 0, y: 0 };
    // More dramatic thickness variation (0.5-2.0) - longer ropes tend to be thicker
    rope.thickness = 0.5 + Math.random() * 1.5 * (dist / 0.18);
    rope.wobblePhase = Math.random() * Math.PI * 2;
    rope.speedMultiplier = 0.6 + Math.random() * 0.6;   // More speed variation (0.6-1.2)
    rope.reachFactor = 1.0;                             // Always reach full length to touch the ring

    // Snap system init - track rest length for stretch detection
    rope.restLength = Math.sqrt(
      Math.pow(mousePos.x - rope.p0.x, 2) +
      Math.pow(mousePos.y - rope.p0.y, 2)
    );
    rope.stretchRatio = 1.0;
    rope.snapFlash = 0;
    rope.snapPoint = { x: 0, y: 0 };
    rope.snapInertia = { x: 0, y: 0 };

    // Curl system init
    rope.wrapAngle = 0;
    rope.wrapDirection = Math.random() > 0.5 ? 1 : -1; // Random wrap direction
    rope.contactPoint = { x: 0, y: 0 };
    rope.isWrapping = false;
  };

  // Ignition timing (per LASERROPE_SPEC.md)
  const IGNITION_FADE_IN = 0.08;   // 80ms
  const IGNITION_PEAK = 0.12;      // 120ms
  const IGNITION_CONTRACT = 0.08; // 80ms
  const IGNITION_TOTAL = IGNITION_FADE_IN + IGNITION_PEAK + IGNITION_CONTRACT; // 280ms

  // Extension timing (per LASERROPE_SPEC.md)
  const EXTENSION_DURATION = 0.45; // 450ms

  // Snap timing (per LASERROPE_SPEC.md)
  const SNAP_STRETCH_LIMIT = 1.5;     // 150% triggers snap
  const SNAP_FLASH_DURATION = 0.06;   // 60ms flash
  const SNAP_WHIP_DURATION = 0.2;     // 200ms whip retraction
  const SNAP_OVERSHOOT = 0.15;        // 15% past origin
  const SNAP_SETTLE_DURATION = 0.08;  // 80ms settle
  const SNAP_FADE_DURATION = 0.1;     // 100ms fade
  const SNAP_COOLDOWN = 1.0;          // 1s cooldown

  // Curl system (per LASERROPE_SPEC.md)
  const CURL_BOUNDING_RADIUS = 0.03;  // Cursor bounding circle
  const CURL_WRAP_SPEED = 45.0;       // Degrees per second
  const CURL_MAX_WRAP = 180.0;        // Maximum wrap degrees
  const CURL_CONTACT_GLOW = 1.5;      // Contact point glow intensity

  // Ease-out-expo: fast start, slow settle (cubic bezier approx [0.16, 1, 0.3, 1])
  const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  // Ease-out-cubic: quick whip retraction
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // Update a single laserrope with phase-based animation
  const updateLaserrope = (rope, deltaTime, mousePos) => {
    rope.phaseTime += deltaTime;

    // Update target to current cursor position
    rope.target.x = mousePos.x;
    rope.target.y = mousePos.y;

    // === PHASE: IGNITING ===
    if (rope.phase === PHASE_IGNITING) {
      const t = rope.phaseTime;

      if (t < IGNITION_FADE_IN) {
        // Fade in: ease-out-quad
        const p = t / IGNITION_FADE_IN;
        rope.ignitionGlow = 1.0 - (1 - p) * (1 - p); // ease-out-quad
      } else if (t < IGNITION_FADE_IN + IGNITION_PEAK) {
        // Peak with 8Hz shimmer
        const shimmer = Math.sin(t * 8.0 * Math.PI * 2) * 0.15;
        rope.ignitionGlow = 1.0 + shimmer;
      } else if (t < IGNITION_TOTAL) {
        // Contract: ease-in-quad
        const p = (t - IGNITION_FADE_IN - IGNITION_PEAK) / IGNITION_CONTRACT;
        rope.ignitionGlow = 1.0 - p * p; // ease-in-quad (inverted)
      } else {
        // Transition to extending
        rope.phase = PHASE_EXTENDING;
        rope.phaseTime = 0;
        rope.ignitionGlow = 0;
      }
      return; // Don't update position during ignition
    }

    // === SYSTEM 3: EXTENSION with ease-out-expo ===
    // Per LASERROPE_SPEC.md: 450ms duration, fast burst → slow settle
    if (rope.phase === PHASE_EXTENDING) {
      const EXTENSION_DURATION = 0.45; // 450ms per spec

      // Apply per-rope speed variation (0.8-1.2x)
      const adjustedDuration = EXTENSION_DURATION / rope.speedMultiplier;
      const rawProgress = rope.phaseTime / adjustedDuration;

      // Ease-out-expo: fast start, slow settle
      const easedProgress = easeOutExpo(Math.min(1.0, rawProgress));

      // Full extension - always reach 100% to touch the ring
      rope.extension = easedProgress;
      rope.easedExtension = rope.extension;

      // CRITICAL: During extension, p2 position follows the eased extension
      // This makes the "laser shooting" effect visible
      rope.p2.x = rope.p0.x + (rope.target.x - rope.p0.x) * rope.extension;
      rope.p2.y = rope.p0.y + (rope.target.y - rope.p0.y) * rope.extension;

      if (rawProgress >= 1.0) {
        rope.phase = PHASE_HOLDING;
        // Initialize velocity for spring physics in holding phase
        rope.velocity = { x: 0, y: 0 };
      }
    } else if (rope.phase === PHASE_HOLDING) {
      // === TARGETING: Each tendril aims for closest point on ring, not center ===
      const CURSOR_BOUNDING_RADIUS = 0.015; // Increased ring size

      // Calculate closest point on ring from p0 (origin)
      const angleFromOrigin = Math.atan2(rope.p0.y - mousePos.y, rope.p0.x - mousePos.x);
      const ringTargetX = mousePos.x + Math.cos(angleFromOrigin) * CURSOR_BOUNDING_RADIUS;
      const ringTargetY = mousePos.y + Math.sin(angleFromOrigin) * CURSOR_BOUNDING_RADIUS;

      // Update target to ring edge point (not center)
      rope.target.x = ringTargetX;
      rope.target.y = ringTargetY;

      // Spring physics to follow the ring target point
      // Higher spring = tighter tracking, lower friction = less lag
      const SPRING_STRENGTH = 25.0;
      const FRICTION = 0.85;

      const dx = rope.target.x - rope.p2.x;
      const dy = rope.target.y - rope.p2.y;

      rope.velocity.x += dx * SPRING_STRENGTH * deltaTime;
      rope.velocity.y += dy * SPRING_STRENGTH * deltaTime;

      rope.velocity.x *= Math.pow(FRICTION, deltaTime * 60);
      rope.velocity.y *= Math.pow(FRICTION, deltaTime * 60);

      rope.p2.x += rope.velocity.x * deltaTime;
      rope.p2.y += rope.velocity.y * deltaTime;

      // === SYSTEM 5: CURL - Bounding circle + gripping ===
      const distToCenter = Math.sqrt(
        Math.pow(rope.p2.x - mousePos.x, 2) +
        Math.pow(rope.p2.y - mousePos.y, 2)
      );

      // Use same radius as targeting
      if (distToCenter < CURSOR_BOUNDING_RADIUS) {
        // Push rope tip to circle surface
        const angle = Math.atan2(rope.p2.y - mousePos.y, rope.p2.x - mousePos.x);
        rope.p2.x = mousePos.x + Math.cos(angle) * CURSOR_BOUNDING_RADIUS;
        rope.p2.y = mousePos.y + Math.sin(angle) * CURSOR_BOUNDING_RADIUS;

        // Start wrapping - track contact point and grow wrap angle
        if (!rope.isWrapping) {
          rope.isWrapping = true;
          rope.contactPoint = { x: rope.p2.x, y: rope.p2.y };
          rope.wrapAngle = 0;
        }

        // Grow wrap angle over time (45°/sec per spec, up to 180°)
        const WRAP_SPEED = 45.0; // degrees per second
        const MAX_WRAP = 180.0;
        rope.wrapAngle = Math.min(MAX_WRAP, rope.wrapAngle + WRAP_SPEED * deltaTime);

        // Update contact point to current p2 position
        rope.contactPoint = { x: rope.p2.x, y: rope.p2.y };
      } else {
        // Not touching - retract wrap
        if (rope.isWrapping) {
          rope.wrapAngle = Math.max(0, rope.wrapAngle - 90.0 * deltaTime); // Faster retract
          if (rope.wrapAngle <= 0) {
            rope.isWrapping = false;
          }
        }
      }

      rope.easedExtension = rope.extension;

      // === SYSTEM 4: SNAP - Check stretch ratio ===
      const currentLength = Math.sqrt(
        Math.pow(rope.p2.x - rope.p0.x, 2) +
        Math.pow(rope.p2.y - rope.p0.y, 2)
      );
      rope.stretchRatio = currentLength / rope.restLength;

      // Trigger snap at 1.5x stretch
      if (rope.stretchRatio > 1.5) {
        // Store snap point and inertia for whip animation
        rope.snapPoint = { x: rope.p2.x, y: rope.p2.y };
        rope.snapInertia = { x: rope.velocity.x, y: rope.velocity.y };
        rope.phase = PHASE_SNAPPING;
        rope.phaseTime = 0;
        rope.snapFlash = 0; // No visual flash
      }

    } else if (rope.phase === PHASE_SNAPPING) {
      // === SYSTEM 4: SNAP ANIMATION ===
      // Timeline: FLASH (60ms) → WHIP (200ms) → SETTLE (80ms) → FADE (100ms)

      const FLASH_DURATION = 0.06;
      const WHIP_DURATION = 0.2;
      const SETTLE_DURATION = 0.08;
      const FADE_DURATION = 0.1;

      // FLASH phase (0-60ms) - skip visual flash, just timing delay
      if (rope.phaseTime < FLASH_DURATION) {
        rope.snapFlash = 0; // No visual flash
      }
      // WHIP phase (60-260ms) - curved retraction toward origin
      else if (rope.phaseTime < FLASH_DURATION + WHIP_DURATION) {
        rope.snapFlash = 0;
        const whipTime = rope.phaseTime - FLASH_DURATION;
        const t = whipTime / WHIP_DURATION;
        const eased = easeOutCubic(t);

        // Curved path using inertia influence
        const toOriginX = rope.p0.x - rope.snapPoint.x;
        const toOriginY = rope.p0.y - rope.snapPoint.y;
        const toOriginLen = Math.sqrt(toOriginX * toOriginX + toOriginY * toOriginY);

        // Normalize directions
        const dirX = toOriginLen > 0.001 ? toOriginX / toOriginLen : 0;
        const dirY = toOriginLen > 0.001 ? toOriginY / toOriginLen : 0;

        // Mix with inertia for curved path (30% inertia influence)
        const inertiaLen = Math.sqrt(rope.snapInertia.x * rope.snapInertia.x + rope.snapInertia.y * rope.snapInertia.y);
        const inertiaX = inertiaLen > 0.001 ? rope.snapInertia.x / inertiaLen : 0;
        const inertiaY = inertiaLen > 0.001 ? rope.snapInertia.y / inertiaLen : 0;

        const curvedX = dirX * 0.7 + inertiaX * 0.3;
        const curvedY = dirY * 0.7 + inertiaY * 0.3;

        // Position with 15% overshoot
        const overshootDist = toOriginLen * 1.15;
        const currentDist = overshootDist * (1.0 - eased);

        rope.p2.x = rope.p0.x - curvedX * currentDist;
        rope.p2.y = rope.p0.y - curvedY * currentDist;
        rope.easedExtension = Math.max(0, currentDist / rope.restLength);
      }
      // SETTLE phase (260-340ms) - bounce back from overshoot
      else if (rope.phaseTime < FLASH_DURATION + WHIP_DURATION + SETTLE_DURATION) {
        const settleTime = rope.phaseTime - FLASH_DURATION - WHIP_DURATION;
        const t = settleTime / SETTLE_DURATION;
        // Settle from 15% overshoot back to origin
        const overshoot = 0.15 * (1.0 - t * t); // ease-out
        rope.easedExtension = overshoot;
        // Keep p2 near origin with small overshoot
        const angle = Math.atan2(rope.snapPoint.y - rope.p0.y, rope.snapPoint.x - rope.p0.x);
        rope.p2.x = rope.p0.x - Math.cos(angle) * rope.restLength * overshoot;
        rope.p2.y = rope.p0.y - Math.sin(angle) * rope.restLength * overshoot;
      }
      // FADE phase (340-440ms) - fade out
      else if (rope.phaseTime < FLASH_DURATION + WHIP_DURATION + SETTLE_DURATION + FADE_DURATION) {
        rope.easedExtension = 0;
      }
      // Done - deactivate
      else {
        rope.active = false;
      }
    }

    // P1: Control point creates arc with subtle wobble
    const midX = (rope.p0.x + rope.p2.x) / 2;
    const midY = (rope.p0.y + rope.p2.y) / 2;
    const perpX = -(rope.p2.y - rope.p0.y);
    const perpY = (rope.p2.x - rope.p0.x);
    const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);

    if (perpLen > 0.001) {
      // Reduced curvature for straighter, more geometric lines (oscilloscope style)
      const wobble = Math.sin(performance.now() * 0.002 + rope.wobblePhase) * 0.005;
      rope.p1.x = midX + (perpX / perpLen) * (0.01 + wobble);
      rope.p1.y = midY + (perpY / perpLen) * (0.01 + wobble);
    }
  };

  // Retract a laserrope (when cursor leaves hand)
  const retractLaserrope = (rope, deltaTime) => {
    // Don't retract snapping ropes - let them complete their animation
    if (rope.phase === PHASE_SNAPPING) {
      return;
    }

    // Fast cursor movement = instant snap away
    if (cursorVelocityRef.current > 2.0) {
      rope.active = false;
      return;
    }

    // Slow movement = gradual retract
    const RETRACT_SPEED = 1.5;
    rope.easedExtension = Math.max(0, rope.easedExtension - RETRACT_SPEED * deltaTime);
    rope.extension = rope.easedExtension;
    if (rope.easedExtension <= 0) {
      rope.active = false;
    }
  };

  // Pack laserrope data into uniform array for shader
  // Data layout per rope: p0.xy, p1.xy, p2.xy, extension, ignitionGlow, wrapAngle, wrapDirection
  const packLaseropeUniforms = (uniforms) => {
    const data = uniforms.u_laseropeData.value;
    let count = 0;

    laseropesRef.current.forEach((rope) => {
      if (!rope.active) return;
      if (count >= MAX_LASERROPES) return; // Cap at 7
      const offset = count * 10; // Now 10 floats per rope

      data[offset + 0] = rope.p0.x;
      data[offset + 1] = rope.p0.y;
      data[offset + 2] = rope.p1.x;
      data[offset + 3] = rope.p1.y;
      data[offset + 4] = rope.p2.x;
      data[offset + 5] = rope.p2.y;
      data[offset + 6] = rope.easedExtension;
      // Slot 7: dual purpose
      // - Positive (0-1): ignition glow during ignition phase
      // - Negative (-1 to 0): snap progress during snapping phase (abs = progress 0-1)
      if (rope.phase === PHASE_SNAPPING) {
        // Pass snap progress as negative value
        const TOTAL_SNAP_DURATION = 0.06 + 0.2 + 0.08 + 0.1; // flash + whip + settle + fade
        const snapProgress = Math.min(1.0, rope.phaseTime / TOTAL_SNAP_DURATION);
        data[offset + 7] = -snapProgress; // Negative to distinguish from ignition
      } else {
        data[offset + 7] = rope.ignitionGlow;
      }
      // Slot 8: wrap angle (0-1 normalized, where 1 = 180°)
      data[offset + 8] = rope.wrapAngle / 180.0;
      // Slot 9: wrap direction
      data[offset + 9] = rope.wrapDirection;

      count++;
    });

    uniforms.u_laseropeCount.value = count;
    setActiveLaseropeCount(count);
  };

  // Main laserrope update function called every frame
  const updateLaseropes = (deltaTime, uniforms) => {
    // Defensive check - ensure uniforms exist
    if (!uniforms || !uniforms.u_mouse || !uniforms.u_laseropeData) {
      return;
    }

    // Use normalized mouse coordinates with X flip (hand image is mirrored)
    const mousePos = {
      x: 1.0 - uniforms.u_mouse.value.x,
      y: uniforms.u_mouse.value.y
    };

    // Calculate cursor velocity (actual mouse movement speed)
    const dx = mousePos.x - lastMousePosRef.current.x;
    const dy = mousePos.y - lastMousePosRef.current.y;
    cursorVelocityRef.current = Math.sqrt(dx * dx + dy * dy) / deltaTime;
    lastMousePosRef.current = { x: mousePos.x, y: mousePos.y };

    const cursorOnHand = checkCursorOnHand(mousePos);

    if (cursorOnHand) {
      // Accumulate hover time
      hoverTimeRef.current += deltaTime;

      // Calculate target laserrope count - staged spawning
      // 0.0s: 1 rope → 0.5s: +2 (total 3) → 1.0s: +2 (total 5)
      let targetCount;
      if (hoverTimeRef.current < 0.5) {
        targetCount = 1;
      } else if (hoverTimeRef.current < 1.0) {
        targetCount = 3;
      } else {
        targetCount = 5;
      }

      // Spawn laseropes up to target count
      const activeCount = laseropesRef.current.filter(rope => rope.active).length;
      if (activeCount < targetCount) {
        // Spawn one per frame for gradual buildup
        spawnLaserrope(mousePos);
      }

      // Update active laseropes - chase cursor
      laseropesRef.current.forEach((rope) => {
        if (rope.active) {
          updateLaserrope(rope, deltaTime, mousePos);
        }
      });
    } else {
      // Reset hover time immediately when cursor leaves
      // This ensures the spawn sequence replays fresh when cursor returns
      hoverTimeRef.current = 0;

      // Retract all laseropes
      laseropesRef.current.forEach((rope) => {
        if (rope.active) {
          updateLaserrope(rope, deltaTime, mousePos);
          retractLaserrope(rope, deltaTime);
        }
      });
    }

    // Update uniforms
    uniforms.u_hoverTime.value = hoverTimeRef.current;

    // Update structure parameter uniforms
    uniforms.u_ropeDashFrequency.value = ropeDashFrequency;
    uniforms.u_ropeGlowRadius.value = ropeGlowRadius;
    uniforms.u_ropeGlowIntensity.value = ropeGlowIntensity;
    uniforms.u_ropeThickness.value = ropeThickness;
    uniforms.u_ropeTipFadeStart.value = ropeTipFadeStart;

    packLaseropeUniforms(uniforms);

    // Update UI state (throttled to ~10fps to avoid too many re-renders)
    if (Math.floor(hoverTimeRef.current * 10) !== Math.floor(hoverTime * 10)) {
      setHoverTime(hoverTimeRef.current);
    }
  };

  // onFrame callback for BaseExperimentShader
  const handleFrame = useCallback((deltaTime, uniforms) => {
    updateLaseropes(deltaTime, uniforms);
  }, [ropeDashFrequency, ropeGlowRadius, ropeGlowIntensity, ropeThickness, ropeTipFadeStart]);

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

        <SectionLabel>Laseropes (The Reaching)</SectionLabel>
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
            <span>Active Ropes</span>
            <span className="value">{activeLaseropeCount}/7</span>
          </SliderLabel>
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Dash Freq</span><span className="value">{ropeDashFrequency.toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="4" max="24" step="1" value={ropeDashFrequency} onChange={(e) => setRopeDashFrequency(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Glow Radius</span><span className="value">{(ropeGlowRadius * 1000).toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="0.002" max="0.02" step="0.001" value={ropeGlowRadius} onChange={(e) => setRopeGlowRadius(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Glow Intensity</span><span className="value">{ropeGlowIntensity.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0" max="0.5" step="0.02" value={ropeGlowIntensity} onChange={(e) => setRopeGlowIntensity(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Thickness</span><span className="value">{(ropeThickness * 1000).toFixed(1)}</span></SliderLabel>
          <Slider type="range" min="0.001" max="0.01" step="0.0005" value={ropeThickness} onChange={(e) => setRopeThickness(parseFloat(e.target.value))} />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel><span>Tip Fade</span><span className="value">{ropeTipFadeStart.toFixed(2)}</span></SliderLabel>
          <Slider type="range" min="0.5" max="0.95" step="0.05" value={ropeTipFadeStart} onChange={(e) => setRopeTipFadeStart(parseFloat(e.target.value))} />
        </SliderContainer>
      </ControlPanel>

      <InfoPanel>
        <h3>Oscilloscope + Laseropes</h3>
        <p>
          Lines deform like fabric. Hover over the hand and laseropes will reach toward your cursor. The longer you stay, the more they reach.
        </p>
        <p className="status">
          {texturesLoaded ? '● Loaded' : '○ Loading...'}
        </p>
      </InfoPanel>
    </>
  );
};

export default Experiment;
