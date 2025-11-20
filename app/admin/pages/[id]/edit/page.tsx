"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import TabbedSectionEditor from "~/app/admin/components/TabbedSectionEditor";
import BilingualField from "~/app/admin/components/BilingualField";

interface Page {
  _id: string;
  title: string | { en: string; am: string };
  slug: string;
  content: string | { en: string; am: string };
  status: "draft" | "published" | "archived";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  sections?: Array<{
    id: string;
    type: string;
    data: Record<string, unknown>;
    order: number;
  }>;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const pageId = params.id as string;

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: "", am: "" } as string | { en: string; am: string },
    slug: "",
    content: { en: "", am: "" } as string | { en: string; am: string },
    status: "draft" as "draft" | "published" | "archived",
    sections: [] as Array<{
      id: string;
      type: string;
      data: Record<string, unknown>;
      order: number;
    }>,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
    },
  });

  useEffect(() => {
    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/pages/${pageId}`);
      const data = await response.json();

      if (data.success) {
        setPage(data.data);
        // Handle bilingual title and content
        const titleValue = typeof data.data.title === 'object' && data.data.title !== null && 'en' in data.data.title
          ? data.data.title
          : { en: data.data.title || '', am: '' };
        const contentValue = typeof data.data.content === 'object' && data.data.content !== null && 'en' in data.data.content
          ? data.data.content
          : { en: data.data.content || '', am: '' };
        
        setFormData({
          title: titleValue,
          slug: data.data.slug,
          content: contentValue,
          status: data.data.status,
          sections: (data.data.sections || []).map(
            (
              section: {
                id?: string;
                type: string;
                data: Record<string, unknown>;
                order?: number;
              },
              index: number
            ) => ({
              id: section.id || `section-${index}`,
              type: section.type,
              data: section.data || {},
              order: section.order !== undefined ? section.order : index,
            })
          ),
          seo: {
            metaTitle: data.data.seo?.metaTitle || "",
            metaDescription: data.data.seo?.metaDescription || "",
            keywords: data.data.seo?.keywords || [],
          },
        });
      } else {
        alert("Page not found");
        router.push("/admin/pages");
      }
    } catch (error) {
      console.error("Error fetching page:", error);
      alert("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Page saved successfully!");
        router.push("/admin/pages");
      } else {
        alert(data.error || "Failed to save page");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string | { en: string; am: string }) => {
    const titleStr = typeof title === 'string' ? title : title.en || '';
    setFormData((prev) => {
      const prevTitleStr = typeof prev.title === 'string' ? prev.title : prev.title?.en || '';
      return {
        ...prev,
        title,
        slug:
          prev.slug === generateSlug(prevTitleStr)
            ? generateSlug(titleStr)
            : prev.slug,
      };
    });
  };

  const handleKeywordsChange = (keywordsString: string) => {
    const keywords = keywordsString
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, keywords },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <Link
            href="/admin/pages"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pages</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/pages"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Pages</span>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Edit Page
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date(page.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-[0.5] text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Page"}</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <BilingualField
                label="Page Title"
                value={formData.title}
                onChange={(value) => handleTitleChange(value)}
                type="text"
                placeholder={{ en: "Enter page title", am: "የገጽ ርዕስ ያስገቡ" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="page-url-slug"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL: /{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as
                      | "draft"
                      | "published"
                      | "archived",
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            SEO Settings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seo: { ...prev.seo, metaTitle: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="SEO title for search engines"
                maxLength={60}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.seo.metaTitle.length}/60 characters
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Description
              </label>
              <textarea
                value={formData.seo.metaDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seo: { ...prev.seo, metaDescription: e.target.value },
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none text-sm"
                placeholder="Brief description for search engines"
                maxLength={160}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.seo.metaDescription.length}/160 characters
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Keywords
              </label>
              <input
                type="text"
                value={formData.seo.keywords.join(", ")}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate keywords with commas
              </p>
            </div>
          </div>
        </div>

        {/* Page Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Page Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Author:
              </span>
              <p className="text-gray-600 dark:text-gray-400">
                {page.author.name}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Created:
              </span>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(page.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Last Updated:
              </span>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(page.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Sections - Full Width Tabbed Interface */}
      <TabbedSectionEditor
        sections={formData.sections}
        onChange={(sections) => setFormData((prev) => ({ ...prev, sections }))}
      />
    </div>
  );
}
