export interface ViewJobApplications {
  id: string;
  user_id: string;
  name: string;
  company_size: string | null;
  country: string | null;
  description: string | null;
  logo_url: string | null;
  official_email: string;
  onboarding_status: 'pending';
  is_verified: number;
  slug: string;
  state: string | null;
  status: 'active';
  website_url: string | null;
  total_applications: number;
  applications: JobApplicationItem[];
  created_at: string;
}

export interface JobApplicationItem {
  id: string;
  user_id: string;
  job_id: string;
  cover_letter: string;
  status: 'pending' | 'approved' | 'rejected';
  portfolio_link: string | null;
  resume: string; // URL
  user: ApplicantUser;
  job: JobDetails;
  date_added: string;
}

export interface ApplicantUser {
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
  roles: UserRole[];
  permissions: unknown[];
}

export interface UserRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: string;
    role_id: number;
  };
}

export interface JobDetails {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  salary: number;
  status: 'active' | 'inactive';
  is_published: 'published' | 'draft';
  created_at: string;
}
