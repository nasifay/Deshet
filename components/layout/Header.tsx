"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import LanguageSwitcher from "~/components/ui/LanguageSwitcher";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  // Helper function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const whoWeAreItems = [
    { href: "/who-we-are", label: t("nav.aboutUs") },
    { href: "/programs", label: locale === "am" ? "አገልግሎቶች" : "Services" },
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
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-14 py-2">
        {/* Optimized horizontal padding for smaller screens to prevent overflow while preserving desktop */}
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Deshet Medical Center Logo"
            width={60}
            height={60}
            className="max-sm:size-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* ================= Desktop & Tablet Nav (Unchanged for desktop, extended to tablet) ================= */}
        <nav className="hidden md:flex items-center md:gap-4 lg:gap-8 text-xs md:text-sm font-medium text-gray-800">
          {/* Changed visibility to md:flex for horizontal nav on tablets; adjusted gaps with md:gap-4 lg:gap-8 for compact tablet layout */}
          {/* Scaled text size with text-xs md:text-sm for better fit on tablets */}
          <Link
            href="/"
            className={`transition-colors ${
              isActiveRoute("/")
                ? "text-primary-green font-semibold"
                : "hover:text-primary-green"
            }`}
          >
            {t("nav.home")}
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center gap-1 transition-colors ${
                whoWeAreItems.some((item) => isActiveRoute(item.href))
                  ? "text-primary-green font-semibold"
                  : "hover:text-primary-green"
              }`}
            >
              {t("nav.whoWeAre")}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown && (
              <div className="absolute top-full left-0 mt-2 md:w-40 lg:w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                {/* Adjusted dropdown width with md:w-40 lg:w-48 to fit tablets better */}
                {whoWeAreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenDropdown(false)}
                    className={`block md:px-3 md:py-2 lg:px-5 lg:py-2.5 text-xs md:text-sm transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? "text-primary-green font-semibold bg-primary-50"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-green"
                    }`}
                  >
                    {/* Scaled dropdown item text and padding for tablets: md:text-xs md:px-3 md:py-2 lg: originals */}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`transition-colors ${
              isActiveRoute("/blog")
                ? "text-primary-green font-semibold"
                : "hover:text-primary-green"
            }`}
          >
            {t("nav.blog")}
          </Link>
          <Link
            href="/gallery"
            className={`transition-colors ${
              isActiveRoute("/gallery")
                ? "text-primary-green font-semibold"
                : "hover:text-primary-green"
            }`}
          >
            {t("nav.gallery")}
          </Link>
          <Link
            href="/contact-us"
            className={`transition-colors ${
              isActiveRoute("/contact-us")
                ? "text-primary-green font-semibold"
                : "hover:text-primary-green"
            }`}
          >
            {t("nav.contactUs")}
          </Link>
        </nav>

        {/* Desktop Language Switcher & Booking Button */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="bg-primary-green text-white text-sm md:text-base lg:text-2xl font-medium md:px-4 lg:px-8 py-1 2xl:py-3 rounded-lg transition-all duration-300"
          >
            {t("nav.booking")}
          </Link>
        </div>

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
  const { t, locale } = useTranslation();

  const whoWeAreItems = [
    { href: "/who-we-are", label: t("nav.aboutUs") },
    { href: "/programs", label: locale === "am" ? "አገልግሎቶች" : "Services" },
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
        className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        {/* Changed visibility to md:hidden to show only on mobile, enabling horizontal nav on tablets */}
        <Menu size={26} className="text-gray-700 " />
      </button>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          <div className="fixed top-16 right-0 w-[85%] sm:w-[70%] md:w-[60%] h-fit rounded-bl-lg bg-white shadow-2xl z-40 p-4 flex flex-col gap-4 animate-slideIn md:hidden">
            {/* Added md:hidden to hide drawer on tablets where horizontal nav is used */}
            {/* Header with close button and language switcher */}
            <div className="flex items-center justify-between border-b pb-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={t("common.close")}
              >
                <X size={26} className="text-gray-700" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex bg-white flex-col gap-1 mt-1 text-base text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/")
                    ? "bg-primary-50 text-primary-green font-semibold"
                    : "hover:bg-primary-50 hover:text-primary-green"
                }`}
              >
                {t("nav.home")}
              </Link>

              {/* Dropdown */}
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    whoWeAreItems.some((item) => isActiveRoute(item.href))
                      ? "bg-primary-50 text-primary-green font-semibold"
                      : "hover:bg-primary-50 hover:text-primary-green"
                  }`}
                >
                  {t("nav.whoWeAre")}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-orange-200 pl-4">
                    {whoWeAreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`py-3 text-sm transition-all duration-200 ${
                          isActiveRoute(item.href)
                            ? "text-primary-green font-semibold"
                            : "text-gray-600 hover:text-primary-green"
                        }`}
                      >
                        {/* Increased py-2.5 to py-3 for better tap targets on mobile sub-items */}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/blog")
                    ? "bg-primary-50 text-primary-green font-semibold"
                    : "hover:bg-primary-50 hover:text-primary-green"
                }`}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/gallery")
                    ? "bg-primary-50 text-primary-green font-semibold"
                    : "hover:bg-primary-50 hover:text-primary-green"
                }`}
              >
                {t("nav.gallery")}
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActiveRoute("/contact-us")
                    ? "bg-primary-50 text-primary-green font-semibold"
                    : "hover:bg-primary-50 hover:text-primary-green"
                }`}
              >
                {t("nav.contactUs")}
              </Link>

              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
                className={`mt-4 text-center py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg ${
                  isActiveRoute("/booking")
                    ? "bg-[#0f6d35] text-white"
                    : "bg-primary-green hover:bg-[#0f6d35] text-white"
                }`}
              >
                {t("nav.booking")}
              </Link>
            </nav>
          </div>

          {/* Overlay */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Added md:hidden to hide overlay on tablets */}
        </>
      )}
    </>
  );
}
