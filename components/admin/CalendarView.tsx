"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  MoreVertical,
  CheckSquare,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  healthConcern: string;
  status: string;
  notes?: string;
  assignedTo?: { name: string; email: string };
  bookingId?: string;
}

interface CalendarViewProps {
  view: "daily" | "weekly";
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  onAppointmentClick?: (appointment: Appointment) => void;
}

export default function CalendarView({
  view,
  initialDate,
  onDateChange,
  onAppointmentClick,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    scheduled: 0,
    inProgress: 0,
    completed: 0,
    noShow: 0,
  });
  const [selectedAppointments, setSelectedAppointments] = useState<Set<string>>(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate, view]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/calendar?view=${view}`;

      if (view === "daily") {
        const dateStr = currentDate.toISOString().split("T")[0];
        url += `&date=${dateStr}`;
      } else {
        const startOfWeek = getStartOfWeek(currentDate);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        url += `&startDate=${startOfWeek.toISOString().split("T")[0]}&endDate=${endOfWeek.toISOString().split("T")[0]}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAppointments(data.data.appointments || []);
        setStats(data.data.stats || stats);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (view === "daily") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: "bg-blue-500",
      "in-progress": "bg-yellow-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500",
      "no-show": "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const toggleAppointmentSelection = (appointmentId: string) => {
    setSelectedAppointments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(appointmentId)) {
        newSet.delete(appointmentId);
      } else {
        newSet.add(appointmentId);
      }
      return newSet;
    });
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedAppointments.size === 0) {
      toast.error("Please select at least one appointment");
      return;
    }

    try {
      setBulkUpdating(true);
      const response = await fetch("/api/admin/appointments/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentIds: Array.from(selectedAppointments),
          status: newStatus,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Successfully updated ${data.data.updatedCount} appointment(s) to ${newStatus}`);
        setSelectedAppointments(new Set());
        fetchAppointments();
      } else {
        toast.error(data.error || "Failed to update appointments");
      }
    } catch (error) {
      console.error("Error bulk updating appointments:", error);
      toast.error("Failed to update appointments");
    } finally {
      setBulkUpdating(false);
    }
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const getAppointmentsForSlot = (date: Date, time: string) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      const aptTime = apt.appointmentTime;
      return (
        aptDate.toDateString() === date.toDateString() &&
        aptTime.includes(time.substring(0, 2))
      );
    });
  };

  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {view === "daily"
                  ? currentDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : `${getStartOfWeek(currentDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} - ${new Date(
                      getStartOfWeek(currentDate).getTime() + 6 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
              </h2>
            </div>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentDate(new Date());
                onDateChange?.(new Date());
              }}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {selectedAppointments.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAppointments.size} selected
                </span>
                <select
                  onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                  disabled={bulkUpdating}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  defaultValue=""
                >
                  <option value="" disabled>Bulk Update Status</option>
                  <option value="scheduled">Mark as Scheduled</option>
                  <option value="in-progress">Mark as In Progress</option>
                  <option value="completed">Mark as Completed</option>
                  <option value="cancelled">Mark as Cancelled</option>
                  <option value="no-show">Mark as No Show</option>
                </select>
                <button
                  onClick={() => setSelectedAppointments(new Set())}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total: <span className="font-bold text-gray-900 dark:text-white">{stats.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats.scheduled}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400">
            {stats.inProgress}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-black text-green-600 dark:text-green-400">
            {stats.completed}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">No Show</p>
          <p className="text-2xl font-black text-gray-600 dark:text-gray-400">{stats.noShow}</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {view === "daily" ? (
          <DailyView
            date={currentDate}
            appointments={appointments}
            getStatusColor={getStatusColor}
            onAppointmentClick={onAppointmentClick}
          />
        ) : (
          <WeeklyView
            startDate={getStartOfWeek(currentDate)}
            appointments={appointments}
            getStatusColor={getStatusColor}
            onAppointmentClick={onAppointmentClick}
          />
        )}
      </div>
    </div>
  );
}

function DailyView({
  date,
  appointments,
  getStatusColor,
  onAppointmentClick,
}: {
  date: Date;
  appointments: Appointment[];
  getStatusColor: (status: string) => string;
  onAppointmentClick?: (appointment: Appointment) => void;
}) {
  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  const getAppointmentsForTime = (time: string) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      return (
        aptDate.toDateString() === date.toDateString() &&
        apt.appointmentTime.includes(time.substring(0, 2))
      );
    });
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {timeSlots.map((time) => {
        const slotAppointments = getAppointmentsForTime(time);
        return (
          <div key={time} className="grid grid-cols-12 gap-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="col-span-2 text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
              {time}
            </div>
            <div className="col-span-10 space-y-2">
              {slotAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={`p-2 rounded-lg cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                    apt.status
                  )} bg-opacity-90 text-white ${selectedAppointments.has(apt.id) ? 'ring-2 ring-white ring-offset-2' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.has(apt.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleAppointmentSelection(apt.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded"
                      />
                      <div className="flex-1" onClick={() => onAppointmentClick?.(apt)}>
                        <p className="font-medium text-sm">{apt.patientName}</p>
                        <p className="text-xs opacity-90">{apt.serviceType}</p>
                      </div>
                    </div>
                    <Link
                      href={`/admin/appointments/${apt.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeeklyView({
  startDate,
  appointments,
  getStatusColor,
  onAppointmentClick,
}: {
  startDate: Date;
  appointments: Appointment[];
  getStatusColor: (status: string) => string;
  onAppointmentClick?: (appointment: Appointment) => void;
}) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  const getAppointmentsForDayAndTime = (date: Date, time: string) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      return (
        aptDate.toDateString() === date.toDateString() &&
        apt.appointmentTime.includes(time.substring(0, 2))
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {/* Day Headers */}
        <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
          <div className="p-2 font-medium text-gray-600 dark:text-gray-400">Time</div>
          {days.map((day) => (
            <div key={day.toISOString()} className="p-2 text-center border-l border-gray-200 dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-white">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{day.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 text-sm text-gray-600 dark:text-gray-400">{time}</div>
            {days.map((day) => {
              const dayAppointments = getAppointmentsForDayAndTime(day, time);
              return (
                <div
                  key={`${day.toISOString()}-${time}`}
                  className="p-1 border-l border-gray-200 dark:border-gray-700 min-h-[60px] space-y-1"
                >
                  {dayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`p-1 rounded text-xs cursor-pointer hover:shadow-md transition-all ${getStatusColor(
                        apt.status
                      )} bg-opacity-90 text-white ${selectedAppointments.has(apt.id) ? 'ring-2 ring-white' : ''}`}
                    >
                      <div className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={selectedAppointments.has(apt.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleAppointmentSelection(apt.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-3 h-3 rounded"
                        />
                        <div className="flex-1" onClick={() => onAppointmentClick?.(apt)}>
                          <p className="font-medium truncate">{apt.patientName}</p>
                          <p className="opacity-90 truncate">{apt.appointmentTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

