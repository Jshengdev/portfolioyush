precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Custom Uniforms from UI
uniform float u_scale;
uniform float u_distortion;
uniform float u_detail; // Complexity/Octaves (simulated via loop or weight)
uniform float u_contrast;
uniform float u_speed;

// --- Noise Functions ---

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

// Fractal Brownian Motion
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    // Loop based on detail uniform (clamped to int for loop)
    // We'll do fixed loop but fade out higher octaves based on u_detail
    for (int i = 0; i < 6; i++) {
        // Optimization: break if amplitude is too small or exceeds detail
        if (float(i) > u_detail) break;
        
        value += amplitude * snoise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Domain Warping
float domainWarp(vec2 st) {
    vec2 q = vec2(0.);
    q.x = fbm( st + vec2(0.0,0.0) );
    q.y = fbm( st + vec2(5.2,1.3) );

    vec2 r = vec2(0.);
    r.x = fbm( st + 4.0*q + vec2(1.7,9.2) + 0.15*u_time*u_speed );
    r.y = fbm( st + 4.0*q + vec2(8.3,2.8) + 0.126*u_time*u_speed );

    return fbm( st + u_distortion*r );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // Scale
    vec2 pos = st * u_scale;
    
    // Calculate pattern
    float pattern = domainWarp(pos);
    
    // Map -1..1 to 0..1
    float val = pattern * 0.5 + 0.5;
    
    // Contrast
    val = pow(val, u_contrast);
    
    // Colorize (Monotone / Concrete / Cosmic)
    vec3 color = vec3(val);
    
    // Subtle tinting
    vec3 c1 = vec3(0.1, 0.1, 0.15); // Dark
    vec3 c2 = vec3(0.9, 0.9, 0.95); // Light
    
    vec3 finalColor = mix(c1, c2, val);
    
    // Add grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
    finalColor += (grain - 0.5) * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
}
