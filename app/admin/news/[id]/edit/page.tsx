"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../../../components/RichTextEditor";
import ImageUploadField from "../../../components/ImageUploadField";

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean(),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/news/${params.id}`);
        const data = await response.json();

        if (data.success) {
          const post = data.data;
          setValue("title", post.title);
          setValue("slug", post.slug);
          setValue("excerpt", post.excerpt);
          setValue("featuredImage", post.featuredImage || "");
          setValue("category", post.category);
          setValue("tags", post.tags.join(", "));
          setValue("status", post.status);
          setValue("isFeatured", post.isFeatured);
          setContent(post.content);
        } else {
          alert("Failed to load post");
          router.push("/admin/news");
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
  const title = watch("title");
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        content,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const response = await fetch(`/api/admin/news/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to update post");
        setIsLoading(false);
        return;
      }

      alert("Post updated successfully!");
      router.push("/admin/news");
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
      const response = await fetch(`/api/admin/news/${params.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Post deleted successfully!");
        router.push("/admin/news");
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
            href="/admin/news"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Edit News Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update and manage your news post
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
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title *
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              onChange={(e) => {
                register("title").onChange(e);
                setValue("slug", generateSlug(e.target.value));
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

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

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Excerpt *
            </label>
            <textarea
              {...register("excerpt")}
              id="excerpt"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Brief description of the post"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your post content..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
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
                <option value="News">News</option>
                <option value="Events">Events</option>
                <option value="Announcements">Announcements</option>
                <option value="Success Stories">Success Stories</option>
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
              placeholder="Upload an image or paste image URL..."
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
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
            href="/admin/news"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-[0.5] disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
