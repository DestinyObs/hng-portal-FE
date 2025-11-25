export type APIResponse<T> = {
  success: boolean | 'true' | 'false';
  message: string;
  status: number;
  data: T;
  errors?: Record<string, string[]>;
};

export function buildPaginationParams(
  page?: number,
  limit?: number,
  additionalParams: Record<string, string | boolean | undefined> = {},
): Record<string, string> {
  const params: Record<string, string> = {
    page: page ? String(page) : '1',
    limit: limit ? String(limit) : '10',
  };

  Object.entries(additionalParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params[key] = String(value);
    }
  });

  return params;
}
