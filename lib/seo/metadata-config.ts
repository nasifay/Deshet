import { Metadata } from "next";
import type { Locale } from "~/lib/i18n/config";
import { locales } from "~/lib/i18n/config";
import { en } from "~/lib/i18n/translations/en";
import { am } from "~/lib/i18n/translations/am";

// Base URL for the site
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://deshetmed.com";

// Default organization info
export const ORGANIZATION = {
  name: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
  shortName: "Deshet",
  description:
    "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing",
  email: "yohansshefraw@gmail.com",
  phone: "+251 XXX XXX XXX",
  address: {
    streetAddress: "Addis Ababa",
    addressLocality: "Addis Ababa",
    addressRegion: "Addis Ababa",
    addressCountry: "Ethiopia",
  },
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/images/hero.jpg`,
  socialMedia: {
    facebook: "https://facebook.com/deshetmed",
    twitter: "https://twitter.com/deshetmed",
    linkedin: "https://linkedin.com/company/deshetmed",
    instagram: "https://instagram.com/deshetmed",
  },
};

// Default social media images
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero.jpg`;
export const DEFAULT_TWITTER_IMAGE = `${BASE_URL}/images/hero.jpg`;

// SEO Keywords (general)
export const DEFAULT_KEYWORDS = [
  "Deshet Medical Center",
  "Ethiopian traditional medicine",
  "indigenous medicine Ethiopia",
  "herbal medicine",
  "traditional healing",
  "Ethiopian herbal remedies",
  "cultural healing",
  "spiritual healing",
  "traditional medical consultation",
  "herbal medicine preparation",
  "detox therapy",
  "traditional diagnostic techniques",
  "medical center Addis Ababa",
  "Deshet",
  "DIMC",
  "indigenous healthcare",
  "Ethiopian medicine",
  "natural healing Ethiopia",
];

/**
 * Static page metadata configurations
 */
export const PAGE_METADATA: Record<string, Metadata> = {
  // Home / Landing Page
  home: {
    title: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል | Premium Traditional Healing in Ethiopia",
    description:
      "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing. Experience traditional medicine, herbal remedies, and holistic wellness in Addis Ababa.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "medical center Ethiopia",
      "traditional medicine center",
      "herbal healing center",
      "wellness center Addis Ababa",
      "indigenous healthcare services",
    ],
    openGraph: {
      title: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል | Premium Traditional Healing",
      description:
        "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing. Experience traditional medicine and holistic wellness.",
      url: BASE_URL,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል - Premium Traditional Healing",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል | Premium Traditional Healing",
      description:
        "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing. Experience traditional medicine and holistic wellness.",
      images: [DEFAULT_TWITTER_IMAGE],
      creator: "@deshetmed",
    },
    alternates: {
      canonical: BASE_URL,
    },
  },

  // About / Who We Are Page
  "who-we-are": {
    title: "About Us | Who We Are | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Learn about Deshet's mission, vision, core values, and our commitment to preserving and delivering Ethiopian indigenous medicine. Discover our practitioners and healing philosophy.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "about Deshet",
      "mission vision",
      "core values",
      "medical practitioners",
      "healing philosophy",
      "medical center history",
      "traditional medicine practitioners",
    ],
    openGraph: {
      title: "About Us | Who We Are | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
      description:
        "Learn about Deshet's mission, vision, core values, and our commitment to preserving and delivering Ethiopian indigenous medicine.",
      url: `${BASE_URL}/who-we-are`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/about.jpg`,
          width: 1200,
          height: 630,
          alt: "Deshet Medical Center - Our Team and Mission",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Who We Are | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
      description:
        "Learn about Deshet's mission, vision, and our commitment to preserving and delivering Ethiopian indigenous medicine.",
      images: [`${BASE_URL}/images/about.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/who-we-are`,
    },
  },

  // Programs Page (Services)
  programs: {
    title: "Our Services | Traditional Medical Services | Deshet Medical Center",
    description:
      "Explore Deshet's comprehensive medical services: Traditional Medical Consultation, Herbal Medicine Preparation, Detox & Cleansing Therapy, Traditional Diagnostic Techniques, and Healing Treatments.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "medical services Ethiopia",
      "traditional consultation",
      "herbal medicine services",
      "detox therapy",
      "traditional diagnostics",
      "healing treatments",
      "medical services Addis Ababa",
    ],
    openGraph: {
      title: "Our Services | Traditional Medical Services | Deshet Medical Center",
      description:
        "Explore Deshet's medical services: Traditional Consultation, Herbal Medicine, Detox Therapy, Traditional Diagnostics, and Healing Treatments.",
      url: `${BASE_URL}/programs`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/programs/hero.png`,
          width: 1200,
          height: 630,
          alt: "Deshet Medical Services - Traditional Healing",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Services | Traditional Medical Services | Deshet Medical Center",
      description:
        "Explore Deshet's medical services: Traditional Consultation, Herbal Medicine, Detox Therapy, and Healing Treatments.",
      images: [`${BASE_URL}/programs/hero.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/programs`,
    },
  },

  // Blog Page
  blog: {
    title: "Blog | Latest Updates | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Stay informed with the latest articles, health tips, traditional medicine insights, and updates from ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል. Discover healing wisdom and wellness guidance.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Deshet blog",
      "medical center news",
      "health articles",
      "traditional medicine blog",
      "wellness tips",
      "healing insights",
      "medical updates",
    ],
    openGraph: {
      title: "Blog | Latest Updates | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
      description:
        "Stay informed with our latest articles, health tips, and traditional medicine insights.",
      url: `${BASE_URL}/blog`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/news.jpg`,
          width: 1200,
          height: 630,
          alt: "Deshet Medical Center Blog and Updates",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
      description:
        "Stay informed with our latest articles, health tips, and traditional medicine insights.",
      images: [`${BASE_URL}/images/news.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/blog`,
    },
  },

  // Gallery Page
  gallery: {
    title: "Gallery | Visual Journey of Healing | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Explore our photo gallery showcasing our medical center, healing practices, herbal preparations, and the traditional medicine journey. A visual story of wellness, healing, and cultural medicine.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "photo gallery",
      "Deshet photos",
      "medical center photos",
      "healing photos",
      "herbal medicine gallery",
      "traditional medicine images",
      "visual stories",
    ],
    openGraph: {
      title: "Gallery | Visual Journey of Healing",
      description:
        "A visual journey of our medical center, healing practices, and traditional medicine.",
      url: `${BASE_URL}/gallery`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Deshet Gallery - Visual Journey of Healing",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery | Visual Journey of Healing",
      description:
        "A visual journey of our medical center, healing practices, and traditional medicine.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/gallery`,
    },
  },

  // History Page
  history: {
    title: "Our History | Journey of Healing | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Trace Deshet's journey from establishment to today. Explore our milestones, growth, and unwavering commitment to preserving and delivering Ethiopian indigenous medicine since inception.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Deshet history",
      "medical center timeline",
      "milestones",
      "traditional medicine history Ethiopia",
      "our journey",
      "establishment",
    ],
    openGraph: {
      title: "Our History | Journey of Healing",
      description:
        "Tracing our journey of growth, impact, and commitment to preserving Ethiopian indigenous medicine.",
      url: `${BASE_URL}/history`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/since.jpg`,
          width: 1200,
          height: 630,
          alt: "Deshet History and Milestones",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our History | Journey of Healing",
      description:
        "Tracing our journey of growth, impact, and commitment to preserving Ethiopian indigenous medicine.",
      images: [`${BASE_URL}/images/since.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/history`,
    },
  },

  // Booking Page
  booking: {
    title: "Book Appointment | Schedule Your Visit | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Book your appointment at ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል. Schedule a consultation for traditional medical services, herbal medicine, or healing treatments. Experience premium indigenous healthcare.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "book appointment",
      "schedule visit",
      "medical consultation booking",
      "appointment booking",
      "book consultation",
      "schedule appointment",
      "medical center booking",
    ],
    openGraph: {
      title: "Book Appointment | Schedule Your Visit",
      description:
        "Book your appointment for traditional medical services, herbal medicine, or healing treatments at Deshet.",
      url: `${BASE_URL}/booking`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Book Appointment at Deshet Medical Center",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Book Appointment | Schedule Your Visit",
      description:
        "Book your appointment for traditional medical services, herbal medicine, or healing treatments at Deshet.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/booking`,
    },
  },

  // Contact Us Page
  "contact-us": {
    title: "Contact Us | Get in Touch | ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል",
    description:
      "Get in touch with ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል. Contact us for appointments, inquiries about our services, or to learn more about traditional medicine. We're here to help you on your healing journey.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "contact Deshet",
      "get in touch",
      "contact medical center Ethiopia",
      "reach us",
      "office location",
      "email address",
      "phone number",
      "medical center contact",
    ],
    openGraph: {
      title: "Contact Us | Get in Touch",
      description:
        "Get in touch with ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል. Contact us for appointments, inquiries, or to learn more about traditional medicine.",
      url: `${BASE_URL}/contact-us`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Contact Deshet Medical Center",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Get in Touch",
      description: "Get in touch with ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል for appointments and inquiries.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/contact-us`,
    },
  },
};

