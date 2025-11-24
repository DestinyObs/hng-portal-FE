export interface SuccessResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface BackendErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
}
