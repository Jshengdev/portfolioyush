# Reusable Patterns

Quick reference when you need to borrow from existing experiments.

---

## Find Code Fast

```bash
# Search for a technique across all experiments
grep -r "noise" src/shaders/experiments/
grep -r "texture" src/components/experiments/
```

---

## Common Patterns

### Load a Texture (v15-v18)
```jsx
// In index.jsx
const [customUniforms] = useState(() => ({
  u_texture: { value: null },
}));

useEffect(() => {
  new THREE.TextureLoader().load('/assets/path/image.png', (tex) => {
    customUniforms.u_texture.value = tex;
  });
}, []);
```
```glsl
// In shader
uniform sampler2D u_texture;
vec4 texColor = texture2D(u_texture, uv);
```

### Add a Slider Control (v18)
```jsx
const [param, setParam] = useState(0.5);

useEffect(() => {
  customUniforms.u_param.value = param;
}, [param]);

// In render:
<input type="range" min="0" max="1" step="0.01"
  value={param} onChange={(e) => setParam(parseFloat(e.target.value))} />
```

### Film Grain (v17)
```glsl
float grain = fract(sin(dot(uv * u_time, vec2(12.9898, 78.233))) * 43758.5453);
color += (grain - 0.5) * 0.1;
```

### Vignette (v17)
```glsl
float vignette = 1.0 - smoothstep(0.4, 0.8, length(uv - 0.5));
color *= vignette;
```

### Basic Noise (many)
```glsl
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
```

---

## Experiments by Category

| Category | Experiments | Key Techniques |
|----------|-------------|----------------|
| Waves/Flow | v1, v5 | Layered sine, fbm |
| Atmospheric | v2, v17 | Fog, grain, vignette |
| Particles | v12, v19 | Point systems, trails |
| Geometric | v8, v9 | SDF, contours |
| Interactive | v6, v14 | Mouse response |
| Math-heavy | v20 | Domain coloring |
| Depth-based | v15, v16, v18 | Texture sampling |

---

## Need More?

If you can't find what you need:
1. Search Shadertoy for the technique
2. Use WebFetch to grab code examples
3. Check iquilezles.org for mathematical foundations
