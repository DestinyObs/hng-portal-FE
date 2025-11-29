export interface Skill {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    user_id: string;
    skill_id: string;
  };
}

export interface Role {
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

export interface Media {
  // Empty array in the response, so defining a minimal structure
  // Add properties as they appear in actual data
  [key: string]: any;
}

export interface Experience {
  id: string;
  user_id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
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
  roles: Role[];
  permissions: any[];
}

export interface Bio {
  id: string;
  user_id: string;
  content: string | null;
  min_salary: number | null;
  max_salary: number | null;
  track_id: string | null;
  is_verified: number;
  links: any | null;
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
  user: User;
  media: Media[];
}

export interface UserProfile extends User {
  bio: Bio;
  skills: Skill[];
  experiences: Experience[];
  portfolios: Portfolio[];
}

export interface ProfileData {
  success: boolean;
  message: string;
  data: UserProfile;
  status: number;
}

// Request types for updating profile
export interface UpdateProfileRequest {
  firstname: string;
  lastname: string;
  othername?: string | null;
  phone?: string | null;
  dob?: string | null;
}

// Response types for updating profile
export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

// Request types for adding work experience
export interface AddWorkExperienceRequest {
  company_name: string;
  start_date: string; // MM/DD/YYYY format
  end_date: string | null; // MM/DD/YYYY format or null for present
  job_title: string;
  description: string;
}

// Response types for work experience
export interface AddWorkExperienceResponse {
  success: boolean;
  message?: string;
  data?: Experience;
}

// Request types for adding portfolio
export interface AddPortfolioRequest {
  title: string;
  description?: string | null;
  url: string;
  image_url?: string | null;
}

// Request types for updating portfolio
export interface UpdatePortfolioRequest {
  title?: string;
  description?: string | null;
  url?: string;
  image_url?: string | null;
}

// Response types for portfolio
export interface AddPortfolioResponse {
  success: boolean;
  message?: string;
  data?: Portfolio;
}

export interface UpdatePortfolioResponse {
  success: boolean;
  message?: string;
  data?: Portfolio;
}
