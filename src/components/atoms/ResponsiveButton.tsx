import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
}

const ResponsiveButton = forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    as = 'button',
    href,
    target,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = cn(
      // Base button styling with responsive design
      'relative inline-flex items-center justify-center font-medium',
      'transition-all duration-200 ease-smooth',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Touch optimization
      'touch-manipulation select-none',
      '-webkit-tap-highlight-color: transparent',
      
      // Responsive sizing with proper touch targets
      {
        // Extra small
        'text-responsive-xs px-fluid-sm py-2 min-h-touch-min rounded-fluid-sm': size === 'xs',
        
        // Small
        'text-responsive-sm px-fluid-md py-2.5 min-h-touch-comfortable rounded-fluid-sm': size === 'sm',
        
        // Medium (default)
        'text-responsive-base px-fluid-md py-3 min-h-touch-comfortable rounded-fluid-md': size === 'md',
        
        // Large
        'text-responsive-lg px-fluid-lg py-3.5 min-h-touch-spacious rounded-fluid-md': size === 'lg',
        
        // Extra large
        'text-responsive-xl px-fluid-xl py-4 min-h-touch-spacious rounded-fluid-lg': size === 'xl',
      },
      
      // Width variants
      {
        'w-full': fullWidth,
      },
      
      // Variant styles
      {
        // Primary - Veritron Gold
        'bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500 text-white hover:from-veritron-gold-500 hover:to-veritron-gold-600 focus:ring-veritron-gold-500 shadow-lg hover:shadow-xl': variant === 'primary',
        
        // Secondary - Aluminum
        'bg-veritron-aluminum-500 text-white hover:bg-veritron-aluminum-600 focus:ring-veritron-aluminum-500 shadow-md hover:shadow-lg': variant === 'secondary',
        
        // Ghost - Transparent with hover
        'bg-transparent text-veritron-gold-500 hover:bg-veritron-gold-50 dark:hover:bg-veritron-gold-500/10 focus:ring-veritron-gold-500': variant === 'ghost',
        
        // Outline - Border style
        'border-2 border-veritron-gold-500 text-veritron-gold-600 hover:bg-veritron-gold-500 hover:text-white focus:ring-veritron-gold-500 dark:text-veritron-gold-400 dark:border-veritron-gold-400': variant === 'outline',
        
        // Gradient - Multi-color gradient
        'bg-gradient-to-r from-veritron-gold-400 via-veritron-aluminum-400 to-veritron-gold-500 text-white hover:from-veritron-gold-500 hover:via-veritron-aluminum-500 hover:to-veritron-gold-600 focus:ring-veritron-gold-500 shadow-lg hover:shadow-xl': variant === 'gradient',
        
        // Glass - Glass morphism
        'premium-glass text-white border border-white/20 hover:bg-white/10 focus:ring-white/50 backdrop-blur-md': variant === 'glass',
      },
      
      // Loading state
      {
        'cursor-not-allowed': loading,
      },
      
      className
    );

    const content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <span className={cn('flex items-center gap-2', { 'opacity-0': loading })}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </>
    );

    // Handle different component types
    if (as === 'a' && href) {
      return (
        <a
          href={href}
          target={target}
          className={baseClasses}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (e.currentTarget as HTMLAnchorElement).click();
            }
          }}
          {...(props as any)}
        >
          {content}
        </a>
      );
    }

    if (as === 'div') {
      return (
        <div
          className={baseClasses}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              props.onClick?.(e as any);
            }
          }}
          {...(props as any)}
        >
          {content}
        </div>
      );
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

ResponsiveButton.displayName = 'ResponsiveButton';

export default ResponsiveButton;