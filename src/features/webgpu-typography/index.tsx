/**
 * WebGPU Typography Enhancement Component
 * Progressive enhancement with Canvas2D fallback
 * Veritron AI Agency - 2025 Implementation
 * 
 * Features:
 * - WebGPU-accelerated text distortion effects
 * - WGSL shader-based typography rendering
 * - Seamless Canvas2D fallback
 * - Frame budget monitoring with quality adjustment
 * - Mouse interaction effects
 * - Real-time performance optimization
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getGPUCapabilities, 
  meetsTypographyRequirements, 
  getRecommendedRenderingMode,
  frameBudgetMonitor,
  getQualityLevel,
  SafeGPUContext,
  monitorTypographyPerformance
} from '../../utils/gpu';

interface TypographyRendererProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  enableDistortion?: boolean;
  enableInteraction?: boolean;
  showDebugInfo?: boolean;
  animationSpeed?: number;
  distortionStrength?: number;
}

interface TypographyMetrics {
  renderingMode: 'webgpu' | 'webgl2' | 'canvas2d';
  fps: number;
  frameTime: number;
  qualityLevel: 'high' | 'medium' | 'low';
  glyphCount: number;
  memoryUsage: number;
}

// WebGPU Typography Renderer Class
class WebGPUTypographyRenderer {
  private device: GPUDevice | null = null;
  private context: GPUCanvasContext | null = null;
  private pipeline: GPURenderPipeline | null = null;
  private computePipeline: GPUComputePipeline | null = null;
  private canvas: HTMLCanvasElement;
  private safeContext: SafeGPUContext;
  
  // Buffers and bind groups
  private uniformBuffer: GPUBuffer | null = null;
  private glyphBuffer: GPUBuffer | null = null;
  private layoutBuffer: GPUBuffer | null = null;
  private bindGroup: GPUBindGroup | null = null;
  private computeBindGroup: GPUBindGroup | null = null;
  
  // Text atlas and rendering state
  private textAtlas: GPUTexture | null = null;
  private sampler: GPUSampler | null = null;
  private glyphCount = 0;
  private isInitialized = false;
  private animationId: number | null = null;
  
  // Configuration
  private config: Required<Omit<TypographyRendererProps, 'className' | 'text'>>;
  private text: string;
  
  // Performance tracking
  private frameCount = 0;
  private lastTime = performance.now();
  private metrics: TypographyMetrics;
  
  constructor(canvas: HTMLCanvasElement, text: string, config: TypographyRendererProps) {
    this.canvas = canvas;
    this.text = text;
    this.safeContext = new SafeGPUContext();
    
    // Set defaults
    this.config = {
      fontSize: config.fontSize || 48,
      fontFamily: config.fontFamily || 'Veritron Display',
      color: config.color || '#00FFCC',
      enableDistortion: config.enableDistortion !== false,
      enableInteraction: config.enableInteraction !== false,
      showDebugInfo: config.showDebugInfo || false,
      animationSpeed: config.animationSpeed || 1.0,
      distortionStrength: config.distortionStrength || 0.5,
    };
    
    this.metrics = {
      renderingMode: 'canvas2d',
      fps: 0,
      frameTime: 0,
      qualityLevel: 'high',
      glyphCount: 0,
      memoryUsage: 0,
    };
  }
  
  async initialize(): Promise<boolean> {
    try {
      const capabilities = await getGPUCapabilities();
      
      if (!meetsTypographyRequirements(capabilities)) {
        console.warn('GPU does not meet typography requirements, falling back');
        return false;
      }
      
      // Initialize safe GPU context
      const success = await this.safeContext.initialize(capabilities);
      if (!success) {
        return false;
      }
      
      this.device = this.safeContext.getDevice();
      if (!this.device) {
        return false;
      }
      
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
      
      // Create text atlas
      await this.createTextAtlas();
      
      // Initialize shaders and pipelines
      await this.createRenderPipeline();
      await this.createComputePipeline();
      
      // Setup buffers
      await this.setupBuffers();
      
      // Setup event listeners
      this.setupEventListeners();
      
      this.metrics.renderingMode = 'webgpu';
      this.isInitialized = true;
      
      // Start performance monitoring
      monitorTypographyPerformance('webgpu');
      
      return true;
    } catch (error) {
      console.error('WebGPU typography initialization failed:', error);
      this.cleanup();
      return false;
    }
  }
  
  private async createTextAtlas(): Promise<void> {
    if (!this.device) return;
    
    // Create a simple text atlas for demo purposes
    // In production, this would use a proper font rasterization library
    const atlasSize = 512;
    const canvas = document.createElement('canvas');
    canvas.width = atlasSize;
    canvas.height = atlasSize;
    const ctx = canvas.getContext('2d')!;
    
    // Render text to canvas
    ctx.fillStyle = 'white';
    ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    let x = 0, y = 0;
    const glyphData: Array<{char: string, x: number, y: number, width: number, height: number}> = [];
    
    for (let i = 0; i < this.text.length; i++) {
      const char = this.text[i];
      const metrics = ctx.measureText(char);
      const width = metrics.width;
      const height = this.config.fontSize;
      
      // Check if we need to move to next row
      if (x + width > atlasSize) {
        x = 0;
        y += height + 4;
      }
      
      // Render character
      ctx.fillText(char, x, y);
      
      glyphData.push({ char, x, y, width, height });
      x += width + 2;
    }
    
    // Create GPU texture from canvas
    const imageData = ctx.getImageData(0, 0, atlasSize, atlasSize);
    
    this.textAtlas = this.safeContext.trackTexture(this.device.createTexture({
      size: { width: atlasSize, height: atlasSize },
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    }));
    
    this.device.queue.writeTexture(
      { texture: this.textAtlas },
      imageData.data,
      { bytesPerRow: atlasSize * 4 },
      { width: atlasSize, height: atlasSize }
    );
    
    // Create sampler
    this.sampler = this.device.createSampler({
      minFilter: 'linear',
      magFilter: 'linear',
      mipmapFilter: 'linear',
    });
    
    this.glyphCount = glyphData.length;
    this.metrics.glyphCount = this.glyphCount;
  }
  
  private async createRenderPipeline(): Promise<void> {
    if (!this.device || !this.textAtlas) return;
    
    // Import shader module - Vite will handle this as a string import
    let shaderCode: string;
    try {
      // Try to import as a module first (production build)
      const shaderModule = await import('./shaders/typo.wgsl?raw');
      shaderCode = shaderModule.default;
    } catch {
      // Fallback to fetch for development
      try {
        const shaderResponse = await fetch('/src/features/webgpu-typography/shaders/typo.wgsl');
        shaderCode = await shaderResponse.text();
      } catch (error) {
        console.error('Failed to load WGSL shader:', error);
        throw new Error('WGSL shader loading failed');
      }
    }
    
    const shaderModule = this.device.createShaderModule({
      label: 'Typography Shader',
      code: shaderCode,
    });
    
    // Create render pipeline
    const format = navigator.gpu.getPreferredCanvasFormat();
    this.pipeline = this.device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: shaderModule,
        entryPoint: 'vs_main',
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'fs_main',
        targets: [{
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
        }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });
  }
  
  private async createComputePipeline(): Promise<void> {
    if (!this.device) return;
    
    // Create compute pipeline for advanced text layout
    let shaderCode: string;
    try {
      const shaderModule = await import('./shaders/typo.wgsl?raw');
      shaderCode = shaderModule.default;
    } catch {
      try {
        const shaderResponse = await fetch('/src/features/webgpu-typography/shaders/typo.wgsl');
        shaderCode = await shaderResponse.text();
      } catch (error) {
        console.error('Failed to load WGSL shader for compute pipeline:', error);
        throw new Error('WGSL compute shader loading failed');
      }
    }
    
    const computeModule = this.device.createShaderModule({
      label: 'Typography Compute Shader',
      code: shaderCode,
    });
    
    this.computePipeline = this.device.createComputePipeline({
      layout: 'auto',
      compute: {
        module: computeModule,
        entryPoint: 'layout_compute',
      },
    });
  }
  
  private async setupBuffers(): Promise<void> {
    if (!this.device || !this.pipeline) return;
    
    // Create uniform buffer for typography parameters
    const uniformData = new Float32Array([
      0.0, // time
      0.5, // mouseX
      0.5, // mouseY
      this.canvas.width, // screenWidth
      this.canvas.height, // screenHeight
      this.config.distortionStrength, // distortionStrength
      0.02, // waveAmplitude
      4.0, // waveFrequency
      0.1, // rippleStrength
      100.0, // hoverRadius
      0.3, // glowIntensity
      0.5, // colorShift
    ]);
    
    this.uniformBuffer = this.safeContext.trackBuffer(this.device.createBuffer({
      size: uniformData.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    }));
    
    new Float32Array(this.uniformBuffer.getMappedRange()).set(uniformData);
    this.uniformBuffer.unmap();
    
    // Create glyph data buffer
    const glyphDataSize = this.glyphCount * 8 * 4; // 8 floats per glyph
    this.glyphBuffer = this.safeContext.trackBuffer(this.device.createBuffer({
      size: glyphDataSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }));
    
    // Create bind group
    this.bindGroup = this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.uniformBuffer } },
        { binding: 1, resource: { buffer: this.glyphBuffer } },
        { binding: 2, resource: this.textAtlas.createView() },
        { binding: 3, resource: this.sampler },
      ],
    });
  }
  
  private setupEventListeners(): void {
    // Mouse movement for interaction effects
    if (this.config.enableInteraction) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }
    
    // Resize handling
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  private handleMouseMove = (event: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;
    
    // Update mouse position in uniform buffer
    this.updateMousePosition(mouseX, mouseY);
  };
  
  private handleTouchMove = (event: TouchEvent): void => {
    if (event.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      const touch = event.touches[0];
      const mouseX = (touch.clientX - rect.left) / rect.width;
      const mouseY = (touch.clientY - rect.top) / rect.height;
      
      this.updateMousePosition(mouseX, mouseY);
    }
  };
  
  private updateMousePosition(x: number, y: number): void {
    if (!this.device || !this.uniformBuffer) return;
    
    const uniformData = new Float32Array([
      performance.now() / 1000 * this.config.animationSpeed,
      x,
      y,
      this.canvas.width,
      this.canvas.height,
      this.config.distortionStrength,
      0.02,
      4.0,
      0.1,
      100.0,
      0.3,
      0.5,
    ]);
    
    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);
  }
  
  private handleResize = (): void => {
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
  };
  
  render(): void {
    if (!this.isInitialized || !this.device || !this.context || !this.pipeline || !this.bindGroup) {
      return;
    }
    
    // Record frame timing
    const frameTime = frameBudgetMonitor.recordFrame();
    this.frameCount++;
    
    // Update metrics
    const currentTime = performance.now();
    if (currentTime - this.lastTime >= 1000) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.metrics.frameTime = frameTime;
      this.metrics.qualityLevel = getQualityLevel();
      
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    // Check if we should reduce quality or kill the feature
    if (frameBudgetMonitor.shouldKillFeature()) {
      console.warn('Typography feature killed due to poor performance');
      this.stop();
      return;
    }
    
    // Update uniforms
    this.updateMousePosition(0.5, 0.5); // Default position if no interaction
    
    // Create command encoder
    const commandEncoder = this.device.createCommandEncoder();
    
    // Render pass
    const textureView = this.context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
    });
    
    renderPass.setPipeline(this.pipeline);
    renderPass.setBindGroup(0, this.bindGroup);
    renderPass.draw(6, this.glyphCount); // 6 vertices per glyph (2 triangles)
    renderPass.end();
    
    // Submit commands
    this.device.queue.submit([commandEncoder.finish()]);
  }
  
  start(): void {
    if (!this.isInitialized) return;
    
    const animate = () => {
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }
  
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  getMetrics(): TypographyMetrics {
    return { ...this.metrics };
  }
  
  cleanup(): void {
    this.stop();
    this.safeContext.destroy();
    this.isInitialized = false;
  }
}

// Canvas2D Fallback Renderer
class Canvas2DTypographyRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: Required<Omit<TypographyRendererProps, 'className' | 'text'>>;
  private text: string;
  private animationId: number | null = null;
  private mouseX = 0.5;
  private mouseY = 0.5;
  private metrics: TypographyMetrics;
  
  constructor(canvas: HTMLCanvasElement, text: string, config: TypographyRendererProps) {
    this.canvas = canvas;
    this.text = text;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context');
    }
    this.ctx = ctx;
    
    this.config = {
      fontSize: config.fontSize || 48,
      fontFamily: config.fontFamily || 'Veritron Display',
      color: config.color || '#00FFCC',
      enableDistortion: config.enableDistortion !== false,
      enableInteraction: config.enableInteraction !== false,
      showDebugInfo: config.showDebugInfo || false,
      animationSpeed: config.animationSpeed || 1.0,
      distortionStrength: config.distortionStrength || 0.5,
    };
    
    this.metrics = {
      renderingMode: 'canvas2d',
      fps: 60,
      frameTime: 16.67,
      qualityLevel: 'medium',
      glyphCount: text.length,
      memoryUsage: 0,
    };
    
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    if (this.config.enableInteraction) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) / rect.width;
        this.mouseY = (e.clientY - rect.top) / rect.height;
      });
    }
  }
  
  render(): void {
    const time = performance.now() / 1000 * this.config.animationSpeed;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set font properties
    this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Calculate text layout
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    // Render each character with Canvas2D distortion effects
    for (let i = 0; i < this.text.length; i++) {
      const char = this.text[i];
      const charWidth = this.ctx.measureText(char).width;
      const charX = centerX - (this.text.length * charWidth * 0.6) / 2 + i * charWidth * 0.6;
      
      // Apply simple distortion effects
      let offsetX = 0;
      let offsetY = 0;
      
      if (this.config.enableDistortion) {
        // Wave effect
        offsetY = Math.sin(charX * 0.01 + time * 2) * 10 * this.config.distortionStrength;
        
        // Mouse interaction
        if (this.config.enableInteraction) {
          const mouseWorldX = this.mouseX * this.canvas.width;
          const mouseWorldY = this.mouseY * this.canvas.height;
          const distToMouse = Math.hypot(charX - mouseWorldX, centerY - mouseWorldY);
          
          if (distToMouse < 100) {
            const influence = 1 - distToMouse / 100;
            const ripple = Math.sin(distToMouse * 0.1 - time * 5) * influence;
            offsetY += ripple * 15;
          }
        }
      }
      
      // Color variations
      const hue = (i * 30 + time * 50) % 360;
      this.ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
      
      // Add glow effect
      this.ctx.shadowColor = this.ctx.fillStyle;
      this.ctx.shadowBlur = 10;
      
      // Render character
      this.ctx.fillText(char, charX + offsetX, centerY + offsetY);
    }
    
    // Reset shadow
    this.ctx.shadowBlur = 0;
  }
  
  start(): void {
    const animate = () => {
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }
  
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  getMetrics(): TypographyMetrics {
    return { ...this.metrics };
  }
  
  cleanup(): void {
    this.stop();
  }
}

// Main React Component
export const WebGPUTypography: React.FC<TypographyRendererProps> = ({
  text,
  className = '',
  ...config
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGPUTypographyRenderer | Canvas2DTypographyRenderer | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [renderingMode, setRenderingMode] = useState<'webgpu' | 'canvas2d'>('canvas2d');
  const [metrics, setMetrics] = useState<TypographyMetrics | null>(null);
  
  const initializeRenderer = useCallback(async () => {
    if (!canvasRef.current || !text) return;
    
    // Clean up existing renderer
    if (rendererRef.current) {
      rendererRef.current.cleanup();
    }
    
    const canvas = canvasRef.current;
    
    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    
    try {
      // Try WebGPU first
      const webgpuRenderer = new WebGPUTypographyRenderer(canvas, text, config);
      const webgpuSuccess = await webgpuRenderer.initialize();
      
      if (webgpuSuccess) {
        rendererRef.current = webgpuRenderer;
        setRenderingMode('webgpu');
        webgpuRenderer.start();
        console.log('WebGPU typography renderer initialized');
      } else {
        // Fall back to Canvas2D
        const canvas2dRenderer = new Canvas2DTypographyRenderer(canvas, text, config);
        rendererRef.current = canvas2dRenderer;
        setRenderingMode('canvas2d');
        canvas2dRenderer.start();
        console.log('Canvas2D typography renderer initialized (fallback)');
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Typography renderer initialization failed:', error);
      
      // Final fallback to Canvas2D
      try {
        const canvas2dRenderer = new Canvas2DTypographyRenderer(canvas, text, config);
        rendererRef.current = canvas2dRenderer;
        setRenderingMode('canvas2d');
        canvas2dRenderer.start();
        setIsInitialized(true);
      } catch (fallbackError) {
        console.error('Canvas2D fallback also failed:', fallbackError);
      }
    }
  }, [text, config]);
  
  useEffect(() => {
    initializeRenderer();
    
    return () => {
      if (rendererRef.current) {
        rendererRef.current.cleanup();
      }
    };
  }, [initializeRenderer]);
  
  // Update metrics periodically
  useEffect(() => {
    if (!isInitialized || !config.showDebugInfo) return;
    
    const interval = setInterval(() => {
      if (rendererRef.current) {
        setMetrics(rendererRef.current.getMetrics());
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isInitialized, config.showDebugInfo]);
  
  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isInitialized ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      
      {/* Loading state */}
      <AnimatePresence>
        {!isInitialized && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-veritron-gold-500 text-sm font-medium">
              Initializing typography renderer...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Debug Information */}
      {config.showDebugInfo && metrics && (
        <motion.div
          className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm rounded-lg p-3 text-xs font-mono"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-1 text-white">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Mode:</span>
              <span className={renderingMode === 'webgpu' ? 'text-green-400' : 'text-blue-400'}>
                {renderingMode.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">FPS:</span>
              <span className={
                metrics.fps >= 60 ? 'text-green-400' : 
                metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
              }>
                {metrics.fps}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Quality:</span>
              <span className={
                metrics.qualityLevel === 'high' ? 'text-green-400' :
                metrics.qualityLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }>
                {metrics.qualityLevel.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Glyphs:</span>
              <span className="text-blue-400">{metrics.glyphCount}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Frame:</span>
              <span className="text-gray-300">{metrics.frameTime.toFixed(2)}ms</span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Feature Badge */}
      {isInitialized && (
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-veritron-gold-500/20 to-veritron-gold-600/20 backdrop-blur-sm rounded-full px-3 py-1 border border-veritron-gold-500/30">
            <span className="text-xs font-medium text-veritron-gold-400">
              {renderingMode === 'webgpu' ? '⚡ WebGPU Typography' : '🎨 Enhanced Typography'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WebGPUTypography;