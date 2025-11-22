import React, { useRef, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import * as THREE from "three";
import { ThemeContext } from '../context/ThemeContext';
import vertexShader from '../shaders/truchet.vert.glsl?raw';
import fragmentShader from '../shaders/truchet.frag.glsl?raw';

/**
 * Shader personality configuration per route
 * Based on ManvsMachine's procedural attribute system
 *
 * Attributes (all 0.0-1.0):
 * - complexity: Pattern density (0=sparse, 1=dense)
 * - energy: Animation speed (0=slow/calm, 1=fast/energetic)
 * - focus: Contrast/sharpness (0=soft, 1=sharp)
 * - warmth: Color temperature (0=cool, 1=warm)
 * - depth: Z-space layering (0=flat, 1=deep)
 */
const shaderPersonalities = {
  '/': {
    // Homepage: Confident, balanced, welcoming
    complexity: 0.5,
    energy: 0.6,
    focus: 0.5,
    warmth: 0.5,
    depth: 0.4,
  },
  '/about': {
    // About: Contemplative, calm, personal
    complexity: 0.3,
    energy: 0.3,
    focus: 0.7,
    warmth: 0.6,
    depth: 0.3,
  },
  '/projects': {
    // Projects: Energetic, structured, professional
    complexity: 0.8,
    energy: 0.7,
    focus: 0.6,
    warmth: 0.4,
    depth: 0.7,
  },
  '/archive': {
    // Archive: Dense, archival, layered
    complexity: 0.9,
    energy: 0.5,
    focus: 0.5,
    warmth: 0.5,
    depth: 0.8,
  },
  '/contact': {
    // Contact: Open, inviting, warm
    complexity: 0.4,
    energy: 0.4,
    focus: 0.6,
    warmth: 0.7,
    depth: 0.4,
  },
  // Project detail pages: Contextual, focused
  'default': {
    complexity: 0.6,
    energy: 0.5,
    focus: 0.7,
    warmth: 0.5,
    depth: 0.5,
  }
};

const ShaderVisual = () => {
  const mountRef = useRef(null);
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

  // Get personality for current route
  const getPersonality = (path) => {
    return shaderPersonalities[path] || shaderPersonalities['default'];
  };

  const currentPersonality = getPersonality(location.pathname);

  useEffect(() => {
    // create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2); // create canvas

    // Background color based on theme
    // Dark mode: very dark gray/black (0.05, 0.05, 0.05)
    // Light mode: very light gray/white (0.95, 0.95, 0.95)
    const bgColor = isDarkMode
      ? new THREE.Vector3(0.05, 0.05, 0.05)
      : new THREE.Vector3(0.95, 0.95, 0.95);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_lightPos: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_backgroundColor: { value: bgColor },

        // Shader personality attributes
        u_complexity: { value: currentPersonality.complexity },
        u_energy: { value: currentPersonality.energy },
        u_focus: { value: currentPersonality.focus },
        u_warmth: { value: currentPersonality.warmth },
        u_depth: { value: currentPersonality.depth },
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      material.uniforms.u_time.value += 0.02; // Increment time for animation
      renderer.render(scene, camera); // Render the scene
      requestAnimationFrame(animate);
    };
    animate();

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      material.uniforms.u_resolution.value.set(innerWidth, innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [isDarkMode, location.pathname, currentPersonality]);

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
