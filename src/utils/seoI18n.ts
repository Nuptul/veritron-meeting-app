/**
 * SEO Internationalization Utilities
 * Google-compliant hreflang implementation for React applications
 */

import { generateHrefLangJSX, generateHrefLangHTML, type HrefLangConfig } from '../i18n/hreflang';

export interface SEOHelmetProps {
  title: string;
  description: string;
  locale: string;
  baseUrl: string;
  currentPath: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

/**
 * Generates comprehensive SEO meta tags for React Helmet
 */
export function generateSEOTags({
  title,
  description,
  locale,
  baseUrl,
  currentPath,
  canonical,
  ogImage,
  structuredData
}: SEOHelmetProps) {
  const hrefLangConfig: HrefLangConfig = {
    baseUrl,
    currentPath,
    currentLocale: locale,
    urlPattern: 'subdirectory',
    includeXDefault: true
  };

  const canonicalUrl = canonical || `${baseUrl}${currentPath}`;
  const fullTitle = `${title} | Veritron AI Agency`;
  
  return {
    // Basic meta tags
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { httpEquiv: 'content-language', content: locale },
      { name: 'language', content: locale },
      
      // Open Graph tags
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: locale },
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      ...(ogImage ? [{ name: 'twitter:image', content: ogImage }] : []),
      
      // Additional SEO tags
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' }
    ],
    
    // Link tags
    link: [
      { rel: 'canonical', href: canonicalUrl },
      ...generateHrefLangJSX(hrefLangConfig).map(element => ({
        rel: element.props.rel,
        hrefLang: element.props.hrefLang,
        href: element.props.href
      }))
    ],
    
    // Structured data
    ...(structuredData && {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData)
        }
      ]
    })
  };
}

/**
 * Generates HTML string for server-side rendering
 */
export function generateSEOHTML({
  title,
  description,
  locale,
  baseUrl,
  currentPath,
  canonical,
  ogImage
}: SEOHelmetProps): string {
  const hrefLangConfig: HrefLangConfig = {
    baseUrl,
    currentPath,
    currentLocale: locale,
    urlPattern: 'subdirectory',
    includeXDefault: true
  };

  const canonicalUrl = canonical || `${baseUrl}${currentPath}`;
  const fullTitle = `${title} | Veritron AI Agency`;
  
  const hrefLangHTML = generateHrefLangHTML(hrefLangConfig);
  
  return `
    <!-- SEO Meta Tags -->
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />
    <meta http-equiv="content-language" content="${locale}" />
    <meta name="language" content="${locale}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:locale" content="${locale}" />
    ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />
    ${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ''}
    
    <!-- Canonical -->
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Hreflang Tags -->
    ${hrefLangHTML}
    
    <!-- SEO Instructions -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
  `.trim();
}

/**
 * Generates sitemap.xml content for all locales
 */
export function generateSitemapXML(
  baseUrl: string,
  routes: string[],
  options: {
    priority?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastmod?: string;
  } = {}
): string {
  const { priority = '0.8', changefreq = 'weekly', lastmod = new Date().toISOString() } = options;
  
  // Import here to avoid circular dependencies
  const { generateSitemapEntries } = require('../i18n/hreflang');
  
  const entries = generateSitemapEntries(baseUrl, routes, 'subdirectory');
  
  const urlsXML = entries.map(entry => {
    const alternatesXML = entry.alternates.map(alt => 
      `      <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
    ).join('\n');
    
    return `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternatesXML}
  </url>`.trim();
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXML}
</urlset>`;
}

/**
 * Generates robots.txt content with sitemap references
 */
export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml

# Rate limiting
Crawl-delay: 1

# Specific bot instructions
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Block specific paths
Disallow: /private/
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*debug*
`;
}

/**
 * Validates hreflang implementation for SEO compliance
 */
export function validateSEOImplementation(
  baseUrl: string,
  currentPath: string,
  currentLocale: string
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Validate base URL
  try {
    new URL(baseUrl);
  } catch (e) {
    errors.push('Invalid base URL format');
  }
  
  // Check HTTPS
  if (!baseUrl.startsWith('https://')) {
    warnings.push('Base URL should use HTTPS for better SEO');
  }
  
  // Validate path
  if (!currentPath.startsWith('/')) {
    errors.push('Current path must start with /');
  }
  
  // Check for trailing slashes consistency
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    warnings.push('Consider consistent trailing slash handling');
  }
  
  // Import validation function
  const { validateHrefLangImplementation } = require('../i18n/hreflang');
  
  const hrefLangValidation = validateHrefLangImplementation({
    baseUrl,
    currentPath,
    currentLocale,
    urlPattern: 'subdirectory',
    includeXDefault: true
  });
  
  errors.push(...hrefLangValidation.errors);
  warnings.push(...hrefLangValidation.warnings);
  
  // SEO recommendations
  recommendations.push(
    'Ensure all pages have unique, descriptive titles',
    'Add meta descriptions to all pages',
    'Implement proper internal linking structure',
    'Use structured data for rich snippets',
    'Optimize images with alt attributes',
    'Ensure mobile-responsive design',
    'Implement proper heading hierarchy (H1-H6)',
    'Add Open Graph and Twitter Card meta tags'
  );
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}

/**
 * Generates structured data for organization
 */
export function generateOrganizationStructuredData(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Veritron AI Agency",
    "alternateName": locale === 'ar-SA' ? "وكالة فيريترون للذكاء الاصطناعي" : "Veritron",
    "url": "https://veritron.com",
    "logo": "https://veritron.com/logo.svg",
    "description": locale === 'ar-SA' 
      ? "وكالة متخصصة في حلول الذكاء الاصطناعي والتقنيات المتقدمة"
      : "Premium AI Solutions and WebGPU-Accelerated Experiences",
    "sameAs": [
      "https://twitter.com/veritron",
      "https://linkedin.com/company/veritron",
      "https://github.com/veritron"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic", "Spanish", "French", "German", "Japanese"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "San Francisco",
      "addressRegion": "CA"
    },
    "inLanguage": locale
  };
}

/**
 * Performance monitoring for international SEO
 */
export function trackSEOPerformance(
  locale: string,
  path: string,
  metrics: {
    loadTime?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
  }
) {
  // In a real implementation, this would send data to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      content_group1: locale,
      content_group2: path,
      custom_map: {
        dimension1: locale,
        dimension2: path
      },
      ...metrics
    });
  }
  
  // Console log for development
  console.log('SEO Performance Metrics:', {
    locale,
    path,
    ...metrics,
    timestamp: new Date().toISOString()
  });
}

// Type definitions for global gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}