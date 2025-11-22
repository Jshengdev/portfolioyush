import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import vertexShader from '../shaders/truchet.vert.glsl?raw';
import fragmentShader from '../shaders/truchet.frag.glsl?raw';

const ShaderVisual = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2); // create canvas

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_lightPos: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_depth: { value: 0.7 },  // Default depth (0.0-1.0) - will be route-dependent
        u_focus: { value: 0.6 },  // Default focus/sharpness (0.0-1.0) - will be route-dependent
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
  }, []);

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
