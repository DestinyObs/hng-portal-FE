// Pivot inside roles
export interface RolePivot {
  model_type: string;
  model_id: string;
  role_id: number;
}

// Role object
export interface UserRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
}

// Base User Interface (reused inside bio.user)
export interface BaseUser {
  id: string;
  firstname: string;
  lastname: string;
  othername: string | null;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  dob: string | null;
  current_role: 'employer' | 'talent';
  status: string;
  address_id: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  roles: UserRole[];
}

// Bio section
export interface UserBio {
  id: string;
  user_id: string;
  content: string | null;
  min_salary: number | null;
  max_salary: number | null;
  track_id: string | null;
  is_verified: number; // 0 or 1
  links: string | null;
  cv_id: string | null;
  current_role: string;
  bio: string | null;
  experience: string | null;
  available_status: string | null;
  job_type_preference: string | null;
  project_name: string | null;
  project_url: string | null;
  project_file_url: string | null;
  state: string | null;
  country: string | null;
  onboarding_status: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: BaseUser;
}
import { Experience } from './profile-settings';

// Main user data structure returned by API
export interface UserProfileData extends BaseUser {
  bio: UserBio | null;
  skills: { id: string; name: string }[];
  experiences: Experience[];
  portfolios: { id: string; name: string }[];
}

// Final API response
export interface UserProfileResponse {
  data: UserProfileData;
}

export interface CompanyMedia {
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
  manipulations: string | null;
  custom_properties: string | null;
  generated_conversions: string | null;
  responsive_images: string | null;
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface CompanyOwner extends BaseUser {
  _placeholder?: string;
}

export interface CompanyProfileData {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  industry: string;
  company_size: string;
  state: string;
  country: string;
  website_url: string;
  is_verified: number;
  official_email: string;
  onboarding_status: string;
  status: string;
  tagline: string | null;
  value_proposition: string | null;
  why_talents_should_work_with_us: string | null;
  created_at: string;
  updated_at: string;
  user: CompanyOwner;
  media: string | null;
}

export interface CompanyProfileResponse {
  data: CompanyProfileData;
}
