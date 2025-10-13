import { MetadataRoute } from "next";
import { BASE_URL } from "~/lib/seo/metadata-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/who-we-are`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/history`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/volunteer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Fetch dynamic news routes
  try {
    const newsResponse = await fetch(`${BASE_URL}/api/public/news?limit=100`, {
      next: { revalidate: 3600 },
    });
    const newsData = await newsResponse.json();

    const newsRoutes: MetadataRoute.Sitemap =
      newsData.success && newsData.data
        ? newsData.data.map((post: { slug: string; updatedAt: string }) => ({
            url: `${BASE_URL}/news/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          }))
        : [];

    return [...staticRoutes, ...newsRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
