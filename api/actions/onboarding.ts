'use server';
import { makeAuthenticatedRequest } from '../config.server';
import { CompanyOnboardingResult } from '@/types/company-onboarding';

export async function saveCompanyOnboarding(
  formData: FormData,
): Promise<CompanyOnboardingResult> {
  try {
    const name = formData.get('companyName') as string | null;
    const description = formData.get('description') as string | null;
    const logo = formData.get('logo') as File | null;
    const industry = formData.get('industry') as string | null;
    const industryOther = formData.get('industryOther') as string | null;
    const size = formData.get('size') as string | null;
    const sizeOther = formData.get('sizeOther') as string | null;
    const website = formData.get('website') as string | null;
    const state = formData.get('state') as string | null;
    const country = formData.get('country') as string | null;

    const apiFormData = new FormData();

    if (name) apiFormData.append('name', name);
    if (description) apiFormData.append('description', description);
    if (logo && logo.size > 0) apiFormData.append('logo', logo);
    if (industry) {
      apiFormData.append(
        'industry',
        industry === 'other' ? industryOther || '' : industry,
      );
    }
    if (size) {
      apiFormData.append(
        'company_size',
        size === 'other' ? sizeOther || '' : size,
      );
    }
    if (website) apiFormData.append('website_url', website);
    if (state) apiFormData.append('state', state);
    if (country) apiFormData.append('country', country);

    const result = await makeAuthenticatedRequest('/employer/onboarding', {
      method: 'POST',
      body: apiFormData as any,
      headers: {},
    });
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return {
        success: false,
        error: result.message || 'Failed to save company information',
        details: result,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      details: error,
    };
  }
}
