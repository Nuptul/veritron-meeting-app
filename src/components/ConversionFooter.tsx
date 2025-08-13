import React from 'react';
import { motion } from 'framer-motion';

const ConversionFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-yellow-400">VERITRON</span> AI Agency
            </motion.h3>
            <motion.p 
              className="text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Transforming businesses through cutting-edge AI solutions and enterprise-grade technology.
            </motion.p>
          </div>

          {/* Company Info */}
          <div className="text-center">
            <motion.h4
              className="text-lg font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              VERITRON AI Agency
            </motion.h4>
            <motion.div
              className="space-y-2 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>Enterprise-Grade Digital Solutions</p>
              <p>Australian Innovation • Global Impact</p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <motion.h4 
              className="text-lg font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h4>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <a href="#services" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Services
                </a>
              </div>
              <div>
                <a href="#about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  About
                </a>
              </div>
              <div>
                <a href="#contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 VERITRON AI Agency. All rights reserved. | 25+ Years of Excellence | Australian-Owned
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default ConversionFooter;