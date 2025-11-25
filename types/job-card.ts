export interface JobCardProps {
  id: string;
  title: string;
  status: string;
  applicants?: number;
  job_type: {
    name: string;
  };
  created_at: string | undefined;
  countries: {
    name: string;
  };
}

export interface Job {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: { id: string; name: string }[];
  acceptance_criteria: string;
  track: string;
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
