"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  Award,
  Heart,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  Save,
  Trash2,
} from "lucide-react";

interface Volunteer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  location: string;
  occupation?: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience?: string;
  motivation: string;
  referenceSource: string;
  document?: string;
  status: "pending" | "reviewed" | "approved" | "rejected" | "contacted";
  notes?: string;
  reviewedBy?: {
    name: string;
    email: string;
  };
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function VolunteerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      fetchVolunteer();
    }
  }, [id]);

  const fetchVolunteer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/volunteers/${id}`);
      const data = await response.json();

      if (data.success) {
        setVolunteer(data.data);
        setNewStatus(data.data.status);
        setNotes(data.data.notes || "");
      } else {
        alert(data.error || "Failed to fetch volunteer details");
        router.push("/admin/volunteers");
      }
    } catch (error) {
      console.error("Error fetching volunteer:", error);
      alert("Failed to fetch volunteer details");
      router.push("/admin/volunteers");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!volunteer) return;

    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/volunteers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          notes: notes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setVolunteer(data.data);
        alert("Volunteer application updated successfully");
      } else {
        alert(data.error || "Failed to update volunteer");
      }
    } catch (error) {
      console.error("Error updating volunteer:", error);
      alert("Failed to update volunteer");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!volunteer) return;

    const confirmed = confirm(
      `Are you sure you want to delete the application from ${volunteer.fullName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/volunteers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Volunteer application deleted successfully");
        router.push("/admin/volunteers");
      } else {
        alert(data.error || "Failed to delete volunteer");
      }
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      alert("Failed to delete volunteer");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      contacted:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-5 h-5" />,
      reviewed: <Eye className="w-5 h-5" />,
      approved: <CheckCircle className="w-5 h-5" />,
      rejected: <XCircle className="w-5 h-5" />,
      contacted: <UserCheck className="w-5 h-5" />,
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading volunteer details...
          </p>
        </div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Volunteer not found
          </p>
          <Link
            href="/admin/volunteers"
            className="mt-4 inline-block text-primary-green hover:underline"
          >
            Back to Volunteers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/volunteers"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Volunteer Application
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and manage volunteer application
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-[0.5] disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {volunteer.fullName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <a
                  href={`mailto:${volunteer.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {volunteer.email}
                </a>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <a
                  href={`tel:${volunteer.phone}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {volunteer.phone}
                </a>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <p className="text-gray-900 dark:text-white">
                  {volunteer.location}
                </p>
              </div>
              {volunteer.age && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Age
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {volunteer.age} years old
                  </p>
                </div>
              )}
              {volunteer.gender && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gender
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {volunteer.gender.replace("-", " ")}
                  </p>
                </div>
              )}
              {volunteer.occupation && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Occupation
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {volunteer.occupation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Skills & Interests
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {volunteer.skills.length > 0 ? (
                    volunteer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No skills listed
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {volunteer.interests.length > 0 ? (
                    volunteer.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No interests listed
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Availability
                </label>
                <p className="text-gray-900 dark:text-white capitalize">
                  {volunteer.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Motivation & Experience */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Motivation & Experience
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Why do you want to volunteer?
                </label>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {volunteer.motivation}
                </p>
              </div>
              {volunteer.experience && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                    Previous Volunteer Experience
                  </label>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {volunteer.experience}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  How did you hear about us?
                </label>
                <p className="text-gray-900 dark:text-white">
                  {volunteer.referenceSource}
                </p>
              </div>
            </div>
          </div>

          {/* Document */}
          {volunteer.document && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Attached Document
              </h2>
              <div className="space-y-4">
                <a
                  href={volunteer.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Open in New Tab
                </a>

                {/* PDF Preview */}
                {volunteer.document.toLowerCase().endsWith(".pdf") ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      src={volunteer.document}
                      className="w-full h-[600px]"
                      title="Document Preview"
                    />
                  </div>
                ) : (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {volunteer.document.split("/").pop()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Click &quot;Open in New Tab&quot; to view this file
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Application Status
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Current Status
                </label>
                <div
                  className={`px-3 py-2 inline-flex items-center gap-2 rounded-lg ${getStatusBadge(
                    volunteer.status
                  )}`}
                >
                  {getStatusIcon(volunteer.status)}
                  <span className="font-semibold capitalize">
                    {volunteer.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Update Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="contacted">Contacted</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Admin Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this application..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-[0.5] disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Timeline
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Applied
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(volunteer.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {volunteer.reviewedAt && volunteer.reviewedBy && (
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Reviewed by {volunteer.reviewedBy.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(volunteer.reviewedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {volunteer.updatedAt !== volunteer.createdAt && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Last Updated
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(volunteer.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
