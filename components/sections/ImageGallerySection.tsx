'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
  featuredImage?: string;
  hasBackground?: boolean;
  backgroundImage?: string;
  gap?: string;
  isActive: boolean;
}

interface GalleryItem {
  _id: string;
  originalName: string;
  url: string;
  alt?: string;
  caption?: string;
  customClass?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

// Fallback data in case API fails
const fallbackGalleryData = [
  {
    title: "CLM",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-7.svg",
    hasBackground: true,
    backgroundImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-48.png",
  },
  {
    title: "CRPVF",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-6.svg",
    hasBackground: false,
  },
  {
    title: "CSPW",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-2.svg",
    hasBackground: false,
  },
  {
    title: "Events",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-1.svg",
    hasBackground: false,
    gap: "gap-[15px]",
  },
  {
    title: "Exhibition",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-9.svg",
    hasBackground: false,
  },
  {
    title: "GESI",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-4.svg",
    hasBackground: false,
  },
  {
    title: "SRHR",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-8.svg",
    hasBackground: false,
  },
  {
    title: "Meetings",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-5.svg",
    hasBackground: false,
  },
  {
    title: "Training",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120.svg",
    hasBackground: false,
  },
];

const fallbackRecognitionImages = [
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
    className: "w-[314px] ml-[-6.00px] relative h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
    className: "w-[314px] relative h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
    className: "w-[703px] mr-[-6.00px] rounded-[31px] object-cover relative h-80",
  },
];

