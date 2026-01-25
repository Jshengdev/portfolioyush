import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex shader for particles
const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uMouseRadius;

  attribute float aSize;
  attribute float aRandom;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Add noise-based movement
    float noiseFreq = 0.8;
    float noiseAmp = 0.15;
    float timeScale = 0.3;

    vec3 noisePos = pos * noiseFreq + uTime * timeScale;
    float noise = snoise(noisePos);

    pos.x += noise * noiseAmp;
    pos.y += snoise(noisePos + 100.0) * noiseAmp;
    pos.z += snoise(noisePos + 200.0) * noiseAmp * 0.5;

    // Scroll-based movement
    float scrollInfluence = uScroll * 0.001;
    pos.y += sin(pos.x * 2.0 + scrollInfluence) * 0.1;
    pos.x += cos(pos.y * 2.0 + scrollInfluence) * 0.1;

    // Mouse interaction
    vec2 mousePos = uMouse * 2.0 - 1.0;
    float dist = distance(pos.xy, mousePos);
    float mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);

    vec2 dir = normalize(pos.xy - mousePos + 0.001);
    pos.xy += dir * mouseInfluence * 0.2;

    // Alpha based on position and noise
    vAlpha = 0.3 + 0.5 * (0.5 + 0.5 * sin(aRandom * 6.28 + uTime));
    vAlpha *= smoothstep(1.5, 0.8, length(pos.xy));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_PointSize = max(gl_PointSize, 1.0);
  }
`;

// Fragment shader for particles
const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft edge
    float alpha = vAlpha * smoothstep(0.5, 0.2, dist);

    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Particle system component
function Particles({
  count = 3000,
  colors = ['#9FB8A0', '#D8B4A0', '#C4956A', '#7A9A7A', '#B8A080'],
  blobShape = 'organic', // 'organic', 'circle', 'blob1', 'blob2'
  mouseRadius = 0.5
}) {
  const mesh = useRef();
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const scrollY = useRef(0);
  const { viewport } = useThree();

  // Convert hex colors to RGB
  const colorObjects = useMemo(() =>
    colors.map(c => new THREE.Color(c)),
    [colors]
  );

  // Generate particle positions in organic blob shape
  const [positions, sizes, randoms, particleColors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);
    const particleColors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Generate position in organic blob shape
      let x, y, z;
      let attempts = 0;

      do {
        // Start with random position
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random();

        // Base position
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (Math.random() - 0.5) * 0.2;

        // Apply organic deformation based on shape type
        if (blobShape === 'organic' || blobShape === 'blob1') {
          // Organic blob shape with noise
          const noiseScale = 0.5;
          const angleNoise = Math.sin(angle * 3) * 0.2 + Math.cos(angle * 2) * 0.15;
          const radiusVariation = 0.7 + angleNoise + Math.sin(angle * 5) * 0.1;
          x *= radiusVariation;
          y *= radiusVariation * 0.9;

          // Shift center slightly
          x += 0.1;
          y -= 0.05;
        } else if (blobShape === 'blob2') {
          // Second blob variant (more elongated)
          const radiusVariation = 0.6 + Math.sin(angle * 2) * 0.3 + Math.cos(angle * 4) * 0.1;
          x *= radiusVariation * 1.1;
          y *= radiusVariation * 0.8;
        }

        attempts++;
      } while (attempts < 10 && Math.sqrt(x*x + y*y) > 1.2);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random size
      sizes[i] = Math.random() * 3 + 1;

      // Random value for animation
      randoms[i] = Math.random();

      // Color based on position (gradient effect)
      const gradientPos = (x + 1) / 2; // 0 to 1 based on x position
      const colorIndex = Math.floor(gradientPos * (colorObjects.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, colorObjects.length - 1);
      const colorMix = (gradientPos * (colorObjects.length - 1)) % 1;

      const color = new THREE.Color().lerpColors(
        colorObjects[colorIndex],
        colorObjects[nextColorIndex],
        colorMix
      );

      // Add some random color variation
      const randomColorOffset = (Math.random() - 0.5) * 0.1;
      color.r = Math.max(0, Math.min(1, color.r + randomColorOffset));
      color.g = Math.max(0, Math.min(1, color.g + randomColorOffset));
      color.b = Math.max(0, Math.min(1, color.b + randomColorOffset));

      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    return [positions, sizes, randoms, particleColors];
  }, [count, blobShape, colorObjects]);

  // Uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uMouseRadius: { value: mouseRadius }
  }), [mouseRadius]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - (e.clientY / window.innerHeight)
      };
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation loop
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      mesh.current.material.uniforms.uScroll.value = scrollY.current;
      mesh.current.material.uniforms.uMouse.value.set(
        mousePos.current.x,
        mousePos.current.y
      );
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main component wrapper
export default function ParticleBlobGL({
  className = "",
  particleCount = 3000,
  colors = ['#9FB8A0', '#D8B4A0', '#C4956A', '#7A9A7A'],
  blobShape = 'organic',
  mouseRadius = 0.5
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Particles
          count={particleCount}
          colors={colors}
          blobShape={blobShape}
          mouseRadius={mouseRadius}
        />
      </Canvas>
    </div>
  );
}
