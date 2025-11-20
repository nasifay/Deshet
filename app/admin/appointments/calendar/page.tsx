"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Calendar as CalendarIcon } from "lucide-react";
import CalendarView from "~/components/admin/CalendarView";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();
  const [view, setView] = useState<"daily" | "weekly">("daily");

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
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Calendar</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage appointments in calendar format
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView("daily")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              view === "daily"
                ? "bg-primary-green text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              view === "weekly"
                ? "bg-primary-green text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span>Weekly</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <CalendarView
        view={view}
        onAppointmentClick={(appointment) => {
          router.push(`/admin/appointments/${appointment.id}`);
        }}
      />
    </div>
  );
}


