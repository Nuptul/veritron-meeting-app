import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDownIcon, PlayIcon, PauseIcon, RefreshCcwIcon } from 'lucide-react';

/**
 * Progressive Enhancement Interactive Block Component
 * 
 * Architecture:
 * 1. Base Layer: Semantic HTML that works without JavaScript
 * 2. Enhanced Layer: Interactive features with graceful degradation
 * 3. Optimal Layer: Advanced animations and WebGL effects
 * 
 * SEO Compliance:
 * - Canonical HTML structure preserved for crawlers
 * - Proper semantic markup with ARIA attributes
 * - Noscript fallbacks for all interactive content
 * - Schema.org structured data integration
 */

interface PersonalizationContext {
  userSegment?: 'developer' | 'designer' | 'manager' | 'enterprise';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  industryVertical?: string;
  companySize?: 'startup' | 'mid-market' | 'enterprise';
  techStack?: string[];
  previousInteractions?: string[];
}

interface EdgeCacheConfig {
  strategy: 'static' | 'edge' | 'dynamic';
  ttl?: number;
  varyBy?: string[];
  purgeKeys?: string[];
}

interface InteractiveBlockProps {
  /** Content configuration */
  title: string;
  description: string;
  content: React.ReactNode;
  
  /** Progressive enhancement levels */
  enhancementLevel?: 'base' | 'enhanced' | 'optimal';
  
  /** Interaction types */
  interactionType?: 'accordion' | 'carousel' | 'tabs' | 'modal' | 'animation';
  
  /** SEO and accessibility */
  schemaType?: 'Article' | 'Service' | 'Product' | 'Organization' | 'HowTo' | 'TechArticle';
  ariaLabel?: string;
  
  /** Performance configuration */
  lazyLoad?: boolean;
  preloadContent?: boolean;
  
  /** Styling and layout */
  variant?: 'default' | 'premium' | 'minimal' | 'card';
  className?: string;
  
  /** Edge personalization */
  personalizationContext?: PersonalizationContext;
  edgeCacheConfig?: EdgeCacheConfig;
  fallbackContent?: React.ReactNode;
  
  /** A/B testing */
  experimentId?: string;
  variant_id?: string;
  
  /** Event handlers */
  onInteraction?: (action: string, data?: any) => void;
  onVisible?: () => void;
  onPersonalizationLoad?: (context: PersonalizationContext) => void;
}

/**
 * Base HTML Structure Component (No JavaScript Required)
 */
const BaseStructure: React.FC<{
  title: string;
  description: string;
  content: React.ReactNode;
  schemaType?: string;
  ariaLabel?: string;
}> = ({ title, description, content, schemaType = 'Article', ariaLabel }) => {
  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaType,
          name: title,
          description: description,
          publisher: {
            '@type': 'Organization',
            name: 'Veritron AI Agency'
          }
        })}
      </script>
      
      {/* Semantic HTML Structure */}
      <article 
        className="interactive-block-base"
        role="region"
        aria-label={ariaLabel || title}
      >
        <header className="interactive-block-header">
          <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
          <p className="text-veritron-aluminum-300 mb-4">{description}</p>
        </header>
        
        <div className="interactive-block-content">
          {content}
        </div>
      </article>
    </>
  );
};

/**
 * Enhanced Interactive Layer (Progressive Enhancement)
 */
