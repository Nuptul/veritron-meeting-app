# 🚀 Veritron Meeting App

**Professional AI Agency Website with Advanced Animations & WebGPU Graphics**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/Convex-1.25.4-FF6B35?style=flat)](https://convex.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **🎯 Enterprise-grade React application showcasing advanced web technologies, WebGPU graphics, and modern UI/UX design patterns for AI agency branding.**

## ✨ Features

### 🎨 **Design System**
- **Premium Veritron Brand Identity** - Gold/aluminum color palette with professional styling
- **Glass Morphism Effects** - Modern frosted glass components with depth
- **Advanced Motion System** - Performance-optimized animations with budget controls
- **Responsive Design** - Mobile-first approach with container queries
- **Dark/Light Themes** - Intelligent theme switching with system preference detection

### ⚡ **Performance & Graphics**
- **WebGPU Particle System** - Hardware-accelerated 3D particle effects
- **Framer Motion Integration** - Smooth, physics-based animations
- **Performance Monitoring** - Real-time jank detection and optimization
- **Code Splitting** - Lazy loading for optimal bundle sizes
- **Service Worker Ready** - Progressive Web App capabilities

### 🔧 **Technical Stack**
- **React 18** - Concurrent features, Suspense, and modern hooks
- **TypeScript** - Full type safety with strict configuration
- **Vite** - Lightning-fast development and build system
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Convex** - Real-time backend-as-a-service integration
- **Three.js & React Three Fiber** - 3D graphics and WebGPU rendering

### 🎪 **Advanced Features**
- **Motion Budget System** - Adaptive performance based on device capabilities  
- **Accessibility Compliant** - WCAG 2.1 AA standards with screen reader support
- **Internationalization** - Multi-language support with RTL layout
- **Analytics Integration** - Performance tracking and user insights
- **SEO Optimized** - Meta tags, structured data, and search optimization

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Nuptul/veritron-meeting-app.git
cd veritron-meeting-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Convex configuration

# Initialize Convex backend (first time setup)
npx convex dev

# Start development server
npm run dev
```

### 🌐 **Development Server**
```bash
# Start Vite development server
npm run dev

# Start with Convex backend (recommended)
npm run dev:full

# Start only Convex backend
npm run convex:dev
```

**Open your browser to `http://localhost:3000`** 🎉

## 📁 Project Structure

```
veritron-meeting-app/
├── src/
│   ├── components/          # React components
│   │   ├── atoms/          # Basic UI components
│   │   ├── organisms/      # Complex components
│   │   └── examples/       # Demo components
│   ├── pages/              # Route components
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS and styling
│   ├── utils/              # Utility functions
│   ├── gpu/                # WebGPU shaders and renderers
│   ├── types/              # TypeScript definitions
│   └── context/            # React context providers
├── convex/                 # Backend functions and schema
├── public/                 # Static assets
├── config/                 # Configuration files
└── docs/                   # Documentation
```

## 🎨 Design System

### **Color Palette**
```css
/* Veritron Brand Colors */
--veritron-gold: #D4AF37        /* Primary accent */
--veritron-aluminum: #A8B2C1    /* Secondary */
--veritron-gunmetal: #2A3342    /* Dark neutral */
--veritron-platinum: #E5E4E2    /* Light neutral */
```

### **Typography Scale**
- **Display**: 3.75rem (60px) - Hero headings
- **Heading 1**: 2.25rem (36px) - Main titles  
- **Heading 2**: 1.875rem (30px) - Section titles
- **Body**: 1rem (16px) - Main content
- **Caption**: 0.875rem (14px) - Supporting text

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run dev:full        # Start dev + Convex
npm run type-check      # TypeScript checking

# Building
npm run build           # Production build
npm run preview         # Preview build
npm run lint           # ESLint checking
npm run lint:fix       # Auto-fix linting

# Testing
npm run test           # Run tests
npm run test:ui        # Test UI
npm run coverage       # Test coverage

# Convex Backend
npm run convex:dev     # Start Convex
npm run convex:deploy  # Deploy backend
npm run convex:dashboard # Open dashboard
```

## ⚙️ Configuration

### **Environment Variables**
```bash
# .env.local
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=https://your-app.convex.cloud
NODE_ENV=development
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CONTACT_FORM=true
```

### **Convex Setup**
1. Run `npx convex dev` for first-time setup
2. Follow authentication prompts
3. Update `.env.local` with provided URLs
4. Schema and functions are pre-configured

## 🎯 Performance Optimization

### **Motion Budget System**
```typescript
// Automatic performance adaptation
const motionBudget = useMotionBudget();
// Adjusts animations based on:
// - Device performance
// - Battery level  
// - Network conditions
// - User preferences
```

### **Bundle Analysis**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 🛠️ Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# CONVEX_DEPLOYMENT
# VITE_CONVEX_URL
```

### **Netlify**
```bash
# Build command
npm run build

# Publish directory  
dist

# Environment variables
CONVEX_DEPLOYMENT=your-deployment
VITE_CONVEX_URL=https://your-app.convex.cloud
```

## 🔍 Browser Support

| Browser | Version | WebGPU Support |
|---------|---------|----------------|
| Chrome  | ≥ 113   | ✅ Full        |
| Edge    | ≥ 113   | ✅ Full        |
| Firefox | ≥ 110   | 🟡 Partial     |
| Safari  | ≥ 16.4  | 🟡 Partial     |

**Note**: WebGPU features gracefully degrade to Canvas/CSS animations on unsupported browsers.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper TypeScript types
4. Write/update tests as needed
5. Run linting: `npm run lint:fix`
6. Commit with conventional commits
7. Push and create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the blazing fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Convex** - For the real-time backend platform
- **Three.js** - For WebGL/WebGPU 3D graphics
- **Framer Motion** - For beautiful animations

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Nuptul/veritron-meeting-app/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Community**: Join our discussions in GitHub Discussions

---

<div align="center">
  <p><strong>🌟 Built with modern web technologies for the future of digital experiences</strong></p>
  <p><sub>Generated with Claude Code - Ready for enterprise deployment</sub></p>
</div>