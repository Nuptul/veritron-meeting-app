import React from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import Services from '../Services';

// Create a Convex client for demo purposes
const convex = new ConvexReactClient(process.env.VITE_CONVEX_URL || 'https://amazing-ant-123.convex.cloud');

const ServicesDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-veritron-gunmetal-950">
      <ConvexProvider client={convex}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-veritron-gunmetal-900 dark:text-white mb-4">
              Services Component Demo
            </h1>
            <p className="text-veritron-gunmetal-600 dark:text-veritron-aluminum-400 max-w-2xl mx-auto">
              This demo showcases the Services component with animated icons, hover effects,
              and Convex integration. The component features AI/ML, Digital Media Design,
              and Software Development services.
            </p>
          </div>
          
          <Services />
          
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-veritron-gunmetal-800 rounded-lg p-6 shadow-veritron">
              <h3 className="text-lg font-semibold text-veritron-gunmetal-900 dark:text-white mb-4">
                Component Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400">
                <div className="space-y-2">
                  <h4 className="font-medium text-veritron-gold-600">Animations</h4>
                  <ul className="space-y-1">
                    <li>• Custom SVG icon animations</li>
                    <li>• Framer Motion transitions</li>
                    <li>• Hover effects & interactions</li>
                    <li>• Stagger animations</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-veritron-gold-600">Design</h4>
                  <ul className="space-y-1">
                    <li>• Veritron design system</li>
                    <li>• Responsive grid layout</li>
                    <li>• Dark/light mode support</li>
                    <li>• Tailwind CSS styling</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-veritron-gold-600">Integration</h4>
                  <ul className="space-y-1">
                    <li>• Convex real-time data</li>
                    <li>• Dynamic service loading</li>
                    <li>• Feature expandability</li>
                    <li>• Loading states</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConvexProvider>
    </div>
  );
};

export default ServicesDemo;