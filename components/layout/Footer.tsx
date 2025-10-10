"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Music4,
} from "lucide-react"; // You can replace Music4 with TikTok icon SVG later if needed
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#4EB778] font-['Roboto']">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-6 flex flex-col gap-10">
        {/* --- Top Links --- */}
        <div className="flex flex-wrap items-center gap-6 text-[#666] text-[14px] font-medium tracking-wide">
          <Link
            href="#"
            className="flex items-center gap-1 hover:text-[#4EB778] transition-colors"
          >
            TERMS CONDITIONS
            <span className="text-[#4EB778] text-lg font-bold">›</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 hover:text-[#4EB778] transition-colors"
          >
            PRIVACY POLICY
            <span className="text-[#4EB778] text-lg font-bold">›</span>
          </Link>
        </div>

        {/* --- Main Content Section --- */}
        <div className="flex flex-wrap justify-between gap-10">
          {/* --- Left: Logo + Info --- */}
          <div className="flex items-start gap-6 min-w-[280px] max-w-[360px]">
            <Image
              src="/logo.svg"
              alt="Tamra for Social Development Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <div className="text-[#666] text-[12.5px] leading-[19px] font-medium">
              <p>©Tamra for Social Development Organization.com</p>
              <p>A legally registered local NGO.</p>
              <p>
                Location: Friendship Business Center, 7th Floor, Bole, Addis
                Ababa, Ethiopia
              </p>
              <p>Customer Feedback: TSD@ngo.com</p>
            </div>
          </div>

          {/* --- Middle: Key Funders --- */}
          <div className="min-w-[160px]">
            <h3 className="text-[#128341] text-[12.5px] font-bold mb-1">
              Key Funders
            </h3>
            <ul className="space-y-1 text-[#666] text-[12.5px] font-medium leading-[18px]">
              <li>NCA</li>
              <li>YNSD</li>
              <li>CRVPF</li>
              <li>PEPFAR</li>
              <li>Sonke Gender Justice</li>
            </ul>
          </div>

          {/* --- Middle Right: Networks --- */}
          <div className="min-w-[210px]">
            <h3 className="text-[#128341] text-[12.5px] font-bold mb-1">
              Networks & Memberships
            </h3>
            <ul className="space-y-1 text-[#666] text-[12.5px] font-medium leading-[18px]">
              <li>CCRDA</li>
              <li>CORHA</li>
              <li>PHE Ethiopia</li>
              <li>Men Engage Ethiopia</li>
              <li>Ubuntu Youth Peace Alliance</li>
              <li>Ethiopian Civil Societies Council</li>
            </ul>
          </div>

          {/* --- Right: Social Media --- */}
          <div className="flex items-center gap-4 text-[#20A44D] ml-auto">
            <Link
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="TikTok"
            >
              <Music4 className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:scale-110 transition-transform"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* --- Bottom Navigation --- */}
        <nav className="border-t border-transparent pt-4 flex justify-center">
          <ul className="flex flex-wrap justify-center items-center gap-8 text-[#666] text-[12.5px] font-medium">
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Who we are
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                News
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#4EB778] transition-colors">
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
