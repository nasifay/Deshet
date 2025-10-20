"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Image as ImageIcon,
  FolderOpen,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Move,
  Copy,
  Download,
  Grid3X3,
  List,
  Settings,
  RefreshCw,
  CheckSquare,
  Square,
} from "lucide-react";

interface GalleryItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  type: "image" | "video" | "document" | "other";
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
  customClass?: string;
  section: "CLM" | "CRPVF" | "general";
  position: number;
  featured: boolean;
  category: {
    _id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
  };
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [page, categoryFilter, typeFilter, featuredFilter]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/gallery/categories?limit=100");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "24",
        ...(categoryFilter && { category: categoryFilter }),
        ...(typeFilter && { type: typeFilter }),
        ...(featuredFilter && { featured: featuredFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/gallery?${params}`);
      const data = await response.json();

      if (data.success) {
        setItems(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchItems();
      } else {
        alert(data.error || "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchItems();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      const data = await response.json();

      if (data.success) {
        fetchItems();
      } else {
        alert(data.error || "Failed to update featured status");
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      alert("Failed to update featured status");
    }
  };

  const handleBulkAction = async () => {
    if (selectedItems.length === 0 || !bulkAction) return;

    try {
      const response = await fetch("/api/admin/gallery/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedItems,
          action: bulkAction,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setSelectedItems([]);
        setBulkAction("");
        fetchItems();
      } else {
        alert(data.error || "Failed to perform bulk action");
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
      alert("Failed to perform bulk action");
    }
  };

  const handleSelectAll = () => {
    if (!items || !Array.isArray(items)) return;

    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item._id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getGalleryStats = () => {
    if (!items || !Array.isArray(items)) {
      return { total: 0, featured: 0 };
    }

    const total = items.length;
    const featured = items.filter((item) => item.featured).length;

    return { total, featured };
  };

  const stats = getGalleryStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Gallery Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your gallery images and featured content
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
          </button>
          <Link
            href="/admin/gallery/categories"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FolderOpen className="w-5 h-5" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/gallery/new"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Upload New</span>
          </Link>
        </div>
      </div>

      {/* Gallery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Images
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All gallery items
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Featured Images
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Highlighted content
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.featured}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            {/* Search */}
            <form onSubmit={handleSearch} className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search gallery..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={featuredFilter}
                onChange={(e) => {
                  setFeaturedFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="">All Images</option>
                <option value="true">Featured Only</option>
                <option value="false">Non-Featured</option>
              </select>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={fetchItems}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedItems.length} item(s) selected
              </span>
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {selectedItems.length === (items?.length || 0)
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-1 border border-blue-300 dark:border-blue-700 rounded bg-white dark:bg-gray-800 text-sm"
              >
                <option value="">Choose action...</option>
                <option value="feature">Mark as Featured</option>
                <option value="unfeature">Remove Featured</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading gallery...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No gallery items found
            </p>
            <Link
              href="/admin/gallery/new"
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload First Item</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Select All Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  {selectedItems.length === (items?.length || 0) ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                  <span>Select All</span>
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {items?.length || 0} items
                </span>
              </div>
            </div>

            {/* Gallery Items */}
            <div
              className={`p-4 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4"
                  : "space-y-2"
              }`}
            >
              {items?.map((item) => (
                <div
                  key={item._id}
                  className={`group relative bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden border ${
                    selectedItems.includes(item._id)
                      ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                      : "border-gray-200 dark:border-gray-600"
                  } ${
                    item.featured
                      ? "ring-2 ring-yellow-300 dark:ring-yellow-600"
                      : ""
                  }`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      onClick={() => handleSelectItem(item._id)}
                      className="p-1 bg-white/90 dark:bg-gray-800/90 rounded shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      {selectedItems.includes(item._id) ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full shadow-sm">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Image Preview */}
                  <div
                    className={`${
                      viewMode === "grid" ? "aspect-square" : "h-20"
                    } bg-gray-100 dark:bg-gray-800 relative overflow-hidden`}
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.url}
                        alt={item.alt || item.originalName}
                        fill
                        className="object-cover"
                        sizes={
                          viewMode === "grid"
                            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            : "200px"
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                          {item.type}
                        </span>
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Link
                        href={`/admin/gallery/${item._id}/edit`}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() =>
                          handleToggleFeatured(item._id, item.featured)
                        }
                        className={`p-2 rounded-lg transition-colors ${
                          item.featured
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        } text-white`}
                        title={
                          item.featured ? "Remove Featured" : "Mark as Featured"
                        }
                      >
                        {item.featured ? (
                          <StarOff className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className={`p-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div
                      className={
                        viewMode === "list"
                          ? "flex items-center justify-between"
                          : ""
                      }
                    >
                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <p
                          className="text-sm font-medium text-gray-900 dark:text-white truncate"
                          title={item.originalName}
                        >
                          {item.originalName}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <span>{item.category.icon}</span>
                            <span>{item.category.name}</span>
                          </span>
                          <span>{formatFileSize(item.size)}</span>
                        </div>
                        {item.dimensions && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.dimensions.width} × {item.dimensions.height}
                          </p>
                        )}
                      </div>
                      {viewMode === "list" && item.featured && (
                        <div className="flex items-center space-x-1 text-yellow-600 ml-4">
                          <Star className="w-3 h-3" />
                          <span className="text-xs">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Gallery Preview
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <EyeOff className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Preview Content - Similar to GalleryPage */}
              <div className="space-y-8">
                <p className="text-center text-lg text-[#F57C00]">
                  A visual journey of our people, projects, and the change we
                  create.
                </p>

                {/* Gallery Grid Preview */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items?.slice(0, 12).map((item) => (
                    <div
                      key={item._id}
                      className="relative bg-white rounded-2xl p-2 shadow-lg"
                    >
                      <div className="aspect-square relative overflow-hidden rounded-xl">
                        {item.type === "image" ? (
                          <Image
                            src={item.url}
                            alt={item.alt || item.originalName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        {item.featured && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
