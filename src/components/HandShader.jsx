/**
 * HandShader.jsx - v18
 *
 * WebGL hand visualization with:
 * - Topographic contour lines
 * - Stipple texture
 * - Perlin noise edge dissolution
 * - GPGPU particle system with wind physics
 * - Route-reactive behavior
 *
 * @see /docs/research/hand-shader/README.md for documentation
 */

import React, { useRef, useEffect, useContext, useState } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// Import shaders
import handVertexShader from '../shaders/hand.vert.glsl?raw';
import handFragmentShader from '../shaders/hand.frag.glsl?raw';
import particleVertexShader from '../shaders/handParticles.vert.glsl?raw';
import particleFragmentShader from '../shaders/handParticles.frag.glsl?raw';
import gpgpuPositionShader from '../shaders/gpgpuPosition.glsl?raw';
import gpgpuVelocityShader from '../shaders/gpgpuVelocity.glsl?raw';

// Route-specific behaviors
const ROUTE_BEHAVIORS = {
  '/': {
    dissolveProgress: 0.0,
    windStrength: 0.3,
    contourAlpha: 0.8,
    stippleAlpha: 0.2,
    handScale: 0.8,
    handPosition: [0.1, 0.0],
  },
  '/about': {
    dissolveProgress: 0.15,
    windStrength: 0.2,
    contourAlpha: 0.6,
    stippleAlpha: 0.3,
    handScale: 0.7,
    handPosition: [0.15, 0.05],
  },
  '/projects': {
    dissolveProgress: 0.25,
    windStrength: 0.8,
    contourAlpha: 0.7,
    stippleAlpha: 0.25,
    handScale: 0.75,
    handPosition: [0.1, 0.0],
  },
  '/archive': {
    dissolveProgress: 0.35,
    windStrength: 0.4,
    contourAlpha: 0.5,
    stippleAlpha: 0.4,
    handScale: 0.65,
    handPosition: [0.2, 0.1],
  },
  '/contact': {
    dissolveProgress: 0.4,
    windStrength: 0.25,
    contourAlpha: 0.6,
    stippleAlpha: 0.3,
    handScale: 0.7,
    handPosition: [0.0, 0.0],
  },
};

// Default behavior for project detail pages
const DEFAULT_BEHAVIOR = {
  dissolveProgress: 0.2,
  windStrength: 0.5,
  contourAlpha: 0.5,
  stippleAlpha: 0.2,
  handScale: 0.6,
  handPosition: [0.25, 0.1],
};

// GPGPU particle count (WIDTH x WIDTH particles)
const PARTICLE_WIDTH = 128; // 128x128 = 16,384 particles

