import { FAQAccordion } from '@/components/faq/accordion-section';
import { Hero } from '@/components/faq/hero';

const FAQPage = () => {
  return (
    <main>
      <Hero />

      <FAQAccordion />

      {/* contact us form */}
      <div className="bg-red-50 max-w-4xl mx-auto"></div>
    </main>
  );
};

export default FAQPage;
