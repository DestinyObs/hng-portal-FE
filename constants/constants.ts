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
