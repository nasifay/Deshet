"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../../../components/RichTextEditor";
import ImageUploadField, {
  uploadImageFile,
} from "../../../components/ImageUploadField";
import BilingualField from "../../../components/BilingualField";

const blogSchema = z.object({
  title: z.union([
    z.string().min(1, "Title is required"),
    z.object({
      en: z.string().min(1, "English title is required"),
      am: z.string().optional(),
    }),
  ]),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.union([
    z.string().min(1, "Excerpt is required"),
    z.object({
      en: z.string().min(1, "English excerpt is required"),
      am: z.string().optional(),
    }),
  ]),
  content: z.union([
    z.string().optional(),
    z.object({
      en: z.string().optional(),
      am: z.string().optional(),
    }),
  ]), // Content is handled separately by RichTextEditor
  featuredImage: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<{ en: string; am: string }>({
    en: "",
    am: "",
  });
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<{ en: string; am: string }>({
    en: "",
    am: "",
  });
  const [excerpt, setExcerpt] = useState<{ en: string; am: string }>({
    en: "",
    am: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    mode: "onSubmit",
    shouldFocusError: true,
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${params.id}`);
        const data = await response.json();

        if (data.success) {
          const post = data.data;
          
          // Handle bilingual fields
          let titleValue: { en: string; am: string };
          if (typeof post.title === "object" && post.title !== null) {
            titleValue = {
              en: post.title.en || "",
              am: post.title.am || "",
            };
          } else {
            titleValue = {
              en: post.title || "",
              am: "",
            };
          }
          setTitle(titleValue);
          setValue("title", titleValue);
          
          let excerptValue: { en: string; am: string };
          if (typeof post.excerpt === "object" && post.excerpt !== null) {
            excerptValue = {
              en: post.excerpt.en || "",
              am: post.excerpt.am || "",
            };
          } else {
            excerptValue = {
              en: post.excerpt || "",
              am: "",
            };
          }
          setExcerpt(excerptValue);
          setValue("excerpt", excerptValue);
          
          if (typeof post.content === "object" && post.content !== null) {
            setContent({
              en: post.content.en || "",
              am: post.content.am || "",
            });
          } else {
            setContent({
              en: post.content || "",
              am: "",
            });
          }
          
          setValue("slug", post.slug);
          setValue("featuredImage", post.featuredImage || "");
          setValue("category", post.category);
          setValue("tags", post.tags.join(", "));
          setValue("status", post.status);
          setValue("isFeatured", post.isFeatured);
        } else {
          alert("Failed to load post");
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to load post");
        router.push("/admin/news");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router, setValue]);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Update slug when English title changes
  useEffect(() => {
    if (title.en) {
      setValue("slug", generateSlug(title.en));
    }
  }, [title.en, setValue]);

  const onSubmit = async (data: BlogFormData) => {
    setIsLoading(true);

    try {
      // Validate content separately since it's not part of the form data
      if (!content.en || !content.en.trim()) {
        alert("Content is required");
        setIsLoading(false);
        return;
      }

      // Validate title and excerpt
      if (!title.en || !title.en.trim()) {
        alert("English title is required");
        setIsLoading(false);
        return;
      }

      if (!excerpt.en || !excerpt.en.trim()) {
        alert("English excerpt is required");
        setIsLoading(false);
        return;
      }

      let featuredImageUrl = data.featuredImage;

      // Upload image if there's a pending file
      if (pendingImageFile) {
        try {
          featuredImageUrl = await uploadImageFile(pendingImageFile);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        title,
        slug: data.slug,
        excerpt,
        content,
        featuredImage: featuredImageUrl,
        category: data.category,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: data.status,
        isFeatured: data.isFeatured,
      };

      console.log("Submitting payload:", payload); // Debug log

      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log("API response:", result); // Debug log

      if (!response.ok) {
        alert(result.error || "Failed to update post");
        setIsLoading(false);
        return;
      }

      alert("Post updated successfully!");
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Post deleted successfully!");
        router.push("/admin/blog");
      } else {
        alert(result.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Edit Blog Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update and manage your blog post
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          {/* Title - Bilingual */}
          <BilingualField
            label="Title"
            value={title}
            onChange={(value) => {
              setTitle(value);
              setValue("title", value);
            }}
            placeholder={{
              en: "Enter post title in English",
              am: "የጽሁፉን ርዕስ በአማርኛ ያስገቡ",
            }}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {typeof errors.title.message === 'string' ? errors.title.message : 'Title is required'}
            </p>
          )}

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Slug *
            </label>
            <input
              {...register("slug")}
              type="text"
              id="slug"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="post-slug"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Excerpt - Bilingual */}
          <BilingualField
            label="Excerpt"
            value={excerpt}
            onChange={(value) => {
              setExcerpt(value);
              setValue("excerpt", value);
            }}
            type="textarea"
            rows={3}
            placeholder={{
              en: "Brief description of the post in English",
              am: "የጽሁፉን አጭር መግለጫ በአማርኛ",
            }}
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">
              {typeof errors.excerpt.message === 'string' ? errors.excerpt.message : 'Excerpt is required'}
            </p>
          )}

          {/* Content - Bilingual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (Bilingual) *
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  English Content
                </label>
                <RichTextEditor
                  content={typeof content === "object" ? content.en || "" : content}
                  onChange={(enContent) =>
                    setContent({
                      en: enContent,
                      am: typeof content === "object" ? content.am || "" : "",
                    })
                  }
                  placeholder="Write your post content in English..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Amharic Content (አማርኛ ይዘት)
                </label>
                <RichTextEditor
                  content={typeof content === "object" ? content.am || "" : ""}
                  onChange={(amContent) =>
                    setContent({
                      en: typeof content === "object" ? content.en || "" : "",
                      am: amContent,
                    })
                  }
                  placeholder="የጽሁፉን ይዘት በአማርኛ ይጻፉ..."
                />
              </div>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Category *
              </label>
              <select
                {...register("category")}
                id="category"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="">Select Category</option>
                <option value="Health Tips">Health Tips</option>
                <option value="Traditional Medicine">Traditional Medicine</option>
                <option value="Herbal Remedies">Herbal Remedies</option>
                <option value="Wellness">Wellness</option>
                <option value="Announcements">Announcements</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Tags
              </label>
              <input
                {...register("tags")}
                type="text"
                id="tags"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="tag1, tag2, tag3"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Separate tags with commas
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <ImageUploadField
              label="Featured Image"
              value={watch("featuredImage") || ""}
              onChange={(url) => setValue("featuredImage", url)}
              onFileSelect={setPendingImageFile}
              deferUpload={true}
              placeholder="Upload an image or paste image URL..."
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
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
                    Featured blog posts will be automatically displayed on the
                    landing page in the Blog section for maximum
                    visibility.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                {...register("isFeatured")}
                type="checkbox"
                id="isFeatured"
                className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
              />
              <label
                htmlFor="isFeatured"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Mark as featured post
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  {...register("status")}
                  type="radio"
                  value="draft"
                  className="w-4 h-4 text-primary-green border-gray-300 focus:ring-primary-green"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Draft
                </span>
              </label>
              <label className="flex items-center">
                <input
                  {...register("status")}
                  type="radio"
                  value="published"
                  className="w-4 h-4 text-primary-green border-gray-300 focus:ring-primary-green"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Published
                </span>
              </label>
              <label className="flex items-center">
                <input
                  {...register("status")}
                  type="radio"
                  value="archived"
                  className="w-4 h-4 text-primary-green border-gray-300 focus:ring-primary-green"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Archived
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/blog"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-[0.5] disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
