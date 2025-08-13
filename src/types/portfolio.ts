export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  client: string;
  completionDate: string;
  featured: boolean;
  images: {
    before?: string;
    after: string;
    thumbnail: string;
    gallery: string[];
  };
  video?: {
    preview: string;
    full?: string;
  };
  metrics: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
    video?: string;
  };
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  model3D?: {
    url: string;
    type: 'gltf' | 'fbx' | 'obj';
    animations?: string[];
  };
}

export interface FilterCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'achievement' | 'launch' | 'expansion' | 'award';
  icon: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  video?: {
    thumbnail: string;
    url: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export interface PortfolioFilters {
  category: string;
  tags: string[];
  client?: string;
  year?: string;
  featured?: boolean;
}