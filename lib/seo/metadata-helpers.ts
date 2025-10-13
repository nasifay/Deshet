import { Metadata } from "next";
import { BASE_URL, ORGANIZATION, DEFAULT_OG_IMAGE } from "./metadata-config";

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
}): Metadata {
  const pageUrl = `${BASE_URL}/news/${slug}`;
  const ogImage = featuredImage || DEFAULT_OG_IMAGE;

  // Extract first 155 characters from content if excerpt is not available
  const description =
    excerpt ||
    (content
      ? content.replace(/<[^>]*>/g, "").substring(0, 155) + "..."
      : "Read the latest news and updates from Tamra for Social Development.");

  // Create optimized title (under 60 chars)
  const shortTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
  const metaTitle = `${shortTitle} | TSD News`;

  return {
    title: metaTitle,
    description,
    keywords: [
      ...(tags || []),
      "Tamra news",
      "NGO news Ethiopia",
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
      locale: "en_US",
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
      creator: "@tamra_sdt",
    },
    alternates: {
      canonical: pageUrl,
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
}: {
  title: string;
  description: string;
  image?: string;
  category?: string;
}): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE;

  // Create optimized title
  const shortTitle = title.length > 45 ? title.substring(0, 45) + "..." : title;
  const metaTitle = `${shortTitle} | TSD Programs`;

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
      "youth empowerment",
      "community development",
      "Ethiopia programs",
      "NGO programs",
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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [ogImage],
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
