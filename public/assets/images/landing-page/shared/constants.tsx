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
  { label: 'HNG Connect', href: '/', active: true, icon: <HNGPortalIcon /> },
  {
    label: 'HNG Internship',
    href: 'https://hng.tech/internship',
    icon: <HNGInternshipIcon />,
  },
  { label: 'Learn', href: 'https://hng.tech/learn', icon: <LearnIcon /> },
  { label: 'Premium', href: 'https://hng.tech/premium', icon: <PremiumIcon /> },
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
      { label: 'HNG Learn', href: 'https://hng.tech/learn' },
      { label: 'HNG Internship', href: 'https://hng.tech/internship' },
      { label: 'HNG Network', href: 'https://hng.tech/premium' },
      { label: 'HNG Products', href: 'https://hng.tech/products' },
    ],
  },
  {
    title: 'FOR COMPANIES',
    links: [{ label: 'Hire Talents', href: 'https://hng.tech/hire' }],
    className: 'md:ml-8 lg:ml-0',
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: 'https://hng.tech/privacy' },
      { label: 'Terms of Service', href: 'https://hng.tech/terms' },
      { label: 'Cookies', href: '#' },
    ],
    className: 'md:ml-20',
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Blog', href: 'https://hng.tech/blog' },
      { label: 'Help Center', href: '#' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Contact Support', href: 'mailto:support@hng.tech' },
    ],
    className: 'lg:ml-20',
  },
];
