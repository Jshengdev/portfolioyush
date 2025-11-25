precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractal Brownian Motion for more detail
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    // Loop of octaves
    for (int i = 0; i < 3; i++) {
        value += amplitude * snoise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 mouse = u_mouse.xy/u_resolution.xy;
    mouse.x *= u_resolution.x/u_resolution.y;
    
    // Fix for initial mouse position
    if (u_mouse.x == 0.0 && u_mouse.y == 0.0) {
        mouse = vec2(0.5 * (u_resolution.x/u_resolution.y), 0.5);
    }

    // --- Interactive Flow ---
    // Distort the coordinate space based on mouse distance
    float dist = length(st - mouse);
    vec2 dir = normalize(st - mouse);
    
    // Create a "push" effect
    float interact = smoothstep(0.4, 0.0, dist);
    vec2 offset = dir * interact * 0.05;
    
    // Apply offset to coordinates for the noise lookup
    vec2 pos = st + offset;

    // --- Layered Noise (The "Fog") ---
    // Layer 1: Slow, large movements
    float n1 = snoise(pos * 3.0 + vec2(u_time * 0.1, u_time * 0.05));
    
    // Layer 2: Medium speed, medium detail
    float n2 = snoise(pos * 8.0 - vec2(u_time * 0.2));
    
    // Layer 3: Fast, fine detail (FBM)
    float n3 = fbm(pos * 15.0 + u_time * 0.3);
    
    // Combine layers
    float noiseSum = (n1 * 0.5) + (n2 * 0.3) + (n3 * 0.2);
    
    // Map to 0-1 range roughly
    float fog = 0.5 + 0.5 * noiseSum;
    
    // --- Retro Grain ---
    // High frequency static
    float staticNoise = snoise(st * 800.0 + u_time * 50.0);
    float grain = (staticNoise * 0.5 + 0.5) * 0.15; // 15% intensity
    
    // --- Vignette ---
    vec2 center = vec2(0.5 * (u_resolution.x/u_resolution.y), 0.5);
    float distToCenter = length(st - center);
    float vignette = 1.0 - smoothstep(0.4, 1.5, distToCenter);
    
    // --- Color Composition ---
    // Base dark grey
    vec3 color = vec3(0.1, 0.1, 0.12);
    
    // Add fog (lighter grey/blue tint)
    color += vec3(0.6, 0.65, 0.7) * fog * 0.3;
    
    // Add grain
    color += vec3(grain);
    
    // Apply vignette
    color *= vignette;
    
    // Scanlines (subtle)
    float scanline = sin(st.y * 600.0) * 0.02;
    color -= scanline;

    gl_FragColor = vec4(color, 1.0);
}
