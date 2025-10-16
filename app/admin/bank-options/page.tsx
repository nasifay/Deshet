"use client";

import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Building2,
  CreditCard,
  X,
  Save,
  Upload,
} from "lucide-react";
import Image from "next/image";

interface BankOption {
  _id: string;
  name: string;
  accountNumber?: string;
  number?: string;
  id?: string;
  swiftCode?: string;
  logo: string;
  copyIcon?: string;
  organizationName: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface BankFormData {
  name: string;
  accountNumber: string;
  number: string;
  id: string;
  swiftCode: string;
  logo: string;
  copyIcon: string;
  organizationName: string;
  status: "active" | "inactive";
  order: number;
}

const initialFormData: BankFormData = {
  name: "",
  accountNumber: "",
  number: "",
  id: "",
  swiftCode: "",
  logo: "",
  copyIcon: "",
  organizationName: "Tamra ForSocial Development Organization",
  status: "active",
  order: 0,
};

export default function BankOptionsPage() {
  const [bankOptions, setBankOptions] = useState<BankOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BankFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCopyIcon, setUploadingCopyIcon] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [copyIconPreview, setCopyIconPreview] = useState<string>("");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const copyIconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBankOptions();
  }, [statusFilter]);

  const fetchBankOptions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: "100",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/admin/bank-options?${params}`);
      const data = await response.json();

      if (data.success) {
        setBankOptions(data.data);
      }
    } catch (error) {
      console.error("Error fetching bank options:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBankOptions();
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingLogo(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, logo: data.data.url });
      } else {
        alert(data.error || "Failed to upload logo");
        setLogoPreview("");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo");
      setLogoPreview("");
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = () => {
    if (confirm("Remove this logo?")) {
      setLogoPreview("");
      setFormData({ ...formData, logo: "" });
    }
  };

  const handleCopyIconUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingCopyIcon(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCopyIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, copyIcon: data.data.url });
      } else {
        alert(data.error || "Failed to upload copy icon");
        setCopyIconPreview("");
      }
    } catch (error) {
      console.error("Error uploading copy icon:", error);
      alert("Failed to upload copy icon");
      setCopyIconPreview("");
    } finally {
      setUploadingCopyIcon(false);
      if (copyIconInputRef.current) {
        copyIconInputRef.current.value = "";
      }
    }
  };

  const handleRemoveCopyIcon = () => {
    if (confirm("Remove this copy icon?")) {
      setCopyIconPreview("");
      setFormData({ ...formData, copyIcon: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId
        ? `/api/admin/bank-options/${editingId}`
        : "/api/admin/bank-options";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          editingId
            ? "Bank option updated successfully"
            : "Bank option created successfully"
        );
        setShowForm(false);
        setEditingId(null);
        setFormData(initialFormData);
        fetchBankOptions();
      } else {
        alert(data.error || "Failed to save bank option");
      }
    } catch (error) {
      console.error("Error saving bank option:", error);
      alert("Failed to save bank option");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (bank: BankOption) => {
    setFormData({
      name: bank.name,
      accountNumber: bank.accountNumber || "",
      number: bank.number || "",
      id: bank.id || "",
      swiftCode: bank.swiftCode || "",
      logo: bank.logo,
      copyIcon: bank.copyIcon || "",
      organizationName: bank.organizationName,
      status: bank.status,
      order: bank.order,
    });
    setLogoPreview(bank.logo); // Set preview for existing logo
    setCopyIconPreview(bank.copyIcon || ""); // Set preview for existing copy icon
    setEditingId(bank._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/bank-options/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Bank option deleted successfully");
        fetchBankOptions();
      } else {
        alert(data.error || "Failed to delete bank option");
      }
    } catch (error) {
      console.error("Error deleting bank option:", error);
      alert("Failed to delete bank option");
    }
  };

  const handleReorder = async (bank: BankOption, direction: "up" | "down") => {
    const currentIndex = bankOptions.findIndex((b) => b._id === bank._id);
    if (currentIndex === -1) return;

    if (direction === "up" && currentIndex === 0) return;
    if (direction === "down" && currentIndex === bankOptions.length - 1) return;

    const newOrder = direction === "up" ? bank.order - 1 : bank.order + 1;

    try {
      const response = await fetch(`/api/admin/bank-options/${bank._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bank, order: newOrder }),
      });

      const data = await response.json();

      if (data.success) {
        fetchBankOptions();
      }
    } catch (error) {
      console.error("Error reordering bank option:", error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
    setLogoPreview("");
    setCopyIconPreview("");
  };

  const getStatusBadge = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Bank Options
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage donation bank accounts and payment options
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Bank Option
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, account number, or swift code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </form>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Bank Options Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Bank Option" : "Add New Bank Option"}
              </h2>
              <button
                onClick={cancelForm}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Commercial Bank of Ethiopia"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bank Logo *
                </label>
                {logoPreview ? (
                  <div className="relative group">
                    <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Overlay buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-[1] transition-opacity rounded-lg flex items-center justify-center space-x-3">
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        disabled={uploadingLogo}
                        className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        disabled={uploadingLogo}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                      >
                        Remove
                      </button>
                    </div>

                    {uploadingLogo && (
                      <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div>
                          <p className="text-white text-sm">Uploading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer flex flex-col items-center justify-center"
                  >
                    {uploadingLogo ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Uploading...
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">
                          Click to upload logo
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>

              {/* Organization Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organizationName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Tamra ForSocial Development Organization"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 1000102030405"
                />
              </div>

              {/* Phone Number (for mobile money) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number (Mobile Money)
                </label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., +251 91111111"
                />
              </div>

              {/* ID (for mobile money) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ID (Mobile Money)
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 1122334455"
                />
              </div>

              {/* Swift Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Swift Code
                </label>
                <input
                  type="text"
                  value={formData.swiftCode}
                  onChange={(e) =>
                    setFormData({ ...formData, swiftCode: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., CBETETAA"
                />
              </div>

              {/* Copy Icon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Copy Icon (Optional)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Custom icon to display with copy buttons
                </p>
                {copyIconPreview ? (
                  <div className="relative group">
                    <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4">
                      <img
                        src={copyIconPreview}
                        alt="Copy icon preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Overlay buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-[1] transition-opacity rounded-lg flex items-center justify-center space-x-3">
                      <button
                        type="button"
                        onClick={() => copyIconInputRef.current?.click()}
                        disabled={uploadingCopyIcon}
                        className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveCopyIcon}
                        disabled={uploadingCopyIcon}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-[0.5]"
                      >
                        Remove
                      </button>
                    </div>

                    {uploadingCopyIcon && (
                      <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                          <p className="text-white text-xs">Uploading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => copyIconInputRef.current?.click()}
                    className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer flex flex-col items-center justify-center"
                  >
                    {uploadingCopyIcon ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green mx-auto mb-2"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Uploading...
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                          Click to upload icon
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={copyIconInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCopyIconUpload}
                  className="hidden"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bank Options List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          </div>
        ) : bankOptions.length === 0 ? (
          <div className="p-8 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No bank options found. Add your first bank account.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {bankOptions.map((bank, index) => (
              <div
                key={bank._id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      {bank.logo ? (
                        <Image
                          src={bank.logo}
                          alt={bank.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Bank Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {bank.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                          bank.status
                        )}`}
                      >
                        {bank.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {bank.organizationName}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {bank.accountNumber && (
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          <span>Acc: {bank.accountNumber}</span>
                        </div>
                      )}
                      {bank.number && (
                        <div className="flex items-center gap-1">
                          <span>Tel: {bank.number}</span>
                        </div>
                      )}
                      {bank.swiftCode && (
                        <div className="flex items-center gap-1">
                          <span>Swift: {bank.swiftCode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleReorder(bank, "up")}
                        disabled={index === 0}
                        className="p-1 text-gray-600 hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReorder(bank, "down")}
                        disabled={index === bankOptions.length - 1}
                        className="p-1 text-gray-600 hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(bank)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(bank._id, bank.name)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
