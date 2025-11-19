// import { auth } from 'auth';

import { createFetchUtil, HttpError, withAuth } from '@/lib/fetch-utils';
import { cookies } from 'next/headers';

export type APIResponse<T> = {
  success: boolean | 'true' | 'false';
  message: string;
  status: number;
  data: T;
  errors?: Record<string, string[]>;
  //   meta?: {
  //     total: number;
  //     page: number;
  //     limit: number;
  //     total_pages: number;
  //     has_next: boolean;
  //     has_previous: boolean;
  //   };
};

const apiHandler = createFetchUtil({
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://13.48.59.27:8000/api',
});

/**
 * Generic error handler that converts HttpError or unknown errors
 * into a standardized APIResponse format
 */
function handleApiError<T>(error: unknown): APIResponse<T | null> {
  if (error instanceof HttpError) {
    return {
      success: error.responseBody?.success || false,
      message: error.responseBody?.message || `Server error: ${error.message}`,
      status: error.statusCode,
      data: null,
    };
  }
  return {
    success: false,
    message: 'An unexpected error occurred',
    status: 500,
    data: null,
  };
}

/**
 * Base authenticated request wrapper
 * Handles session retrieval, authentication, and error handling
 */
async function makeAuthenticatedRequest<TResponse, TRequestBody = unknown>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: TRequestBody;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  } = {},
): Promise<APIResponse<TResponse | null>> {
  try {
    const token = (await cookies()).get('token')?.value;

    const res = await apiHandler<APIResponse<TResponse>>(endpoint, {
      method: options.method || 'GET',
      headers: {
        ...withAuth(token as string),
        ...options.headers,
      },
      body: options.body,
      params: options.params,
    });

    return res;
  } catch (error) {
    return handleApiError<TResponse>(error);
  }
}

/**
 * Public (unauthenticated) request wrapper
 * For endpoints that don't require authentication
 */
async function makePublicRequest<TResponse, TRequestBody = unknown>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: TRequestBody;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  } = {},
): Promise<APIResponse<TResponse | null>> {
  try {
    const res = await apiHandler<APIResponse<TResponse>>(endpoint, {
      method: options.method || 'GET',
      body: options.body,
      params: options.params,
      headers: options.headers,
    });
    return res;
  } catch (error) {
    return handleApiError<TResponse>(error);
  }
}

/**
 * Helper to build pagination params
 */
function buildPaginationParams(
  page?: number,
  limit?: number,
  additionalParams: Record<string, string | boolean | undefined> = {},
): Record<string, string> {
  const params: Record<string, string> = {
    page: page ? String(page) : '1',
    limit: limit ? String(limit) : '10',
  };

  // Add additional params, filtering out undefined values
  Object.entries(additionalParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params[key] = String(value);
    }
  });

  return params;
}

export {
  makeAuthenticatedRequest,
  makePublicRequest,
  buildPaginationParams,
  handleApiError,
};
