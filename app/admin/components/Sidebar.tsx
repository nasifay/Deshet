"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Images,
  FolderKanban,
  Users,
  BarChart3,
  Settings,
  X,
  Heart,
  MapPin,
  Home,
  MessageSquare,
  Building2,
  UsersRound,
  Handshake,
  Link as LinkIcon,
  Clock,
  Quote,
  Calendar,
  CalendarDays,
  Bell,
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  roles?: string[]; // If specified, only show for these roles
}

interface SidebarProps {
  isOpen: boolean;
  mobileMenuOpen: boolean;
  onClose: () => void;
  userRole: string;
}

export default function Sidebar({
  isOpen,
  mobileMenuOpen,
  onClose,
  userRole,
}: SidebarProps) {
  const pathname = usePathname();
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

  useEffect(() => {
    // Fetch pending bookings count for notification badge
    const fetchPendingBookings = async () => {
      try {
        const response = await fetch("/api/admin/bookings?status=pending&limit=1");
        const data = await response.json();
        if (data.success) {
          // Get total count
          const countResponse = await fetch("/api/admin/bookings?status=pending&limit=1000");
          const countData = await countResponse.json();
          if (countData.success) {
            setPendingBookingsCount(countData.data.length);
          }
        }
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchPendingBookings();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor", "viewer"], // Exclude nurse from dashboard
    },
    {
      title: "Landing Page",
      url: "/admin/landing",
      icon: <Home className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor"],
    },
    {
      title: "History",
      url: "/admin/history",
      icon: <Clock className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor"],
    },
    {
      title: "Pages",
      url: "/admin/pages",
      icon: <FileText className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor"],
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: <Newspaper className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor"],
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: <FolderKanban className="w-5 h-5" />,
      roles: ["superadmin", "admin", "editor"],
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: <Calendar className="w-5 h-5" />,
      // Available to all roles including nurse
    },
    {
      title: "Appointments",
      url: "/admin/appointments",
      icon: <CalendarDays className="w-5 h-5" />,
      // Available to all roles including nurse
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: <Images className="w-5 h-5" />,
    },
    {
      title: "Contacts",
      url: "/admin/contacts",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Leadership",
      url: "/admin/leadership",
      icon: <UsersRound className="w-5 h-5" />,
    },
    {
      title: "Supporters & Funders",
      url: "/admin/supporters",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: <Quote className="w-5 h-5" />,
    },
    {
      title: "Footer",
      url: "/admin/footer",
      icon: <LinkIcon className="w-5 h-5" />,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      roles: ["admin", "superadmin"],
    },
    // {
    //   title: "Analytics",
    //   url: "/admin/analytics",
    //   icon: <BarChart3 className="w-5 h-5" />,
    // },
    {
      title: "Map Configuration",
      url: "/admin/map-configuration",
      icon: <MapPin className="w-5 h-5" />,
      roles: ["admin", "superadmin"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) => {
    // Nurse role only sees Bookings and Appointments
    if (userRole === 'nurse') {
      return item.url === '/admin/bookings' || item.url === '/admin/appointments';
    }
    // For other roles, use the roles array if specified
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });

  const isActive = (url: string) => {
    if (url === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(url);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 hidden lg:block ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-black">DIMC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-800 dark:text-white">
                  Deshet
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Admin
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-black">D</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-200/30 dark:[&::-webkit-scrollbar-track]:bg-gray-700/30 [&::-webkit-scrollbar-thumb]:bg-gray-400/60 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/80">
          {filteredMenuItems.map((item) => {
            const showBadge = item.url === "/admin/bookings" && pendingBookingsCount > 0;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors relative ${
                  isActive(item.url)
                    ? "bg-primary-green text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={isOpen ? "" : item.title}
              >
                <div className="relative">
                  {item.icon}
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingBookingsCount > 9 ? "9+" : pendingBookingsCount}
                    </span>
                  )}
                </div>
                {isOpen && (
                  <span className="text-sm font-medium flex-1">{item.title}</span>
                )}
                {isOpen && showBadge && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {pendingBookingsCount > 9 ? "9+" : pendingBookingsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-50 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-black">DIMC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-gray-800 dark:text-white">
                Deshet
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-200/30 dark:[&::-webkit-scrollbar-track]:bg-gray-700/30 [&::-webkit-scrollbar-thumb]:bg-gray-400/60 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/80">
          {filteredMenuItems.map((item) => {
            const showBadge = item.url === "/admin/bookings" && pendingBookingsCount > 0;
            return (
              <Link
                key={item.url}
                href={item.url}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors relative ${
                  isActive(item.url)
                    ? "bg-primary-green text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingBookingsCount > 9 ? "9+" : pendingBookingsCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium flex-1">{item.title}</span>
                {showBadge && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {pendingBookingsCount > 9 ? "9+" : pendingBookingsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
