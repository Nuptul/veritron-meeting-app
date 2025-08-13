// Contact form types for better TypeScript support
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest?: string[];
  budgetRange?: 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus' | 'not-specified';
  preferredContact?: 'email' | 'phone' | 'both';
  timeline?: 'asap' | '1-month' | '3-months' | '6-months-plus' | 'not-specified';
}

export interface NotificationState {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  id: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  businessHours: string;
}

export interface ServiceOption {
  id: string;
  title: string;
  category: string;
  description?: string;
  icon?: string;
}

export interface BudgetOption {
  value: string;
  label: string;
  recommended?: boolean;
}

export interface TimelineOption {
  value: string;
  label: string;
  description?: string;
}

export interface ContactMethod {
  value: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}