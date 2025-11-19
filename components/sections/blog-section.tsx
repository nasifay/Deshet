"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { cn } from "~/lib/utils";
import { useState, useEffect } from "react";
import { NewsEventsSkeleton } from "./landing-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface BlogItem {
  _id?: string;
  slug?: string;
  featuredImage?: string;
  title: string | { en: string; am: string };
  excerpt?: string | { en: string; am: string };
}

interface BlogSectionProps {
  blog?: BlogItem[];
  title?: string;
}

export default function BlogSection() {
  const { t, locale } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get section title from landing page CMS
        const landingResponse = await fetch("/api/public/landing");
        const landingResult = await landingResponse.json();

        if (landingResult.success) {
          const section = landingResult.data?.sections?.find(
            (s: any) => s.type === "BlogSection"
          );
          if (section?.data?.title) {
            setSectionTitle(
              getBilingualText(
                section.data.title,
                locale,
                locale === "am" ? "ብሎግ እና ዝማኔዎች" : "BLOG & UPDATES"
              )
            );
          }
        }

        // Try new blog endpoint first, fallback to news endpoint for backward compatibility
        const response = await fetch("/api/public/blog?limit=4&featured=true");
        const result = await response.json();

        if (result.success && result.data) {
          setBlogPosts(result.data);
        } else {
          // Fallback to news endpoint
          const fallbackResponse = await fetch("/api/public/news?limit=4&featured=true");
          const fallbackResult = await fallbackResponse.json();
          if (fallbackResult.success && fallbackResult.data) {
            setBlogPosts(fallbackResult.data);
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Final fallback to news endpoint
        try {
          const fallbackResponse = await fetch("/api/public/news?limit=4&featured=true");
          const fallbackResult = await fallbackResponse.json();
          if (fallbackResult.success && fallbackResult.data) {
            setBlogPosts(fallbackResult.data);
          }
        } catch (fallbackError) {
          console.error("Error fetching fallback blog data:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <NewsEventsSkeleton />;
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36 font-['Roboto']">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className={`primary-title text-primary-green justify-self-center self-center text-center ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {sectionTitle ||
              getBilingualText(
                undefined,
                locale,
                locale === "am" ? "ብሎግ እና ዝማኔዎች" : "BLOG & UPDATES"
              )}
          </h2>
          <Link
            href="/blog"
            className=" hidden sm:block text-gray-500 hover:text-[#268246] text-sm font-medium transition-colors duration-200"
          >
            {locale === "am" ? "ተጨማሪ ይመልከቱ" : "See More"}
          </Link>
        </div>

        {/* Blog Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6",
            blogPosts.length >= 4
              ? "md:grid-cols-3 lg:grid-cols-4"
              : blogPosts.length >= 3
              ? "md:grid-cols-3 lg:grid-cols-3"
              : blogPosts.length >= 2
              ? "md:grid-cols-2 lg:grid-cols-2"
              : "md:grid-cols-1 lg:grid-cols-1"
          )}
        >
          {blogPosts.map((item, index) => (
            <Link
              key={item._id || index}
              href={`/blog/${item.slug || "#"}`}
              className="relative group overflow-hidden rounded-2xl bg-black block"
            >
              <div className="relative w-auto h-60 md:h-96 ">
                <Image
                  src={item.featuredImage || "/news-and-events/1.png"}
                  alt={getBilingualText(item.title as string | { en: string; am: string } | undefined, locale, "Blog post")}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3
                  className={`text-[13px] md:text-sm font-semibold text-[#FFB400] leading-snug mb-1 line-clamp-2 ${
                    locale === "am" ? "font-amharic" : ""
                  }`}
                >
                  {getBilingualText(
                    item.title as string | { en: string; am: string } | undefined,
                    locale,
                    ""
                  )}
                </h3>
                <p
                  className={`text-[12px] md:text-sm text-white/85 leading-snug line-clamp-3 ${
                    locale === "am" ? "font-amharic" : ""
                  }`}
                >
                  {getBilingualText(
                    item.excerpt as string | { en: string; am: string } | undefined,
                    locale,
                    ""
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4">
          <Link href="/blog">
            <Button
              variant="outline"
              className="bg-transparent text-black block sm:hidden  hover:text-[#268246] text-sm font-medium transition-colors duration-200"
            >
              {locale === "am" ? "ተጨማሪ ይመልከቱ" : "See More"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}



