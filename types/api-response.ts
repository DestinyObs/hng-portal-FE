import { RawJob2 } from './job-card';

export type APIResponse<T> = {
  success: boolean | 'true' | 'false';
  message: string;
  status: number;
  data: T;
  errors?: Record<string, string[]>;
  total?: number;
  last_page?: number;
};

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
