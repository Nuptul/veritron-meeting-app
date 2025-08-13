import React from 'react';
import { motion } from 'framer-motion';

const TrustBar: React.FC = () => {
  const clients = [
    { name: 'HP', logo: 'HP' },
    { name: 'Dell', logo: 'DELL' },
    { name: 'Philips', logo: 'PHILIPS' },
    { name: 'Corona', logo: 'CORONA' },
    { name: 'Philips Australia', logo: 'PHILIPS\nAUSTRALIA' },
  ];

  return (
    <section className="py-16 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg font-medium">
            Trusted by Industry Leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-300 tracking-wider whitespace-pre-line">
                  {client.logo}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;