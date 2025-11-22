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
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  phone: string;
  dob: string;
  status: string;
  photo_url: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  roles: Roles[];
  permissions: Permissions[];
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
