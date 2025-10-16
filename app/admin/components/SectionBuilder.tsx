"use client";

import { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
  GripVertical,
} from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface Section {
  id: string;
  type: string;
  data: Record<string, unknown>;
  order: number;
}

interface SectionBuilderProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

const SECTION_TYPES = [
  { value: "AboutUsHeader", label: "About Us Header", icon: "📄" },
  { value: "TaglineSection", label: "Tagline Section", icon: "💬" },
  { value: "GroupPhotoSection", label: "Group Photo Section", icon: "📷" },
  { value: "AboutTSDSection", label: "About TSD Section", icon: "ℹ️" },
  {
    value: "VisionMissionSection",
    label: "Vision & Mission Section",
    icon: "🎯",
  },
  { value: "CoreValuesSection", label: "Core Values Section", icon: "⭐" },
  { value: "LeadershipSection", label: "Leadership Section", icon: "👥" },
  { value: "TargetGroupSection", label: "Target Group Section", icon: "🎯" },
  {
    value: "OperationRegionsSection",
    label: "Operation Regions Section",
    icon: "🗺️",
  },
  { value: "HeroSection", label: "Hero Section", icon: "🦸" },
  { value: "StatisticsSection", label: "Statistics Section", icon: "📊" },
  { value: "AchievementsSection", label: "Achievements Section", icon: "🏆" },
  { value: "VolunteerBanner", label: "Volunteer Banner", icon: "🙋" },
  { value: "ContentSection", label: "Content Section", icon: "📝" },
];

