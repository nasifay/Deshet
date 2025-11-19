"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, ExternalLink } from "lucide-react";
import LandingSectionEditor from "~/app/admin/components/LandingSectionEditor";

interface LandingPage {
  _id: string;
  title: string;
  slug: string;
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

export default function LandingPageAdmin() {
  const router = useRouter();
  const [page, setPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "Landing Page",
    slug: "landing",
    status: "published" as "draft" | "published" | "archived",
    sections: [] as Array<{
      id: string;
      type: string;
      data: Record<string, unknown>;
      order: number;
    }>,
    seo: {
      metaTitle:
        "Deshet Indigenous Medical Center | Premium Ethiopian Traditional Medicine",
      metaDescription:
        "Deshet Indigenous Medical Center delivers premium Ethiopian traditional medicine, herbal healing, spiritual therapy, and cultural healing services in Addis Ababa, Ethiopia.",
      keywords: [
        "Deshet Medical Center",
        "Ethiopian traditional medicine",
        "indigenous medicine Ethiopia",
        "herbal medicine",
        "traditional healing",
        "Ethiopian herbal remedies",
        "cultural healing",
        "spiritual healing",
        "Addis Ababa",
        "Ethiopia",
      ],
    },
  });

  useEffect(() => {
    fetchLandingPage();
  }, []);

  const fetchLandingPage = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/landing");
      const data = await response.json();

