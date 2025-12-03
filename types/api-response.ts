export interface Pagination {
  current_page: number;
  from: number;
  has_more_pages: boolean;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export type APIResponse<T> = {
  success: boolean | 'true' | 'false';
  message: string;
  status: number;
  data: T;
  errors?: Record<string, string[]>;
  pagination?: Pagination;
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
