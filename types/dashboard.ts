export type DasbhoardNavLinkProps = {
  title: string;
  value: string;
};

export type DasbhoardCardProps = {
  card: {
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    count: number;
    color: string;
  };
};

export type CompanyDashboardStats = {
  active_jobs_count: number;
  total_applicants_count: number;
  hires_completed_count: number;
};
