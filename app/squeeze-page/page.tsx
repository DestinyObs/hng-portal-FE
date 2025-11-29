import WaitlistForm from '@/components/external-pages/waitlist-form';
import WaitlistSection from '@/components/external-pages/waitlist-section';
import CustomerReview from '@/components/landing-page/customer-review/customer-review';
import { squeeze_benefits } from '@/constants/constants';
import Image from 'next/image';
import Link from 'next/link';

const SqueezePage = () => {
  return (
    <div className="bg-white w-full px-5 lg:px-0">
      <header className="w-full pt-6 mx-auto flex justify-center bg-white max-w-[1440px]">
        <Image
          src="/images/hng-connect-logo.png"
          alt="HNG Connect Logo"
          width={140}
          height={60}
        />
      </header>

      <section className="mt-24">
        <div className="text-center max-w-3xl mx-auto md:px-12 lg:px-6 px-6 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-h3 font-bold text-foreground mb-4">
            Where Skilled Talent Meets Companies Ready To Hire
          </h2>
          <p className="text-gray-20 text-sm md:text-base lg:text-body-1">
            HNG Connect links you to a broad talent and company network. You get
            tools that support growth, visibility, and hiring across many
            fields.
          </p>
        </div>
        <WaitlistSection />
      </section>

      <section className="">
        <div className="mt-18 md:mt-10 lg:mt-0 text-center max-w-3xl mx-auto md:px-12 lg:px-6 px-6 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-h3 font-bold text-foreground mb-4">
            Why Join HNG Connect?
          </h2>
          <p className="text-gray-20 text-sm md:text-base lg:text-body-1">
            One network, built to deliver real value on both sides of the table.
            See how HNG delivers for both talents building careers and companies
            building teams.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-10">
          <div className="w-full md:h-56 px-6 lg:px-0 lg:w-3/4">
            <Image
              src="/images/why-join-squeeze.jpg"
              alt="Why Join Us"
              width={518}
              height={574}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex justify-end pr-5 lg:pr-0">
            <div className="w-full md:h-56 md:w-[90%] lg:w-3/4">
              <Image
                src="/images/why-join-squeeze2.jpg"
                alt="Why Join Us"
                width={618}
                height={674}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="my-24 py-10 bg-[url(/images/bg-members.png)] bg-cover px-5 md:px-24 lg:px-56">
        <div className="text-center max-w-3xl mx-auto md:px-12 lg:px-6 px-6 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-h3 font-bold text-foreground mb-4">
            A Smarter Way to Connect Talent and Opportunity
          </h2>
          <p className="text-gray-20 text-sm md:text-base lg:text-body-1">
            HNG delivers talents to companies with precisions- matched skills,
            ensuring an exact for your project needs!
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {squeeze_benefits.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-4 py-5 px-5 rounded-lg shadow bg-white md:px-6"
              >
                <aside className="size-12">
                  <Image
                    src={'/images/preference.png'}
                    alt="Preference icon"
                    width={120}
                    height={80}
                    className="size-full"
                  />
                </aside>
                <p className="font-medium text-sm">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="my-10 px-6">
        <CustomerReview />
      </section>

      <section className="mt-24">
        <div className="text-center max-w-3xl mx-auto md:px-12 lg:px-6 px-6 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-h3 font-bold text-foreground mb-4">
            One Platform, Two Powerful Outcomes
          </h2>
          <p className="text-gray-20 text-sm md:text-base lg:text-body-1">
            For talents, it’s visibility and opportunity. For companies, it’s
            access and efficiency
          </p>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/3 md:mx-auto">
          <div className="ml-0">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer
        className="border-t border-t-gray-100/10 py-5 mt-20
      "
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground px-6 md:px-10 lg:px-[60px]">
          <Image
            src="/images/hng-connect-logo.png"
            alt="HNG Connect Logo"
            width={120}
            height={40}
          />

          <div className="flex flex-row flex-wrap items-center gap-4 text-foreground justify-center md:justify-start">
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
            <Link href={'/contact-us'}>Contact Us</Link>

            <span>© 2025 HNG Connect</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default SqueezePage;
