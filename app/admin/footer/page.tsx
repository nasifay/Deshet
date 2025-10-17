"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  Upload,
  FileText,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
}

interface FooterData {
  socialLinks: SocialLink[];
  whatsappNumber: string;
  termsAndConditions: {
    fileUrl: string;
    fileName: string;
  };
  privacyPolicy: {
    fileUrl: string;
    fileName: string;
  };
  contactInfo: {
    email: string;
    address: string;
    phone: string;
  };
  keyFunders: Array<{ name: string }>;
  networks: Array<{ name: string }>;
}

const SOCIAL_PLATFORMS = [
  { value: "Facebook", icon: "Facebook", label: "Facebook" },
  { value: "Instagram", icon: "Instagram", label: "Instagram" },
  { value: "TikTok", icon: "Music4", label: "TikTok" },
  { value: "LinkedIn", icon: "Linkedin", label: "LinkedIn" },
  { value: "Twitter", icon: "Twitter", label: "Twitter" },
  { value: "YouTube", icon: "Youtube", label: "YouTube" },
];

export default function FooterAdminPage() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch("/api/admin/footer");
      const result = await response.json();

      if (result.success) {
        setFooterData(result.data);
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!footerData) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(footerData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Footer settings saved successfully!");
      } else {
        alert("Error saving footer settings: " + result.error);
      }
    } catch (error) {
      console.error("Error saving footer data:", error);
      alert("Error saving footer settings");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, type: "terms" | "policy") => {
    setUploading(type);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (type === "terms") {
          setFooterData((prev) =>
            prev
              ? {
                  ...prev,
                  termsAndConditions: {
                    fileUrl: result.data.url,
                    fileName: file.name,
                  },
                }
              : null
          );
        } else {
          setFooterData((prev) =>
            prev
              ? {
                  ...prev,
                  privacyPolicy: {
                    fileUrl: result.data.url,
                    fileName: file.name,
                  },
                }
              : null
          );
        }
      } else {
        alert("Error uploading file: " + result.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploading(null);
    }
  };

  const addSocialLink = () => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: [
              ...prev.socialLinks,
              {
                platform: "Facebook",
                url: "",
                icon: "Facebook",
                isActive: true,
              },
            ],
          }
        : null
    );
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: any
  ) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: prev.socialLinks.map((link, i) =>
              i === index ? { ...link, [field]: value } : link
            ),
          }
        : null
    );
  };

  const removeSocialLink = (index: number) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index),
          }
        : null
    );
  };

  const addFunder = () => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            keyFunders: [...prev.keyFunders, { name: "" }],
          }
        : null
    );
  };

  const updateFunder = (index: number, name: string) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            keyFunders: prev.keyFunders.map((funder, i) =>
              i === index ? { name } : funder
            ),
          }
        : null
    );
  };

  const removeFunder = (index: number) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            keyFunders: prev.keyFunders.filter((_, i) => i !== index),
          }
        : null
    );
  };

  const addNetwork = () => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            networks: [...prev.networks, { name: "" }],
          }
        : null
    );
  };

  const updateNetwork = (index: number, name: string) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            networks: prev.networks.map((network, i) =>
              i === index ? { name } : network
            ),
          }
        : null
    );
  };

  const removeNetwork = (index: number) => {
    setFooterData((prev) =>
      prev
        ? {
            ...prev,
            networks: prev.networks.filter((_, i) => i !== index),
          }
        : null
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading footer settings...</div>
      </div>
    );
  }

  if (!footerData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Failed to load footer settings
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Footer Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage footer links, contact information, and legal documents
        </p>
      </div>

      {/* Social Media Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Social Media Links
          </h2>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        <div className="space-y-4">
          {footerData.socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  value={link.platform}
                  onChange={(e) =>
                    updateSocialLink(index, "platform", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    updateSocialLink(index, "url", e.target.value)
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={link.isActive}
                    onChange={(e) =>
                      updateSocialLink(index, "isActive", e.target.checked)
                    }
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Active
                  </span>
                </label>
                <button
                  onClick={() => removeSocialLink(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={footerData.whatsappNumber}
              onChange={(e) => {
                if (!footerData) return;
                setFooterData({
                  ...footerData,
                  whatsappNumber: e.target.value,
                });
              }}
              placeholder="+251..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={footerData.contactInfo.email}
              onChange={(e) => {
                if (!footerData) return;
                setFooterData({
                  ...footerData,
                  contactInfo: {
                    ...footerData.contactInfo,
                    email: e.target.value,
                  },
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Address
            </label>
            <textarea
              value={footerData.contactInfo.address}
              onChange={(e) => {
                if (!footerData) return;
                setFooterData({
                  ...footerData,
                  contactInfo: {
                    ...footerData.contactInfo,
                    address: e.target.value,
                  },
                });
              }}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Legal Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Terms and Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Terms and Conditions
            </label>
            <div className="space-y-2">
              {footerData.termsAndConditions.fileUrl && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {footerData.termsAndConditions.fileName}
                  </span>
                  <a
                    href={footerData.termsAndConditions.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-green hover:underline text-sm"
                  >
                    View
                  </a>
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "terms");
                }}
                disabled={uploading === "terms"}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {uploading === "terms" && (
                <div className="text-sm text-gray-500">Uploading...</div>
              )}
            </div>
          </div>

          {/* Privacy Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Privacy Policy
            </label>
            <div className="space-y-2">
              {footerData.privacyPolicy.fileUrl && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {footerData.privacyPolicy.fileName}
                  </span>
                  <a
                    href={footerData.privacyPolicy.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-green hover:underline text-sm"
                  >
                    View
                  </a>
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "policy");
                }}
                disabled={uploading === "policy"}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {uploading === "policy" && (
                <div className="text-sm text-gray-500">Uploading...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Funders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Key Funders
          </h2>
          <button
            onClick={addFunder}
            className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Funder
          </button>
        </div>

        <div className="space-y-3">
          {footerData.keyFunders.map((funder, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={funder.name}
                onChange={(e) => updateFunder(index, e.target.value)}
                placeholder="Funder name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => removeFunder(index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Networks & Memberships */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Networks & Memberships
          </h2>
          <button
            onClick={addNetwork}
            className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Network
          </button>
        </div>

        <div className="space-y-3">
          {footerData.networks.map((network, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={network.name}
                onChange={(e) => updateNetwork(index, e.target.value)}
                placeholder="Network name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => removeNetwork(index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
