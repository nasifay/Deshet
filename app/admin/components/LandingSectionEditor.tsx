"use client";

import { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  GripVertical,
} from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import ImageArrayUploadField from "./ImageArrayUploadField";

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
  { value: "ProgramAreasSection", label: "Program Areas", icon: "📁" },
  { value: "AchievementsSection", label: "Achievements", icon: "🏆" },
  { value: "VolunteerBanner", label: "Volunteer Banner", icon: "💚" },
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
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="SERVING"
            />
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input
              type="text"
              value={(data.subtitle as string) || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              className={inputClass}
              placeholder="ETHIOPIAN YOUTH"
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CTA Button Text</label>
              <input
                type="text"
                value={(data.ctaText as string) || ""}
                onChange={(e) => updateField("ctaText", e.target.value)}
                className={inputClass}
                placeholder="Contact Us"
              />
            </div>
            <div>
              <label className={labelClass}>CTA Button Link</label>
              <input
                type="text"
                value={(data.ctaLink as string) || ""}
                onChange={(e) => updateField("ctaLink", e.target.value)}
                className={inputClass}
                placeholder="/contact-us"
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
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="ABOUT US"
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={6}
              className={inputClass + " resize-none"}
              placeholder="About your organization..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CTA Button Text</label>
              <input
                type="text"
                value={(data.ctaText as string) || ""}
                onChange={(e) => updateField("ctaText", e.target.value)}
                className={inputClass}
                placeholder="Read More"
              />
            </div>
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
          </div>
          <div>
            <label className={labelClass}>
              Carousel Images (comma-separated URLs)
            </label>
            <textarea
              value={((data.images as string[]) || []).join(", ")}
              onChange={(e) =>
                updateField(
                  "images",
                  e.target.value
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s)
                )
              }
              rows={3}
              className={inputClass + " resize-none"}
              placeholder="/images/about/1.png, /images/about/2.png, ..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter image URLs separated by commas
            </p>
          </div>
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
                    <label className={labelClass}>Label</label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => {
                        const newStats = [
                          ...((data.stats as Array<{
                            number: string;
                            label: string;
                          }>) || []),
                        ];
                        newStats[index] = { ...stat, label: e.target.value };
                        updateField("stats", newStats);
                      }}
                      className={inputClass}
                      placeholder="Staffs"
                    />
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

    case "ProgramAreasSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📁 Program Areas Settings
          </h4>
          <div>
            <label className={labelClass}>Section Title</label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="Program Areas"
            />
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section automatically pulls programs from the Programs
              database. You can manage programs in the Programs section.
            </p>
          </div>
        </div>
      );

    case "AchievementsSection":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Achievements Settings
          </h4>
          <div>
            <label className={labelClass}>Section Title</label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="Our Achievements"
            />
          </div>
          <div className="space-y-4">
            {(
              (data.achievements as Array<{
                title: string;
                description: string;
              }>) || [{ title: "", description: "" }]
            ).map(
              (
                achievement: { title: string; description: string },
                index: number
              ) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Achievement #{index + 1}
                    </h5>
                    {(
                      (data.achievements as Array<{
                        title: string;
                        description: string;
                      }>) || []
                    ).length > 1 && (
                      <button
                        onClick={() => {
                          const newAchievements = [
                            ...((data.achievements as Array<{
                              title: string;
                              description: string;
                            }>) || []),
                          ];
                          newAchievements.splice(index, 1);
                          updateField("achievements", newAchievements);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input
                        type="text"
                        value={achievement.title || ""}
                        onChange={(e) => {
                          const newAchievements = [
                            ...((data.achievements as Array<{
                              title: string;
                              description: string;
                            }>) || []),
                          ];
                          newAchievements[index] = {
                            ...achievement,
                            title: e.target.value,
                          };
                          updateField("achievements", newAchievements);
                        }}
                        className={inputClass}
                        placeholder="25+ Years of Impact"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        value={achievement.description || ""}
                        onChange={(e) => {
                          const newAchievements = [
                            ...((data.achievements as Array<{
                              title: string;
                              description: string;
                            }>) || []),
                          ];
                          newAchievements[index] = {
                            ...achievement,
                            description: e.target.value,
                          };
                          updateField("achievements", newAchievements);
                        }}
                        rows={2}
                        className={inputClass + " resize-none"}
                        placeholder="Decades of dedicated service..."
                      />
                    </div>
                  </div>
                </div>
              )
            )}
            <button
              onClick={() => {
                const newAchievements = [
                  ...((data.achievements as Array<{
                    title: string;
                    description: string;
                  }>) || []),
                  { title: "", description: "" },
                ];
                updateField("achievements", newAchievements);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-green hover:text-primary-green transition-colors"
            >
              + Add Achievement
            </button>
          </div>
        </div>
      );

    case "VolunteerBanner":
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💚 Volunteer Banner Settings
          </h4>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              placeholder="Join Our Mission"
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className={inputClass + " resize-none"}
              placeholder="Become a volunteer and make a difference..."
            />
          </div>
          <ImageUploadField
            label="Background Image"
            value={(data.backgroundImage as string) || ""}
            onChange={(url) => updateField("backgroundImage", url)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CTA Button Text</label>
              <input
                type="text"
                value={(data.ctaText as string) || ""}
                onChange={(e) => updateField("ctaText", e.target.value)}
                className={inputClass}
                placeholder="Volunteer Now"
              />
            </div>
            <div>
              <label className={labelClass}>CTA Button Link</label>
              <input
                type="text"
                value={(data.ctaLink as string) || ""}
                onChange={(e) => updateField("ctaLink", e.target.value)}
                className={inputClass}
                placeholder="/volunteer"
              />
            </div>
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
        title: "SERVING",
        subtitle: "ETHIOPIAN YOUTH",
        landscapeImage: "",
        leftImages: [],
        middleImages: [],
        rightImages: [],
        ctaText: "Contact Us",
        ctaLink: "/contact-us",
      };
    case "AboutSection":
      return {
        title: "ABOUT US",
        description: "",
        ctaText: "Read More",
        ctaLink: "/who-we-are",
        images: [],
      };
    case "StatisticsSection":
      return {
        stats: [
          { number: "58", label: "Staffs" },
          { number: "5", label: "Offices in 4 Regions" },
          { number: "250+", label: "Volunteers" },
          { number: "15", label: "Protocols" },
        ],
      };
    case "ProgramAreasSection":
      return { title: "Program Areas" };
    case "AchievementsSection":
      return { title: "Our Achievements", achievements: [] };
    case "VolunteerBanner":
      return {
        title: "Join Our Mission",
        description: "",
        backgroundImage: "/images/cta.jpg",
        ctaText: "Volunteer Now",
        ctaLink: "/volunteer",
      };
    default:
      return {};
  }
}
