import {
  FacebookIcon,
  HNGInternshipIcon,
  HNGPortalIcon,
  InstagramIcon,
  LearnIcon,
  LinkedInIcon,
  PremiumIcon,
  TwitterIcon,
} from './icons';

export const NavLinks = [
  { label: 'HNG Portal', href: '/', active: true, icon: <HNGPortalIcon /> },
  { label: 'HNG Internship', href: '#', icon: <HNGInternshipIcon /> },
  { label: 'Learn', href: '#', icon: <LearnIcon /> },
  { label: 'Premium', href: '#', icon: <PremiumIcon /> },
];

export const LinkClasses =
  'font-medium text-xl text-gray-200 font-dm_sans hover:text-primary-blue transition';

export const SocialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
];

export const FooterSections = [
  {
    title: 'FOR TALENTS',
    links: [
      { label: 'HNG Learn', href: '#' },
      { label: 'HNG Internship', href: '#' },
      { label: 'HNG Network', href: '#' },
      { label: 'HNG Products', href: '#' },
    ],
  },
  {
    title: 'FOR COMPANIES',
    links: [{ label: 'Hire Talents', href: '#' }],
    className: 'md:ml-8 lg:ml-0',
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
    className: 'md:ml-20',
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Contact Support', href: 'mailto:support@hng.tech' },
    ],
    className: 'lg:ml-20',
  },
];
