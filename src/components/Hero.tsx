import React, { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshReflectorMaterial } from '@react-three/drei';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { InteractiveParticleSwarm, EnergyField } from './ParticleSystem';
import { useAdvancedTypewriter } from '../hooks/useAdvancedAnimations';
import { CTAButton } from './atoms/AnimatedButton';
import VeritronLogoPNG from './VeritronLogoPNG';

// Premium 3D Loading Fallback Component
const Premium3DLoadingFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinning ring */}
        <motion.div
          className="w-16 h-16 border-2 border-transparent border-t-veritron-gold-400 border-r-veritron-gold-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.19, 1, 0.22, 1]
          }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 bg-veritron-gold-400/20 rounded-full blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.19, 1, 0.22, 1]
          }}
        />
      </motion.div>
    </div>
  );
};

// 3D Particle System Component
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Optimize particle count for mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 300 : 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Animate individual particles
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4af37"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// Floating 3D Geometric Shapes
const FloatingGeometry = () => {
  return (
    <>
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        position={[-4, 2, -2]}
      >
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.7} />
        </mesh>
      </Float>
      
      <Float
        speed={2}
        rotationIntensity={0.8}
        floatIntensity={0.3}
        position={[4, -1, -1]}
      >
        <mesh>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#8a9ba8" transparent opacity={0.6} />
        </mesh>
      </Float>
      
      <Float
        speed={1.2}
        rotationIntensity={0.3}
        floatIntensity={0.7}
        position={[2, 3, -3]}
      >
        <mesh>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.8} />
        </mesh>
      </Float>
    </>
  );
};

// Neural Network Animation (nodes + links)
const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 120;
  const nodes = useMemo(() => {
    const arr: { position: THREE.Vector3; color: THREE.Color }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3 + Math.sin(i * 0.3) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = (Math.sin(angle * 2) * 0.8) + (Math.random() - 0.5) * 0.2;
      const z = Math.sin(angle) * radius;
      const color = new THREE.Color('#d4af37').lerp(new THREE.Color('#8a9ba8'), (i % 10) / 10);
      arr.push({ position: new THREE.Vector3(x, y, z), color });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.y = Math.sin(t * 1.2 + i * 0.15) * 0.25 + (mesh.position.y);
      mesh.rotation.y += 0.004;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.position.toArray()}>
          <sphereGeometry args={[0.05 + (i % 5) * 0.01, 16, 16]} />
          <meshStandardMaterial emissive={n.color} color={n.color} emissiveIntensity={0.6} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
      {nodes.map((n, i) => {
        const next = nodes[(i + 7) % nodes.length];
        const points = [n.position, next.position];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={`l-${i}`} object={new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: "#fbbf24",
            transparent: true,
            opacity: 0.15
          }))} />
        );
      })}
    </group>
  );
};

// Parallax group tied to mouse
const ParallaxGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 0.4, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 0.2, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.2, 0.05);
  });
  return <group ref={ref}>{children}</group>;
};


