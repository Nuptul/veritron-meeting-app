import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TypographyShowcase: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} py-20 px-6 transition-colors duration-500`}>
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-medium transition-all hover:scale-105"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <motion.div
        className="max-w-7xl mx-auto space-y-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.section variants={itemVariants} className="text-center space-y-4">
          <h1 className="heading-ultra-premium mb-6">
            Veritron Typography
          </h1>
          <p className="body-premium-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ultra-premium neumorphic typography system featuring metallic materials, glass effects, and cutting-edge variable fonts
          </p>
        </motion.section>

        {/* Gold Text Variations */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Gold Material Typography
            </h2>
            <p className="body-premium-light text-gray-600 dark:text-gray-400">
              Solid gold material with realistic depth and shadows
            </p>
          </div>

          <div className="grid gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <h3 className="text-neumorphic-gold text-4xl mb-4">
                Premium Gold Text
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Featuring gradient gold material with inner shadows and outer glow
              </p>
            </div>

            <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl">
              <h3 className="text-neumorphic-gold-extruded text-4xl mb-4">
                Extruded Gold Typography
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                3D extruded effect with multi-layer shadows and perspective transformation
              </p>
            </div>
          </div>
        </motion.section>

        {/* Silver Text Variations */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Silver & Platinum Typography
            </h2>
            <p className="body-premium-light text-gray-600 dark:text-gray-400">
              Polished metallic appearance with animated shimmer
            </p>
          </div>

          <div className="grid gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <h3 className="text-neumorphic-silver text-4xl mb-4">
                Metallic Silver Text
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Animated silver gradient with metallic shine and depth shadows
              </p>
            </div>

            <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl">
              <h3 className="text-neumorphic-platinum text-4xl mb-4">
                Premium Platinum
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Ultra-refined platinum finish with inner bevel and premium metallic effect
              </p>
            </div>
          </div>
        </motion.section>

        {/* Black Glass Text */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Black Glass Material
            </h2>
            <p className="body-premium-light text-gray-600 dark:text-gray-400">
              Deep black glass with reflections and transparency
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-gray-200 rounded-2xl shadow-xl">
            <h3 className="text-neumorphic-black-glass text-4xl mb-4" data-text="Glass Typography">
              Glass Typography
            </h3>
            <p className="text-gray-700 dark:text-gray-800 font-body-primary">
              Premium black glass material with depth shadows and glass reflections
            </p>
          </div>
        </motion.section>

        {/* Neumorphic Heading Styles */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Neumorphic Heading Styles
            </h2>
          </div>

          <div className="grid gap-8">
            <div className="p-8 bg-gray-200 dark:bg-gray-800 rounded-2xl">
              <h3 className="heading-neumorphic-raised text-4xl mb-4">
                Raised Neumorphic
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Elevated text with multiple shadow layers creating depth
              </p>
            </div>

            <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl">
              <h3 className="heading-neumorphic-inset text-4xl mb-4">
                Inset Neumorphic
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Pressed inward effect with inner shadows
              </p>
            </div>
          </div>
        </motion.section>

        {/* Special Effects */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Special Effects
            </h2>
          </div>

          <div className="grid gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <h3 className="text-chrome-effect text-4xl mb-4">
                Chrome Effect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-body-primary">
                Reflective chrome finish with high contrast
              </p>
            </div>

            <div className="p-8 bg-gray-900 dark:bg-black rounded-2xl">
              <h3 className="text-holographic text-4xl mb-4">
                Holographic Shift
              </h3>
              <p className="text-gray-400 dark:text-gray-300 font-body-primary">
                Animated rainbow gradient with holographic appearance
              </p>
            </div>

            <div className="p-8 bg-black dark:bg-gray-900 rounded-2xl">
              <h3 className="text-neon-glow text-4xl mb-4">
                Neon Glow Effect
              </h3>
              <p className="text-gray-400 dark:text-gray-300 font-body-primary">
                Pulsating neon glow with layered shadows
              </p>
            </div>
          </div>
        </motion.section>

        {/* Premium Font Families */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Premium Font Families
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-display-primary text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Clash Display
              </h3>
              <p className="font-display-primary text-gray-600 dark:text-gray-400">
                The quick brown fox jumps over the lazy dog
              </p>
              <div className="mt-4 space-x-2">
                <span className="font-display-primary font-thin">Thin</span>
                <span className="font-display-primary font-light">Light</span>
                <span className="font-display-primary font-normal">Regular</span>
                <span className="font-display-primary font-semibold">Semibold</span>
                <span className="font-display-primary font-bold">Bold</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-display-secondary text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Cabinet Grotesk
              </h3>
              <p className="font-display-secondary text-gray-600 dark:text-gray-400">
                The quick brown fox jumps over the lazy dog
              </p>
              <div className="mt-4 space-x-2">
                <span className="font-display-secondary font-thin">Thin</span>
                <span className="font-display-secondary font-light">Light</span>
                <span className="font-display-secondary font-normal">Regular</span>
                <span className="font-display-secondary font-semibold">Semibold</span>
                <span className="font-display-secondary font-bold">Bold</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-heading-secondary text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Space Grotesk
              </h3>
              <p className="font-heading-secondary text-gray-600 dark:text-gray-400">
                The quick brown fox jumps over the lazy dog
              </p>
              <div className="mt-4 space-x-2">
                <span className="font-heading-secondary font-light">Light</span>
                <span className="font-heading-secondary font-normal">Regular</span>
                <span className="font-heading-secondary font-medium">Medium</span>
                <span className="font-heading-secondary font-bold">Bold</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-body-primary text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Satoshi
              </h3>
              <p className="font-body-primary text-gray-600 dark:text-gray-400">
                The quick brown fox jumps over the lazy dog
              </p>
              <div className="mt-4 space-x-2">
                <span className="font-body-primary font-light">Light</span>
                <span className="font-body-primary font-normal">Regular</span>
                <span className="font-body-primary font-medium">Medium</span>
                <span className="font-body-primary font-bold">Bold</span>
                <span className="font-body-primary font-black">Black</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h3 className="font-display-accent text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                Syne
              </h3>
              <p className="font-display-accent text-gray-600 dark:text-gray-400">
                The quick brown fox jumps over the lazy dog
              </p>
              <div className="mt-4 space-x-2">
                <span className="font-display-accent font-normal">Regular</span>
                <span className="font-display-accent font-medium">Medium</span>
                <span className="font-display-accent font-semibold">Semibold</span>
                <span className="font-display-accent font-bold">Bold</span>
                <span className="font-display-accent font-extrabold">Extra</span>
              </div>
            </div>

            <div className="p-6 bg-gray-900 dark:bg-gray-800 rounded-xl">
              <h3 className="font-mono text-2xl font-bold mb-2 text-gray-200">
                JetBrains Mono
              </h3>
              <p className="font-mono text-gray-400">
                const code = "The quick brown fox";
              </p>
              <div className="mt-4 space-x-2 text-gray-400">
                <span className="font-mono font-thin">Thin</span>
                <span className="font-mono font-light">Light</span>
                <span className="font-mono font-normal">Regular</span>
                <span className="font-mono font-medium">Medium</span>
                <span className="font-mono font-bold">Bold</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Body Text Examples */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Premium Body Typography
            </h2>
          </div>

          <div className="grid gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-heading-primary font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Premium Body Text
              </h3>
              <p className="body-premium">
                Veritron represents the pinnacle of artificial intelligence and cutting-edge technology solutions. 
                Our commitment to excellence drives us to create experiences that transcend conventional boundaries, 
                leveraging advanced machine learning algorithms and WebGPU-accelerated graphics to deliver 
                unprecedented performance and visual fidelity. Every pixel, every interaction, and every line of 
                code is meticulously crafted to embody our vision of technological perfection.
              </p>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
              <h3 className="text-2xl font-heading-primary font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Light Body Variant
              </h3>
              <p className="body-premium-light">
                In the realm of digital innovation, typography serves as the silent ambassador of brand identity. 
                Through careful selection of typefaces, weight distributions, and spacing harmonics, we create 
                reading experiences that are not merely functional, but genuinely delightful. The interplay between 
                letterforms and negative space orchestrates a visual symphony that guides the reader's eye with 
                effortless grace, ensuring optimal comprehension and aesthetic satisfaction.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Usage Guidelines */}
        <motion.section variants={itemVariants} className="space-y-8 pb-20">
          <div className="text-center">
            <h2 className="text-3xl font-display-primary font-bold mb-4 text-gray-800 dark:text-gray-200">
              Implementation Guide
            </h2>
          </div>

          <div className="bg-gray-900 dark:bg-black rounded-2xl p-8 text-gray-300">
            <h3 className="font-mono text-xl font-bold mb-6 text-white">
              CSS Classes Reference
            </h3>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <span className="text-yellow-400">/* Gold Materials */</span><br />
                <span className="text-blue-400">.text-neumorphic-gold</span><br />
                <span className="text-blue-400">.text-neumorphic-gold-extruded</span>
              </div>
              <div>
                <span className="text-yellow-400">/* Silver Materials */</span><br />
                <span className="text-blue-400">.text-neumorphic-silver</span><br />
                <span className="text-blue-400">.text-neumorphic-platinum</span>
              </div>
              <div>
                <span className="text-yellow-400">/* Black Glass */</span><br />
                <span className="text-blue-400">.text-neumorphic-black-glass</span>
              </div>
              <div>
                <span className="text-yellow-400">/* Headings */</span><br />
                <span className="text-blue-400">.heading-ultra-premium</span><br />
                <span className="text-blue-400">.heading-neumorphic-raised</span><br />
                <span className="text-blue-400">.heading-neumorphic-inset</span>
              </div>
              <div>
                <span className="text-yellow-400">/* Body Text */</span><br />
                <span className="text-blue-400">.body-premium</span><br />
                <span className="text-blue-400">.body-premium-light</span>
              </div>
              <div>
                <span className="text-yellow-400">/* Special Effects */</span><br />
                <span className="text-blue-400">.text-chrome-effect</span><br />
                <span className="text-blue-400">.text-holographic</span><br />
                <span className="text-blue-400">.text-neon-glow</span>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default TypographyShowcase;