/**
 * Schema.org JSON-LD Utilities for Veritron AI Agency
 * 
 * This module provides type-safe utilities for generating Schema.org structured data
 * in JSON-LD format. All schemas are validated for Google Rich Results compliance.
 * 
 * @author Veritron Schema Team
 * @version 1.0.0
 */

// Base interfaces for common Schema.org types
export interface BaseSchema {
  '@context'?: string;
  '@type': string;
  '@id'?: string;
}

export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string | ImageObject;
  jobTitle?: string;
  email?: string;
  telephone?: string;
  worksFor?: OrganizationSchema;
  sameAs?: string[];
}

export interface ImageObject extends BaseSchema {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  contentUrl?: string;
}

export interface ContactPoint extends BaseSchema {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
  availableLanguage?: string | string[];
  areaServed?: string | string[];
}

export interface PostalAddress extends BaseSchema {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string | ImageObject;
  description?: string;
  sameAs?: string[];
  contactPoint?: ContactPoint[];
  address?: PostalAddress;
  foundingDate?: string;
  numberOfEmployees?: string;
  industry?: string;
  legalName?: string;
  taxID?: string;
  vatID?: string;
  duns?: string;
}

export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness';
  name: string;
  url: string;
  logo: string | ImageObject;
  description?: string;
  sameAs?: string[];
  contactPoint?: ContactPoint[];
  address: PostalAddress;
  foundingDate?: string;
  numberOfEmployees?: string;
  industry?: string;
  legalName?: string;
  telephone: string;
  geo?: GeoCoordinates;
  openingHours?: string[];
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
}

export interface GeoCoordinates extends BaseSchema {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface ServiceSchema extends BaseSchema {
  '@type': 'Service';
  name: string;
  description: string;
  provider: OrganizationSchema;
  serviceType: string;
  areaServed?: string | string[];
  hasOfferCatalog?: OfferCatalog;
  offers?: Offer[];
}

export interface Offer extends BaseSchema {
  '@type': 'Offer';
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  validFrom?: string;
  validThrough?: string;
  seller: OrganizationSchema;
}

export interface OfferCatalog extends BaseSchema {
  '@type': 'OfferCatalog';
  name: string;
  description: string;
  itemListElement: Service[];
}

export interface Service extends BaseSchema {
  '@type': 'Service';
  name: string;
  description: string;
  serviceType: string;
}

export interface ArticleSchema extends BaseSchema {
  '@type': 'Article';
  headline: string;
  description: string;
  image: string | ImageObject | (string | ImageObject)[];
  datePublished: string;
  dateModified: string;
  author: PersonSchema | PersonSchema[];
  publisher: OrganizationSchema;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string | string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
}

export interface BlogPostingSchema extends BaseSchema {
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  image: string | ImageObject | (string | ImageObject)[];
  datePublished: string;
  dateModified: string;
  author: PersonSchema | PersonSchema[];
  publisher: OrganizationSchema;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string | string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
  blogType?: string;
  genre?: string;
}

export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem extends BaseSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface ProfilePageSchema extends BaseSchema {
  '@type': 'ProfilePage';
  mainEntity: PersonSchema;
  name: string;
  description: string;
  url: string;
  dateCreated?: string;
  dateModified?: string;
  author?: PersonSchema;
  publisher?: OrganizationSchema;
}

export interface DiscussionForumPostingSchema extends BaseSchema {
  '@type': 'DiscussionForumPosting';
  headline: string;
  text: string;
  datePublished: string;
  dateModified?: string;
  author: PersonSchema;
  publisher?: OrganizationSchema;
  parentItem?: {
    '@type': 'DiscussionForumPosting';
    '@id': string;
  };
  sharedContent?: string;
  upvoteCount?: number;
  downvoteCount?: number;
}

export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
  potentialAction?: SearchAction;
  sameAs?: string[];
  inLanguage?: string;
}

export interface SearchAction extends BaseSchema {
  '@type': 'SearchAction';
  target: {
    '@type': 'EntryPoint';
    urlTemplate: string;
  };
  'query-input': string;
}

export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface Question extends BaseSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer extends BaseSchema {
  '@type': 'Answer';
  text: string;
  dateCreated?: string;
  upvoteCount?: number;
  author?: PersonSchema;
}

