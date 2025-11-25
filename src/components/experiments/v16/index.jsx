import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * V16: Scanline Hand - Hybrid Effect
 *
 * Combines:
 * - V16's texture-based hand shape (real hand image for accurate contours)
 * - V15's clean stipple aesthetic (dense dots, luminance-based density)
 * - V15's sand particle dissolution (edges blowing away in wind)
 *
 * Visual Effect:
 * - Real hand silhouette from texture
 * - Topographic contour lines following the surface
 * - Dense stipple grain texture
 * - Sand particles dissolving at edges
 * - Pure black background, isolated hand
 */

const CURRENT_ID = 'v16';

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
    color: ${props => props.theme.colors.accent.primary || '#88A9D7'};
  }
`;

// Vertex shader
const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader - Hybrid: Texture hand + Stipple + Sand particles
const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_backgroundColor;
uniform sampler2D u_handTexture;

// ============================================
// NOISE FUNCTIONS
// ============================================

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
  return vec2(hash(p), hash(p + vec2(37.0, 17.0)));
}

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
// CONTOUR LINE GENERATION
// ============================================

float contourLines(float luminance, float lineCount, float lineWidth) {
  float bands = luminance * lineCount;
  float bandFract = fract(bands);
  float line = smoothstep(0.0, lineWidth, bandFract) *
               smoothstep(lineWidth * 2.0, lineWidth, bandFract);
  return line;
}

// ============================================
// STIPPLE / GRAIN TEXTURE (from V15)
// ============================================

float stipple(vec2 uv, float density, float dotDensity) {
  vec2 cell = floor(uv * dotDensity);
  vec2 cellUV = fract(uv * dotDensity);

  float cellHash = hash(cell);
  vec2 dotPos = vec2(0.5) + (hash2(cell) - 0.5) * 0.6;
  float d = length(cellUV - dotPos);

  float threshold = 1.0 - density;
  if (cellHash > threshold) return 0.0;

  float dotSize = 0.12 + cellHash * 0.08;
  return smoothstep(dotSize, dotSize * 0.2, d);
}

float multiStipple(vec2 uv, float density) {
  float result = 0.0;
  result += stipple(uv, density, 800.0) * 0.5;
  result += stipple(uv * 1.3 + 17.0, density * 0.85, 500.0) * 0.35;
  result += stipple(uv * 0.7 + 31.0, density * 0.6, 300.0) * 0.15;
  return clamp(result, 0.0, 1.0);
}

// ============================================
// SAND DISSOLUTION PARTICLES (from V15)
// ============================================

float sandParticles(vec2 uv, float time, vec2 handCenter, float handMask) {
  float sand = 0.0;

  // Only show particles near where hand is
  if (handMask < 0.01 && length(uv - handCenter) > 0.5) return 0.0;

  const int PARTICLE_COUNT = 250;

  for (int i = 0; i < PARTICLE_COUNT; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 0.137, fi * 0.719);

    // Spawn near hand edge area
    vec2 spawnPos = vec2(
      0.4 + hash(seed) * 0.4,
      0.2 + hash(seed + 1.0) * 0.6
    );

    // Life cycle
    float lifeSpeed = 0.025 + hash(seed + 2.0) * 0.035;
    float life = fract(time * lifeSpeed + hash(seed + 3.0));

    // Wind direction - blowing left with slight variation
    vec2 windDir = vec2(-1.0, -0.15);
    windDir += vec2(
      sin(time * 0.3 + fi * 0.07) * 0.12,
      cos(time * 0.4 + fi * 0.09) * 0.06
    );

    // Travel with wind
    float travelDist = life * 0.45;
    vec2 pos = spawnPos + windDir * travelDist;

    // Gravity
    pos.y -= life * life * 0.06;

    // Turbulence
    pos += (hash2(seed + 4.0) - 0.5) * life * 0.12;

    // Tiny particle
    float d = length(uv - pos);
    float size = 0.0006 + hash(seed + 5.0) * 0.001;

    // Fade in/out
    float fade = smoothstep(0.0, 0.08, life) * smoothstep(1.0, 0.35, life);

    float particle = smoothstep(size, size * 0.15, d);
    sand += particle * fade * 0.5;
  }

  return clamp(sand, 0.0, 1.0);
}

// ============================================
// MAIN
// ============================================

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Position and scale the hand texture
  vec2 handUV = uv;
  handUV.x = 1.0 - handUV.x; // Flip horizontally (hand faces left)
  handUV = handUV * 1.5 - vec2(0.2, 0.25); // Scale and position

  // Sample the hand texture
  vec4 handSample = texture2D(u_handTexture, handUV);
  float handLuminance = dot(handSample.rgb, vec3(0.299, 0.587, 0.114));

  // Bounds check
  float inBounds = step(0.0, handUV.x) * step(handUV.x, 1.0) *
                   step(0.0, handUV.y) * step(handUV.y, 1.0);

  // Hand mask - isolate hand from background
  float bgThreshold = 0.87;
  float handMask = inBounds * smoothstep(bgThreshold, bgThreshold - 0.12, handLuminance);

  // ============================================
  // CONTOUR LINES (following hand surface)
  // ============================================

  float contourCount = 45.0;
  float lineWidth = 0.07;
  float contours = contourLines(handLuminance, contourCount, lineWidth);

  // ============================================
  // SHADING FOR STIPPLE DENSITY
  // ============================================

  // Use luminance to drive stipple density
  // Darker areas = more dots (higher density)
  float shade = handLuminance;

  // Add subtle variation
  shade += fbm(uv * 8.0) * 0.08 - 0.04;
  shade = clamp(shade, 0.0, 1.0);

  // Stipple density (invert: dark = more dots)
  float stippleDensity = 1.0 - shade;

  // ============================================
  // EDGE DISSOLUTION
  // ============================================

  // Detect edges for dissolution effect
  float edgeNoise = fbm(uv * 25.0 + u_time * 0.2);

  // Create dissolving edge effect
  float edgeFade = smoothstep(0.0, 0.15, handMask);
  float dissolveThreshold = edgeFade - edgeNoise * 0.3;
  float dissolveMask = smoothstep(0.0, 0.1, dissolveThreshold);

  // ============================================
  // COMPOSITION
  // ============================================

  // Pure black background
  vec3 bgColor = vec3(0.0);

  // Line/dot color (cream/off-white)
  vec3 dotColor = vec3(0.85, 0.82, 0.78);
  vec3 sandColor = vec3(0.7, 0.65, 0.58);

  // Apply stipple pattern
  float stipplePattern = multiStipple(uv, stippleDensity);

  // Combine contours and stipple
  float combinedPattern = max(contours * 0.8, stipplePattern);

  // Apply to hand area only
  vec3 handColor = mix(bgColor, dotColor, combinedPattern);

  // Apply dissolution mask
  float finalMask = handMask * dissolveMask;

  // Compose
  vec3 color = mix(bgColor, handColor, finalMask);

  // ============================================
  // SAND PARTICLES
  // ============================================

  vec2 handCenter = vec2(0.55, 0.45);
  float sand = sandParticles(uv, u_time, handCenter, handMask);
  color = mix(color, sandColor, sand * 0.75);

  // ============================================
  // SUBTLE GLOW
  // ============================================

  vec2 glowPos = vec2(0.5, 0.42);
  float glowDist = length(uv - glowPos);
  float glow = exp(-glowDist * 10.0) * 0.3;
  glow *= finalMask;
  glow *= 0.85 + sin(u_time * 1.5) * 0.15;
  color += vec3(0.95, 0.97, 1.0) * glow;

  // ============================================
  // VERTICAL STRING
  // ============================================

  float stringX = 0.7;
  float stringWidth = 0.0012;
  float stringWave = sin(uv.y * 12.0 + u_time * 0.6) * 0.002;
  float stringMask = smoothstep(stringWidth, 0.0, abs(uv.x - stringX - stringWave));
  stringMask *= step(uv.y, 0.32);
  color += dotColor * stringMask * 0.5;

  // ============================================
  // FINAL
  // ============================================

  // Subtle vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.25;
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

const ScanlineHandExperiment = () => {
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

  // WebGL setup with texture loading
  useEffect(() => {
    if (!mountRef.current) return;

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

    // Placeholder texture
    const placeholderTexture = new THREE.DataTexture(
      new Uint8Array([200, 200, 200, 255]),
      1, 1,
      THREE.RGBAFormat
    );
    placeholderTexture.needsUpdate = true;

    // Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(actualWidth, actualHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_backgroundColor: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
      u_handTexture: { value: placeholderTexture },
    };

    // Load hand texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/hand/imagehand.png',
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        uniforms.u_handTexture.value = texture;
        console.log('Hand texture loaded');
      },
      undefined,
      (error) => {
        console.error('Error loading hand texture:', error);
      }
    );

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
      if (uniforms.u_handTexture.value) {
        uniforms.u_handTexture.value.dispose();
      }
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
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev?.id || 'v15'}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next?.id || 'v1'}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
      <InfoPanel theme={theme}>
        <h3>Scanline Hand</h3>
        <p>
          Real hand silhouette with topographic contours,
          stipple grain texture, and sand dissolution.
        </p>
        <p className="hint">
          Hybrid of V15 + V16 aesthetics
        </p>
      </InfoPanel>
    </Container>
  );
};

export default ScanlineHandExperiment;
