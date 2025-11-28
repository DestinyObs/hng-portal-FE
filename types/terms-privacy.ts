export interface SectionsTab {
  id: string;
  label: string;
}

export interface SectionContent {
  id: string;
  sectionId: string;
  title: string;
  subtitle: React.ReactNode;
}

export interface TermsAndPrivacyProps {
  defaultActiveSection: string;
  title: string;
  lastUpdate: string;
  sectionsTab: SectionsTab[];
  sectionContent: SectionContent[];
}
