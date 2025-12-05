'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import Image from 'next/image';
import {
  LinkClasses,
  NavLinks,
} from '@/public/assets/images/landing-page/shared/constants';
import Logo from '@/public/assets/images/landing-page/shared/logo.png';
import { useAuthStore } from '@/store/auth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="bg-primary-300 lg:bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 py-6">
        <nav
          className="flex items-center justify-between bg-white rounded-full lg:rounded-none px-4 py-2.5 lg:px-0 lg:py-0"
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Link href="/" aria-label="HNG Connect Home">
              <Image
                src={Logo}
                alt="HNG Connect Logo"
                width={100}
                height={300}
                className="hidden md:block"
              />
              <Image
                src={Logo}
                alt="HNG Connect Logo"
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
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={`${LinkClasses} flex items-center gap-2 group`}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <span className="group-hover:text-primary-blue cursor-pointer transition-colors duration-300">
                        {item.icon}
                      </span>
                      <p
                        className={`group-hover:text-primary-blue transition-all duration-300 ${
                          item.active
                            ? 'border-b-2 border-black group-hover:border-primary-blue'
                            : ''
                        }`}
                      >
                        {item.label}
                      </p>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute left-0 mt-3 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-200 ease-out origin-top ${
                        openDropdown === item.label
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'pointer-events-none opacity-0 scale-95 -translate-y-2'
                      }`}
                    >
                      <ul className="py-2">
                        {item.dropdown.map((option) => (
                          <li key={option.label}>
                            <Link
                              href={option.href}
                              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-blue"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {option.icon}
                              <span>{option.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${LinkClasses} flex items-center gap-2 group`}
                  >
                    <span className="group-hover:text-primary-blue cursor-pointer transition-colors duration-300">
                      {item.icon}
                    </span>
                    <p
                      className={`group-hover:text-primary-blue transition-all duration-300 ${
                        item.active
                          ? 'border-b-2 border-black group-hover:border-primary-blue'
                          : ''
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {user ? (
            <Link
              href={
                user.current_role === 'talent'
                  ? '/talent/dashboard'
                  : '/company/dashboard'
              }
              passHref
            >
              <Button
                asChild
                variant="outline"
                className="rounded-full h-10 hidden lg:flex"
              >
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in" passHref>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-32 h-10 hidden lg:flex"
                >
                  <span>Login</span>
                </Button>
              </Link>
              <Link href="/sign-up" passHref>
                <Button
                  asChild
                  variant="outline"
                  className="bg-[#D9ECFE] border-[#8CC6FC] border rounded-full w-32 h-10 hidden lg:flex"
                >
                  <span>Get Started</span>
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <div
          className={`lg:hidden fixed left-0 right-0 top-[88px] bottom-0 z-50 bg-primary-300 transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <nav className="h-full overflow-y-auto px-6 py-6">
            <ul className="flex flex-col space-y-8">
              {NavLinks.map((item) => (
                <li key={item.label} className="text-white">
                  {item.dropdown ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 text-left text-white"
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === item.label ? null : item.label,
                          )
                        }
                        aria-expanded={openDropdown === item.label}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`mt-4 overflow-hidden rounded-lg bg-white/10 transition-all duration-200 ease-out origin-top ${
                          openDropdown === item.label
                            ? 'max-h-40 opacity-100 scale-100 translate-y-0'
                            : 'max-h-0 opacity-0 scale-95 -translate-y-2'
                        }`}
                      >
                        <ul className="space-y-4 px-4 py-3">
                          {item.dropdown.map((option) => (
                            <li
                              key={option.label}
                              className="flex items-center gap-2"
                            >
                              {option.icon}
                              <Link
                                href={option.href}
                                className="text-white"
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {option.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-white cursor-pointer hover:text-white">
                      {item.icon}
                      <Link
                        href={item.href}
                        className={`${LinkClasses} hover:text-white text-white ${
                          item.active ? 'border-b-2 border-white' : ''
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
              <li>
                {user ? (
                  <Link
                    href={
                      user.current_role === 'talent'
                        ? '/talent/dashboard'
                        : '/company/dashboard'
                    }
                    passHref
                  >
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full h-10 hidden lg:flex"
                    >
                      <span>Back to Dashboard</span>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <Link href="/sign-in" passHref>
                      <Button
                        asChild
                        variant="outline"
                        className="bg-white border-primary-300 border-2 rounded-full w-[138px] h-14"
                      >
                        <span>Login</span>
                      </Button>
                    </Link>

                    <Link href="/sign-up" passHref>
                      <Button
                        asChild
                        variant="outline"
                        className="bg-white border-primary-300 border-2 rounded-full w-[138px] h-14"
                      >
                        <span>Get Started</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
