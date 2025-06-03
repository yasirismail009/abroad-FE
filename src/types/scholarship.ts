export interface Scholarship {
  id: number;
  title: string;
  website_url: string;
  source_website: string;
  description: string;
  published_date: string;
  host_country: string;
  degree_level: string;
  number_of_scholarships: number | null;
  financial_benefits: string | null;
  deadline: string;
  results_date: string | null;
  benefits: string[];
  duration: {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
  };
  study_programs: string[];
  eligibility: string[];
  required_documents: string[];
  application_process: string[];
  additional_info: {
    deadline: string;
  };
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ScholarshipFilters {
  degree?: string;
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  total?: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface ScholarshipListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Scholarship[];
} 