import React from "react";
import { Metadata } from "next";
import { BASE_URL } from "~/lib/seo/metadata-config";
import { generateNewsMetadata } from "~/lib/seo/metadata-helpers";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";

interface NewsDetailsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  views: number;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
  };
}

async function fetchNewsData(slug: string): Promise<NewsPost | null> {
  try {
    const res = await fetch(`/api/public/news/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching news for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const news = await fetchNewsData(params.id);

  if (!news) {
    return {
      title: "News Not Found | TSD",
      description: "The news post you are looking for does not exist.",
    };
  }

  return generateNewsMetadata({
    title: news.title,
    excerpt: news.excerpt,
    content: news.content,
    featuredImage: news.featuredImage,
    slug: news.slug,
    category: news.category,
    tags: news.tags,
    publishedAt: news.publishedAt,
    author: news.author,
  });
}

export default async function NewsDetailsLayout({
  children,
  params,
}: NewsDetailsLayoutProps) {
  const news = await fetchNewsData(params.id);

  if (!news) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  const articleSchema = generateArticleSchema({
    title: news.title,
    description: news.excerpt || news.content.substring(0, 160),
    image: news.featuredImage,
    datePublished: news.publishedAt,
    dateModified: news.updatedAt || news.publishedAt,
    author: news.author,
    url: `${BASE_URL}/news/${news.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "News & Events", url: `${BASE_URL}/news` },
    { name: news.title, url: `${BASE_URL}/news/${news.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </div>
  );
}