      if (data.success) {
        setPage(data.data);
        setFormData({
          title: data.data.title || "Landing Page",
          slug: data.data.slug || "landing",
          status: data.data.status || "published",
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
            metaTitle:
              data.data.seo?.metaTitle ||
              "Deshet Indigenous Medical Center | Premium Ethiopian Traditional Medicine",
            metaDescription:
              data.data.seo?.metaDescription ||
              "Deshet Indigenous Medical Center delivers premium Ethiopian traditional medicine, herbal healing, spiritual therapy, and cultural healing services in Addis Ababa, Ethiopia.",
            keywords: data.data.seo?.keywords || [
              "Deshet Medical Center",
              "Ethiopian traditional medicine",
              "indigenous medicine Ethiopia",
              "herbal medicine",
              "traditional healing",
              "Ethiopian herbal remedies",
              "cultural healing",
              "spiritual healing",
              "Addis Ababa",
              "Ethiopia",
            ],
          },
        });
      } else {
        // If no landing page exists, initialize with default sections
        initializeDefaultSections();
      }
    } catch (error) {
      console.error("Error fetching landing page:", error);
      initializeDefaultSections();
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultSections = () => {
    const defaultSections = [
      {
        id: "hero-section",
        type: "HeroSection",
        data: {
          title: "DESHET",
          subtitle: "INDIGENOUS MEDICAL CENTER",
          description: {
            en: "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing",
            am: "የኢትዮጵያ ባህላዊ የሕክምና ማዕከል የአመዳድብ ሕክምና፣ መንፈሳዊ እና ባህላዊ ሕክምና እንሰጣለን",
          },
          landscapeImage: "/home-hero.png",
          leftImages: [
            "/landing-left.png",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
          ],
          middleImages: [
            "/landing-middle.png",
            "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop",
          ],
          rightImages: [
            "/landing-right.png",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
          ],
          ctaText: {
            en: "Book Appointment",
            am: "ቀጠሮ ይውሰዱ",
          },
          ctaLink: "/booking",
          ctaSecondaryText: {
            en: "Learn More",
            am: "ተጨማሪ ይማሩ",
          },
          ctaSecondaryLink: "/who-we-are",
        },
        order: 0,
      },
      {
        id: "about-section",
        type: "AboutSection",
        data: {
          title: {
            en: "ABOUT DESHET",
            am: "ስለ ደሸት",
          },
          description: {
            en: "Deshet Indigenous Medical Center is a premium Ethiopian traditional medical facility dedicated to preserving and promoting indigenous healing practices. We combine ancient wisdom with modern understanding to provide comprehensive traditional medical services including herbal medicine preparation, traditional diagnostic techniques, detox therapy, and spiritual healing.",
            am: "ደሸት ባህላዊ የሕክምና ማዕከል የኢትዮጵያ ባህላዊ ሕክምናን ማስቀጠል እና ማበረታታት የሚገዛ የሕክምና ተቋም ነው። የጥንት ጥበብን ከዘመናዊ ግንዛቤ ጋር በማዋሃድ የአመዳድብ ሕክምና አዘገጃጀት፣ ባህላዊ የመመርመር ዘዴዎች፣ የሰውነት ማጽዳት ሕክምና እና መንፈሳዊ ሕክምና ጨምሮ ሁሉንም የባህላዊ ሕክምና አገልግሎቶችን እንሰጣለን።",
          },
          ctaText: {
            en: "Read More",
            am: "ተጨማሪ ያንብቡ",
          },
          ctaLink: "/who-we-are",
          images: [
            "/images/about/1.png",
            "/images/about/2.png",
            "/images/about/3.png",
            "/images/about/4.png",
          ],
        },
        order: 1,
      },
      {
        id: "statistics-section",
        type: "StatisticsSection",
        data: {
          stats: [
            { number: "58", label: "Staffs" },
            { number: "5", label: "Offices in 4 Regions" },
            { number: "250+", label: "Volunteers" },
            { number: "15", label: "Protocols" },
          ],
        },
        order: 2,
      },
      {
        id: "achievements-section",
        type: "AchievementsSection",
        data: {
          title: "Our Achievements",
          achievements: [
            {
              title: "25+ Years of Impact",
              description:
                "Decades of dedicated service to Ethiopian communities.",
            },
            {
              title: "Multi-Regional Presence",
              description: "Operating across 4 regions of Ethiopia.",
            },
            {
              title: "Youth-Centered Approach",
              description: "Empowering thousands of young people.",
            },
          ],
        },
        order: 3,
      },
      {
        id: "volunteer-banner",
        type: "VolunteerBanner",
        data: {
          title: "Join Our Mission",
          description:
            "Become a volunteer and make a difference in your community.",
          ctaText: "Volunteer Now",
          ctaLink: "/volunteer",
          backgroundImage: "/images/cta.jpg",
        },
        order: 4,
      },
    ];

    setFormData((prev) => ({
      ...prev,
      sections: defaultSections,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/admin/landing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Landing page saved successfully!");
        router.refresh();
      } else {
        alert(data.error || "Failed to save landing page");
      }
    } catch (error) {
      console.error("Error saving landing page:", error);
      alert("Failed to save landing page");
    } finally {
      setSaving(false);
    }
  };

  const handleAutoSave = async (sections: typeof formData.sections) => {
    try {
      const response = await fetch("/api/admin/landing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, sections }),
      });

      const data = await response.json();

      if (!data.success) {
        console.error("Auto-save failed:", data.error);
      }
    } catch (error) {
      console.error("Error auto-saving:", error);
    }
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

  const handlePreview = () => {
    // Open the public landing page in a new tab
    window.open("/", "_blank");
  };

  const handleViewLive = () => {
    // Open the public landing page in the same tab
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Landing Page Editor
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {page
                ? `Last updated: ${new Date(page.updatedAt).toLocaleString()}`
                : "Create new landing page"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live</span>
          </Link>
          <button
            onClick={handlePreview}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                placeholder="Landing Page"
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
                placeholder="landing"
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
        {page && (
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
        )}
      </div>

      {/* Landing Page Sections - Full Width Section Editor */}
      <LandingSectionEditor
        sections={formData.sections}
        onChange={(sections) => setFormData((prev) => ({ ...prev, sections }))}
        onAutoSave={handleAutoSave}
      />
    </div>
  );
}
