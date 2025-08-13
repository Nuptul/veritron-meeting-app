import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import { services } from '../data/services';
import { 
  AIMLIcon, 
  UIUXIcon, 
  DevelopmentIcon, 
  CloudIcon, 
  APIIcon, 
  DatabaseIcon
} from '../components/atoms/ServiceIcons';
import { CometCard } from '../components/ui/CometCard';
import PremiumButton from '../components/atoms/PremiumButton';

const ServicesPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient-metallic">Services</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Comprehensive technology solutions designed to accelerate your business growth 
            and digital transformation journey.
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.category);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <CometCard className="p-8 h-full hover:scale-105 transition-transform duration-300 group">
                    <div className="text-center space-y-6">
                      {/* Service Icon */}
                      <div className="mb-6">
                        <IconComponent size={80} className="mx-auto" isHovered={false} />
                      </div>

                      {/* Service Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Service Description */}
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>

                      {/* Key Features */}
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-center text-xs text-gray-500">
                            <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                            {feature.name}
                          </div>
                        ))}
                      </div>

                      {/* Pricing Info */}
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Starting at</span>
                          <span className="text-amber-400 font-semibold">{service.minBudget}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                          <span className="text-gray-500">Timeline</span>
                          <span className="text-gray-300">{service.estimatedTimeline}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-1">
                        {service.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <div className="text-amber-400 group-hover:text-amber-300 transition-colors text-sm font-medium">
                          Learn More →
                        </div>
                      </div>
                    </div>
                  </CometCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We offer custom solutions tailored to your specific needs. Let's discuss 
              how we can help solve your unique business challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <PremiumButton variant="gold" size="large">
                  Custom Solution
                </PremiumButton>
              </Link>
              <PremiumButton variant="aluminum" size="large">
                Schedule Consultation
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;