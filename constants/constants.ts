import { homepageIcons } from '@/public/assets/auth/icons';

export const STEPS = [
  {
    number: 1,
    icon: homepageIcons.user,
    title: 'Create Your Profile',
    description:
      'Set up your profile with your projects, skills, tools, and endorsements so recruiters can quickly understand your strengths.',
    imagePlaceholder: '/images/external-page-talent-1.png',
  },
  {
    number: 2,
    icon: homepageIcons.link,
    title: 'Match With Jobs or Talent',
    description:
      'Talents receive recommended roles based on their experience. Recruiters get a curated list of verified candidates.',
    imagePlaceholder: '/images/external-page-talent-2.png',
  },
  {
    number: 3,
    icon: homepageIcons.star,
    title: 'Connect & Start Hiring',
    description:
      'Message talents or recruiters directly inside the platform, manage applications, track interest, and move the hiring process forward without switching tools.',
    imagePlaceholder: '/images/external-page-talent-3.png',
  },
];

export const job = {
  id: 'job-001',
  category: 'Frontend Development',
  title: 'Frontend Developer',
  description:
    'Nexos is seeking a talented Frontend Developer to build fast, intuitive, and scalable user interfaces. You will collaborate with designers and backend engineers to deliver seamless experiences across web platforms.',
  skills: ['React', 'TypeScript', 'Figma', 'CSS'],
  acceptance_criteria:
    '1. Deliver fully functional responsive web pages.\n2. Ensure code quality and maintainability.\n3. Collaborate with designers and backend engineers.\n4. Submit final design assets and prototypes on time.',
  track: 'Engineering',
  job_type: 'Full Time',
  work_mode: 'Remote',
  price: '1500',
  state: 'Lagos',
  country: 'Nigeria',
  company: 'NexoLabs',
  salary: '₦125,000',
  location: 'Lagos, Nigeria',
  workType: 'Remote',
  level: 'Entry Level',
  onsiteOrRemote: 'Remote',
  posted: 'Yesterday',
  applyLink: 'https://hngportal.com/apply/BRIGHTLABS-UX-001',
};
