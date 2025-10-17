"use client";

import { useEffect, useState } from "react";

import { Plus, Edit, Trash2, Save, X } from "lucide-react";

import ImageUploadField, {
  uploadImageFile,
} from "../components/ImageUploadField";

interface LeadershipMember {
  _id?: string;

  name: string;

  position: string;

  bio?: string;

  photo?: string;

  order: number;

  email?: string;

  phone?: string;

  type: "leadership" | "team_member";
}

export default function LeadershipManagementPage() {
  const [members, setMembers] = useState<LeadershipMember[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState<string | null>(null);

  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(
    null
  );

  const [isAddingNew, setIsAddingNew] = useState(false);

  const [filterType, setFilterType] = useState<
    "all" | "leadership" | "team_member"
  >("all");

  const [formData, setFormData] = useState<LeadershipMember>({
    name: "",

    position: "",

    bio: "",

    photo: "",

    order: 0,

    email: "",

    phone: "",

    type: "leadership",
  });

  const [pendingPhotoFile, setPendingPhotoFile] = useState<File | null>(null);

  // Debug: Log form data changes (remove this after testing)

  useEffect(() => {
    console.log("Form data changed:", formData);
  }, [formData]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/leadership");

      const data = await response.json();

      console.log("API Response:", data);

      if (data.success) {
        setMembers(data.data);
      } else {
        console.error("Failed to fetch members:", data.error);

        alert("⚠️ Failed to load team members. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching leadership members:", error);

      alert(
        "❌ Error loading team members. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: LeadershipMember) => {
    setEditingMember(member);

    setPendingPhotoFile(null);

    setFormData({
      name: member.name || "",

      position: member.position || "",

      bio: member.bio || "",

      photo: member.photo || "",

      order: member.order ?? 0,

      email: member.email || "",

      phone: member.phone || "",

      type: member.type || "leadership",

      _id: member._id,
    });

    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);

    setEditingMember(null);

    setPendingPhotoFile(null);

    setFormData({
      name: "",

      position: "",

      bio: "",

      photo: "",

      order: members.length,

      email: "",

      phone: "",

      type: "leadership",
    });
  };

  const handleCancel = () => {
    setEditingMember(null);

    setIsAddingNew(false);

    setPendingPhotoFile(null);

    setFormData({
      name: "",

      position: "",

      bio: "",

      photo: "",

      order: 0,

      email: "",

      phone: "",

      type: "leadership",
    });
  };

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);

      // Upload the pending photo file first if there is one

      let photoUrl = formData.photo;

      if (pendingPhotoFile) {
        try {
          photoUrl = await uploadImageFile(pendingPhotoFile);

          console.log("Photo uploaded successfully:", photoUrl);
        } catch (error) {
          console.error("Error uploading photo:", error);

          alert("❌ Failed to upload photo. Please try again.");

          setSaving(false);

          return;
        }
      }

      const url = editingMember
        ? `/api/admin/leadership/${editingMember._id}`
        : "/api/admin/leadership";

      const method = editingMember ? "PUT" : "POST";

      // Prepare data to send - ensure type field is always included
      const dataToSend = {
        ...formData,
        photo: photoUrl,
        type: formData.type || "leadership", // Always ensure type has a value
      };

      if (isAddingNew) {
        delete dataToSend._id;
      }

      console.log("Saving member data:", dataToSend);
      console.log("Type field value:", dataToSend.type);

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      console.log("Save response:", data);
      console.log("Saved member type:", data.data?.type);

      if (data.success) {
        alert(
          editingMember
            ? "✅ Member updated successfully!"
            : "✅ Member added successfully!"
        );

        await fetchMembers();

        handleCancel();
      } else {
        alert("❌ " + (data.error || "Failed to save member"));
      }
    } catch (error) {
      console.error("Error saving member:", error);

      alert("❌ Failed to save member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "⚠️ Are you sure you want to delete this member? This action cannot be undone."
      )
    )
      return;

    try {
      setDeleting(id);

      const response = await fetch(`/api/admin/leadership/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Member deleted successfully!");

        await fetchMembers();
      } else {
        alert("❌ " + (data.error || "Failed to delete member"));
      }
    } catch (error) {
      console.error("Error deleting member:", error);

      alert("❌ Failed to delete member. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  // Filter members by type
  const filteredMembers = members.filter((member) =>
    filterType === "all" ? true : member.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Leadership & Team Members
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your organization&apos;s leadership team and staff members
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />

          <span>Add Member</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Filter by:
          </span>
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === "all"
                ? "bg-primary-green text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All ({members.length})
          </button>
          <button
            onClick={() => setFilterType("leadership")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === "leadership"
                ? "bg-primary-green text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Leadership ({members.filter((m) => m.type === "leadership").length})
          </button>
          <button
            onClick={() => setFilterType("team_member")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === "team_member"
                ? "bg-primary-green text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Team Members (
            {members.filter((m) => m.type === "team_member").length})
          </button>
        </div>
      </div>

      {/* Edit/Add Form */}

      {(editingMember || isAddingNew) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-primary-green">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isAddingNew ? "Add New Member" : "Edit Member"}
            </h2>

            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Photo Section */}

            <div className="lg:col-span-1">
              <ImageUploadField
                label="Photo"
                value={formData.photo || ""}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, photo: url }))
                }
                placeholder="Upload member photo..."
                deferUpload={true}
                onFileSelect={(file) => setPendingPhotoFile(file)}
              />

              {/* Circular Preview */}

              {formData.photo && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview
                  </p>

                  <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-primary-green bg-gray-100 dark:bg-gray-600">
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Details */}

            <div className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>

                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position *
                  </label>

                  <input
                    type="text"
                    value={formData.position || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,

                        position: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    placeholder="Executive Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type *
                  </label>

                  <select
                    value={formData.type || "leadership"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as "leadership" | "team_member",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  >
                    <option value="leadership">Leadership</option>
                    <option value="team_member">Team Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,

                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>

                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,

                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    placeholder="+251 911 123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Order
                  </label>

                  <input
                    type="number"
                    value={formData.order ?? 0}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,

                        order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Biography
                </label>

                <textarea
                  value={formData.bio || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                  placeholder="Brief biography or description..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={
                    !formData.name ||
                    !formData.position ||
                    !formData.type ||
                    saving
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>

                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />

                      <span>{isAddingNew ? "Add Member" : "Save Changes"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members List */}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading team members...
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No team members yet
            </p>

            <button
              onClick={handleAddNew}
              className="mt-4 text-primary-green hover:underline"
            >
              Add your first team member
            </button>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No{" "}
              {filterType === "leadership"
                ? "leadership members"
                : "team members"}{" "}
              found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredMembers.map((member) => (
              <div
                key={member._id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {/* Photo */}

                <div className="mb-4">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-green"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 dark:bg-gray-600 border-4 border-gray-400 dark:border-gray-500 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}

                <div className="text-center mb-4">
                  <div className="mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        member.type === "leadership"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {member.type === "leadership"
                        ? "Leadership"
                        : "Team Member"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>

                  <p className="text-sm text-primary-green font-medium mb-2">
                    {member.position}
                  </p>

                  {member.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {member.bio}
                    </p>
                  )}

                  {(member.email || member.phone) && (
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      {member.email && <p>{member.email}</p>}

                      {member.phone && <p>{member.phone}</p>}
                    </div>
                  )}
                </div>

                {/* Actions */}

                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    <Edit className="w-3 h-3" />

                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => member._id && handleDelete(member._id)}
                    disabled={deleting === member._id}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === member._id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>

                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3" />

                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Order Badge */}

                <div className="mt-3 text-center">
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    Order: {member.order}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
