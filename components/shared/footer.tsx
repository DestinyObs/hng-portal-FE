import Image from 'next/image';
import Logo from './logo.png';

const Footer = () => {
  return (
    <>
    <footer className=" bg-linear-to-b from-white-50 to-[#DBF3FF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-0 py-12 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-28 mb-8">
          <div>
            <h3 className="text-xl leading-[120%] text-(--color-primary-black) font-bold md:font-semibold mb-4">
              For Talents
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#hng-learn"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  HNG Learn
                </a>
              </li>
              <li>
                <a
                  href="#hng-internship"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  HNG Internship
                </a>
              </li>
              <li>
                <a
                  href="#hng-network"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  HNG Network
                </a>
              </li>
              <li>
                <a
                  href="#find-jobs"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Find Jobs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl leading-[120%] text-(--color-primary-black) font-bold md:font-semibold mb-4">
              For Companies
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#hire-talents"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Hire Talents
                </a>
              </li>
            </ul>
          </div>

           <div>
            <h3 className="text-xl leading-[120%] text-(--color-primary-black) font-bold md:font-semibold mb-4">
              About Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#hire-talents"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#hire-talents"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#hire-talents"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

           <div>
            <h3 className="text-xl leading-[120%] text-(--color-primary-black) font-bold md:font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#blog"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@hng.portal"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  support@hng.tech
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl leading-[120%] text-(--color-primary-black) font-bold md:font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#privacy"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Terms of Service
                </a>
              </li>
               <li>
                <a
                  href="#cookies"
                  className="text-(--color-gray-20) hover:text-(--color-primary-blue) transition text-[18px]"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start lg:items-center">
            <div className=" flex flex-col gap-4 mb-4 md:mb-0">
              <Image
                src={Logo}
                width={200}
                height={200}
                alt="HNG Portal Logo"
              />
              <p className="text-(--color-primary-black) text-sm">
                © 2025 HNG Portal. All rights reserved.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a href="#facebook">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.3332 21.586C29.3332 26.4394 26.4398 29.3327 21.5865 29.3327H19.9998C19.2665 29.3327 18.6665 28.7327 18.6665 27.9993V20.306C18.6665 19.946 18.9598 19.6394 19.3198 19.6394L21.6665 19.5994C21.8532 19.586 22.0132 19.4527 22.0532 19.266L22.5199 16.7194C22.5599 16.4794 22.3732 16.2527 22.1198 16.2527L19.2798 16.2927C18.9065 16.2927 18.6132 15.9994 18.5999 15.6394L18.5465 12.3727C18.5465 12.1593 18.7198 11.9727 18.9465 11.9727L22.1465 11.9194C22.3731 11.9194 22.5465 11.746 22.5465 11.5194L22.4932 8.31934C22.4932 8.09267 22.3198 7.91935 22.0932 7.91935L18.4932 7.9727C16.2798 8.0127 14.5199 9.82601 14.5599 12.0393L14.6265 15.706C14.6398 16.0793 14.3465 16.3727 13.9732 16.386L12.3732 16.4127C12.1465 16.4127 11.9732 16.586 11.9732 16.8127L12.0132 19.346C12.0132 19.5727 12.1865 19.746 12.4132 19.746L14.0132 19.7194C14.3865 19.7194 14.6798 20.0127 14.6932 20.3727L14.8132 27.9727C14.8265 28.7194 14.2265 29.3327 13.4798 29.3327H10.4132C5.55983 29.3327 2.6665 26.4393 2.6665 21.5727V10.4127C2.6665 5.55935 5.55983 2.66602 10.4132 2.66602H21.5865C26.4398 2.66602 29.3332 5.55935 29.3332 10.4127V21.586V21.586Z"
                    fill="#000D13"
                  />
                </svg>
              </a>

              <a href="#instagram">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5865 2.66602H10.4132C5.55984 2.66602 2.6665 5.55935 2.6665 10.4127V21.5727C2.6665 26.4394 5.55984 29.3327 10.4132 29.3327H21.5732C26.4265 29.3327 29.3198 26.4394 29.3198 21.586V10.4127C29.3332 5.55935 26.4398 2.66602 21.5865 2.66602ZM15.9998 21.1727C13.1465 21.1727 10.8265 18.8527 10.8265 15.9993C10.8265 13.146 13.1465 10.826 15.9998 10.826C18.8532 10.826 21.1732 13.146 21.1732 15.9993C21.1732 18.8527 18.8532 21.1727 15.9998 21.1727ZM23.8932 9.17268C23.8265 9.33268 23.7332 9.47935 23.6132 9.61268C23.4798 9.73268 23.3332 9.82602 23.1732 9.89268C23.0132 9.95935 22.8398 9.99935 22.6665 9.99935C22.3065 9.99935 21.9732 9.86602 21.7198 9.61268C21.5998 9.47935 21.5065 9.33268 21.4398 9.17268C21.3732 9.01268 21.3332 8.83935 21.3332 8.66602C21.3332 8.49268 21.3732 8.31935 21.4398 8.15935C21.5065 7.98602 21.5998 7.85268 21.7198 7.71935C22.0265 7.41268 22.4932 7.26602 22.9198 7.35935C23.0132 7.37268 23.0932 7.39935 23.1732 7.43935C23.2532 7.46602 23.3332 7.50602 23.4132 7.55935C23.4798 7.59935 23.5465 7.66602 23.6132 7.71935C23.7332 7.85268 23.8265 7.98602 23.8932 8.15935C23.9598 8.31935 23.9998 8.49268 23.9998 8.66602C23.9998 8.83935 23.9598 9.01268 23.8932 9.17268Z"
                    fill="#000D13"
                  />
                </svg>
              </a>
              <a href="#youtube">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.6665 5.33398H9.33317C5.33317 5.33398 2.6665 8.00065 2.6665 12.0007V20.0007C2.6665 24.0007 5.33317 26.6673 9.33317 26.6673H22.6665C26.6665 26.6673 29.3332 24.0007 29.3332 20.0007V12.0007C29.3332 8.00065 26.6665 5.33398 22.6665 5.33398ZM18.5199 17.374L15.2265 19.3473C13.8931 20.1473 12.7998 19.534 12.7998 17.974V14.014C12.7998 12.454 13.8931 11.8407 15.2265 12.6407L18.5199 14.614C19.7865 15.3873 19.7865 16.614 18.5199 17.374Z"
                    fill="black"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </footer>
      </>
  );
};

export default Footer;
