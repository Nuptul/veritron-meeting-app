import React from 'react';
import { motion } from 'framer-motion';
import { PremiumChatIcon as AIMLInline, PremiumCommunicationIcon as DesignInline, PremiumMenuIcon as DevInline, PremiumCloudIcon, PremiumApiIcon, PremiumDatabaseIcon } from './InlineIcons';

interface ServiceIconProps {
  isHovered?: boolean;
  className?: string;
  size?: number;
}

// AI/ML Icon Component
export const AIMLIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, 2, -2, 0] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <AIMLInline size={size} className="filter drop-shadow-lg" />
      
      {/* Neural network pulse effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

// UI/UX Design Icon Component
export const UIUXIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, -3, 3, 0] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <DesignInline size={size} className="filter drop-shadow-lg" />
      
      {/* Design layers effect */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-2 border border-pink-400 rounded-lg opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-1 border border-cyan-400 rounded-lg opacity-30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// Development Icon Component
export const DevelopmentIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <DevInline size={size} className="filter drop-shadow-lg" />
      
      {/* Code brackets effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            className="text-veritron-gold-400 text-lg font-mono"
            animate={{
              x: [-10, -15, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'<'}
          </motion.span>
          <motion.span
            className="text-veritron-gold-400 text-lg font-mono ml-4"
            animate={{
              x: [10, 15, 10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'>'}
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

// Cloud Computing Icon Component
export const CloudIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
        y: isHovered ? [-2, 2, -2] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <PremiumCloudIcon size={size} className="filter drop-shadow-lg" />
      
      {/* Cloud data streams */}
      {isHovered && (
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-400 to-transparent rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: '10%',
              }}
              animate={{
                y: [0, 20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// API Development Icon Component
export const APIIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <PremiumApiIcon size={size} className="filter drop-shadow-lg" />
      
      {/* API connection lines */}
      {isHovered && (
        <motion.div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 border-2 border-green-400 rounded-lg opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              borderRadius: ['8px', '50%', '8px'],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// Database Icon Component
export const DatabaseIcon: React.FC<ServiceIconProps> = ({ 
  isHovered = false, 
  className = '', 
  size = 32 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <PremiumDatabaseIcon size={size} className="filter drop-shadow-lg" />
      
      {/* Data processing effect */}
      {isHovered && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              style={{
                top: `${30 + i * 15}%`,
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Service icon mapping for easy access
export const serviceIcons = {
  'ai-ml': AIMLIcon,
  'design': UIUXIcon,
  'development': DevelopmentIcon,
  'cloud': CloudIcon,
  'api': APIIcon,
  'database': DatabaseIcon,
} as const;

export type ServiceIconType = keyof typeof serviceIcons;