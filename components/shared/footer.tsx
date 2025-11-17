const footer = () => {
  return (
    <footer className="bg-(--color-white-50)">
      <div className="max-w-[1258px] mx-auto px-4 sm:px-8 lg:px-10 py-12 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-40 mb-8">
            <div>
              <h3 className="text-body-2 text-(--color-primary-black) font-bold mb-4 tracking-wide">
                FOR TALENTS
              </h3>
              <ul className="space-y-3">
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
              <h3 className="text-body-2 text-(--color-primary-black) font-bold mb-4 tracking-wide">
                FOR COMPANIES
              </h3>
              <ul className="space-y-3">
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
              <h3 className="text-body-2 text-(--color-primary-black) font-bold mb-4 tracking-wide">
                LEGAL
              </h3>
              <ul className="space-y-3">
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
              </ul>
            </div>

            <div>
              <h3 className="text-body-2 text-(--color-primary-black) font-bold mb-4 tracking-wide">
                SUPPORT
              </h3>
              <ul className="space-y-3">
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
                    support@hng.portal
                  </a>
                </li>
              </ul>
            </div>
          </div>

        <div className="mt-12 pt-6">
          <div className="bg-(--color-white-300) rounded-2xl px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start lg:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-(--color-primary-black) text-sm">
                © 2025 HNG Portal. All rights reserved.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a href="#facebook">
                <svg
                  width="7"
                  height="14"
                  viewBox="0 0 7 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.78694 14V7.43079H0V5.06556H1.78694V3.04535C1.78694 1.45785 2.84249 0 5.27471 0C6.25947 0 6.98766 0.09177 6.98766 0.09177L6.93028 2.30049C6.93028 2.30049 6.18765 2.29347 5.37725 2.29347C4.50015 2.29347 4.35963 2.68638 4.35963 3.33851V5.06556H7L6.88512 7.43079H4.35963V14H1.78694Z"
                    fill="#080808"
                  />
                </svg>
              </a>
              <a href="#twitter">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.33 1.31357C12.8394 1.54345 12.3105 1.69451 11.7625 1.76675C12.3232 1.41866 12.7565 0.866958 12.9604 0.203604C12.4316 0.531997 11.8453 0.761872 11.2273 0.893229C10.7239 0.328393 10.0166 0 9.21376 0C7.71636 0 6.49296 1.26103 6.49296 2.81761C6.49296 3.04092 6.51845 3.25766 6.56305 3.46126C4.29466 3.34304 2.27477 2.21994 0.930296 0.518861C0.694536 0.932636 0.560727 1.41866 0.560727 1.93095C0.560727 2.90956 1.03862 3.77652 1.77776 4.26911C1.32535 4.26911 0.904809 4.13775 0.535239 3.94072V3.96042C0.535239 5.32654 1.47828 6.46934 2.72717 6.72549C2.3262 6.83859 1.90526 6.85433 1.4974 6.77147C1.67046 7.33136 2.0094 7.82128 2.46657 8.17234C2.92374 8.52341 3.47615 8.71798 4.04615 8.72869C3.07994 9.51712 1.88225 9.94329 0.649933 9.93717C0.433289 9.93717 0.216644 9.92404 0 9.89777C1.21066 10.699 2.65071 11.1654 4.19271 11.1654C9.21376 11.1654 11.9728 6.86998 11.9728 3.14601C11.9728 3.02122 11.9728 2.90299 11.9664 2.77821C12.5017 2.38413 12.9604 1.88498 13.33 1.31357Z"
                    fill="#080808"
                  />
                </svg>
              </a>
              <a href="#youtube">
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.332 6.665L8.79113 4.6655L5.332 2.666V6.665ZM13.0367 1.44631C13.1234 1.75956 13.1834 2.17946 13.2234 2.71266C13.27 3.24586 13.29 3.70574 13.29 4.10564L13.33 4.6655C13.33 6.12514 13.2234 7.1982 13.0367 7.8847C12.8701 8.48455 12.4835 8.87112 11.8837 9.03774C11.5704 9.12439 10.9972 9.18437 10.1175 9.22436C9.25102 9.27102 8.45788 9.29101 7.72473 9.29101L6.665 9.331C3.87236 9.331 2.1328 9.22436 1.44631 9.03774C0.846455 8.87112 0.459885 8.48455 0.29326 7.8847C0.206615 7.57144 0.14663 7.15155 0.10664 6.61835C0.0599851 6.08515 0.03999 5.62526 0.03999 5.22536L0 4.6655C0 3.20587 0.10664 2.1328 0.29326 1.44631C0.459885 0.846455 0.846455 0.459885 1.44631 0.29326C1.75956 0.206615 2.33275 0.14663 3.21253 0.10664C4.07898 0.0599849 4.87211 0.03999 5.60526 0.03999L6.665 0C9.45763 0 11.1972 0.10664 11.8837 0.29326C12.4835 0.459885 12.8701 0.846455 13.0367 1.44631Z"
                    fill="#080808"
                  />
                </svg>
              </a>
              <a href="#instagram">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.86667 0H9.46667C11.6 0 13.3333 1.73333 13.3333 3.86667V9.46667C13.3333 10.4922 12.926 11.4757 12.2008 12.2008C11.4757 12.926 10.4922 13.3333 9.46667 13.3333H3.86667C1.73333 13.3333 0 11.6 0 9.46667V3.86667C0 2.84116 0.40738 1.85766 1.13252 1.13252C1.85766 0.40738 2.84116 0 3.86667 0ZM3.73333 1.33333C3.09681 1.33333 2.48636 1.58619 2.03628 2.03628C1.58619 2.48636 1.33333 3.09681 1.33333 3.73333V9.6C1.33333 10.9267 2.40667 12 3.73333 12H9.6C10.2365 12 10.847 11.7471 11.2971 11.2971C11.7471 10.847 12 10.2365 12 9.6V3.73333C12 2.40667 10.9267 1.33333 9.6 1.33333H3.73333ZM10.1667 2.33333C10.3877 2.33333 10.5996 2.42113 10.7559 2.57741C10.9122 2.73369 11 2.94565 11 3.16667C11 3.38768 10.9122 3.59964 10.7559 3.75592C10.5996 3.9122 10.3877 4 10.1667 4C9.94565 4 9.73369 3.9122 9.57741 3.75592C9.42113 3.59964 9.33333 3.38768 9.33333 3.16667C9.33333 2.94565 9.42113 2.73369 9.57741 2.57741C9.73369 2.42113 9.94565 2.33333 10.1667 2.33333ZM6.66667 3.33333C7.55072 3.33333 8.39857 3.68452 9.02369 4.30964C9.64881 4.93476 10 5.78261 10 6.66667C10 7.55072 9.64881 8.39857 9.02369 9.02369C8.39857 9.64881 7.55072 10 6.66667 10C5.78261 10 4.93476 9.64881 4.30964 9.02369C3.68452 8.39857 3.33333 7.55072 3.33333 6.66667C3.33333 5.78261 3.68452 4.93476 4.30964 4.30964C4.93476 3.68452 5.78261 3.33333 6.66667 3.33333ZM6.66667 4.66667C6.13623 4.66667 5.62752 4.87738 5.25245 5.25245C4.87738 5.62752 4.66667 6.13623 4.66667 6.66667C4.66667 7.1971 4.87738 7.70581 5.25245 8.08088C5.62752 8.45595 6.13623 8.66667 6.66667 8.66667C7.1971 8.66667 7.70581 8.45595 8.08088 8.08088C8.45595 7.70581 8.66667 7.1971 8.66667 6.66667C8.66667 6.13623 8.45595 5.62752 8.08088 5.25245C7.70581 4.87738 7.1971 4.66667 6.66667 4.66667Z"
                    fill="#080808"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
