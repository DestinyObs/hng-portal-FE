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
  current_role: string;
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

// Main user data structure returned by API
export interface UserProfileData extends BaseUser {
  bio: UserBio | null;
  skills: { id: string; name: string }[];
  experiences: { id: string; name: string }[];
  portfolios: { id: string; name: string }[];
}

// Final API response
export interface UserProfileResponse {
  data: UserProfileData;
}
