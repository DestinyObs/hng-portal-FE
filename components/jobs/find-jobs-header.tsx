'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import FindJobsBellIcon from '../icons/find-jobs-bell-icon';
import FindJobsMessageIcon from '../icons/find-jobs-message-icon';
import FindJobsSettingsIcon from '../icons/find-jobs-settings-icon';

export default function FindJobsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-[100px] bg-white-50 relative">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Image
          src="/images/hng-logo.png"
          alt="HNG Portal"
          width={105}
          height={36}
          priority
          className="h-9 w-auto"
        />

        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'HOME', active: false },
            { label: 'JOBS', active: true },
            { label: 'APPLICANTS', active: false },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className={`text-sm font-semibold transition-colors ${
                item.active ? 'text-gray-900' : 'text-gray-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button aria-label="Messages" className="relative p-2 rounded-lg">
            <FindJobsMessageIcon className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button aria-label="Notifications" className="p-2 rounded-lg">
            <FindJobsBellIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button aria-label="Settings" className="p-2 rounded-lg">
            <FindJobsSettingsIcon className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-1">
            <Image
              src="/images/talent-profile.jpg"
              alt="User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <Image
              src="/images/arrow-down-01.png"
              alt=""
              width={24}
              height={24}
            />
          </div>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {menuOpen && (
        <div className="w-full bg-white shadow-md border-b p-6 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-6">
            {[
              { label: 'HOME', active: false },
              { label: 'JOBS', active: true },
              { label: 'APPLICANTS', active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`text-base font-semibold ${
                  item.active ? 'text-gray-900' : 'text-tertiary-75'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 mt-8">
            <FindJobsMessageIcon className="h-6 w-6 text-gray-700" />
            <FindJobsBellIcon className="h-6 w-6 text-gray-700" />
            <FindJobsSettingsIcon className="h-6 w-6 text-gray-700" />
          </div>

          <div className="flex items-center gap-2 mt-6">
            <Image
              src="/images/talent-profile.jpg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-sm font-medium">My Profile</p>
          </div>
        </div>
      )}
    </header>
  );
}
