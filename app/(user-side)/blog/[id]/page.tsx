"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface BlogPost {
  _id: string;
  title: string | { en: string; am: string };
  slug: string;
  content: string | { en: string; am: string };
  excerpt: string | { en: string; am: string };
  featuredImage?: string;
  category: string;
  tags: string[];
  views: number;
  publishedAt: string;
  author: {
    name: string;
  };
}

export default function BlogDetailsPage() {
  const params = useParams();
  const { locale } = useTranslation();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const slug = params.id as string;
        const response = await fetch(`/api/public/blog/${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setBlogPost(data.data);
        } else {
          setError(data.error || 'Failed to load blog post');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="relative w-full bg-white min-h-screen overflow-hidden">
        <main className="relative flex flex-col items-center justify-center px-4 py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#24A046]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </main>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="relative w-full bg-white min-h-screen overflow-hidden">
        <main className="relative flex flex-col items-center justify-center px-4 py-20">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-[#24A046] text-white rounded-lg hover:bg-[#1e8038] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white min-h-screen overflow-hidden">
      <main className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-16 sm:py-20">
        {/* Back Button */}
        <div className="w-full max-w-[900px] mb-6">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#24A046] hover:text-[#1e8038] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Title & Meta Info */}
        <div className="w-full max-w-[900px] mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-[#24A046] rounded">
              {blogPost.category}
            </span>
            {blogPost.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                {blogPost.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="text-[26px] sm:text-[36px] md:text-[44px] font-black text-[#24A046] uppercase tracking-[0.5px] mb-4">
            {getBilingualText(blogPost.title as string | { en: string; am: string } | undefined, locale, "")}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blogPost.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{blogPost.views} views</span>
            </div>
            <span>By {blogPost.author.name}</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-[900px] bg-white rounded-[24px] shadow-[0_4px_26px_rgba(0,0,0,0.05)] overflow-hidden border border-[#F2F2F2]">
          {/* Featured Image */}
          {blogPost.featuredImage && (
            <div className="w-full">
              <Image
                src={blogPost.featuredImage}
                alt={getBilingualText(blogPost.title as string | { en: string; am: string } | undefined, locale, "Blog post")}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Text Content */}
          <div className="px-6 sm:px-10 py-6 sm:py-8">
            <div 
              className="prose prose-lg max-w-none text-[#333333] text-[15px] sm:text-[16px] leading-[1.8] font-normal"
              dangerouslySetInnerHTML={{ 
                __html: getBilingualText(
                  blogPost.content as string | { en: string; am: string } | undefined, 
                  locale, 
                  ""
                ) 
              }}
            />
          </div>
        </div>

        {/* Share & Back Button */}
        <div className="w-full max-w-[900px] mt-10 flex justify-between items-center">
          <Link 
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-[#24A046] text-white rounded-lg hover:bg-[#1e8038] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    </div>
  );
}
