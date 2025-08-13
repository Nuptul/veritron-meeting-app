// Dashboard Type Definitions - Veritron Agency Dashboard
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'review' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  client: Client;
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  progress: number;
  team: TeamMember[];
  tasks: Task[];
  files: ProjectFile[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  avatar?: string;
  address?: Address;
  billingInfo: BillingInfo;
  projects: string[]; // project IDs
  totalSpent: number;
  joinedAt: Date;
  lastContact?: Date;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'project-manager' | 'developer' | 'designer' | 'qa' | 'client';
  avatar?: string;
  skills: string[];
  hourlyRate?: number;
  isActive: boolean;
  department: 'development' | 'design' | 'marketing' | 'management' | 'qa';
  joinedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: TeamMember;
  projectId: string;
  columnId: string;
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  comments: TaskComment[];
  dependencies: string[]; // task IDs
  attachments: TaskAttachment[];
}

export interface TaskComment {
  id: string;
  content: string;
  author: TeamMember;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: TeamMember;
  uploadedAt: Date;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  limit?: number;
  order: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  size: number;
  projectId: string;
  uploadedBy: TeamMember;
  uploadedAt: Date;
  folder?: string;
  isShared: boolean;
  sharedWith: string[]; // user IDs
  version: number;
  description?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  projectId?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  items: InvoiceItem[];
  notes?: string;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxRate?: number;
}

export interface BillingInfo {
  company: string;
  email: string;
  address: Address;
  taxId?: string;
  paymentTerms: number; // days
  preferredPaymentMethod: 'bank-transfer' | 'credit-card' | 'paypal' | 'stripe';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  activeClients: number;
  pendingTasks: number;
  completedTasks: number;
  overdueInvoices: number;
  paidInvoices: number;
  teamUtilization: number;
}

export interface AnalyticsData {
  projectsByStatus: { status: string; count: number; percentage: number }[];
  revenueByMonth: { month: string; revenue: number; projects: number }[];
  taskCompletionRate: { date: string; completed: number; total: number }[];
  clientGrowth: { month: string; newClients: number; totalClients: number }[];
  teamPerformance: { member: string; tasksCompleted: number; hoursLogged: number; efficiency: number }[];
  topClients: { client: string; revenue: number; projects: number }[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  userId: string;
  createdAt: Date;
  actionUrl?: string;
  actionText?: string;
}

export interface DashboardFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  clients: string[];
  projects: string[];
  status: string[];
  priority: string[];
  team: string[];
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
    taskUpdates: boolean;
    projectDeadlines: boolean;
    invoiceReminders: boolean;
  };
  dashboardLayout: {
    sidebarCollapsed: boolean;
    widgetOrder: string[];
    hiddenWidgets: string[];
  };
}