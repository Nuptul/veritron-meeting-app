/**
 * React Hook for Internationalization
 * Provides locale management, RTL detection, and hreflang generation
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  getLocales, 
  getDefaultLocale, 
  getLocaleConfig, 
  isRTLLocale,
  generateHrefLangTags,
  type LocaleConfig,
  type HrefLangConfig 
} from '../i18n/hreflang';

export interface UseI18nReturn {
  // Current locale state
  currentLocale: string;
  localeConfig: LocaleConfig | null;
  isRTL: boolean;
  
  // Available locales
  availableLocales: Record<string, LocaleConfig>;
  
  // Locale management
  setLocale: (locale: string) => void;
  isValidLocale: (locale: string) => boolean;
  
  // Hreflang generation
  generateHrefLang: (baseUrl: string, currentPath: string) => Array<{
    locale: string;
    href: string;
    rel: 'alternate';
    hreflang: string;
  }>;
  
  // Formatting utilities
  formatDate: (date: Date) => string;
  formatNumber: (number: number) => string;
  formatCurrency: (amount: number) => string;
}

export interface UseI18nOptions {
  defaultLocale?: string;
  storageKey?: string;
  urlPattern?: 'subdirectory' | 'subdomain' | 'parameter';
  autoDetect?: boolean;
}

/**
 * Hook for managing internationalization state and utilities
 */
export function useI18n(options: UseI18nOptions = {}): UseI18nReturn {
  const {
    defaultLocale = getDefaultLocale(),
    storageKey = 'veritron-locale',
    urlPattern = 'subdirectory',
    autoDetect = true
  } = options;

  // Get all available locales
  const availableLocales = useMemo(() => getLocales(), []);

  // Initialize locale state
  const [currentLocale, setCurrentLocale] = useState<string>(() => {
    // Try to get locale from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored && stored in availableLocales) {
        return stored;
      }
      
      // Auto-detect from browser if enabled
      if (autoDetect) {
        const browserLang = navigator.language || navigator.languages?.[0];
        if (browserLang) {
          // Try exact match first
          if (browserLang in availableLocales) {
            return browserLang;
          }
          
          // Try language-only match
          const langOnly = browserLang.split('-')[0];
          const langMatch = Object.keys(availableLocales).find(
            locale => locale.startsWith(langOnly + '-')
          );
          if (langMatch) {
            return langMatch;
          }
        }
      }
    }
    
    return defaultLocale;
  });

  // Get locale configuration
  const localeConfig = useMemo(() => 
    getLocaleConfig(currentLocale), 
    [currentLocale]
  );

  // Check if current locale is RTL
  const isRTL = useMemo(() => 
    isRTLLocale(currentLocale), 
    [currentLocale]
  );

  // Update document attributes when locale changes
  useEffect(() => {
    if (typeof document !== 'undefined' && localeConfig) {
      const html = document.documentElement;
      
      // Update lang attribute
      html.setAttribute('lang', localeConfig.language);
      
      // Update dir attribute
      html.setAttribute('dir', localeConfig.direction);
      
      // Update data-locale attribute
      html.setAttribute('data-locale', currentLocale);
      
      // Update meta tags
      updateMetaTags(localeConfig, currentLocale);
      
      // Store in localStorage
      localStorage.setItem(storageKey, currentLocale);
    }
  }, [currentLocale, localeConfig, storageKey]);

  // Set locale function with validation
  const setLocale = (locale: string) => {
    if (locale in availableLocales) {
      setCurrentLocale(locale);
    } else {
      console.warn(`Invalid locale: ${locale}. Available locales:`, Object.keys(availableLocales));
    }
  };

  // Validate locale function
  const isValidLocale = (locale: string) => locale in availableLocales;

  // Generate hreflang tags
  const generateHrefLang = (baseUrl: string, currentPath: string) => {
    const config: HrefLangConfig = {
      baseUrl,
      currentPath,
      currentLocale,
      urlPattern,
      includeXDefault: true
    };
    
    return generateHrefLangTags(config);
  };

  // Formatting utilities
  const formatDate = (date: Date): string => {
    if (!localeConfig) return date.toISOString().split('T')[0];
    
    try {
      return new Intl.DateTimeFormat(currentLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
    } catch (error) {
      console.warn('Date formatting failed, falling back to ISO format', error);
      return date.toISOString().split('T')[0];
    }
  };

  const formatNumber = (number: number): string => {
    if (!localeConfig) return number.toString();
    
    try {
      return new Intl.NumberFormat(currentLocale).format(number);
    } catch (error) {
      console.warn('Number formatting failed, falling back to toString', error);
      return number.toString();
    }
  };

  const formatCurrency = (amount: number): string => {
    if (!localeConfig) return amount.toString();
    
    try {
      return new Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: localeConfig.currency
      }).format(amount);
    } catch (error) {
      console.warn('Currency formatting failed, falling back to number', error);
      return formatNumber(amount);
    }
  };

  return {
    currentLocale,
    localeConfig,
    isRTL,
    availableLocales,
    setLocale,
    isValidLocale,
    generateHrefLang,
    formatDate,
    formatNumber,
    formatCurrency
  };
}

/**
 * Update meta tags for current locale
 */
function updateMetaTags(localeConfig: LocaleConfig, currentLocale: string) {
  if (typeof document === 'undefined') return;
  
  // Update content-language meta tag
  let contentLangMeta = document.querySelector('meta[name="content-language"]');
  if (!contentLangMeta) {
    contentLangMeta = document.createElement('meta');
    contentLangMeta.setAttribute('name', 'content-language');
    document.head.appendChild(contentLangMeta);
  }
  contentLangMeta.setAttribute('content', currentLocale);
  
  // Update language meta tag
  let languageMeta = document.querySelector('meta[name="language"]');
  if (!languageMeta) {
    languageMeta = document.createElement('meta');
    languageMeta.setAttribute('name', 'language');
    document.head.appendChild(languageMeta);
  }
  languageMeta.setAttribute('content', localeConfig.name);
  
  // Update text-direction meta tag
  let textDirMeta = document.querySelector('meta[name="text-direction"]');
  if (!textDirMeta) {
    textDirMeta = document.createElement('meta');
    textDirMeta.setAttribute('name', 'text-direction');
    document.head.appendChild(textDirMeta);
  }
  textDirMeta.setAttribute('content', localeConfig.direction);
  
  // Update title if needed (in a real implementation, this would come from translations)
  const currentTitle = document.title;
  if (currentTitle && !currentTitle.includes('|')) {
    document.title = `${currentTitle} | ${localeConfig.nativeName}`;
  }
}

/**
 * Higher-order component for internationalization
 */
export function withI18n<P extends object>(
  Component: React.ComponentType<P & { i18n: UseI18nReturn }>
) {
  return function WithI18nComponent(props: P) {
    const i18n = useI18n();
    
    return <Component {...props} i18n={i18n} />;
  };
}

/**
 * React Context for internationalization (optional advanced usage)
 */
export const I18nContext = React.createContext<UseI18nReturn | null>(null);

export function I18nProvider({ 
  children, 
  options = {} 
}: { 
  children: React.ReactNode;
  options?: UseI18nOptions;
}) {
  const i18n = useI18n(options);
  
  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext(): UseI18nReturn {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider');
  }
  return context;
}