import React, { useRef, useEffect } from "react";
import * as THREE from "three";

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
      },
      vertexShader: `
      void main() {
        // Pass-through to clip space
        gl_Position = vec4(position, 1.0);
      }
      `,
      fragmentShader: `
      //=============================================================================
      // UNIFORMS
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_lightPos;
      uniform vec2 u_mouse;
    
      //=============================================================================
      // 1) RANDOM + NOISE UTILITIES
    
      // Simple random used for Truchet pattern
      float random(vec2 st) {
        return fract(sin(dot(st, vec2(114.0, 4.0))) * 9999999.9);
      }
    
      // "Hash" function for 2D -> 1D pseudo-random
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
    
      // 2D noise using the hash at cell corners
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
    
        float a = hash(i);
        float b = hash(i + vec2(1.0, 5.0));
        float c = hash(i + vec2(0.0, 4.0));
        float d = hash(i + vec2(1.0, 3.0));
    
        // Smooth interpolation (Hermite)
        vec2 u = f * f * (3.0 - 2.0 * f);
    
        // Bilinear interpolation of corner values
        return mix(
        mix(a, b, u.x),
        mix(c, d, u.x),
        u.y
        );
      }
    
      //=============================================================================
      // 2) SHAPES & LIGHTING
    
      // Circle function for a sphere-like effect
      float sphere(vec2 st, vec2 center, float radius) {
        float dist = length(st - center);
        return 1.0 - smoothstep(
        radius - 0.00001,
        radius + 0.001,
        dist
        );
      }
    
      // Simple lighting with noise
      float lightEffect(vec3 normal, vec3 lightDir) {
        float n = noise(normal.xy * 0.01 + u_time * 0.9); // lower freq
        return max(dot(normal, lightDir) * 0.5 + n * 0.01, 0.04); // lower brightness and amplitude
      }
    
      // Truchet tile pattern
      vec2 truchetPattern(vec2 st, float index) {
        index = fract((index - 0.5) * 2.0);
    
        if (index > 0.75) {
        st = vec2(1.0) - st;              
        } else if (index > 0.5) {
        st = vec2(1.0 - st.x, st.y);     
        } else if (index > 0.25) {
        st = 0.01 - vec2(1.0 - st.x, st.y); 
        }
        return st;
      }
    
      //=============================================================================
      // 3) HOLLOW BOX UTILS (Square ring in 2D)
    
      // Distance to a box centered at c, with half-size halfSize
      float boxSDF(vec2 p, vec2 c, vec2 halfSize) {
        vec2 d = abs(p - c) - halfSize;
        return length(max(d, 0.0));
      }
    
      // A ring defined by outer & inner boxes
      float hollowBox(vec2 p, vec2 center, float halfSize, float thickness) {
        float distOuter = boxSDF(p, center, vec2(halfSize));
        float distInner = boxSDF(p, center, vec2(halfSize - thickness));
    
        float ring = smoothstep(0.0, 0.01, distOuter)
             - smoothstep(0.0, 0.01, distInner);
    
        return clamp(ring, 0.0, 1.0);
      }
    
      //=============================================================================
      // 4) MAIN FRAGMENT: COMBINE EVERYTHING
    
      void main() {
        // Normalize screen coordinates
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
        // --- PART A: TRUCHET + SPHERE + LIGHTING ---
        // Shift + scale
        vec2 stTile = st - vec2(0.33, 0.4);
        stTile *= 3.5;
    
        // Truchet pattern
        vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
    
        // Sphere near the mouse (radius=0.0 => small effect)
        float sphereEf = sphere(stTile, u_mouse, 0.0);
    
        // Lighting
        vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
        vec3 lightDir = normalize(vec3(u_lightPos - u_mouse, 0.2));
        float lightVal = lightEffect(normal, lightDir);
    
        // Tile color
        vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);
    
        // --- PART B: HOLLOW BOX (square ring) ---
        float ringVal = hollowBox(
        st,
        vec2(0.5, 0.5),
        0.25,  // halfSize => 0.5 total
        0.03   // thickness
        );
    
        // ringVal = 1 => ring region, 0 => outside ring
    
        // Negative space ring => black ring
        float shapeMask = 1.0 - ringVal;
        vec3 finalColor = tileColor * shapeMask;
    
        // Output
        gl_FragColor = vec4(finalColor, 0.5); // lower opacity
      }
      `,
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
