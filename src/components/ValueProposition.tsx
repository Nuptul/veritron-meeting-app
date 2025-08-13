import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const ValueProposition: React.FC = () => {
  const values = [
    {
      icon: AcademicCapIcon,
      title: "25+ Years",
      subtitle: "Industry Experience",
      description: "Decades of proven expertise in delivering enterprise solutions"
    },
    {
      icon: GlobeAltIcon,
      title: "Australian-Owned",
      subtitle: "Local Excellence",
      description: "Proudly Australian, serving global markets with local understanding"
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise-Grade",
      subtitle: "Security & Reliability",
      description: "Bank-level security and 99.9% uptime guarantee"
    },
    {
      icon: SparklesIcon,
      title: "AI Specialists",
      subtitle: "Cutting-Edge Innovation",
      description: "Leading-edge AI and automation solutions for modern business"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="veritron-display text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Why Choose{' '}
            <span className="text-gradient-metallic animate-gradient-text">Veriton</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another AI company. We're your trusted partners in digital transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-400/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <IconComponent className="w-10 h-10 text-yellow-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                
                <p className="text-yellow-400 font-semibold mb-3">
                  {value.subtitle}
                </p>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;