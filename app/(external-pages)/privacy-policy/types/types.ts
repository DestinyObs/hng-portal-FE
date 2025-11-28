export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface SidebarProps {
  sections: PolicySection[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export interface PolicySectionProps {
  section: PolicySection;
  isActive: boolean;
}

export interface ContentAreaProps {
  sections: PolicySection[];
  activeSection: string;
}
