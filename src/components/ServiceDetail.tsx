import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { getServiceBySlug, getRelatedServices, Service } from '../data/services';
import { 
  AIMLIcon, 
  UIUXIcon, 
  DevelopmentIcon, 
  CloudIcon, 
  APIIcon, 
  DatabaseIcon
} from './atoms/ServiceIcons';
import PremiumButton from './atoms/PremiumButton';
import { CometCard } from './ui/CometCard';
import Breadcrumb from './Breadcrumb';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'case-studies' | 'pricing'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundService = getServiceBySlug(slug);
      if (foundService) {
        setService(foundService);
        setRelatedServices(getRelatedServices(foundService.id));
      }
      setLoading(false);
    }
  }, [slug]);

  const getServiceIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'ai-ml': AIMLIcon,
      'design': UIUXIcon,
      'development': DevelopmentIcon,
      'cloud': CloudIcon,
      'api': APIIcon,
      'database': DatabaseIcon,
    };
    return iconMap[category] || DevelopmentIcon;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services">
            <PremiumButton variant="gold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Services
            </PremiumButton>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getServiceIcon(service.category);

  const tabContent = {
    overview: (
      <div className="space-y-12">
        {/* Service Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            {service.fullDescription}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-amber-500/50 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <CheckCircleIcon className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.name}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Key Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <CometCard key={index} className="p-6 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChartBarIcon className="w-8 h-8 text-amber-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </CometCard>
            ))}
          </div>
        </motion.div>
      </div>
    ),
    process: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Our Process</h3>
        <div className="space-y-6">
          {service.process.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-6 bg-gray-900/30 border border-gray-700 rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-white">{step.title}</h4>
                  <span className="flex items-center text-amber-400 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    'case-studies': (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Case Studies</h3>
        {service.caseStudies.length > 0 ? (
          <div className="space-y-8">
            {service.caseStudies.map((caseStudy, index) => (
              <CometCard key={index} className="p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-500 pl-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{caseStudy.title}</h4>
                    <p className="text-amber-400 font-medium">{caseStudy.client}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Challenge</h5>
                      <p className="text-gray-400">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Solution</h5>
                      <p className="text-gray-400">{caseStudy.solution}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">Results</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      {caseStudy.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <StarIcon className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">{result}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CometCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Case studies coming soon. Contact us to learn about our success stories.</p>
          </div>
        )}
      </motion.div>
    ),
    pricing: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Pricing Options</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {service.pricing.map((tier, index) => (
            <CometCard key={index} className={`p-6 relative ${tier.recommended ? 'ring-2 ring-amber-500' : ''}`}>
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}
              <div className="text-center space-y-4">
                <h4 className="text-xl font-bold text-white">{tier.name}</h4>
                <div className="text-3xl font-bold text-amber-500">{tier.price}</div>
                <p className="text-gray-400">{tier.description}</p>
                <div className="space-y-3 pt-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <PremiumButton 
                    variant={tier.recommended ? "gold" : "aluminum"} 
                    className="w-full"
                  >
                    Get Started
                  </PremiumButton>
                </div>
              </div>
            </CometCard>
          ))}
        </div>
        
        <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-6 mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <ClockIcon className="w-8 h-8 text-amber-500" />
              <div>
                <h4 className="text-white font-semibold">Estimated Timeline</h4>
                <p className="text-gray-400">{service.estimatedTimeline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencyDollarIcon className="w-8 h-8 text-amber-500" />
              <div>
                <h4 className="text-white font-semibold">Starting Budget</h4>
                <p className="text-gray-400">{service.minBudget}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
            Services
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-amber-400">{service.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <IconComponent size={120} className="mx-auto mb-6" isHovered={false} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {service.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center border-b border-gray-700">
          {([
            { key: 'overview', label: 'Overview' },
            { key: 'process', label: 'Process' },
            { key: 'case-studies', label: 'Case Studies' },
            { key: 'pricing', label: 'Pricing' }
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-medium transition-colors duration-300 border-b-2 ${
                activeTab === tab.key
                  ? 'text-amber-400 border-amber-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black border-t border-gray-700 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with {service.title.toLowerCase()}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton variant="gold" size="large">
                Schedule Consultation
              </PremiumButton>
              <Link to="/contact">
                <PremiumButton variant="aluminum" size="large">
                  Contact Us
                </PremiumButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService, index) => {
                const RelatedIcon = getServiceIcon(relatedService.category);
                return (
                  <motion.div
                    key={relatedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/services/${relatedService.slug}`}>
                      <CometCard className="p-6 h-full hover:scale-105 transition-transform duration-300 group">
                        <div className="text-center">
                          <RelatedIcon size={64} className="mx-auto mb-4" isHovered={false} />
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                            {relatedService.title}
                          </h3>
                          <p className="text-gray-400 mb-4">{relatedService.shortDescription}</p>
                          <div className="flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors">
                            <span className="mr-2">Learn More</span>
                            <ArrowRightIcon className="w-4 h-4" />
                          </div>
                        </div>
                      </CometCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;