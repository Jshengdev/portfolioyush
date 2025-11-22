import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import vertexShader from '../shaders/truchet.vert.glsl?raw';
import fragmentShader from '../shaders/truchet.frag.glsl?raw';

const ShaderVisual = () => {
  const mountRef = useRef(null);
  const trailBufferRef = useRef([]);
  const MAX_TRAIL_POINTS = 20;

  useEffect(() => {
    // create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2); // create canvas

    // Initialize trail arrays for cursor light trails
    const trailPositions = Array(10).fill(null).map(() => new THREE.Vector2(0, 0));
    const trailStrengths = Array(10).fill(0);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_lightPos: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        // Cursor trail uniforms (Gmunk-inspired light sculpting)
        u_trailCount: { value: 0 },
        u_trailPositions: { value: trailPositions },
        u_trailStrengths: { value: trailStrengths },
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

    /**
     * Add cursor position to trail buffer with decay timestamp
     * Gmunk-inspired "light deposit" system
     */
    const updateTrailBuffer = (x, y) => {
      const currentTime = Date.now();

      // Add new point
      trailBufferRef.current.unshift({
        x,
        y,
        time: currentTime,
        strength: 1.0, // Full strength when created
      });

      // Remove old points (keep last MAX_TRAIL_POINTS)
      if (trailBufferRef.current.length > MAX_TRAIL_POINTS) {
        trailBufferRef.current.pop();
      }

      // Calculate decay for all points
      trailBufferRef.current = trailBufferRef.current.map(point => {
        const age = currentTime - point.time;
        const decayTime = 2000; // 2 seconds to fully decay
        const strength = Math.max(0, 1.0 - (age / decayTime));

        return { ...point, strength };
      }).filter(point => point.strength > 0.01); // Remove nearly invisible points
    };

    /**
     * Convert trail buffer to shader uniforms
     * Passes last N trail points to fragment shader
     */
    const updateTrailUniforms = (material) => {
      const trailCount = Math.min(trailBufferRef.current.length, 10); // Send max 10 points

      // Update trail count
      material.uniforms.u_trailCount.value = trailCount;

      // Update trail positions and strengths
      for (let i = 0; i < 10; i++) {
        if (i < trailCount) {
          const point = trailBufferRef.current[i];
          material.uniforms.u_trailPositions.value[i].set(point.x, point.y);
          material.uniforms.u_trailStrengths.value[i] = point.strength;
        } else {
          // Fill unused slots with zeros
          material.uniforms.u_trailPositions.value[i].set(0, 0);
          material.uniforms.u_trailStrengths.value[i] = 0;
        }
      }
    };

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;

      // Update current mouse position (existing)
      material.uniforms.u_mouse.value.set(x, y);

      // Update trail buffer
      updateTrailBuffer(x, y);

      // Update shader uniforms with trail data
      updateTrailUniforms(material);
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
