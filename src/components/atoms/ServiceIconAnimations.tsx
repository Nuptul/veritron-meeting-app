import React from 'react';
import { motion } from 'framer-motion';

// AI Brain Animation Component
export const AIBrainIcon: React.FC<{ isHovered: boolean; className?: string }> = ({ 
  isHovered, 
  className = "w-8 h-8" 
}) => {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      initial={{ scale: 1 }}
      animate={{ 
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, 5, -5, 0] : 0
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Main brain shape */}
      <motion.path
        d="M32 8C40 8 48 16 48 24C48 28 52 32 52 36C52 44 44 52 32 52C20 52 12 44 12 36C12 32 16 28 16 24C16 16 24 8 32 8Z"
        fill="currentColor"
        opacity={0.2}
        animate={{
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Neural connections */}
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <motion.circle
          cx="24" cy="20" r="2"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="40" cy="18" r="2"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="32" cy="28" r="2"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        <motion.circle
          cx="20" cy="36" r="2"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        />
        <motion.circle
          cx="44" cy="34" r="2"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
        />
        
        {/* Connection lines */}
        <motion.line
          x1="24" y1="20" x2="32" y2="28"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: isHovered ? [0, -8, 0] : 0,
            opacity: isHovered ? 0.8 : 0.4
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="40" y1="18" x2="32" y2="28"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: isHovered ? [0, -8, 0] : 0,
            opacity: isHovered ? 0.8 : 0.4
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.line
          x1="32" y1="28" x2="20" y2="36"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: isHovered ? [0, -8, 0] : 0,
            opacity: isHovered ? 0.8 : 0.4
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        <motion.line
          x1="32" y1="28" x2="44" y2="34"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: isHovered ? [0, -8, 0] : 0,
            opacity: isHovered ? 0.8 : 0.4
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </g>
      
      {/* Thinking waves */}
      <motion.g opacity={isHovered ? 0.6 : 0}>
        <motion.path
          d="M32 10 Q36 6 40 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path
          d="M34 8 Q38 4 42 8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />
        <motion.path
          d="M36 6 Q40 2 44 6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
        />
      </motion.g>
    </motion.svg>
  );
};

