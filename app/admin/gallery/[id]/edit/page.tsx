"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { getBilingualText } from "~/lib/i18n/utils";
import { useTranslation } from "~/lib/i18n/hooks";
import BilingualField from "~/app/admin/components/BilingualField";

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface GalleryItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  type: string;
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string | { en: string; am: string };
  caption?: string | { en: string; am: string };
  customClass?: string;
  category: {
    _id: string;
    name: string;
  };
}

export default function EditGalleryItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { locale } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [item, setItem] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState({
    originalName: "",
    alt: { en: "", am: "" } as string | { en: string; am: string },
    caption: { en: "", am: "" } as string | { en: string; am: string },
    customClass: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchItem();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/gallery/categories?limit=100");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/gallery/${id}`);
      const data = await response.json();

      if (data.success) {
        setItem(data.data);
        // Normalize alt and caption to bilingual format
        const normalizeBilingual = (value: string | { en: string; am: string } | undefined) => {
          if (!value) return { en: "", am: "" };
          if (typeof value === "object" && "en" in value) {
            return value;
          }
          return { en: value as string, am: "" };
        };
        
        setFormData({
          originalName: data.data.originalName,
          alt: normalizeBilingual(data.data.alt),
          caption: normalizeBilingual(data.data.caption),
          customClass: data.data.customClass || "",
          category: data.data.category._id,
        });
      } else {
        alert("Gallery item not found");
        router.push("/admin/gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      alert("Failed to load gallery item");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Gallery item updated successfully!");
        router.push("/admin/gallery");
      } else {
        alert(data.error || "Failed to update gallery item");
      }
    } catch (error) {
      console.error("Error updating gallery item:", error);
      alert("Failed to update gallery item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Loading gallery item...
        </p>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/gallery"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Edit Gallery Item
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update gallery item details
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
      >
        {/* Image Preview */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Image Preview
          </h2>

          <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={typeof item.alt === "object" && item.alt !== null && "en" in item.alt 
                  ? item.alt.en 
                  : (item.alt as string) || item.originalName}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <p>Non-image file</p>
              </div>
            )}
          </div>

          {/* File Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Filename:</strong> {item.filename}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Type:</strong> {item.mimeType}
            </p>
            {item.dimensions && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Dimensions:</strong> {item.dimensions.width} ×{" "}
                {item.dimensions.height}
              </p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Size:</strong> {formatFileSize(item.size)}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>URL:</strong>{" "}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.url}
              </a>
            </p>
          </div>

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> To replace the image, please delete this
              item and upload a new one. This form only allows updating
              metadata.
            </p>
          </div>
        </div>

        {/* Image Details */}
        <div className="space-y-4 border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Image Details
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Original Name
            </label>
            <input
              type="text"
              value={formData.originalName}
              onChange={(e) =>
                setFormData({ ...formData, originalName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {typeof cat.icon === 'string' ? cat.icon : '🖼️'} {getBilingualText(cat.name as string | { en: string; am: string } | undefined, locale, cat.slug)}
                </option>
              ))}
            </select>
          </div>

          <BilingualField
            label="Alt Text"
            value={formData.alt}
            onChange={(value) =>
              setFormData({ ...formData, alt: value })
            }
            type="text"
            placeholder={{
              en: "Descriptive text for accessibility",
              am: "ለመዳረሻ ገላጭ ጽሑፍ",
            }}
          />

          <BilingualField
            label="Caption"
            value={formData.caption}
            onChange={(value) =>
              setFormData({ ...formData, caption: value })
            }
            type="textarea"
            rows={3}
            placeholder={{
              en: "Optional caption for this image",
              am: "ለዚህ ምስል አማራጭ መግለጫ",
            }}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom CSS Class
            </label>
            <input
              type="text"
              value={formData.customClass}
              onChange={(e) =>
                setFormData({ ...formData, customClass: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green font-mono"
              placeholder="e.g., w-[314px] relative h-80"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Optional custom CSS classes for special layouts
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 border-t dark:border-gray-700 pt-6">
          <Link
            href="/admin/gallery"
            className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
