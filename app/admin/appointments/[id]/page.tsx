"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Plus,
  CalendarDays,
} from "lucide-react";
import PatientLookup from "~/components/admin/PatientLookup";

interface Appointment {
  _id: string;
  patientName: string;
  phone: string;
  email?: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  healthConcern: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  notes?: string;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  bookingId?: {
    _id: string;
    name: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
  };
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface PatientHistory {
  appointments: any[];
  bookings: any[];
}

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [patientHistory, setPatientHistory] = useState<PatientHistory | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    status: "scheduled" as Appointment["status"],
    notes: "",
  });

  useEffect(() => {
    fetchAppointment();
  }, [params.id]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/appointments/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setAppointment(data.data);
        setFormData({
          appointmentDate: data.data.appointmentDate.split("T")[0],
          appointmentTime: data.data.appointmentTime,
          status: data.data.status,
          notes: data.data.notes || "",
        });
        fetchPatientHistory(data.data.phone);
      } else {
        alert("Failed to load appointment");
        router.push("/admin/appointments");
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
      alert("Failed to load appointment");
      router.push("/admin/appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientHistory = async (phone: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/search?phone=${encodeURIComponent(phone)}`);
      const data = await response.json();
      if (data.success) {
        setPatientHistory({
          appointments: data.data.appointments || [],
          bookings: data.data.bookings || [],
        });
      }
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/appointments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Appointment updated successfully!");
        fetchAppointment();
      } else {
        if (data.conflict) {
          toast.error(
            `Time slot conflict: ${data.conflict.patientName} already has an appointment at ${data.conflict.time}`,
            { duration: 6000 }
          );
        } else {
          toast.error(data.error || "Failed to update appointment");
        }
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment");
    } finally {
      setSaving(false);
    }
  };

  const handleReschedule = async () => {
    if (!appointment) return;

    try {
      setSaving(true);
      // Mark current as completed
      await fetch(`/api/admin/appointments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });

      // Create new appointment
      const newAppointmentDate = new Date(formData.appointmentDate);
      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: appointment.patientName,
          phone: appointment.phone,
          email: appointment.email,
          appointmentDate: newAppointmentDate.toISOString(),
          appointmentTime: formData.appointmentTime,
          serviceType: appointment.serviceType,
          healthConcern: appointment.healthConcern,
          status: "scheduled",
          bookingId: appointment.bookingId?._id,
          notes: `Rescheduled from ${appointment.appointmentDate}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Appointment rescheduled successfully! Redirecting to new appointment...");
        setTimeout(() => {
          router.push(`/admin/appointments/${data.data._id}`);
        }, 1000);
      } else {
        toast.error(data.error || "Failed to reschedule appointment");
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule appointment");
    } finally {
      setSaving(false);
      setShowReschedule(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      scheduled:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "in-progress":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      "no-show":
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
    return colors[status as keyof typeof colors] || colors.scheduled;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Appointment not found</p>
        <Link
          href="/admin/appointments"
          className="mt-4 inline-block text-primary-green hover:underline"
        >
          Back to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/appointments"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Appointment Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage appointment information
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowReschedule(!showReschedule)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reschedule</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Patient Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">{appointment.patientName}</p>
              </div>
              {appointment.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <p className="text-gray-900 dark:text-white">{appointment.email}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                <p className="text-gray-900 dark:text-white">{appointment.phone}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Appointment Details</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Appointment Date</span>
                </label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    setFormData({ ...formData, appointmentDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Appointment Time</span>
                </label>
                <input
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    setFormData({ ...formData, appointmentTime: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Type
                </label>
                <p className="text-gray-900 dark:text-white">{appointment.serviceType}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Health Concern</span>
                </label>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {appointment.healthConcern}
                </p>
              </div>
            </div>
          </div>

          {/* Reschedule Form - Option 1: Complete & Reschedule */}
          {showReschedule && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow p-6 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Reschedule Appointment
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This will mark the current appointment as completed and create a new appointment with the new date/time. This preserves complete appointment history.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>New Appointment Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      setFormData({ ...formData, appointmentDate: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>New Appointment Time *</span>
                  </label>
                  <input
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      setFormData({ ...formData, appointmentTime: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <strong>What happens:</strong>
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Current appointment will be marked as "completed"</li>
                  <li>A new appointment will be created with the new date/time</li>
                  <li>All patient information and service details will be copied</li>
                  <li>You'll be redirected to the new appointment page</li>
                  <li>Original appointment history is preserved</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReschedule}
                  disabled={saving || !formData.appointmentDate || !formData.appointmentTime}
                  className="flex-1 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Rescheduling...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-5 h-5" />
                      <span>Complete & Reschedule</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowReschedule(false)}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Linked Booking */}
          {appointment.bookingId && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Linked Booking
              </h2>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {appointment.bookingId.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(appointment.bookingId.preferredDate)} at{" "}
                      {appointment.bookingId.preferredTime}
                    </p>
                  </div>
                  <Link
                    href={`/admin/bookings/${appointment.bookingId._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Booking
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Status</h2>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Appointment["status"],
                })
              }
              className={`w-full px-4 py-2 text-sm font-semibold rounded-lg border-0 focus:ring-2 focus:ring-primary-green ${getStatusBadge(
                formData.status
              )}`}
            >
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
            {appointment.completedAt && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed: {formatDateTime(appointment.completedAt)}
                </p>
              </div>
            )}
            {appointment.cancelledAt && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cancelled: {formatDateTime(appointment.cancelledAt)}
                </p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notes</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Add notes about this appointment..."
            />
          </div>

          {/* Assigned To */}
          {appointment.assignedTo && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Assigned To
              </h2>
              <p className="text-gray-900 dark:text-white">{appointment.assignedTo.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {appointment.assignedTo.email}
              </p>
            </div>
          )}

          {/* Appointment Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Appointment Information
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(appointment.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(appointment.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient History Sidebar */}
      {patientHistory && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Patient History
          </h2>
          <PatientLookup
            onCreateAppointment={(phone) => {
              router.push(`/admin/appointments/new?phone=${encodeURIComponent(phone)}`);
            }}
          />
        </div>
      )}
    </div>
  );
}

