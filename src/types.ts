export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  technology: string[];
  status: 'ACTIVE EXPERIMENT' | 'BETA ACCESS' | 'IN DEVELOPMENT' | 'RESEARCH PHASE';
  focus: string;
  architectureDetails: string;
}

export interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
  domains: string[];
  methodology: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  summary: string;
  deepDive: string;
  vectors: string[];
  defensiveFocus: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
  submissionId?: string;
  errors?: Record<string, string>;
}