// Configuration interfaces
export interface SchemaConfig {
  baseUrl: string;
  siteName: string;
  organization: {
    name: string;
    legalName: string;
    description: string;
    logo: string;
    url: string;
    foundingDate: string;
    industry: string;
    numberOfEmployees: string;
    sameAs: string[];
    contactPoint: {
      telephone: string;
      email: string;
      contactType: string;
      areaServed: string[];
      availableLanguage: string[];
    };
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}

/**
 * Default configuration for Veritron AI Agency
 */
export const VERITRON_SCHEMA_CONFIG: SchemaConfig = {
  baseUrl: 'https://veritronai.com',
  siteName: 'Veritron AI Agency',
  organization: {
    name: 'Veritron AI Agency',
    legalName: 'Veritron Technologies Inc.',
    description: 'Leading AI technology agency specializing in machine learning, artificial intelligence solutions, and cutting-edge digital experiences.',
    logo: 'https://veritronai.com/veritron-logo.png',
    url: 'https://veritronai.com',
    foundingDate: '2020-01-15',
    industry: 'Artificial Intelligence',
    numberOfEmployees: '11-50',
    sameAs: [
      'https://linkedin.com/company/veritron-ai',
      'https://twitter.com/veritronai',
      'https://github.com/veritron-ai',
      'https://instagram.com/veritronai',
      'https://facebook.com/veritronai'
    ],
    contactPoint: {
      telephone: '+1-555-VERITRON',
      email: 'contact@veritronai.com',
      contactType: 'customer service',
      areaServed: ['US', 'CA', 'GB', 'AU', 'DE'],
      availableLanguage: ['English', 'Spanish', 'French', 'German']
    },
    address: {
      streetAddress: '123 Innovation Drive',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    }
  }
};

/**
 * Utility class for generating Schema.org JSON-LD markup
 */
export class SchemaGenerator {
  private config: SchemaConfig;

  constructor(config: SchemaConfig = VERITRON_SCHEMA_CONFIG) {
    this.config = config;
  }