export function ImageGallerySection() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);

      // Fetch categories and gallery items in parallel
      const [categoriesRes, itemsRes] = await Promise.all([
        fetch('/api/public/gallery/categories'),
        fetch('/api/public/gallery?limit=100'),
      ]);

      const categoriesData = await categoriesRes.json();
      const itemsData = await itemsRes.json();

      if (categoriesData.success) {
        // Sort by order and filter active categories
        const sortedCategories = (categoriesData.data || [])
          .filter((cat: GalleryCategory) => cat.isActive)
          .sort((a: GalleryCategory, b: GalleryCategory) => a.order - b.order);
        setCategories(sortedCategories);
      }

      if (itemsData.success) {
        setGalleryItems(itemsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      // Fallback data will be used
    } finally {
      setLoading(false);
    }
  };

  // Get items for a specific category
  const getItemsForCategory = (categoryId: string) => {
    return galleryItems.filter(item => item.category._id === categoryId);
  };

  // Get recognition category and its items
  const recognitionCategory = categories.find(cat => cat.slug === 'recognition');
  const recognitionItems = recognitionCategory 
    ? getItemsForCategory(recognitionCategory._id)
    : [];

  // Get all categories except recognition
  const mainCategories = categories.filter(cat => cat.slug !== 'recognition');

  // Use fallback data if no data loaded
  const shouldUseFallback = !loading && categories.length === 0;
  const displayCategories = shouldUseFallback ? fallbackGalleryData : mainCategories;

  if (loading) {
    return (
      <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-10 relative px-4 py-20">
        <div className="w-full text-center text-primary-green">
          <div className="animate-spin h-12 w-12 border-4 border-primary-green border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-10 relative px-4">
      <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[65px] px-0 py-[88px]">
          <p className="max-w-[805px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
            A visual journey of our people, projects, and the change we create.
          </p>
        </CardContent>
      </Card>

      {/* Render main categories with featured images */}
      {shouldUseFallback ? (
        // Fallback rendering
        fallbackGalleryData.map((gallery, index) => (
        <article
            key={`fallback-gallery-${index}`}
          className="flex flex-col items-center gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": `${(index + 1) * 100}ms` } as React.CSSProperties}
        >
          <Card
            className={`w-full rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] ${
                gallery.hasBackground ? "bg-white relative overflow-hidden" : "bg-white"
              }`}
              style={gallery.hasBackground ? {
                backgroundImage: `url(${gallery.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
              } : undefined}
          >
            {gallery.hasBackground && (
                <div className="absolute inset-0 bg-white opacity-[0.95] rounded-[46px]" style={{ zIndex: 1 }} />
              )}
              <CardContent className="flex flex-col items-start justify-center gap-[65px] px-[65px] py-[88px] relative" style={{ zIndex: 2 }}>
                <div className={`inline-flex flex-col items-start justify-center ${gallery.gap || "gap-[54px]"}`}>
                <div className="inline-flex items-center gap-[15px]">
                  <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-5xl text-center tracking-[0] leading-[48.5px] whitespace-nowrap">
                    {gallery.title}
                  </h2>
                </div>
                  <img className="w-full max-w-[1456px]" alt={`${gallery.title} gallery`} src={gallery.imageSrc} />
                </div>
              </CardContent>
            </Card>
          </article>
        ))
      ) : (
        // Database-driven rendering
        mainCategories.map((category, index) => (
          <article
            key={`gallery-${category._id}`}
            className="flex flex-col items-center gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": `${(index + 1) * 100}ms` } as React.CSSProperties}
          >
            <Card
              className={`w-full rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] ${
                category.hasBackground ? "bg-white relative overflow-hidden" : "bg-white"
              }`}
              style={category.hasBackground && category.backgroundImage ? {
                backgroundImage: `url(${category.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              } : undefined}
            >
              {category.hasBackground && (
                <div className="absolute inset-0 bg-white opacity-[0.95] rounded-[46px]" style={{ zIndex: 1 }} />
              )}
              <CardContent className="flex flex-col items-start justify-center gap-[65px] px-[65px] py-[88px] relative" style={{ zIndex: 2 }}>
                <div className={`inline-flex flex-col items-start justify-center ${category.gap || "gap-[54px]"}`}>
                  <div className="inline-flex items-center gap-[15px]">
                    {category.icon && (
                      <span className="text-4xl">{category.icon}</span>
                    )}
                    <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-5xl text-center tracking-[0] leading-[48.5px] whitespace-nowrap">
                      {category.name}
                    </h2>
                  </div>

                  {category.featuredImage && (
                <img
                  className="w-full max-w-[1456px]"
                      alt={`${category.name} gallery`}
                      src={category.featuredImage}
                    />
                  )}

                  {/* Display additional images if any */}
                  {getItemsForCategory(category._id).length > 0 && (
                    <div className="flex flex-wrap gap-4 w-full mt-8">
                      {getItemsForCategory(category._id).map((item) => (
                        <img
                          key={item._id}
                          src={item.url}
                          alt={item.alt || item.originalName}
                          className="max-w-[300px] rounded-lg shadow-md"
                          title={item.caption}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </article>
        ))
      )}

      {/* Recognition Section */}
      {(recognitionCategory || shouldUseFallback) && (
      <article
        className="flex flex-col items-center gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
          style={{ "--animation-delay": `${(displayCategories.length + 1) * 100}ms` } as React.CSSProperties}
      >
        <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
          <CardContent className="flex flex-col items-start justify-center gap-[65px] px-[65px] py-[88px]">
            <div className="inline-flex flex-col items-start justify-center gap-[15px]">
              <div className="inline-flex items-center gap-[15px]">
                  {recognitionCategory?.icon && (
                    <span className="text-4xl">{recognitionCategory.icon}</span>
                  )}
                <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-5xl text-center tracking-[0] leading-[48.5px] whitespace-nowrap">
                    {recognitionCategory?.name || "Recognition"}
                </h2>
              </div>

              <div className="flex flex-col w-full max-w-[1445px] items-start gap-[55px]">
                <div className="flex items-center justify-center gap-[63px] w-full">
                    {shouldUseFallback ? (
                      // Fallback recognition images
                      fallbackRecognitionImages.map((image, index) => (
                        <img
                          key={`fallback-recognition-${index}`}
                          className={image.className}
                          alt={`Recognition ${index + 1}`}
                          src={image.src}
                        />
                      ))
                    ) : (
                      // Database recognition images
                      recognitionItems.length > 0 ? (
                        recognitionItems.map((item) => (
                          <img
                            key={item._id}
                            className={item.customClass || "w-[314px] relative h-80"}
                            alt={item.alt || item.originalName}
                            src={item.url}
                            title={item.caption}
                          />
                        ))
                      ) : (
                        fallbackRecognitionImages.map((image, index) => (
                          <img
                            key={`fallback-recognition-${index}`}
                      className={image.className}
                      alt={`Recognition ${index + 1}`}
                      src={image.src}
                    />
                        ))
                      )
                    )}
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
      )}
    </section>
  );
}