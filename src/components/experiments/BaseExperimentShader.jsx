import React, { useRef, useEffect, useContext, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Fallback gradient component when WebGL is not supported
 * Displays a subtle gradient that matches the theme
 */
const FallbackGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$isDarkMode
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1a 100%)'
    : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8f0 50%, #f0f0f8 100%)'
  };
  z-index: -1;
`;

/**
 * Check if WebGL is supported in the browser
 * @returns {boolean} true if WebGL is available
 */
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

/**
 * Check if device is likely low-performance
 * Uses heuristics: mobile device detection and CPU core count
 * @returns {boolean} true if device appears to be low-performance
 */
const checkLowPerformance = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowCoreCount = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  return isMobile || isLowCoreCount;
};

/**
 * Default vertex shader - simple pass-through to clip space
 */
const defaultVertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

/**
 * BaseExperimentShader - Reusable Three.js shader component for experimental effects
 *
 * Features:
 * - Accepts custom fragment shaders via prop
 * - Theme-aware background color (responds to dark/light mode)
 * - Mouse position tracking (normalized 0-1)
 * - Window resize handling
 * - Proper cleanup on unmount
 *
 * Base Uniforms (always available in fragment shader):
 * - u_time: float (incrementing time in seconds)
 * - u_resolution: vec2 (window width, height in pixels)
 * - u_mouse: vec2 (normalized mouse position, 0-1)
 * - u_backgroundColor: vec3 (theme-based: black or white)
 *
 * @param {Object} props
 * @param {string} props.fragmentShader - GLSL fragment shader code
 * @param {string} props.title - Title displayed in top-left corner
 * @param {Object} [props.customUniforms={}] - Additional uniforms to pass to shader
 */
const BaseExperimentShader = ({ fragmentShader, title, customUniforms = {} }) => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLowPerf, setIsLowPerf] = useState(false);

  // Check WebGL support and device performance on mount
  useEffect(() => {
    setWebGLSupported(checkWebGLSupport());
    setIsLowPerf(checkLowPerformance());
  }, []);

  useEffect(() => {
    // Don't initialize WebGL if not supported
    if (!webGLSupported) return;
    if (!mountRef.current) return;

    // Set background color based on theme
    const bgColor = isDarkMode
      ? new THREE.Vector3(0.0, 0.0, 0.0)    // Dark mode: pure black
      : new THREE.Vector3(1.0, 1.0, 1.0);    // Light mode: pure white

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    // Create renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowPerf, // Disable antialiasing on low-perf devices
      powerPreference: isLowPerf ? "low-power" : "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Reduce pixel ratio on low-performance devices for better performance
    const maxPixelRatio = isLowPerf ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    mountRef.current.appendChild(renderer.domElement);

    // Create geometry (full-screen quad)
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Build uniforms object: base uniforms + custom uniforms
    const baseUniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_backgroundColor: { value: bgColor },
    };

    // Process custom uniforms to ensure proper THREE.js types
    const processedCustomUniforms = {};
    Object.entries(customUniforms).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'value' in value) {
        // Already in { value: ... } format
        processedCustomUniforms[key] = value;
      } else {
        // Wrap in { value: ... } format
        processedCustomUniforms[key] = { value };
      }
    });

    const uniforms = { ...baseUniforms, ...processedCustomUniforms };

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: defaultVertexShader,
      fragmentShader,
      transparent: true,
    });

    // Create mesh and add to scene
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Track start time for consistent animation
    const startTime = performance.now();
    // Reduce time multiplier on low-performance devices for smoother animation
    const timeMultiplier = isLowPerf ? 0.5 : 1.0;

    // Animation loop
    const animate = () => {
      const elapsedTime = ((performance.now() - startTime) / 1000) * timeMultiplier;
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move handler - normalized coordinates (0-1)
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight; // Flip Y for WebGL coordinates
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Touch handlers for mobile devices - normalized coordinates (0-1)
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1 - touch.clientY / window.innerHeight; // Flip Y for WebGL coordinates
        material.uniforms.u_mouse.value.set(x, y);
      }
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });

    // Resize handler
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      material.uniforms.u_resolution.value.set(innerWidth, innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Remove event listeners
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("resize", onResize);

      // Remove DOM element
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isDarkMode, fragmentShader, customUniforms, webGLSupported, isLowPerf]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {/* WebGL Canvas Mount Point or Fallback */}
      {webGLSupported ? (
        <div
          ref={mountRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <FallbackGradient $isDarkMode={isDarkMode} />
      )}

      {/* Title Overlay */}
      {title && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {title}
          {/* Show indicator for low-perf mode */}
          {isLowPerf && !webGLSupported ? null : isLowPerf && (
            <span style={{ marginLeft: "10px", opacity: 0.5 }}>
              (optimized)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BaseExperimentShader;
