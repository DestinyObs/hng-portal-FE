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
