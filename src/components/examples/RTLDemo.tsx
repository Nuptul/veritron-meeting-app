/**
 * RTL Demo Component
 * Demonstrates comprehensive RTL support with Arabic content
 * Visual validation for internationalization features
 */

import React, { useState } from 'react';
import { generateHrefLangJSX, getLocaleConfig, isRTLLocale } from '../../i18n/hreflang';
import '../../styles/rtl.css';

interface RTLDemoProps {
  locale?: string;
}

export function RTLDemo({ locale = 'ar-SA' }: RTLDemoProps) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [showDebug, setShowDebug] = useState(false);
  
  const localeConfig = getLocaleConfig(currentLocale);
  const isRTL = isRTLLocale(currentLocale);
  
  // Sample content in Arabic for RTL testing
  const arabicContent = {
    title: 'وكالة فيريترون للذكاء الاصطناعي',
    subtitle: 'حلول الذكاء الاصطناعي المتميزة والتجارب المسرّعة بـ WebGPU',
    services: {
      title: 'خدماتنا',
      items: [
        {
          title: 'تطوير الذكاء الاصطناعي',
          description: 'حلول ذكية ومبتكرة لأعمالك باستخدام أحدث تقنيات الذكاء الاصطناعي',
          icon: '🤖'
        },
        {
          title: 'تطوير التطبيقات',
          description: 'تطبيقات ويب وموبايل سريعة ومتجاوبة بأحدث التقنيات',
          icon: '📱'
        },
        {
          title: 'الأمان السيبراني',
          description: 'حماية شاملة لبياناتك وأنظمتك ضد التهديدات الرقمية',
          icon: '🛡️'
        }
      ]
    },
    contact: {
      title: 'تواصل معنا',
      fields: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        submit: 'إرسال'
      }
    },
    navigation: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      portfolio: 'الأعمال',
      contact: 'التواصل'
    }
  };

  const englishContent = {
    title: 'Veritron AI Agency',
    subtitle: 'Premium AI Solutions, WebGPU-Accelerated Experiences',
    services: {
      title: 'Our Services',
      items: [
        {
          title: 'AI Development',
          description: 'Smart and innovative solutions for your business using cutting-edge AI technology',
          icon: '🤖'
        },
        {
          title: 'App Development', 
          description: 'Fast and responsive web and mobile applications with latest technologies',
          icon: '📱'
        },
        {
          title: 'Cybersecurity',
          description: 'Comprehensive protection for your data and systems against digital threats',
          icon: '🛡️'
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      fields: {
        name: 'Full Name',
        email: 'Email Address',
        message: 'Message',
        submit: 'Send'
      }
    },
    navigation: {
      home: 'Home',
      about: 'About',
      services: 'Services', 
      portfolio: 'Portfolio',
      contact: 'Contact'
    }
  };

  const content = isRTL ? arabicContent : englishContent;

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${showDebug ? 'debug-rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-locale={currentLocale}
    >
      {/* Debug Panel */}
      <div className="fixed top-4 inset-inline-end-4 z-50 space-y-2">
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md"
        >
          Debug: {showDebug ? 'ON' : 'OFF'}
        </button>
        <select
          value={currentLocale}
          onChange={(e) => setCurrentLocale(e.target.value)}
          className="block px-3 py-1 text-sm border rounded-md"
        >
          <option value="en-US">English (US)</option>
          <option value="ar-SA">العربية (السعودية)</option>
        </select>
      </div>

      {/* Locale Information Panel */}
      {showDebug && (
        <div className="fixed top-20 inset-inline-end-4 z-40 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
          <h3 className="font-semibold text-sm mb-2">Locale Debug Info</h3>
          <div className="text-xs space-y-1">
            <div><strong>Locale:</strong> {currentLocale}</div>
            <div><strong>Direction:</strong> {isRTL ? 'RTL' : 'LTR'}</div>
            <div><strong>Language:</strong> {localeConfig?.language}</div>
            <div><strong>Country:</strong> {localeConfig?.country}</div>
            <div><strong>Native Name:</strong> {localeConfig?.nativeName}</div>
            <div><strong>Currency:</strong> {localeConfig?.currency}</div>
            <div><strong>Date Format:</strong> {localeConfig?.dateFormat}</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                {isRTL ? 'فيريترون' : 'Veritron'}
              </h1>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="nav-menu space-inline-end-8">
                {Object.entries(content.navigation).map(([key, label]) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="nav-item text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-rtl py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-arabic' : ''}`}>
            {content.title}
          </h1>
          <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto ${isRTL ? 'text-arabic' : ''}`}>
            {content.subtitle}
          </p>
          
          {/* Mixed Content Example */}
          <div className="mixed-content text-gray-500 mb-8">
            {isRTL ? (
              <>
                تاريخ اليوم: <span className="numbers-ltr">2025-08-10</span> | 
                الوقت: <span className="numbers-ltr">14:30 PM</span>
              </>
            ) : (
              <>
                Today's date: 2025-08-10 | Time: 14:30 PM
              </>
            )}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white btn-icon-start">
              <span className="icon">▶</span>
              {isRTL ? 'ابدأ الآن' : 'Get Started'}
            </button>
            <button className="btn border-2 border-gray-300 text-gray-700 hover:border-gray-400 btn-icon-end">
              {isRTL ? 'تعرف أكثر' : 'Learn More'}
              <span className="icon icon-mirror">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${isRTL ? 'text-arabic' : ''}`}>
            {content.services.title}
          </h2>
          
          <div className="services-grid-rtl">
            {content.services.items.map((service, index) => (
              <div key={index} className="service-card card">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${isRTL ? 'text-arabic' : ''}`}>
                    {service.title}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? 'text-arabic' : ''}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${isRTL ? 'text-arabic' : ''}`}>
            {content.contact.title}
          </h2>
          
          <form className="contact-form-rtl space-y-6">
            <div className="form-group">
              <label className={`form-label ${isRTL ? 'text-arabic' : ''}`}>
                {content.contact.fields.name}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={content.contact.fields.name}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            
            <div className="form-group">
              <label className={`form-label ${isRTL ? 'text-arabic' : ''}`}>
                {content.contact.fields.email}
              </label>
              <div className="input-with-icon input-with-icon-start">
                <input
                  type="email"
                  className="form-input"
                  placeholder={content.contact.fields.email}
                  dir="ltr"
                />
                <div className="input-icon-start">@</div>
              </div>
            </div>
            
            <div className="form-group">
              <label className={`form-label ${isRTL ? 'text-arabic' : ''}`}>
                {content.contact.fields.message}
              </label>
              <textarea
                rows={5}
                className="form-input resize-none"
                placeholder={content.contact.fields.message}
                dir={isRTL ? 'rtl' : 'ltr'}
              ></textarea>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white px-8">
                {content.contact.fields.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-rtl bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-arabic' : ''}`}>
                {isRTL ? 'فيريترون' : 'Veritron'}
              </h3>
              <p className={`text-gray-400 ${isRTL ? 'text-arabic' : ''}`}>
                {isRTL 
                  ? 'وكالة متخصصة في حلول الذكاء الاصطناعي والتقنيات المتقدمة'
                  : 'Specialized agency in AI solutions and advanced technologies'
                }
              </p>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isRTL ? 'text-arabic' : ''}`}>
                {isRTL ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <div className="footer-links space-y-2">
                {Object.entries(content.navigation).map(([key, label]) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isRTL ? 'text-arabic' : ''}`}>
                {isRTL ? 'معلومات التقنية' : 'Technical Info'}
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Direction: {isRTL ? 'RTL' : 'LTR'}</div>
                <div>Locale: {currentLocale}</div>
                <div>Font: {localeConfig?.fonts.primary}</div>
                <div className="numbers-ltr">Date: 2025-08-10</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className={isRTL ? 'text-arabic' : ''}>
              {isRTL 
                ? '© 2025 فيريترون. جميع الحقوق محفوظة.'
                : '© 2025 Veritron. All rights reserved.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RTLDemo;