"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import DeferredImageArrayUploadField, {
  PendingImage,
} from "~/app/admin/components/DeferredImageArrayUploadField";
import DeferredImageUploadField from "~/app/admin/components/DeferredImageUploadField";
import {
  processImageArray,
  processSingleImage,
} from "../utils/imageUploadHelper";

interface TimelineSection {
  title: string;
  description: string;
  order: number;
}

export default function NewHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "HISTORY",
    subtitle: "",
    heroImages: [] as PendingImage[],
    introductionParagraphs: ["", ""],
    milestonesImage: null as PendingImage | null,
    timelineSections: [] as TimelineSection[],
    closingQuote: "",
    status: "draft" as "draft" | "published" | "archived",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload all pending images first (BOTH hero images AND milestones image)
      const heroImageUrls = await processImageArray(formData.heroImages);
      const milestonesImageUrl = await processSingleImage(
        formData.milestonesImage
      );

      // Create payload with final URLs
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        heroImages: heroImageUrls,
        introductionParagraphs: formData.introductionParagraphs,
        milestonesImage: milestonesImageUrl,
        timelineSections: formData.timelineSections,
        closingQuote: formData.closingQuote,
        status: formData.status,
      };

      const response = await fetch("/api/admin/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("History entry created successfully!");
        router.push("/admin/history");
      } else {
        alert(data.error || "Failed to create history entry");
      }
    } catch (error) {
      console.error("Error creating history entry:", error);
      alert("Failed to create history entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addIntroductionParagraph = () => {
    setFormData({
      ...formData,
      introductionParagraphs: [...formData.introductionParagraphs, ""],
    });
  };

  const updateIntroductionParagraph = (index: number, value: string) => {
    const newParagraphs = [...formData.introductionParagraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, introductionParagraphs: newParagraphs });
  };

  const removeIntroductionParagraph = (index: number) => {
    if (formData.introductionParagraphs.length > 1) {
      const newParagraphs = formData.introductionParagraphs.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, introductionParagraphs: newParagraphs });
    }
  };

  const addTimelineSection = () => {
    setFormData({
      ...formData,
      timelineSections: [
        ...formData.timelineSections,
        {
          title: "",
          description: "",
          order: formData.timelineSections.length,
        },
      ],
    });
  };

  const updateTimelineSection = (
    index: number,
    field: keyof TimelineSection,
    value: string | number
  ) => {
    const newSections = [...formData.timelineSections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, timelineSections: newSections });
  };

  const removeTimelineSection = (index: number) => {
    const newSections = formData.timelineSections.filter((_, i) => i !== index);
    // Re-order remaining sections
    newSections.forEach((section, i) => {
      section.order = i;
    });
    setFormData({ ...formData, timelineSections: newSections });
  };

  const moveTimelineSection = (index: number, direction: "up" | "down") => {
    const newSections = [...formData.timelineSections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap sections
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];

    // Update order
    newSections.forEach((section, i) => {
      section.order = i;
    });

    setFormData({ ...formData, timelineSections: newSections });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/history"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Create History Entry
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Add a new history page content
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Basic Information
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Tracing our journey of growth, impact, and commitment..."
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "draft" | "published" | "archived",
                })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Hero Images Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Hero Images
          </h2>
          <DeferredImageArrayUploadField
            label="Hero Images"
            value={formData.heroImages}
            onChange={(images) =>
              setFormData({ ...formData, heroImages: images })
            }
            description="Select multiple images for the hero section. They will be uploaded when you save."
            placeholder="Enter image URL..."
          />
        </div>

        {/* Introduction Paragraphs Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Introduction Paragraphs
            </h2>
            <button
              type="button"
              onClick={addIntroductionParagraph}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Paragraph</span>
            </button>
          </div>

          {formData.introductionParagraphs.map((paragraph, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paragraph {index + 1}
                  </label>
                  <textarea
                    value={paragraph}
                    onChange={(e) =>
                      updateIntroductionParagraph(index, e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    placeholder="Enter introduction text..."
                  />
                </div>
                {formData.introductionParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIntroductionParagraph(index)}
                    className="mt-8 p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove paragraph"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Milestones Image Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Milestones Image
          </h2>
          <DeferredImageUploadField
            label="Milestones Timeline Image"
            value={formData.milestonesImage}
            onChange={(image) =>
              setFormData({ ...formData, milestonesImage: image })
            }
            description="Select an image showing your organization's timeline/milestones. It will be uploaded when you save."
          />
        </div>

        {/* Timeline Sections Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Timeline Sections
            </h2>
            <button
              type="button"
              onClick={addTimelineSection}
              className="flex items-center space-x-2 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>

          {formData.timelineSections.map((section, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Section {index + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => moveTimelineSection(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-600 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTimelineSection(index, "down")}
                    disabled={index === formData.timelineSections.length - 1}
                    className="p-1 text-gray-600 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTimelineSection(index)}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove section"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateTimelineSection(index, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="e.g., 2025 – TODAY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    updateTimelineSection(index, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Describe this period..."
                />
              </div>
            </div>
          ))}

          {formData.timelineSections.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No timeline sections added yet
            </div>
          )}
        </div>

        {/* Closing Quote Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Closing Quote
          </h2>
          <textarea
            value={formData.closingQuote}
            onChange={(e) =>
              setFormData({ ...formData, closingQuote: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder="Enter a closing quote or statement..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/history"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Creating..." : "Create History Entry"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
