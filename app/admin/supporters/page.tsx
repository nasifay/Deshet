"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import ImageUploadField, {
  uploadImageFile,
} from "../components/ImageUploadField";

interface Supporter {
  _id?: string;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
}

export default function SupportersManagementPage() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingSupporter, setEditingSupporter] = useState<Supporter | null>(
    null
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Supporter>({
    name: "",
    logo: "",
    order: 0,
    isActive: true,
    link: "",
    description: "",
  });
  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSupporters();
  }, []);

  const fetchSupporters = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/supporters");
      const data = await response.json();

      if (data.success) {
        setSupporters(data.data);
      } else {
        console.error("Failed to fetch supporters:", data.error);
        alert("⚠️ Failed to load supporters. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching supporters:", error);
      alert(
        "❌ Error loading supporters. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supporter: Supporter) => {
    setEditingSupporter(supporter);
    setFormData({
      name: supporter.name,
      logo: supporter.logo,
      order: supporter.order,
      isActive: supporter.isActive,
      link: supporter.link || "",
      description: supporter.description || "",
    });
    setPendingLogoFile(null);
    setIsAddingNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supporter?")) {
      return;
    }

    try {
      setDeleting(id);
      const response = await fetch(`/api/admin/supporters/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Supporter deleted successfully!");
        fetchSupporters();
      } else {
        alert(`⚠️ Failed to delete supporter: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting supporter:", error);
      alert("❌ Error deleting supporter. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingSupporter(null);
    const maxOrder =
      supporters.length > 0 ? Math.max(...supporters.map((s) => s.order)) : -1;
    setFormData({
      name: "",
      logo: "",
      order: maxOrder + 1,
      isActive: true,
      link: "",
      description: "",
    });
    setPendingLogoFile(null);
  };

  const handleCancel = () => {
    setEditingSupporter(null);
    setIsAddingNew(false);
    setFormData({
      name: "",
      logo: "",
      order: 0,
      isActive: true,
      link: "",
      description: "",
    });
    setPendingLogoFile(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Please enter supporter name");
      return;
    }

    try {
      setSaving(true);

      let logoUrl = formData.logo;

      // If there's a pending logo file, upload it first
      if (pendingLogoFile) {
        const uploadedUrl = await uploadImageFile(pendingLogoFile);
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        } else {
          alert("Failed to upload logo");
          return;
        }
      }

      if (!logoUrl.trim()) {
        alert("Please provide a logo");
        return;
      }

      const payload = {
        ...formData,
        logo: logoUrl,
        name: formData.name.trim(),
        link: formData.link?.trim() || "",
        description: formData.description?.trim() || "",
      };

      const url = isAddingNew
        ? "/api/admin/supporters"
        : `/api/admin/supporters/${editingSupporter?._id}`;

      const method = isAddingNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `✅ Supporter ${isAddingNew ? "created" : "updated"} successfully!`
        );
        fetchSupporters();
        handleCancel();
      } else {
        alert(`⚠️ Failed to save supporter: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving supporter:", error);
      alert("❌ Error saving supporter. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoFileSelect = (file: File | null) => {
    setPendingLogoFile(file);
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Supporters Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your organization's partners and supporters
            </p>
          </div>
          <button
            onClick={handleAddNew}
            disabled={isAddingNew || editingSupporter !== null}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            <span>Add Supporter</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingSupporter) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {isAddingNew ? "Add New Supporter" : "Edit Supporter"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="e.g., USAID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    order: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploadField
                label="Logo *"
                value={formData.logo}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, logo: url }))
                }
                onFileSelect={handleLogoFileSelect}
                deferUpload={true}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website Link (optional)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="https://example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                placeholder="Brief description about this supporter..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Active (show on website)
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Supporter"}</span>
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Supporters List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Supporters ({supporters.length})
          </h2>
        </div>

        {supporters.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No supporters added yet
            </p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Supporter</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {supporters.map((supporter) => (
                  <tr
                    key={supporter._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-10 relative border border-gray-300 dark:border-gray-600 rounded overflow-hidden bg-white">
                        <img
                          src={supporter.logo}
                          alt={supporter.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {supporter.name}
                      </div>
                      {supporter.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">
                          {supporter.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {supporter.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                          supporter.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {supporter.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Inactive</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {supporter.link ? (
                        <a
                          href={supporter.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(supporter)}
                          disabled={isAddingNew || editingSupporter !== null}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(supporter._id!)}
                          disabled={deleting === supporter._id}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
