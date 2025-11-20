"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Edit2 } from "lucide-react";
import ImageUploadField from "~/app/admin/components/ImageUploadField";
import BilingualField from "~/app/admin/components/BilingualField";

interface Program {
  _id: string;
  title: string | { en: string; am: string };
  slug: string;
  description: string | { en: string; am: string };
  categoryId: string;
  categoryLabel: string | { en: string; am: string };
  image: string;
  thumbnails: Array<{
    id: number;
    src: string;
    alt?: string;
    uploaded?: boolean;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description?: string;
    featuredImage?: string;
    galleryThumbnails?: Array<{
      id: number;
      src: string;
      alt?: string;
      uploaded?: boolean;
    }>;
    status?: string;
    partner?: string;
  }>;
  status: "draft" | "published" | "archived";
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function EditProgram() {
  const router = useRouter();
  const params = useParams();
  const programId = params.id as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: { en: "", am: "" } as { en: string; am: string },
    slug: "",
    description: { en: "", am: "" } as { en: string; am: string },
    categoryId: "traditional-consultation",
    image: "",
    thumbnails: [] as Array<{
      id: number;
      src: string;
      alt?: string;
      uploaded?: boolean;
    }>,
    projects: [] as Array<{
      id: number;
      name: string;
      description?: string;
      featuredImage?: string;
      galleryThumbnails?: Array<{
        id: number;
        src: string;
        alt?: string;
        uploaded?: boolean;
      }>;
      status?: string;
      partner?: string;
    }>,
    status: "draft" as "draft" | "published" | "archived",
    order: 1,
  });

  const categories = [
    { id: "traditional-consultation", label: "Traditional Medical Consultation" },
    { id: "herbal-medicine", label: "Herbal Medicine Preparation" },
    { id: "detox-therapy", label: "Detox & Cleansing Therapy" },
    { id: "diagnostic-techniques", label: "Traditional Diagnostic Techniques" },
    { id: "healing-treatments", label: "Healing Treatments" },
  ];

  useEffect(() => {
    if (programId) {
      fetchProgram();
    }
  }, [programId]);

  // Helper function to normalize bilingual value
  const normalizeBilingual = (value: string | { en: string; am: string } | undefined): { en: string; am: string } => {
    if (!value) return { en: "", am: "" };
    if (typeof value === "string") return { en: value, am: "" };
    if (typeof value === "object" && "en" in value && "am" in value) {
      return { en: value.en || "", am: value.am || "" };
    }
    return { en: "", am: "" };
  };

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/programs/${programId}`);
      const data = await response.json();

      if (data.success) {
        setProgram(data.data);
        setFormData({
          title: normalizeBilingual(data.data.title),
          slug: data.data.slug,
          description: normalizeBilingual(data.data.description),
          categoryId: data.data.categoryId,
          image: data.data.image,
          thumbnails: data.data.thumbnails || [],
          projects: data.data.projects || [],
          status: data.data.status,
          order: data.data.order || 1,
        });
      } else {
        alert("Program not found");
        router.push("/admin/programs");
      }
    } catch (error) {
      console.error("Error fetching program:", error);
      alert("Failed to load program");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Program saved successfully!");
        router.push("/admin/programs");
      } else {
        alert(data.error || "Failed to save program");
      }
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program");
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

  const handleTitleChange = (title: { en: string; am: string }) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug:
        prev.slug === generateSlug(prev.title.en)
          ? generateSlug(title.en)
          : prev.slug,
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  const addThumbnail = (url: string) => {
    const newThumbnail = {
      id: Date.now(),
      src: url,
    };
    setFormData((prev) => ({
      ...prev,
      thumbnails: [...prev.thumbnails, newThumbnail],
    }));
  };

  const removeThumbnail = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((t) => t.id !== id),
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      featuredImage: "",
      galleryThumbnails: [],
      status: "active",
      partner: "",
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));

    // Scroll to the new project after a short delay to allow DOM to update
    setTimeout(() => {
      const projectElement = document.getElementById(
        `project-${newProject.id}`
      );
      if (projectElement) {
        projectElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight the new project briefly
        projectElement.classList.add("ring-2", "ring-primary-green");
        setTimeout(() => {
          projectElement.classList.remove("ring-2", "ring-primary-green");
        }, 2000);
      }
    }, 100);
  };

  const updateProject = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const removeProject = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addProjectThumbnail = (projectId: number, url: string) => {
    const newThumbnail = {
      id: Date.now(),
      src: url,
      alt: `Project thumbnail ${Date.now()}`,
      uploaded: true,
    };
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              galleryThumbnails: [...(p.galleryThumbnails || []), newThumbnail],
            }
          : p
      ),
    }));
  };

  const removeProjectThumbnail = (projectId: number, thumbnailId: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              galleryThumbnails: (p.galleryThumbnails || []).filter(
                (t) => t.id !== thumbnailId
              ),
            }
          : p
      ),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Program Not Found
          </h2>
          <Link
            href="/admin/programs"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Programs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/programs"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Programs</span>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Edit Program
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Last updated: {new Date(program.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={saving || !formData.title.en.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Program"}</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <BilingualField
                  label="Program Title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  type="text"
                  placeholder={{
                    en: "Enter program title in English",
                    am: "የፕሮግራም ርዕስ በአማርኛ ያስገቡ",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="program-url-slug"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  URL: /{formData.slug}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "draft" | "published" | "archived",
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <BilingualField
              label="Program Description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
              type="textarea"
              rows={8}
              placeholder={{
                en: "Describe the program in detail in English...",
                am: "ፕሮግራሙን በዝርዝር በአማርኛ ይግለጹ...",
              }}
            />
          </div>

          {/* Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Projects
              </h2>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center space-x-2 px-3 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.projects.map((project) => (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Project {project.id}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(project.id, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                        placeholder="e.g., YCI YNSD"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Partner/Organization
                      </label>
                      <input
                        type="text"
                        value={project.partner}
                        onChange={(e) =>
                          updateProject(project.id, "partner", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                        placeholder="e.g., NCA, GIZ"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Featured Image
                      </label>
                      <ImageUploadField
                        label=""
                        value={project.featuredImage || ""}
                        onChange={(url) =>
                          updateProject(project.id, "featuredImage", url)
                        }
                        placeholder="Upload project featured image..."
                      />
                    </div>

                    {/* Project Gallery Thumbnails */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gallery Thumbnails
                      </label>

                      {/* Thumbnail Preview Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {(project.galleryThumbnails || []).map((thumbnail) => (
                          <div key={thumbnail.id} className="relative group">
                            <img
                              src={thumbnail.src}
                              alt={thumbnail.alt || "Project thumbnail"}
                              className="w-full h-16 object-cover rounded"
                            />
                            <button
                              onClick={() =>
                                removeProjectThumbnail(project.id, thumbnail.id)
                              }
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-2 h-2" />
                            </button>
                            {thumbnail.uploaded && (
                              <div className="absolute bottom-0 left-0 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
                                Uploaded
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Upload New Thumbnail */}
                      <ImageUploadField
                        label=""
                        value=""
                        onChange={(url) => {
                          if (url.trim()) {
                            addProjectThumbnail(project.id, url.trim());
                          }
                        }}
                        placeholder="Upload project thumbnail..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                        placeholder="Brief description of the project..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={project.status}
                        onChange={(e) =>
                          updateProject(project.id, "status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="planning">Planning</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {formData.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>
                    No projects added yet. Click &quot;Add Project&quot; to get
                    started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Image
            </h2>
            <ImageUploadField
              label="Program Image"
              value={formData.image}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, image: url }))
              }
              placeholder="Upload or enter image URL..."
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Gallery Thumbnails
            </h2>

            <div className="space-y-4">
              {/* Thumbnail Preview Grid */}
              <div className="grid grid-cols-2 gap-2">
                {formData.thumbnails.map((thumbnail) => (
                  <div key={thumbnail.id} className="relative group">
                    <img
                      src={thumbnail.src}
                      alt={thumbnail.alt || "Thumbnail"}
                      className="w-full h-20 object-cover rounded"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 rounded flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-[1] flex space-x-1">
                        <button
                          onClick={() => removeThumbnail(thumbnail.id)}
                          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            // Trigger image upload for this specific thumbnail
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) {
                                const formData = new FormData();
                                formData.append("file", file);
                                try {
                                  const response = await fetch(
                                    "/api/admin/media/upload",
                                    {
                                      method: "POST",
                                      body: formData,
                                    }
                                  );
                                  const data = await response.json();
                                  if (data.success) {
                                    // Update this specific thumbnail
                                    setFormData((prev) => ({
                                      ...prev,
                                      thumbnails: prev.thumbnails.map((t) =>
                                        t.id === thumbnail.id
                                          ? {
                                              ...t,
                                              src: data.data.url,
                                              uploaded: true,
                                            }
                                          : t
                                      ),
                                    }));
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error uploading image:",
                                    error
                                  );
                                }
                              }
                            };
                            input.click();
                          }}
                          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          title="Change Image"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Uploaded indicator */}
                    {thumbnail.uploaded && (
                      <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
                        Uploaded
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Upload New Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload New Thumbnail Image
                </label>
                <ImageUploadField
                  label=""
                  value=""
                  onChange={(url) => {
                    if (url.trim()) {
                      const newThumbnail = {
                        id: Date.now(),
                        src: url.trim(),
                        alt: `Gallery thumbnail ${
                          formData.thumbnails.length + 1
                        }`,
                        uploaded: true,
                      };
                      setFormData((prev) => ({
                        ...prev,
                        thumbnails: [...prev.thumbnails, newThumbnail],
                      }));
                    }
                  }}
                  placeholder="Upload a thumbnail image..."
                />
              </div>

              {/* URL Input (Fallback) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or Add Thumbnail URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    placeholder="https://example.com/thumb.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const target = e.target as HTMLInputElement;
                        if (target.value.trim()) {
                          const newThumbnail = {
                            id: Date.now(),
                            src: target.value.trim(),
                            alt: `Gallery thumbnail ${
                              formData.thumbnails.length + 1
                            }`,
                            uploaded: false,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            thumbnails: [...prev.thumbnails, newThumbnail],
                          }));
                          target.value = "";
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = (e.target as HTMLButtonElement)
                        .previousElementSibling as HTMLInputElement;
                      if (input.value.trim()) {
                        const newThumbnail = {
                          id: Date.now(),
                          src: input.value.trim(),
                          alt: `Gallery thumbnail ${
                            formData.thumbnails.length + 1
                          }`,
                          uploaded: false,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          thumbnails: [...prev.thumbnails, newThumbnail],
                        }));
                        input.value = "";
                      }
                    }}
                    className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Program Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Program Information
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Created:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(program.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Last Updated:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(program.updatedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Category:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  {typeof program.categoryLabel === "string"
                    ? program.categoryLabel
                    : program.categoryLabel?.en || program.categoryLabel?.am || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
