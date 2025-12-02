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
  'text-sm text-gray-200 font-dm_sans hover:text-primary-blue transition';

export const SocialLinks = [
  {
    icon: FacebookIcon,
    href: 'https://web.facebook.com/hngtech/',
    label: 'Facebook',
  },
  { icon: TwitterIcon, href: 'https://x.com/hnginternship', label: 'Twitter' },
  {
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/company/hng-internship/',
    label: 'LinkedIn',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/hngtech',
    label: 'Instagram',
  },
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
      { label: 'Privacy Policy', href: 'privacy-policy' },
      { label: 'Terms of Service', href: 'terms-of-service' },
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
      { label: 'Contact Us', href: '/contact-us' },
    ],
    className: 'lg:ml-20',
  },
];

export const nextArticles = [
  {
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque faucibus. Aliquet tellus venenatis tristique bibendum lectus.',
    cta: 'See more',
    image: '/images/blogImg.jpg',
  },
  {
    title: 'Tech in 2025: A Saturated Space or No?',
    description:
      'Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque faucibus. Aliquet tellus venenatis tristique bibendum lectus.',
    cta: 'See more',
    image: '/images/blogImg.jpg',
  },
  {
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque faucibus. Aliquet tellus venenatis tristique bibendum lectus.',
    cta: 'See more',
    image: '/images/blogImg.jpg',
  },
  {
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque faucibus. Aliquet tellus venenatis tristique bibendum lectus.',
    cta: 'See more',
    image: '/images/blogImg.jpg',
  },
  {
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque faucibus. Aliquet tellus venenatis tristique bibendum lectus.',
    cta: 'See more',
    image: '/images/blogImg.jpg',
  },
];
