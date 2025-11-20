"use client";

import { useState } from "react";
import { Search, Phone, User, Calendar, Clock, Plus } from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  status: string;
  createdAt: string;
}

interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  status: string;
  createdAt: string;
}

interface PatientLookupProps {
  onSelectPatient?: (phone: string, name: string) => void;
  onCreateAppointment?: (phone: string) => void;
}

export default function PatientLookup({
  onSelectPatient,
  onCreateAppointment,
}: PatientLookupProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<{
    patient: { name: string; phone: string; email?: string } | null;
    appointments: Appointment[];
    bookings: Booking[];
    stats: {
      totalAppointments: number;
      totalBookings: number;
      upcomingAppointments: number;
      completedAppointments: number;
    };
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/appointments/search?phone=${encodeURIComponent(phone)}`);
      const data = await response.json();

      if (data.success) {
        setPatientData(data.data);
        if (onSelectPatient && data.data.patient) {
          onSelectPatient(data.data.patient.phone, data.data.patient.name);
        }
      } else {
        setPatientData(null);
        alert(data.error || "No patient found");
      }
    } catch (error) {
      console.error("Error searching patient:", error);
      alert("Failed to search patient");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      "no-show": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
    return colors[status] || colors.scheduled;
  };

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number to search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !phone.trim()}
            className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>{loading ? "Searching..." : "Search"}</span>
          </button>
        </div>
      </form>

      {/* Patient Data */}
      {patientData && (
        <div className="space-y-4">
          {/* Patient Info */}
          {patientData.patient && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Patient Information</span>
                </h3>
                {onCreateAppointment && (
                  <button
                    onClick={() => onCreateAppointment(patientData.patient!.phone)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Appointment</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {patientData.patient.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {patientData.patient.phone}
                  </p>
                </div>
                {patientData.patient.email && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {patientData.patient.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Appointments</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {patientData.stats.totalAppointments}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {patientData.stats.totalBookings}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {patientData.stats.upcomingAppointments}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {patientData.stats.completedAppointments}
              </p>
            </div>
          </div>

          {/* Appointments History */}
          {patientData.appointments.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Appointment History
              </h3>
              <div className="space-y-2">
                {patientData.appointments.map((apt) => (
                  <Link
                    key={apt.id}
                    href={`/admin/appointments/${apt.id}`}
                    className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(apt.appointmentDate)} at {apt.appointmentTime}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {apt.serviceType}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bookings History */}
          {patientData.bookings.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Booking History
              </h3>
              <div className="space-y-2">
                {patientData.bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(booking.preferredDate)} at {booking.preferredTime}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {booking.serviceType}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {patientData.appointments.length === 0 && patientData.bookings.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No appointment or booking history found for this patient.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


