import TermsOfServiceAndPrivacy from '@/components/external-pages/terms-privacy';
import {
  TERMS_OF_SERVICE_CONTENT,
  TERMS_OF_SERVICE_SECTIONS,
} from '@/constants/terms-of-service';

export default function TermsOfService() {
  return (
    <TermsOfServiceAndPrivacy
      defaultActiveSection="introduction"
      lastUpdate="Last Updated 24/11/2025"
      sectionsTab={TERMS_OF_SERVICE_SECTIONS}
      sectionContent={TERMS_OF_SERVICE_CONTENT}
      title="Terms of Service"
    />
  );
}