// Main Hero Component
const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  // Advanced Typewriter text with multiple phrases
  const heroTexts = [
    "Why Industry Leaders Choose VERITRON",
    "AI-Powered Agency Solutions",
    "Intelligent Business Automation",
    "Data-Driven Growth Solutions",
    "Next-Generation AI Services",
    "Machine Learning Excellence",
    "Cloud-Native Architecture",
    "Digital Transformation Experts",
    "Enterprise AI Integration"
  ];
  
  const { displayText: typewriterText } = useAdvancedTypewriter(heroTexts, {
    speed: 80,
    deleteSpeed: 50,
    pauseDuration: 2000,
    loop: true
  });
  
  const textRevealRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();
      
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }
  }, [isInView]);

  // React Spring animations for background elements
  const backgroundSpring = useSpring({
    from: { transform: 'translateY(100px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    config: { tension: 280, friction: 60 }
  });


  // Gradient animation trail
  const gradientTrail = useTrail(3, {
    from: { opacity: 0, transform: 'translateX(-100px)' },
    to: { opacity: 0.8, transform: 'translateX(0px)' },
    delay: 500,
    config: { tension: 200, friction: 25 }
  });

  return (
    <>
      {/* Main Hero Section */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background Gradients */}
      <animated.div 
        style={backgroundSpring}
        className="absolute inset-0"
      >
        {gradientTrail.map((style, index) => (
          <animated.div
            key={index}
            style={style}
            className={`absolute inset-0 ${
              index === 0 
                ? 'bg-gradient-to-r from-veritron-gold-500/20 via-transparent to-transparent'
                : index === 1
                ? 'bg-gradient-to-br from-transparent via-veritron-aluminum-500/10 to-transparent'
                : 'bg-gradient-to-tl from-transparent via-transparent to-veritron-gold-400/15'
            }`}
          />
        ))}
      </animated.div>

      {/* Enhanced 3D Canvas Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 1, 8], fov: 60 }} className="w-full h-full" gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={["#0b0b0e"]} />
          {/* @ts-ignore */}
          <fog attach="fog" args={["#0b0b0e", 6, 18]} />
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 12, 8]} intensity={0.9} color="#ffffff" />
          <spotLight position={[0, 15, 10]} intensity={0.6} color="#d4af37" angle={0.3} penumbra={0.7} />

          <Suspense fallback={<Premium3DLoadingFallback />}>
            <ParallaxGroup>
              <InteractiveParticleSwarm />
              <EnergyField />
              <FloatingGeometry />
              <ParticleField />
              <NeuralNetwork />
            </ParallaxGroup>

            {/* Reflective ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={6}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#0f0f14"
                metalness={0.7}
                mirror={0}
              />
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Hero Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <VeritronLogoPNG 
              size="hero" 
              animate={true} 
              glowEffect={true}
              className="mx-auto"
            />
          </motion.div>
          
          {/* Hero Section Heading with Typewriter Effect */}
          <div className="text-center mb-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <span className="w-2 h-2 bg-veritron-gold-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-veritron-gold-400 uppercase tracking-wider">
                AI Agency Excellence
              </span>
            </motion.div>

            {/* Main Title with Typewriter Effect */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white leading-tight">
                <motion.span
                  ref={textRevealRef}
                  className="block"
                >
                  {typewriterText.split(' ').map((word, index) => {
                    const isAccentWord = ['VERITRON', 'AI', 'Leaders', 'Excellence', 'Innovation'].includes(word);
                    return (
                      <span key={index} className={isAccentWord ? 'text-veritron-gold-400' : 'text-white'}>
                        {word}{index < typewriterText.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-veritron-gold-500 ml-1"
                >
                  |
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
            >
              <p className="text-lg text-veritron-aluminum-400 max-w-2xl mx-auto leading-relaxed mb-8">
                For over 25 years, we've been the trusted partner for enterprises ready to embrace the future with intelligent automation, data-driven insights, and scalable solutions.
              </p>
            </motion.div>
          </div>

          {/* Enhanced Call-to-Action Buttons */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <CTAButton
              variant="primary"
              size="xl"
              onClick={() => console.log('Get Started clicked')}
              className="min-w-[200px]"
            >
              Get Started Today
            </CTAButton>

            <CTAButton
              variant="secondary"
              size="xl"
              onClick={() => console.log('Watch Demo clicked')}
              className="min-w-[180px]"
            >
              Watch Demo
            </CTAButton>
          </motion.div>

          {/* Floating Action Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="flex justify-center gap-8 mb-12"
          >
            {[
              { label: "Free Consultation", icon: "💬" },
              { label: "24/7 Support", icon: "🛟" },
              { label: "No Setup Fees", icon: "✨" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 + (index * 0.2) }}
                className="flex items-center gap-2 text-veritron-aluminum-400 text-sm"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            transition={{ delay: 1.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { 
                title: "AI-Driven Analytics", 
                description: "Advanced machine learning algorithms",
                icon: "🤖"
              },
              { 
                title: "Real-time Insights", 
                description: "Instant data processing and visualization",
                icon: "⚡"
              },
              { 
                title: "Scalable Solutions", 
                description: "Grow with your business needs",
                icon: "🚀"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ delay: 1.8 + (index * 0.2) }}
                className="p-6 bg-veritron-gunmetal-800/50 backdrop-blur-sm rounded-2xl
                           border border-veritron-aluminum-700/30 hover:border-veritron-gold-500/50
                           transition-all duration-300 group"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-veritron-gold-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-veritron-aluminum-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-veritron-gold-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-veritron-gold-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none hero-noise-texture"
      />
      </div>
    </>
  );
};

export default Hero;