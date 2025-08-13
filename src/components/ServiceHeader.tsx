import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Palette, 
  Code, 
  Database, 
  Cog, 
  Target, 
  Sparkles, 
  Users, 
  Lightbulb 
} from 'lucide-react';

// Service navigation items
const serviceNavItems = [
  {
    id: 'ai-automations',
    label: 'AI Automations',
    href: '/services/ai-automations',
    icon: Bot,
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'media-assets',
    label: 'Media Assets',
    href: '/services/media-assets',
    icon: Palette,
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 'fullstack-development',
    label: 'Full-Stack Dev',
    href: '/services/fullstack-development',
    icon: Code,
    color: 'from-green-600 to-green-700'
  },
  {
    id: 'legacy-integration',
    label: 'Legacy Integration',
    href: '/services/legacy-integration',
    icon: Database,
    color: 'from-orange-600 to-orange-700'
  },
  {
    id: 'mcp-tools',
    label: 'MCP Tools',
    href: '/services/mcp-tools',
    icon: Cog,
    color: 'from-cyan-600 to-cyan-700'
  },
  {
    id: 'autonomous-agents',
    label: 'Agent Systems',
    href: '/services/autonomous-agents',
    icon: Target,
    color: 'from-red-600 to-red-700'
  },
  {
    id: 'workflow-automation',
    label: 'Automation',
    href: '/services/workflow-automation',
    icon: Sparkles,
    color: 'from-pink-600 to-pink-700'
  },
  {
    id: 'team-training',
    label: 'Training',
    href: '/services/team-training',
    icon: Users,
    color: 'from-indigo-600 to-indigo-700'
  },
  {
    id: 'ai-advisory',
    label: 'AI Advisory',
    href: '/services/ai-advisory',
    icon: Lightbulb,
    color: 'from-yellow-600 to-yellow-700'
  }
];

const ServiceHeader: React.FC = () => {
  const location = useLocation();
  
  // Check if current path matches service
  const isActiveService = (href: string) => {
    return location.pathname === href;
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-black via-amber-950/10 to-black border-b border-amber-600/20 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        {/* Services Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {serviceNavItems.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = isActiveService(service.href);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link
                  to={service.href}
                  className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-600/50'
                      : 'text-amber-100/70 hover:text-amber-300 hover:bg-amber-900/20'
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-amber-400' : 'text-amber-500/60 group-hover:text-amber-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-full h-full" />
                  </motion.div>

                  {/* Label */}
                  <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                    {service.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-amber-400 rounded-full"
                      layoutId="activeServiceIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{ x: '-50%' }}
                    />
                  )}

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceHeader;