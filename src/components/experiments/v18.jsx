/**
 * Experiment v18 - Hand Shader Visual System
 *
 * Standalone page for testing the hand shader with:
 * - Topographic contour lines
 * - Stipple texture
 * - Edge dissolution with Perlin noise
 * - GPGPU particle system with wind physics
 *
 * Controls:
 * - Adjust parameters via UI controls
 * - Route changes affect dissolution/wind
 */

import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { ThemeContext } from '../../context/ThemeContext';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

// Import shaders
import handVertexShader from '../../shaders/hand.vert.glsl?raw';
import handFragmentShader from '../../shaders/hand.frag.glsl?raw';
import particleVertexShader from '../../shaders/handParticles.vert.glsl?raw';
import particleFragmentShader from '../../shaders/handParticles.frag.glsl?raw';
import gpgpuPositionShader from '../../shaders/gpgpuPosition.glsl?raw';
import gpgpuVelocityShader from '../../shaders/gpgpuVelocity.glsl?raw';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.background.primary};
`;

const Canvas = styled.div`
  width: 100%;
  height: 100%;
`;

const Controls = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-family: 'Work Sans', monospace;
  font-size: 12px;
  z-index: 1000;
  max-width: 280px;
  backdrop-filter: blur(10px);
`;

const ControlGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 5px;
  }

  span {
    float: right;
    color: rgba(136, 169, 215, 0.8);
  }
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  font-size: 14px;
  color: rgba(136, 169, 215, 1);
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
`;

const BackLink = styled.a`
  position: fixed;
  top: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  z-index: 1000;

  &:hover {
    color: rgba(136, 169, 215, 1);
  }
`;

const Info = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Work Sans', sans-serif;
  font-size: 11px;
  z-index: 1000;
`;

const PARTICLE_WIDTH = 128;

