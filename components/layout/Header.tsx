"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Helper function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const whoWeAreItems = [
    { href: "/who-we-are", label: "About Us" },
    { href: "/history", label: "History" },
    { href: "/programs", label: "Programs" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 w-full bg-white/40 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-6 md:px-14 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={60}
            className="max-sm:size-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* ================= Desktop & Tablet Nav (Unchanged) ================= */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-800">
          <Link
            href="/"
            className={`transition-colors ${
              isActiveRoute("/")
                ? "text-[#ff7a00] font-semibold"
                : "hover:text-[#ff7a00]"
            }`}
          >
            Home
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center gap-1 transition-colors ${
                whoWeAreItems.some((item) => isActiveRoute(item.href))
                  ? "text-[#ff7a00] font-semibold"
                  : "hover:text-[#ff7a00]"
              }`}
            >
              Who we are
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white  shadow-xl rounded-xl border border-gray-100  py-2 z-50 animate-fadeIn">
                {whoWeAreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenDropdown(false)}
                    className={`block px-5 py-2.5 text-sm transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? "text-[#ff7a00] font-semibold bg-orange-50"
                        : "text-gray-700 hover:bg-orange-50 hover:text-[#ff7a00]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/news"
            className={`transition-colors ${
              isActiveRoute("/news")
                ? "text-[#ff7a00] font-semibold"
                : "hover:text-[#ff7a00]"
            }`}
          >
            News
          </Link>
          <Link
            href="/gallery"
            className={`transition-colors ${
              isActiveRoute("/gallery")
                ? "text-[#ff7a00] font-semibold"
                : "hover:text-[#ff7a00]"
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/volunteer"
            className={`transition-colors ${
              isActiveRoute("/volunteer")
                ? "text-[#ff7a00] font-semibold"
                : "hover:text-[#ff7a00]"
            }`}
          >
            Volunteer
          </Link>
          <Link
            href="/contact-us"
            className={`transition-colors ${
              isActiveRoute("/contact-us")
                ? "text-[#ff7a00] font-semibold"
                : "hover:text-[#ff7a00]"
            }`}
          >
            Contact us
          </Link>
        </nav>

        {/* Desktop Donate Button */}
        <Link
          href="/donate"
          className="hidden lg:inline-block bg-primary-green text-white text-sm md:text-lg lg:text-2xl font-medium px-8 2xl:px-14 py-1 2xl:py-3 rounded-lg transition-all duration-300"
        >
          Donate
        </Link>

        {/* Mobile Menu Button */}
        <MobileHeader />
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------
   MOBILE HEADER COMPONENT — isolated, independent from desktop/tablet
------------------------------------------------------------------- */
function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const whoWeAreItems = [
    { href: "/history", label: "History" },
    { href: "/programs", label: "Programs" },
  ];

  // Helper function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Hamburger (visible only on mobile) */}
      <button
        className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100  transition-colors"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={26} className="text-gray-700 " />
      </button>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          <div className="fixed top-16 right-0 w-[85%] sm:w-[70%] md:w-[60%] h-fit rounded-bl-lg bg-white shadow-2xl z-40 p-4 flex flex-col gap-4 animate-slideIn lg:hidden">
            {/* Header with close button only */}
            <div className="flex items-center justify-end border-b pb-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={26} className="text-gray-700" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex bg-white flex-col gap-1 mt-1 text-base text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/")
                    ? "bg-orange-50 text-[#ff7a00] font-semibold"
                    : "hover:bg-orange-50 hover:text-[#ff7a00]"
                }`}
              >
                Home
              </Link>

              {/* Dropdown */}
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    whoWeAreItems.some((item) => isActiveRoute(item.href))
                      ? "bg-orange-50 text-[#ff7a00] font-semibold"
                      : "hover:bg-orange-50 hover:text-[#ff7a00]"
                  }`}
                >
                  Who we are
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-orange-200  pl-4">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`py-2.5 text-sm transition-all duration-200 ${
                          isActiveRoute(item.href)
                            ? "text-[#ff7a00] font-semibold"
                            : "text-gray-600 hover:text-[#ff7a00]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/news"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/news")
                    ? "bg-orange-50 text-[#ff7a00] font-semibold"
                    : "hover:bg-orange-50 hover:text-[#ff7a00]"
                }`}
              >
                News
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/gallery")
                    ? "bg-orange-50 text-[#ff7a00] font-semibold"
                    : "hover:bg-orange-50 hover:text-[#ff7a00]"
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/volunteer"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/volunteer")
                    ? "bg-orange-50 text-[#ff7a00] font-semibold"
                    : "hover:bg-orange-50 hover:text-[#ff7a00]"
                }`}
              >
                Volunteer
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/contact-us")
                    ? "bg-orange-50 text-[#ff7a00] font-semibold"
                    : "hover:bg-orange-50 hover:text-[#ff7a00]"
                }`}
              >
                Contact us
              </Link>

              <Link
                href="/donate"
                onClick={() => setIsMenuOpen(false)}
                className={`mt-4 text-center py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg ${
                  isActiveRoute("/donate")
                    ? "bg-[#0f6d35] text-white"
                    : "bg-primary-green hover:bg-[#0f6d35] text-white"
                }`}
              >
                Donate
              </Link>
            </nav>
          </div>

          {/* Overlay */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
        </>
      )}
    </>
  );
}
