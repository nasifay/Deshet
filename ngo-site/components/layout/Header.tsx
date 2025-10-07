"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Button from "~/components/ui/Button";
import { DonationModal } from "~/components/ui/DonationModal";
import Image from "next/image";

interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  active?: boolean;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // Inline NavLink component for consistent styling
  const NavLink = ({
    href,
    children,
    isActive = false,
  }: {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <Link
      href={href}
      className={`transition-colors duration-200 ${
        isActive ? "text-primary-orange" : "hover:text-[#ff7a00]"
      }`}
    >
      {children}
    </Link>
  );

  // Inline DropdownMenu component
  const DropdownMenu = ({
    label,
    items,
    isOpen,
    onToggle,
  }: {
    label: string;
    items: Array<{ href: string; label: string }>;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div className="relative bg-transparent">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 hover:text-[#ff7a00] transition-colors duration-200"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="z-30 absolute left-full top-full w-40 bg-white/20 border border-white/30 shadow-xl rounded-lg py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-white/50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // Inline DonateButton component
  const DonateButton = () => (
    <Link
      href="/donate"
      className="ml-4 bg-[#128341] text-white font-roboto font-medium text-[24px] leading-[100%] tracking-[0]   px-12 py-4 rounded-2xl flex items-center justify-center gap-[10px] shadow-sm transition-colors duration-200 hover:bg-[#0c8b3c] "
    >
      Donate
    </Link>
  );

  // Dropdown menu items
  const whoWeAreItems = [
    { href: "/history", label: "History" },
    { href: "/programs", label: "Programs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-20 w-full bg-white/40 backdrop-blur-md ">
      <div className=" mx-auto flex items-center justify-between px-14 py-1">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg" // replace with your actual logo path
            alt="Logo"
            width={57}
            height={57}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <NavLink href="/" isActive>
            Home
          </NavLink>

          <DropdownMenu
            label="Who we are"
            items={whoWeAreItems}
            isOpen={open}
            onToggle={() => setOpen(!open)}
          />

          <NavLink href="/news">News</NavLink>

          <NavLink href="/gallery">Gallery</NavLink>

          <NavLink href="/volunteer">Volunteer</NavLink>

          <NavLink href="/contact">Contact us</NavLink>
        </nav>

        <DonateButton />
      </div>
    </header>
  );
}
