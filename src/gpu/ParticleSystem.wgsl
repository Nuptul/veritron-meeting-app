// WebGPU Compute Shader for Ultra-Premium Particle System
// Veritron AI Agency - 2025 Award-Winning WebGPU Implementation

struct Particle {
  position: vec3<f32>,
  velocity: vec3<f32>,
  color: vec4<f32>,
  life: f32,
  size: f32,
  attractorInfluence: f32,
  turbulence: f32,
}

struct SimParams {
  deltaTime: f32,
  time: f32,
  mouseX: f32,
  mouseY: f32,
  attractorStrength: f32,
  turbulenceStrength: f32,
  particleCount: u32,
  screenWidth: f32,
  screenHeight: f32,
  windX: f32,
  windY: f32,
  windZ: f32,
}

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> params: SimParams;

// Simplex noise for organic movement
fn random(seed: vec2<f32>) -> f32 {
  return fract(sin(dot(seed, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn noise3D(p: vec3<f32>) -> f32 {
  let s = vec3<f32>(7.0, 157.0, 113.0);
  let ip = floor(p);
  var fp = fract(p);
  fp = fp * fp * (3.0 - 2.0 * fp);
  
  var result = 0.0;
  for (var i = 0u; i < 2u; i++) {
    for (var j = 0u; j < 2u; j++) {
      for (var k = 0u; k < 2u; k++) {
        let offset = vec3<f32>(f32(i), f32(j), f32(k));
        let h = dot(ip + offset, s);
        let n = random(vec2<f32>(h, h + 1.0));
        let weight = fp.x * f32(i) + (1.0 - fp.x) * f32(1u - i);
        weight *= fp.y * f32(j) + (1.0 - fp.y) * f32(1u - j);
        weight *= fp.z * f32(k) + (1.0 - fp.z) * f32(1u - k);
        result += n * weight;
      }
    }
  }
  
  return result;
}

// Curl noise for fluid-like movement
fn curlNoise(p: vec3<f32>) -> vec3<f32> {
  let epsilon = 0.001;
  let dx = vec3<f32>(epsilon, 0.0, 0.0);
  let dy = vec3<f32>(0.0, epsilon, 0.0);
  let dz = vec3<f32>(0.0, 0.0, epsilon);
  
  let x0 = noise3D(p - dx);
  let x1 = noise3D(p + dx);
  let y0 = noise3D(p - dy);
  let y1 = noise3D(p + dy);
  let z0 = noise3D(p - dz);
  let z1 = noise3D(p + dz);
  
  let x = (y1 - y0 - z1 + z0) / (2.0 * epsilon);
  let y = (z1 - z0 - x1 + x0) / (2.0 * epsilon);
  let z = (x1 - x0 - y1 + y0) / (2.0 * epsilon);
  
  return vec3<f32>(x, y, z);
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  if (index >= params.particleCount) {
    return;
  }
  
  var particle = particles[index];
  
  // Apply curl noise for organic flow
  let noiseScale = 0.5;
  let noisePos = particle.position * noiseScale + vec3<f32>(0.0, params.time * 0.1, 0.0);
  let curl = curlNoise(noisePos) * params.turbulenceStrength * particle.turbulence;
  
  // Mouse attractor with smooth falloff
  let mousePos = vec3<f32>(
    (params.mouseX - 0.5) * 2.0,
    -(params.mouseY - 0.5) * 2.0,
    0.0
  );
  let toMouse = mousePos - particle.position;
  let distToMouse = length(toMouse);
  let attractorForce = normalize(toMouse) * params.attractorStrength * 
                        particle.attractorInfluence / (1.0 + distToMouse * distToMouse);
  
  // Wind forces for ambient movement
  let wind = vec3<f32>(params.windX, params.windY, params.windZ);
  
  // Update velocity with all forces
  particle.velocity += (curl + attractorForce + wind) * params.deltaTime;
  
  // Damping for smooth movement
  particle.velocity *= 0.98;
  
  // Update position
  particle.position += particle.velocity * params.deltaTime;
  
  // Boundary wrapping with smooth transition
  if (particle.position.x > 1.5) {
    particle.position.x = -1.5;
    particle.velocity.x *= 0.5;
  } else if (particle.position.x < -1.5) {
    particle.position.x = 1.5;
    particle.velocity.x *= 0.5;
  }
  
  if (particle.position.y > 1.5) {
    particle.position.y = -1.5;
    particle.velocity.y *= 0.5;
  } else if (particle.position.y < -1.5) {
    particle.position.y = 1.5;
    particle.velocity.y *= 0.5;
  }
  
  // Update life and respawn if needed
  particle.life -= params.deltaTime * 0.2;
  if (particle.life <= 0.0) {
    // Respawn with new properties
    particle.life = 1.0;
    particle.position = vec3<f32>(
      random(vec2<f32>(f32(index), params.time)) * 2.0 - 1.0,
      random(vec2<f32>(f32(index) + 1.0, params.time)) * 2.0 - 1.0,
      random(vec2<f32>(f32(index) + 2.0, params.time)) * 0.5
    );
    particle.velocity = vec3<f32>(0.0, 0.0, 0.0);
    
    // Premium gold gradient colors
    let colorChoice = random(vec2<f32>(f32(index) + 3.0, params.time));
    if (colorChoice < 0.3) {
      particle.color = vec4<f32>(0.831, 0.686, 0.216, 0.8); // Gold
    } else if (colorChoice < 0.6) {
      particle.color = vec4<f32>(0.753, 0.753, 0.753, 0.6); // Silver
    } else if (colorChoice < 0.8) {
      particle.color = vec4<f32>(0.878, 0.878, 0.878, 0.5); // Platinum
    } else {
      particle.color = vec4<f32>(1.0, 0.843, 0.0, 0.7); // Bright Gold
    }
  }
  
  // Pulse size based on life
  particle.size = 2.0 + sin(particle.life * 3.14159) * 1.0;
  
  // Color fade based on life
  particle.color.a = particle.life * 0.8;
  
  // Write back
  particles[index] = particle;
}

// Vertex shader for rendering
@vertex
fn vs_main(
  @builtin(vertex_index) vertex_index: u32,
  @builtin(instance_index) instance_index: u32
) -> @builtin(position) vec4<f32> {
  let particle = particles[instance_index];
  
  // Create billboard quad
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0,  1.0)
  );
  
  let pos = positions[vertex_index];
  let worldPos = particle.position + vec3<f32>(pos * particle.size * 0.01, 0.0);
  
  return vec4<f32>(worldPos.xy, worldPos.z * 0.5 + 0.5, 1.0);
}

// Fragment shader for rendering with glow effect
@fragment
fn fs_main(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  let particleIndex = u32(position.x / 4.0);
  let particle = particles[particleIndex];
  
  // Distance from center for glow effect
  let center = vec2<f32>(position.x - floor(position.x / 4.0) * 4.0 - 2.0,
                          position.y - floor(position.y / 4.0) * 4.0 - 2.0);
  let dist = length(center) / 2.0;
  
  // Soft glow falloff
  let glow = 1.0 - smoothstep(0.0, 1.0, dist);
  let glowIntensity = glow * glow * glow;
  
  // Premium metallic shimmer
  let shimmer = sin(params.time * 2.0 + particle.position.x * 10.0) * 0.1 + 0.9;
  
  return vec4<f32>(
    particle.color.rgb * glowIntensity * shimmer,
    particle.color.a * glowIntensity
  );
}