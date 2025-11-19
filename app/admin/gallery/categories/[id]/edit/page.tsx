"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploadField from "~/app/admin/components/ImageUploadField";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#128341",
    icon: "🖼️",
    order: 0,
    isActive: true,
    featuredImage: "",
    hasBackground: false,
    backgroundImage: "",
    gap: "",
  });

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/gallery/categories/${id}`);
      const data = await response.json();

      if (data.success) {
        setFormData({
          name: data.data.name,
          slug: data.data.slug,
          description: data.data.description || "",
          color: data.data.color || "#128341",
          icon: data.data.icon || "🖼️",
          order: data.data.order || 0,
          isActive: data.data.isActive,
          featuredImage: data.data.featuredImage || "",
          hasBackground: data.data.hasBackground || false,
          backgroundImage: data.data.backgroundImage || "",
          gap: data.data.gap || "",
        });
      } else {
        alert("Category not found");
        router.push("/admin/gallery/categories");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      alert("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/gallery/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Category updated successfully!");
        router.push("/admin/gallery/categories");
      } else {
        alert(data.error || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Loading category...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/gallery/categories"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Edit Gallery Category
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update category information
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
      >
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="space-y-4 border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Appearance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-2xl text-center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color (Hex)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Gap Class
            </label>
            <input
              type="text"
              value={formData.gap}
              onChange={(e) =>
                setFormData({ ...formData, gap: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green font-mono"
              placeholder="e.g., gap-[15px]"
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4 border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Images
          </h2>

          <ImageUploadField
            label="Featured Image"
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasBackground"
              checked={formData.hasBackground}
              onChange={(e) =>
                setFormData({ ...formData, hasBackground: e.target.checked })
              }
              className="w-4 h-4 text-primary-green bg-gray-100 border-gray-300 rounded focus:ring-primary-green dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="hasBackground"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enable Background Image with Overlay
            </label>
          </div>

          {formData.hasBackground && (
            <ImageUploadField
              label="Background Image"
              value={formData.backgroundImage}
              onChange={(url) =>
                setFormData({ ...formData, backgroundImage: url })
              }
            />
          )}
        </div>

        {/* Status */}
        <div className="space-y-4 border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Status
          </h2>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-primary-green bg-gray-100 border-gray-300 rounded focus:ring-primary-green dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Active (visible on public gallery page)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 border-t dark:border-gray-700 pt-6">
          <Link
            href="/admin/gallery/categories"
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
