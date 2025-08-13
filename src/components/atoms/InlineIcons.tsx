import React from 'react';

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function useGoldGradient() {
  const id = React.useId().replace(/:/g, '');
  const gradientId = `vtGold_${id}`;
  return gradientId;
}

export const PremiumSearchIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="11" r="7" stroke={`url(#${gid})`} strokeWidth={strokeWidth} />
      <line x1="16.65" y1="16.65" x2="21" y2="21" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};

export const PremiumBellIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.73 21a2.5 2.5 0 004.54 0" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};

export const PremiumMenuIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <line x1="3" y1="6" x2="21" y2="6" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};

export const PremiumChatIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M21 12c0 4-3.6 7-8 7-1.1 0-2.2-.18-3.2-.53L3 20l1.6-3.8A7.2 7.2 0 013 12c0-4 3.6-7 8-7s8 3 8 7z" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="9" cy="12" r="1" fill="#d4af37" />
      <circle cx="12" cy="12" r="1" fill="#d4af37" />
      <circle cx="15" cy="12" r="1" fill="#d4af37" />
    </svg>
  );
};

export const PremiumSupportIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M7 12a5 5 0 0110 0v4a3 3 0 01-3 3h-2" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12v2a2 2 0 01-2 2H4a1 1 0 01-1-1v-2a7 7 0 0114 0" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="19" r="1.5" stroke={`url(#${gid})`} strokeWidth={strokeWidth} />
    </svg>
  );
};

export const PremiumCommunicationIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M3 5h14v10H7l-4 4V5z" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M19 8c1.7 1.2 2.8 3 2.8 5s-1.1 3.8-2.8 5" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M17.2 10.2c.9.6 1.5 1.6 1.5 2.8s-.6 2.2-1.5 2.8" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};

export const PremiumCloudIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M19 17a4 4 0 00-1.2-7.8 6 6 0 00-11.7 1.6A4 4 0 006 17h13z" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const PremiumApiIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <path d="M4 12h4M16 12h4M9 6l6 12" stroke={`url(#${gid})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const PremiumDatabaseIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8 }) => {
  const gid = useGoldGradient();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f4e99c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a9ba8" />
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke={`url(#${gid})`} strokeWidth={strokeWidth} />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke={`url(#${gid})`} strokeWidth={strokeWidth} />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke={`url(#${gid})`} strokeWidth={strokeWidth} />
    </svg>
  );
};


