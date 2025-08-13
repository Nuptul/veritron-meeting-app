import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        // Veritron Primary Colors - Gold Spectrum
        veritron: {
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#d4af37', // Primary Veritron Gold
            600: '#c19b26',
            700: '#b08920',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03',
          },
          aluminum: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#8a9ba8', // Primary Veritron Aluminum
            600: '#7d8ba3',
            700: '#6b7996',
            800: '#475569',
            900: '#334155',
            950: '#1e293b',
          },
          gunmetal: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#2a2a2a', // Primary Veritron Gunmetal
            900: '#1f2937',
            950: '#111827',
            black: '#000000', // Midnight Black
          },
          midnight: {
            50: '#0a0a0a',
            100: '#080808',
            200: '#060606',
            300: '#040404',
            400: '#020202',
            500: '#000000', // Pure Midnight Black
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000',
            950: '#000000',
          },
        },
        // Extended Semantic Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Sora', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Standard sizes with responsive line heights
        'xs': ['clamp(0.75rem, 0.6875rem + 0.39vw, 0.875rem)', { lineHeight: 'clamp(1rem, 0.9375rem + 0.39vw, 1.25rem)' }],
        'sm': ['clamp(0.875rem, 0.8125rem + 0.39vw, 1rem)', { lineHeight: 'clamp(1.25rem, 1.1875rem + 0.39vw, 1.5rem)' }],
        'base': ['clamp(1rem, 0.9375rem + 0.39vw, 1.125rem)', { lineHeight: 'clamp(1.5rem, 1.4375rem + 0.39vw, 1.75rem)' }],
        'lg': ['clamp(1.125rem, 1rem + 0.78vw, 1.375rem)', { lineHeight: 'clamp(1.75rem, 1.625rem + 0.78vw, 2rem)' }],
        'xl': ['clamp(1.25rem, 1.0625rem + 1.17vw, 1.625rem)', { lineHeight: 'clamp(1.75rem, 1.5625rem + 1.17vw, 2.25rem)' }],
        '2xl': ['clamp(1.5rem, 1.1875rem + 1.95vw, 2.25rem)', { lineHeight: 'clamp(2rem, 1.6875rem + 1.95vw, 2.75rem)' }],
        '3xl': ['clamp(1.875rem, 1.3125rem + 3.52vw, 3.5rem)', { lineHeight: 'clamp(2.25rem, 1.6875rem + 3.52vw, 4rem)' }],
        '4xl': ['clamp(2.25rem, 1.4375rem + 5.08vw, 4.5rem)', { lineHeight: 'clamp(2.5rem, 1.6875rem + 5.08vw, 5rem)' }],
        '5xl': ['clamp(3rem, 1.5rem + 9.38vw, 6rem)', { lineHeight: 'clamp(1rem, 0.5rem + 3.13vw, 2rem)' }],
        '6xl': ['clamp(3.75rem, 1.5rem + 14.06vw, 8rem)', { lineHeight: 'clamp(1rem, 0.5rem + 3.13vw, 2rem)' }],
        '7xl': ['clamp(4.5rem, 1.5rem + 18.75vw, 9rem)', { lineHeight: 'clamp(1rem, 0.5rem + 3.13vw, 2rem)' }],
      },
      spacing: {
        // Standard spacing
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        // Responsive spacing with clamp
        'fluid-xs': 'clamp(0.25rem, 0.125rem + 0.625vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 0.25rem + 1.25vw, 1rem)',
        'fluid-md': 'clamp(1rem, 0.5rem + 2.5vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 0.75rem + 3.75vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 1rem + 5vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 1.5rem + 7.5vw, 6rem)',
        'fluid-3xl': 'clamp(4rem, 2rem + 10vw, 8rem)',
        // Touch targets
        'touch-min': '44px',
        'touch-comfortable': '48px',
        'touch-spacious': '56px',
      },
      borderRadius: {
        '4xl': '2rem',
        // Responsive border radius
        'fluid-sm': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-md': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-lg': 'clamp(0.75rem, 1.5vw, 1rem)',
        'fluid-xl': 'clamp(1rem, 2vw, 1.5rem)',
      },
      boxShadow: {
        'veritron': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'veritron-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'veritron-active': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'veritron-focus': '0 0 0 3px rgba(212, 175, 55, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.15)',
        'elevated': '0 20px 60px rgba(212, 175, 55, 0.15), 0 10px 30px rgba(0, 0, 0, 0.2)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
        },
        'bounce-subtle': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        'gradient-x': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backdropSaturate: {
        120: '1.2',
        150: '1.5'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
        '4xl': '1920px',
        // Custom mobile-first breakpoints
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        'wide': {'min': '1440px'},
        'ultrawide': {'min': '1920px'},
        // Touch device queries
        'touch': {'raw': '(hover: none) and (pointer: coarse)'},
        'mouse': {'raw': '(hover: hover) and (pointer: fine)'},
        // High DPI screens
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      
      // Container queries support
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          '2xs': '360px',
          'xs': '475px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  darkMode: 'class',
} satisfies Config

export default config