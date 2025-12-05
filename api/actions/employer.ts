import { makeAuthenticatedRequest } from '../config.server';
import { CompanyDashboardStats } from '@/types/dashboard';
import { APIResponse } from '@/types/api-response';

export async function getCompanyDashboardStats(
  companyId: string,
): Promise<APIResponse<CompanyDashboardStats>> {
  const response = await makeAuthenticatedRequest<CompanyDashboardStats>(
    `/employer/dashboard/${companyId}/stats`,
    {
      method: 'GET',
    },
  );
  return response;
}