/**
 * Get locale-specific metadata translations
 */
function getMetadataTranslations(locale: Locale) {
  return locale === "am" ? am.meta : en.meta;
}

/**
 * Get locale code for OpenGraph (e.g., "en_US", "am_ET")
 */
function getOpenGraphLocale(locale: Locale): string {
  return locale === "am" ? "am_ET" : "en_US";
}

/**
 * Generate alternate language links for a given route
 */
function generateAlternateLanguages(route: string): Metadata["alternates"] {
  // Since we're using cookie-based locale, all routes are the same
  // but we still provide alternate links for SEO
  const baseUrl = route === "/" ? BASE_URL : `${BASE_URL}${route}`;
  
  return {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
      am: baseUrl,
    },
  };
}

/**
 * Get page metadata key from route
 */
function getPageKeyFromRoute(route: string): string {
  const normalizedRoute = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  
  // Map route to page key
  const routeMap: Record<string, string> = {
    home: "home",
    "who-we-are": "whoWeAre",
    programs: "programs",
    blog: "blog",
    gallery: "gallery",
    history: "history",
    booking: "booking",
    "contact-us": "contactUs",
  };
  
  return routeMap[normalizedRoute] || normalizedRoute;
}

/**
 * Generate locale-aware metadata for a page
 * @param route - The route path (e.g., "/", "/who-we-are")
 * @param locale - The locale ("en" or "am")
 * @param customMetadata - Optional custom metadata to merge
 */
