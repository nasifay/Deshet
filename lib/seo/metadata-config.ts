import { Metadata } from "next";

// Base URL for the site
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://tamra-sdt.org";

// Default organization info
export const ORGANIZATION = {
  name: "Tamra for Social Development",
  shortName: "TSD",
  description:
    "Empowering young people through holistic development in health, education, livelihoods, and civic engagement across Ethiopia.",
  email: "hello@tsd.com",
  phone: "+251 911 121314",
  address: {
    streetAddress: "Addis Ababa",
    addressLocality: "Addis Ababa",
    addressRegion: "Addis Ababa",
    addressCountry: "Ethiopia",
  },
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/images/hero.jpg`,
  socialMedia: {
    facebook: "https://facebook.com/tamra-sdt",
    twitter: "https://twitter.com/tamra_sdt",
    linkedin: "https://linkedin.com/company/tamra-sdt",
    instagram: "https://instagram.com/tamra_sdt",
  },
};

// Default social media images
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero.jpg`;
export const DEFAULT_TWITTER_IMAGE = `${BASE_URL}/images/hero.jpg`;

// SEO Keywords (general)
export const DEFAULT_KEYWORDS = [
  "NGO Ethiopia",
  "youth empowerment",
  "peacebuilding",
  "gender development",
  "SRHR",
  "sexual reproductive health",
  "climate justice",
  "community development",
  "social development Ethiopia",
  "Tamra",
  "nonprofit organization",
  "Addis Ababa NGO",
  "women empowerment",
  "vulnerable populations",
  "sustainable development",
];

/**
 * Static page metadata configurations
 */
export const PAGE_METADATA: Record<string, Metadata> = {
  // Home / Landing Page
  home: {
    title: "Tamra for Social Development | Empowering Communities in Ethiopia",
    description:
      "Leading NGO in Ethiopia empowering youth through holistic programs in health, education, livelihoods, peacebuilding, and civic engagement. Creating lasting social change.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Ethiopian NGO",
      "youth development programs",
      "community empowerment",
      "social impact Ethiopia",
    ],
    openGraph: {
      title: "Tamra for Social Development | Empowering Communities",
      description:
        "Leading NGO in Ethiopia empowering youth through holistic programs in health, education, livelihoods, peacebuilding, and civic engagement.",
      url: BASE_URL,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Tamra for Social Development - Empowering Communities",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tamra for Social Development | Empowering Communities",
      description:
        "Leading NGO in Ethiopia empowering youth through holistic programs in health, education, livelihoods, and civic engagement.",
      images: [DEFAULT_TWITTER_IMAGE],
      creator: "@tamra_sdt",
    },
    alternates: {
      canonical: BASE_URL,
    },
  },

  // About / Who We Are Page
  "who-we-are": {
    title: "About Us | Who We Are | Tamra for Social Development",
    description:
      "Learn about Tamra's mission, vision, core values, leadership team, and our commitment to empowering communities across Ethiopia through inclusive development programs.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "about Tamra",
      "mission vision",
      "core values",
      "leadership team",
      "NGO Ethiopia about",
      "organization history",
    ],
    openGraph: {
      title: "About Us | Who We Are | Tamra for Social Development",
      description:
        "Learn about Tamra's mission, vision, core values, and our commitment to empowering communities across Ethiopia.",
      url: `${BASE_URL}/who-we-are`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/about.jpg`,
          width: 1200,
          height: 630,
          alt: "Tamra Team and Community",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Who We Are | Tamra for Social Development",
      description:
        "Learn about Tamra's mission, vision, and our commitment to empowering communities across Ethiopia.",
      images: [`${BASE_URL}/images/about.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/who-we-are`,
    },
  },

  // Programs Page
  programs: {
    title: "Our Programs | Youth Empowerment & Community Development | TSD",
    description:
      "Explore Tamra's comprehensive programs: Youth Empowerment & Peacebuilding, Sexual Reproductive Health & Gender Development, and Climate Justice & Livelihoods initiatives.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "youth programs Ethiopia",
      "peacebuilding programs",
      "SRHR programs",
      "gender equality programs",
      "climate justice",
      "livelihoods programs",
      "community programs",
    ],
    openGraph: {
      title: "Our Programs | Youth Empowerment & Community Development",
      description:
        "Explore Tamra's programs in Youth Empowerment, Peacebuilding, SRHR, Gender Development, and Climate Justice.",
      url: `${BASE_URL}/programs`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/programs/hero.png`,
          width: 1200,
          height: 630,
          alt: "Tamra Programs - Youth Empowerment",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Programs | Youth Empowerment & Community Development",
      description:
        "Explore Tamra's programs in Youth Empowerment, Peacebuilding, SRHR, and Climate Justice.",
      images: [`${BASE_URL}/programs/hero.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/programs`,
    },
  },

  // News & Events Page
  news: {
    title: "News & Events | Latest Updates | Tamra for Social Development",
    description:
      "Stay informed with the latest news, stories, milestones, and community events from Tamra for Social Development. Discover our impact and upcoming initiatives.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Tamra news",
      "NGO events Ethiopia",
      "community events",
      "social development news",
      "latest updates",
      "success stories",
    ],
    openGraph: {
      title: "News & Events | Latest Updates | Tamra for Social Development",
      description:
        "Stay informed with our latest stories, milestones, and community events.",
      url: `${BASE_URL}/news`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/news.jpg`,
          width: 1200,
          height: 630,
          alt: "Tamra News and Events",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "News & Events | Tamra for Social Development",
      description:
        "Stay informed with our latest stories, milestones, and community events.",
      images: [`${BASE_URL}/images/news.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/news`,
    },
  },

  // Gallery Page
  gallery: {
    title: "Gallery | Visual Stories of Impact | Tamra for Social Development",
    description:
      "Explore our photo gallery showcasing programs, projects, events, and the communities we serve. A visual journey of change, empowerment, and hope across Ethiopia.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "photo gallery",
      "Tamra photos",
      "community photos",
      "program photos",
      "Ethiopia NGO gallery",
      "visual stories",
    ],
    openGraph: {
      title: "Gallery | Visual Stories of Impact",
      description:
        "A visual journey of our people, projects, and the change we create across Ethiopia.",
      url: `${BASE_URL}/gallery`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Tamra Gallery - Visual Stories",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery | Visual Stories of Impact",
      description:
        "A visual journey of our people, projects, and the change we create.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/gallery`,
    },
  },

  // History Page
  history: {
    title: "Our History | Journey of Impact | Tamra for Social Development",
    description:
      "Trace Tamra's journey from establishment to today. Explore our milestones, growth, and unwavering commitment to communities across Ethiopia since inception.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Tamra history",
      "organization timeline",
      "milestones",
      "NGO history Ethiopia",
      "our journey",
      "establishment",
    ],
    openGraph: {
      title: "Our History | Journey of Impact",
      description:
        "Tracing our journey of growth, impact, and commitment to communities across Ethiopia.",
      url: `${BASE_URL}/history`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: `${BASE_URL}/images/since.jpg`,
          width: 1200,
          height: 630,
          alt: "Tamra History and Milestones",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our History | Journey of Impact",
      description:
        "Tracing our journey of growth, impact, and commitment to communities across Ethiopia.",
      images: [`${BASE_URL}/images/since.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/history`,
    },
  },

  // Volunteer Page
  volunteer: {
    title:
      "Join as a Volunteer | Make a Difference | Tamra for Social Development",
    description:
      "Join Tamra's volunteer network and become part of the change. Contribute to equality, empowerment, and sustainable development across Ethiopia. Apply now!",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "volunteer Ethiopia",
      "volunteer opportunities",
      "NGO volunteer",
      "join Tamra",
      "volunteer work",
      "community volunteer",
      "make a difference",
    ],
    openGraph: {
      title: "Join as a Volunteer | Make a Difference",
      description:
        "Join a network of people committed to equality, empowerment, and sustainable change.",
      url: `${BASE_URL}/volunteer`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Volunteer with Tamra",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Join as a Volunteer | Make a Difference",
      description:
        "Join a network of people committed to equality, empowerment, and sustainable change.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/volunteer`,
    },
  },

  // Donate Page
  donate: {
    title: "Donate | Support Our Mission | Tamra for Social Development",
    description:
      "Your donation creates lasting change. Support youth empowerment, women's rights, and vulnerable populations in Ethiopia. Every contribution makes a difference.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "donate Ethiopia",
      "support NGO",
      "donation",
      "contribute",
      "charitable giving",
      "support youth",
      "fund programs",
    ],
    openGraph: {
      title: "Donate | Support Our Mission",
      description:
        "Your support creates lasting change. Empowering youth, uplifting women, and protecting the vulnerable.",
      url: `${BASE_URL}/donate`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Support Tamra - Donate Now",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Donate | Support Our Mission",
      description:
        "Your support creates lasting change. Empowering youth and uplifting communities.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/donate`,
    },
  },

  // Contact Us Page
  "contact-us": {
    title: "Contact Us | Get in Touch | Tamra for Social Development",
    description:
      "Get in touch with Tamra for Social Development. Let's explore how we can work together for a better future. Contact us for partnerships, inquiries, or support.",
    keywords: [
      ...DEFAULT_KEYWORDS,
      "contact Tamra",
      "get in touch",
      "contact NGO Ethiopia",
      "reach us",
      "office location",
      "email address",
      "phone number",
    ],
    openGraph: {
      title: "Contact Us | Get in Touch",
      description:
        "Get in touch and be part of our journey of transformation. Let's work together for a better future.",
      url: `${BASE_URL}/contact-us`,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Contact Tamra",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Get in Touch",
      description: "Get in touch and be part of our journey of transformation.",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/contact-us`,
    },
  },
};
