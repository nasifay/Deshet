"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import GalleryPageSkeleton from "~/components/sections/gallery-page-skeleton";

interface GalleryItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  alt?: string;
  caption?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
  };
}

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
}

// Placeholder medical/traditional medicine images
const placeholderImages = [
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
];

// --- Reusable Image Card Component ---
const ImageCard = ({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}) => (
  <div
    className={`bg-white p-2 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
  >
    <div className={`relative w-full h-full overflow-hidden ${imgClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl">
          <p className="text-white text-sm font-medium line-clamp-2">{caption}</p>
        </div>
      )}
    </div>
  </div>
);

// --- Background SVG Pattern ---
const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0"
    >
      <defs>
        <pattern
          id="pattern-swoosh"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path
            d="M 50 0 C 20 50, 20 150, 50 200"
            stroke="#E8F5E9"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 150 0 C 180 50, 180 150, 150 200"
            stroke="#E8F5E9"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-swoosh)" />
    </svg>
  </div>
);

export default function GalleryPage() {
  const { t, locale } = useTranslation();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory, page, locale]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/public/gallery/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "24",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
      });

      const url = `/api/public/gallery?${params}`;
      console.log("Gallery - Fetching:", {
        selectedCategory,
        url,
        params: params.toString(),
      });

      const response = await fetch(url);
      const data = await response.json();
      
      console.log("Gallery - Response:", {
        success: data.success,
        itemCount: data.data?.length || 0,
        total: data.pagination?.total || 0,
        category: selectedCategory,
        debug: data.debug, // Show debug info if available
      });

      if (data.success) {
        if (page === 1) {
          setGalleryItems(data.data);
        } else {
          setGalleryItems((prev) => [...prev, ...data.data]);
        }
        setHasMore(data.pagination.page < data.pagination.pages);
      } else {
        // Fallback to placeholder images if no data
        if (page === 1) {
          setGalleryItems(
            placeholderImages.map((url, index) => ({
              _id: `placeholder-${index}`,
              filename: `placeholder-${index}.jpg`,
              originalName: `Medical Image ${index + 1}`,
              url,
              alt: `Medical and traditional medicine image ${index + 1}`,
            }))
          );
        }
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      // Fallback to placeholder images on error
      if (page === 1) {
        setGalleryItems(
          placeholderImages.map((url, index) => ({
            _id: `placeholder-${index}`,
            filename: `placeholder-${index}.jpg`,
            originalName: `Medical Image ${index + 1}`,
            url,
            alt: `Medical and traditional medicine image ${index + 1}`,
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCategoryChange = (categoryId: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSelectedCategory(categoryId);
    setPage(1);
    setGalleryItems([]);
  };

  if (loading && galleryItems.length === 0) {
    return <GalleryPageSkeleton />;
  }

  return (
    <div className="relative bg-[#FCFFFD] font-sans overflow-hidden min-h-screen">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-primary-green mb-4 ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {locale === "am" ? "ፎቶ ማዕከል" : "GALLERY"}
          </h1>
          <p
            className={`text-lg text-[#F57C00] max-w-2xl mx-auto ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {locale === "am"
              ? "የእኛን የሕክምና ማዕከል፣ የባህላዊ ሕክምና ልምዶች እና የአገልግሎቶቻችንን የምስል መግለጫ"
              : "A visual journey of our medical center, traditional medicine practices, and services"}
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={(e) => handleCategoryChange("all", e)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-primary-green text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {locale === "am" ? "ሁሉም" : "All"}
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={(e) => handleCategoryChange(category._id, e)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category._id
                    ? "bg-primary-green text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={
                  selectedCategory === category._id && category.color
                    ? { backgroundColor: category.color }
                    : undefined
                }
              >
                {getBilingualText(
                  category.name as string | { en: string; am: string } | undefined,
                  locale,
                  category.name
                )}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {galleryItems.map((item, index) => {
                // Create a masonry-like layout with varying heights
                const isLarge = index % 7 === 0 || index % 7 === 3;
                const isWide = index % 7 === 6;

                return (
                  <div
                    key={item._id}
                    className={
                      isLarge
                        ? "sm:col-span-2 sm:row-span-2"
                        : isWide
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <ImageCard
                      src={item.url || placeholderImages[index % placeholderImages.length]}
                      alt={
                        getBilingualText(
                          item.alt as string | { en: string; am: string } | undefined,
                          locale,
                          item.alt || item.originalName
                        ) || item.originalName
                      }
                      caption={
                        item.caption
                          ? getBilingualText(
                              item.caption as
                                | string
                                | { en: string; am: string }
                                | undefined,
                              locale,
                              item.caption
                            )
                          : undefined
                      }
                      className={isLarge ? "h-[30rem] md:h-[38rem]" : "h-52 md:h-64"}
                    />
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? locale === "am"
                      ? "በመጫን ላይ..."
                      : "Loading..."
                    : locale === "am"
                    ? "ተጨማሪ ይጫኑ"
                    : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p
              className={`text-gray-600 text-lg ${
                locale === "am" ? "font-amharic" : ""
              }`}
            >
              {locale === "am"
                ? "አሁን ምንም ምስሎች የሉም"
                : "No images available at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
