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
  name: string;
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
  token: '1|abc123def456ghi789jkl012mno345pqr678';
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
