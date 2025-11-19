import { Metadata } from "next";
import { generateNewsMetadata } from "~/lib/seo/metadata-helpers";
import { BASE_URL } from "~/lib/seo/metadata-config";
import { getLocale } from "~/lib/i18n/server";

/**
 * Fetch news data for metadata generation
 * This runs on the server during build/request time
 */
async function getNewsData(slug: string) {
  try {
    // In production, this would be an absolute URL
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || BASE_URL;
    const response = await fetch(`${apiUrl}/api/public/news/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching news data for metadata:", error);
    return null;
  }
}

/**
 * Generate metadata for news detail pages
 * This function is exported and used by the page component
 */
export async function generateNewsDetailMetadata(
  slug: string
): Promise<Metadata> {
  const locale = await getLocale();
  const newsData = await getNewsData(slug);

  if (!newsData) {
    // Fallback metadata if news not found
    return {
      title: "Blog Post Not Found | Deshet Medical Center",
      description: "The blog article you are looking for could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  // Use the helper function to generate comprehensive metadata
  return generateNewsMetadata({
    title: newsData.title,
    excerpt: newsData.excerpt,
    content: newsData.content,
    featuredImage: newsData.featuredImage,
    slug: newsData.slug,
    category: newsData.category,
    tags: newsData.tags,
    publishedAt: newsData.publishedAt,
    author: newsData.author,
    locale,
  });
}