const EnhancedLayer: React.FC<InteractiveBlockProps> = ({
  title,
  description,
  content,
  interactionType = 'accordion',
  onInteraction,
  onVisible,
  ariaLabel
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  
  // Notify when component becomes visible
  useEffect(() => {
    if (isInView && onVisible) {
      onVisible();
    }
  }, [isInView, onVisible]);
  
  const handleInteraction = useCallback((action: string, data?: any) => {
    if (onInteraction) {
      onInteraction(action, data);
    }
  }, [onInteraction]);
  
  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => {
      const newState = !prev;
      handleInteraction('toggle', { expanded: newState });
      return newState;
    });
  }, [handleInteraction]);
  
  const togglePlayback = useCallback(() => {
    setIsPlaying(prev => {
      const newState = !prev;
      handleInteraction('playback', { playing: newState });
      return newState;
    });
  }, [handleInteraction]);
  
  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
    handleInteraction('tab-change', { index });
  }, [handleInteraction]);
  
  // Render based on interaction type
  const renderInteractiveContent = () => {
    switch (interactionType) {
      case 'accordion':
        return (
          <div className="border border-veritron-gunmetal-600 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 bg-veritron-gunmetal-700 hover:bg-veritron-gunmetal-600 transition-colors flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-veritron-gold-500"
              onClick={toggleExpansion}
              aria-expanded={isExpanded}
              aria-controls="accordion-content"
              aria-label={ariaLabel || `Toggle ${title}`}
            >
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-veritron-aluminum-400 mt-1">{description}</p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-5 h-5 text-veritron-gold-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id="accordion-content"
                  role="region"
                  aria-labelledby="accordion-header"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-veritron-gunmetal-800">
                    {content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
        
      case 'carousel':
        return (
          <div className="relative bg-veritron-gunmetal-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayback}
                  className="p-2 bg-veritron-gold-500 hover:bg-veritron-gold-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-veritron-gold-400"
                  aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-4 h-4 text-white" />
                  ) : (
                    <PlayIcon className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${currentTab * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex"
              >
                {React.Children.map(content as React.ReactElement, (child, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    {child}
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-4 space-x-2">
              {React.Children.map(content as React.ReactElement, (_, index) => (
                <button
                  key={index}
                  onClick={() => selectTab(index)}
                  className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 ${
                    currentTab === index
                      ? 'bg-veritron-gold-500'
                      : 'bg-veritron-gunmetal-500 hover:bg-veritron-gunmetal-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        );
        
      case 'tabs':
        const tabContent = React.Children.toArray(content as React.ReactElement);
        return (
          <div className="bg-veritron-gunmetal-800 rounded-lg overflow-hidden">
            <div className="flex border-b border-veritron-gunmetal-600">
              {tabContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectTab(index)}
                  className={`px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 ${
                    currentTab === index
                      ? 'bg-veritron-gold-500 text-white'
                      : 'text-veritron-aluminum-300 hover:text-white hover:bg-veritron-gunmetal-700'
                  }`}
                  role="tab"
                  aria-selected={currentTab === index}
                  aria-controls={`tabpanel-${index}`}
                  id={`tab-${index}`}
                >
                  Tab {index + 1}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              {tabContent.map((child, index) => (
                <div
                  key={index}
                  role="tabpanel"
                  id={`tabpanel-${index}`}
                  aria-labelledby={`tab-${index}`}
                  className={currentTab === index ? 'block' : 'hidden'}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-veritron-gunmetal-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
            <p className="text-veritron-aluminum-300 mb-4">{description}</p>
            {content}
          </div>
        );
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="interactive-block-enhanced"
    >
      {renderInteractiveContent()}
    </motion.div>
  );
};

/**
 * Optimal Layer (Advanced Features)
 */
const OptimalLayer: React.FC<InteractiveBlockProps> = (props) => {
  const [webGLSupported, setWebGLSupported] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
  }, []);
  
  return (
    <div className="interactive-block-optimal relative">
      <EnhancedLayer {...props} />
      
      {/* Advanced visual effects */}
      {webGLSupported && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ mixBlendMode: 'overlay' }}
        />
      )}
    </div>
  );
};

/**
 * Edge Personalization Hook
 */
const useEdgePersonalization = (
  context?: PersonalizationContext,
  onLoad?: (context: PersonalizationContext) => void
) => {
  const [personalizedContext, setPersonalizedContext] = useState<PersonalizationContext | null>(null);
  const [isLoading, setIsLoading] = useState(!!context);

  useEffect(() => {
    if (context) {
      // Simulate edge-based personalization lookup
      const loadPersonalization = async () => {
        try {
          // This would typically be an edge function call
          // For now, we'll use localStorage as a fallback
          const cachedContext = localStorage.getItem('veritron_personalization');
          let mergedContext = context;
          
          if (cachedContext) {
            const parsed = JSON.parse(cachedContext);
            mergedContext = { ...context, ...parsed };
          }
          
          setPersonalizedContext(mergedContext);
          onLoad?.(mergedContext);
        } catch (error) {
          console.warn('Personalization load failed, using default context:', error);
          setPersonalizedContext(context);
        } finally {
          setIsLoading(false);
        }
      };

      loadPersonalization();
    }
  }, [context, onLoad]);

  return { personalizedContext, isLoading };
};

/**
 * Cache Strategy Hook for Edge Optimization
 */
const useCacheStrategy = (config?: EdgeCacheConfig) => {
  const [cacheHeaders, setCacheHeaders] = useState<Record<string, string>>({});

  useEffect(() => {
    if (config) {
      const headers: Record<string, string> = {};
      
      switch (config.strategy) {
        case 'static':
          headers['Cache-Control'] = `public, max-age=${config.ttl || 86400}, s-maxage=${config.ttl || 86400}`;
          break;
        case 'edge':
          headers['Cache-Control'] = `public, max-age=0, s-maxage=${config.ttl || 3600}`;
          if (config.varyBy?.length) {
            headers['Vary'] = config.varyBy.join(', ');
          }
          break;
        case 'dynamic':
          headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
          break;
      }
      
      setCacheHeaders(headers);
    }
  }, [config]);

  return cacheHeaders;
};

/**
 * Main Interactive Block Component with Progressive Enhancement
 */
const InteractiveBlock: React.FC<InteractiveBlockProps> = ({
  title,
  description,
  content,
  enhancementLevel = 'enhanced',
  interactionType = 'accordion',
  schemaType = 'Article',
  ariaLabel,
  lazyLoad = true,
  preloadContent = false,
  variant = 'default',
  className = '',
  personalizationContext,
  edgeCacheConfig,
  fallbackContent,
  experimentId,
  variant_id,
  onInteraction,
  onVisible,
  onPersonalizationLoad
}) => {
  const [jsEnabled, setJsEnabled] = useState(false);
  const [shouldRender, setShouldRender] = useState(!lazyLoad);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  
  // Edge personalization integration
  const { personalizedContext, isLoading: personalizationLoading } = useEdgePersonalization(
    personalizationContext,
    onPersonalizationLoad
  );
  
  // Cache strategy integration
  const cacheHeaders = useCacheStrategy(edgeCacheConfig);
  
  useEffect(() => {
    // Detect JavaScript availability
    setJsEnabled(true);
    
    // Handle lazy loading
    if (lazyLoad && isInView) {
      setShouldRender(true);
    }
  }, [lazyLoad, isInView]);
  
  // Preload content if requested
  useEffect(() => {
    if (preloadContent) {
      setShouldRender(true);
    }
  }, [preloadContent]);
  
  // Apply cache headers to document head for SSR
  useEffect(() => {
    if (Object.keys(cacheHeaders).length > 0) {
      // This would be handled by the SSR framework in production
      console.debug('Cache headers for InteractiveBlock:', cacheHeaders);
    }
  }, [cacheHeaders]);
  
  const variantClasses = {
    default: 'bg-veritron-gunmetal-900 border border-veritron-gunmetal-600',
    premium: 'bg-gradient-to-br from-veritron-gunmetal-800 to-veritron-gunmetal-900 border border-veritron-gold-500/20 shadow-xl',
    minimal: 'bg-transparent border-l-2 border-veritron-gold-500',
    card: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg'
  };

  // Personalization-aware content selection
  const getPersonalizedContent = () => {
    if (!personalizedContext) return content;
    
    // Example personalization logic based on user context
    if (personalizedContext.experienceLevel === 'beginner' && fallbackContent) {
      return fallbackContent;
    }
    
    return content;
  };

  // A/B testing variant support
  const getVariantClassName = () => {
    if (experimentId && variant_id) {
      return `${className} experiment-${experimentId} variant-${variant_id}`;
    }
    return className;
  };
  
  return (
    <div
      ref={containerRef}
      className={`interactive-block ${variantClasses[variant]} rounded-lg overflow-hidden transition-all duration-300 ${getVariantClassName()}`}
      data-enhancement-level={enhancementLevel}
      data-interaction-type={interactionType}
      data-personalization-segment={personalizedContext?.userSegment}
      data-cache-strategy={edgeCacheConfig?.strategy}
      data-experiment-id={experimentId}
      data-variant-id={variant_id}
    >
      {/* Noscript Fallback - Always rendered for SEO */}
      <noscript>
        <div className="p-6 bg-veritron-gunmetal-800 rounded-lg">
          <BaseStructure
            title={title}
            description={description}
            content={getPersonalizedContent()}
            schemaType={schemaType}
            ariaLabel={ariaLabel}
          />
          <div className="mt-4 p-3 bg-veritron-gold-500/10 border border-veritron-gold-500/20 rounded text-veritron-gold-200 text-sm">
            ⚡ Enable JavaScript for enhanced interactive features
          </div>
        </div>
      </noscript>

      {/* Personalization Loading State */}
      {personalizationLoading && (
        <div className="absolute inset-0 bg-veritron-gunmetal-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-veritron-gold-400 text-sm">Loading personalized experience...</div>
        </div>
      )}
      
      {/* Progressive Enhancement Layers */}
      {jsEnabled && shouldRender && (
        <Suspense fallback={
          <div className="p-6 animate-pulse">
            <div className="h-6 bg-veritron-gunmetal-600 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-veritron-gunmetal-700 rounded mb-2"></div>
            <div className="h-4 bg-veritron-gunmetal-700 rounded w-1/2"></div>
          </div>
        }>
          {(() => {
            switch (enhancementLevel) {
              case 'base':
                return (
                  <div className="p-6">
                    <BaseStructure
                      title={title}
                      description={description}
                      content={getPersonalizedContent()}
                      schemaType={schemaType}
                      ariaLabel={ariaLabel}
                    />
                  </div>
                );
              case 'optimal':
                return (
                  <OptimalLayer
                    title={title}
                    description={description}
                    content={getPersonalizedContent()}
                    interactionType={interactionType}
                    schemaType={schemaType}
                    ariaLabel={ariaLabel}
                    onInteraction={onInteraction}
                    onVisible={onVisible}
                  />
                );
              case 'enhanced':
              default:
                return (
                  <EnhancedLayer
                    title={title}
                    description={description}
                    content={getPersonalizedContent()}
                    interactionType={interactionType}
                    schemaType={schemaType}
                    ariaLabel={ariaLabel}
                    onInteraction={onInteraction}
                    onVisible={onVisible}
                  />
                );
            }
          })()
        }
        </Suspense>
      )}
      
      {/* Fallback for when JS is disabled but noscript isn't supported */}
      {!jsEnabled && (
        <div className="p-6">
          <BaseStructure
            title={title}
            description={description}
            content={getPersonalizedContent()}
            schemaType={schemaType}
            ariaLabel={ariaLabel}
          />
        </div>
      )}
    </div>
  );
};

// Example usage components for common patterns
export const AccordionBlock: React.FC<Omit<InteractiveBlockProps, 'interactionType'>> = (props) => (
  <InteractiveBlock {...props} interactionType="accordion" />
);

export const CarouselBlock: React.FC<Omit<InteractiveBlockProps, 'interactionType'>> = (props) => (
  <InteractiveBlock {...props} interactionType="carousel" />
);

export const TabsBlock: React.FC<Omit<InteractiveBlockProps, 'interactionType'>> = (props) => (
  <InteractiveBlock {...props} interactionType="tabs" />
);

export default InteractiveBlock;
export { BaseStructure, EnhancedLayer, OptimalLayer };