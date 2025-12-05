export interface JobFormData {
  // Step 1

  category_id: string;
  title: string;
  description: string;
  skills: { id: string; name: string }[];
  acceptance_criteria: string;
  job_level_id: string;
  company_id: string;

  // Step 2
  track_id?: string;
  job_type_id?: string;
  work_mode_id?: string;
  price?: number;
  state?: string;
  country?: string;
  state_id: string;
  country_id: string;
}
export interface JobFormData2 {
  // Step 1
  category_id: string;
  title: string;
  description: string;
  skills: string[] | { id: string; name: string }[];
  acceptance_criteria: string;
  job_level_id: string;

  // Step 2
  track_id?: string;
  job_type_id?: string;
  work_mode_id?: string;
  price?: number;
  state?: string;
  country?: string;
  state_id: string;
  country_id: string;
  company_id: string;
}

export interface JobDetailsProps {
  initialData: JobFormData2;
  onUpdate: (data: Partial<JobFormData2>) => void;
  onNext?: () => void;
  id?: string;
}

export interface RichTextToolbarProps {
  onBold?: () => void;
  onItalic?: () => void;
  onHeading?: () => void;
  onBulletList?: () => void;
  onNumberedList?: () => void;
  onLink?: () => void;
  onCode?: () => void;
  onImage?: () => void;
}
