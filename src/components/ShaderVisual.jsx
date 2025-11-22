import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { ThemeContext } from '../context/ThemeContext';
import vertexShader from '../shaders/truchet.vert.glsl?raw';
import fragmentShader from '../shaders/truchet.frag.glsl?raw';

const ShaderVisual = () => {
  const mountRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

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
