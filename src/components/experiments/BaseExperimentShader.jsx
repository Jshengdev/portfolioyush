import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { ThemeContext } from '../../context/ThemeContext';

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

  useEffect(() => {
    if (!mountRef.current) return;

    // Set background color based on theme
    const bgColor = isDarkMode
      ? new THREE.Vector3(0.0, 0.0, 0.0)    // Dark mode: pure black
      : new THREE.Vector3(1.0, 1.0, 1.0);    // Light mode: pure white

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Animation loop
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
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
  }, [isDarkMode, fragmentShader, customUniforms]);

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
      {/* WebGL Canvas Mount Point */}
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
        </div>
      )}
    </div>
  );
};

export default BaseExperimentShader;
