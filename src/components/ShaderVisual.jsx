import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { ThemeContext } from '../context/ThemeContext';

// Import shader files as raw text
import vertexShader from '../shaders/truchet.vert.glsl?raw';
import fragmentShader from '../shaders/truchet.frag.glsl?raw';

/**
 * ShaderVisual - WebGL background with theme-aware rendering
 *
 * Features:
 * - Route-reactive visual personalities (complexity, energy, focus, warmth, depth)
 * - Theme-aware background color (responds to dark/light mode)
 * - Harmonic motion system (John Whitney-inspired)
 * - Cursor trail light sculpting (Gmunk-inspired)
 * - Multi-layer depth perception (SANAA-inspired)
 *
 * @see /docs/design/SHADER_PHILOSOPHY.md for design principles
 */
const ShaderVisual = () => {
  const mountRef = useRef(null);
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

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    // Default personality attributes (home page values)
    const defaultPersonality = {
      complexity: 0.5,
      energy: 0.6,
      focus: 0.5,
      warmth: 0.5,
      depth: 0.4,
    };

    // Initialize shader material with all uniforms
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_lightPos: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_backgroundColor: { value: bgColor },
        // Personality attributes
        u_complexity: { value: defaultPersonality.complexity },
        u_energy: { value: defaultPersonality.energy },
        u_focus: { value: defaultPersonality.focus },
        u_warmth: { value: defaultPersonality.warmth },
        u_depth: { value: defaultPersonality.depth },
        // Cursor trail system (10 trail positions)
        u_trailCount: { value: 0 },
        u_trailPositions: { value: Array(10).fill(new THREE.Vector2(0, 0)) },
        u_trailStrengths: { value: Array(10).fill(0.0) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation loop
    const animate = () => {
      material.uniforms.u_time.value += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Mouse move handler
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isDarkMode]); // Re-run when theme changes

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default ShaderVisual;
