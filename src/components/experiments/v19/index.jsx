import React, { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';
import fragmentShader from '../../../shaders/experiments/galaxy.frag.glsl?raw';

/**
 * V19: Galaxy Simulator Experiment (Enhanced)
 *
 * Visual Effect:
 * - Procedural spiral galaxy with two logarithmic arms
 * - Central hot bulge (blue-white) with cooler outer disk (red-orange)
 * - Thousands of stars with differential rotation (inner orbits faster)
 * - Mouse controls viewing angle / parallax tilt
 * - MOUSE WHEEL ZOOM with Level-of-Detail system
 * - Enhanced particle effects (star clusters, nebulae, supernovae)
 *
 * Interactions:
 * - Mouse move: Orbit/tilt viewing angle
 * - Mouse wheel: Zoom in/out (0.5x to 10x)
 * - Double-click: Reset zoom to 1x
 */

const CURRENT_ID = 'v19';

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
    border-color: ${props => props.theme.colors.accent.blue};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ZoomIndicator = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  pointer-events: none;
  z-index: 100;

  span {
    display: block;
    margin-top: 4px;
    font-size: 10px;
    opacity: 0.7;
  }
`;

const HelpText = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.05em;
  text-align: right;
  pointer-events: none;
  z-index: 100;
  line-height: 1.6;
`;

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const GalaxyExperiment = () => {
  const navigate = useNavigate();
  const { theme, isDarkMode } = useContext(ThemeContext);
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const materialRef = useRef(null);
  const [zoom, setZoom] = useState(1.0);
  const zoomRef = useRef(1.0);
  const targetZoomRef = useRef(1.0);

  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Smooth zoom interpolation
  const updateZoom = useCallback(() => {
    const diff = targetZoomRef.current - zoomRef.current;
    if (Math.abs(diff) > 0.001) {
      zoomRef.current += diff * 0.1; // Smooth easing
      setZoom(zoomRef.current);
    }
  }, []);

  // Main WebGL setup
  useEffect(() => {
    if (!mountRef.current) return;

    const bgColor = isDarkMode
      ? new THREE.Vector3(0.0, 0.0, 0.0)
      : new THREE.Vector3(1.0, 1.0, 1.0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
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

    const geometry = new THREE.PlaneGeometry(2, 2);
    const actualWidth = window.innerWidth * pixelRatio;
    const actualHeight = window.innerHeight * pixelRatio;

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(actualWidth, actualHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_backgroundColor: { value: bgColor },
      u_zoom: { value: 1.0 },
      u_panOffset: { value: new THREE.Vector2(0.0, 0.0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const startTime = performance.now();

    // Animation loop
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      material.uniforms.u_time.value = elapsedTime;
      material.uniforms.u_zoom.value = zoomRef.current;
      updateZoom();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move handler
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch handlers
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1 - touch.clientY / window.innerHeight;
        material.uniforms.u_mouse.value.set(x, y);
      }
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Mouse wheel zoom handler
    const onWheel = (e) => {
      e.preventDefault();
      const zoomSpeed = 0.001;
      const delta = -e.deltaY * zoomSpeed;

      // Exponential zoom for smooth feel
      const newZoom = targetZoomRef.current * Math.exp(delta * 3);
      targetZoomRef.current = Math.max(0.3, Math.min(15.0, newZoom));
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    // Double-click to reset zoom
    const onDoubleClick = () => {
      targetZoomRef.current = 1.0;
    };
    window.addEventListener('dblclick', onDoubleClick);

    // Pinch zoom for mobile
    let initialPinchDistance = 0;
    let initialPinchZoom = 1;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
        initialPinchZoom = targetZoomRef.current;
      }
    };

    const onPinchMove = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance / initialPinchDistance;
        targetZoomRef.current = Math.max(0.3, Math.min(15.0, initialPinchZoom * scale));
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onPinchMove, { passive: true });

    // Resize handler
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      const resizedWidth = innerWidth * pixelRatio;
      const resizedHeight = innerHeight * pixelRatio;
      material.uniforms.u_resolution.value.set(resizedWidth, resizedHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('dblclick', onDoubleClick);
      window.removeEventListener('resize', onResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isDarkMode, updateZoom]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight') navigate(`/experiments/${next.id}`);
      // Keyboard zoom controls
      if (e.key === '+' || e.key === '=') {
        targetZoomRef.current = Math.min(15.0, targetZoomRef.current * 1.2);
      }
      if (e.key === '-' || e.key === '_') {
        targetZoomRef.current = Math.max(0.3, targetZoomRef.current / 1.2);
      }
      if (e.key === '0') {
        targetZoomRef.current = 1.0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  // Determine LOD level for display
  const getLODLevel = (z) => {
    if (z < 0.6) return 'FAR VIEW';
    if (z < 1.5) return 'GALAXY VIEW';
    if (z < 4.0) return 'SECTOR VIEW';
    if (z < 8.0) return 'CLUSTER VIEW';
    return 'STELLAR VIEW';
  };

  return (
    <>
      <div ref={mountRef} />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          fontFamily: "'Roboto Mono', monospace",
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {CURRENT_ID.toUpperCase()}: {current?.name || 'Galaxy'}
      </div>

      {/* Zoom Indicator */}
      <ZoomIndicator $isDarkMode={isDarkMode}>
        ZOOM: {zoom.toFixed(2)}x
        <span>{getLODLevel(zoom)}</span>
      </ZoomIndicator>

      {/* Help Text */}
      <HelpText $isDarkMode={isDarkMode}>
        SCROLL TO ZOOM<br />
        MOVE MOUSE TO ORBIT<br />
        DOUBLE-CLICK TO RESET<br />
        +/- KEYS FOR ZOOM
      </HelpText>

      {/* Navigation */}
      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default GalaxyExperiment;
