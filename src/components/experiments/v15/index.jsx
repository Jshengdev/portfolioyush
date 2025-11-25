import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V15: Halftone Hand - Red String of Fate (Wave 1)
 *
 * Visual Effect:
 * - Outstretched hand rendered with dense stipple/grain texture
 * - Hand enters from right side, facing left
 * - Edges dissolve into sand particles blown by wind
 * - The hand IS made of sand - particles break away at boundaries
 *
 * Technical Details:
 * - Uses a procedural hand silhouette (can upgrade to texture later)
 * - Dense stipple pattern (thousands of tiny dots)
 * - Dot density varies with luminance (darker = more dots)
 * - Sand dissolution at edges with wind physics
 *
 * Future Waves:
 * - Wave 2: Lasso detection (cursor trail forms loop around finger)
 * - Wave 3: String tether (permanent connection after lasso)
 * - Wave 4: Depth transition (pull to enter rooms of fate)
 * - Wave 5: Story rooms (expandable narrative spaces)
 */

const CURRENT_ID = 'v15';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  background: ${props => props.theme.colors.background.primary};
`;

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
    border-color: ${props => props.theme.colors.accent.primary};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const InfoPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  max-width: 300px;
  padding: 20px;
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  font-family: ${props => props.theme.fonts.primary};

  h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
    letter-spacing: 2px;
    color: ${props => props.theme.colors.text.primary};
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: ${props => props.theme.colors.text.tertiary};
  }

  .hint {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid ${props => props.theme.colors.border.subtle};
    font-style: italic;
    color: ${props => props.theme.colors.accent.red || '#FF1744'};
  }
`;

// Vertex shader - simple pass-through
const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader with texture-based stipple hand
const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;
uniform sampler2D u_handTexture;
uniform float u_textureLoaded;

// ============================================
// NOISE FUNCTIONS
// ============================================

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float hash3(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
  return vec2(hash(p), hash(p + vec2(37.0, 17.0)));
}

// Smooth noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// FBM noise for organic patterns
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// ============================================
// HAND SDF (PROCEDURAL SILHOUETTE)
// ============================================

