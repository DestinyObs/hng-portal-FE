export interface Feature {
  image: string;
  header: string;
  description: string;
}

export interface Roles {
  id: number;
  name: string;
  guard_name: string;
}
export interface Permissions {
  id: number;
  name: string;
  guard_name: string;
}
export interface User {
  id: string;
  firstname: string | null;
  lastname: string | null;
  othername: string | null;
  current_role: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  dob: string | null;
  status: string;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  company: Company | null;
}

export interface Role {
  id: number;
  name: 'talent' | 'employer';
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
}

export interface RolePivot {
  model_type: string;
  model_id: string;
  role_id: number;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  country_id: string | null;
  website_url: string | null;
  is_verified: number;
  official_email: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserData {
  user: User;
  token: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  firstname?: string;
  lastname?: string;
  company_name?: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface RegisterResponseData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
}

export interface UserProfileData {
  id: string;
  user_id: string;
  content: string | null;
  min_salary: number | null;
  max_salary: number | null;
  track_id: number | null;
  is_verified: number; // or boolean if your API converts it
  links: string | null;
  cv_id: string | null;
  current_role: string;
  bio: string | null;
  project_name: string | null;
  project_url: string | null;
  state: string | null;
  country: string | null;
  onboarding_status: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media: any[]; // update if you know the media type
}

export interface Pivot {
  model_type: string;
  model_id: string;
  role_id: number;
}