  /**
   * Generates Organization schema for site-wide use
   */
  generateOrganizationSchema(): OrganizationSchema {
    const org = this.config.organization;
    
    const schema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${this.config.baseUrl}/#organization`,
      name: org.name,
      legalName: org.legalName,
      description: org.description,
      url: org.url,
      logo: {
        '@type': 'ImageObject',
        url: org.logo,
        width: 512,
        height: 512,
        caption: `${org.name} Logo`
      },
      foundingDate: org.foundingDate,
      industry: org.industry,
      numberOfEmployees: org.numberOfEmployees,
      sameAs: org.sameAs,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: org.contactPoint.telephone,
          email: org.contactPoint.email,
          contactType: org.contactPoint.contactType,
          areaServed: org.contactPoint.areaServed,
          availableLanguage: org.contactPoint.availableLanguage
        }
      ]
    };

    if (org.address) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry
      };
    }

    return schema;
  }

  /**
   * Generates WebSite schema with search functionality
   */
  generateWebSiteSchema(): WebSiteSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.config.baseUrl}/#website`,
      name: this.config.siteName,
      url: this.config.baseUrl,
      description: this.config.organization.description,
      publisher: {
        '@id': `${this.config.baseUrl}/#organization`
      } as OrganizationSchema,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.config.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      sameAs: this.config.organization.sameAs,
      inLanguage: 'en-US'
    };
  }

  /**
   * Generates Article schema for blog posts and case studies
   */
  generateArticleSchema(data: {
    headline: string;
    description: string;
    url: string;
    image: string | string[];
    datePublished: string;
    dateModified?: string;
    author: {
      name: string;
      url?: string;
      image?: string;
    };
    keywords?: string[];
    articleSection?: string;
    wordCount?: number;
  }): ArticleSchema {
    const images = Array.isArray(data.image) 
      ? data.image.map(img => ({
          '@type': 'ImageObject' as const,
          url: img,
          width: 1200,
          height: 630
        }))
      : [{
          '@type': 'ImageObject' as const,
          url: data.image,
          width: 1200,
          height: 630
        }];

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${data.url}#article`,
      headline: data.headline,
      description: data.description,
      image: images,
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      author: {
        '@type': 'Person',
        name: data.author.name,
        url: data.author.url,
        image: data.author.image
      },
      publisher: {
        '@id': `${this.config.baseUrl}/#organization`
      } as OrganizationSchema,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url
      },
      keywords: data.keywords?.join(', '),
      articleSection: data.articleSection,
      wordCount: data.wordCount,
      inLanguage: 'en-US'
    };
  }

  /**
   * Generates BreadcrumbList schema for navigation
   */
  generateBreadcrumbSchema(breadcrumbs: Array<{
    name: string;
    url: string;
  }>): BreadcrumbListSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  /**
   * Generates ProfilePage schema for team member pages
   */
  generateProfilePageSchema(data: {
    url: string;
    name: string;
    description: string;
    person: {
      name: string;
      jobTitle: string;
      image: string;
      email?: string;
      sameAs?: string[];
    };
    dateCreated?: string;
    dateModified?: string;
  }): ProfilePageSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${data.url}#profilepage`,
      name: data.name,
      description: data.description,
      url: data.url,
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      mainEntity: {
        '@type': 'Person',
        '@id': `${data.url}#person`,
        name: data.person.name,
        jobTitle: data.person.jobTitle,
        image: {
          '@type': 'ImageObject',
          url: data.person.image,
          width: 400,
          height: 400
        },
        email: data.person.email,
        worksFor: {
          '@id': `${this.config.baseUrl}/#organization`
        } as OrganizationSchema,
        sameAs: data.person.sameAs
      },
      publisher: {
        '@id': `${this.config.baseUrl}/#organization`
      } as OrganizationSchema
    };
  }

  /**
   * Generates Service schema for service offerings
   */
  generateServiceSchema(data: {
    name: string;
    description: string;
    serviceType: string;
    areaServed?: string[];
    offers?: Array<{
      name: string;
      description: string;
      price?: string;
      priceCurrency?: string;
    }>;
  }): ServiceSchema {
    const schema: ServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${this.config.baseUrl}/services/${data.name.toLowerCase().replace(/\s+/g, '-')}#service`,
      name: data.name,
      description: data.description,
      serviceType: data.serviceType,
      provider: {
        '@id': `${this.config.baseUrl}/#organization`
      } as OrganizationSchema,
      areaServed: data.areaServed
    };

    if (data.offers) {
      schema.offers = data.offers.map((offer, index) => ({
        '@type': 'Offer',
        '@id': `${schema['@id']}-offer-${index}`,
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: offer.priceCurrency || 'USD',
        availability: 'https://schema.org/InStock',
        seller: {
          '@id': `${this.config.baseUrl}/#organization`
        } as OrganizationSchema
      }));
    }

    return schema;
  }

  /**
   * Generates DiscussionForumPosting schema for comments and reviews
   */
  generateDiscussionForumPostingSchema(data: {
    headline: string;
    text: string;
    datePublished: string;
    author: {
      name: string;
      url?: string;
    };
    dateModified?: string;
    parentItemId?: string;
    upvoteCount?: number;
    downvoteCount?: number;
  }): DiscussionForumPostingSchema {
    const schema: DiscussionForumPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'DiscussionForumPosting',
      headline: data.headline,
      text: data.text,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: {
        '@type': 'Person',
        name: data.author.name,
        url: data.author.url
      },
      publisher: {
        '@id': `${this.config.baseUrl}/#organization`
      } as OrganizationSchema,
      upvoteCount: data.upvoteCount,
      downvoteCount: data.downvoteCount
    };

    if (data.parentItemId) {
      schema.parentItem = {
        '@type': 'DiscussionForumPosting',
        '@id': data.parentItemId
      };
    }

    return schema;
  }

  /**
   * Generates FAQ schema for frequently asked questions
   */
  generateFAQSchema(faqs: Array<{
    question: string;
    answer: string;
    dateCreated?: string;
    upvoteCount?: number;
  }>): FAQPageSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
          dateCreated: faq.dateCreated,
          upvoteCount: faq.upvoteCount
        }
      }))
    };
  }

  /**
   * Safely converts schema object to JSON-LD string
   */
  toJsonLd(schema: BaseSchema): string {
    try {
      return JSON.stringify(schema, null, 2);
    } catch (error) {
      console.error('Error serializing schema to JSON-LD:', error);
      return '{}';
    }
  }

  /**
   * Validates that all required properties are present for a schema type
   */
  validateSchema(schema: BaseSchema): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!schema['@context']) {
      errors.push('Missing @context property');
    }
    
    if (!schema['@type']) {
      errors.push('Missing @type property');
    }

    // Type-specific validations
    if (schema['@type'] === 'Organization') {
      const org = schema as OrganizationSchema;
      if (!org.name) errors.push('Organization missing name');
      if (!org.url) errors.push('Organization missing url');
      if (!org.logo) errors.push('Organization missing logo');
    }

    if (schema['@type'] === 'Article') {
      const article = schema as ArticleSchema;
      if (!article.headline) errors.push('Article missing headline');
      if (!article.datePublished) errors.push('Article missing datePublished');
      if (!article.author) errors.push('Article missing author');
      if (!article.publisher) errors.push('Article missing publisher');
      if (!article.image) errors.push('Article missing image');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

/**
 * Default schema generator instance
 */
export const schemaGenerator = new SchemaGenerator();

/**
 * Utility function to escape JSON-LD content for safe HTML injection
 */
export function escapeJsonLd(jsonLd: string): string {
  return jsonLd
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * React hook for managing schema injection in components
 */
export function useSchemaInjection(schema: BaseSchema | null, elementId?: string) {
  React.useEffect(() => {
    if (!schema) return;

    const scriptId = elementId || 'dynamic-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (scriptElement) {
      scriptElement.textContent = schemaGenerator.toJsonLd(schema);
    } else {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      scriptElement.textContent = schemaGenerator.toJsonLd(schema);
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (elementId && scriptElement?.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [schema, elementId]);
}

// Re-export React for the hook
import * as React from 'react';