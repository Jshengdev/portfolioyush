precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURF_DIST 0.01

// Rotation matrix
mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

// Random function for variability
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// SDF primitives
float sdCylinder(vec3 p, float h, float r) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Scene Description - Stool
float GetDist(vec3 p) {
    // Rotate the whole scene
    p.yz *= rot(u_time * 0.2);
    p.xz *= rot(u_time * 0.1);
    
    // Seat (flat cylinder)
    vec3 seatPos = p - vec3(0.0, 0.8, 0.0);
    float seat = sdCylinder(seatPos, 0.1, 0.6);
    
    // Legs (4 cylinders)
    float legRadius = 0.08;
    float legHeight = 0.8;
    vec3 legOffset = vec3(0.4, -0.4, 0.4);
    
    float leg1 = sdCylinder(p - vec3(legOffset.x, legOffset.y, legOffset.z), legHeight, legRadius);
    float leg2 = sdCylinder(p - vec3(-legOffset.x, legOffset.y, legOffset.z), legHeight, legRadius);
    float leg3 = sdCylinder(p - vec3(legOffset.x, legOffset.y, -legOffset.z), legHeight, legRadius);
    float leg4 = sdCylinder(p - vec3(-legOffset.x, legOffset.y, -legOffset.z), legHeight, legRadius);
    
    // Combine all parts
    float legs = min(min(leg1, leg2), min(leg3, leg4));
    float stool = min(seat, legs);
    
    return stool;
}

// Raymarching Loop
float RayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;
    
    for(int i=0; i<MAX_STEPS; i++) {
        vec3 p = ro + rd * dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO > MAX_DIST || dS < SURF_DIST) break;
    }
    
    return dO;
}

// Calculate Normal
vec3 GetNormal(vec3 p) {
    float d = GetDist(p);
    vec2 e = vec2(0.01, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx)
    );
    
    return normalize(n);
}

// Shape SDFs
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float sdSquare(vec2 p, float r) {
    vec2 d = abs(p) - vec2(r);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdCross(vec2 p, float r, float thickness) {
    p = abs(p);
    float d1 = length(p - vec2(clamp(p.x, 0.0, r), 0.0));
    float d2 = length(p - vec2(0.0, clamp(p.y, 0.0, r)));
    return min(d1, d2) - thickness;
}

// Mixed Halftone with different shapes
float halftone(vec2 uv, float intensity) {
    float frequency = 60.0;
    
    // Rotate grid 45 degrees
    mat2 m = rot(radians(45.0));
    vec2 st = m * uv * frequency;
    
    // Get cell ID for randomness
    vec2 cellId = floor(st);
    float noise = random(cellId);
    
    // Add subtle offset for variability
    vec2 offset = (vec2(noise, fract(noise * 43.758)) - 0.5) * 0.2;
    st += offset;
    
    vec2 nearest = 2.0 * fract(st) - 1.0;
    
    // Calculate radius based on intensity
    // Higher intensity = smaller radius (lighter areas)
    float baseRadius = sqrt(1.0 - intensity) * 1.4;
    
    // Density control: fade out in very light areas
    if (intensity > 0.85) {
        baseRadius *= smoothstep(1.0, 0.85, intensity);
    }
    
    // Choose shape based on intensity
    float shape;
    if (intensity < 0.3) {
        // Dark areas: Squares (solid, dense)
        shape = sdSquare(nearest, baseRadius);
    } else if (intensity < 0.7) {
        // Mid tones: Circles (classic)
        shape = sdCircle(nearest, baseRadius);
    } else {
        // Highlights: Crosses (sparse)
        float crossSize = baseRadius * 0.8;
        float thickness = 0.1;
        shape = sdCross(nearest, crossSize, thickness);
    }
    
    // Convert SDF to binary (inside/outside)
    return smoothstep(0.05, -0.05, shape);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 screenUV = gl_FragCoord.xy / u_resolution.y;

    // Camera
    vec3 ro = vec3(0, 0, -4);
    vec3 rd = normalize(vec3(uv, 1));

    // Render
    float d = RayMarch(ro, rd);
    
    // Lighting
    float light = 0.0;
    
    if(d < MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        
        // Light position (follows mouse)
        vec2 mouse = (u_mouse.xy / u_resolution.xy) * 2.0 - 1.0;
        vec3 lightPos = vec3(mouse.x * 5.0, mouse.y * 5.0, -3.0);
        
        vec3 l = normalize(lightPos - p);
        
        // Diffuse
        float dif = clamp(dot(n, l), 0.0, 1.0);
        
        // Specular
        vec3 r = reflect(-l, n);
        float spec = pow(max(dot(r, -rd), 0.0), 32.0);
        
        // Ambient
        float amb = 0.1;
        
        light = dif + spec + amb;
    } else {
        light = 0.0;
    }
    
    // Clamp light
    light = clamp(light, 0.0, 1.0);
    
    // Apply Halftone with mixed shapes
    float dots = halftone(screenUV, light);
    
    // Colors (Greyscale)
    vec3 colorBg = vec3(0.9, 0.9, 0.9);
    vec3 colorDot = vec3(0.1, 0.1, 0.1);
    
    vec3 finalColor = mix(colorBg, colorDot, dots);

    gl_FragColor = vec4(finalColor, 1.0);
}
