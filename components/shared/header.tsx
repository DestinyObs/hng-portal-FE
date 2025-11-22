'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import {
  LinkClasses,
  NavLinks,
} from '@/public/assets/images/landing-page/shared/constants';
import Logo from '@/public/assets/images/landing-page/shared/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="bg-primary-300 lg:bg-white">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 py-6">
        <nav
          className="flex items-center justify-between bg-white rounded-full lg:rounded-none px-4 py-2.5 lg:px-0 lg:py-0"
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Link href="/" aria-label="HNG Portal Home">
              <Image
                src={Logo}
                alt="HNG Portal Logo"
                width={140}
                height={450}
                className="hidden md:block"
              />
              <Image
                src={Logo}
                alt="HNG Portal Logo"
                width={95}
                height={37}
                className="md:hidden"
              />
            </Link>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-gray-900 hover:text-primary-blue transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul className="items-center gap-10 hidden lg:flex">
            {NavLinks.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 hover:text-primary-blue"
              >
                {item.icon}
                <Link
                  href={item.href}
                  className={`${LinkClasses} ${
                    item.active ? 'border-b-2 border-black' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/sign-up" passHref>
            <Button
              asChild
              variant="outline"
              className="bg-[#D9ECFE] border-[#8CC6FC] border-2 rounded-full w-[138px] h-14 hidden lg:flex"
            >
              <span>Get Started</span>
            </Button>
          </Link>
        </nav>

        <div
          className={`lg:hidden fixed left-0 right-0 top-[88px] bottom-0 z-50 bg-primary-300 transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <nav className="h-full overflow-y-auto px-6 py-6">
            <ul className="flex flex-col space-y-10">
              {NavLinks.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 hover:text-primary-blue cursor-pointer"
                >
                  {item.icon}
                  <Link
                    href={item.href}
                    className={`${LinkClasses} ${
                      item.active ? 'border-b-2 border-black' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <Link href="/sign-up" passHref>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white border-primary-300 border-2 rounded-full w-[138px] h-14"
                >
                  <span>Get Started</span>
                </Button>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
