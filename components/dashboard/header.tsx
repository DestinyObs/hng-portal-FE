'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/actions/auth';
import Logo from '@/public/assets/images/landing-page/shared/logo.png';
import { useAuthStore } from '@/store/auth';
import PlaceholderProfile from './placeholder-profile';
import { useGetProfileData } from '@/hooks/profile-settings';

const DashboardHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setData, clearAuth } = useAuthStore();
  const { data } = useGetProfileData();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isCompany = user?.current_role === 'employer';
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const dashboardLinks = [
    {
      label: 'HOME',
      href: isCompany ? '/company/dashboard' : '/talent/dashboard',
      active: true,
    },
    {
      label: 'JOBS',
      href: isCompany ? '/company/jobs' : '/talent/jobs',
      active: false,
    },
    {
      label: isCompany ? 'APPLICANTS' : 'MY APPLICATIONS',
      href: isCompany ? '/company/applicants' : '/talent/applications',
      active: false,
    },
  ];

  const { mutate: a_logout, isPending: isLoggingOut } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logged out successfully!');
      clearAuth();
      setData(null);
      router.push('/sign-in');
    },
    onError: () => {
      toast.success('Logged out successfully!');
      setData(null);
      router.push('/sign-in');
    },
  });

  const handleLogout = () => {
    a_logout();
  };

  // Handler to close dropdown when navigating to profile
  const handleProfileClick = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className=" px-4 xl:px-24 py-6">
        <nav
          className="flex items-center justify-between"
          aria-label="Dashboard navigation"
        >
          <Link href={dashboardLinks[0].href} aria-label="HNG Connect Home">
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                width={100}
                height={30}
                alt="HNG Connect"
                className="object-contain"
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center h-6 gap-6">
            {dashboardLinks.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className={`flex items-center h-full text-sm uppercase tracking-wide transition-colors duration-200 ${
                    pathname === item.href
                      ? 'font-bold text-black'
                      : 'font-medium text-[#08080866] hover:text-black uppercase'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            {/* <div className="flex items-center gap-5 text-gray-100">
              <button className="hover:text-primary-blue transition">
                <Image
                  src="/images/message-icon.png"
                  alt="Messages"
                  width={20}
                  height={20}
                />
              </button>
              <button className="hover:text-primary-blue transition">
                <Image
                  src="/images/bell-icon.png"
                  alt="Notifications"
                  width={20}
                  height={20}
                />
              </button>
            </div> */}

            <div className="relative" ref={profileDropdownRef}>
              <button className="flex items-center gap-4 pl-2 focus:outline-none">
                <div
                  className="w-9 h-9 rounded-full overflow-hidden"
                  onClick={handleProfileClick}
                >
                  {user?.company?.logo_url && isCompany ? (
                    <Link href={'/profile-view'}>
                      <Image
                        src={user?.company?.logo_url}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  ) : data?.photo_url && !isCompany ? (
                    <Link href={'/profile-view'}>
                      <Image
                        src={data?.photo_url}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  ) : (
                    <Link href={'/profile-view'}>
                      <PlaceholderProfile
                        size={'100%'}
                        className="text-base"
                        name={
                          isCompany
                            ? (user?.company?.name ?? '')
                            : `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim()
                        }
                      />
                    </Link>
                  )}
                </div>

                <ChevronDown
                  size={24}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`text-gray-100 transition-transform duration-200 cursor-pointer ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div
                  className="absolute right-0 z-50 bg-white rounded-lg shadow-xl border border-gray flex flex-col justify-center"
                  style={{
                    width: '200px',
                    height: '102px',
                    top: '100%',
                    marginTop: '8px',
                  }}
                >
                  <div className="flex flex-col gap-4 pl-6">
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="text-sm font-medium text-black transition-colors text-left cursor-pointer"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="text-sm font-medium text-primary-error transition-colors text-left disabled:opacity-50 cursor-pointer"
                    >
                      {isLoggingOut ? 'Logging out...' : 'Log out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[88px] z-50 bg-white border-b shadow-lg p-4">
            <ul className="flex flex-col space-y-4">
              {dashboardLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block font-medium text-gray-600 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <hr />
              <li>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left block font-medium text-primary-error py-2 disabled:opacity-50"
                >
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                </button>
              </li>

              {/* <div className="flex gap-4 py-2">
                <Image
                  src="/images/message-icon.png"
                  width={20}
                  height={20}
                  alt="Messages"
                />
                <Image
                  src="/images/bell-icon.png"
                  width={20}
                  height={20}
                  alt="Notifications"
                />
              </div> */}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
