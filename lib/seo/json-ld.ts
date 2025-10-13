import { BASE_URL, ORGANIZATION } from "./metadata-config";

/**
 * Generate JSON-LD structured data for the organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORGANIZATION.name,
    alternateName: ORGANIZATION.shortName,
    url: BASE_URL,
    logo: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    sameAs: [
      ORGANIZATION.socialMedia.facebook,
      ORGANIZATION.socialMedia.twitter,
      ORGANIZATION.socialMedia.linkedin,
      ORGANIZATION.socialMedia.instagram,
    ],
    foundingLocation: {
      "@type": "Place",
      name: "Addis Ababa, Ethiopia",
    },
  };
}

/**
 * Generate JSON-LD structured data for a news article
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: { name: string };
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || ORGANIZATION.image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author?.name || ORGANIZATION.name,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Generate JSON-LD structured data for events
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    location: {
      "@type": "Place",
      name: location || "Addis Ababa, Ethiopia",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "Ethiopia",
      },
    },
    image: image || ORGANIZATION.image,
    organizer: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: BASE_URL,
    },
    url: url,
  };
}

/**
 * Generate JSON-LD structured data for a webpage
 */
export function generateWebPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      name: ORGANIZATION.name,
      url: BASE_URL,
    },
    about: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumb navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for contact page
 */
export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Get in touch with Tamra for Social Development",
    url: `${BASE_URL}/contact-us`,
    mainEntity: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: ORGANIZATION.address.addressLocality,
        addressCountry: ORGANIZATION.address.addressCountry,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for FAQ (if applicable)
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Render JSON-LD script tag
 */
export function renderJsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
