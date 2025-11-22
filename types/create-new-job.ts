export interface JobFormData {
  // Step 1

  category: string;
  title: string;
  description: string;
  skills: string[];
  acceptanceCriteria: string;

  // Step 2
  track_id?: string;
  job_type_id?: string;
  work_mode_id?: string;
  price?: string;
  state?: string;
  country?: string;
}

export interface JobDetailsProps {
  initialData: JobFormData;
  onUpdate: (data: Partial<JobFormData>) => void;
  onNext?: () => void;
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
