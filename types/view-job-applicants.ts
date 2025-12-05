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
  title: string;
  user_id: string;
  job_id: string;
  cover_letter: string;
  status:
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'shortlisted'
    | 'in review'
    | 'interview'
    | 'hired';
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

export type JobsResponse = {
  success: boolean;
  message: string;
  data: JobsPagination;
  status: number;
};

export type JobsPagination = {
  current_page: number;
  data: Job[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  state: string;
  country: string;
  company_id: string;
  price: number | null;
  track_id: string;
  work_mode_id: string;
  category_id: string;
  job_type_id: string;
  job_level_id: string;
  publication_status: string;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  category: JobCategory;
  job_type: JobType;
  track: JobTrack;
  skills: JobSkill[];
  job_levels: JobLevel;
  work_modes: WorkMode;
  applications: JobApplicationItem[];
};

export type JobCategory = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type JobType = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type JobTrack = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type JobSkill = {
  id: string;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: JobSkillPivot;
};

export type JobSkillPivot = {
  job_listing_id: string;
  job_skill_id: string;
};

export type JobLevel = {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type WorkMode = {
  id: string;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Applicant = {
  id: string;
  user_id: string;
  job_id: string;
  cover_letter: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  portfolio_link: string | null;
  resume: string;
  user: User;
  job: Job;
  date_added: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  othername: string | null;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  dob: string | null;
  current_role: string;
  status: 'active' | 'inactive' | string;
  address_id: string | null;
  photo_url: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  roles: Role[];
  permissions: Permission[];
  media: Media[];
};

export type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
};

export type RolePivot = {
  model_type: string;
  model_id: string;
  role_id: number;
};

export type Permission = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export type Media = {
  id: number;
  model_type: string;
  model_id: string;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: unknown[];
  custom_properties: unknown[];
  generated_conversions: unknown[];
  responsive_images: unknown[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
};

export interface ViewJobApplications {
  data: JobApplicationItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ViewJobApplicationsLegacy {
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