const ExperimentV18 = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  // Control state
  const [controls, setControls] = useState({
    contourInterval: 0.04,
    contourThickness: 1.2,
    contourAlpha: 0.8,
    stippleScale: 80,
    stippleAlpha: 0.25,
    dissolveProgress: 0.0,
    dissolveNoiseScale: 4.0,
    windStrength: 0.3,
    turbulence: 0.5,
    handScale: 0.8,
    showContours: true,
    showStipple: true,
    showDissolution: true,
  });

  // Refs
  const handMaterialRef = useRef(null);
  const velocityVariableRef = useRef(null);
  const positionVariableRef = useRef(null);

  // Update shader uniforms when controls change
  useEffect(() => {
    if (handMaterialRef.current) {
      handMaterialRef.current.uniforms.u_contourInterval.value = controls.contourInterval;
      handMaterialRef.current.uniforms.u_contourThickness.value = controls.contourThickness;
      handMaterialRef.current.uniforms.u_contourAlpha.value = controls.contourAlpha;
      handMaterialRef.current.uniforms.u_stippleScale.value = controls.stippleScale;
      handMaterialRef.current.uniforms.u_stippleAlpha.value = controls.stippleAlpha;
      handMaterialRef.current.uniforms.u_dissolveProgress.value = controls.dissolveProgress;
      handMaterialRef.current.uniforms.u_dissolveNoiseScale.value = controls.dissolveNoiseScale;
      handMaterialRef.current.uniforms.u_handScale.value = controls.handScale;
      handMaterialRef.current.uniforms.u_showContours.value = controls.showContours;
      handMaterialRef.current.uniforms.u_showStipple.value = controls.showStipple;
      handMaterialRef.current.uniforms.u_showDissolution.value = controls.showDissolution;
    }
    if (velocityVariableRef.current) {
      velocityVariableRef.current.material.uniforms.u_windStrength.value = controls.windStrength;
      velocityVariableRef.current.material.uniforms.u_turbulence.value = controls.turbulence;
    }
  }, [controls]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
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

    // Load depth map
    const textureLoader = new THREE.TextureLoader();
    const depthMap = textureLoader.load(
      '/assets/hand_depth.png',
      () => console.log('Depth map loaded'),
      undefined,
      () => {
        console.warn('Using placeholder depth map');
        // Create placeholder
        const size = 512;
        const data = new Uint8Array(size * size);
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const cx = x / size - 0.5;
            const cy = y / size - 0.5;
            const dist = Math.sqrt(cx * cx + cy * cy);
            data[y * size + x] = Math.max(0, 1 - dist * 2) * 255;
          }
        }
        const placeholder = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
        placeholder.needsUpdate = true;
        handMaterialRef.current.uniforms.u_depthMap.value = placeholder;
      }
    );
    depthMap.format = THREE.LuminanceFormat;
    depthMap.minFilter = THREE.LinearFilter;
    depthMap.magFilter = THREE.LinearFilter;

    // Hand material
    const handMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: isDarkMode ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(1, 1, 1) },
        u_depthMap: { value: depthMap },
        u_showContours: { value: true },
        u_showStipple: { value: true },
        u_showDissolution: { value: true },
        u_contourInterval: { value: 0.04 },
        u_contourThickness: { value: 1.2 },
        u_contourAlpha: { value: 0.8 },
        u_contourColor: { value: new THREE.Color(1, 1, 1) },
        u_stippleScale: { value: 80.0 },
        u_stippleThreshold: { value: 0.65 },
        u_stippleAlpha: { value: 0.25 },
        u_dissolveProgress: { value: 0.0 },
        u_dissolveNoiseScale: { value: 4.0 },
        u_dissolveEdgeWidth: { value: 0.08 },
        u_dissolveEdgeColor: { value: new THREE.Color(0.53, 0.66, 0.84) },
        u_handPosition: { value: new THREE.Vector2(0.0, 0.0) },
        u_handScale: { value: 0.8 },
        u_handRotation: { value: 0.0 },
      },
      vertexShader: handVertexShader,
      fragmentShader: handFragmentShader,
      transparent: true,
      depthWrite: false,
    });
    handMaterialRef.current = handMaterial;

    const handMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), handMaterial);
    handMesh.renderOrder = 1;
    scene.add(handMesh);

    // GPGPU setup
    const gpuCompute = new GPUComputationRenderer(PARTICLE_WIDTH, PARTICLE_WIDTH, renderer);

    const positionTexture = gpuCompute.createTexture();
    const positionData = positionTexture.image.data;
    for (let i = 0; i < positionData.length; i += 4) {
      positionData[i] = (Math.random() - 0.5) * 1.5;
      positionData[i + 1] = (Math.random() - 0.5) * 1.5;
      positionData[i + 2] = 0;
      positionData[i + 3] = Math.random() * 5;
    }

    const velocityTexture = gpuCompute.createTexture();
    const velocityData = velocityTexture.image.data;
    for (let i = 0; i < velocityData.length; i += 4) {
      velocityData[i] = (Math.random() - 0.5) * 0.1;
      velocityData[i + 1] = (Math.random() - 0.5) * 0.1;
      velocityData[i + 2] = 0;
      velocityData[i + 3] = 1;
    }

    const positionVariable = gpuCompute.addVariable('texturePosition', gpgpuPositionShader, positionTexture);
    const velocityVariable = gpuCompute.addVariable('textureVelocity', gpgpuVelocityShader, velocityTexture);

    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);

    positionVariable.material.uniforms.u_time = { value: 0 };
    positionVariable.material.uniforms.u_delta = { value: 0.016 };
    positionVariable.material.uniforms.u_edgeMask = { value: depthMap };
    positionVariable.material.uniforms.u_handPosition = { value: new THREE.Vector2(0, 0) };
    positionVariable.material.uniforms.u_handScale = { value: 0.8 };

    velocityVariable.material.uniforms.u_time = { value: 0 };
    velocityVariable.material.uniforms.u_delta = { value: 0.016 };
    velocityVariable.material.uniforms.u_windStrength = { value: 0.3 };
    velocityVariable.material.uniforms.u_windDirection = { value: new THREE.Vector3(1, 0.2, 0) };
    velocityVariable.material.uniforms.u_turbulence = { value: 0.5 };

    positionVariableRef.current = positionVariable;
    velocityVariableRef.current = velocityVariable;

    gpuCompute.init();

    // Particle mesh
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

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.renderOrder = 2;
    scene.add(particles);

    // Animation
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      handMaterial.uniforms.u_time.value = time;

      positionVariable.material.uniforms.u_time.value = time;
      positionVariable.material.uniforms.u_delta.value = delta;
      velocityVariable.material.uniforms.u_time.value = time;
      velocityVariable.material.uniforms.u_delta.value = delta;

      gpuCompute.compute();

      particleMaterial.uniforms.u_positionTexture.value =
        gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      particleMaterial.uniforms.u_time.value = time;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse handler
    const onMouseMove = (e) => {
      handMaterial.uniforms.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      handMaterial.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Container>
      <Canvas ref={mountRef} />

      <BackLink href="/experiments">← EXPERIMENTS</BackLink>

      <Controls>
        <Title>v18 Hand Shader</Title>

        <ControlGroup>
          <label>Contour Interval <span>{controls.contourInterval.toFixed(3)}</span></label>
          <input
            type="range"
            min="0.02"
            max="0.15"
            step="0.005"
            value={controls.contourInterval}
            onChange={(e) => updateControl('contourInterval', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Contour Thickness <span>{controls.contourThickness.toFixed(1)}</span></label>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={controls.contourThickness}
            onChange={(e) => updateControl('contourThickness', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Contour Alpha <span>{controls.contourAlpha.toFixed(2)}</span></label>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={controls.contourAlpha}
            onChange={(e) => updateControl('contourAlpha', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Stipple Scale <span>{controls.stippleScale}</span></label>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={controls.stippleScale}
            onChange={(e) => updateControl('stippleScale', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Dissolution <span>{(controls.dissolveProgress * 100).toFixed(0)}%</span></label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={controls.dissolveProgress}
            onChange={(e) => updateControl('dissolveProgress', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Wind Strength <span>{controls.windStrength.toFixed(2)}</span></label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={controls.windStrength}
            onChange={(e) => updateControl('windStrength', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Turbulence <span>{controls.turbulence.toFixed(2)}</span></label>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.05"
            value={controls.turbulence}
            onChange={(e) => updateControl('turbulence', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>Hand Scale <span>{controls.handScale.toFixed(2)}</span></label>
          <input
            type="range"
            min="0.3"
            max="1.5"
            step="0.05"
            value={controls.handScale}
            onChange={(e) => updateControl('handScale', parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={controls.showContours}
              onChange={(e) => updateControl('showContours', e.target.checked)}
            /> Show Contours
          </label>
        </ControlGroup>

        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={controls.showStipple}
              onChange={(e) => updateControl('showStipple', e.target.checked)}
            /> Show Stipple
          </label>
        </ControlGroup>

        <ControlGroup>
          <label>
            <input
              type="checkbox"
              checked={controls.showDissolution}
              onChange={(e) => updateControl('showDissolution', e.target.checked)}
            /> Show Dissolution
          </label>
        </ControlGroup>
      </Controls>

      <Info>
        v18 • Hand Shader • {PARTICLE_WIDTH * PARTICLE_WIDTH} particles
      </Info>
    </Container>
  );
};

export default ExperimentV18;
