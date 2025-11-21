import {
  FooterSections,
  SocialLinks,
} from '@/public/assets/images/landing-page/shared/constants';
import FooterImage from '@/public/assets/images/landing-page/shared/footerImage.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="mt-10 lg:mt-20" role="contentinfo">
      <Image
        src={FooterImage}
        alt="Footer decorative image"
        width={1200}
        height={400}
        className="w-full"
      />
      <div className="bg-tertiary-300">
        <div className="lg:max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-0 pt-20 py-10 md:py-14 lg:py-16">
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 xl:gap-32 mb-8">
              {FooterSections.map((section) => (
                <div key={section.title} className={section.className}>
                  <h3 className="text-xl lg:text-xl text-tertiary-50 font-bold mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-75 hover:text-primary-blue transition text-base lg:text-sm font-dm_sans focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 rounded"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="mt-16 lg:mt-20">
            <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-9 sm:gap-0">
              <p className="text-tertiary-75 text-sm font-dm_sans mt-4 md:mt-0">
                © 2025 HNG Portal. All rights reserved.
              </p>

              <div
                className="flex items-center justify-center space-x-4"
                role="navigation"
                aria-label="Social media links"
              >
                {SocialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={`Visit our ${social.label} page`}
                      className="focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 rounded"
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t mt-2 sm:mt-8">
            <h2 className="text-white-300 font-bold text-3xl md:text-6xl lg:text-8xl pt-4 pb-4 md:pr-5 lg:pr-0">
              HNG: Empowering Tech
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
