"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Home,
  MessageSquare,
  Building2,
  UsersRound,
  Handshake,
  Link as LinkIcon,
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

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Landing Page",
      url: "/admin/landing",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Pages",
      url: "/admin/pages",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "News & Events",
      url: "/admin/news",
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      title: "Programs",
      url: "/admin/programs",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: <Images className="w-5 h-5" />,
    },
    {
      title: "Volunteers",
      url: "/admin/volunteers",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Contacts",
      url: "/admin/contacts",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Bank Options",
      url: "/admin/bank-options",
      icon: <Building2 className="w-5 h-5" />,
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
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
      roles: ["admin", "superadmin"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) => {
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
                <span className="text-white text-xl font-black">TSD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-800 dark:text-white">
                  TSD
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Admin
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-black">T</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.url)
                  ? "bg-primary-green text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title={isOpen ? "" : item.title}
            >
              {item.icon}
              {isOpen && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          ))}
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
              <span className="text-white text-xl font-black">TSD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-gray-800 dark:text-white">
                TSD
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
        <nav className="p-3 space-y-1">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.url)
                  ? "bg-primary-green text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
