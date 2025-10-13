'use client';

import { useEffect, useState } from 'react';
import { FileText, Newspaper, Images, Users, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  pages: number;
  news: number;
  programs: number;
  media: number;
  users: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pages: 0,
    news: 0,
    programs: 0,
    media: 0,
    users: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Pages',
      value: stats.pages,
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-blue-500',
      link: '/admin/pages',
    },
    {
      title: 'News & Events',
      value: stats.news,
      icon: <Newspaper className="w-8 h-8" />,
      color: 'bg-green-500',
      link: '/admin/news',
    },
    {
      title: 'Programs',
      value: stats.programs,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-purple-500',
      link: '/admin/programs',
    },
    {
      title: 'Media Files',
      value: stats.media,
      icon: <Images className="w-8 h-8" />,
      color: 'bg-orange-500',
      link: '/admin/media',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-pink-500',
      link: '/admin/users',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: <Eye className="w-8 h-8" />,
      color: 'bg-indigo-500',
      link: '/admin/analytics',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Welcome to TSD Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your website content, users, and analytics from here.
        </p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
          >
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/news/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Newspaper className="w-5 h-5" />
            <span>New Post</span>
          </Link>
          <Link
            href="/admin/pages/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>New Page</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Images className="w-5 h-5" />
            <span>Upload Media</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No recent activity to display
            </p>
          )}
        </div>
      </div>
    </div>
  );
}








