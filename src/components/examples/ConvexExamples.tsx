import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Services Display Component
export function ServicesDisplay() {
  const services = useQuery(api.services.getActiveServices);

  if (!services) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{service.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="text-sm text-gray-500 flex items-center">
                  <span className="mr-2">•</span>
                  {feature}
                </div>
              ))}
              {service.features.length > 3 && (
                <div className="text-sm text-gray-400">
                  +{service.features.length - 3} more features
                </div>
              )}
            </div>
            <span className="inline-block mt-4 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {service.category.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Featured Projects Component
export function FeaturedProjects() {
  const projects = useQuery(api.projects.getFeaturedProjects, { limit: 3 });

  if (!projects) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {project.thumbnailUrl && (
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {project.category.replace('-', ' ')}
                </span>
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Form Component
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    serviceInterest: [] as string[],
    budgetRange: 'not-specified' as const,
    timeline: 'not-specified' as const,
  });

  const [submitted, setSubmitted] = useState(false);
  const submitContact = useMutation(api.contacts.submitContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        subject: formData.subject,
        message: formData.message,
        serviceInterest: formData.serviceInterest.length > 0 ? formData.serviceInterest : undefined,
        budgetRange: formData.budgetRange !== 'not-specified' ? formData.budgetRange : undefined,
        timeline: formData.timeline !== 'not-specified' ? formData.timeline : undefined,
      });
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        serviceInterest: [],
        budgetRange: 'not-specified',
        timeline: 'not-specified',
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceInterestChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviceInterest: checked
        ? [...prev.serviceInterest, service]
        : prev.serviceInterest.filter(s => s !== service)
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-4">✓</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Thank you for your message!
          </h3>
          <p className="text-green-700">
            We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  const services = ['Web Development', 'Mobile Development', 'UI/UX Design', 'Cloud Infrastructure', 'AI & Machine Learning', 'Technical Consulting'];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services of Interest
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {services.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.serviceInterest.includes(service)}
                  onChange={(e) => handleServiceInterestChange(service, e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="not-specified">Not specified</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-15k">$5,000 - $15,000</option>
              <option value="15k-50k">$15,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="not-specified">Not specified</option>
              <option value="asap">ASAP</option>
              <option value="1-month">Within 1 month</option>
              <option value="3-months">Within 3 months</option>
              <option value="6-months-plus">6+ months</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your project..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

// Testimonials Display Component
export function TestimonialsDisplay() {
  const testimonials = useQuery(api.testimonials.getApprovedTestimonials, { 
    featuredOnly: true, 
    limit: 3 
  });

  if (!testimonials) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-6 bg-gray-100 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <blockquote className="text-gray-600 mb-4 italic">
              "{testimonial.testimonial}"
            </blockquote>
            <div className="flex items-center">
              {testimonial.clientAvatar && (
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900">{testimonial.clientName}</div>
                <div className="text-sm text-gray-600">
                  {testimonial.clientTitle} at {testimonial.clientCompany}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Analytics Display Component (for demo purposes)
export function AnalyticsDisplay() {
  const stats = useQuery(api.utils.getSiteStats);

  if (!stats) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.overview.activeServices}</div>
          <div className="text-sm text-gray-600">Active Services</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.overview.publicProjects}</div>
          <div className="text-sm text-gray-600">Public Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.overview.totalContacts}</div>
          <div className="text-sm text-gray-600">Total Contacts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.overview.approvedTestimonials}</div>
          <div className="text-sm text-gray-600">Testimonials</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>Recent Activity (7 days)</div>
          <div className="md:text-right">
            {stats.recent.contactsThisWeek} new contacts, {stats.recent.pageViewsThisWeek} page views
          </div>
        </div>
      </div>
    </div>
  );
}