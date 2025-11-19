"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./Card";
import { Leaf, Package, AlertCircle, Sprout, Heart } from "lucide-react";
import { useTranslation } from "~/lib/i18n/hooks";

export interface Product {
  _id?: string;
  slug?: string;
  name: string;
  nameAmharic?: string;
  description?: string;
  descriptionAmharic?: string;
  image?: string;
  images?: string[];
  ingredients?: string;
  ingredientsAmharic?: string;
  usageInstructions?: string;
  usageInstructionsAmharic?: string;
  benefits?: string;
  benefitsAmharic?: string;
  safetyNotes?: string;
  safetyNotesAmharic?: string;
  price?: number;
  category?: string;
  isActive?: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

export default function ProductCard({
  product,
  variant = "default",
  className = "",
}: ProductCardProps) {
  const { t, locale } = useTranslation();
  const isAmharic = locale === "am";

  const displayName = isAmharic && product.nameAmharic ? product.nameAmharic : product.name;
  const displayDescription =
    isAmharic && product.descriptionAmharic
      ? product.descriptionAmharic
      : product.description || "";

  if (variant === "compact") {
    return (
      <Link href={`/products/${product.slug || product._id || "#"}`}>
        <Card
          className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
        >
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={product.image || product.images?.[0] || "/images/product-placeholder.png"}
              alt={displayName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white font-semibold text-sm line-clamp-2">{displayName}</h3>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className={`overflow-hidden premium-card ${className}`}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative w-full h-64 md:h-full min-h-[300px]">
            <Image
              src={product.image || product.images?.[0] || "/images/product-placeholder.png"}
              alt={displayName}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <CardContent className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-bold text-primary-green mb-2">{displayName}</h3>
              {displayDescription && (
                <p className="text-gray-600 text-sm line-clamp-3">{displayDescription}</p>
              )}
            </div>

            {product.ingredients && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-primary-green icon-medical" />
                  <h4 className="font-semibold text-sm text-gray-800">
                    {t("products.ingredients")}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  {isAmharic && product.ingredientsAmharic
                    ? product.ingredientsAmharic
                    : product.ingredients}
                </p>
              </div>
            )}

            {product.benefits && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary-green icon-medical" />
                  <h4 className="font-semibold text-sm text-gray-800">
                    {t("products.benefits")}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  {isAmharic && product.benefitsAmharic ? product.benefitsAmharic : product.benefits}
                </p>
              </div>
            )}

            {product.safetyNotes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <h4 className="font-semibold text-xs text-yellow-800">
                    {t("products.safetyNotes")}
                  </h4>
                </div>
                <p className="text-yellow-700 text-xs">
                  {isAmharic && product.safetyNotesAmharic
                    ? product.safetyNotesAmharic
                    : product.safetyNotes}
                </p>
              </div>
            )}

            {product.price && (
              <div className="mt-auto pt-4 border-t">
                <p className="text-2xl font-bold text-primary-green">
                  {t("products.price")}: {product.price.toLocaleString()} {t("products.currency")}
                </p>
              </div>
            )}

            <Link
              href={`/products/${product.slug || product._id || "#"}`}
              className="mt-4 inline-block text-center bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-[#0e6a32] transition-colors"
            >
              {t("products.viewDetails")}
            </Link>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Link href={`/products/${product.slug || product._id || "#"}`}>
      <Card
        className={`group cursor-pointer overflow-hidden premium-shadow hover:shadow-xl premium-transition ${className}`}
      >
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={product.image || product.images?.[0] || "/images/product-placeholder.png"}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-green transition-colors">
            {displayName}
          </h3>
          {displayDescription && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{displayDescription}</p>
          )}

          <div className="flex items-center justify-between">
            {product.category && (
              <span className="text-xs bg-primary-green/10 text-primary-green px-2 py-1 rounded">
                {product.category}
              </span>
            )}
            {product.price && (
              <span className="text-lg font-bold text-primary-green">
                {product.price.toLocaleString()} {t("products.currency")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

