import React from 'react';
import { cn } from '../../utils/cn';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  href?: string;
  target?: string;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  padding = 'md',
  as: Component = 'div',
  onClick,
  href,
  target,
  ...props
}) => {
  const baseClasses = cn(
    // Base card styling
    'relative overflow-hidden transition-all duration-300',
    'border border-opacity-20 backdrop-blur-sm',
    
    // Responsive border radius
    'rounded-fluid-md',
    
    // Size variants with fluid scaling
    {
      'min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]': size === 'sm',
      'min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]': size === 'md',
      'min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]': size === 'lg',
    },
    
    // Padding variants with fluid scaling
    {
      'p-0': padding === 'none',
      'p-fluid-sm': padding === 'sm',
      'p-fluid-md': padding === 'md',
      'p-fluid-lg': padding === 'lg',
    },
    
    // Variant styles
    {
      // Default variant
      'bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/5': variant === 'default',
      
      // Glass morphism variant
      'premium-glass': variant === 'glass',
      
      // Elevated variant
      'bg-white/10 dark:bg-black/30 border-veritron-gold-500/20 shadow-elevated': variant === 'elevated',
      
      // Premium variant with gold accents
      'bg-gradient-to-br from-white/10 via-transparent to-veritron-gold-500/5 border-veritron-gold-500/30 shadow-veritron': variant === 'premium',
    },
    
    // Interactive states
    {
      'cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-transform duration-200': 
        onClick || href,
    },
    
    // Touch optimization
    'touch-manipulation',
    
    className
  );

  // If it's a link, use anchor tag
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveCard;