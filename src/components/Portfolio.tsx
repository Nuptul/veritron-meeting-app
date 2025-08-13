import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Project, FilterCategory } from '../types/portfolio';
import { useStaggerAnimation, useScrollReveal, useMagneticEffect } from '../hooks/useAdvancedAnimations';
import PremiumButton from './atoms/PremiumButton';
import MirrorCard from './atoms/MirrorCard';
import { SectionHeading } from './atoms/PremiumHeading';

// Mock data - In production, this would come from Convex
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Revolutionary machine learning platform that transforms complex data into actionable insights with real-time predictive analytics.',
    category: 'AI',
    tags: ['Machine Learning', 'Dashboard', 'Analytics', 'Real-time'],
    client: 'TechCorp Industries',
    completionDate: '2024-03-15',
    featured: true,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'Performance Boost', value: '340%', improvement: '+240%' },
      { label: 'Processing Speed', value: '2.3s', improvement: '-80%' },
      { label: 'User Satisfaction', value: '98%', improvement: '+45%' }
    ],
    testimonial: {
      quote: 'This AI platform revolutionized how we handle data. The insights are incredible.',
      author: 'Sarah Chen',
      position: 'Head of Data Science',
      company: 'TechCorp Industries',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3b9?w=150&h=150&fit=crop&crop=faces'
    },
    technologies: ['TensorFlow', 'React', 'Python', 'AWS', 'Docker'],
    liveUrl: 'https://demo.ai-dashboard.com',
    caseStudyUrl: '/case-studies/ai-dashboard'
  },
  {
    id: '2',
    title: 'Brand Identity & Design System',
    description: 'Complete visual identity overhaul with comprehensive design system, establishing strong brand presence across all touchpoints.',
    category: 'Design',
    tags: ['Branding', 'Design System', 'Visual Identity', 'Guidelines'],
    client: 'Innovate Startups',
    completionDate: '2024-02-28',
    featured: true,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'Brand Recognition', value: '85%', improvement: '+60%' },
      { label: 'Customer Engagement', value: '180%', improvement: '+80%' },
      { label: 'Market Position', value: 'Top 3', improvement: '+7 positions' }
    ],
    testimonial: {
      quote: 'The new brand identity perfectly captures our vision. Outstanding work.',
      author: 'Marcus Thompson',
      position: 'CEO',
      company: 'Innovate Startups',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces'
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Principle'],
    caseStudyUrl: '/case-studies/brand-identity'
  },
  {
    id: '3',
    title: 'E-Commerce Platform Rebuild',
    description: 'Modern, scalable e-commerce solution with advanced features, microservices architecture, and seamless user experience.',
    category: 'Software',
    tags: ['E-Commerce', 'React', 'Node.js', 'Microservices', 'Stripe'],
    client: 'RetailMax Solutions',
    completionDate: '2024-01-20',
    featured: false,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'Conversion Rate', value: '12.8%', improvement: '+180%' },
      { label: 'Page Load Time', value: '1.2s', improvement: '-70%' },
      { label: 'Revenue Growth', value: '450%', improvement: '+350%' }
    ],
    testimonial: {
      quote: 'Sales tripled within the first month. The platform is incredible.',
      author: 'Jennifer Liu',
      position: 'CTO',
      company: 'RetailMax Solutions',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Docker'],
    liveUrl: 'https://retailmax-demo.com',
    caseStudyUrl: '/case-studies/ecommerce-platform'
  },
  {
    id: '4',
    title: 'Neural Network Visualization',
    description: 'Interactive 3D visualization tool for neural networks, making complex AI architectures understandable and explorable.',
    category: 'AI',
    tags: ['Neural Networks', 'Visualization', '3D', 'Interactive', 'WebGL'],
    client: 'AI Research Lab',
    completionDate: '2024-04-10',
    featured: true,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'Learning Efficiency', value: '250%', improvement: '+150%' },
      { label: 'User Understanding', value: '92%', improvement: '+67%' },
      { label: 'Research Speed', value: '3x', improvement: '+200%' }
    ],
    technologies: ['Three.js', 'WebGL', 'D3.js', 'Python', 'TensorFlow'],
    liveUrl: 'https://neural-viz-demo.com',
    caseStudyUrl: '/case-studies/neural-visualization'
  },
  {
    id: '5',
    title: 'Mobile App UI/UX Design',
    description: 'Award-winning mobile application design with intuitive user flows and stunning visual design, optimized for engagement.',
    category: 'Design',
    tags: ['Mobile', 'UI/UX', 'Prototyping', 'User Research', 'iOS', 'Android'],
    client: 'FitLife Mobile',
    completionDate: '2024-03-05',
    featured: false,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'App Store Rating', value: '4.9/5', improvement: '+1.2' },
      { label: 'User Retention', value: '89%', improvement: '+45%' },
      { label: 'Daily Active Users', value: '50K+', improvement: '+220%' }
    ],
    technologies: ['Figma', 'Principle', 'After Effects', 'Sketch', 'InVision'],
    caseStudyUrl: '/case-studies/mobile-app-design'
  },
  {
    id: '6',
    title: 'Blockchain DeFi Platform',
    description: 'Decentralized finance platform with advanced trading features, yield farming, and institutional-grade security.',
    category: 'Software',
    tags: ['Blockchain', 'DeFi', 'Smart Contracts', 'Web3', 'Trading'],
    client: 'CryptoTech Ventures',
    completionDate: '2024-02-15',
    featured: true,
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=600&fit=crop'
      ]
    },
    metrics: [
      { label: 'Total Value Locked', value: '$50M+', improvement: '+2000%' },
      { label: 'Transaction Speed', value: '0.3s', improvement: '-85%' },
      { label: 'Security Score', value: '99.8%', improvement: '+15%' }
    ],
    technologies: ['Solidity', 'Web3.js', 'React', 'Hardhat', 'Ethereum', 'IPFS'],
    liveUrl: 'https://defi-platform-demo.com',
    caseStudyUrl: '/case-studies/defi-platform'
  }
];

const filterCategories: FilterCategory[] = [
  { id: 'all', name: 'All Projects', count: 0, color: 'bg-veritron-aluminum-500' },
  { id: 'AI', name: 'AI & Machine Learning', count: 0, color: 'bg-blue-500' },
  { id: 'Design', name: 'Design & Branding', count: 0, color: 'bg-purple-500' },
  { id: 'Software', name: 'Software Development', count: 0, color: 'bg-green-500' }
];

// Project Card Component with 3D Effects
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenLightbox: (project: Project) => void;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenLightbox, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const magneticRef = useMagneticEffect(0.15);

  // 3D Transform Animation
  const [{ transform, shadow }, set] = useSpring(() => ({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    shadow: '0 10px 30px rgba(0,0,0,0.1)',
    config: { tension: 300, friction: 30 }
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    set({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, 0, 50px)`,
      shadow: `0 25px 50px rgba(212, 175, 55, 0.25)`
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    set({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      shadow: '0 10px 30px rgba(0,0,0,0.1)'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI': return 'from-blue-500 to-blue-600';
      case 'Design': return 'from-purple-500 to-purple-600';
      case 'Software': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <animated.div
      style={{ ...style, transform, boxShadow: shadow }}
      className="group cursor-pointer"
      onClick={() => onOpenLightbox(project)}
    >
      <MirrorCard
        variant="gold"
        className="h-full"
        enableReflection={true}
        enableParallax={true}
      >
        <div
          ref={cardRef as unknown as React.Ref<HTMLDivElement>}
          className="relative h-[520px] md:h-[540px] lg:h-[560px] flex flex-col rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-amber-400/20 shadow-xl overflow-hidden"
          aria-label={`${project.title} project card`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-amber-600/5 rounded-3xl blur-3xl" />
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 flex-shrink-0">
          <motion.img
            src={project.images.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(project.category)} text-white text-sm font-medium`}>
            {project.category}
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-900 px-2 py-1 rounded-full text-xs font-bold"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              ⭐ FEATURED
            </motion.div>
          )}
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* View Project Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PremiumButton
              variant="gold"
              size="medium"
            >
              View Project →
            </PremiumButton>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1 overflow-hidden">
          <motion.h3 
            className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent mb-2 transition-colors duration-300 min-h-[1.75rem]"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-amber-50/80 text-sm mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-2 py-1 bg-amber-900/20 text-amber-200 text-xs rounded-full border border-amber-700/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: '#f0f9ff' }}
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-amber-900/20 text-amber-200 text-xs rounded-full border border-amber-700/30">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Metrics Preview */}
          <div className="mt-auto pt-4 border-t border-amber-800/20">
            {project.metrics.length > 0 ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {project.metrics.slice(0, 2).map((metric, metricIndex) => (
                  <motion.div
                    key={metric.label}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-lg font-bold text-amber-100">
                      {metric.value}
                    </div>
                    <div className="text-xs text-amber-200/70">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Arrow Icon - gold */}
              <motion.div
                className="text-amber-300 opacity-0 group-hover:opacity-100"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
            ) : (
              <div className="h-[3.5rem]"></div>
            )}
          </div>
        </div>
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%',
            transition: {
              duration: 0.6,
              ease: 'easeInOut'
            }
          }}
        />
        </div>
      </MirrorCard>
    </animated.div>
  );
};

