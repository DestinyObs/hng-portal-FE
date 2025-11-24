import {
  BarChart3,
  Database,
  Lightbulb,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const tracks = [
  {
    id: 'ui-ux',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'I design clean, intuitive, user-centered digital experiences',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'frontend',
    icon: Palette,
    title: 'Frontend Development',
    description:
      'I build responsive, interactive interfaces using modern web technologies',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'backend',
    icon: Server,
    title: 'Backend Development',
    description:
      'I develop secure, scalable server logic and APIs that power applications',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'I create fast, user-friendly mobile apps for iOS and Android',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'product',
    icon: Lightbulb,
    title: 'Product Management',
    description:
      'I define product strategy and guide teams to build solutions users love',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    id: 'data-science',
    icon: BarChart3,
    title: 'Data Science',
    description:
      'I analyze data and build models to uncover insights and drive decisions',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'devops',
    icon: Database,
    title: 'DevOps Engineering',
    description:
      'I streamline development and deployment with automation and scalable infrastructure.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'cybersecurity',
    icon: ShieldCheck,
    title: 'Cybersecurity',
    description:
      'I protect systems, data, and networks from security risks and strengthening defenses',
    color: 'bg-amber-100 text-amber-600',
  },
];
