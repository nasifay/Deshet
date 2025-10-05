"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Button from "~/components/ui/Button";
import { DonationModal } from "~/components/ui/DonationModal";

interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  active?: boolean;
}

export default function Header() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/", active: false },
    { label: "Who we are", href: "/who-we-are", hasDropdown: false, active: false },
    { label: "News", href: "/news", active: false },
    { label: "Awards", href: "/awards", active: false },
    { label: "Gallery", href: "/gallery", active: false },
    { label: "Contact us", href: "/contacts", active: false },
  ];

  return (
    <>
      <header className="flex w-full items-center gap-[265px] pl-[149px] pr-0 py-0 fixed top-0 left-0 bg-[#ffffff4c] backdrop-blur-[25.4px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25.4px)_brightness(100%)] z-50 h-[87px]">
        <nav className="inline-flex items-center gap-[203px] relative flex-[0_0_auto]">
          <img
            className="relative w-[54px] h-[57px] object-cover"
            alt="Asset"
            src="https://c.animaapp.com/mgclt9blEcJSeI/img/asset-1-4.png"
          />

          <ul className="inline-flex items-center gap-[85px] relative flex-[0_0_auto] list-none m-0 p-0">
            {navigationItems.map((item, index) => (
              <li key={index}>
                {item.hasDropdown ? (
                  <Link
                    className="inline-flex items-center justify-center gap-[11px] relative [font-family:'Roboto',Helvetica] font-medium text-[#ff9700] text-xl tracking-[0] leading-[normal] whitespace-nowrap"
                    href={item.href}
                  >
                    {item.label}
                    <ChevronDown className="w-[19px] h-2.5" />
                  </Link>
                ) : (
                  <Link
                    className={`relative [font-family:'Roboto',Helvetica] font-medium text-xl tracking-[0] leading-[normal] whitespace-nowrap hover:text-[#ff9700] transition-colors ${
                      item.active ? "text-[#ff9700]" : "text-[#4f4f4f]"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Button
          onClick={() => setIsDonationModalOpen(true)}
          className="w-[149px] h-[57px] bg-[#128341] hover:bg-[#0f6b35] rounded-[21px] text-white text-2xl font-medium [font-family:'Roboto',Helvetica] transition-colors"
        >
          Donate
        </Button>
      </header>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
}