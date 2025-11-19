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
import { getLocale } from "~/lib/i18n/server";

interface BlogDetailsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

interface BlogPostData {
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

async function fetchBlogData(slug: string): Promise<BlogPostData | null> {
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
    } as BlogPostData;
  } catch (error) {
    console.error("Error fetching blog post for metadata:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const blogPost = await fetchBlogData(id);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found | Deshet Medical Center",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return generateNewsMetadata({
    title: blogPost.title,
    excerpt: blogPost.excerpt,
    content: blogPost.content,
    featuredImage: blogPost.featuredImage,
    slug: blogPost.slug,
    category: blogPost.category,
    tags: blogPost.tags,
    publishedAt: blogPost.publishedAt,
    author: blogPost.author,
    locale,
  });
}

export default async function BlogDetailsLayout({
  children,
  params,
}: BlogDetailsLayoutProps) {
  const { id } = await params;
  const blogPost = await fetchBlogData(id);

  if (!blogPost) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  const articleSchema = generateArticleSchema({
    title: blogPost.title,
    description: blogPost.excerpt || blogPost.content.substring(0, 160),
    image: blogPost.featuredImage,
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.updatedAt || blogPost.publishedAt,
    author: blogPost.author,
    url: `${BASE_URL}/blog/${blogPost.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Blog & Updates", url: `${BASE_URL}/blog` },
    { name: blogPost.title, url: `${BASE_URL}/blog/${blogPost.slug}` },
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