// Smooth minimum for organic blending
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// 2D capsule SDF
float sdCapsule2D(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

// 2D tapered capsule (finger shape)
float sdTaperedCapsule2D(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float r = mix(ra, rb, h);
  return length(pa - ba * h) - r;
}

// 2D ellipse SDF
float sdEllipse2D(vec2 p, vec2 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}

// Complete 2D hand silhouette
float sdHand2D(vec2 p) {
  // Position hand on right side, reaching left
  // Hand enters from right edge at center height
  p.x += 0.3;  // Shift so hand comes from right

  // Slight rotation for natural pose
  float angle = -0.05;
  float c = cos(angle);
  float s = sin(angle);
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

  // Scale
  p *= 2.5;

  // Palm - ellipse
  float palm = sdEllipse2D(p, vec2(0.32, 0.38));

  // Wrist - extends to the right
  float wrist = sdCapsule2D(p, vec2(0.4, 0.0), vec2(0.9, 0.0), 0.22);

  // === FINGERS (pointing left) ===

  // Index finger
  vec2 indexBase = vec2(-0.22, 0.18);
  vec2 indexMid = vec2(-0.48, 0.2);
  vec2 indexTip = vec2(-0.68, 0.19);
  float index1 = sdTaperedCapsule2D(p, indexBase, indexMid, 0.07, 0.055);
  float index2 = sdTaperedCapsule2D(p, indexMid, indexTip, 0.055, 0.04);
  float indexF = smin(index1, index2, 0.02);

  // Middle finger (longest)
  vec2 middleBase = vec2(-0.25, 0.0);
  vec2 middleMid = vec2(-0.55, 0.0);
  vec2 middleTip = vec2(-0.78, 0.0);
  float middle1 = sdTaperedCapsule2D(p, middleBase, middleMid, 0.072, 0.058);
  float middle2 = sdTaperedCapsule2D(p, middleMid, middleTip, 0.058, 0.042);
  float middleF = smin(middle1, middle2, 0.02);

  // Ring finger
  vec2 ringBase = vec2(-0.22, -0.17);
  vec2 ringMid = vec2(-0.46, -0.19);
  vec2 ringTip = vec2(-0.64, -0.2);
  float ring1 = sdTaperedCapsule2D(p, ringBase, ringMid, 0.065, 0.052);
  float ring2 = sdTaperedCapsule2D(p, ringMid, ringTip, 0.052, 0.038);
  float ringF = smin(ring1, ring2, 0.02);

  // Pinky finger
  vec2 pinkyBase = vec2(-0.18, -0.32);
  vec2 pinkyMid = vec2(-0.36, -0.36);
  vec2 pinkyTip = vec2(-0.48, -0.38);
  float pinky1 = sdTaperedCapsule2D(p, pinkyBase, pinkyMid, 0.055, 0.045);
  float pinky2 = sdTaperedCapsule2D(p, pinkyMid, pinkyTip, 0.045, 0.032);
  float pinkyF = smin(pinky1, pinky2, 0.02);

  // Thumb (angled outward)
  vec2 thumbBase = vec2(0.05, 0.32);
  vec2 thumbMid = vec2(-0.1, 0.48);
  vec2 thumbTip = vec2(-0.22, 0.56);
  float thumb1 = sdTaperedCapsule2D(p, thumbBase, thumbMid, 0.08, 0.065);
  float thumb2 = sdTaperedCapsule2D(p, thumbMid, thumbTip, 0.065, 0.048);
  float thumbF = smin(thumb1, thumb2, 0.025);

  // Combine all parts organically
  float fingers = smin(indexF, middleF, 0.025);
  fingers = smin(fingers, ringF, 0.025);
  fingers = smin(fingers, pinkyF, 0.025);
  fingers = smin(fingers, thumbF, 0.03);

  float hand = smin(palm, wrist, 0.08);
  hand = smin(hand, fingers, 0.05);

  return hand;
}

// ============================================
// STIPPLE / GRAIN TEXTURE
// ============================================

// Dense stipple effect - thousands of tiny dots
// Density varies with luminance (0=white, 1=black)
float stipple(vec2 uv, float density, float dotDensity) {
  // Create grid of potential dot positions
  vec2 gridSize = vec2(dotDensity);
  vec2 cell = floor(uv * gridSize);
  vec2 cellUV = fract(uv * gridSize);

  // Random value for this cell
  float cellHash = hash(cell);

  // Jitter dot position within cell for organic look
  vec2 dotPos = vec2(0.5) + (hash2(cell) - 0.5) * 0.7;

  // Distance to dot center
  float d = length(cellUV - dotPos);

  // Dot appears based on density threshold
  // Higher density = more dots visible
  float threshold = 1.0 - density;

  // Only show dot if cell hash is below threshold
  if (cellHash > threshold) return 0.0;

  // Dot size varies slightly with hash
  float dotSize = 0.15 + cellHash * 0.1;

  // Sharp circular dot
  return smoothstep(dotSize, dotSize * 0.3, d);
}

// Multi-layer stipple for richer texture
float multiStipple(vec2 uv, float density) {
  float result = 0.0;

  // Layer 1: Fine dots (high frequency)
  result += stipple(uv, density, 600.0) * 0.6;

  // Layer 2: Medium dots
  result += stipple(uv * 1.3 + 17.0, density * 0.8, 400.0) * 0.3;

  // Layer 3: Sparse larger dots for variation
  result += stipple(uv * 0.8 + 31.0, density * 0.5, 200.0) * 0.1;

  return clamp(result, 0.0, 1.0);
}

// ============================================
// SAND DISSOLUTION PARTICLES
// ============================================

float sandParticles(vec2 uv, float time, float handDist) {
  float sand = 0.0;

  // Only spawn particles near hand edges
  float edgeZone = smoothstep(0.1, 0.0, handDist) * smoothstep(-0.15, -0.02, handDist);
  if (edgeZone < 0.01) return 0.0;

  // Particle simulation
  const int PARTICLE_COUNT = 300;

  for (int i = 0; i < PARTICLE_COUNT; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 0.137, fi * 0.719);

    // Spawn position near hand edge (right side of screen)
    vec2 spawnPos = vec2(
      0.45 + hash(seed) * 0.35,
      0.25 + hash(seed + 1.0) * 0.5
    );

    // Life cycle
    float lifeSpeed = 0.03 + hash(seed + 2.0) * 0.04;
    float life = fract(time * lifeSpeed + hash(seed + 3.0));

    // Wind direction - blowing left with slight downward drift
    vec2 windDir = vec2(-1.0, -0.1);
    windDir += vec2(
      sin(time * 0.4 + fi * 0.08) * 0.15,
      cos(time * 0.5 + fi * 0.12) * 0.08
    );

    // Particle travels with wind
    float travelDist = life * 0.5;
    vec2 pos = spawnPos + windDir * travelDist;

    // Gravity - gentle fall
    pos.y -= life * life * 0.08;

    // Add turbulence
    pos += (hash2(seed + 4.0 + floor(time)) - 0.5) * life * 0.15;

    // Very small particle size
    float d = length(uv - pos);
    float size = 0.0008 + hash(seed + 5.0) * 0.0012;

    // Fade based on life (fade in quick, fade out slow)
    float fade = smoothstep(0.0, 0.05, life) * smoothstep(1.0, 0.4, life);

    // Sharp dot
    float particle = smoothstep(size, size * 0.2, d);
    sand += particle * fade * 0.6;
  }

  return clamp(sand, 0.0, 1.0);
}

