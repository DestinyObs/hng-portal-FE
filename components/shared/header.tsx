'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import Logo from './logo.png';

const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Features', href: '#about', hasDropdown: true },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 py-6">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link href="/" aria-label="HNG Portal Home">
            <Image src={Logo} width={100} height={100} alt="HNG Portal Logo" />
          </Link>

          <ul className="hidden md:flex items-center gap-[22px]">
            {navLinks.map((item) => (
              <li key={item.label} className="flex items-center gap-1">
                <Link
                  href={item.href}
                  className={`font-medium text-[16px] transition ${
                    item.active
                      ? 'text-primary-blue font-semibold'
                      : 'text-primary-black hover:text-primary-blue'
                  }`}
                >
                  {item.label}
                </Link>

                {item.hasDropdown && (
                  <svg
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0.75L3.875 3.875L0.75 0.75"
                      stroke="#080808"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">
              <Link href={'/sign-in'}>Sign in</Link>
            </Button>
            <Button variant="default">
              <Link href={'/sign-up'}>Create an Account</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-gray-900 hover:text-primary-blue transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <div
          className={`md:hidden fixed left-0 right-0 top-[88px] bottom-0 z-50 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className="h-full overflow-y-auto px-6 py-6">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium text-[16px] transition ${
                      item.active
                        ? 'text-primary-blue font-semibold'
                        : 'text-primary-black hover:text-primary-blue'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {item.hasDropdown && (
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0.75L3.875 3.875L0.75 0.75"
                        stroke="#080808"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              ))}

              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Button variant="outline">Sign in</Button>
                <Button variant="default">Create an Account</Button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;