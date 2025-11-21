export interface JobFormData {
  // Step 1

  category: string;
  title: string;
  description: string;
  skills: string[];
  acceptanceCriteria: string;

  // Step 2
  hngTrack?: string;
  jobType?: string;
  candidateLocation?: string;
  jobPrice?: string;
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

export const HNG_TRACKS = [
  'Front-end Development',
  'Back-end Development',
  'Mobile Development',
  'UI/UX Design',
  'DevOps',
  'Data Science',
];

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
];

export const CANDIDATE_LOCATIONS = ['Remote', 'On-site', 'Hybrid'];
