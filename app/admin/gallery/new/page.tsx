"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { getBilingualText } from "~/lib/i18n/utils";
import { useTranslation } from "~/lib/i18n/hooks";
import BilingualField from "~/app/admin/components/BilingualField";

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export default function NewGalleryItemPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { locale } = useTranslation();

  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    filename: "",
    originalName: "",
    url: "",
    type: "image" as "image" | "video" | "document" | "other",
    mimeType: "",
    size: 0,
    dimensions: { width: 0, height: 0 },
    alt: { en: "", am: "" } as string | { en: string; am: string },
    caption: { en: "", am: "" } as string | { en: string; am: string },
    customClass: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "/api/admin/gallery/categories?limit=100&isActive=true"
      );
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
        if (data.data.length > 0) {
          setFormData((prev) => ({ ...prev, category: data.data[0]._id }));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Get image dimensions
      const img = new Image();
      img.onload = async () => {
        // Upload to server
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const data = await response.json();

        if (data.success) {
          setFormData((prev) => ({
            ...prev,
            filename: data.data.filename,
            originalName: file.name,
            url: data.data.url,
            type: "image",
            mimeType: file.type,
            size: file.size,
            dimensions: {
              width: img.width,
              height: img.height,
            },
            alt: { en: file.name.replace(/\.[^/.]+$/, ""), am: "" }, // Remove extension
          }));
        } else {
          alert(data.error || "Failed to upload image");
          setPreview("");
        }
      };

      img.src = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      setPreview("");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    if (confirm("Remove this image?")) {
      setPreview("");
      setFormData((prev) => ({
        ...prev,
        filename: "",
        originalName: "",
        url: "",
        mimeType: "",
        size: 0,
        dimensions: { width: 0, height: 0 },
        alt: { en: "", am: "" },
        caption: { en: "", am: "" },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.url) {
      alert("Please upload an image first");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Gallery item created successfully!");
        router.push("/admin/gallery");
      } else {
        alert(data.error || "Failed to create gallery item");
      }
    } catch (error) {
      console.error("Error creating gallery item:", error);
      alert("Failed to create gallery item");
    } finally {
      setSaving(false);
    }
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
              Upload to Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Add a new item to your gallery
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
      >
        {/* Image Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Image Upload
          </h2>

          {preview ? (
            <div className="relative group">
              <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Overlay buttons */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-[1] transition-opacity rounded-lg flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={uploading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                >
                  Remove
                </button>
              </div>

              {uploading && (
                <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-white text-sm">Uploading...</p>
                  </div>
                </div>
              )}

              {/* Image Info */}
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Filename:</strong> {formData.originalName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Dimensions:</strong> {formData.dimensions.width} ×{" "}
                  {formData.dimensions.height}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Size:</strong> {(formData.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer flex flex-col items-center justify-center"
            >
              {uploading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Uploading...
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                    Click to upload image
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Image Details */}
        <div className="space-y-4 border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Image Details
          </h2>

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
            disabled={saving || !formData.url}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-[0.5] disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Add to Gallery"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