// Design Palette Animation Component
export const DesignPaletteIcon: React.FC<{ isHovered: boolean; className?: string }> = ({ 
  isHovered, 
  className = "w-8 h-8" 
}) => {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      initial={{ scale: 1 }}
      animate={{ 
        scale: isHovered ? 1.05 : 1,
        rotate: isHovered ? [0, -5, 5, 0] : 0
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Palette base */}
      <motion.path
        d="M12 20 C12 16 16 12 20 12 L48 12 C52 12 56 16 56 20 L56 48 C56 52 52 56 48 56 L20 56 C16 56 12 52 12 48 Z"
        fill="currentColor"
        opacity={0.1}
        animate={{
          opacity: isHovered ? [0.1, 0.2, 0.1] : 0.1
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Paint blobs */}
      <motion.circle
        cx="24" cy="24" r="4"
        fill="#ff6b6b"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          y: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="40" cy="24" r="4"
        fill="#4ecdc4"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          y: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle
        cx="24" cy="40" r="4"
        fill="#45b7d1"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          y: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="40" cy="40" r="4"
        fill="#f9ca24"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          y: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      
      {/* Paintbrush */}
      <motion.g
        animate={{
          rotate: isHovered ? [0, 15, 0] : 0,
          x: isHovered ? [0, 2, 0] : 0,
          y: isHovered ? [0, -1, 0] : 0
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "48px 48px" }}
      >
        <motion.rect
          x="46" y="8" width="3" height="20"
          fill="currentColor"
          opacity={0.7}
        />
        <motion.path
          d="M44 28 L48 32 L52 28 L48 24 Z"
          fill="currentColor"
          opacity={0.8}
        />
      </motion.g>
      
      {/* Paint drops */}
      <motion.g opacity={isHovered ? 0.8 : 0}>
        <motion.circle
          cx="30" cy="15" r="1"
          fill="#ff6b6b"
          animate={{
            y: [0, 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="35" cy="18" r="1"
          fill="#4ecdc4"
          animate={{
            y: [0, 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.g>
      
      {/* Color swatches around the palette */}
      <motion.rect
        x="8" y="16" width="3" height="6" rx="1"
        fill="#ff6b6b"
        animate={{
          scaleY: isHovered ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.rect
        x="8" y="24" width="3" height="6" rx="1"
        fill="#4ecdc4"
        animate={{
          scaleY: isHovered ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.rect
        x="8" y="32" width="3" height="6" rx="1"
        fill="#45b7d1"
        animate={{
          scaleY: isHovered ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
      <motion.rect
        x="8" y="40" width="3" height="6" rx="1"
        fill="#f9ca24"
        animate={{
          scaleY: isHovered ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
    </motion.svg>
  );
};

// Code Development Animation Component
export const CodeIcon: React.FC<{ isHovered: boolean; className?: string }> = ({ 
  isHovered, 
  className = "w-8 h-8" 
}) => {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      initial={{ scale: 1 }}
      animate={{ 
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Screen/Monitor */}
      <motion.rect
        x="8" y="12" width="48" height="32" rx="4"
        fill="currentColor"
        opacity={0.1}
        animate={{
          opacity: isHovered ? [0.1, 0.15, 0.1] : 0.1
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Screen border */}
      <motion.rect
        x="8" y="12" width="48" height="32" rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity={0.6}
      />
      
      {/* Code lines with typing animation */}
      <motion.g opacity={0.7}>
        <motion.rect
          x="12" y="18" width="16" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 16, 16] : [16, 16, 16]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.rect
          x="12" y="22" width="24" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 24, 24] : [24, 24, 24]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.rect
          x="12" y="26" width="20" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 20, 20] : [20, 20, 20]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        <motion.rect
          x="12" y="30" width="32" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 32, 32] : [32, 32, 32]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        />
        <motion.rect
          x="12" y="34" width="18" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 18, 18] : [18, 18, 18]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
        />
        <motion.rect
          x="12" y="38" width="28" height="2" rx="1"
          fill="currentColor"
          initial={{ width: 0 }}
          animate={{
            width: isHovered ? [0, 28, 28] : [28, 28, 28]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
        />
      </motion.g>
      
      {/* Blinking cursor */}
      <motion.rect
        x="42" y="38" width="2" height="2"
        fill="currentColor"
        animate={{
          opacity: isHovered ? [0, 1, 0] : [1, 0, 1]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Angle brackets < > */}
      <motion.path
        d="M48 16 L44 20 L48 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? [0, -2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M50 16 L54 20 L50 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? [0, 2, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Monitor stand */}
      <motion.rect
        x="28" y="44" width="8" height="4" rx="2"
        fill="currentColor"
        opacity={0.3}
      />
      <motion.rect
        x="24" y="48" width="16" height="2" rx="1"
        fill="currentColor"
        opacity={0.4}
      />
      
      {/* Floating code symbols when hovered */}
      <motion.g opacity={isHovered ? 0.6 : 0}>
        <motion.text
          x="16" y="10" 
          fontSize="8" 
          fill="currentColor"
          animate={{
            y: isHovered ? [10, 5, 10] : 10,
            opacity: isHovered ? [0, 0.8, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          {'{}'}
        </motion.text>
        <motion.text
          x="40" y="8" 
          fontSize="6" 
          fill="currentColor"
          animate={{
            y: isHovered ? [8, 3, 8] : 8,
            opacity: isHovered ? [0, 0.6, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          ()
        </motion.text>
        <motion.text
          x="52" y="52" 
          fontSize="10" 
          fill="currentColor"
          animate={{
            y: isHovered ? [52, 47, 52] : 52,
            opacity: isHovered ? [0, 0.7, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          ;
        </motion.text>
      </motion.g>
    </motion.svg>
  );
};

export default {
  AIBrainIcon,
  DesignPaletteIcon,
  CodeIcon
};