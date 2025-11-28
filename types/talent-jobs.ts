export interface JobDetailsResponse {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  salary: number;
  created_at: string;
  is_published: string;
  is_saved: boolean;
  status: string;

  category: Category;
  company: Company;
  country: Country;
  state: State;
  job_levels: JobLevel;
  job_type: JobType;
  track: Track;

  skills: Skill[];
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Country {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface State {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface JobLevel {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface JobType {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