const HandShader = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for animation loop access
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const handMaterialRef = useRef(null);
  const particleMaterialRef = useRef(null);
  const gpuComputeRef = useRef(null);
  const positionVariableRef = useRef(null);
  const velocityVariableRef = useRef(null);
  const animationIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetBehaviorRef = useRef(ROUTE_BEHAVIORS['/']);
  const currentBehaviorRef = useRef({ ...ROUTE_BEHAVIORS['/'] });

  useEffect(() => {
    if (!mountRef.current) return;

    // === SCENE SETUP ===
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === LOAD DEPTH MAP ===
    const textureLoader = new THREE.TextureLoader();
    const depthMap = textureLoader.load(
      '/assets/hand_depth.png',
      (texture) => {
        console.log('Hand depth map loaded:', texture.image.width, 'x', texture.image.height);
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.warn('Hand depth map not found, using placeholder:', error);
        // Create a placeholder gradient texture
        const size = 512;
        const data = new Uint8Array(size * size);
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            // Create circular gradient for placeholder
            const cx = x / size - 0.5;
            const cy = y / size - 0.5;
            const dist = Math.sqrt(cx * cx + cy * cy);
            const value = Math.max(0, 1 - dist * 2) * 255;
            data[y * size + x] = value;
          }
        }
        const placeholderTexture = new THREE.DataTexture(
          data,
          size,
          size,
          THREE.LuminanceFormat
        );
        placeholderTexture.needsUpdate = true;
        handMaterialRef.current.uniforms.u_depthMap.value = placeholderTexture;
        setIsLoaded(true);
      }
    );
    depthMap.format = THREE.LuminanceFormat;
    depthMap.type = THREE.UnsignedByteType;
    depthMap.minFilter = THREE.LinearFilter;
    depthMap.magFilter = THREE.LinearFilter;
    depthMap.wrapS = THREE.ClampToEdgeWrapping;
    depthMap.wrapT = THREE.ClampToEdgeWrapping;

    // === HAND SHADER MATERIAL ===
    const handMaterial = new THREE.ShaderMaterial({
      uniforms: {
        // Global
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: isDarkMode ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(1, 1, 1) },

        // Depth map
        u_depthMap: { value: depthMap },

        // Layer toggles
        u_showContours: { value: true },
        u_showStipple: { value: true },
        u_showDissolution: { value: true },

        // Contour parameters
        u_contourInterval: { value: 0.04 },
        u_contourThickness: { value: 1.2 },
        u_contourAlpha: { value: 0.8 },
        u_contourColor: { value: new THREE.Color(1, 1, 1) },

        // Stipple parameters
        u_stippleScale: { value: 80.0 },
        u_stippleThreshold: { value: 0.65 },
        u_stippleAlpha: { value: 0.25 },

        // Dissolution parameters
        u_dissolveProgress: { value: 0.0 },
        u_dissolveNoiseScale: { value: 4.0 },
        u_dissolveEdgeWidth: { value: 0.08 },
        u_dissolveEdgeColor: { value: new THREE.Color(0.53, 0.66, 0.84) },

        // Hand positioning
        u_handPosition: { value: new THREE.Vector2(0.1, 0.0) },
        u_handScale: { value: 0.8 },
        u_handRotation: { value: 0.0 },
      },
      vertexShader: handVertexShader,
      fragmentShader: handFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    handMaterialRef.current = handMaterial;

    // Create hand mesh
    const handGeometry = new THREE.PlaneGeometry(2, 2);
    const handMesh = new THREE.Mesh(handGeometry, handMaterial);
    handMesh.renderOrder = 1;
    scene.add(handMesh);

    // === GPGPU PARTICLE SYSTEM ===
    const gpuCompute = new GPUComputationRenderer(PARTICLE_WIDTH, PARTICLE_WIDTH, renderer);
    gpuComputeRef.current = gpuCompute;

    // Check for float texture support
    if (!renderer.capabilities.isWebGL2) {
      const ext = renderer.getContext().getExtension('OES_texture_float');
      if (!ext) {
        console.warn('Float textures not supported, particles disabled');
      }
    }

    // Initialize position texture
    const positionTexture = gpuCompute.createTexture();
    const positionData = positionTexture.image.data;
    for (let i = 0; i < positionData.length; i += 4) {
      // Random positions around hand area
      positionData[i] = (Math.random() - 0.5) * 1.5;     // X
      positionData[i + 1] = (Math.random() - 0.5) * 1.5; // Y
      positionData[i + 2] = 0;                            // Z
      positionData[i + 3] = Math.random() * 5;            // Age
    }

    // Initialize velocity texture
    const velocityTexture = gpuCompute.createTexture();
    const velocityData = velocityTexture.image.data;
    for (let i = 0; i < velocityData.length; i += 4) {
      velocityData[i] = (Math.random() - 0.5) * 0.1;     // VX
      velocityData[i + 1] = (Math.random() - 0.5) * 0.1; // VY
      velocityData[i + 2] = 0;                            // VZ
      velocityData[i + 3] = 1;                            // Unused
    }

    // Add GPGPU variables
    const positionVariable = gpuCompute.addVariable(
      'texturePosition',
      gpgpuPositionShader,
      positionTexture
    );
    const velocityVariable = gpuCompute.addVariable(
      'textureVelocity',
      gpgpuVelocityShader,
      velocityTexture
    );

    // Set dependencies
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);

    // Position uniforms
    positionVariable.material.uniforms.u_time = { value: 0 };
    positionVariable.material.uniforms.u_delta = { value: 0.016 };
    positionVariable.material.uniforms.u_edgeMask = { value: depthMap };
    positionVariable.material.uniforms.u_handPosition = { value: new THREE.Vector2(0.1, 0.0) };
    positionVariable.material.uniforms.u_handScale = { value: 0.8 };

    // Velocity uniforms
    velocityVariable.material.uniforms.u_time = { value: 0 };
    velocityVariable.material.uniforms.u_delta = { value: 0.016 };
    velocityVariable.material.uniforms.u_windStrength = { value: 0.3 };
    velocityVariable.material.uniforms.u_windDirection = { value: new THREE.Vector3(1, 0.2, 0) };
    velocityVariable.material.uniforms.u_turbulence = { value: 0.5 };

    positionVariableRef.current = positionVariable;
    velocityVariableRef.current = velocityVariable;

    // Initialize GPGPU
    const gpuError = gpuCompute.init();
    if (gpuError !== null) {
      console.error('GPGPU init error:', gpuError);
    }

    // === PARTICLE RENDERING ===
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_WIDTH * PARTICLE_WIDTH * 3);
    const references = new Float32Array(PARTICLE_WIDTH * PARTICLE_WIDTH * 2);

    for (let i = 0; i < PARTICLE_WIDTH * PARTICLE_WIDTH; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      references[i * 2] = (i % PARTICLE_WIDTH) / PARTICLE_WIDTH;
      references[i * 2 + 1] = Math.floor(i / PARTICLE_WIDTH) / PARTICLE_WIDTH;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('reference', new THREE.BufferAttribute(references, 2));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_positionTexture: { value: null },
        u_particleSize: { value: 3.0 },
        u_particleColor: { value: new THREE.Color(0.53, 0.66, 0.84) },
        u_time: { value: 0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    particleMaterialRef.current = particleMaterial;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.renderOrder = 2;
    scene.add(particles);

    // === ANIMATION LOOP ===
    const animate = () => {
      const delta = Math.min(clockRef.current.getDelta(), 0.05);
      const time = clockRef.current.getElapsedTime();

      // Smooth behavior transitions
      const lerpFactor = 0.03;
      const target = targetBehaviorRef.current;
      const current = currentBehaviorRef.current;

      current.dissolveProgress += (target.dissolveProgress - current.dissolveProgress) * lerpFactor;
      current.windStrength += (target.windStrength - current.windStrength) * lerpFactor;
      current.contourAlpha += (target.contourAlpha - current.contourAlpha) * lerpFactor;
      current.stippleAlpha += (target.stippleAlpha - current.stippleAlpha) * lerpFactor;
      current.handScale += (target.handScale - current.handScale) * lerpFactor;
      current.handPosition[0] += (target.handPosition[0] - current.handPosition[0]) * lerpFactor;
      current.handPosition[1] += (target.handPosition[1] - current.handPosition[1]) * lerpFactor;

      // Update hand shader uniforms
      handMaterial.uniforms.u_time.value = time;
      handMaterial.uniforms.u_mouse.value.copy(mouseRef.current);
      handMaterial.uniforms.u_dissolveProgress.value = current.dissolveProgress;
      handMaterial.uniforms.u_contourAlpha.value = current.contourAlpha;
      handMaterial.uniforms.u_stippleAlpha.value = current.stippleAlpha;
      handMaterial.uniforms.u_handScale.value = current.handScale;
      handMaterial.uniforms.u_handPosition.value.set(current.handPosition[0], current.handPosition[1]);

      // Update GPGPU uniforms
      positionVariable.material.uniforms.u_time.value = time;
      positionVariable.material.uniforms.u_delta.value = delta;
      positionVariable.material.uniforms.u_handPosition.value.set(current.handPosition[0], current.handPosition[1]);
      positionVariable.material.uniforms.u_handScale.value = current.handScale;

      velocityVariable.material.uniforms.u_time.value = time;
      velocityVariable.material.uniforms.u_delta.value = delta;
      velocityVariable.material.uniforms.u_windStrength.value = current.windStrength;

      // Compute GPGPU
      gpuCompute.compute();

      // Update particle texture
      const posTexture = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      particleMaterial.uniforms.u_positionTexture.value = posTexture;
      particleMaterial.uniforms.u_time.value = time;

      // Render
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // === EVENT HANDLERS ===
    const onMouseMove = (e) => {
      mouseRef.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };

    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      handMaterial.uniforms.u_resolution.value.set(innerWidth, innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // === CLEANUP ===
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      handGeometry.dispose();
      handMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (gpuCompute) {
        // GPUComputationRenderer cleanup
        positionTexture.dispose();
        velocityTexture.dispose();
      }
    };
  }, [isDarkMode]);

  // Update behavior when route changes
  useEffect(() => {
    const path = location.pathname;
    const behavior = ROUTE_BEHAVIORS[path] || DEFAULT_BEHAVIOR;
    targetBehaviorRef.current = behavior;
  }, [location.pathname]);

  // Update theme colors
  useEffect(() => {
    if (handMaterialRef.current) {
      handMaterialRef.current.uniforms.u_backgroundColor.value = isDarkMode
        ? new THREE.Vector3(0, 0, 0)
        : new THREE.Vector3(1, 1, 1);
    }
  }, [isDarkMode]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    />
  );
};

export default HandShader;
