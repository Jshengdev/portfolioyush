precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// --- Utils ---

// Cell noise for the grid pattern
float cellNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    // Simple random value per cell
    float r = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453);
    return r;
}

// SDF for a sphere (used as procedural depth map)
float sdSphere(vec3 p, float s) {
  return length(p) - s;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float aspect = u_resolution.x/u_resolution.y;
    st.x *= aspect;
    
    vec2 mouse = u_mouse.xy; // 0-1
    mouse.x *= aspect;
    
    // Fix initial mouse
    if (u_mouse.x == 0.0 && u_mouse.y == 0.0) {
        mouse = vec2(0.5 * aspect, 0.5);
    }

    // --- 1. Procedural Depth Map ---
    // We simulate a 3D scene: a sphere in the center
    vec2 center = vec2(0.5 * aspect, 0.5);
    float distToCenter = length(st - center);
    
    // Depth: 1.0 (close) to 0.0 (far)
    // Sphere depth profile
    float sphereRadius = 0.3;
    float depth = 0.0;
    
    if (distToCenter < sphereRadius) {
        // Calculate z based on x,y (hemisphere)
        float z = sqrt(sphereRadius*sphereRadius - distToCenter*distToCenter);
        // Normalize z to 0-1 range roughly
        depth = 0.5 + z * 1.5; 
    } else {
        // Background plane depth
        depth = 0.2;
    }
    
    // --- 2. Parallax Distortion ---
    // Offset UVs based on depth and mouse position
    // "Look at" effect: move opposite to mouse
    vec2 parallaxOffset = (mouse - center) * 0.1 * depth;
    vec2 uvDisplaced = st - parallaxOffset;
    
    // --- 3. Base Image (Procedural) ---
    // Re-calculate shape based on displaced UVs to simulate the image texture moving
    float distDisplaced = length(uvDisplaced - center);
    vec3 baseColor = vec3(0.1); // Dark background
    
    if (distDisplaced < sphereRadius) {
        // Sphere texture: some gradient
        vec2 uvSphere = (uvDisplaced - center) / sphereRadius;
        baseColor = vec3(0.2, 0.4, 0.8) + uvSphere.x * 0.2;
    }
    
    // --- 4. Scan Animation ---
    // Loop 0 to 1 every 3 seconds
    float progress = fract(u_time / 3.0);
    
    // Scan line moves across depth (or screen space? User said "compare against scene's depth")
    // Let's compare against depth for that "scanning the object" feel
    // We map progress (0-1) to depth range (0-1)
    // But usually scan moves across screen Y or X. Let's do a "depth scan" wave.
    
    // Actually, user code: abs(depth - uProgress)
    // This implies the scan highlights areas at a specific depth.
    
    float scanDiff = abs(depth - progress);
    float flow = 1.0 - smoothstep(0.0, 0.05, scanDiff); // Highlight band
    
    // --- 5. Dot Grid Mask ---
    // Grid coordinates
    float gridSize = 60.0;
    vec2 gridUV = st * gridSize;
    vec2 gridCell = fract(gridUV) - 0.5;
    
    // Random brightness per cell
    float cellBright = cellNoise(gridUV);
    
    // Dot shape
    float dotDist = length(gridCell);
    float dotMask = 1.0 - smoothstep(0.3, 0.4, dotDist);
    
    // Combine: Dot * Brightness * ScanFlow
    vec3 gridColor = vec3(1.0, 1.0, 1.0) * dotMask * cellBright * flow;
    
    // --- 6. Composition ---
    // User used "Screen" blend: final = blendScreen(tMap, mask)
    // Screen blend: 1 - (1 - a) * (1 - b)
    
    vec3 finalColor = 1.0 - (1.0 - baseColor) * (1.0 - gridColor * 2.0); // Boost grid brightness
    
    // Add scan line glow
    finalColor += vec3(0.0, 0.8, 0.2) * flow * 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
}
