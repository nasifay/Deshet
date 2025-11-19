"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";
import { MainContentSectionSkeleton } from "~/components/sections/news-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface BlogPost {
  _id: string;
  title: string | { en: string; am: string };
  slug: string;
  excerpt: string | { en: string; am: string };
  featuredImage?: string;
  category: string;
}

export const MainContentSection = () => {
  const { locale } = useTranslation();
  const [blogItems, setBlogItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Note: API endpoint will be updated in Phase 8, using /api/public/news for now
        const response = await fetch(
          "/api/public/news?limit=8&sort=-publishedAt"
        );
        const data = await response.json();
        if (data.success) {
          setBlogItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const animationDelays = [
    "0ms",
    "200ms",
    "400ms",
    "600ms",
    "800ms",
    "1000ms",
    "1200ms",
    "1400ms",
  ];

  if (loading) {
    return <MainContentSectionSkeleton />;
  }

  return (
    <section className="flex flex-col w-full max-w-[1590px] mx-auto items-start gap-11 relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {blogItems.map((item, index) => (
          <Card
            key={item._id}
            className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-0 overflow-hidden"
            style={
              {
                "--animation-delay": animationDelays[index],
              } as React.CSSProperties
            }
          >
            <Link href={`/blog/${item.slug}`}>
              <CardContent className="flex flex-col p-0">
                <Image
                  className="w-full h-[200px] object-cover rounded-t-xl"
                  alt="Blog post"
                  src={item.featuredImage || "/images/news.jpg"}
                  width={400}
                  height={200}
                />

                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {getBilingualText(item.title as string | { en: string; am: string } | undefined, locale, "")}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {getBilingualText(item.excerpt as string | { en: string; am: string } | undefined, locale, "")}
                  </p>

                  <span className="text-[#4CAF50] text-sm hover:underline transition-colors cursor-pointer">
                    Read More
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {blogItems.length === 0 && !loading && (
        <div className="text-center w-full py-10">
          <p className="text-gray-500">No blog posts available yet.</p>
        </div>
      )}
    </section>
  );
};
