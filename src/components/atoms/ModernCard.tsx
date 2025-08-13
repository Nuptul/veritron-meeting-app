import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'bordered' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: 'none' | 'lift' | 'glow' | 'scale' | 'tilt';
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  interactive = false,
  onClick,
  aspectRatio = 'auto',
  padding = 'md',
  hover = interactive ? 'lift' : 'none',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // Base styles
  const baseStyles = cn(
    'relative overflow-hidden transition-all duration-300',
    'backdrop-blur-sm',
    interactive && 'cursor-pointer',
  );

  // Variant styles
  const variantStyles = {
    default: 'bg-gray-900/90 border border-gray-800/50',
    elevated: 'bg-gray-900/95 shadow-2xl shadow-black/50',
    glass: 'bg-white/[0.02] backdrop-blur-xl border border-white/[0.05]',
    bordered: 'bg-transparent border-2 border-amber-400/20 hover:border-amber-400/40',
    gradient: 'bg-gradient-to-br from-gray-900/95 via-gray-850/90 to-gray-800/95 border border-amber-400/10',
  };

  // Size styles
  const sizeStyles = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
  };

  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Aspect ratio styles
  const aspectStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  // Hover animation variants
  const hoverVariants = {
    none: {},
    lift: {
      y: isHovered ? -8 : 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    glow: {
      boxShadow: isHovered 
        ? '0 0 30px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1)' 
        : '0 0 0 rgba(212, 175, 55, 0)',
    },
    scale: {
      scale: isHovered ? 1.02 : 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    tilt: {
      rotateX: isHovered ? (mousePosition.y - 0.5) * 10 : 0,
      rotateY: isHovered ? (mousePosition.x - 0.5) * 10 : 0,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
  };

  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        paddingStyles[padding],
        aspectStyles[aspectRatio],
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={hoverVariants[hover]}
      style={{
        transformStyle: hover === 'tilt' ? 'preserve-3d' : undefined,
        perspective: hover === 'tilt' ? 1000 : undefined,
      }}
    >
      {/* Gradient overlay for depth */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/[0.03] via-transparent to-amber-600/[0.03] pointer-events-none" />
      )}

      {/* Top accent line for premium feel */}
      {(variant === 'gradient' || variant === 'elevated') && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scaleX: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Interactive glow effect */}
      {interactive && isHovered && (
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: 0.1 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(212, 175, 55, 0.2), transparent 50%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Card Header Component
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon,
  badge,
  className = '',
}) => {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div className="flex-1">
        {badge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 mb-2">
            {badge}
          </span>
        )}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
      {icon && (
        <div className="flex-shrink-0 ml-4">
          {icon}
        </div>
      )}
    </div>
  );
};

// Card Body Component
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn('flex-1', className)}>
      {children}
    </div>
  );
};

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  separator = false,
}) => {
  return (
    <div className={cn(
      'mt-auto pt-4',
      separator && 'border-t border-gray-800/50',
      className,
    )}>
      {children}
    </div>
  );
};

// Card Grid Component for layout
interface CardGridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = { default: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = '',
}) => {
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  // Use proper Tailwind classes
  const getGridCols = () => {
    let classes = 'grid';
    
    // Default columns
    if (columns.default === 1) classes += ' grid-cols-1';
    else if (columns.default === 2) classes += ' grid-cols-2';
    else if (columns.default === 3) classes += ' grid-cols-3';
    else if (columns.default === 4) classes += ' grid-cols-4';
    
    // Small breakpoint
    if (columns.sm) {
      if (columns.sm === 1) classes += ' sm:grid-cols-1';
      else if (columns.sm === 2) classes += ' sm:grid-cols-2';
      else if (columns.sm === 3) classes += ' sm:grid-cols-3';
      else if (columns.sm === 4) classes += ' sm:grid-cols-4';
    }
    
    // Medium breakpoint
    if (columns.md) {
      if (columns.md === 1) classes += ' md:grid-cols-1';
      else if (columns.md === 2) classes += ' md:grid-cols-2';
      else if (columns.md === 3) classes += ' md:grid-cols-3';
      else if (columns.md === 4) classes += ' md:grid-cols-4';
    }
    
    // Large breakpoint
    if (columns.lg) {
      if (columns.lg === 1) classes += ' lg:grid-cols-1';
      else if (columns.lg === 2) classes += ' lg:grid-cols-2';
      else if (columns.lg === 3) classes += ' lg:grid-cols-3';
      else if (columns.lg === 4) classes += ' lg:grid-cols-4';
    }
    
    // Extra large breakpoint
    if (columns.xl) {
      if (columns.xl === 1) classes += ' xl:grid-cols-1';
      else if (columns.xl === 2) classes += ' xl:grid-cols-2';
      else if (columns.xl === 3) classes += ' xl:grid-cols-3';
      else if (columns.xl === 4) classes += ' xl:grid-cols-4';
    }
    
    return classes;
  };

  return (
    <div className={cn(getGridCols(), gapStyles[gap], className)}>
      {children}
    </div>
  );
};

export default ModernCard;