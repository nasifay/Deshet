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
  CalendarDays,
  ExternalLink,
} from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  healthConcern: string;
  requestCallback: boolean;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  confirmedBy?: {
    name: string;
    email: string;
  };
  confirmedAt?: string;
  appointmentId?: {
    _id: string;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
  };
  appointment?: {
    _id: string;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
    assignedTo?: {
      name: string;
      email: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "pending" | "confirmed" | "completed" | "cancelled"
  >("pending");
  const [showAppointmentNotification, setShowAppointmentNotification] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [params.id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/bookings/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setBooking(data.data);
        setNotes(data.data.notes || "");
        setStatus(data.data.status);
      } else {
        alert("Failed to load booking");
        router.push("/admin/bookings");
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      alert("Failed to load booking");
      router.push("/admin/bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/bookings/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      const data = await response.json();
      if (data.success) {
        // Show notification if appointment was created
        if (status === "confirmed" && data.data.appointment) {
          setShowAppointmentNotification(true);
          setTimeout(() => setShowAppointmentNotification(false), 10000);
          toast.success("Booking confirmed and appointment created successfully!", {
            description: "An appointment has been automatically created from this booking.",
            duration: 5000,
          });
        } else if (data.warning) {
          // Show warning if appointment creation failed
          toast.warning(data.warning, {
            description: "Booking was confirmed but appointment needs to be created manually.",
            duration: 5000,
          });
        } else {
          toast.success("Booking updated successfully!");
        }
        fetchBooking();
      } else {
        toast.error(data.error || "Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking");
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      confirmed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5" />;
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          Booking not found
        </p>
        <Link
          href="/admin/bookings"
          className="mt-4 inline-block text-primary-green hover:underline"
        >
          Back to Bookings
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
            href="/admin/bookings"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Booking Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage appointment booking
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
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
                <p className="text-gray-900 dark:text-white">{booking.name}</p>
              </div>
              {booking.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {booking.email}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                <p className="text-gray-900 dark:text-white">
                  {booking.phone}
                </p>
              </div>
              {booking.requestCallback && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Callback Request
                  </label>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded">
                    Callback Requested
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Notification */}
          {showAppointmentNotification && booking.appointment && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-green-900 dark:text-green-300">
                  Appointment Created Successfully!
                </h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                An appointment has been automatically created from this booking.
              </p>
              <Link
                href={`/admin/appointments/${booking.appointment._id}`}
                className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <CalendarDays className="w-4 h-4" />
                <span>View Appointment</span>
              </Link>
            </div>
          )}

          {/* Linked Appointment */}
          {(booking.appointmentId || booking.appointment) && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <CalendarDays className="w-5 h-5" />
                <span>Linked Appointment</span>
              </h2>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {booking.appointment?.patientName || booking.appointmentId?.patientName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatDate(
                        booking.appointment?.appointmentDate ||
                          booking.appointmentId?.appointmentDate ||
                          ""
                      )}{" "}
                      at{" "}
                      {booking.appointment?.appointmentTime ||
                        booking.appointmentId?.appointmentTime}
                    </p>
                    {booking.appointment?.assignedTo && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Assigned to: {booking.appointment.assignedTo.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        booking.appointment?.status === "scheduled"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : booking.appointment?.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : booking.appointment?.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {booking.appointment?.status || booking.appointmentId?.status || "scheduled"}
                    </span>
                    <Link
                      href={`/admin/appointments/${
                        booking.appointment?._id || booking.appointmentId?._id
                      }`}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Appointment</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appointment Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Booking Details</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Preferred Date</span>
                </label>
                <p className="text-gray-900 dark:text-white">
                  {formatDate(booking.preferredDate)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Preferred Time</span>
                </label>
                <p className="text-gray-900 dark:text-white">
                  {booking.preferredTime}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Type
                </label>
                <p className="text-gray-900 dark:text-white">
                  {booking.serviceType}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Health Concern</span>
                </label>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {booking.healthConcern}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Status
            </h2>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "pending"
                    | "confirmed"
                    | "completed"
                    | "cancelled"
                )
              }
              className={`w-full px-4 py-2 text-sm font-semibold rounded-lg border-0 focus:ring-2 focus:ring-primary-green ${getStatusBadge(
                status
              )}`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {booking.confirmedBy && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Confirmed by: {booking.confirmedBy.name}
                </p>
                {booking.confirmedAt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    On: {formatDateTime(booking.confirmedAt)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Admin Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              placeholder="Add internal notes about this booking..."
            />
          </div>

          {/* Booking Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Booking Information
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Created:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(booking.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Last Updated:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatDateTime(booking.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


