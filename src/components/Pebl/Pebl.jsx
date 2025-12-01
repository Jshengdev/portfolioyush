import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import PeblMap from './PeblMap';
import PeblOnboarding, { SCREENS } from './PeblOnboarding';

// ═══════════════════════════════════════════════════════════════════
// ROCK STYLES - 3 different render/depth pairs
// ═══════════════════════════════════════════════════════════════════

const ROCK_STYLES = [
  {
    id: 'minimal',
    name: 'Minimal',
    render: '/assets/pebl/rock.png',
    depth: '/assets/pebl/dpt3.png',
  },
  {
    id: 'shadow',
    name: 'Shadow',
    render: '/assets/pebl/rock_render1.jpg',
    depth: '/assets/pebl/dpt2.png',
  },
  {
    id: 'angle',
    name: 'Angle',
    render: '/assets/pebl/rock_render2.jpg',
    depth: '/assets/pebl/dpt.png',
  },
];

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const PeblContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background-color: #F5F0E8;
  cursor: crosshair;
  overflow: hidden;

  /* Grain overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wordmark = styled.img`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: auto;
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
  z-index: 10;
`;

const StyleSelector = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  display: flex;
  gap: 8px;
  z-index: 100;
`;

const StyleButton = styled.button`
  background: ${props => props.$active ? 'rgba(122, 110, 93, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(122, 110, 93, 0.6)' : 'rgba(122, 110, 93, 0.3)'};
  color: #7A6E5D;
  padding: 6px 12px;
  font-size: 9px;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(122, 110, 93, 0.6);
    background: rgba(122, 110, 93, 0.1);
  }
`;


// ═══════════════════════════════════════════════════════════════════
// DEPTH SHADER - v21 Oscilloscope Style
// ═══════════════════════════════════════════════════════════════════

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D u_renderMap;
  uniform sampler2D u_depthMap;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  // v21 Parameters
  uniform float u_lineCount;        // 180
  uniform float u_lineThickness;    // 1.4
  uniform float u_amplitude;        // 1.5
  uniform float u_noiseScale;       // 6.0
  uniform float u_noiseSpeed;       // 0.3
  uniform float u_amplitudeGamma;   // 1.8
  uniform float u_bgAmplitude;      // 0.2
  uniform float u_thicknessRange;   // 2.5
  uniform float u_edgeMultiplier;   // 1.3
  uniform float u_edgeThreshold;    // 0.05
  uniform float u_parallaxStrength; // 0.03
  uniform float u_depthInfluence;   // 0.7
  uniform float u_cursorRadius;     // 0.25
  uniform float u_cursorStrength;   // 1.5

  // Glow uniforms (for onboarding)
  uniform float u_glowIntensity;    // 0.0-1.0
  uniform vec3 u_glowColor;         // Rose glow color

  varying vec2 vUv;

  // ============================================
  // NOISE FUNCTIONS (from v21)
  // ============================================

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise1D(float x) {
    float i = floor(x);
    float f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), f);
  }

  // FBM - Fractal Brownian Motion (4 octaves)
  float fbm(float y, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise1D(y * frequency * u_noiseScale * 50.0 + time);
      maxValue += amplitude;
      frequency *= 2.0;      // lacunarity
      amplitude *= 0.45;     // persistence
    }

    return value / maxValue;
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sampleLuminance(vec2 uv) {
    float l = getLuminance(texture2D(u_renderMap, uv).rgb) * 0.4;
    l += getLuminance(texture2D(u_renderMap, uv + vec2(0.003, 0.0)).rgb) * 0.15;
    l += getLuminance(texture2D(u_renderMap, uv - vec2(0.003, 0.0)).rgb) * 0.15;
    l += getLuminance(texture2D(u_renderMap, uv + vec2(0.0, 0.003)).rgb) * 0.15;
    l += getLuminance(texture2D(u_renderMap, uv - vec2(0.0, 0.003)).rgb) * 0.15;
    return l;
  }

  float sampleDepth(vec2 uv) {
    return texture2D(u_depthMap, uv).r;
  }

  // ============================================
  // EDGE DETECTION (Sobel)
  // ============================================

  vec2 calculateDepthGradient(vec2 uv) {
    vec2 texelSize = 1.0 / u_resolution;
    float scale = 3.0;

    float depthL = sampleDepth(uv + vec2(-scale, 0.0) * texelSize);
    float depthR = sampleDepth(uv + vec2(scale, 0.0) * texelSize);
    float depthU = sampleDepth(uv + vec2(0.0, -scale) * texelSize);
    float depthD = sampleDepth(uv + vec2(0.0, scale) * texelSize);

    return vec2(depthR - depthL, depthD - depthU);
  }

  float calculateEdgeMagnitude(vec2 gradient) {
    float mag = length(gradient);
    return smoothstep(u_edgeThreshold, u_edgeThreshold + 0.1, mag);
  }

  // ============================================
  // PARALLAX
  // ============================================

  vec2 calculateParallaxOffset(vec2 uv) {
    vec2 mouseNorm = u_mouse * 2.0 - 1.0;
    float depth = texture2D(u_depthMap, uv).r;
    return mouseNorm * u_parallaxStrength * depth * u_depthInfluence;
  }

  // ============================================
  // CURSOR DEFORMATION
  // ============================================

  void calculateCursorDeformation(
    vec2 uv,
    vec2 cursorUV,
    float pixelDepth,
    out float yOffset,
    out float xOffset
  ) {
    yOffset = 0.0;
    xOffset = 0.0;

    // Only deform where rock exists (depth > threshold)
    float rockThreshold = 0.1;
    float pixelOnRock = smoothstep(rockThreshold, rockThreshold + 0.1, pixelDepth);
    if (pixelOnRock < 0.01) return;

    float dist = distance(uv, cursorUV);
    if (dist > u_cursorRadius) return;

    // Smooth falloff
    float influence = 1.0 - smoothstep(0.0, u_cursorRadius, dist);
    influence = pow(influence, 1.5);
    influence *= pixelOnRock;

    // Flow direction
    vec2 toCursor = cursorUV - uv;
    vec2 radial = (dist > 0.001) ? normalize(toCursor) : vec2(0.0);
    vec2 tangent = vec2(-radial.y, radial.x);

    float flowDir = sign(uv.y - cursorUV.y);
    if (abs(uv.y - cursorUV.y) < 0.01) flowDir = 1.0;

    // Tangential flow - lines curve around cursor
    xOffset = tangent.x * influence * u_cursorStrength * 0.08 * flowDir;
    yOffset = influence * u_cursorStrength * 0.05 * (1.0 - dist / u_cursorRadius);
  }

  // ============================================
  // ROCK TEXTURE - v21 Style Multi-layer
  // ============================================

  // 2D noise for texture
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash2(i);
    float b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0));
    float d = hash2(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM 2D for organic texture
  float fbm2D(vec2 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise2D(p * frequency + time * 0.1);
      maxValue += amplitude;
      frequency *= 2.0;
      amplitude *= 0.45;
    }

    return value / maxValue;
  }

  float renderRockTexture(vec2 uv, vec2 texUV, vec2 cursorUV, float time) {
    float texture = 0.0;

    // Sample depth and luminance
    float depth = sampleDepth(texUV);
    float rockMask = smoothstep(0.08, 0.25, depth);
    if (rockMask < 0.01) return 0.0;

    float luminance = sampleLuminance(texUV);
    vec2 depthGradient = calculateDepthGradient(texUV);
    float edgeMagnitude = calculateEdgeMagnitude(depthGradient);

    // Cursor deformation
    float cursorYOffset, cursorXOffset;
    calculateCursorDeformation(texUV, cursorUV, depth, cursorYOffset, cursorXOffset);

    // === LAYER 1: CONTOUR LINES (follow depth) ===
    float contourScale = 80.0;
    float depthValue = depth + depthGradient.y * 0.2;
    depthValue += cursorYOffset * 1.5;

    float contourPhase = fract(depthValue * contourScale);
    float contourLine = smoothstep(0.0, 0.06, contourPhase) * smoothstep(0.12, 0.06, contourPhase);
    contourLine *= 0.5 + edgeMagnitude * 0.5;
    texture += contourLine * 0.5;

    // === LAYER 2: HORIZONTAL SCANLINES (clean) ===
    float lineSpacing = 1.0 / 120.0; // Fixed line count
    float adjustedY = uv.y + depthGradient.y * 0.03 + cursorYOffset;
    float scanlineY = floor(adjustedY / lineSpacing) * lineSpacing + lineSpacing * 0.5;
    float distToLine = abs(adjustedY - scanlineY);

    // Variable thickness based on luminance
    float thicknessMultiplier = 1.0 + (luminance * 1.5);
    float aaWidth = lineSpacing * 0.06 * thicknessMultiplier;
    float lineIntensity = 1.0 - smoothstep(0.0, aaWidth, distToLine);

    // Dash pattern driven by luminance (no FBM)
    float displacedX = uv.x + cursorXOffset;
    float dashPhase = fract(displacedX * 60.0);
    float dutyCycle = mix(0.4, 0.9, luminance);
    lineIntensity *= step(dashPhase, dutyCycle);

    texture += lineIntensity * 0.35;

    // === LAYER 3: EDGE EMPHASIS ===
    float edgeLines = edgeMagnitude * 0.6;
    texture += edgeLines;

    // Combine with rock mask
    texture *= rockMask;

    // Invert (texture appears in shadows)
    texture = 1.0 - texture;

    return texture;
  }

  // ============================================
  // SCANLINE RENDERING (for background)
  // ============================================

  float renderScanlines(vec2 uv, vec2 texUV, vec2 cursorUV) {
    float result = 0.0;

    // Sample luminance with gamma mapping
    float rawLuminance = sampleLuminance(texUV);
    float luminance = pow(rawLuminance, u_amplitudeGamma);

    // Sample depth and create rock mask
    float depth = sampleDepth(texUV);
    float rockMask = smoothstep(0.05, 0.2, depth);

    // Edge detection
    vec2 depthGradient = calculateDepthGradient(texUV);
    float edgeMagnitude = calculateEdgeMagnitude(depthGradient);
    float edgeBoost = 1.0 + (edgeMagnitude * u_edgeMultiplier);

    // Amplitude: rock vs background
    float baseAmplitude = mix(u_bgAmplitude, u_amplitude, rockMask);
    float baseLineSpacing = 1.0 / u_lineCount;

    // Cursor deformation
    float cursorYOffset, cursorXOffset;
    calculateCursorDeformation(texUV, cursorUV, depth, cursorYOffset, cursorXOffset);

    // Find scanline
    float rawY = uv.y;
    float verticalOffset = depthGradient.y * 0.05 + cursorYOffset;
    float adjustedY = rawY + verticalOffset;

    float scanlineY = floor(adjustedY / baseLineSpacing) * baseLineSpacing + baseLineSpacing * 0.5;
    float distToLine = abs(adjustedY - scanlineY);

    // FBM noise for organic displacement
    float timeOffset = u_time * u_noiseSpeed;
    float noiseVal = fbm(scanlineY, timeOffset);
    noiseVal = (noiseVal - 0.5) * 2.0;

    // Sample at scanline Y
    vec2 scanlineTexUV = vec2(texUV.x, scanlineY);
    float scanlineLum = pow(sampleLuminance(scanlineTexUV), u_amplitudeGamma);
    float scanlineRockMask = smoothstep(0.05, 0.2, sampleDepth(scanlineTexUV));

    // Edge boost at scanline
    vec2 scanlineGradient = calculateDepthGradient(scanlineTexUV);
    float scanlineEdge = calculateEdgeMagnitude(scanlineGradient);
    float scanlineEdgeBoost = 1.0 + (scanlineEdge * u_edgeMultiplier);

    float scanlineAmp = mix(u_bgAmplitude, u_amplitude, scanlineRockMask);
    scanlineAmp *= scanlineLum * scanlineEdgeBoost;

    // Horizontal displacement
    float fbmDisplacement = noiseVal * scanlineAmp * 0.15;
    float totalDisplacement = fbmDisplacement + cursorXOffset;
    float displacedX = uv.x + totalDisplacement;

    // Dash pattern
    float dashWidth = 0.012;
    float dashPhase = fract(displacedX / dashWidth);
    float dutyCycle = mix(0.2, 0.9, scanlineLum);
    float isDash = step(dashPhase, dutyCycle);

    // Variable thickness
    float thicknessMultiplier = 1.0 + (scanlineLum * u_thicknessRange);
    float dynamicThickness = u_lineThickness * thicknessMultiplier;

    // Line with anti-aliasing
    float aaWidth = baseLineSpacing * 0.12 * dynamicThickness;
    float lineIntensity = 1.0 - smoothstep(0.0, aaWidth, distToLine);

    result = lineIntensity * isDash;
    result *= mix(0.2, 1.0, scanlineLum);

    return result;
  }

  // ============================================
  // STIPPLED SHADOW - Multi-layer with contact shadow
  // ============================================

  float renderShadow(vec2 uv, vec2 mouseOffset, float time) {
    float totalShadow = 0.0;

    // === PRIMARY CAST SHADOW ===
    // Shadow position - offset from rock center, shifts with mouse
    vec2 shadowCenter = vec2(0.52, 0.35);
    shadowCenter += mouseOffset * 0.025; // Shifts with parallax

    // Elliptical shadow shape
    vec2 shadowUV = uv - shadowCenter;
    shadowUV.x *= 0.6; // Stretch horizontally
    shadowUV.y *= 1.6; // Compress vertically
    float dist = length(shadowUV);

    // Soft shadow falloff with penumbra
    float shadowBase = 1.0 - smoothstep(0.0, 0.22, dist);
    shadowBase = pow(shadowBase, 1.3);

    // Multi-layer stipple pattern for richness
    // Layer 1: Coarse stipple (main structure)
    vec2 gridPos1 = floor(uv * 300.0);
    float stipple1 = hash2(gridPos1);
    float threshold1 = 1.0 - shadowBase * 0.9;
    float pattern1 = step(threshold1, stipple1);
    totalShadow += pattern1 * shadowBase * 0.28;

    // Layer 2: Medium stipple (detail)
    vec2 gridPos2 = floor(uv * 600.0);
    float stipple2 = hash2(gridPos2 + 50.0);
    float threshold2 = 1.0 - shadowBase * 0.7;
    float pattern2 = step(threshold2, stipple2);
    totalShadow += pattern2 * shadowBase * 0.12;

    // Layer 3: Fine stipple (texture) - subtle animation
    vec2 gridPos3 = floor(uv * 1000.0 + time * 0.5);
    float stipple3 = hash2(gridPos3 + 200.0);
    float threshold3 = 1.0 - shadowBase * 0.5;
    float pattern3 = step(threshold3 + 0.15, stipple3);
    totalShadow += pattern3 * shadowBase * 0.05;

    // === CONTACT SHADOW (darker, tighter) ===
    vec2 contactCenter = vec2(0.51, 0.42);
    contactCenter += mouseOffset * 0.01;

    vec2 contactUV = uv - contactCenter;
    contactUV.x *= 0.4;
    contactUV.y *= 2.2;
    float contactDist = length(contactUV);

    float contactBase = 1.0 - smoothstep(0.0, 0.08, contactDist);
    contactBase = pow(contactBase, 2.0);

    // Contact shadow stipple - tighter pattern
    vec2 contactGrid = floor(uv * 500.0);
    float contactStipple = hash2(contactGrid + 300.0);
    float contactThreshold = 1.0 - contactBase * 0.95;
    float contactPattern = step(contactThreshold, contactStipple);
    totalShadow += contactPattern * contactBase * 0.35;

    // === AMBIENT OCCLUSION HALO ===
    // Very subtle outer halo
    float haloBase = 1.0 - smoothstep(0.18, 0.35, dist);
    haloBase = pow(haloBase, 3.0);
    vec2 haloGrid = floor(uv * 200.0);
    float haloStipple = hash2(haloGrid + 400.0);
    float haloPattern = step(1.0 - haloBase * 0.4, haloStipple);
    totalShadow += haloPattern * haloBase * 0.04;

    return totalShadow;
  }

  // ============================================
  // MAIN
  // ============================================

  void main() {
    vec2 uv = vUv;
    vec2 texUV = uv;

    // Mouse offset for parallax
    vec2 mouseOffset = (u_mouse - 0.5) * 2.0;

    // Parallax offset
    vec2 parallaxOffset = calculateParallaxOffset(texUV);
    texUV = texUV - parallaxOffset;
    texUV = clamp(texUV, 0.001, 0.999);

    // Cursor UV
    vec2 cursorUV = u_mouse;

    // Sample original render and depth
    vec3 renderColor = texture2D(u_renderMap, texUV).rgb;
    float depth = sampleDepth(texUV);
    float rockMask = smoothstep(0.08, 0.25, depth);

    // === ROCK TEXTURE (v21 style) ===
    float rockTexture = renderRockTexture(uv, texUV, cursorUV, u_time);

    // CRT vignette (subtle)
    float vignetteX = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    float vignetteY = smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
    float vignette = vignetteX * vignetteY;

    // Background: warm cream - slightly darker for contrast
    vec3 bgColor = vec3(0.92, 0.90, 0.87); // Darker warm cream

    // === STIPPLED SHADOW ===
    float shadow = renderShadow(uv, mouseOffset, u_time);
    // Don't show shadow where rock is
    shadow *= (1.0 - rockMask);
    vec3 bgWithShadow = bgColor * (1.0 - shadow);

    // Subtle grain - increased intensity
    float grain = hash2(gl_FragCoord.xy + fract(u_time * 0.5)) * 0.05 - 0.025;
    float grain2 = hash2(gl_FragCoord.xy * 0.5 + u_time * 0.1) * 0.025 - 0.0125;

    // === ROCK RENDERING ===
    vec3 rockBase = renderColor;

    // Texture overlay (30%) - masked to rock only
    float textureStrength = 0.30 * rockMask;
    vec3 darkTexture = rockBase * 0.5;
    vec3 rockWithTexture = mix(rockBase, darkTexture, (1.0 - rockTexture) * textureStrength);

    // Background with subtle texture
    float bgScanlines = renderScanlines(uv, texUV, cursorUV);
    float bgLineStrength = 0.025;
    vec3 bgWithLines = mix(bgWithShadow, bgWithShadow * 0.96, (1.0 - bgScanlines) * bgLineStrength);

    // Blend rock and background based on depth mask
    vec3 color = mix(bgWithLines, rockWithTexture, rockMask * 0.95);

    // === GLOW EFFECT (for onboarding) - Cinematic Corners ===
    if (u_glowIntensity > 0.01) {
      // Breathing animation using time (slower, more luxe)
      float breathe = 0.5 + 0.5 * sin(u_time * 1.26);  // ~5s cycle

      // Cinematic corner glow - symmetric from center
      vec2 distFromCenter = abs(uv - 0.5);
      float cornerDist = length(distFromCenter); // 0.0 to ~0.71

      // Create glow only at the very edges/corners
      // Push start point out (0.45 -> 0.55) to keep center cleaner
      float vignetteGlow = smoothstep(0.55, 0.85, cornerDist);
      vignetteGlow = pow(vignetteGlow, 2.0);  // Soft cinematic falloff

      // Mask out the rock completely - no glow on rock surface
      vignetteGlow *= (1.0 - smoothstep(0.05, 0.20, depth));

      // Apply breathing
      vignetteGlow *= u_glowIntensity * (0.6 + 0.4 * breathe);

      // Apply glow color as additive blend - reduced intensity for subtlety
      vec3 glowColor = u_glowColor;
      color += glowColor * vignetteGlow * 0.25;
    }

    // Add grain
    color += grain + grain2;

    // Subtle vignette
    color *= mix(0.96, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

function Pebl() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const frameIdRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const [currentStyle, setCurrentStyle] = useState(1); // Default to Shadow style
  const [mapVisible, setMapVisible] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [currentOnboardingScreen, setCurrentOnboardingScreen] = useState(0);

  // Load textures for current style
  const loadTextures = useCallback((styleIndex) => {
    const style = ROCK_STYLES[styleIndex];
    const loader = new THREE.TextureLoader();

    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded >= 2) {
        setTexturesLoaded(true);
        console.log(`Style "${style.name}" loaded`);
      }
    };

    loader.load(style.render, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (materialRef.current) {
        materialRef.current.uniforms.u_renderMap.value = texture;
      }
      checkLoaded();
    });

    loader.load(style.depth, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (materialRef.current) {
        materialRef.current.uniforms.u_depthMap.value = texture;
      }
      checkLoaded();
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xF5F0E8, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create placeholder texture
    const placeholderData = new Uint8Array([200, 190, 180, 255]);
    const placeholder = new THREE.DataTexture(placeholderData, 1, 1, THREE.RGBAFormat);
    placeholder.needsUpdate = true;

    // Shader material with v21 parameters
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_renderMap: { value: placeholder },
        u_depthMap: { value: placeholder },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0 },
        // v21 Parameters (exact values)
        u_lineCount: { value: 180.0 },
        u_lineThickness: { value: 1.4 },
        u_amplitude: { value: 1.5 },
        u_noiseScale: { value: 6.0 },
        u_noiseSpeed: { value: 0.3 },
        u_amplitudeGamma: { value: 1.8 },
        u_bgAmplitude: { value: 0.2 },
        u_thicknessRange: { value: 2.5 },
        u_edgeMultiplier: { value: 1.3 },
        u_edgeThreshold: { value: 0.05 },
        u_parallaxStrength: { value: 0.03 },
        u_depthInfluence: { value: 0.7 },
        u_cursorRadius: { value: 0.25 },
        u_cursorStrength: { value: 1.5 },
        // Glow uniforms (controlled by onboarding)
        u_glowIntensity: { value: 0.0 },
        u_glowColor: { value: new THREE.Vector3(0.77, 0.64, 0.64) }, // Rose #C4A4A4
      },
    });
    materialRef.current = material;

    // Full-screen quad that maintains aspect ratio (cover)
    // Initial geometry - will be updated on resize
    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Load initial textures
    loadTextures(currentStyle);

    // Animation loop
    let time = 0;
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      material.uniforms.u_time.value = time;

      // Smooth mouse following
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      const currentX = material.uniforms.u_mouse.value.x;
      const currentY = material.uniforms.u_mouse.value.y;
      material.uniforms.u_mouse.value.x += (targetX - currentX) * 0.1;
      material.uniforms.u_mouse.value.y += (targetY - currentY) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler - maintain aspect ratio
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      material.uniforms.u_resolution.value.set(width, height);

      // Calculate aspect ratio to "cover" the screen without stretching
      // Assuming texture is roughly square or landscape, we want it to cover
      const imageAspect = 1.0; // Assume square texture for now (or 16:9 if known)
      const screenAspect = width / height;

      let scaleX, scaleY;
      if (screenAspect > imageAspect) {
        // Screen is wider than image - fit to width
        scaleX = 2.0 * screenAspect;
        scaleY = 2.0 * screenAspect / imageAspect;
      } else {
        // Screen is taller than image - fit to height
        scaleX = 2.0 * imageAspect / screenAspect; // Fix: scale width to match height constraint
        scaleY = 2.0; // Height is 2.0 in ortho view (-1 to 1)

        // Actually, for "cover" behavior:
        if (screenAspect > 1.0) {
          // Landscape screen
          mesh.scale.set(2.0 * screenAspect, 2.0, 1.0);
        } else {
          // Portrait screen
          mesh.scale.set(2.0, 2.0 / screenAspect, 1.0);
        }
      }

      // Simplified "Cover" logic for Orthographic Camera (-1 to 1)
      // We want the plane to always fill the screen.
      // Since UVs are 0-1, we just need the plane to be 2x2 in NDC.
      // BUT, we want the *content* not to stretch.
      // So we need to adjust the UVs or the plane size?

      // Actually, the shader uses vUv which maps 0-1 across the mesh.
      // If the mesh is 2x2 (filling screen), and screen is non-square, texture stretches.
      // To fix: We keep mesh 2x2 (fullscreen) but correct UVs in shader? 
      // OR we make mesh larger than screen to preserve aspect?

      // Let's try scaling the mesh to be correct aspect, ensuring it covers screen.
      const aspect = width / height;
      if (aspect > 1) {
        // Landscape: Width is driver. 
        // Plane width = 2 * aspect. Plane height = 2.
        mesh.scale.set(2 * aspect, 2, 1);
      } else {
        // Portrait: Height is driver.
        // Plane width = 2. Plane height = 2 / aspect.
        mesh.scale.set(2, 2 / aspect, 1);
      }

      // Wait, if we scale the mesh, the UVs stretch with it?
      // No, UVs are 0-1 relative to mesh corners.
      // If mesh is 2:1, UV (0,0) to (1,1) covers a 2:1 area.
      // If texture is 1:1, it will look correct (unstretched) on the mesh?
      // Yes, but we need to ensure the mesh *covers* the view.

      // Let's stick to the standard "cover" math:
      if (aspect > 1) {
        // Screen is wider. Scale mesh to match screen aspect.
        // Height stays 2 (full height). Width becomes 2 * aspect.
        // Texture will be cropped vertically? No, texture stretches to mesh.
        // If texture is square, and mesh is 2:1, texture stretches to 2:1.

        // We want texture to NOT stretch.
        // So mesh aspect must match TEXTURE aspect.
        // Let's assume texture is 1:1.
        // Mesh must be 1:1 (e.g. 2x2).
        // But we need to fill the screen (aspect > 1).
        // So we scale mesh up uniformly until it covers.

        const scale = Math.max(aspect, 1 / aspect);
        // Actually, simpler:
        // If we want 1:1 texture on aspect screen:
        if (aspect > 1) {
          mesh.scale.set(2 * aspect, 2 * aspect, 1);
        } else {
          mesh.scale.set(2 / aspect, 2 / aspect, 1); // Scale up to cover height
        }
        // Wait, this makes it huge.
      }

      // Let's use the UV correction in shader approach? 
      // No, changing geometry is easier for "cover".

      // CORRECT LOGIC for "Cover" with 1:1 Texture:
      // We want the mesh to be square (1:1) in WORLD space.
      // And we want it to be large enough to cover the camera view.
      // Camera view is width=2*aspect, height=2.

      if (aspect > 1) {
        // View is wider (e.g. 3.5 wide, 2 high).
        // Mesh must be at least 3.5x3.5 to cover.
        mesh.scale.set(2 * aspect, 2 * aspect, 1);
      } else {
        // View is taller (e.g. 2 wide, 3.5 high).
        // Mesh must be at least 3.5x3.5.
        // View height is 2? No, ortho camera is fixed height 2 (-1 to 1).
        // View width is 2 * aspect.

        // Let's re-read camera setup:
        // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        // This is a fixed square camera 2x2!
        // If window is non-square, renderer stretches this 2x2 image to fill window.
        // THIS IS THE SOURCE OF STRETCHING!

        // We must update camera to match window aspect!
      }

      // Update camera frustum to match aspect ratio
      const camAspect = width / height;
      camera.left = -camAspect;
      camera.right = camAspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      // Now camera view matches screen shape (no stretch).
      // Now we need a plane that covers this view and shows texture without stretch.
      // If texture is square, plane should be square.
      // And plane must be big enough to cover the view.

      // View size: Width = 2*aspect, Height = 2.

      if (camAspect > 1) {
        // Landscape. Cover needs size 2*aspect.
        mesh.scale.set(2 * camAspect, 2 * camAspect, 1);
      } else {
        // Portrait. Cover needs size 2 (height). 
        // Wait, width is 2*aspect (<2). Height is 2.
        // To cover height 2 with square, need size 2.
        // To cover width 2*aspect (<2) with size 2, it works.
        // So size 2 is enough?
        // No, if aspect is 0.5 (tall), width is 1, height is 2.
        // Square of size 2 covers it.
        mesh.scale.set(2, 2, 1);

        // Actually, let's just make it huge to be safe? 
        // Or precise:
        const scale = Math.max(2 * camAspect, 2);
        mesh.scale.set(scale, scale, 1);
      }
    };

    // Initial resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Click to open map (only after onboarding)
    // Note: Click handling during onboarding is managed by PeblOnboarding component
    // This handler is for post-onboarding clicks on the canvas
    const handleClick = () => {
      // Map opening is now handled by onboarding completion callback
      // Direct clicks on canvas after onboarding will open map
    };
    renderer.domElement.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameIdRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Reload textures when style changes
  useEffect(() => {
    if (materialRef.current) {
      setTexturesLoaded(false);
      loadTextures(currentStyle);
    }
  }, [currentStyle, loadTextures]);

  // Control glow based on onboarding screen
  useEffect(() => {
    if (!materialRef.current) return;

    // Glow settings per screen (updated for 6-screen flow)
    const glowSettings = {
      0: 0.0,  // Splash - no glow (black screen)
      1: 1.5,  // Awakening - glow fades in strong
      2: 1.8,  // Welcome - full glow
      3: 1.8,  // Philosophy - full glow
      4: 1.8,  // How It Works - full glow
      5: 2.5,  // Enter - intensified glow
    };

    const targetIntensity = onboardingComplete
      ? 0.0  // No glow after onboarding
      : (glowSettings[currentOnboardingScreen] || 0.0);

    // Animate glow intensity
    const startIntensity = materialRef.current.uniforms.u_glowIntensity.value;
    const duration = currentOnboardingScreen === 0 ? 1500 : 800; // Slower for awakening
    const startTime = Date.now();

    const animateGlow = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      materialRef.current.uniforms.u_glowIntensity.value =
        startIntensity + (targetIntensity - startIntensity) * eased;

      if (progress < 1) {
        requestAnimationFrame(animateGlow);
      }
    };

    animateGlow();
  }, [currentOnboardingScreen, onboardingComplete]);

  // Handle onboarding completion
  const handleOnboardingComplete = useCallback(() => {
    setOnboardingComplete(true);
    setMapVisible(true);
  }, []);

  // Handle onboarding screen changes (for glow control in Phase 4)
  const handleScreenChange = useCallback((screenIndex, screenName) => {
    setCurrentOnboardingScreen(screenIndex);
  }, []);

  return (
    <PeblContainer>
      <CanvasContainer ref={containerRef} />

      {/* Wordmark - hidden during onboarding */}
      {onboardingComplete && (
        <Wordmark src="/assets/pebl/P5C PEBL.png" alt="PEBL" />
      )}

      {/* Onboarding flow */}
      <PeblOnboarding
        isActive={!onboardingComplete}
        onComplete={handleOnboardingComplete}
        onScreenChange={handleScreenChange}
      />

      {/* Map overlay - shown after onboarding completes */}
      <PeblMap visible={mapVisible} onClose={() => setMapVisible(false)} />
    </PeblContainer>
  );
}

export default Pebl;
