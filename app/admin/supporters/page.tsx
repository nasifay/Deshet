"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Handshake,
  DollarSign,
} from "lucide-react";
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

interface KeyFunder {
  _id?: string;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
  type: "key_funder" | "supporter";
}

export default function SupportersManagementPage() {
  const [activeTab, setActiveTab] = useState<"supporters" | "keyfunders">(
    "supporters"
  );
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [keyFunders, setKeyFunders] = useState<KeyFunder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingSupporter, setEditingSupporter] = useState<Supporter | null>(
    null
  );
  const [editingKeyFunder, setEditingKeyFunder] = useState<KeyFunder | null>(
    null
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Supporter | KeyFunder>({
    name: "",
    logo: "",
    order: 0,
    isActive: true,
    link: "",
    description: "",
    type: "key_funder",
  });
  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSupporters();
    fetchKeyFunders();
  }, []);

  const fetchSupporters = async () => {
    try {
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
    }
  };

  const fetchKeyFunders = async () => {
    try {
      const response = await fetch("/api/admin/keyfunders");
      const data = await response.json();

      if (data.success) {
        setKeyFunders(data.data);
      } else {
        console.error("Failed to fetch key funders:", data.error);
        alert("⚠️ Failed to load key funders. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching key funders:", error);
      alert(
        "❌ Error loading key funders. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (
    item: Supporter | KeyFunder,
    type: "supporter" | "keyfunder"
  ) => {
    if (type === "supporter") {
      setEditingSupporter(item as Supporter);
      setEditingKeyFunder(null);
    } else {
      setEditingKeyFunder(item as KeyFunder);
      setEditingSupporter(null);
    }
    setFormData({
      name: item.name,
      logo: item.logo,
      order: item.order,
      isActive: item.isActive,
      link: item.link || "",
      description: item.description || "",
      type: "type" in item ? item.type : "key_funder",
    });
    setPendingLogoFile(null);
    setIsAddingNew(false);
  };

  const handleDelete = async (id: string, type: "supporter" | "keyfunder") => {
    const itemType = type === "supporter" ? "supporter" : "key funder";
    if (!confirm(`Are you sure you want to delete this ${itemType}?`)) {
      return;
    }

    try {
      setDeleting(id);
      const endpoint =
        type === "supporter"
          ? `/api/admin/supporters/${id}`
          : `/api/admin/keyfunders/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `✅ ${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } deleted successfully!`
        );
        if (type === "supporter") {
          fetchSupporters();
        } else {
          fetchKeyFunders();
        }
      } else {
        alert(`⚠️ Failed to delete ${itemType}: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error deleting ${itemType}:`, error);
      alert(`❌ Error deleting ${itemType}. Please try again.`);
    } finally {
      setDeleting(null);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingSupporter(null);
    setEditingKeyFunder(null);
    const currentItems = activeTab === "supporters" ? supporters : keyFunders;
    const maxOrder =
      currentItems.length > 0
        ? Math.max(...currentItems.map((s) => s.order))
        : -1;
    setFormData({
      name: "",
      logo: "",
      order: maxOrder + 1,
      isActive: true,
      link: "",
      description: "",
      type: activeTab === "supporters" ? "supporter" : "key_funder",
    });
    setPendingLogoFile(null);
  };

  const handleCancel = () => {
    setEditingSupporter(null);
    setEditingKeyFunder(null);
    setIsAddingNew(false);
    setFormData({
      name: "",
      logo: "",
      order: 0,
      isActive: true,
      link: "",
      description: "",
      type: "key_funder",
    });
    setPendingLogoFile(null);
  };

  const handleSave = async () => {
    const itemType = activeTab === "supporters" ? "supporter" : "key funder";
    if (!formData.name.trim()) {
      alert(`Please enter ${itemType} name`);
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
        type: activeTab === "supporters" ? "supporter" : "key_funder",
      };

      const isEditing = editingSupporter || editingKeyFunder;
      const editingId = editingSupporter?._id || editingKeyFunder?._id;
      const endpoint =
        activeTab === "supporters"
          ? "/api/admin/supporters"
          : "/api/admin/keyfunders";

      const url = isAddingNew ? endpoint : `${endpoint}/${editingId}`;

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
          `✅ ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${
            isAddingNew ? "created" : "updated"
          } successfully!`
        );
        if (activeTab === "supporters") {
          fetchSupporters();
        } else {
          fetchKeyFunders();
        }
        handleCancel();
      } else {
        alert(`⚠️ Failed to save ${itemType}: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error saving ${itemType}:`, error);
      alert(`❌ Error saving ${itemType}. Please try again.`);
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
              Supporters & Funders Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your organization's partners, supporters, and key funders
            </p>
          </div>
          <button
            onClick={handleAddNew}
            disabled={
              isAddingNew ||
              editingSupporter !== null ||
              editingKeyFunder !== null
            }
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            <span>
              Add {activeTab === "supporters" ? "Supporter" : "Key Funder"}
            </span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("supporters")}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "supporters"
                  ? "border-primary-green text-primary-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Supporters ({supporters.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("keyfunders")}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "keyfunders"
                  ? "border-primary-green text-primary-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Key Funders ({keyFunders.length})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingSupporter || editingKeyFunder) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {isAddingNew
              ? `Add New ${
                  activeTab === "supporters" ? "Supporter" : "Key Funder"
                }`
              : `Edit ${
                  activeTab === "supporters" ? "Supporter" : "Key Funder"
                }`}
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
              <span>
                {saving
                  ? "Saving..."
                  : `Save ${
                      activeTab === "supporters" ? "Supporter" : "Key Funder"
                    }`}
              </span>
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

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {activeTab === "supporters"
              ? `Supporters (${supporters.length})`
              : `Key Funders (${keyFunders.length})`}
          </h2>
        </div>

        {(
          activeTab === "supporters"
            ? supporters.length === 0
            : keyFunders.length === 0
        ) ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No {activeTab === "supporters" ? "supporters" : "key funders"}{" "}
              added yet
            </p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              <span>
                Add Your First{" "}
                {activeTab === "supporters" ? "Supporter" : "Key Funder"}
              </span>
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
                {(activeTab === "supporters" ? supporters : keyFunders).map(
                  (item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-10 relative border border-gray-300 dark:border-gray-600 rounded overflow-hidden bg-white">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.order}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                            item.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {item.isActive ? (
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
                        {item.link ? (
                          <a
                            href={item.link}
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
                            onClick={() =>
                              handleEdit(
                                item,
                                activeTab === "supporters"
                                  ? "supporter"
                                  : "keyfunder"
                              )
                            }
                            disabled={
                              isAddingNew ||
                              editingSupporter !== null ||
                              editingKeyFunder !== null
                            }
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(
                                item._id!,
                                activeTab === "supporters"
                                  ? "supporter"
                                  : "keyfunder"
                              )
                            }
                            disabled={deleting === item._id}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
