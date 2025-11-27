export type DasbhoardNavLinkProps = {
  navLinks: {
    title: string;
    href: string;
  }[];
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
