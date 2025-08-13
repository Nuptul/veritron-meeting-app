import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  isHovered?: boolean;
  variant?: 'line' | 'fill' | 'duotone';
}

// Base Icon Wrapper
const IconWrapper: React.FC<{ children: React.ReactNode } & IconProps> = ({ 
  children, 
  size = 24, 
  className = '',
  isHovered = false 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.svg>
  );
};

// AI & Machine Learning Icon
export const AIIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          {/* Neural network representation */}
          <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="5" cy="7" r="2" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="19" cy="7" r="2" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="5" cy="17" r="2" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="19" cy="17" r="2" stroke={color} strokeWidth={strokeWidth} />
          <path d="M9 12L7 9M15 12L17 9M9 12L7 15M15 12L17 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="3" fill={color} opacity={0.2} />
          <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="5" cy="7" r="2" fill={color} />
          <circle cx="19" cy="7" r="2" fill={color} />
          <circle cx="5" cy="17" r="2" fill={color} />
          <circle cx="19" cy="17" r="2" fill={color} />
          <path d="M9 12L7 9M15 12L17 9M9 12L7 15M15 12L17 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      )}
    </IconWrapper>
  );
};

// Development Icon
export const CodeIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <path d="M8 9L5 12L8 15M16 9L19 12L16 15M14 6L10 18" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" fill={color} opacity={0.1} />
          <path d="M8 9L5 12L8 15M16 9L19 12L16 15M14 6L10 18" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
    </IconWrapper>
  );
};

// Design Icon
export const DesignIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <path d="M12 2L2 7L12 12L22 7L12 2Z" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path d="M2 17L12 22L22 17" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path d="M2 12L12 17L22 12" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      ) : (
        <>
          <path d="M12 2L2 7L12 12L22 7L12 2Z" 
            fill={color} 
            opacity={0.2}
          />
          <path d="M12 2L2 7L12 12L22 7L12 2Z" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
    </IconWrapper>
  );
};

// Cloud Services Icon
export const CloudIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <path 
          d="M18 10H18.01M6 10C6 7.79086 7.79086 6 10 6C11.8859 6 13.4522 7.36047 13.8582 9.17669C14.0934 9.06146 14.3551 9 14.6296 9C15.9415 9 17.0037 10.0623 17.0037 11.3741C17.0037 11.4298 17.0018 11.485 16.998 11.5397C18.141 11.7213 19 12.6663 19 13.8148C19 15.0898 17.9102 16.1296 16.5741 16.1296H8C6.34315 16.1296 5 14.7865 5 13.1296C5 11.5532 6.20929 10.2682 7.75185 10.1358C7.59237 10.6984 7.5 11.3047 7.5 11.9259" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path 
            d="M18 10H18.01M6 10C6 7.79086 7.79086 6 10 6C11.8859 6 13.4522 7.36047 13.8582 9.17669C14.0934 9.06146 14.3551 9 14.6296 9C15.9415 9 17.0037 10.0623 17.0037 11.3741C17.0037 11.4298 17.0018 11.485 16.998 11.5397C18.141 11.7213 19 12.6663 19 13.8148C19 15.0898 17.9102 16.1296 16.5741 16.1296H8C6.34315 16.1296 5 14.7865 5 13.1296C5 11.5532 6.20929 10.2682 7.75185 10.1358C7.59237 10.6984 7.5 11.3047 7.5 11.9259" 
            fill={color}
            opacity={0.2}
          />
          <path 
            d="M18 10H18.01M6 10C6 7.79086 7.79086 6 10 6C11.8859 6 13.4522 7.36047 13.8582 9.17669C14.0934 9.06146 14.3551 9 14.6296 9C15.9415 9 17.0037 10.0623 17.0037 11.3741C17.0037 11.4298 17.0018 11.485 16.998 11.5397C18.141 11.7213 19 12.6663 19 13.8148C19 15.0898 17.9102 16.1296 16.5741 16.1296H8C6.34315 16.1296 5 14.7865 5 13.1296C5 11.5532 6.20929 10.2682 7.75185 10.1358C7.59237 10.6984 7.5 11.3047 7.5 11.9259" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </>
      )}
    </IconWrapper>
  );
};

// API Integration Icon
export const APIIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="14" y="4" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="4" y="14" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="14" y="14" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <path d="M10 7H14M10 17H14M7 10V14M17 10V14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1" fill={color} opacity={0.2} />
          <rect x="14" y="4" width="6" height="6" rx="1" fill={color} opacity={0.2} />
          <rect x="4" y="14" width="6" height="6" rx="1" fill={color} opacity={0.2} />
          <rect x="14" y="14" width="6" height="6" rx="1" fill={color} opacity={0.2} />
          <rect x="4" y="4" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="14" y="4" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="4" y="14" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <rect x="14" y="14" width="6" height="6" rx="1" stroke={color} strokeWidth={strokeWidth} />
          <path d="M10 7H14M10 17H14M7 10V14M17 10V14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      )}
    </IconWrapper>
  );
};

// Database Icon
export const DatabaseIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth={strokeWidth} />
          <path d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12" stroke={color} strokeWidth={strokeWidth} />
          <path d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5" stroke={color} strokeWidth={strokeWidth} />
          <path d="M21 12V19" stroke={color} strokeWidth={strokeWidth} />
        </>
      ) : (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="3" fill={color} opacity={0.2} />
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth={strokeWidth} />
          <path d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12" stroke={color} strokeWidth={strokeWidth} />
          <path d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5" stroke={color} strokeWidth={strokeWidth} />
          <path d="M21 12V19" stroke={color} strokeWidth={strokeWidth} />
        </>
      )}
    </IconWrapper>
  );
};

// Security Icon
export const SecurityIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <path 
            d="M12 2L3.5 7V11.5C3.5 16.2 6.5 20.7 12 22C17.5 20.7 20.5 16.2 20.5 11.5V7L12 2Z" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M9 12L11 14L15 10" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      ) : (
        <>
          <path 
            d="M12 2L3.5 7V11.5C3.5 16.2 6.5 20.7 12 22C17.5 20.7 20.5 16.2 20.5 11.5V7L12 2Z" 
            fill={color}
            opacity={0.2}
          />
          <path 
            d="M12 2L3.5 7V11.5C3.5 16.2 6.5 20.7 12 22C17.5 20.7 20.5 16.2 20.5 11.5V7L12 2Z" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M9 12L11 14L15 10" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </>
      )}
    </IconWrapper>
  );
};

// Analytics Icon
export const AnalyticsIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  strokeWidth = 2,
  isHovered = false,
  variant = 'line' 
}) => {
  const color = isHovered ? '#d4af37' : 'currentColor';
  
  return (
    <IconWrapper size={size} className={className} isHovered={isHovered}>
      {variant === 'line' ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={strokeWidth} />
          <path d="M9 17V12M12 17V7M15 17V14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" fill={color} opacity={0.1} />
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={strokeWidth} />
          <rect x="8" y="12" width="2" height="5" fill={color} />
          <rect x="11" y="7" width="2" height="10" fill={color} />
          <rect x="14" y="14" width="2" height="3" fill={color} />
        </>
      )}
    </IconWrapper>
  );
};

// Export all icons as a collection
export const ModernIcons = {
  AI: AIIcon,
  Code: CodeIcon,
  Design: DesignIcon,
  Cloud: CloudIcon,
  API: APIIcon,
  Database: DatabaseIcon,
  Security: SecurityIcon,
  Analytics: AnalyticsIcon,
};

export default ModernIcons;