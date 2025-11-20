"use client";

import { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  GripVertical,
  Globe,
} from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import ImageArrayUploadField from "./ImageArrayUploadField";
import BilingualField from "./BilingualField";

interface Section {
  id: string;
  type: string;
  data: Record<string, unknown>;
  order: number;
}

interface LandingSectionEditorProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
  onAutoSave?: (sections: Section[]) => Promise<void>; // Auto-save callback
}

const LANDING_SECTION_TYPES = [
  { value: "HeroSection", label: "Hero Section", icon: "🎯" },
  { value: "AboutSection", label: "About Section", icon: "ℹ️" },
  { value: "StatisticsSection", label: "Statistics", icon: "📊" },
  { value: "ServicesSection", label: "Services", icon: "🏥" },
  { value: "ProgramAreasSection", label: "Program Areas", icon: "📋" },
  { value: "PartnersCertificationsSection", label: "Partners & Certifications", icon: "🤝" },
  { value: "AchievementsSection", label: "Achievements", icon: "🏆" },
  { value: "BlogSection", label: "Blog & Updates", icon: "📝" },
];

export default function LandingSectionEditor({
  sections,
  onChange,
  onAutoSave,
}: LandingSectionEditorProps) {
  const [activeTab, setActiveTab] = useState<string | null>(
    sections[0]?.id || null
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const addSection = (type: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      data: getDefaultDataForType(type),
      order: sections.length,
    };
    onChange([...sections, newSection]);
    setShowAddModal(false);
    setActiveTab(newSection.id);
  };

  const removeSection = (id: string) => {
    if (confirm("Remove this section?")) {
      const newSections = sections.filter((s) => s.id !== id);
      onChange(newSections.map((s, i) => ({ ...s, order: i })));
      if (activeTab === id) {
        setActiveTab(newSections[0]?.id || null);
      }
    }
  };

  const moveSection = (id: string, direction: "left" | "right") => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    if (direction === "left" && index === 0) return;
    if (direction === "right" && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];

    onChange(newSections.map((s, i) => ({ ...s, order: i })));
  };

  const updateSectionData = (id: string, data: Record<string, unknown>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, data } : s)));
  };

  const handleImageReorder = async (
    id: string,
    field: string,
    urls: string[]
  ) => {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, data: { ...s.data, [field]: urls } } : s
    );
    onChange(newSections);

    // Auto-save if callback is provided
    if (onAutoSave) {
      await onAutoSave(newSections);
    }
  };

  const getLabel = (type: string) => {
    return LANDING_SECTION_TYPES.find((t) => t.value === type)?.label || type;
  };

  const getIcon = (type: string) => {
    return LANDING_SECTION_TYPES.find((t) => t.value === type)?.icon || "📄";
  };

  return (
    <div className="space-y-6">
      {/* Tabs Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Landing Page Sections
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-r border-gray-200 dark:border-gray-700 transition-colors whitespace-nowrap ${
                activeTab === section.id
                  ? "bg-white dark:bg-gray-800 text-primary-green font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{getIcon(section.type)}</span>
              <span className="text-sm">{getLabel(section.type)}</span>
              <span className="text-xs text-gray-400">#{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Active Section Editor */}
        {activeTab && sections.find((s) => s.id === activeTab) && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <GripVertical className="w-5 h-5 text-gray-400" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getIcon(sections.find((s) => s.id === activeTab)!.type)}{" "}
                  {getLabel(sections.find((s) => s.id === activeTab)!.type)}
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => moveSection(activeTab, "left")}
                  disabled={sections.findIndex((s) => s.id === activeTab) === 0}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-[0.3]"
                  title="Move Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSection(activeTab, "right")}
                  disabled={
                    sections.findIndex((s) => s.id === activeTab) ===
                    sections.length - 1
                  }
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-[0.3]"
                  title="Move Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSection(activeTab)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  title="Remove Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <SectionEditor
              type={sections.find((s) => s.id === activeTab)!.type}
              data={sections.find((s) => s.id === activeTab)!.data}
              onChange={(data) => updateSectionData(activeTab, data)}
              onImageReorder={(field, urls) =>
                handleImageReorder(activeTab, field, urls)
              }
            />
          </div>
        )}

        {sections.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No sections added yet
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Section</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Section
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6">
              {LANDING_SECTION_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => addSection(type.value)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Section Editor Component
function SectionEditor({
  type,
  data,
  onChange,
  onImageReorder,
}: {
  type: string;
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  onImageReorder?: (field: string, urls: string[]) => Promise<void>;
}) {
  const updateField = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green text-sm";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  switch (type) {
    case "HeroSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎯 Hero Section Settings
          </h4>
          
          {/* Title - Bilingual (will be displayed in uppercase) */}
          <BilingualField
            label="Title (Bilingual - Displayed in Uppercase)"
            value={data.title as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("title", value)}
            type="text"
            placeholder={{
              en: "DESHET",
              am: "ደሸት",
            }}
          />
          
          {/* Subtitle - Bilingual (will be displayed in uppercase) */}
          <BilingualField
            label="Subtitle (Bilingual - Displayed in Uppercase)"
            value={data.subtitle as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("subtitle", value)}
            type="text"
            placeholder={{
              en: "INDIGENOUS MEDICAL CENTER",
              am: "የሀገር በቀል ህክምና መስጫ ማዕከል",
            }}
          />

          {/* Description - Bilingual */}
          <BilingualField
            label="Description"
            value={data.description as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("description", value)}
            type="textarea"
            rows={3}
            placeholder={{
              en: "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing",
              am: "የኢትዮጵያ ባህላዊ የሕክምና ማዕከል የአመዳድብ ሕክምና፣ መንፈሳዊ እና ባህላዊ ሕክምና እንሰጣለን",
            }}
          />

          {/* Landscape/Main Hero Image */}
          <div className="border border-blue-300 dark:border-blue-600 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
            <ImageUploadField
              label="Main Landscape Hero Image"
              value={(data.landscapeImage as string) || ""}
              onChange={(url) => updateField("landscapeImage", url)}
            />
            <p className="text-xs text-blue-800 dark:text-blue-200 mt-2">
              This image will be displayed when the page first loads and when
              the carousel finishes looping.
            </p>
          </div>

          {/* Left Section Images */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <ImageArrayUploadField
              label="Left Section Images"
              value={(data.leftImages as string[]) || []}
              onChange={(urls) => updateField("leftImages", urls)}
              onReorder={
                onImageReorder
                  ? (urls) => onImageReorder("leftImages", urls)
                  : undefined
              }
              placeholder="https://example.com/image.jpg"
              description="These images will rotate in the left section (green overlay)"
            />
          </div>

          {/* Middle Section Images */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <ImageArrayUploadField
              label="Middle Section Images"
              value={(data.middleImages as string[]) || []}
              onChange={(urls) => updateField("middleImages", urls)}
              onReorder={
                onImageReorder
                  ? (urls) => onImageReorder("middleImages", urls)
                  : undefined
              }
              placeholder="https://example.com/image.jpg"
              description="These images will rotate in the middle section (orange/gold overlay)"
            />
          </div>

          {/* Right Section Images */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <ImageArrayUploadField
              label="Right Section Images"
              value={(data.rightImages as string[]) || []}
              onChange={(urls) => updateField("rightImages", urls)}
              onReorder={
                onImageReorder
                  ? (urls) => onImageReorder("rightImages", urls)
                  : undefined
              }
              placeholder="https://example.com/image.jpg"
              description="These images will rotate in the right section (green overlay)"
            />
          </div>

          {/* CTA Text - Bilingual */}
          <BilingualField
            label="CTA Button Text"
            value={data.ctaText as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("ctaText", value)}
            placeholder={{
              en: "Book Appointment",
              am: "ቀጠሮ ይውሰዱ",
            }}
          />

          {/* CTA Secondary Text - Bilingual */}
          <BilingualField
            label="CTA Secondary Button Text"
            value={data.ctaSecondaryText as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("ctaSecondaryText", value)}
            placeholder={{
              en: "Learn More",
              am: "ተጨማሪ ይማሩ",
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CTA Button Link</label>
              <input
                type="text"
                value={(data.ctaLink as string) || ""}
                onChange={(e) => updateField("ctaLink", e.target.value)}
                className={inputClass}
                placeholder="/booking"
              />
            </div>
            <div>
              <label className={labelClass}>CTA Secondary Link</label>
              <input
                type="text"
                value={(data.ctaSecondaryLink as string) || ""}
                onChange={(e) => updateField("ctaSecondaryLink", e.target.value)}
                className={inputClass}
                placeholder="/who-we-are"
              />
            </div>
          </div>
        </div>
      );

    case "AboutSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ℹ️ About Section Settings
          </h4>
          
          {/* Title - Bilingual */}
          <BilingualField
            label="Title"
            value={data.title as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("title", value)}
            placeholder={{
              en: "ABOUT DESHET",
              am: "ስለ ደሸት",
            }}
          />
          
          {/* Description - Bilingual */}
          <BilingualField
            label="Description"
            value={data.description as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("description", value)}
            type="textarea"
            rows={6}
            placeholder={{
              en: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል is a premium Ethiopian traditional medical facility...",
              am: "ደሸት ባህላዊ የሕክምና ማዕከል የኢትዮጵያ ባህላዊ ሕክምናን ማስቀጠል...",
            }}
          />
          
          {/* CTA Text - Bilingual */}
          <BilingualField
            label="CTA Button Text"
            value={data.ctaText as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("ctaText", value)}
            placeholder={{
              en: "Read More",
              am: "ተጨማሪ ያንብቡ",
            }}
          />

          <div>
            <label className={labelClass}>CTA Button Link</label>
            <input
              type="text"
              value={(data.ctaLink as string) || ""}
              onChange={(e) => updateField("ctaLink", e.target.value)}
              className={inputClass}
              placeholder="/who-we-are"
            />
          </div>
          
          {/* Carousel Images - Upload Field */}
          <ImageArrayUploadField
            label="Carousel Images"
            value={(data.images as string[]) || []}
            onChange={(urls) => updateField("images", urls)}
            placeholder="Upload carousel images"
            description="Upload multiple images for the carousel. You can reorder or delete images."
          />
        </div>
      );

    case "StatisticsSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Statistics Settings
          </h4>
          <div className="space-y-4">
            {(
              (data.stats as Array<{ number: string; label: string }>) || [
                { number: "", label: "" },
              ]
            ).map((stat: { number: string; label: string }, index: number) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Stat #{index + 1}
                  </h5>
                  {(
                    (data.stats as Array<{ number: string; label: string }>) ||
                    []
                  ).length > 1 && (
                    <button
                      onClick={() => {
                        const newStats = [
                          ...((data.stats as Array<{
                            number: string;
                            label: string;
                          }>) || []),
                        ];
                        newStats.splice(index, 1);
                        updateField("stats", newStats);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Number</label>
                    <input
                      type="text"
                      value={stat.number || ""}
                      onChange={(e) => {
                        const newStats = [
                          ...((data.stats as Array<{
                            number: string;
                            label: string;
                          }>) || []),
                        ];
                        newStats[index] = { ...stat, number: e.target.value };
                        updateField("stats", newStats);
                      }}
                      className={inputClass}
                      placeholder="58"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Label (Bilingual)</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={typeof stat.label === "object" && stat.label !== null && "en" in stat.label 
                          ? (stat.label as { en: string; am: string }).en 
                          : (stat.label as string) || ""}
                        onChange={(e) => {
                          const newStats = [
                            ...((data.stats as Array<{
                              number: string;
                              label: string | { en: string; am: string };
                            }>) || []),
                          ];
                          const currentLabel = typeof stat.label === "object" && stat.label !== null && "en" in stat.label
                            ? (stat.label as { en: string; am: string })
                            : { en: (stat.label as string) || "", am: "" };
                          newStats[index] = { ...stat, label: { ...currentLabel, en: e.target.value } };
                          updateField("stats", newStats);
                        }}
                        className={inputClass}
                        placeholder="English label (e.g., Years of Experience)"
                      />
                      <input
                        type="text"
                        value={typeof stat.label === "object" && stat.label !== null && "am" in stat.label 
                          ? (stat.label as { en: string; am: string }).am 
                          : ""}
                        onChange={(e) => {
                          const newStats = [
                            ...((data.stats as Array<{
                              number: string;
                              label: string | { en: string; am: string };
                            }>) || []),
                          ];
                          const currentLabel = typeof stat.label === "object" && stat.label !== null && "en" in stat.label
                            ? (stat.label as { en: string; am: string })
                            : { en: (stat.label as string) || "", am: "" };
                          newStats[index] = { ...stat, label: { ...currentLabel, am: e.target.value } };
                          updateField("stats", newStats);
                        }}
                        className={inputClass + " font-amharic"}
                        placeholder="አማርኛ መለያ (ለምሳሌ: ዓመታት ልምድ)"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newStats = [
                  ...((data.stats as Array<{
                    number: string;
                    label: string;
                  }>) || []),
                  { number: "", label: "" },
                ];
                updateField("stats", newStats);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Stat
            </button>
          </div>
        </div>
      );

    case "AchievementsSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Achievements Settings
          </h4>
          
          {/* Header Title - Bilingual */}
          <BilingualField
            label="Header Title (e.g., SINCE 2010)"
            value={data.headerTitle as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("headerTitle", value)}
            placeholder={{
              en: "SINCE 2010",
              am: "ከ 2010 ጀምሮ",
            }}
          />

          {/* Header Subtitle - Bilingual */}
          <BilingualField
            label="Header Subtitle"
            value={data.headerSubtitle as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("headerSubtitle", value)}
            type="textarea"
            rows={3}
            placeholder={{
              en: "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services",
              am: "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን",
            }}
          />

          {/* Featured Image */}
          <div>
            <ImageUploadField
              label="Featured Image URL"
              value={(data.featuredImage as string) || ""}
              onChange={(url) => updateField("featuredImage", url)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Image displayed in the achievements section
            </p>
          </div>

          {/* Achievements Statistics */}
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
            <h5 className="text-md font-semibold text-gray-900 dark:text-white">
              Achievement Statistics
            </h5>

            {/* Patients Served */}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h6 className="font-medium text-gray-900 dark:text-white mb-3">
                Patients Served
              </h6>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Count</label>
                  <input
                    type="text"
                    value={(data.achievements as any)?.patientsServed || ""}
                    onChange={(e) => {
                      const achievements = (data.achievements as any) || {};
                      updateField("achievements", {
                        ...achievements,
                        patientsServed: e.target.value,
                      });
                    }}
                    className={inputClass}
                    placeholder="5000+"
                  />
                </div>
                <BilingualField
                  label="Label"
                  value={(data.achievements as any)?.patientsServedLabel}
                  onChange={(value) => {
                    const achievements = (data.achievements as any) || {};
                    updateField("achievements", {
                      ...achievements,
                      patientsServedLabel: value,
                    });
                  }}
                  placeholder={{
                    en: "Patients Served",
                    am: "ታካሚዎች",
                  }}
                />
              </div>
            </div>

            {/* Service Years */}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h6 className="font-medium text-gray-900 dark:text-white mb-3">
                Years of Service
              </h6>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Count</label>
                  <input
                    type="text"
                    value={(data.achievements as any)?.serviceYears || ""}
                    onChange={(e) => {
                      const achievements = (data.achievements as any) || {};
                      updateField("achievements", {
                        ...achievements,
                        serviceYears: e.target.value,
                      });
                    }}
                    className={inputClass}
                    placeholder="15+"
                  />
                </div>
                <BilingualField
                  label="Label"
                  value={(data.achievements as any)?.serviceYearsLabel}
                  onChange={(value) => {
                    const achievements = (data.achievements as any) || {};
                    updateField("achievements", {
                      ...achievements,
                      serviceYearsLabel: value,
                    });
                  }}
                  placeholder={{
                    en: "Of Excellence",
                    am: "የሕክምና ልምድ",
                  }}
                />
              </div>
            </div>

            {/* Expert Practitioners */}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h6 className="font-medium text-gray-900 dark:text-white mb-3">
                Expert Practitioners
              </h6>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Count</label>
                  <input
                    type="text"
                    value={(data.achievements as any)?.expertPractitioners || ""}
                    onChange={(e) => {
                      const achievements = (data.achievements as any) || {};
                      updateField("achievements", {
                        ...achievements,
                        expertPractitioners: e.target.value,
                      });
                    }}
                    className={inputClass}
                    placeholder="50+"
                  />
                </div>
                <BilingualField
                  label="Label"
                  value={(data.achievements as any)?.expertPractitionersLabel}
                  onChange={(value) => {
                    const achievements = (data.achievements as any) || {};
                    updateField("achievements", {
                      ...achievements,
                      expertPractitionersLabel: value,
                    });
                  }}
                  placeholder={{
                    en: "Expert Practitioners",
                    am: "ባለሙያ ሐኪሞች",
                  }}
                />
              </div>
            </div>

            {/* Recognitions */}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h6 className="font-medium text-gray-900 dark:text-white mb-3">
                Recognitions & Awards
              </h6>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Count (optional)</label>
                  <input
                    type="text"
                    value={(data.achievements as any)?.recognitionsCount || ""}
                    onChange={(e) => {
                      const achievements = (data.achievements as any) || {};
                      updateField("achievements", {
                        ...achievements,
                        recognitionsCount: e.target.value,
                      });
                    }}
                    className={inputClass}
                    placeholder="25+"
                  />
                </div>
                <BilingualField
                  label="Label"
                  value={(data.achievements as any)?.recognitionsLabel}
                  onChange={(value) => {
                    const achievements = (data.achievements as any) || {};
                    updateField("achievements", {
                      ...achievements,
                      recognitionsLabel: value,
                    });
                  }}
                  placeholder={{
                    en: "Recognitions & Awards",
                    am: "እውቅናዎች እና ሽልማቶች",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );

    case "BlogSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📝 Blog & Updates Settings
          </h4>
          
          {/* Section Title - Bilingual */}
          <BilingualField
            label="Section Title"
            value={data.title as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("title", value)}
            placeholder={{
              en: "ዜና እና አዳዲስ መረጃዎች",
              am: "ዜና እና አዳዲስ መረጃዎች",
            }}
          />
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Blog posts are managed separately in the{" "}
                  <a
                    href="/admin/blog"
                    className="font-semibold underline hover:text-blue-800 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog Management
                  </a>{" "}
                  section. Featured blog posts will automatically appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "ServicesSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏥 Services Section Settings
          </h4>
          
          <div className="space-y-4">
            {(
              (data.services as Array<{
                title: string | { en: string; am: string };
                image: string;
                link?: string;
              }>) || [
                {
                  title: { en: "Traditional Consultation", am: "ባህላዊ ምክክር" },
                  image: "",
                  link: "/programs",
                },
              ]
            ).map((service, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Service #{index + 1}
                  </h5>
                  {(
                    (data.services as Array<{
                      title: string | { en: string; am: string };
                      image: string;
                      link?: string;
                    }>) || []
                  ).length > 1 && (
                    <button
                      onClick={() => {
                        const newServices = [
                          ...((data.services as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newServices.splice(index, 1);
                        updateField("services", newServices);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {/* Service Title - Bilingual */}
                  <BilingualField
                    label="Service Title"
                    value={service.title}
                    onChange={(value) => {
                      const newServices = [
                        ...((data.services as Array<{
                          title: string | { en: string; am: string };
                          image: string;
                          link?: string;
                        }>) || []),
                      ];
                      newServices[index] = { ...service, title: value };
                      updateField("services", newServices);
                    }}
                    placeholder={{
                      en: "Traditional Consultation",
                      am: "ባህላዊ ምክክር",
                    }}
                  />
                  
                  {/* Service Image */}
                  <div>
                    <ImageUploadField
                      label="Service Image URL"
                      value={service.image || ""}
                      onChange={(url) => {
                        const newServices = [
                          ...((data.services as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newServices[index] = { ...service, image: url };
                        updateField("services", newServices);
                      }}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use medical/traditional medicine related images
                    </p>
                  </div>
                  
                  {/* Service Link */}
                  <div>
                    <label className={labelClass}>Link (optional)</label>
                    <input
                      type="text"
                      value={service.link || ""}
                      onChange={(e) => {
                        const newServices = [
                          ...((data.services as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newServices[index] = { ...service, link: e.target.value };
                        updateField("services", newServices);
                      }}
                      className={inputClass}
                      placeholder="/programs"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newServices = [
                  ...((data.services as Array<{
                    title: string | { en: string; am: string };
                    image: string;
                    link?: string;
                  }>) || []),
                  {
                    title: { en: "", am: "" },
                    image: "",
                    link: "/programs",
                  },
                ];
                updateField("services", newServices);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Service
            </button>
          </div>
        </div>
      );

    case "ProgramAreasSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📋 Program Areas Section Settings
          </h4>
          
          <div className="space-y-4">
            {(
              (data.programs as Array<{
                title: string | { en: string; am: string };
                image: string;
                link?: string;
              }>) || [
                {
                  title: {
                    en: "Traditional Medical <br /> Consultation",
                    am: "ባህላዊ የሕክምና <br /> ምክክር",
                  },
                  image: "",
                  link: "/programs",
                },
              ]
            ).map((program, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Program #{index + 1}
                  </h5>
                  {(
                    (data.programs as Array<{
                      title: string | { en: string; am: string };
                      image: string;
                      link?: string;
                    }>) || []
                  ).length > 1 && (
                    <button
                      onClick={() => {
                        const newPrograms = [
                          ...((data.programs as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPrograms.splice(index, 1);
                        updateField("programs", newPrograms);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {/* Program Title - Bilingual */}
                  <BilingualField
                    label="Program Title (HTML allowed, use &lt;br /&gt; for line breaks)"
                    value={program.title as string | { en: string; am: string } | undefined}
                    onChange={(value) => {
                      const newPrograms = [
                        ...((data.programs as Array<{
                          title: string | { en: string; am: string };
                          image: string;
                          link?: string;
                        }>) || []),
                      ];
                      newPrograms[index] = { ...program, title: value };
                      updateField("programs", newPrograms);
                    }}
                    type="textarea"
                    rows={2}
                    placeholder={{
                      en: "Traditional Medical <br /> Consultation",
                      am: "ባህላዊ የሕክምና <br /> ምክክር",
                    }}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Use &lt;br /&gt; or &lt;br /&gt; for line breaks in both languages
                  </p>
                  
                  {/* Program Image */}
                  <div>
                    <ImageUploadField
                      label="Program Image URL"
                      value={program.image || ""}
                      onChange={(url) => {
                        const newPrograms = [
                          ...((data.programs as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPrograms[index] = { ...program, image: url };
                        updateField("programs", newPrograms);
                      }}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use program/medical related images
                    </p>
                  </div>
                  
                  {/* Program Link */}
                  <div>
                    <label className={labelClass}>Link (optional)</label>
                    <input
                      type="text"
                      value={program.link || ""}
                      onChange={(e) => {
                        const newPrograms = [
                          ...((data.programs as Array<{
                            title: string | { en: string; am: string };
                            image: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPrograms[index] = { ...program, link: e.target.value };
                        updateField("programs", newPrograms);
                      }}
                      className={inputClass}
                      placeholder="/programs"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newPrograms = [
                  ...((data.programs as Array<{
                    title: string | { en: string; am: string };
                    image: string;
                    link?: string;
                  }>) || []),
                  {
                    title: { en: "", am: "" },
                    image: "",
                    link: "/programs",
                  },
                ];
                updateField("programs", newPrograms);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Program Area
            </button>
          </div>
        </div>
      );

    case "PartnersCertificationsSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🤝 Partners & Certifications Settings
          </h4>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Show on Public Site
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Toggle to show or hide this section on the public website
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={(data.isVisible as boolean) !== false}
                onChange={(e) => updateField("isVisible", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 dark:peer-focus:ring-primary-green/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green"></div>
            </label>
          </div>

          {/* Section Title - Bilingual */}
          <BilingualField
            label="Section Title"
            value={data.title as string | { en: string; am: string } | undefined}
            onChange={(value) => updateField("title", value)}
            placeholder={{
              en: "Our Medical Partners & Recognition",
              am: "የእኛ የሕክምና አጋሮች እና እውቅና",
            }}
          />

          {/* Partners */}
          <div className="space-y-4">
            <h5 className="text-md font-semibold text-gray-900 dark:text-white">
              Partners
            </h5>
            {(
              (data.partners as Array<{
                name: string;
                logo: string;
                link?: string;
              }>) || [
                { name: "", logo: "", link: "" },
              ]
            ).map((partner, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h6 className="font-medium text-gray-900 dark:text-white">
                    Partner #{index + 1}
                  </h6>
                  {(
                    (data.partners as Array<{
                      name: string;
                      logo: string;
                      link?: string;
                    }>) || []
                  ).length > 1 && (
                    <button
                      onClick={() => {
                        const newPartners = [
                          ...((data.partners as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPartners.splice(index, 1);
                        updateField("partners", newPartners);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Partner Name</label>
                    <input
                      type="text"
                      value={partner.name || ""}
                      onChange={(e) => {
                        const newPartners = [
                          ...((data.partners as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPartners[index] = { ...partner, name: e.target.value };
                        updateField("partners", newPartners);
                      }}
                      className={inputClass}
                      placeholder="Partner name"
                    />
                  </div>
                  <div>
                    <ImageUploadField
                      label="Logo URL"
                      value={partner.logo || ""}
                      onChange={(url) => {
                        const newPartners = [
                          ...((data.partners as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPartners[index] = { ...partner, logo: url };
                        updateField("partners", newPartners);
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Link (optional)</label>
                    <input
                      type="text"
                      value={partner.link || ""}
                      onChange={(e) => {
                        const newPartners = [
                          ...((data.partners as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newPartners[index] = { ...partner, link: e.target.value };
                        updateField("partners", newPartners);
                      }}
                      className={inputClass}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newPartners = [
                  ...((data.partners as Array<{
                    name: string;
                    logo: string;
                    link?: string;
                  }>) || []),
                  { name: "", logo: "", link: "" },
                ];
                updateField("partners", newPartners);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Partner
            </button>
          </div>

          {/* Certifications */}
          <div className="space-y-4 mt-6">
            <h5 className="text-md font-semibold text-gray-900 dark:text-white">
              Certifications
            </h5>
            {(
              (data.certifications as Array<{
                name: string;
                logo: string;
                link?: string;
              }>) || [
                { name: "", logo: "", link: "" },
              ]
            ).map((certification, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h6 className="font-medium text-gray-900 dark:text-white">
                    Certification #{index + 1}
                  </h6>
                  {(
                    (data.certifications as Array<{
                      name: string;
                      logo: string;
                      link?: string;
                    }>) || []
                  ).length > 1 && (
                    <button
                      onClick={() => {
                        const newCertifications = [
                          ...((data.certifications as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newCertifications.splice(index, 1);
                        updateField("certifications", newCertifications);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Certification Name</label>
                    <input
                      type="text"
                      value={certification.name || ""}
                      onChange={(e) => {
                        const newCertifications = [
                          ...((data.certifications as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newCertifications[index] = {
                          ...certification,
                          name: e.target.value,
                        };
                        updateField("certifications", newCertifications);
                      }}
                      className={inputClass}
                      placeholder="Certification name"
                    />
                  </div>
                  <div>
                    <ImageUploadField
                      label="Logo URL"
                      value={certification.logo || ""}
                      onChange={(url) => {
                        const newCertifications = [
                          ...((data.certifications as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newCertifications[index] = {
                          ...certification,
                          logo: url,
                        };
                        updateField("certifications", newCertifications);
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Link (optional)</label>
                    <input
                      type="text"
                      value={certification.link || ""}
                      onChange={(e) => {
                        const newCertifications = [
                          ...((data.certifications as Array<{
                            name: string;
                            logo: string;
                            link?: string;
                          }>) || []),
                        ];
                        newCertifications[index] = {
                          ...certification,
                          link: e.target.value,
                        };
                        updateField("certifications", newCertifications);
                      }}
                      className={inputClass}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newCertifications = [
                  ...((data.certifications as Array<{
                    name: string;
                    logo: string;
                    link?: string;
                  }>) || []),
                  { name: "", logo: "", link: "" },
                ];
                updateField("certifications", newCertifications);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Certification
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Section type: {type}
          </p>
        </div>
      );
  }
}

function getDefaultDataForType(type: string): Record<string, unknown> {
  switch (type) {
    case "HeroSection":
      return {
        title: {
          en: "DESHET",
          am: "ደሸት",
        },
        subtitle: {
          en: "INDIGENOUS MEDICAL CENTER",
          am: "የሀገር በቀል ህክምና መስጫ ማዕከል",
        },
        description: {
          en: "Premium Ethiopian Indigenous Medical Center delivering herbal, spiritual, and cultural healing",
          am: "የኢትዮጵያ ባህላዊ የሕክምና ማዕከል የአመዳድብ ሕክምና፣ መንፈሳዊ እና ባህላዊ ሕክምና እንሰጣለን",
        },
        landscapeImage: "",
        leftImages: [],
        middleImages: [],
        rightImages: [],
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
      };
    case "AboutSection":
      return {
        title: {
          en: "ABOUT DESHET",
          am: "ስለ ደሸት",
        },
        description: {
          en: "ደሸት የሀገር በቀል ህክምና መስጫ ማዕከል is a premium Ethiopian traditional medical facility dedicated to preserving and promoting indigenous healing practices.",
          am: "ደሸት ባህላዊ የሕክምና ማዕከል የኢትዮጵያ ባህላዊ ሕክምናን ማስቀጠል እና ማበረታታት የሚገዛ የሕክምና ተቋም ነው።",
        },
        ctaText: {
          en: "Read More",
          am: "ተጨማሪ ያንብቡ",
        },
        ctaLink: "/who-we-are",
        images: [],
      };
    case "StatisticsSection":
      return {
        stats: [
          { 
            number: "15+", 
            label: {
              en: "Years of Experience",
              am: "ዓመታት ልምድ",
            },
          },
          { 
            number: "5000+", 
            label: {
              en: "Patients Served",
              am: "ታካሚዎች",
            },
          },
          { 
            number: "50+", 
            label: {
              en: "Herbal Remedies",
              am: "የአመዳድብ መድሃኒቶች",
            },
          },
          { 
            number: "10+", 
            label: {
              en: "Expert Practitioners",
              am: "ባለሙያዎች",
            },
          },
        ],
      };
    case "ServicesSection":
      return {
        services: [
          {
            title: {
              en: "Traditional Consultation",
              am: "ባህላዊ ምክክር",
            },
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "/programs",
          },
          {
            title: {
              en: "Herbal Medicine",
              am: "የአመዳድብ ሕክምና",
            },
            image: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "/programs",
          },
          {
            title: {
              en: "Detox Therapy",
              am: "የሰውነት ማጽዳት ሕክምና",
            },
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "/programs",
          },
          {
            title: {
              en: "Diagnostic Techniques",
              am: "የመመርመር ዘዴዎች",
            },
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "/programs",
          },
        ],
      };
    case "PartnersCertificationsSection":
      return {
        isVisible: true,
        title: {
          en: "Our Medical Partners & Recognition",
          am: "የእኛ የሕክምና አጋሮች እና እውቅና",
        },
        partners: [
          {
            name: "Ethiopian Ministry of Health",
            logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "",
          },
          {
            name: "Traditional Medicine Association",
            logo: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "",
          },
        ],
        certifications: [
          {
            name: "Traditional Medicine Certification",
            logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "",
          },
          {
            name: "Herbal Medicine License",
            logo: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
            link: "",
          },
        ],
      };
    case "AchievementsSection":
      return {
        headerTitle: {
          en: "SINCE 2010",
          am: "ከ 2010 ጀምሮ",
        },
        headerSubtitle: {
          en: "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services",
          am: "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን",
        },
        featuredImage:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        achievements: {
          patientsServed: "5000+",
          patientsServedLabel: {
            en: "Patients Served",
            am: "ታካሚዎች",
          },
          serviceYears: "15+",
          serviceYearsLabel: {
            en: "Of Excellence",
            am: "የሕክምና ልምድ",
          },
          expertPractitioners: "50+",
          expertPractitionersLabel: {
            en: "Expert Practitioners",
            am: "ባለሙያ ሐኪሞች",
          },
          recognitionsCount: "25+",
          recognitionsLabel: {
            en: "Recognitions & Awards",
            am: "እውቅናዎች እና ሽልማቶች",
          },
        },
      };
    case "BlogSection":
      return {
        title: {
          en: "ዜና እና አዳዲስ መረጃዎች",
          am: "ዜና እና አዳዲስ መረጃዎች",
        },
      };
    case "ProgramAreasSection":
      return {
        programs: [
          {
            title: {
              en: "Traditional Medical <br /> Consultation",
              am: "ባህላዊ የሕክምና <br /> ምክክር",
            },
            image: "/overview/1.png",
            link: "/programs",
          },
          {
            title: {
              en: "Herbal Medicine <br /> Preparation",
              am: "የአመዳድብ ሕክምና <br /> ዝግጅት",
            },
            image: "/overview/2.png",
            link: "/programs",
          },
          {
            title: {
              en: "Detox & Cleansing <br /> Therapy",
              am: "የመጥለፍት እና ማጽዳት <br /> ሕክምና",
            },
            image: "/overview/3.png",
            link: "/programs",
          },
          {
            title: {
              en: "Traditional Diagnostic <br /> Techniques",
              am: "ባህላዊ የመለኪያ <br /> ቴክኒኮች",
            },
            image: "/overview/4.png",
            link: "/programs",
          },
        ],
      };
    default:
      return {};
  }
}