export function generatePageMetadata(
  route: string,
  locale: Locale = "en",
  customMetadata?: Partial<Metadata>
): Metadata {
  const pageKey = getPageKeyFromRoute(route);
  const translations = getMetadataTranslations(locale);
  const pageMeta = translations.pages[pageKey as keyof typeof translations.pages];
  
  // Fallback to English if translation not found
  const fallbackMeta = en.meta.pages[pageKey as keyof typeof en.meta.pages];
  const meta = pageMeta || fallbackMeta || translations.pages.home;
  
  const pageUrl = route === "/" ? BASE_URL : `${BASE_URL}${route}`;
  const ogLocale = getOpenGraphLocale(locale);
  
  // Get default metadata from PAGE_METADATA for keywords and images
  const defaultMeta = PAGE_METADATA[pageKey] || PAGE_METADATA.home;
  
  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    keywords: defaultMeta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      siteName: translations.siteName,
      images: defaultMeta.openGraph?.images || [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: ogLocale,
      type: "website",
      alternateLocale: locales.filter((l) => l !== locale).map(getOpenGraphLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: defaultMeta.twitter?.images || [DEFAULT_TWITTER_IMAGE],
      creator: "@deshetmed",
    },
    alternates: generateAlternateLanguages(route),
  };
  
  // Merge with custom metadata if provided
  if (customMetadata) {
    return {
      ...metadata,
      ...customMetadata,
      openGraph: {
        ...metadata.openGraph,
        ...customMetadata.openGraph,
      },
      twitter: {
        ...metadata.twitter,
        ...customMetadata.twitter,
      },
      alternates: {
        ...metadata.alternates,
        ...customMetadata.alternates,
      },
    };
  }
  
  return metadata;
}

/**
 * Generate root layout metadata with locale support
 * @param locale - The locale ("en" or "am")
 */
export function generateRootMetadata(locale: Locale = "en"): Metadata {
  const translations = getMetadataTranslations(locale);
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: translations.siteName,
      template: `%s | ${ORGANIZATION.shortName}`,
    },
    description: translations.siteDescription,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: ORGANIZATION.name }],
    creator: ORGANIZATION.name,
    publisher: ORGANIZATION.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      languages: {
        en: BASE_URL,
        am: BASE_URL,
      },
    },
  };
}
