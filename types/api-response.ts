import { RawJob2 } from './job-card';

export interface SuccessResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface BackendErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
}

export interface APIError {
  success: false;
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface TalentJobsResponse {
  success: boolean;
  message: string;
  data: RawJob2[];
  total: number;
  last_page: number;
}
