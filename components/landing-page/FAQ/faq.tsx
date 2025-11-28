import { Accordion } from '../../shared/ui/accordion';

const faq = [
  {
    title: 'What is HNG Connect?',
    content:
      'HNG Connect is a job platform that connects verified HNG Internship talents with recruiters looking for real, proven skills. It organizes internship tasks, projects, and endorsements into structured profiles that make hiring easier and more transparent.',
  },
  {
    title: 'Is it free to create a talent profile?',
    content:
      'Yes, creating a talent profile on HNG Connect is completely free.',
  },
  {
    title: 'How long does it take to get approved as a verified talent?',
    content:
      'The verification process usually takes a few days after submission, depending on the completeness of your profile and task submissions.',
  },
  {
    title: 'How does job matching work?',
    content:
      'HNG Connect matches your verified skills, tasks, and projects with recruiter requirements, making it easier for companies to find candidates with the exact skills they need.',
  },
  {
    title: 'Can I edit my profile later?',
    content:
      'Yes, you can update and edit your profile at any time to add new skills, projects, or endorsements.',
  },
];

export const FAQ = () => {
  return (
    <div className="py-12 pt-24 sm:pt-32">
      {/* heading ---  */}
      <div className="top text-center">
        <div className="first-text p-2 px-5 border border-primary-blue text-primary-blue inline-block rounded-full text-subtitle tracking-wide font-medium">
          FAQs
        </div>
        <h2 className="heading py-3 text-h4 font-medium">
          Frequently <br /> Asked Questions
        </h2>

        <p className="short-note leading-normal mx-auto text-[#4E4A4A] text-[18px]">
          Here’s a quick guide to help talents and recruiters understand how HNG{' '}
          <br /> Connect works within the HNG ecosystem.
        </p>
      </div>

      {/* accordion */}
      <div className="accordion w-full sm:max-w-[75%] mx-auto py-8 px-3 sm:px-0">
        <Accordion content={faq} />
      </div>
    </div>
  );
};
