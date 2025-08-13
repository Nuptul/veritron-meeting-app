import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items,
  showHome = true,
  className = ''
}) => {
  const location = useLocation();

  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        path: '/',
        isActive: location.pathname === '/'
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;
      
      // Capitalize and format the label
      let label = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      
      // Handle specific path formatting
      if (pathname === 'ai-machine-learning') {
        label = 'AI & Machine Learning';
      } else if (pathname === 'custom-software-development') {
        label = 'Custom Software Development';
      } else if (pathname === 'ui-ux-design') {
        label = 'UI/UX Design';
      } else if (pathname === 'cloud-infrastructure') {
        label = 'Cloud Infrastructure';
      } else if (pathname === 'api-development') {
        label = 'API Development';
      } else if (pathname === 'data-management') {
        label = 'Data Management';
      } else if (pathname === 'cybersecurity-consulting') {
        label = 'Cybersecurity Consulting';
      } else if (pathname === 'digital-marketing') {
        label = 'Digital Marketing';
      } else if (pathname === 'business-consulting') {
        label = 'Business Consulting';
      }
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <motion.div
          key={item.path}
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          )}
          
          {item.isActive ? (
            <span className="text-amber-400 font-medium flex items-center">
              {index === 0 && showHome && (
                <HomeIcon className="w-4 h-4 mr-1" />
              )}
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.path}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
            >
              {index === 0 && showHome && (
                <HomeIcon className="w-4 h-4 mr-1 group-hover:text-amber-400 transition-colors" />
              )}
              <span className="group-hover:text-white">{item.label}</span>
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  );
};

export default Breadcrumb;