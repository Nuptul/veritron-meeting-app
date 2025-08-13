import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import VeritronLogo from './VeritronLogo';

const HeroLogoShowcase: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start('visible');
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3
      }
    }
  };

  const logoVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 2
      }
    }
  };

  const textVariants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)'
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(212,175,55,0.4)' : 'rgba(138,155,168,0.3)'} 0%, transparent 70%)`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0 0', '50px 50px', '0 0']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Hero Logo - Premium 3D Design */}
        <motion.div
          className="mb-16 flex justify-center"
          variants={logoVariants}
        >
          <VeritronLogo
            size="hero"
            animate={true}
            glowEffect={true}
            className="transform-gpu"
          />
        </motion.div>

        {/* Brand Title with Spectacular Animation */}
        <motion.div
          variants={textVariants}
          className="mb-8"
        >
          <motion.h1 
            className="veritron-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 text-gradient-metallic animate-gradient-text text-shadow-lg"
          >
            VERITRON
          </motion.h1>

          <motion.div
            className="veritron-display text-3xl sm:text-4xl md:text-5xl font-light text-veritron-aluminum-200 mb-4"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Artificial Intelligence
          </motion.div>

          <motion.div
            className="veritron-display text-xl sm:text-2xl text-veritron-gold-400 font-medium"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            THE FUTURE OF INTELLIGENT SOLUTIONS
          </motion.div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="flex justify-center mb-16"
          variants={textVariants}
        >
          <motion.div
            className="w-64 h-1 bg-gradient-to-r from-transparent via-veritron-gold-500 to-transparent rounded-full"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1
            }}
          />
        </motion.div>

        {/* Brand Values with Floating Animation */}
        <motion.div
          variants={textVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { 
              title: "INNOVATION", 
              subtitle: "Cutting-Edge Technology",
              icon: "🚀"
            },
            { 
              title: "PRECISION", 
              subtitle: "Unmatched Accuracy",
              icon: "🎯"
            },
            { 
              title: "INTELLIGENCE", 
              subtitle: "Advanced AI Solutions",
              icon: "🧠"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(138,155,168,0.05) 50%, transparent 100%)',
                border: '1px solid rgba(212,175,55,0.2)'
              }}
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 0.7
                }}
              >
                {item.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-veritron-gold-400 mb-2 tracking-wider">
                {item.title}
              </h3>
              
              <p className="text-veritron-aluminum-300">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 800px 600px at 50% 0%,
              rgba(212,175,55,0.15) 0%,
              rgba(212,175,55,0.05) 30%,
              transparent 60%
            )
          `
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.section>
  );
};

export default HeroLogoShowcase;