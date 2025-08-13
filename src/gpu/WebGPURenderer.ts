// WebGPU Renderer for Award-Winning Particle System
// Veritron AI Agency - 2025 Implementation

// Inline WGSL shader code to avoid import issues
const particleShader = `
// WebGPU Compute Shader for Ultra-Premium Particle System
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
  
  let noiseScale = 0.5;
  let noisePos = particle.position * noiseScale + vec3<f32>(0.0, params.time * 0.1, 0.0);
  let curl = curlNoise(noisePos) * params.turbulenceStrength * particle.turbulence;
  
  let mousePos = vec3<f32>(
    (params.mouseX - 0.5) * 2.0,
    -(params.mouseY - 0.5) * 2.0,
    0.0
  );
  let toMouse = mousePos - particle.position;
  let distToMouse = length(toMouse);
  let attractorForce = normalize(toMouse) * params.attractorStrength * 
                        particle.attractorInfluence / (1.0 + distToMouse * distToMouse);
  
  let wind = vec3<f32>(params.windX, params.windY, params.windZ);
  
  particle.velocity += (curl + attractorForce + wind) * params.deltaTime;
  particle.velocity *= 0.98;
  particle.position += particle.velocity * params.deltaTime;
  
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
  
  particle.life -= params.deltaTime * 0.2;
  if (particle.life <= 0.0) {
    particle.life = 1.0;
    particle.position = vec3<f32>(
      random(vec2<f32>(f32(index), params.time)) * 2.0 - 1.0,
      random(vec2<f32>(f32(index) + 1.0, params.time)) * 2.0 - 1.0,
      random(vec2<f32>(f32(index) + 2.0, params.time)) * 0.5
    );
    particle.velocity = vec3<f32>(0.0, 0.0, 0.0);
    
    let colorChoice = random(vec2<f32>(f32(index) + 3.0, params.time));
    if (colorChoice < 0.3) {
      particle.color = vec4<f32>(0.831, 0.686, 0.216, 0.8);
    } else if (colorChoice < 0.6) {
      particle.color = vec4<f32>(0.753, 0.753, 0.753, 0.6);
    } else if (colorChoice < 0.8) {
      particle.color = vec4<f32>(0.878, 0.878, 0.878, 0.5);
    } else {
      particle.color = vec4<f32>(1.0, 0.843, 0.0, 0.7);
    }
  }
  
  particle.size = 2.0 + sin(particle.life * 3.14159) * 1.0;
  particle.color.a = particle.life * 0.8;
  
  particles[index] = particle;
}
`;

export interface WebGPURendererOptions {
  canvas: HTMLCanvasElement;
  particleCount?: number;
  devicePixelRatio?: number;
  enableLOD?: boolean;
}

export class WebGPURenderer {
  private device: GPUDevice | null = null;
  private context: GPUCanvasContext | null = null;
  private pipeline: GPUComputePipeline | null = null;
  private renderPipeline: GPURenderPipeline | null = null;
  private particleBuffer: GPUBuffer | null = null;
  private paramsBuffer: GPUBuffer | null = null;
  private bindGroup: GPUBindGroup | null = null;
  private particleCount: number;
  private canvas: HTMLCanvasElement;
  private frameCount = 0;
  private lastTime = performance.now();
  private mouseX = 0.5;
  private mouseY = 0.5;
  private isInitialized = false;
  private animationId: number | null = null;
  private LODLevel = 0;
  private enableLOD: boolean;
  private fpsHistory: number[] = [];
  private targetFPS = 120;

  constructor(options: WebGPURendererOptions) {
    this.canvas = options.canvas;
    this.particleCount = options.particleCount || 10000;
    this.enableLOD = options.enableLOD ?? true;
    
    // Set up canvas resolution
    const dpr = options.devicePixelRatio || window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
  }

  async init(): Promise<boolean> {
    try {
      // Check WebGPU support
      if (!navigator.gpu) {
        console.warn('WebGPU not supported, falling back to WebGL');
        return false;
      }

      // Request adapter with high performance preference
      const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
      });

      if (!adapter) {
        console.warn('No WebGPU adapter found');
        return false;
      }

      // Check for required features
      const requiredFeatures: GPUFeatureName[] = [];
      if (adapter.features.has('timestamp-query')) {
        requiredFeatures.push('timestamp-query');
      }

      // Request device with optimal limits
      this.device = await adapter.requestDevice({
        requiredFeatures,
        requiredLimits: {
          maxBufferSize: 512 * 1024 * 1024, // 512MB
          maxStorageBufferBindingSize: 128 * 1024 * 1024, // 128MB
          maxComputeWorkgroupStorageSize: 32 * 1024, // 32KB
          maxComputeInvocationsPerWorkgroup: 512,
        },
      });

