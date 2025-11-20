"use client";

import { useEffect, useState } from "react";
import { FileText, Newspaper, Images, Users, TrendingUp, Calendar, CalendarDays, Package, AlertCircle } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  pages: number;
  blog: number;
  services: number;
  bookings: number;
  appointments: number;
  pendingBookings: number;
  todayAppointments: number;
  upcomingAppointments: number;
  products: number;
  media: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pages: 0,
    blog: 0,
    services: 0,
    bookings: 0,
    appointments: 0,
    pendingBookings: 0,
    todayAppointments: 0,
    upcomingAppointments: 0,
    products: 0,
    media: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards: Array<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    link: string;
    badge?: number;
  }> = [
    {
      title: "Total Pages",
      value: stats.pages,
      icon: <FileText className="w-8 h-8" />,
      color: "bg-blue-500",
      link: "/admin/pages",
    },
    {
      title: "Blog Posts",
      value: stats.blog,
      icon: <Newspaper className="w-8 h-8" />,
      color: "bg-green-500",
      link: "/admin/blog",
    },
    {
      title: "Services",
      value: stats.services,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-purple-500",
      link: "/admin/services",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: <Calendar className="w-8 h-8" />,
      color: "bg-teal-500",
      link: "/admin/bookings",
      badge: stats.pendingBookings > 0 ? stats.pendingBookings : undefined,
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: <CalendarDays className="w-8 h-8" />,
      color: "bg-blue-500",
      link: "/admin/appointments",
      badge: stats.todayAppointments > 0 ? stats.todayAppointments : undefined,
    },
    {
      title: "Products",
      value: stats.products,
      icon: <Package className="w-8 h-8" />,
      color: "bg-indigo-500",
      link: "/admin/products",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: <Images className="w-8 h-8" />,
      color: "bg-orange-500",
      link: "/admin/media",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <Users className="w-8 h-8" />,
      color: "bg-pink-500",
      link: "/admin/users",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Welcome to Deshet Medical Center Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your medical center content, bookings, products, and services from here.
        </p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 group relative"
          >
            {card.badge && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {card.badge}
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {loading ? (
                    <span className="inline-block w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                  ) : (
                    card.value
                  )}
                </p>
                {card.badge && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {card.title === "Bookings" ? "Pending" : "Today"}
                  </p>
                )}
              </div>
              <div
                className={`${card.color} text-white p-4 rounded-lg group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats for Appointments */}
      {!loading && (stats.todayAppointments > 0 || stats.upcomingAppointments > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Appointment Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Appointments</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {stats.todayAppointments}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400">
                {stats.upcomingAppointments}
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Bookings</p>
              <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400">
                {stats.pendingBookings}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Newspaper className="w-5 h-5" />
            <span>New Blog Post</span>
          </Link>
          <Link
            href="/admin/services/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            <span>New Service</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            <span>New Product</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Images className="w-5 h-5" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
