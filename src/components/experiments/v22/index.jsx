import React, { useEffect, useContext, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import fragmentShader from '../../../shaders/experiments/v22.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  V22: Luminous Hand                                              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Hand emerging from a disturbed particle medium with organic flowing wisps.
 * The hand doesn't render directly—it's revealed through:
 *   1. Wisps: FBM-based luminous strands tracing hand contours
 *   2. Particles: THREE.Points with depth-based size/brightness
 *
 * Reference: docs/experiments/references/particles.png
 *
 * Architecture:
 *   - Fullscreen shader for wisps (FBM + domain warping)
 *   - THREE.Points overlay for particles (depth-map driven)
 *   - Additive compositing on black background
 */

const CURRENT_ID = 'v22';

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
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
  bottom: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  font-family: 'PP Neue Montreal', sans-serif;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  min-width: 200px;

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

const SliderContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 14px;
  backdrop-filter: blur(5px);
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
`;

const ImageSwitcher = styled.div`
  display: flex;
  gap: 6px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  backdrop-filter: blur(5px);
`;

const ImageButton = styled.button`
  flex: 1;
  background: ${props => props.$active ? 'rgba(136, 169, 215, 0.3)' : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid ${props => props.$active ? 'rgba(136, 169, 215, 0.6)' : 'rgba(255, 255, 255, 0.15)'};
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)'};
  padding: 8px 12px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(136, 169, 215, 0.2);
    border-color: rgba(136, 169, 215, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
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

  .status {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(136, 169, 215, 0.8);
    font-size: 11px;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// PARTICLE VERTEX SHADER
// ═══════════════════════════════════════════════════════════════════

const particleVertexShader = `
  attribute float size;
  attribute float brightness;
  varying float vBrightness;

  void main() {
    vBrightness = brightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Much smaller particles - was 500, now 50
    gl_PointSize = size * (50.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// PARTICLE FRAGMENT SHADER
// ═══════════════════════════════════════════════════════════════════

const particleFragmentShader = `
  varying float vBrightness;

  void main() {
    // Circular particle with soft edge
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);

    // Subtle brightness - much lower base
    float alpha = glow * vBrightness * 0.6;

    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

const LuminousExperiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const wispMaterialRef = useRef(null);
  const particlesRef = useRef(null);
  const animationRef = useRef(null);
  const texturesRef = useRef([]);
  const depthDataRef = useRef(null);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Image switching
  const [activeImage, setActiveImage] = useState(0);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const imageOptions = [
    { name: 'Hand 1', path: '/assets/hand/hand_depth.png' },
    { name: 'Hand 2', path: '/assets/hand/hand2_depth.png' },
  ];

  // Debug mode: 0=normal, 1=edge, 2=fbm, 3=depth
  const [debugMode, setDebugMode] = useState(0);

  // Wisp parameters
  const [wispIntensity, setWispIntensity] = useState(1.0);
  const [wispScale, setWispScale] = useState(5.0);
  const [wispWarp, setWispWarp] = useState(0.3);
  const [wispEdgeConcentration, setWispEdgeConcentration] = useState(25.0); // 10-50 range

  // Particle parameters - disabled by default for debugging wisps first
  const [particleCount, setParticleCount] = useState(0); // Start at 0 to isolate wisps
  const [particleSize, setParticleSize] = useState(1.0);
  const [particleBrightness, setParticleBrightness] = useState(0.8);
  const [particleDepthInfluence, setParticleDepthInfluence] = useState(1.0);

  // Create placeholder texture
  const createPlaceholderTexture = () => {
    const data = new Uint8Array([128, 128, 128, 255]);
    const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
  };

  // Generate particles based on depth map
  const generateParticles = (depthData, width, height, count) => {
    const positions = [];
    const sizes = [];
    const brightnesses = [];

    // Helper to sample depth with edge detection
    const sampleDepthAndEdge = (x, y) => {
      const px = Math.floor(x * width);
      const py = Math.floor((1 - y) * height);
      const idx = (py * width + px) * 4;
      const depth = depthData[idx] / 255;

      // Simple edge detection by sampling neighbors
      let edge = 0;
      if (px > 0 && px < width - 1 && py > 0 && py < height - 1) {
        const left = depthData[idx - 4] / 255;
        const right = depthData[idx + 4] / 255;
        const up = depthData[idx - width * 4] / 255;
        const down = depthData[idx + width * 4] / 255;
        edge = Math.abs(depth - left) + Math.abs(depth - right) +
               Math.abs(depth - up) + Math.abs(depth - down);
      }

      return { depth, edge };
    };

    // Sample positions with preference for edges
    for (let i = 0; i < count; i++) {
      let x = Math.random();
      let y = Math.random();

      const { depth, edge } = sampleDepthAndEdge(x, y);

      // Keep probability: higher for edges AND some depth presence
      // More particles at edges, fewer in flat areas
      const edgeBoost = Math.min(edge * 5, 1.0);
      const depthPresence = depth > 0.05 ? 0.3 : 0.1;
      const keepProbability = depthPresence + edgeBoost * 0.5 + depth * 0.2;

      if (Math.random() > keepProbability) {
        i--;
        continue;
      }

      // Convert to centered coordinates (flip X to match shader)
      const posX = (0.5 - x) * 2;
      const posY = (y - 0.5) * 2;
      const posZ = depth * 0.3 - 0.15;

      positions.push(posX, posY, posZ);

      // Size: larger at edges, varied by depth
      const edgeSizeBoost = 1 + edge * 2;
      const baseSize = 0.3 + depth * 0.7;
      const size = baseSize * edgeSizeBoost * particleSize;
      sizes.push(size);

      // Brightness: stronger at edges
      const baseBright = 0.4 + depth * 0.4 + edge * 0.2;
      const bright = baseBright * particleBrightness;
      brightnesses.push(bright);
    }

    return { positions, sizes, brightnesses };
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Fullscreen quad for wisps
    const wispGeometry = new THREE.PlaneGeometry(2, 2);
    const wispMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: new THREE.Vector3(0, 0, 0) },
        u_depthMap: { value: createPlaceholderTexture() },
        u_wispIntensity: { value: wispIntensity },
        u_wispScale: { value: wispScale },
        u_wispWarp: { value: wispWarp },
        u_wispEdgeConcentration: { value: wispEdgeConcentration },
        u_debugMode: { value: debugMode },
      },
      transparent: true,
      depthTest: false,
    });
    wispMaterialRef.current = wispMaterial;

    const wispMesh = new THREE.Mesh(wispGeometry, wispMaterial);
    wispMesh.renderOrder = 0;
    scene.add(wispMesh);

    // Particle system (initially empty, populated when texture loads)
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
    particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
    particleGeometry.setAttribute('brightness', new THREE.Float32BufferAttribute([], 1));

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.renderOrder = 1;
    scene.add(particles);
    particlesRef.current = particles;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const loadPromises = imageOptions.map((img, index) => {
      return new Promise((resolve) => {
        textureLoader.load(
          img.path,
          (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texturesRef.current[index] = texture;

            // Extract pixel data for particle generation
            if (index === 0) {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = texture.image;
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              depthDataRef.current = {
                data: ctx.getImageData(0, 0, img.width, img.height).data,
                width: img.width,
                height: img.height,
              };
            }

            console.log(`V22: Loaded texture ${index}: ${imageOptions[index].name}`);
            resolve(texture);
          },
          undefined,
          (error) => {
            console.warn(`V22: Could not load ${img.path}:`, error);
            resolve(null);
          }
        );
      });
    });

    Promise.all(loadPromises).then(() => {
      if (texturesRef.current[0]) {
        wispMaterial.uniforms.u_depthMap.value = texturesRef.current[0];
        setTextureLoaded(true);

        // Generate initial particles
        if (depthDataRef.current) {
          const { positions, sizes, brightnesses } = generateParticles(
            depthDataRef.current.data,
            depthDataRef.current.width,
            depthDataRef.current.height,
            particleCount
          );

          particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
          particleGeometry.setAttribute('brightness', new THREE.Float32BufferAttribute(brightnesses, 1));
        }
      }
    });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (wispMaterial) {
        wispMaterial.uniforms.u_time.value += 0.016;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      if (wispMaterial) {
        wispMaterial.uniforms.u_resolution.value.set(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      renderer.dispose();
      wispGeometry.dispose();
      wispMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      texturesRef.current.forEach(tex => {
        if (tex) tex.dispose();
      });
    };
  }, []);

  // Update wisp uniforms when parameters change
  useEffect(() => {
    if (wispMaterialRef.current) {
      wispMaterialRef.current.uniforms.u_wispIntensity.value = wispIntensity;
      wispMaterialRef.current.uniforms.u_wispScale.value = wispScale;
      wispMaterialRef.current.uniforms.u_wispWarp.value = wispWarp;
      wispMaterialRef.current.uniforms.u_wispEdgeConcentration.value = wispEdgeConcentration;
      wispMaterialRef.current.uniforms.u_debugMode.value = debugMode;
    }
  }, [wispIntensity, wispScale, wispWarp, wispEdgeConcentration, debugMode]);

  // Regenerate particles when parameters change
  useEffect(() => {
    if (particlesRef.current && depthDataRef.current) {
      const { positions, sizes, brightnesses } = generateParticles(
        depthDataRef.current.data,
        depthDataRef.current.width,
        depthDataRef.current.height,
        particleCount
      );

      const geometry = particlesRef.current.geometry;
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      geometry.setAttribute('brightness', new THREE.Float32BufferAttribute(brightnesses, 1));
    }
  }, [particleCount, particleSize, particleBrightness, particleDepthInfluence]);

  // Switch texture when activeImage changes
  useEffect(() => {
    if (texturesRef.current[activeImage] && wispMaterialRef.current) {
      wispMaterialRef.current.uniforms.u_depthMap.value = texturesRef.current[activeImage];

      // Re-extract depth data for particle generation
      const texture = texturesRef.current[activeImage];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = texture.image;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      depthDataRef.current = {
        data: ctx.getImageData(0, 0, img.width, img.height).data,
        width: img.width,
        height: img.height,
      };

      // Regenerate particles with new depth data
      if (particlesRef.current) {
        const { positions, sizes, brightnesses } = generateParticles(
          depthDataRef.current.data,
          depthDataRef.current.width,
          depthDataRef.current.height,
          particleCount
        );

        const geometry = particlesRef.current.geometry;
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        geometry.setAttribute('brightness', new THREE.Float32BufferAttribute(brightnesses, 1));
      }

      console.log(`V22: Switched to image ${activeImage}: ${imageOptions[activeImage].name}`);
    }
  }, [activeImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);
      if (e.key === 'i' || e.key === 'I') {
        setActiveImage(prev => (prev + 1) % imageOptions.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <>
      <Container ref={containerRef} />

      {/* Navigation */}
      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>← BACK</NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id}`)}>← PREV</NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id}`)}>NEXT →</NavButton>
        </NavGroup>
      </NavOverlay>

      {/* Controls */}
      <ControlPanel>
        {/* Debug Mode */}
        <SectionLabel>Debug View</SectionLabel>
        <ImageSwitcher>
          <ImageButton $active={debugMode === 0} onClick={() => setDebugMode(0)}>Normal</ImageButton>
          <ImageButton $active={debugMode === 1} onClick={() => setDebugMode(1)}>Edge</ImageButton>
          <ImageButton $active={debugMode === 2} onClick={() => setDebugMode(2)}>FBM</ImageButton>
          <ImageButton $active={debugMode === 3} onClick={() => setDebugMode(3)}>Depth</ImageButton>
        </ImageSwitcher>

        {/* Depth Image Switcher */}
        <SectionLabel>Depth Image</SectionLabel>
        <ImageSwitcher>
          {imageOptions.map((img, index) => (
            <ImageButton
              key={index}
              $active={activeImage === index}
              onClick={() => setActiveImage(index)}
              disabled={!texturesRef.current[index]}
            >
              {img.name}
            </ImageButton>
          ))}
        </ImageSwitcher>

        {/* Wisp Controls */}
        <SectionLabel>Wisps</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>INTENSITY</span>
            <span className="value">{wispIntensity.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={wispIntensity}
            onChange={(e) => setWispIntensity(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>SCALE</span>
            <span className="value">{wispScale.toFixed(1)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={wispScale}
            onChange={(e) => setWispScale(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>WARP</span>
            <span className="value">{wispWarp.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={wispWarp}
            onChange={(e) => setWispWarp(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>EDGE FOCUS</span>
            <span className="value">{wispEdgeConcentration.toFixed(0)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="5"
            max="60"
            step="5"
            value={wispEdgeConcentration}
            onChange={(e) => setWispEdgeConcentration(parseFloat(e.target.value))}
          />
        </SliderContainer>

        {/* Particle Controls */}
        <SectionLabel>Particles</SectionLabel>
        <SliderContainer>
          <SliderLabel>
            <span>COUNT</span>
            <span className="value">{particleCount.toLocaleString()}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={particleCount}
            onChange={(e) => setParticleCount(parseInt(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>SIZE</span>
            <span className="value">{particleSize.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={particleSize}
            onChange={(e) => setParticleSize(parseFloat(e.target.value))}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel>
            <span>BRIGHTNESS</span>
            <span className="value">{particleBrightness.toFixed(2)}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={particleBrightness}
            onChange={(e) => setParticleBrightness(parseFloat(e.target.value))}
          />
        </SliderContainer>
      </ControlPanel>

      {/* Info Panel */}
      <InfoPanel>
        <h3>Luminous Hand</h3>
        <p>
          Hand emerging from disturbed particle medium with flowing wisps.
          Depth map drives both wisp concentration and particle distribution.
        </p>
        <p className="status">
          {textureLoaded ? `Particles: ${particleCount.toLocaleString()}` : 'Loading...'}
        </p>
      </InfoPanel>
    </>
  );
};

export default LuminousExperiment;
