export interface JobCardProps {
  id: string;
  title: string;
  status: string;
  applicants?: number;
  job_type: {
    name: string;
  };
  job_level: {
    name: string;
  };
  created_at: string | undefined;
  countries: {
    name: string;
  };
}

export interface Job {
  id?: string;
  category?: string;
  title: string;
  description: string;
  skills: string[];
  acceptance_criteria: string;
  track?: string;
  job_type: string;
  work_mode: string;
  price?: string;
  state?: string;
  country?: string;
  company: string;
  companyLogo?: string;
  salary?: string;
  location?: string;
  workType?: string;
  level?: string;
  onsiteOrRemote?: string;
  posted?: string;
  applyLink?: string;
}

export interface RawJob {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  state_id: string;
  country_id: string;
  company_id: string;
  price?: string;
  track_id?: string;
  work_mode_id?: string;
  category_id?: string;
  job_type_id?: string;
  job_level_id?: string;
  publication_status?: string;
  status?: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
  company?: {
    name: string;
    logo_url?: string;
  };
  skills?: {
    id: string;
    name: string;
  }[];
  track?: {
    name: string;
  };
  job_type?: {
    name: string;
  };
  work_mode?: {
    name: string;
  };
  job_levels?: {
    name: string;
  };
  state?: string;
  country?: string;
}

export interface TalentJob {
  id: string;
  is_saved: boolean;
  title: string;
  description: string;
  acceptance_criteria: string;
  state_id: string;
  country_id: string;
  company_id: string;
  salary?: string;
  track_id?: string;
  work_mode_id?: string;
  category_id?: string;
  job_type_id?: string;
  job_level_id?: string;
  publication_status?: string;
  status?: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
  company?: {
    name: string;
    logo_url?: string;
  };
  skills?: {
    id: string;
    name: string;
  }[];
  track?: {
    name: string;
  };
  job_type?: {
    name: string;
  };
  work_mode?: {
    name: string;
  };
  job_levels?: {
    name: string;
  };
  state?: {
    name: string;
  };
  country?: {
    name: string;
  };
}

export interface TalentJobsQueryParams {
  work_mode?: string[];
  job_type?: string[];
  job_level?: string[];
  location?: string[];
  skills?: string[];
  page?: number;
  per_page?: number;
  sort?: 'newest' | 'oldest';
}

export type ApplicationStatus =
  | 'Shortlisted'
  | 'Hired'
  | 'Applied'
  | 'Interviewed'
  | 'Rejected';

export interface TalentApplication {
  id: string;
  status: ApplicationStatus;
  created_at: string;
  job: {
    id: string;
    title: string;
    description: string;
    skills: { name: string }[];
    job_type: { name: string };
    work_mode: { name: string };
    salary: string;
    job_level: { name: string };
    country: { name: string };
    state: { name: string };
    company: {
      name: string;
      logo_url: string;
    };
  };
}
