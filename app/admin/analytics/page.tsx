'use client';

import { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

// Types
interface OverviewMetrics {
  totalUsers: number;
  totalSessions: number;
  totalPageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  sessionsPerUser: number;
}

interface TrafficSource {
  source: string;
  sessions: number;
}

interface TopPage {
  title: string;
  path: string;
  views: number;
  avgDuration: number;
  bounceRate: number;
}

interface GeographicData {
  country: string;
  users: number;
  sessions: number;
}

interface DeviceData {
  device: string;
  users: number;
}

interface DailyTrend {
  date: string;
  users: number;
  sessions: number;
  pageViews: number;
}

interface AnalyticsData {
  overview: OverviewMetrics;
  trafficSources: TrafficSource[];
  topPages: TopPage[];
  geographic: GeographicData[];
  devices: DeviceData[];
  dailyTrend: DailyTrend[];
}

type DateRange = '7daysAgo' | '30daysAgo' | '90daysAgo';

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: '7daysAgo', label: 'Last 7 Days' },
  { value: '30daysAgo', label: 'Last 30 Days' },
  { value: '90daysAgo', label: 'Last 90 Days' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>('30daysAgo');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(`/api/admin/analytics/overview?range=${dateRange}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to fetch analytics');
      }

      setData(result.data);
    } catch (err: any) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getDeviceIcon = (device: string) => {
    const deviceLower = device.toLowerCase();
    if (deviceLower.includes('mobile')) return <Smartphone className="w-5 h-5" />;
    if (deviceLower.includes('tablet')) return <Tablet className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track website performance and user engagement
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">
                Google Analytics Configuration Error
              </h2>
              <p className="text-red-800 dark:text-red-300 mb-4">{error}</p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                    Required Environment Variables:
                  </h3>
                  <pre className="p-3 bg-red-100 dark:bg-red-950 rounded text-xs overflow-x-auto text-red-900 dark:text-red-100">
{`GA4_PROPERTY_ID=your_property_id
GA4_CLIENT_EMAIL=service_account@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                    Quick Setup Steps:
                  </h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-800 dark:text-red-300">
                    <li>Go to Google Cloud Console</li>
                    <li>Enable Google Analytics Data API</li>
                    <li>Create a service account and download JSON credentials</li>
                    <li>Add the service account email to your GA4 property (Viewer role)</li>
                    <li>Add the credentials to your .env.local file</li>
                    <li>Restart your development server</li>
                  </ol>
                </div>

                <button
                  onClick={() => fetchAnalytics()}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Connection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Format daily trend data for charts
  const chartData = data.dailyTrend.map((day) => ({
    date: format(parseISO(day.date.slice(0, 4) + '-' + day.date.slice(4, 6) + '-' + day.date.slice(6, 8)), 'MMM dd'),
    users: day.users,
    sessions: day.sessions,
    pageViews: day.pageViews,
  }));

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time insights from Google Analytics 4
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="bg-transparent text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
            >
              {DATE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 text-gray-700 dark:text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium bg-white/20 px-2 py-1 rounded">
              <ArrowUp className="w-4 h-4" />
              <span>Live</span>
            </div>
          </div>
          <p className="text-sm text-blue-100 mb-1">Total Users</p>
          <p className="text-3xl font-black">{formatNumber(data.overview.totalUsers)}</p>
          <p className="text-xs text-blue-100 mt-2">
            {formatNumber(data.overview.sessionsPerUser)} sessions per user
          </p>
        </div>

        {/* Page Views */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-green-100 mb-1">Page Views</p>
          <p className="text-3xl font-black">{formatNumber(data.overview.totalPageViews)}</p>
          <p className="text-xs text-green-100 mt-2">
            {formatNumber(data.overview.totalSessions)} sessions
          </p>
        </div>

        {/* Avg. Session Duration */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100 mb-1">Avg. Session</p>
          <p className="text-3xl font-black">{formatDuration(data.overview.avgSessionDuration)}</p>
          <p className="text-xs text-purple-100 mt-2">Per user visit</p>
        </div>

        {/* Bounce Rate */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-orange-100 mb-1">Bounce Rate</p>
          <p className="text-3xl font-black">{formatPercentage(data.overview.bounceRate)}</p>
          <p className="text-xs text-orange-100 mt-2">Single page visits</p>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Traffic Trend</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
            <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} name="Sessions" />
            <Line type="monotone" dataKey="pageViews" stroke="#f59e0b" strokeWidth={2} name="Page Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic Sources & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-green-600" />
            <span>Traffic Sources</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.trafficSources}
                dataKey="sessions"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.source}: ${formatNumber(entry.sessions)}`}
              >
                {data.trafficSources.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-purple-600" />
            <span>Device Breakdown</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.devices}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="device" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages & Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Top Pages</span>
          </h3>
          <div className="space-y-3">
            {data.topPages.slice(0, 8).map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {page.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{page.path}</p>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatNumber(page.views)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">views</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-600" />
            <span>Top Countries</span>
          </h3>
          <div className="space-y-3">
            {data.geographic.map((country, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{country.country}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatNumber(country.users)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">users</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatNumber(country.sessions)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">sessions</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