      // Configure canvas context
      this.context = this.canvas.getContext('webgpu');
      if (!this.context) {
        throw new Error('Could not get WebGPU context');
      }

      const format = navigator.gpu.getPreferredCanvasFormat();
      this.context.configure({
        device: this.device,
        format,
        colorSpace: 'display-p3',
        alphaMode: 'premultiplied',
      });

      // Initialize particle data
      await this.initializeParticles();
      
      // Create compute pipeline
      await this.createComputePipeline();
      
      // Create render pipeline
      await this.createRenderPipeline();

      // Set up event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('WebGPU initialization failed:', error);
      return false;
    }
  }

  private async initializeParticles() {
    if (!this.device) return;

    // Particle structure: position (3), velocity (3), color (4), life (1), size (1), attractorInfluence (1), turbulence (1)
    const particleSize = 14 * Float32Array.BYTES_PER_ELEMENT;
    const particleData = new Float32Array(this.particleCount * 14);

    // Initialize particles with premium distribution
    for (let i = 0; i < this.particleCount; i++) {
      const offset = i * 14;
      
      // Position - distributed in 3D space
      particleData[offset + 0] = (Math.random() - 0.5) * 2; // x
      particleData[offset + 1] = (Math.random() - 0.5) * 2; // y
      particleData[offset + 2] = Math.random() * 0.5; // z depth
      
      // Velocity - initial slow drift
      particleData[offset + 3] = (Math.random() - 0.5) * 0.1;
      particleData[offset + 4] = (Math.random() - 0.5) * 0.1;
      particleData[offset + 5] = 0;
      
      // Color - premium metallic palette
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Gold
        particleData[offset + 6] = 0.831;
        particleData[offset + 7] = 0.686;
        particleData[offset + 8] = 0.216;
        particleData[offset + 9] = 0.8;
      } else if (colorChoice < 0.6) {
        // Silver
        particleData[offset + 6] = 0.753;
        particleData[offset + 7] = 0.753;
        particleData[offset + 8] = 0.753;
        particleData[offset + 9] = 0.6;
      } else if (colorChoice < 0.8) {
        // Platinum
        particleData[offset + 6] = 0.878;
        particleData[offset + 7] = 0.878;
        particleData[offset + 8] = 0.878;
        particleData[offset + 9] = 0.5;
      } else {
        // Bright Gold
        particleData[offset + 6] = 1.0;
        particleData[offset + 7] = 0.843;
        particleData[offset + 8] = 0.0;
        particleData[offset + 9] = 0.7;
      }
      
      // Life
      particleData[offset + 10] = Math.random();
      
      // Size
      particleData[offset + 11] = 1.0 + Math.random() * 2.0;
      
      // Attractor influence
      particleData[offset + 12] = 0.5 + Math.random() * 0.5;
      
      // Turbulence
      particleData[offset + 13] = 0.5 + Math.random() * 0.5;
    }

    // Create particle buffer
    this.particleBuffer = this.device.createBuffer({
      size: particleData.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });

    new Float32Array(this.particleBuffer.getMappedRange()).set(particleData);
    this.particleBuffer.unmap();

    // Create simulation parameters buffer
    const paramsSize = 12 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT;
    this.paramsBuffer = this.device.createBuffer({
      size: paramsSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  }

  private async createComputePipeline() {
    if (!this.device || !this.particleBuffer || !this.paramsBuffer) return;

    // Create compute shader module
    const computeModule = this.device.createShaderModule({
      label: 'Particle Compute Shader',
      code: particleShader,
    });

    // Create bind group layout
    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: 'storage' },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: 'uniform' },
        },
      ],
    });

    // Create pipeline layout
    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    // Create compute pipeline
    this.pipeline = this.device.createComputePipeline({
      layout: pipelineLayout,
      compute: {
        module: computeModule,
        entryPoint: 'main',
      },
    });

    // Create bind group
    this.bindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: { buffer: this.particleBuffer },
        },
        {
          binding: 1,
          resource: { buffer: this.paramsBuffer },
        },
      ],
    });
  }

  private async createRenderPipeline() {
    if (!this.device || !this.context) return;

    const format = navigator.gpu.getPreferredCanvasFormat();

    // Create render shader module
    const renderModule = this.device.createShaderModule({
      label: 'Particle Render Shader',
      code: particleShader,
    });

    // Create render pipeline
    this.renderPipeline = this.device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: renderModule,
        entryPoint: 'vs_main',
      },
      fragment: {
        module: renderModule,
        entryPoint: 'fs_main',
        targets: [
          {
            format,
            blend: {
              color: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add',
              },
              alpha: {
                srcFactor: 'one',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add',
              },
            },
          },
        ],
      },
      primitive: {
        topology: 'triangle-strip',
      },
    });
  }

  private setupEventListeners() {
    // Mouse tracking for attractor
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) / rect.width;
      this.mouseY = (e.clientY - rect.top) / rect.height;
    });

    // Touch support for mobile
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        this.mouseX = (touch.clientX - rect.left) / rect.width;
        this.mouseY = (touch.clientY - rect.top) / rect.height;
      }
    });

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  private handleResize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    
    if (this.context && this.device) {
      const format = navigator.gpu.getPreferredCanvasFormat();
      this.context.configure({
        device: this.device,
        format,
        colorSpace: 'display-p3',
        alphaMode: 'premultiplied',
      });
    }
  }

  private updateLOD() {
    if (!this.enableLOD) return;

    // Calculate average FPS
    const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;

    // Adjust LOD based on performance
    if (avgFPS < 30 && this.LODLevel < 2) {
      this.LODLevel++;
      this.adjustParticleCount();
    } else if (avgFPS > 60 && this.LODLevel > 0) {
      this.LODLevel--;
      this.adjustParticleCount();
    }
  }

  private adjustParticleCount() {
    const lodMultipliers = [1.0, 0.5, 0.25];
    const newCount = Math.floor(10000 * lodMultipliers[this.LODLevel]);
    
    if (newCount !== this.particleCount) {
      this.particleCount = newCount;
      this.initializeParticles();
    }
  }

  render() {
    if (!this.isInitialized || !this.device || !this.context || !this.pipeline || !this.bindGroup || !this.paramsBuffer) {
      return;
    }

    // Calculate deltaTime and FPS
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    const fps = 1 / deltaTime;
    
    this.fpsHistory.push(fps);
    if (this.fpsHistory.length > 60) {
      this.fpsHistory.shift();
    }
    
    // Update LOD every 60 frames
    if (this.frameCount % 60 === 0) {
      this.updateLOD();
    }

    // Update simulation parameters
    const params = new Float32Array([
      deltaTime,                    // deltaTime
      currentTime / 1000,           // time
      this.mouseX,                  // mouseX
      this.mouseY,                  // mouseY
      0.5,                         // attractorStrength
      1.0,                         // turbulenceStrength
      this.particleCount,          // particleCount (as float for alignment)
      this.canvas.width,           // screenWidth
      this.canvas.height,          // screenHeight
      Math.sin(currentTime / 3000) * 0.1,  // windX
      Math.cos(currentTime / 4000) * 0.05, // windY
      Math.sin(currentTime / 5000) * 0.02, // windZ
    ]);

    this.device.queue.writeBuffer(this.paramsBuffer, 0, params);

    // Create command encoder
    const commandEncoder = this.device.createCommandEncoder();

    // Compute pass
    const computePass = commandEncoder.beginComputePass();
    computePass.setPipeline(this.pipeline);
    computePass.setBindGroup(0, this.bindGroup);
    
    const workgroupCount = Math.ceil(this.particleCount / 256);
    computePass.dispatchWorkgroups(workgroupCount);
    computePass.end();

    // Render pass
    const textureView = this.context.getCurrentTexture().createView();
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
    if (this.renderPipeline) {
      renderPass.setPipeline(this.renderPipeline);
      renderPass.draw(4, this.particleCount);
    }
    renderPass.end();

    // Submit commands
    this.device.queue.submit([commandEncoder.finish()]);

    this.lastTime = currentTime;
    this.frameCount++;
  }

  start() {
    if (!this.isInitialized) {
      console.warn('WebGPU renderer not initialized');
      return;
    }

    const animate = () => {
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy() {
    this.stop();
    
    if (this.particleBuffer) {
      this.particleBuffer.destroy();
    }
    if (this.paramsBuffer) {
      this.paramsBuffer.destroy();
    }
    if (this.device) {
      this.device.destroy();
    }
    
    this.isInitialized = false;
  }

  // Performance metrics
  getPerformanceMetrics() {
    const avgFPS = this.fpsHistory.length > 0
      ? this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
      : 0;

    return {
      fps: Math.round(avgFPS),
      particleCount: this.particleCount,
      lodLevel: this.LODLevel,
      frameTime: avgFPS > 0 ? 1000 / avgFPS : 0,
    };
  }
}

// WebGL2 Fallback for browsers without WebGPU support
export class WebGL2Fallback {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private particleCount: number;
  private canvas: HTMLCanvasElement;
  private positions: Float32Array;
  private velocities: Float32Array;
  private colors: Float32Array;
  private animationId: number | null = null;

  constructor(options: WebGPURendererOptions) {
    this.canvas = options.canvas;
    this.particleCount = Math.min(options.particleCount || 5000, 5000); // Limit for WebGL2
    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    this.colors = new Float32Array(this.particleCount * 4);
  }

  async init(): Promise<boolean> {
    try {
      this.gl = this.canvas.getContext('webgl2', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });

      if (!this.gl) {
        console.error('WebGL2 not supported');
        return false;
      }

      // Create shaders
      const vertexShader = this.createShader(this.gl.VERTEX_SHADER, `#version 300 es
        precision highp float;
        
        in vec3 position;
        in vec4 color;
        
        uniform mat4 projection;
        uniform float time;
        uniform float pointSize;
        
        out vec4 vColor;
        
        void main() {
          gl_Position = projection * vec4(position, 1.0);
          gl_PointSize = pointSize * (1.0 + sin(time + position.x * 10.0) * 0.2);
          vColor = color;
        }
      `);

      const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, `#version 300 es
        precision highp float;
        
        in vec4 vColor;
        out vec4 fragColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) {
            discard;
          }
          
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          fragColor = vec4(vColor.rgb, vColor.a * glow * glow);
        }
      `);

      if (!vertexShader || !fragmentShader) {
        return false;
      }

      // Create program
      this.program = this.gl.createProgram()!;
      this.gl.attachShader(this.program, vertexShader);
      this.gl.attachShader(this.program, fragmentShader);
      this.gl.linkProgram(this.program);

      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        console.error('Failed to link WebGL program');
        return false;
      }

      // Initialize particles
      this.initializeParticles();

      // Set up WebGL state
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

      return true;
    } catch (error) {
      console.error('WebGL2 initialization failed:', error);
      return false;
    }
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation failed:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private initializeParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Position
      this.positions[i3] = (Math.random() - 0.5) * 2;
      this.positions[i3 + 1] = (Math.random() - 0.5) * 2;
      this.positions[i3 + 2] = Math.random() * 0.5;

      // Velocity
      this.velocities[i3] = (Math.random() - 0.5) * 0.01;
      this.velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      this.velocities[i3 + 2] = 0;

      // Color - metallic palette
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Gold
        this.colors[i4] = 0.831;
        this.colors[i4 + 1] = 0.686;
        this.colors[i4 + 2] = 0.216;
        this.colors[i4 + 3] = 0.8;
      } else if (colorChoice < 0.7) {
        // Silver
        this.colors[i4] = 0.753;
        this.colors[i4 + 1] = 0.753;
        this.colors[i4 + 2] = 0.753;
        this.colors[i4 + 3] = 0.6;
      } else {
        // Platinum
        this.colors[i4] = 0.878;
        this.colors[i4 + 1] = 0.878;
        this.colors[i4 + 2] = 0.878;
        this.colors[i4 + 3] = 0.5;
      }
    }
  }

  render() {
    if (!this.gl || !this.program) return;

    // Clear
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Use program
    this.gl.useProgram(this.program);

    // Update particles
    const time = performance.now() / 1000;
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Simple physics update
      this.positions[i3] += this.velocities[i3];
      this.positions[i3 + 1] += this.velocities[i3 + 1];
      this.positions[i3 + 2] += this.velocities[i3 + 2];

      // Wrap around
      if (this.positions[i3] > 1) this.positions[i3] = -1;
      if (this.positions[i3] < -1) this.positions[i3] = 1;
      if (this.positions[i3 + 1] > 1) this.positions[i3 + 1] = -1;
      if (this.positions[i3 + 1] < -1) this.positions[i3 + 1] = 1;

      // Add some turbulence
      this.velocities[i3] += (Math.random() - 0.5) * 0.0001;
      this.velocities[i3 + 1] += (Math.random() - 0.5) * 0.0001;
    }

    // Set uniforms
    const projectionLoc = this.gl.getUniformLocation(this.program, 'projection');
    const timeLoc = this.gl.getUniformLocation(this.program, 'time');
    const pointSizeLoc = this.gl.getUniformLocation(this.program, 'pointSize');

    const projection = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    this.gl.uniformMatrix4fv(projectionLoc, false, projection);
    this.gl.uniform1f(timeLoc, time);
    this.gl.uniform1f(pointSizeLoc, 5.0);

    // Set attributes
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.DYNAMIC_DRAW);

    const positionLoc = this.gl.getAttribLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(positionLoc);
    this.gl.vertexAttribPointer(positionLoc, 3, this.gl.FLOAT, false, 0, 0);

    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colors, this.gl.STATIC_DRAW);

    const colorLoc = this.gl.getAttribLocation(this.program, 'color');
    this.gl.enableVertexAttribArray(colorLoc);
    this.gl.vertexAttribPointer(colorLoc, 4, this.gl.FLOAT, false, 0, 0);

    // Draw
    this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount);
  }

  start() {
    const animate = () => {
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy() {
    this.stop();
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
  }

  getPerformanceMetrics() {
    return {
      fps: 60,
      particleCount: this.particleCount,
      lodLevel: 0,
      frameTime: 16.67,
    };
  }
}