/**
 * Hreflang Tag Generation System
 * Generates SEO-compliant hreflang tags for international sites
 * Follows Google's hreflang implementation guidelines
 */

import localesConfig from './locales.json';

export interface LocaleConfig {
  code: string;
  language: string;
  country: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
  region: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: {
    decimal: string;
    thousand: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontWeights?: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface HrefLangTag {
  locale: string;
  href: string;
  rel: 'alternate';
  hreflang: string;
}

export interface HrefLangConfig {
  baseUrl: string;
  currentPath: string;
  currentLocale: string;
  urlPattern: 'subdirectory' | 'subdomain' | 'parameter';
  includeXDefault?: boolean;
}

/**
 * Gets all available locales from configuration
 */
export function getLocales(): Record<string, LocaleConfig> {
  return localesConfig.locales as Record<string, LocaleConfig>;
}

/**
 * Gets default locale
 */
export function getDefaultLocale(): string {
  return localesConfig.fallback;
}

/**
 * Gets RTL locales list
 */
export function getRTLLocales(): string[] {
  return localesConfig.rtlLocales;
}

/**
 * Checks if a locale is RTL
 */
export function isRTLLocale(locale: string): boolean {
  return getRTLLocales().includes(locale);
}

/**
 * Gets locale configuration for a specific locale
 */
export function getLocaleConfig(locale: string): LocaleConfig | null {
  const locales = getLocales();
  return locales[locale] || null;
}

/**
 * Validates if a locale code is supported
 */
export function isValidLocale(locale: string): boolean {
  return locale in getLocales();
}

/**
 * Generates URL for a specific locale and path
 */
export function generateLocaleUrl(
  baseUrl: string,
  locale: string,
  path: string,
  pattern: 'subdirectory' | 'subdomain' | 'parameter' = 'subdirectory'
): string {
  // Ensure baseUrl doesn't end with slash
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  // Ensure path starts with slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  const defaultLocale = getDefaultLocale();
  
  switch (pattern) {
    case 'subdirectory':
      // Don't include locale in URL for default locale
      if (locale === defaultLocale) {
        return `${cleanBaseUrl}${cleanPath}`;
      }
      return `${cleanBaseUrl}/${locale}${cleanPath}`;
    
    case 'subdomain':
      if (locale === defaultLocale) {
        return `${cleanBaseUrl}${cleanPath}`;
      }
      // Extract domain from baseUrl
      const urlParts = cleanBaseUrl.split('://');
      const protocol = urlParts[0];
      const domain = urlParts[1];
      return `${protocol}://${locale}.${domain}${cleanPath}`;
    
    case 'parameter':
      const separator = cleanPath.includes('?') ? '&' : '?';
      if (locale === defaultLocale) {
        return `${cleanBaseUrl}${cleanPath}`;
      }
      return `${cleanBaseUrl}${cleanPath}${separator}lang=${locale}`;
    
    default:
      return `${cleanBaseUrl}${cleanPath}`;
  }
}

/**
 * Generates hreflang tags for all locales
 */
export function generateHrefLangTags(config: HrefLangConfig): HrefLangTag[] {
  const {
    baseUrl,
    currentPath,
    currentLocale,
    urlPattern,
    includeXDefault = true
  } = config;
  
  const locales = getLocales();
  const tags: HrefLangTag[] = [];
  
  // Generate hreflang tags for all locales
  Object.keys(locales).forEach(localeCode => {
    // Skip current locale - it will be handled by canonical tag
    if (localeCode === currentLocale) return;
    
    const href = generateLocaleUrl(baseUrl, localeCode, currentPath, urlPattern);
    
    tags.push({
      locale: localeCode,
      href,
      rel: 'alternate',
      hreflang: localeCode.toLowerCase()
    });
  });
  
  // Add x-default for default locale if enabled
  if (includeXDefault) {
    const defaultLocale = getDefaultLocale();
    const defaultHref = generateLocaleUrl(baseUrl, defaultLocale, currentPath, urlPattern);
    
    tags.push({
      locale: 'x-default',
      href: defaultHref,
      rel: 'alternate',
      hreflang: 'x-default'
    });
  }
  
  // Sort tags by hreflang for consistency
  return tags.sort((a, b) => {
    if (a.hreflang === 'x-default') return 1;
    if (b.hreflang === 'x-default') return -1;
    return a.hreflang.localeCompare(b.hreflang);
  });
}

/**
 * Generates HTML string for hreflang tags
 */
export function generateHrefLangHTML(config: HrefLangConfig): string {
  const tags = generateHrefLangTags(config);
  
  return tags
    .map(tag => `<link rel="${tag.rel}" hreflang="${tag.hreflang}" href="${tag.href}" />`)
    .join('\n');
}

/**
 * Generates React JSX elements for hreflang tags
 */
export function generateHrefLangJSX(config: HrefLangConfig): JSX.Element[] {
  const tags = generateHrefLangTags(config);
  
  return tags.map(tag => (
    <link
      key={tag.hreflang}
      rel={tag.rel}
      hrefLang={tag.hreflang}
      href={tag.href}
    />
  ));
}

/**
 * Validates hreflang implementation
 */
export function validateHrefLangImplementation(config: HrefLangConfig): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate base URL
  try {
    new URL(config.baseUrl);
  } catch (e) {
    errors.push('Invalid base URL provided');
  }
  
  // Validate current locale
  if (!isValidLocale(config.currentLocale)) {
    errors.push(`Invalid current locale: ${config.currentLocale}`);
  }
  
  // Validate current path
  if (!config.currentPath.startsWith('/')) {
    warnings.push('Current path should start with /');
  }
  
  // Check for self-referencing hreflang
  const tags = generateHrefLangTags(config);
  const currentUrl = generateLocaleUrl(
    config.baseUrl,
    config.currentLocale,
    config.currentPath,
    config.urlPattern
  );
  
  const selfReferencing = tags.find(tag => tag.href === currentUrl);
  if (selfReferencing) {
    warnings.push('Found self-referencing hreflang tag - ensure canonical tag is present');
  }
  
  // Check bidirectionality
  const locales = Object.keys(getLocales());
  if (tags.length !== locales.length - 1 + (config.includeXDefault ? 1 : 0)) {
    warnings.push('Not all locales have corresponding hreflang tags');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Gets locale from URL based on pattern
 */
export function getLocaleFromUrl(
  url: string,
  pattern: 'subdirectory' | 'subdomain' | 'parameter' = 'subdirectory'
): string | null {
  try {
    const parsedUrl = new URL(url);
    const locales = Object.keys(getLocales());
    
    switch (pattern) {
      case 'subdirectory':
        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        const potentialLocale = pathParts[0];
        return locales.includes(potentialLocale) ? potentialLocale : null;
      
      case 'subdomain':
        const subdomain = parsedUrl.hostname.split('.')[0];
        return locales.includes(subdomain) ? subdomain : null;
      
      case 'parameter':
        const langParam = parsedUrl.searchParams.get('lang');
        return langParam && locales.includes(langParam) ? langParam : null;
      
      default:
        return null;
    }
  } catch (e) {
    return null;
  }
}

/**
 * Generates sitemap entries with locale alternates
 */
export function generateSitemapEntries(
  baseUrl: string,
  paths: string[],
  urlPattern: 'subdirectory' | 'subdomain' | 'parameter' = 'subdirectory'
): Array<{
  url: string;
  alternates: Array<{
    hreflang: string;
    href: string;
  }>;
}> {
  const locales = Object.keys(getLocales());
  
  return paths.map(path => {
    const entries = locales.map(locale => {
      const href = generateLocaleUrl(baseUrl, locale, path, urlPattern);
      return {
        hreflang: locale.toLowerCase(),
        href
      };
    });
    
    // Add x-default
    const defaultLocale = getDefaultLocale();
    const defaultHref = generateLocaleUrl(baseUrl, defaultLocale, path, urlPattern);
    entries.push({
      hreflang: 'x-default',
      href: defaultHref
    });
    
    return {
      url: generateLocaleUrl(baseUrl, getDefaultLocale(), path, urlPattern),
      alternates: entries
    };
  });
}

// Export configuration for external access
export const hrefLangConfig = localesConfig;

// Type exports
export type { LocaleConfig, HrefLangTag, HrefLangConfig };