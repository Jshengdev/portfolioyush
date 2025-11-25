# 02 - Contour Line Shader Implementation

## Core Algorithm

The standard approach for contour lines uses three GLSL functions:

```glsl
float step = height / interval;     // Normalize to intervals
float f = fract(step);              // Get fractional part (0-1 repeating)
float df = fwidth(step);            // Screen-space derivative
float line = smoothstep(df, df * thickness, f);  // Anti-aliased edge
```

---

## How It Works

### Step 1: Normalize Height to Intervals
```glsl
float step = vHeight / u_contourInterval;
```
- If `u_contourInterval = 0.1` and `vHeight = 0.35`, then `step = 3.5`
- This maps continuous height to "how many intervals"

### Step 2: Extract Fractional Part
```glsl
float f = fract(step);  // fract(3.5) = 0.5
```
- Creates repeating 0→1 pattern at each interval boundary
- When `f` is near 0 or 1, we're at a contour line

### Step 3: Calculate Screen-Space Derivative
```glsl
float df = fwidth(step);  // = abs(dFdx(step)) + abs(dFdy(step))
```
- Measures how fast `step` changes across pixels
- Keeps line width constant regardless of zoom/angle
- **Requires extension in WebGL1**: `#extension GL_OES_standard_derivatives : enable`

### Step 4: Anti-Aliased Edge Detection
```glsl
float line = smoothstep(df, df * u_thickness, f);
line *= smoothstep(df * (2.0 - u_thickness), df * 2.0, f);
```
- `smoothstep` creates soft transition (no jaggies)
- Two smoothsteps detect both edges of the line band

---

## Complete Shader Code

### Vertex Shader
```glsl
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform sampler2D u_depthMap;

varying float vHeight;
varying vec2 vUv;

void main() {
    vUv = uv;

    // Sample depth map for height value
    float depth = texture2D(u_depthMap, uv).r;
    vHeight = depth;

    // Optional: Displace vertices based on depth
    // vec3 displaced = position + vec3(0.0, 0.0, depth * u_displacementScale);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shader
```glsl
#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float u_contourInterval;
uniform float u_contourThickness;
uniform float u_contourAlpha;
uniform vec3 u_contourColor;
uniform bool u_showContours;

varying float vHeight;
varying vec2 vUv;

void main() {
    if (!u_showContours) {
        discard;  // Layer disabled
    }

    // Contour line calculation
    float step = vHeight / u_contourInterval;
    float f = fract(step);
    float df = fwidth(step);

    // Anti-aliased line detection (both edges)
    float line = smoothstep(df * 0.5, df * (0.5 + u_contourThickness), f);
    line *= smoothstep(df * (1.5 - u_contourThickness), df * 1.5, f);

    // Invert: 1.0 = line, 0.0 = no line
    float lineMask = 1.0 - line;

    // Output
    vec3 color = u_contourColor;
    float alpha = lineMask * u_contourAlpha;

    if (alpha < 0.01) discard;  // Skip transparent pixels

    gl_FragColor = vec4(color, alpha);
}
```

---

## Three.js Integration

```javascript
import * as THREE from 'three';

// Load depth map texture
const textureLoader = new THREE.TextureLoader();
const depthMap = textureLoader.load('/assets/hand_depth.png');
depthMap.format = THREE.LuminanceFormat;
depthMap.type = THREE.UnsignedByteType;
depthMap.minFilter = THREE.LinearFilter;
depthMap.magFilter = THREE.LinearFilter;

// Create shader material
const contourMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_depthMap: { value: depthMap },
        u_contourInterval: { value: 0.05 },
        u_contourThickness: { value: 1.5 },
        u_contourAlpha: { value: 0.7 },
        u_contourColor: { value: new THREE.Color(1, 1, 1) },
        u_showContours: { value: true },
    },
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
});

// Create plane geometry
const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const mesh = new THREE.Mesh(geometry, contourMaterial);
scene.add(mesh);
```

---

## Parameter Tuning Guide

| Parameter | Range | Effect |
|-----------|-------|--------|
| `u_contourInterval` | 0.02 - 0.15 | Lower = more lines (denser) |
| `u_contourThickness` | 0.5 - 3.0 | Higher = thicker lines |
| `u_contourAlpha` | 0.3 - 1.0 | Transparency |

**Recommended starting values**:
- `interval: 0.05` (20 contour lines across full depth range)
- `thickness: 1.5` (visible but not overwhelming)
- `alpha: 0.7` (allows background to show through slightly)

---

## Variations

### Variable Thickness Based on Depth
```glsl
// Thicker lines in valleys, thinner on peaks
float depthThickness = mix(2.0, 0.5, vHeight);
float line = smoothstep(df * 0.5, df * (0.5 + depthThickness), f);
```

### Color Gradient Based on Height
```glsl
// Blue in valleys → white on peaks
vec3 valleyColor = vec3(0.53, 0.66, 0.84); // rgba(136, 169, 215)
vec3 peakColor = vec3(1.0, 1.0, 1.0);
vec3 color = mix(valleyColor, peakColor, vHeight);
```

### Animated Contours (Wave Effect)
```glsl
uniform float u_time;

// Slowly moving contour lines
float animatedStep = vHeight / u_contourInterval + u_time * 0.1;
float f = fract(animatedStep);
```

### Breaking Lines Near Edges (Pre-dissolution)
```glsl
// Use noise to break lines at edges
float noise = perlin2d(vUv * 10.0);
float edgeFade = smoothstep(0.0, 0.2, vHeight) * smoothstep(1.0, 0.8, vHeight);
float lineMask = (1.0 - line) * (noise * 0.3 + 0.7) * edgeFade;
```

---

## Common Pitfalls

**Blank screen / no lines visible**:
- Check if `vHeight` range matches `u_contourInterval` scale
- Verify depth map is loading (check console for 404)
- Ensure WebGL extension enabled: `#extension GL_OES_standard_derivatives : enable`

**Jagged/aliased lines**:
- `fwidth()` not working (extension not enabled)
- `u_contourThickness` too small (try 1.5-2.0)

**Lines too dense/sparse**:
- Adjust `u_contourInterval` (smaller = denser)
- Check depth map contrast (should use full 0-1 range)

**Performance issues**:
- Reduce geometry resolution (1x1 subdivision is fine for fragment-only)
- Lower texture resolution (512x512 vs 1024x1024)

---

## Working Examples

- [ShaderToy - Contour Lines](https://www.shadertoy.com/view/lltBWM)
- [Stemkoski Three.js Heightmap](https://stemkoski.github.io/Three.js/Shader-Heightmap-Textures.html)
- [Three.js Forum Discussion](https://discourse.threejs.org/t/drawing-isolines-using-shaders/54382)

---

## Next Steps

1. Generate depth map: [03-HEIGHTMAP.md](03-HEIGHTMAP.md)
2. Add stipple texture (noise-based dots)
3. Integrate with dissolution: [04-DISSOLUTION.md](04-DISSOLUTION.md)