// Lightbox Modal Component
interface LightboxProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slideVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 }
  };

  if (!project) return null;

  const allImages = [project.images.after, ...project.images.gallery];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-veritron-gunmetal-900">
                  {project.title}
                </h2>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <PremiumButton
                variant="aluminum"
                size="small"
                onClick={onClose}
                className="!p-2 !rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </PremiumButton>
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[80vh] overflow-y-auto">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={allImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <PremiumButton
                          variant="gunmetal"
                          size="small"
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? allImages.length - 1 : prev - 1
                          )}
                          className="!p-2 !rounded-full opacity-90 hover:opacity-100"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </PremiumButton>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <PremiumButton
                          variant="gunmetal"
                          size="small"
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === allImages.length - 1 ? 0 : prev + 1
                          )}
                          className="!p-2 !rounded-full opacity-90 hover:opacity-100"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </PremiumButton>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex space-x-2 p-4 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                          index === currentImageIndex 
                            ? 'border-veritron-gold-500 scale-110' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        whileHover={{ scale: index === currentImageIndex ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Project Details */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-veritron-gunmetal-900">
                    Project Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-veritron-gunmetal-900">
                    Key Results
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.metrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        className="bg-gradient-to-br from-veritron-gold-50 to-white p-4 rounded-xl border border-veritron-gold-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-2xl font-bold text-veritron-gold-600 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-700 mb-1">
                          {metric.label}
                        </div>
                        {metric.improvement && (
                          <div className="text-xs text-green-600 font-medium">
                            {metric.improvement}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-veritron-gunmetal-900">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-veritron-aluminum-100 text-veritron-gunmetal-700 text-sm rounded-full font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#f0f9ff' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Testimonial */}
                {project.testimonial && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <img
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <blockquote className="text-gray-700 italic mb-3">
                          "{project.testimonial.quote}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold text-veritron-gunmetal-900">
                            {project.testimonial.author}
                          </div>
                          <div className="text-gray-600">
                            {project.testimonial.position} at {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.liveUrl && (
                    <PremiumButton
                      variant="gold"
                      size="medium"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Site
                      </span>
                    </PremiumButton>
                  )}
                  {project.caseStudyUrl && (
                    <PremiumButton
                      variant="aluminum"
                      size="medium"
                      onClick={() => window.open(project.caseStudyUrl, '_blank')}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Full Case Study
                      </span>
                    </PremiumButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const containerRef = useScrollReveal({ direction: 'up', distance: 50, duration: 1 });
  const { containerRef: staggerContainerRef, animate: triggerStagger } = useStaggerAnimation('.portfolio-card', {
    stagger: 0.15,
    duration: 0.8
  });

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = mockProjects;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  }, [activeFilter, searchTerm]);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return filterCategories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? mockProjects.length 
        : mockProjects.filter(project => project.category === category.id).length
    }));
  }, []);

  // Masonry layout calculation
  const [columns, setColumns] = useState(3);
  
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Animate projects when filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerStagger();
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredProjects, triggerStagger]);

  // Create masonry layout
  const masonryItems = useMemo(() => {
    const columnArrays: Project[][] = Array(columns).fill(null).map(() => []);
    
    filteredProjects.forEach((project, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(project);
    });
    
    return columnArrays;
  }, [filteredProjects, columns]);

  const openLightbox = (project: Project) => {
    setLightboxProject(project);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setLightboxProject(null), 300);
  };

  return (
    <>
      <section ref={containerRef} className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Header */}
          <SectionHeading
            badge="Our Work"
            title="Portfolio & Case Studies"
            accentWord="Case Studies"
            subtitle="Explore our comprehensive portfolio showcasing cutting-edge AI solutions, stunning designs, and innovative software developments that drive real results."
            className="mb-16"
            animate={false}
          />

          {/* Search and Filter Controls */}
          <div className="mb-12">
            {/* Search Bar */}
            <motion.div
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 bg-white border border-gray-200 rounded-2xl focus:ring-veritron-gold-500 focus:border-veritron-gold-500 transition-colors duration-200 text-lg"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {categoriesWithCounts.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PremiumButton
                    variant={activeFilter === category.id ? 'gold' : 'aluminum'}
                    size="medium"
                    onClick={() => setActiveFilter(category.id)}
                    className="relative"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeFilter === category.id
                          ? 'bg-veritron-gunmetal-900/20 text-veritron-gunmetal-900'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </span>
                  </PremiumButton>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Projects Grid - Fixed Responsive Layout with CSS Grid */}
          <motion.div
            ref={staggerContainerRef as unknown as React.Ref<HTMLDivElement>}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="portfolio-card h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenLightbox={openLightbox}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Projects Found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <PremiumButton
                  variant="aluminum"
                  size="medium"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchTerm('');
                  }}
                >
                  Reset Filters
                </PremiumButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Button (Future Feature) */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <PremiumButton
              variant="gunmetal"
              size="large"
              onClick={() => {
                // TODO: Implement pagination/infinite scroll
                console.log('Load more projects');
              }}
            >
              <span className="flex items-center gap-2">
                Load More Projects
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
              </span>
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        project={lightboxProject}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </>
  );
};

export default Portfolio;