import { Metadata } from "next";
import { BASE_URL, ORGANIZATION, DEFAULT_OG_IMAGE } from "./metadata-config";
import type { Locale } from "~/lib/i18n/config";
import { locales } from "~/lib/i18n/config";

/**
 * Get locale code for OpenGraph (e.g., "en_US", "am_ET")
 */
function getOpenGraphLocale(locale: Locale): string {
  return locale === "am" ? "am_ET" : "en_US";
}

/**
 * Generate metadata for dynamic news detail pages
 */
export function generateNewsMetadata({
  title,
  excerpt,
  content,
  featuredImage,
  slug,
  category,
  tags,
  publishedAt,
  author,
  locale = "en",
}: {
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  slug: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  author?: { name: string };
  locale?: Locale;
}): Metadata {
  const pageUrl = `${BASE_URL}/blog/${slug}`;
  const ogImage = featuredImage || DEFAULT_OG_IMAGE;
  const ogLocale = getOpenGraphLocale(locale);

  // Extract first 155 characters from content if excerpt is not available
  const description =
    excerpt ||
    (content
      ? content.replace(/<[^>]*>/g, "").substring(0, 155) + "..."
      : "Read the latest articles and updates from Deshet Indigenous Medical Center.");

  // Create optimized title (under 60 chars)
  const shortTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
  const metaTitle = `${shortTitle} | Deshet Blog`;

  return {
    title: metaTitle,
    description,
    keywords: [
      ...(tags || []),
      "Deshet blog",
      "medical center blog Ethiopia",
      category || "news",
      "community updates",
      "social development news",
    ],
    authors: author ? [{ name: author.name }] : undefined,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map(getOpenGraphLocale),
      type: "article",
      publishedTime: publishedAt,
      authors: author ? [author.name] : undefined,
      tags: tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@deshetmed",
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: pageUrl,
        am: pageUrl,
      },
    },
  };
}

/**
 * Generate metadata for dynamic program detail pages (if needed in future)
 */
export function generateProgramMetadata({
  title,
  description,
  image,
  category,
  locale = "en",
}: {
  title: string;
  description: string;
  image?: string;
  category?: string;
  locale?: Locale;
}): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE;
  const ogLocale = getOpenGraphLocale(locale);

  // Create optimized title
  const shortTitle = title.length > 45 ? title.substring(0, 45) + "..." : title;
  const metaTitle = `${shortTitle} | Deshet Programs`;

  // Truncate description to 155 chars
  const metaDescription =
    description.length > 155
      ? description.substring(0, 155) + "..."
      : description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      title,
      category || "programs",
      "traditional medicine",
      "indigenous healthcare",
      "Ethiopia programs",
      "medical services",
    ],
    openGraph: {
      title,
      description: metaDescription,
      siteName: ORGANIZATION.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map(getOpenGraphLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      languages: {
        en: BASE_URL,
        am: BASE_URL,
      },
    },
  };
}

/**
 * Merge custom metadata with defaults
 */
export function mergeMetadata(
  defaultMeta: Metadata,
  customMeta?: Partial<Metadata>
): Metadata {
  if (!customMeta) return defaultMeta;

  return {
    ...defaultMeta,
    ...customMeta,
    openGraph: {
      ...defaultMeta.openGraph,
      ...customMeta.openGraph,
    },
    twitter: {
      ...defaultMeta.twitter,
      ...customMeta.twitter,
    },
  };
}

/**
 * Extract plain text from HTML content
 */
export function extractTextFromHtml(html: string, maxLength = 160): string {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

/**
 * Generate robots meta tags
 */
export function generateRobotsMeta(
  index: boolean = true,
  follow: boolean = true
): { robots: string } {
  const indexValue = index ? "index" : "noindex";
  const followValue = follow ? "follow" : "nofollow";
  return {
    robots: `${indexValue}, ${followValue}`,
  };
}
