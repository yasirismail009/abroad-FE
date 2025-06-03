import { Scholarship, ScholarshipListResponse } from '../types/scholarship';

interface SearchParams {
  query: string;
  filters: {
    degree_level: string;
    host_country: string;
    financial_benefits: string;
  };
}

class ScholarshipService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  async getCountries(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/scholarships/countries`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  }

  async getScholarships(page: number = 1, searchParams?: SearchParams): Promise<ScholarshipListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: '10',
    });

    if (searchParams?.query) {
      params.append('search', searchParams.query);
    }

    if (searchParams?.filters) {
      if (searchParams.filters.degree_level) {
        params.append('degree_level', searchParams.filters.degree_level);
      }
      if (searchParams.filters.host_country) {
        params.append('country', searchParams.filters.host_country);
      }
      if (searchParams.filters.financial_benefits) {
        params.append('financial_benefits', searchParams.filters.financial_benefits);
      }
    }

    const response = await fetch(`${this.baseUrl}/scholarships/?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch scholarships');
    }
    return response.json();
  }

  async getTopScholarships(): Promise<Scholarship[]> {
    const response = await fetch(`${this.baseUrl}/scholarships/top_scholarships/`);
    if (!response.ok) {
      throw new Error('Failed to fetch top scholarships');
    }
    return response.json();
  }

  async getScholarshipById(id: number): Promise<Scholarship> {
    const response = await fetch(`${this.baseUrl}/scholarships/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch scholarship details');
    }
    return response.json();
  }
}

export const scholarshipService = new ScholarshipService(); 