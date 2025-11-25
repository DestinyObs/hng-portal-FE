export interface CompanyOnboardingResult {
  success: boolean;
  data?: {
    id: string;
    user_id: string;
    name: string;
    slug: string;
    description: string;
    logo_url: string | null;
    industry: string;
    company_size: string;
    state: string;
    country: string;
    website_url: string;
    is_verified: number;
    official_email: string;
    onboarding_status: 'pending' | 'complete';
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user?: {
      id: string;
      firstname: string;
      lastname: string;
      othername: string | null;
      email: string;
      email_verified_at: string | null;
      phone: string | null;
      dob: string | null;
      current_role: string;
      status: string;
      address_id: string | null;
      photo_url: string | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      roles: unknown[];
      permissions: unknown[];
    };
  };
  error?: string;
  message?: string;
  details?: {
    errors?: Record<string, string | string[]>;
    [key: string]: unknown;
  };
}
