"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
}

export default function NewsAndEvents() {
  const [newsCards, setNewsCards] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/public/news?limit=4&sort=-publishedAt');
        const data = await response.json();
        if (data.success) {
          setNewsCards(data.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36 font-['Roboto']">
        <div className="mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#268246]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36 font-['Roboto']">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="justify-self-center self-center text-center text-4xl md:text-5xl font-extrabold text-[#268246] tracking-tight">
            NEWS AND EVENTS
          </h2>
          <Link
            href="/news"
            className="text-gray-500 hover:text-[#268246] text-sm font-medium transition-colors duration-200"
          >
            See More
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 wxga:grid-cols-4 gap-6">
          {newsCards.map((card) => (
            <Link
              key={card._id}
              href={`/news/${card.slug}`}
              className="relative group overflow-hidden rounded-2xl bg-black"
            >
              <div className="relative w-auto h-60 md:h-96 ">
                <Image
                  src={card.featuredImage || "/images/news.jpg"}
                  alt={card.title}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2 py-1 text-[10px] font-semibold text-white bg-[#268246] rounded mb-2">
                  {card.category}
                </span>
                <h3 className="text-[13px] md:text-sm font-semibold text-[#FFB400] leading-snug mb-1 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-[12px] md:text-sm text-white/85 leading-snug line-clamp-3">
                  {card.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {newsCards.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">No news posts available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
