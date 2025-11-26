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

export interface CompanyOnboardingRequest {
  logo?: File;
  name?: string;
  description?: string;
  industry?: string;
  company_size?: string;
  website_url?: string;
  state_id?: string;
  country_id?: string;
}

export interface CompanyResponse {
  id: string;
  name: string;
  description: string;
  industry?: string;
  company_size?: string;
  website_url?: string;
  logo_url?: string;
  state_id?: string;
  country_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxDesktopPages?: number;
}
export interface ConfirmationModalProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  onGoToDashboard: () => void;
}
