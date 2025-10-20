import React from "react";
import { Metadata } from "next";
import { BASE_URL } from "~/lib/seo/metadata-config";
import { generateNewsMetadata } from "~/lib/seo/metadata-helpers";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "~/lib/seo/json-ld";
import connectDB from "~/lib/db/mongodb";
import NewsPost from "~/lib/db/models/NewsPost";

interface NewsDetailsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

interface NewsPostData {
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

async function fetchNewsData(slug: string): Promise<NewsPostData | null> {
  try {
    await connectDB();

    const post = await NewsPost.findOne({
      slug: slug,
      status: "published",
    })
      .select("-__v")
      .populate("author", "name")
      .lean();

    if (!post) {
      return null;
    }

    // Convert MongoDB _id to string for serialization
    // Handle author - it could be an ObjectId or a populated object
    const author = post.author as any;

    return {
      ...post,
      _id: post._id.toString(),
      publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
      author: {
        name: author?.name || "Unknown Author",
      },
    } as NewsPostData;
  } catch (error) {
    console.error("Error fetching news for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = await fetchNewsData(id);

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
  const { id } = await params;
  const news = await fetchNewsData(id);

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
