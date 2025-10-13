"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, FolderKanban } from "lucide-react";

interface Program {
  _id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryLabel: string;
  status: "draft" | "published" | "archived";
  order: number;
  createdAt: string;
}

export default function ProgramsListPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, [categoryFilter]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(categoryFilter && { categoryId: categoryFilter }),
      });

      const response = await fetch(`/api/admin/programs?${params}`);
      const data = await response.json();

      if (data.success) {
        setPrograms(data.data);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchPrograms();
      } else {
        alert(data.error || "Failed to delete program");
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      published:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      archived: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  // Group programs by category
  const groupedPrograms = programs.reduce(
    (acc: Record<string, typeof programs>, program) => {
      if (!acc[program.categoryLabel]) {
        acc[program.categoryLabel] = [];
      }
      acc[program.categoryLabel].push(program);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Programs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your programs by category
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Program</span>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <FolderKanban className="w-5 h-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
          >
            <option value="">All Categories</option>
            <option value="youth-empowerment">
              Youth Empowerment & Peacebuilding
            </option>
            <option value="srh-gender">SRH & Gender Development</option>
            <option value="climate-justice">
              Climate Justice & Livelihoods
            </option>
          </select>
        </div>
      </div>

      {/* Programs by Category */}
      <div className="space-y-6">
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading programs...
            </p>
          </div>
        ) : programs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No programs found
            </p>
            <Link
              href="/admin/programs/new"
              className="inline-block mt-4 text-primary-green hover:underline"
            >
              Create your first program
            </Link>
          </div>
        ) : (
          Object.keys(groupedPrograms).map((categoryLabel) => (
            <div
              key={categoryLabel}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {categoryLabel}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {groupedPrograms[categoryLabel].map((program: Program) => (
                      <tr
                        key={program._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {program.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {program.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                              program.status
                            )}`}
                          >
                            {program.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {program.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(program.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/admin/programs/${program._id}/edit`}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(program._id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
