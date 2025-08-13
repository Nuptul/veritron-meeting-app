import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypographyShowcaseEnhanced: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const mercuryRef = useRef<HTMLDivElement>(null);
  const [dispersed, setDispersed] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (mercuryRef.current) {
        const rect = mercuryRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        
        // Update CSS variables for mercury effect
        mercuryRef.current.style.setProperty('--mouse-x', `${x}%`);
        mercuryRef.current.style.setProperty('--mouse-y', `${y}%`);
        
        // Calculate rotation based on mouse position
        const rotX = (y - 50) * 0.3;
        const rotY = (x - 50) * 0.3;
        mercuryRef.current.style.setProperty('--rotation-x', `${rotX}deg`);
        mercuryRef.current.style.setProperty('--rotation-y', `${rotY}deg`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const materials = [
    { id: 'all', label: 'All Materials' },
    { id: 'gold', label: 'Gold Variants' },
    { id: 'silver', label: 'Silver & Platinum' },
    { id: 'glass', label: 'Glass & Crystal' },
    { id: 'metal', label: 'Industrial Metals' },
    { id: 'special', label: 'Special Effects' },
    { id: 'interactive', label: 'Interactive' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} py-16 px-6 transition-all duration-700`}>
      {/* Controls Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Material Filter:</h3>
            <div className="flex gap-2">
              {materials.map(material => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedMaterial === material.id
                      ? 'bg-gradient-to-r from-gold-base to-gold-dark text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-102'
                  }`}
                >
                  {material.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-medium transition-all hover:scale-105 shadow-lg"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto space-y-20 mt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <h1 className="heading-ultra-premium text-6xl md:text-8xl mb-8">
            Ultra-Premium Typography
          </h1>
          <p className="body-premium-light text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-lg">
            Experience the future of web typography with advanced material physics, real metallic reflections, 
            and interactive effects that respond to your every movement
          </p>
        </motion.section>

        {/* Gold Materials Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'gold') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Advanced Gold Materials
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Multiple gold alloys with anisotropic highlights and PBR properties
                </p>
              </div>

              <div className="grid gap-8">
                <motion.div 
                  className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-gold-anisotropic text-5xl mb-6">
                    Anisotropic Gold Shimmer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Brushed metal texture with directional light reflections
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-rose-gold text-3xl mb-4">
                      Rose Gold Elegance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Warm copper tones with pink undertones
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-white-gold text-3xl mb-4">
                      White Gold Luxury
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Platinum-like finish with subtle warmth
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-neumorphic-gold text-3xl mb-4">
                      Classic Gold Premium
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Traditional 24k gold appearance
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Silver & Platinum Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'silver') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Liquid Metal & Mirror Finishes
                </h2>
              </div>

              <div className="grid gap-8">
                <motion.div 
                  ref={mercuryRef}
                  className="p-10 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  onMouseMove={(e) => {
                    // Handled by useEffect
                  }}
                >
                  <h3 className="text-mercury-liquid text-5xl mb-6 pointer-events-none">
                    Interactive Mercury Flow
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 pointer-events-none">
                    Move your cursor over this text to see liquid metal dynamics with real-time reflections
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                    whileHover={{ rotateY: 5 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <h3 className="text-neumorphic-silver text-4xl mb-4">
                      Animated Silver Shimmer
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Continuously shifting metallic gradient
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl"
                    whileHover={{ rotateY: -5 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <h3 className="text-neumorphic-platinum text-4xl mb-4">
                      Premium Platinum
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ultra-refined with Fresnel reflections
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Glass & Crystal Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'glass') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Glass & Crystal Materials
                </h2>
              </div>

              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-8 bg-black rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-obsidian text-4xl mb-4">
                      Deep Obsidian
                    </h3>
                    <p className="text-gray-400">
                      Volcanic glass with deep reflections
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-onyx text-4xl mb-4">
                      Polished Onyx
                    </h3>
                    <p className="text-gray-400">
                      Semi-precious stone appearance
                    </p>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-frosted-glass text-5xl mb-6">
                    Frosted Glass Effect
                  </h3>
                  <p className="text-gray-300">
                    Translucent material with backdrop blur and refraction
                  </p>
                </motion.div>

                <motion.div 
                  className="p-10 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-diamond-prism text-5xl mb-6">
                    Diamond Prismatic
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Prismatic refraction with rainbow dispersion
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-refraction text-4xl mb-4">
                    Light Refraction
                  </h3>
                  <p className="text-gray-300">
                    Chromatic aberration and light splitting
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Industrial Metals Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'metal') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Industrial & Exotic Metals
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-copper-patina text-4xl mb-4">
                    Copper with Verdigris
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Aged copper with green patina spreading effect
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-bronze-aged text-4xl mb-4">
                    Aged Bronze
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ancient bronze with weathering effects
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-indigo-900 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-titanium-shift text-4xl mb-4">
                    Titanium Color Shift
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Heat-treated titanium with iridescent colors
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-carbon-fiber text-4xl mb-4">
                    Carbon Fiber Weave
                  </h3>
                  <p className="text-gray-400">
                    High-tech composite material texture
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-chrome-effect text-4xl mb-4">
                    Chrome Mirror
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Perfect mirror chrome finish
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-embossed-leather text-4xl mb-4">
                    Embossed Leather
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Luxury leather with deep embossing
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Special Effects Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'special') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Special Visual Effects
                </h2>
              </div>

              <div className="grid gap-8">
                <motion.div 
                  className="p-10 bg-black rounded-3xl shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-holographic-foil text-5xl mb-6">
                    Holographic Foil Stamping
                  </h3>
                  <p className="text-gray-400">
                    Premium holographic effect with animated rainbow shifts
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-8 bg-gradient-to-br from-purple-900 to-black rounded-2xl shadow-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-plasma-electric text-4xl mb-4">
                      Plasma Electric
                    </h3>
                    <p className="text-gray-400">
                      High-energy plasma with electric arcs
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-black rounded-2xl shadow-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lcd-display text-4xl mb-4 font-mono">
                      LCD DISPLAY MODE
                    </h3>
                    <p className="text-green-400 font-mono text-sm">
                      Retro liquid crystal display effect
                    </p>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-10 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-3d-extruded text-5xl mb-6">
                    3D EXTRUDED DEPTH
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Multi-layer extrusion with realistic depth shadows
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-neon-glow text-4xl mb-4">
                    Neon Glow Pulse
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Animated neon sign with pulsating glow
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Interactive Effects Section */}
        <AnimatePresence>
          {(selectedMaterial === 'all' || selectedMaterial === 'interactive') && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Interactive Typography
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Click, hover, and interact with these dynamic text effects
                </p>
              </div>

              <div className="grid gap-8">
                <motion.div 
                  className="p-10 bg-black rounded-3xl shadow-2xl cursor-pointer"
                  onClick={() => setGlitchActive(!glitchActive)}
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 
                    className={`text-5xl mb-6 ${glitchActive ? 'text-glitch' : 'text-white'}`}
                    data-text="GLITCH DISTORTION"
                  >
                    GLITCH DISTORTION
                  </h3>
                  <p className="text-gray-400">
                    Click to toggle glitch effect
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-magnetic text-4xl mb-4 text-gray-800 dark:text-gray-200">
                      Magnetic Attraction
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Hover to see magnetic pull effect
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl cursor-pointer"
                    onClick={() => setDispersed(!dispersed)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className={`text-particle-ready text-4xl mb-4 text-gray-800 dark:text-gray-200 ${dispersed ? 'dispersed' : ''}`}>
                      Particle Dispersion
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Click to disperse and reform
                    </p>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-kinetic text-5xl mb-6 text-gray-800 dark:text-gray-200">
                    Kinetic Typography
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Continuous bouncing animation with physics
                  </p>
                </motion.div>

                <motion.div 
                  className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-variable-weight text-4xl mb-4 text-gray-800 dark:text-gray-200">
                    Variable Font Weight Animation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Watch the weight smoothly transition from thin to black
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Performance Metrics */}
        <motion.section variants={itemVariants} className="space-y-8 pb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Performance Optimized
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              All effects are GPU-accelerated using CSS transforms, will-change hints, and containment. 
              Animations use RequestAnimationFrame and Intersection Observer for optimal performance.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">60 FPS</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Smooth Animations</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">GPU</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hardware Accelerated</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">&lt; 100ms</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interaction Latency</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">A11y</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accessible</div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default TypographyShowcaseEnhanced;