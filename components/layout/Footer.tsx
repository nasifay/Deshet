"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Music4,
  Youtube,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "~/lib/i18n/hooks";

interface FooterData {
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    isActive: boolean;
  }>;
  whatsappNumber: string;
  termsAndConditions: {
    fileUrl: string;
    fileName: string;
  };
  privacyPolicy: {
    fileUrl: string;
    fileName: string;
  };
  contactInfo: {
    email: string;
    address: string;
    phone: string;
  };
  keyFunders: Array<{ name: string }>;
  networks: Array<{ name: string }>;
}

const iconMap: { [key: string]: any } = {
  // primary keys
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Youtube: Youtube,
  YouTube: Youtube,
  TikTok: Music4,
  Music4: Music4,
};

function getIconByName(name?: string) {
  if (!name) return undefined;
  const key = name.trim().toLowerCase();
  switch (key) {
    case "facebook":
      return Facebook;
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "twitter":
      return Twitter;
    case "youtube":
    case "youtu.be":
      return Youtube;
    case "tiktok":
    case "tik tok":
    case "music4":
      return Music4;
    default:
      return iconMap[name];
  }
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, locale } = useTranslation();

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await fetch("/api/public/footer");
        if (response.ok) {
          const result = await response.json();
          setFooterData(result.data);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  // Default fallback data
  const data = footerData || {
    socialLinks: [],
    whatsappNumber: "",
    termsAndConditions: { fileUrl: "#", fileName: "" },
    privacyPolicy: { fileUrl: "#", fileName: "" },
    contactInfo: {
      email: "TSD@ngo.com",
      address:
        "Friendship Business Center, 7th Floor, Bole, Addis Ababa, Ethiopia",
      phone: "",
    },
    keyFunders: [],
    networks: [],
  };

  return (
    <footer className="w-full bg-white border-t border-[#4EB778] font-['Roboto']">
      <div className=" mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32 pt-10 pb-6 flex flex-col gap-10">
        {/* --- Top Links --- */}
        <div className="flex flex-wrap items-center gap-6 text-[#666] text-[14px] font-medium tracking-wide">
          <Link
            href={data.termsAndConditions.fileUrl || "#"}
            className="flex items-center gap-1 hover:text-[#4EB778] transition-colors"
          >
            {t("footer.termsConditions")}
            <span className="text-[#4EB778] text-lg font-bold">›</span>
          </Link>
          <Link
            href={data.privacyPolicy.fileUrl || "#"}
            className="flex items-center gap-1 hover:text-[#4EB778] transition-colors"
          >
            {t("footer.privacyPolicy")}
            <span className="text-[#4EB778] text-lg font-bold">›</span>
          </Link>
        </div>

        {/* --- Main Content Section --- */}
        <div className="flex flex-wrap justify-between gap-10">
          {/* --- Left: Logo + Info --- */}
          <div className="flex items-start gap-6 min-w-[280px] max-w-[360px]">
            <Image
              src="/logo.png"
              alt="Deshet Medical Center Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <div className="text-[#666] text-[12.5px] leading-[19px] font-medium">
              <p>©{t("footer.organizationName")}</p>
              <p>{t("footer.tagline")}</p>
              <p>{t("footer.location")}: {data.contactInfo.address}</p>
              <p>{t("footer.customerFeedback")}: {data.contactInfo.email}</p>
              {data.contactInfo.phone && <p>{t("footer.phone")}: {data.contactInfo.phone}</p>}
            </div>
          </div>

          {/* --- Middle: Key Funders --- */}
          {data.keyFunders.length > 0 && (
            <div className="min-w-[160px]">
              <h3 className="text-[#128341] text-[12.5px] font-bold mb-1">
                {t("footer.keyFunders")}
              </h3>
              <ul className="space-y-1 text-[#666] text-[12.5px] font-medium leading-[18px]">
                {data.keyFunders.map((funder, index) => (
                  <li key={index}>{funder.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* --- Middle Right: Networks --- */}
          {data.networks.length > 0 && (
            <div className="min-w-[210px]">
              <h3 className="text-[#128341] text-[12.5px] font-bold mb-1">
                {t("footer.networksMemberships")}
              </h3>
              <ul className="space-y-1 text-[#666] text-[12.5px] font-medium leading-[18px]">
                {data.networks.map((network, index) => (
                  <li key={index}>{network.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* --- Right: Social Media --- */}
          <div className="flex items-center gap-4 text-[#20A44D] ml-auto">
            {data.socialLinks && data.socialLinks.length > 0 ? (
              data.socialLinks.map((link, index) => {
                // Prefer platform first (source of truth), then explicit icon value
                const IconComponent =
                  getIconByName(link.platform) ||
                  getIconByName(link.icon) ||
                  Link2;
                return (
                  <Link
                    key={index}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                    aria-label={link.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })
            ) : (
              // Placeholder social media icons if none configured
              <>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform opacity-50"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform opacity-50"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform opacity-50"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* --- Bottom Navigation --- */}
        <nav className="border-t border-transparent pt-4 flex justify-center">
          <ul className="flex flex-wrap justify-center items-center gap-8 text-[#666] text-[12.5px] font-medium">
            <li>
              <Link href="/" className="hover:text-[#4EB778] transition-colors">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                href="/who-we-are"
                className="hover:text-[#4EB778] transition-colors"
              >
                {t("nav.whoWeAre")}
              </Link>
            </li>
            <li>
              <Link
                href="/programs"
                className="hover:text-[#4EB778] transition-colors"
              >
                {locale === "am" ? "አገልግሎቶች" : "Services"}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[#4EB778] transition-colors"
              >
                {t("nav.blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-[#4EB778] transition-colors"
              >
                {t("nav.gallery")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-[#4EB778] transition-colors"
              >
                {t("nav.contactUs")}
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="hover:text-[#4EB778] transition-colors"
              >
                {t("nav.booking")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