// ============================================
// MAIN
// ============================================

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centeredUV = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

  // Get hand distance field
  float handDist = sdHand2D(centeredUV);

  // Hand mask - inside hand is negative distance
  float handMask = smoothstep(0.01, -0.01, handDist);

  // Create shading for 3D feel using distance from center + noise
  float shade = 0.0;
  if (handMask > 0.0) {
    // Base shading from edge proximity
    float edgeLight = smoothstep(-0.2, 0.0, handDist);

    // Add subtle 3D shading (darker on one side)
    vec2 lightDir = normalize(vec2(-0.5, 0.3));
    float directional = dot(normalize(centeredUV + vec2(0.3, 0.0)), lightDir) * 0.5 + 0.5;

    // Combine shading
    shade = mix(0.3, 0.9, edgeLight * directional);

    // Add subtle noise variation
    shade += fbm(centeredUV * 15.0) * 0.15 - 0.075;
    shade = clamp(shade, 0.0, 1.0);
  }

  // Determine colors based on background brightness
  float bgBrightness = (u_backgroundColor.r + u_backgroundColor.g + u_backgroundColor.b) / 3.0;
  bool isDark = bgBrightness < 0.5;

  vec3 bgColor = u_backgroundColor;
  vec3 dotColor = isDark ? vec3(0.85, 0.82, 0.78) : vec3(0.08, 0.08, 0.08);
  vec3 sandColor = isDark ? vec3(0.7, 0.65, 0.58) : vec3(0.3, 0.28, 0.25);

  // Apply stipple to hand area
  // Invert shade for stipple: darker areas = more dots
  float stippleDensity = 1.0 - shade;
  float stipplePattern = multiStipple(uv, stippleDensity);

  // Edge dissolution effect - more dots break away at edges
  float edgeDissolve = smoothstep(-0.02, 0.02, handDist);
  float dissolveNoise = fbm(centeredUV * 30.0 + u_time * 0.3);
  float dissolveMask = handMask * (1.0 - edgeDissolve * dissolveNoise * 0.5);

  // Compose hand with stipple
  vec3 handColor = mix(bgColor, dotColor, stipplePattern);

  // Add sand particles
  float sand = sandParticles(uv, u_time, handDist);

  // Final composition
  vec3 color = bgColor;

  // Draw hand with stipple
  color = mix(color, handColor, dissolveMask);

  // Add floating sand particles
  color = mix(color, sandColor, sand * 0.8);

  // Subtle vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.25;
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

const HalftoneHandExperiment = () => {
  const navigate = useNavigate();
  const { theme, isDarkMode } = useContext(ThemeContext);
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

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

  // WebGL setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Background color from theme
    const bgColor = isDarkMode
      ? new THREE.Vector3(0.05, 0.05, 0.05)
      : new THREE.Vector3(0.95, 0.93, 0.90);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    mountRef.current.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Resolution accounting for pixel ratio
    const actualWidth = window.innerWidth * pixelRatio;
    const actualHeight = window.innerHeight * pixelRatio;

    // Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(actualWidth, actualHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_backgroundColor: { value: bgColor },
      u_textureLoaded: { value: 0.0 },
    };

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    // Mesh
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation
    const startTime = performance.now();
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse tracking
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Touch support
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1 - touch.clientY / window.innerHeight;
        material.uniforms.u_mouse.value.set(x, y);
      }
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Resize
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      const resizedWidth = innerWidth * pixelRatio;
      const resizedHeight = innerHeight * pixelRatio;
      material.uniforms.u_resolution.value.set(resizedWidth, resizedHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isDarkMode]);

  return (
    <Container theme={theme}>
      <div ref={mountRef} />
      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev?.id || 'v14'}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next?.id || 'v1'}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
      <InfoPanel theme={theme}>
        <h3>Red String of Fate</h3>
        <p>
          An outstretched hand dissolving into particles.
          Made of sand, the edges blow away in the wind.
        </p>
        <p className="hint">
          Wave 1 of 5 — Lasso mechanics coming soon
        </p>
      </InfoPanel>
    </Container>
  );
};

export default HalftoneHandExperiment;
