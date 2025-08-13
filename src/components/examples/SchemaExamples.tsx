/**
 * Schema Implementation Examples
 * 
 * This file demonstrates how to use the schema utilities in different components
 * and scenarios. These examples show best practices for structured data integration.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { schemaGenerator } from '../../utils/schema';

// Example 1: Blog Post/Article Component
export const BlogPostExample: React.FC<{
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    featuredImage: string;
    tags: string[];
    readingTime: number;
  };
}> = ({ post }) => {
  // Generate article schema
  const articleSchema = schemaGenerator.generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    url: `https://veritronai.com/blog/${post.id}`,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      name: post.author.name,
      image: post.author.avatar,
      url: `https://veritronai.com/team/${post.author.name.toLowerCase().replace(' ', '-')}`
    },
    keywords: post.tags,
    articleSection: 'AI Technology',
    wordCount: Math.ceil(post.content.length / 5) // Rough word count estimation
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = schemaGenerator.generateBreadcrumbSchema([
    { name: 'Home', url: 'https://veritronai.com' },
    { name: 'Blog', url: 'https://veritronai.com/blog' },
    { name: post.title, url: `https://veritronai.com/blog/${post.id}` }
  ]);

  return (
    <>
      <Helmet>
        <title>{post.title} - Veritron AI Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(articleSchema)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>By {post.author.name}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>
        
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>
    </>
  );
};

// Example 2: Team Member Profile Component
export const TeamMemberExample: React.FC<{
  member: {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    email: string;
    linkedin: string;
    twitter: string;
    github: string;
    expertise: string[];
  };
}> = ({ member }) => {
  // Generate profile page schema
  const profileSchema = schemaGenerator.generateProfilePageSchema({
    url: `https://veritronai.com/team/${member.id}`,
    name: `${member.name} - ${member.title}`,
    description: member.bio,
    person: {
      name: member.name,
      jobTitle: member.title,
      image: member.avatar,
      email: member.email,
      sameAs: [
        member.linkedin,
        member.twitter,
        member.github
      ].filter(Boolean)
    },
    dateCreated: '2024-01-15T08:00:00Z',
    dateModified: new Date().toISOString()
  });

  return (
    <>
      <Helmet>
        <title>{member.name} - {member.title} | Veritron AI Team</title>
        <meta name="description" content={member.bio} />
        
        {/* Profile Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(profileSchema)}
        </script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-6 mb-6">
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-xl text-veritron-gold-600">{member.title}</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{member.bio}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-veritron-aluminum-100 text-veritron-gunmetal-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            {member.linkedin && (
              <a href={member.linkedin} className="text-blue-600 hover:text-blue-800">
                LinkedIn
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
            )}
            {member.github && (
              <a href={member.github} className="text-gray-800 hover:text-gray-600">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Example 3: Service Detail Page Component
export const ServiceDetailExample: React.FC<{
  service: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    serviceType: string;
    features: string[];
    pricing: {
      basic: { name: string; price: number; features: string[] };
      premium: { name: string; price: number; features: string[] };
      enterprise: { name: string; price: number; features: string[] };
    };
    caseStudies: Array<{
      title: string;
      client: string;
      result: string;
    }>;
  };
}> = ({ service }) => {
  // Generate service schema with offers
  const serviceSchema = schemaGenerator.generateServiceSchema({
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    areaServed: ['US', 'CA', 'GB', 'AU', 'DE'],
    offers: [
      {
        name: service.pricing.basic.name,
        description: service.pricing.basic.features.join(', '),
        price: service.pricing.basic.price.toString(),
        priceCurrency: 'USD'
      },
      {
        name: service.pricing.premium.name,
        description: service.pricing.premium.features.join(', '),
        price: service.pricing.premium.price.toString(),
        priceCurrency: 'USD'
      },
      {
        name: service.pricing.enterprise.name,
        description: service.pricing.enterprise.features.join(', '),
        price: service.pricing.enterprise.price.toString(),
        priceCurrency: 'USD'
      }
    ]
  });

  return (
    <>
      <Helmet>
        <title>{service.name} | Veritron AI Services</title>
        <meta name="description" content={service.description} />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(serviceSchema)}
        </script>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{service.description}</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
            <p className="text-gray-700 mb-6">{service.longDescription}</p>
            
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {service.features.map(feature => (
                <li key={feature} className="flex items-center">
                  <span className="w-2 h-2 bg-veritron-gold-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
            <div className="space-y-4">
              {Object.entries(service.pricing).map(([key, plan]) => (
                <div key={key} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg">{plan.name}</h4>
                  <p className="text-2xl font-bold text-veritron-gold-600">
                    ${plan.price.toLocaleString()}
                  </p>
                  <ul className="text-sm text-gray-600 mt-2">
                    {plan.features.map(feature => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {service.caseStudies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Case Studies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {service.caseStudies.map((study, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Client: {study.client}</p>
                  <p className="text-sm">{study.result}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

// Example 4: FAQ Component with Schema
export const FAQExample: React.FC<{
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
    helpful: number;
  }>;
}> = ({ faqs }) => {
  // Generate FAQ schema
  const faqSchema = schemaGenerator.generateFAQSchema(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer,
      dateCreated: '2024-01-15T08:00:00Z',
      upvoteCount: faq.helpful
    }))
  );

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Veritron AI</title>
        <meta name="description" content="Common questions about Veritron AI's services, pricing, and implementation process." />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(faqSchema)}
        </script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our AI services</p>
        </header>
        
        <div className="space-y-6">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{faq.category}</span>
                <span>{faq.helpful} people found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Example 5: Case Study with Article Schema
export const CaseStudyExample: React.FC<{
  caseStudy: {
    id: string;
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    timeline: string;
    technologies: string[];
    testimonial: {
      quote: string;
      author: string;
      title: string;
      company: string;
    };
    publishedAt: string;
    featuredImage: string;
  };
}> = ({ caseStudy }) => {
  // Generate article schema for case study
  const articleSchema = schemaGenerator.generateArticleSchema({
    headline: caseStudy.title,
    description: `Case study: ${caseStudy.challenge}`,
    url: `https://veritronai.com/case-studies/${caseStudy.id}`,
    image: [caseStudy.featuredImage],
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.publishedAt,
    author: {
      name: 'Veritron AI Team',
      url: 'https://veritronai.com/team'
    },
    keywords: caseStudy.technologies,
    articleSection: 'Case Studies'
  });

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Veritron AI Case Studies</title>
        <meta name="description" content={`Case study: ${caseStudy.challenge}`} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {schemaGenerator.toJsonLd(articleSchema)}
        </script>
      </Helmet>
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Client: {caseStudy.client}</span>
            <span>•</span>
            <span>Industry: {caseStudy.industry}</span>
            <span>•</span>
            <span>Timeline: {caseStudy.timeline}</span>
          </div>
        </header>
        
        <img 
          src={caseStudy.featuredImage} 
          alt={caseStudy.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Challenge</h2>
            <p className="text-gray-700">{caseStudy.challenge}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Solution</h2>
            <p className="text-gray-700">{caseStudy.solution}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map(tech => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-veritron-gold-100 text-veritron-gunmetal-800 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
          <ul className="space-y-3">
            {caseStudy.results.map((result, index) => (
              <li key={index} className="flex items-start">
                <span className="w-6 h-6 bg-veritron-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{result}</span>
              </li>
            ))}
          </ul>
        </section>
        
        <blockquote className="bg-gray-50 border-l-4 border-veritron-gold-500 p-6 rounded-r-lg">
          <p className="text-lg italic text-gray-800 mb-4">"{caseStudy.testimonial.quote}"</p>
          <footer className="text-sm text-gray-600">
            <strong>{caseStudy.testimonial.author}</strong>, {caseStudy.testimonial.title}<br/>
            {caseStudy.testimonial.company}
          </footer>
        </blockquote>
      </article>
    </>
  );
};

export default {
  BlogPostExample,
  TeamMemberExample,
  ServiceDetailExample,
  FAQExample,
  CaseStudyExample
};