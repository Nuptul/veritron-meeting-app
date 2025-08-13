import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import PremiumButton from './atoms/PremiumButton';
import { 
  AIMLIcon, 
  UIUXIcon, 
  DevelopmentIcon, 
  CloudIcon
} from './atoms/ServiceIcons';

const ServicesPreview: React.FC = () => {
  const topServices = [
    {
      icon: AIMLIcon,
      title: "AI & Machine Learning",
      description: "Transform your business with intelligent automation, predictive analytics, and custom AI solutions.",
      features: ["Deep Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"]
    },
    {
      icon: DevelopmentIcon,
      title: "Custom Software Development",
      description: "Scalable, enterprise-grade applications built with cutting-edge technologies and best practices.",
      features: ["Full-Stack Development", "Mobile Applications", "System Integration", "Performance Optimization"]
    },
    {
      icon: UIUXIcon,
      title: "UI/UX Design & Digital Media",
      description: "Award-winning designs that captivate users and drive engagement across all digital platforms.",
      features: ["User Experience Design", "Brand Identity", "Responsive Design", "Design Systems"]
    },
    {
      icon: CloudIcon,
      title: "Cloud Infrastructure & DevOps",
      description: "Robust, scalable cloud solutions with automated deployment and monitoring for maximum reliability.",
      features: ["AWS/Azure/GCP", "Kubernetes Orchestration", "CI/CD Pipelines", "Auto-scaling Solutions"]
    }
  ];

  const scrollToFullServices = () => {
    // This would navigate to the full services page
    console.log('Navigate to full services page');
  };

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Core Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI and technology solutions designed to accelerate your digital transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {topServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-400/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
                      <IconComponent 
                        size={32}
                        className="text-yellow-400"
                        isHovered={false}
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <motion.div
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <div className="flex items-center text-yellow-400 text-sm font-medium">
                    Learn More
                    <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <PremiumButton
            variant="gold"
            size="large"
            onClick={scrollToFullServices}
            className="px-12 py-4 text-lg font-semibold group"
          >
            View All Services
            <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;