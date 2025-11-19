"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../../components/RichTextEditor";
import ImageArrayUploadField from "../../components/ImageArrayUploadField";
import {
  uploadImageFile,
} from "../../components/ImageUploadField";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nameAm: z.string().optional(),
  nameEn: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  descriptionAm: z.string().optional(),
  descriptionEn: z.string().optional(),
  ingredients: z.string().min(1, "Ingredients are required"),
  ingredientsAm: z.string().optional(),
  ingredientsEn: z.string().optional(),
  usageInstructions: z.string().min(1, "Usage instructions are required"),
  usageInstructionsAm: z.string().optional(),
  usageInstructionsEn: z.string().optional(),
  benefits: z.string().min(1, "Benefits are required"),
  benefitsAm: z.string().optional(),
  benefitsEn: z.string().optional(),
  safetyNotes: z.string().optional(),
  safetyNotesAm: z.string().optional(),
  safetyNotesEn: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  isActive: z.boolean(),
  order: z.number().min(0),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [pendingImageFiles, setPendingImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "draft",
      isActive: true,
      order: 0,
    },
  });

  // Auto-generate slug from name
  const name = watch("name");
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    if (name) {
      const currentSlug = watch("slug");
      if (!currentSlug || currentSlug === generateSlug(watch("name") || "")) {
        setValue("slug", generateSlug(name));
      }
    }
  }, [name, setValue, watch]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      // Upload pending image files
      let uploadedImages = [...images];
      if (pendingImageFiles.length > 0) {
        for (const file of pendingImageFiles) {
          try {
            const url = await uploadImageFile(file);
            uploadedImages.push(url);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }

      const payload = {
        ...data,
        images: uploadedImages,
        price: data.price ? parseFloat(data.price) : undefined,
      };

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to create product");
        setIsLoading(false);
        return;
      }

      alert("Product created successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Create Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Add a new herbal product or remedy
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Product Name (English) *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Slug *
                </label>
                <input
                  {...register("slug")}
                  type="text"
                  id="slug"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="product-slug"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nameAm"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Product Name (Amharic)
                </label>
                <input
                  {...register("nameAm")}
                  type="text"
                  id="nameAm"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="የምርት ስም"
                />
              </div>

              <div>
                <label
                  htmlFor="nameEn"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Product Name (English - Alternative)
                </label>
                <input
                  {...register("nameEn")}
                  type="text"
                  id="nameEn"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Alternative English name"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (English) *
                </label>
                <RichTextEditor
                  content={watch("description") || ""}
                  onChange={(content) => setValue("description", content)}
                  placeholder="Enter product description..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Amharic)
                </label>
                <RichTextEditor
                  content={watch("descriptionAm") || ""}
                  onChange={(content) => setValue("descriptionAm", content)}
                  placeholder="የምርት መግለጫ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (English - Alternative)
                </label>
                <RichTextEditor
                  content={watch("descriptionEn") || ""}
                  onChange={(content) => setValue("descriptionEn", content)}
                  placeholder="Alternative English description..."
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Product Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ingredients (English) *
                </label>
                <RichTextEditor
                  content={watch("ingredients") || ""}
                  onChange={(content) => setValue("ingredients", content)}
                  placeholder="List ingredients..."
                />
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ingredients (Amharic)
                </label>
                <RichTextEditor
                  content={watch("ingredientsAm") || ""}
                  onChange={(content) => setValue("ingredientsAm", content)}
                  placeholder="የተጠቃሚዎች ዝርዝር..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usage Instructions (English) *
                </label>
                <RichTextEditor
                  content={watch("usageInstructions") || ""}
                  onChange={(content) => setValue("usageInstructions", content)}
                  placeholder="How to use this product..."
                />
                {errors.usageInstructions && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.usageInstructions.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usage Instructions (Amharic)
                </label>
                <RichTextEditor
                  content={watch("usageInstructionsAm") || ""}
                  onChange={(content) =>
                    setValue("usageInstructionsAm", content)
                  }
                  placeholder="እንዴት መጠቀም እንደሚቻል..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits (English) *
                </label>
                <RichTextEditor
                  content={watch("benefits") || ""}
                  onChange={(content) => setValue("benefits", content)}
                  placeholder="Product benefits..."
                />
                {errors.benefits && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.benefits.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits (Amharic)
                </label>
                <RichTextEditor
                  content={watch("benefitsAm") || ""}
                  onChange={(content) => setValue("benefitsAm", content)}
                  placeholder="የምርት ጥቅሞች..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Safety Notes (English)
                </label>
                <RichTextEditor
                  content={watch("safetyNotes") || ""}
                  onChange={(content) => setValue("safetyNotes", content)}
                  placeholder="Safety warnings and precautions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Safety Notes (Amharic)
                </label>
                <RichTextEditor
                  content={watch("safetyNotesAm") || ""}
                  onChange={(content) => setValue("safetyNotesAm", content)}
                  placeholder="የደህንነት ማስጠንቀቂያዎች..."
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Product Images
            </h2>
            <ImageArrayUploadField
              label="Product Images"
              value={images}
              onChange={setImages}
              placeholder="https://example.com/image.jpg"
              description="Upload multiple images for this product"
            />
          </div>

          {/* Category & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Category *
              </label>
              <select
                {...register("category")}
                id="category"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="">Select Category</option>
                <option value="herbal-remedies">Herbal Remedies</option>
                <option value="supplements">Supplements</option>
                <option value="teas">Herbal Teas</option>
                <option value="oils">Essential Oils</option>
                <option value="creams">Creams & Ointments</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Price (ETB)
              </label>
              <input
                {...register("price")}
                type="number"
                id="price"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="order"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Display Order
              </label>
              <input
                {...register("order", { valueAsNumber: true })}
                type="number"
                id="order"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          {/* Status & Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Status *
              </label>
              <select
                {...register("status")}
                id="status"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 pt-8">
              <label className="flex items-center space-x-2">
                <input
                  {...register("isActive")}
                  type="checkbox"
                  className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active (Visible on website)
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isLoading ? "Creating..." : "Create Product"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

