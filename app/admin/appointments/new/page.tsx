"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save, Calendar, Clock, User, Phone, Mail, FileText } from "lucide-react";
import PatientLookup from "~/components/admin/PatientLookup";

export default function NewAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [patientPhone, setPatientPhone] = useState(searchParams.get("phone") || "");
  const [selectedPatient, setSelectedPatient] = useState<{
    name: string;
    phone: string;
    email?: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
    healthConcern: "",
    notes: "",
    bookingId: "",
  });

  useEffect(() => {
    if (patientPhone) {
      setFormData((prev) => ({ ...prev, phone: patientPhone }));
    }
  }, [patientPhone]);

  const serviceTypes = [
    "Traditional Consultation",
    "Herbal Medicine",
    "Detox Therapy",
    "Diagnostic Techniques",
    "Healing Treatments",
    "General Consultation",
  ];

  const handlePatientSelect = (phone: string, name: string) => {
    setSelectedPatient({ name, phone });
    setFormData((prev) => ({
      ...prev,
      patientName: name,
      phone: phone,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      // Validation
      if (
        !formData.patientName ||
        !formData.phone ||
        !formData.appointmentDate ||
        !formData.appointmentTime ||
        !formData.serviceType ||
        !formData.healthConcern
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      const appointmentDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (appointmentDate < today) {
        toast.error("Appointment date cannot be in the past");
        return;
      }

      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: formData.patientName,
          phone: formData.phone,
          email: formData.email || undefined,
          appointmentDate: appointmentDate.toISOString(),
          appointmentTime: formData.appointmentTime,
          serviceType: formData.serviceType,
          healthConcern: formData.healthConcern,
          status: "scheduled",
          bookingId: formData.bookingId || undefined,
          notes: formData.notes || undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Appointment created successfully!");
        setTimeout(() => {
          router.push(`/admin/appointments/${data.data._id}`);
        }, 1000);
      } else {
        if (data.conflict) {
          toast.error(
            `Time slot conflict: ${data.conflict.patientName} already has an appointment at ${data.conflict.time}`,
            { duration: 6000 }
          );
        } else {
          toast.error(data.error || "Failed to create appointment");
        }
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
    } finally {
      setSaving(false);
    }
  };

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
              Create New Appointment
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create a walk-in appointment or convert from booking
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Lookup */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient Lookup (Optional)
                </label>
                <PatientLookup
                  onSelectPatient={handlePatientSelect}
                  onCreateAppointment={(phone) => {
                    setPatientPhone(phone);
                    setFormData((prev) => ({ ...prev, phone }));
                  }}
                />
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Patient Name *</span>
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email (Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Appointment Date *</span>
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
                    <span>Appointment Time *</span>
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

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Type *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceType: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="">Select a service type</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Health Concern */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Health Concern *</span>
                </label>
                <textarea
                  value={formData.healthConcern}
                  onChange={(e) =>
                    setFormData({ ...formData, healthConcern: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Describe the health concern..."
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Booking ID (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Link to Booking (Optional)
                </label>
                <input
                  type="text"
                  value={formData.bookingId}
                  onChange={(e) =>
                    setFormData({ ...formData, bookingId: e.target.value })
                  }
                  placeholder="Booking ID if converting from booking"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? "Creating..." : "Create Appointment"}</span>
                </button>
                <Link
                  href="/admin/appointments"
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