export default function SectionBuilder({
  sections,
  onChange,
}: SectionBuilderProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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
    setExpandedSection(newSection.id);
  };

  const removeSection = (id: string) => {
    if (confirm("Are you sure you want to remove this section?")) {
      onChange(sections.filter((s) => s.id !== id));
    }
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;

    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];

    // Update order
    newSections.forEach((section, i) => {
      section.order = i;
    });

    onChange(newSections);
  };

  const updateSectionData = (id: string, data: Record<string, unknown>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, data } : s)));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Page Sections
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-2">
        {sections.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No sections added yet
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 text-primary-green hover:underline"
            >
              Add your first section
            </button>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <span className="text-2xl">
                    {SECTION_TYPES.find((t) => t.value === section.type)
                      ?.icon || "📄"}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {SECTION_TYPES.find((t) => t.value === section.type)
                        ?.label || section.type}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Order: {index + 1}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveSection(section.id, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-[0.3]"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(section.id, "down")}
                    disabled={index === sections.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-[0.3]"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )
                    }
                    className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Section Content (Expanded) */}
              {expandedSection === section.id && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                  <SectionEditor
                    type={section.type}
                    data={section.data}
                    onChange={(data) => updateSectionData(section.id, data)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Section
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SECTION_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => addSection(type.value)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
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
}: {
  type: string;
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}) {
  const updateField = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  // Render different fields based on section type
  switch (type) {
    case "OperationRegionsSection":
      return (
        <div className="space-y-4">
          <ImageUploadField
            label="Map Image"
            value={(data.mapImageSrc as string) || ""}
            onChange={(url) => updateField("mapImageSrc", url)}
            placeholder="/images/Objects.png"
          />
          <ImageUploadField
            label="Map Layer Image"
            value={(data.mapLayerSrc as string) || ""}
            onChange={(url) => updateField("mapLayerSrc", url)}
            placeholder="https://example.com/layer.png"
          />
        </div>
      );

    case "TaglineSection":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tagline
          </label>
          <input
            type="text"
            value={(data.tagline as string) || ""}
            onChange={(e) => updateField("tagline", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder="Enter tagline..."
          />
        </div>
      );

    case "GroupPhotoSection":
      return (
        <div className="space-y-4">
          <ImageUploadField
            label="Group Photo"
            value={(data.imageSrc as string) || ""}
            onChange={(url) => updateField("imageSrc", url)}
            placeholder="https://example.com/photo.jpg"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={(data.altText as string) || ""}
              onChange={(e) => updateField("altText", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Image description..."
            />
          </div>
        </div>
      );

    case "AboutTSDSection":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Enter description..."
            />
          </div>
          <ImageUploadField
            label="Back Image"
            value={(data.backImageSrc as string) || ""}
            onChange={(url) => updateField("backImageSrc", url)}
            placeholder="Background image URL"
          />
          <ImageUploadField
            label="Front Image"
            value={(data.frontImageSrc as string) || ""}
            onChange={(url) => updateField("frontImageSrc", url)}
            placeholder="Foreground image URL"
          />
        </div>
      );

    case "VisionMissionSection":
      return (
        <div className="space-y-4">
          <ImageUploadField
            label="Vision Image"
            value={(data.visionImage as string) || ""}
            onChange={(url) => updateField("visionImage", url)}
            placeholder="/images/Mask group.png"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vision Text
            </label>
            <textarea
              value={(data.visionText as string) || ""}
              onChange={(e) => updateField("visionText", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Enter vision statement..."
            />
          </div>
          <ImageUploadField
            label="Mission Image"
            value={(data.missionImage as string) || ""}
            onChange={(url) => updateField("missionImage", url)}
            placeholder="/images/Mask group (1).png"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mission Text
            </label>
            <textarea
              value={(data.missionText as string) || ""}
              onChange={(e) => updateField("missionText", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Enter mission statement..."
            />
          </div>
        </div>
      );

    case "ContentSection":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Section title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={(data.content as string) || ""}
              onChange={(e) => updateField("content", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Section content..."
            />
          </div>
          <ImageUploadField
            label="Image (Optional)"
            value={(data.image as string) || ""}
            onChange={(url) => updateField("image", url)}
            placeholder="Add an image to this section..."
          />
        </div>
      );

    case "AboutUsHeader":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              ℹ️ About This Section
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section displays the &quot;About Us&quot; header with the
              organization name and tagline. The content is automatically
              rendered from your site branding.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Header Title (Optional Override)
            </label>
            <input
              type="text"
              value={(data.title as string) || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Leave empty for default: WHO WE ARE"
            />
          </div>
          <ImageUploadField
            label="Background Image (Optional)"
            value={(data.backgroundImage as string) || ""}
            onChange={(url) => updateField("backgroundImage", url)}
            placeholder="Add background image..."
          />
        </div>
      );

    case "CoreValuesSection":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              ⭐ About This Section
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section displays your organization&apos;s core values. The
              values are managed in the
              <strong> Settings → Site Settings</strong> page and pulled from
              the database automatically.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (Optional Override)
            </label>
            <input
              type="text"
              value={(data.sectionTitle as string) || ""}
              onChange={(e) => updateField("sectionTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Leave empty for default: OUR CORE VALUES"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Add a description for this section..."
            />
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 To edit core values, go to:{" "}
              <strong>Admin → Settings → Site Settings</strong>
            </p>
          </div>
        </div>
      );

    case "LeadershipSection":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              👥 About This Section
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section displays your leadership team members. Team members
              are managed in a dedicated CMS and pulled from the database
              automatically.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (Optional Override)
            </label>
            <input
              type="text"
              value={(data.sectionTitle as string) || ""}
              onChange={(e) => updateField("sectionTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Leave empty for default: OUR LEADERSHIP"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Add a description about your leadership team..."
            />
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-500 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
              ✨ Manage Leadership Team Members
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Go to: <strong>Admin → Leadership</strong> to add, edit, or remove
              team members with photos, bios, and contact information.
            </p>
          </div>
        </div>
      );

    case "TargetGroupSection":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              🎯 About This Section
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section displays your target groups and beneficiaries. The
              groups are managed in the
              <strong> Settings → Site Settings</strong> page and pulled from
              the database automatically.
            </p>
          </div>
          <ImageUploadField
            label="Header Image"
            value={(data.headerImage as string) || ""}
            onChange={(url) => updateField("headerImage", url)}
            placeholder="https://example.com/header-image.png"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (Optional Override)
            </label>
            <input
              type="text"
              value={(data.sectionTitle as string) || ""}
              onChange={(e) => updateField("sectionTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Leave empty for default: OUR TARGET GROUPS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={(data.description as string) || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              placeholder="Add a description about your target groups..."
            />
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 To edit target groups, go to:{" "}
              <strong>Admin → Settings → Site Settings</strong>
            </p>
          </div>
        </div>
      );

    case "HeroSection":
    case "StatisticsSection":
    case "AchievementsSection":
    case "VolunteerBanner":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              ℹ️ About This Section
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This section pulls data automatically from your site settings and
              database.
              {type === "StatisticsSection" &&
                " Statistics are managed in Settings → Site Settings."}
              {type === "AchievementsSection" &&
                " Achievements are managed in Settings → Site Settings."}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Show Section
            </label>
            <select
              value={(data.enabled as boolean) !== false ? "true" : "false"}
              onChange={(e) =>
                updateField("enabled", e.target.value === "true")
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              <option value="true">Yes, show this section</option>
              <option value="false">No, hide this section</option>
            </select>
          </div>
          {type === "HeroSection" && (
            <>
              <ImageUploadField
                label="Hero Background Image"
                value={(data.backgroundImage as string) || ""}
                onChange={(url) => updateField("backgroundImage", url)}
                placeholder="Hero background image..."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={(data.title as string) || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Hero section title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  value={(data.subtitle as string) || ""}
                  onChange={(e) => updateField("subtitle", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                  placeholder="Hero subtitle or description..."
                />
              </div>
            </>
          )}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 Section data is managed in:{" "}
              <strong>Admin → Settings → Site Settings</strong>
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This section type uses default data from the database. You can add
              custom fields by extending the section editor.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Data (JSON)
            </label>
            <textarea
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  onChange(JSON.parse(e.target.value));
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none font-mono text-sm"
            />
          </div>
        </div>
      );
  }
}

// Default data for each section type
function getDefaultDataForType(type: string): Record<string, unknown> {
  switch (type) {
    case "OperationRegionsSection":
      return {
        mapImageSrc: "/images/Objects.png",
        mapLayerSrc: "",
      };
    case "TaglineSection":
      return {
        tagline: "Enter your tagline here",
      };
    case "GroupPhotoSection":
      return {
        imageSrc: "",
        altText: "Group photo",
      };
    case "AboutTSDSection":
      return {
        description: "",
        backImageSrc: "",
        frontImageSrc: "",
      };
    case "VisionMissionSection":
      return {
        visionImage: "/images/Mask group.png",
        visionText: "",
        missionImage: "/images/Mask group (1).png",
        missionText: "",
      };
    case "ContentSection":
      return {
        title: "",
        content: "",
        image: "",
      };
    default:
      return {};
  }
}
