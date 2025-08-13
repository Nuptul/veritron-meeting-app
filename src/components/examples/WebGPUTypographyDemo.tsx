/**
 * WebGPU Typography Enhancement Demo Component
 * Showcases the advanced typography system with progressive enhancement
 * Veritron AI Agency - 2025 Implementation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WebGPUTypography } from '../../features/webgpu-typography';
import { HeroCanvas } from '../HeroCanvas';

interface TypographyDemoProps {
  className?: string;
}

export const WebGPUTypographyDemo: React.FC<TypographyDemoProps> = ({ 
  className = '' 
}) => {
  const [config, setConfig] = useState({
    text: 'VERITRON',
    fontSize: 96,
    fontFamily: 'Veritron Display',
    color: '#00FFCC',
    enableDistortion: true,
    enableInteraction: true,
    showDebugInfo: false,
    animationSpeed: 1.0,
    distortionStrength: 0.5,
  });

  const [showControls, setShowControls] = useState(false);

  const presets = [
    {
      name: 'Classic',
      config: {
        ...config,
        text: 'VERITRON',
        fontSize: 96,
        color: '#00FFCC',
        distortionStrength: 0.3,
        animationSpeed: 1.0,
      }
    },
    {
      name: 'Dynamic',
      config: {
        ...config,
        text: 'DYNAMIC',
        fontSize: 80,
        color: '#FF00CC',
        distortionStrength: 0.8,
        animationSpeed: 1.5,
      }
    },
    {
      name: 'Elegant',
      config: {
        ...config,
        text: 'ELEGANT',
        fontSize: 72,
        color: '#CC00FF',
        distortionStrength: 0.2,
        animationSpeed: 0.7,
      }
    },
    {
      name: 'Intense',
      config: {
        ...config,
        text: 'INTENSE',
        fontSize: 88,
        color: '#FFCC00',
        distortionStrength: 1.0,
        animationSpeed: 2.0,
      }
    }
  ];

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Background particle system */}
      <HeroCanvas 
        className="absolute inset-0 z-0"
        particleCount={8000}
        showMetrics={false}
      />
      
      {/* Main typography display */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full max-w-4xl mx-auto px-8">
          <WebGPUTypography
            {...config}
            className="w-full h-32 mb-8"
          />
          
          {/* Secondary text */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <WebGPUTypography
              text="AI AGENCY"
              fontSize={32}
              fontFamily="Veritron Text"
              color="#FFFFFF"
              enableDistortion={true}
              enableInteraction={false}
              animationSpeed={0.5}
              distortionStrength={0.2}
              className="w-full h-12"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Control Panel */}
      <motion.div 
        className="absolute top-4 left-4 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium hover:bg-black/70 transition-colors"
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
        
        {showControls && (
          <motion.div
            className="mt-4 bg-black/75 backdrop-blur-sm rounded-lg p-4 w-80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4">Typography Controls</h3>
            
            {/* Preset Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setConfig(preset.config)}
                  className="bg-veritron-gold-500/20 hover:bg-veritron-gold-500/40 text-veritron-gold-300 text-xs px-3 py-2 rounded-md transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
            
            {/* Text Input */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Text</label>
                <input
                  type="text"
                  value={config.text}
                  onChange={(e) => setConfig({...config, text: e.target.value})}
                  className="w-full bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-600 focus:border-veritron-gold-500"
                  placeholder="Enter text..."
                />
              </div>
              
              {/* Font Size */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Font Size: {config.fontSize}px
                </label>
                <input
                  type="range"
                  min="32"
                  max="120"
                  value={config.fontSize}
                  onChange={(e) => setConfig({...config, fontSize: parseInt(e.target.value)})}
                  className="w-full accent-veritron-gold-500"
                />
              </div>
              
              {/* Color Picker */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">Color</label>
                <div className="flex gap-2">
                  {['#00FFCC', '#FF00CC', '#CC00FF', '#FFCC00', '#FFFFFF'].map(color => (
                    <button
                      key={color}
                      onClick={() => setConfig({...config, color})}
                      className={`w-8 h-8 rounded-full border-2 ${
                        config.color === color ? 'border-white' : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Distortion Strength */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Distortion: {(config.distortionStrength * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.distortionStrength}
                  onChange={(e) => setConfig({...config, distortionStrength: parseFloat(e.target.value)})}
                  className="w-full accent-veritron-gold-500"
                />
              </div>
              
              {/* Animation Speed */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Animation Speed: {config.animationSpeed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={config.animationSpeed}
                  onChange={(e) => setConfig({...config, animationSpeed: parseFloat(e.target.value)})}
                  className="w-full accent-veritron-gold-500"
                />
              </div>
              
              {/* Toggle Options */}
              <div className="space-y-2">
                <label className="flex items-center text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={config.enableDistortion}
                    onChange={(e) => setConfig({...config, enableDistortion: e.target.checked})}
                    className="mr-2 accent-veritron-gold-500"
                  />
                  Enable Distortion
                </label>
                <label className="flex items-center text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={config.enableInteraction}
                    onChange={(e) => setConfig({...config, enableInteraction: e.target.checked})}
                    className="mr-2 accent-veritron-gold-500"
                  />
                  Mouse Interaction
                </label>
                <label className="flex items-center text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={config.showDebugInfo}
                    onChange={(e) => setConfig({...config, showDebugInfo: e.target.checked})}
                    className="mr-2 accent-veritron-gold-500"
                  />
                  Show Debug Info
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Info Panel */}
      <motion.div 
        className="absolute bottom-4 left-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
          <h4 className="text-white font-semibold mb-2">WebGPU Typography Enhancement</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Experience GPU-accelerated typography with real-time distortion effects. 
            Move your mouse over the text to see interactive responses. The system 
            automatically falls back to Canvas2D on unsupported devices.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center px-2 py-1 bg-veritron-gold-500/20 text-veritron-gold-300 text-xs rounded">
              ⚡ WebGPU
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
              🎨 Progressive Enhancement
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
              📱 Mobile Ready
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WebGPUTypographyDemo;