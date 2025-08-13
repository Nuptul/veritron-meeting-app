# Convex Database Setup - Veritron React Kit

This directory contains the Convex database configuration and functions for the Veritron landing page project.

## 📁 Structure

```
convex/
├── schema.ts          # Database schema definitions
├── services.ts        # Service management functions
├── projects.ts        # Project/portfolio functions
├── contacts.ts        # Contact form and CRM functions
├── testimonials.ts    # Client testimonials functions
├── analytics.ts       # Site analytics and tracking
├── utils.ts          # Utility functions
├── seed.ts           # Sample data for development
└── _generated/       # Auto-generated Convex files
    └── server.ts
```

## 🗄️ Database Schema

### Services
- **Purpose**: Manage service offerings displayed on the landing page
- **Key Features**: Categories, active status, ordering, feature lists
- **Indexes**: by_category, by_active, by_sort_order

### Projects
- **Purpose**: Portfolio/project showcase
- **Key Features**: Public/private, featured status, categories, technologies
- **Indexes**: by_category, by_featured, by_status, by_public

### Contacts  
- **Purpose**: Contact form submissions and lead management
- **Key Features**: Status tracking, priority levels, response management
- **Indexes**: by_status, by_priority, by_read, by_email

### Testimonials
- **Purpose**: Client reviews and social proof
- **Key Features**: Approval workflow, ratings, featured testimonials
- **Indexes**: by_featured, by_approved, by_rating

### Analytics
- **Purpose**: Track user behavior and site metrics
- **Key Features**: Event tracking, conversion funnels, real-time data
- **Indexes**: by_event, by_timestamp, by_path

## 🚀 Getting Started

### 1. Initialize Convex (if not already done)
```bash
npx convex dev --configure
```

### 2. Deploy Schema
```bash
npx convex dev
```

### 3. Seed Sample Data
```bash
npx convex run seed:seedAll
```

## 📝 Key Functions

### Services
- `getActiveServices()` - Get services for landing page
- `createService()` - Add new service
- `updateService()` - Modify existing service
- `toggleServiceStatus()` - Enable/disable service

### Projects
- `getPublicProjects()` - Get portfolio items for landing page
- `getFeaturedProjects()` - Get highlighted projects
- `createProject()` - Add new project
- `toggleProjectFeatured()` - Feature/unfeature project

### Contacts
- `submitContact()` - Handle contact form submissions
- `getAllContacts()` - Admin contact management
- `updateContactStatus()` - Track lead progression
- `getContactStats()` - Dashboard metrics

### Testimonials
- `getApprovedTestimonials()` - Get testimonials for display
- `createTestimonial()` - Add new testimonial
- `toggleTestimonialApproval()` - Approve/reject testimonials

### Analytics
- `trackEvent()` - Record user interactions
- `getDashboardData()` - Analytics overview
- `getConversionFunnel()` - Track user journey
- `getRealTimeData()` - Live site metrics

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## 📊 Usage Examples

### Frontend Integration
```tsx
import { api } from "../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

// Get services for landing page
const services = useQuery(api.services.getActiveServices);

// Submit contact form
const submitContact = useMutation(api.contacts.submitContact);

// Track page view
const trackEvent = useMutation(api.analytics.trackEvent);
```

### Sample Data Seeds
The `seed.ts` file contains sample data for:
- 6 service categories with features
- 8 portfolio projects with different technologies  
- 5 client testimonials with ratings
- Sample contact form submissions

## 🛡️ Security & Permissions

- All public queries are available to frontend
- Mutations include validation and error handling
- Admin functions require proper authentication (to be implemented)
- Analytics data is anonymized by default

## 📈 Analytics Events

### Tracked Events
- `page_view` - Page visits
- `service_inquiry` - Service interest  
- `contact_form` - Form submissions
- `portfolio_view` - Project detail views
- `testimonial_view` - Testimonial interactions

### Dashboard Metrics
- Total page views and unique sessions
- Contact conversion rates
- Top pages and referrers
- Real-time activity (24h)
- Daily/weekly trends

## 🔄 Maintenance

### Data Cleanup
```bash
# Clean old analytics (older than 90 days)
npx convex run analytics:cleanupOldAnalytics --olderThanDays 90
```

### Backup Data
```bash
# Export all data
npx convex export
```

## 🎨 Customization

To modify the schema:
1. Update `schema.ts`
2. Update corresponding function files
3. Run `npx convex dev` to apply changes
4. Update frontend queries/mutations as needed

## 📱 Mobile Considerations

All functions are optimized for:
- Fast mobile queries with proper indexing
- Minimal data transfer with selective fields
- Progressive loading for large datasets
- Offline-first caching strategies

---

*This setup provides a complete backend solution for a modern landing page with CRM capabilities, analytics tracking, and content management.*