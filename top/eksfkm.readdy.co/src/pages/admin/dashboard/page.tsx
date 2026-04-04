import { Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  Building2,
  Sparkles,
  Plus,
  Edit,
} from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { ProtectedRoute } from '../../../components/admin/ProtectedRoute';
import { useDashboardStats } from '../../../hooks/useAdminApi';

export default function AdminDashboard() {
  const { data: stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error || !stats) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-medium mb-2">Error loading dashboard</h3>
              <p className="text-red-600">{error || 'Failed to load dashboard data'}</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const statCards = [
    {
      title: 'Programs',
      value: stats.totalPrograms?.toString() || '0',
      note: 'Active content area',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/admin/programs'
    },
    {
      title: 'Contacts',
      value: stats.totalContacts?.toString() || '0',
      note: 'Stored contact submissions',
      icon: CalendarDays,
      color: 'bg-purple-500',
      link: '/admin'
    },
    {
      title: 'Donations',
      value: stats.totalDonations?.toString() || '0',
      note: 'Donation records',
      icon: Sparkles,
      color: 'bg-red-500',
      link: '/admin'
    },
    {
      title: 'Volunteers',
      value: stats.totalVolunteers?.toString() || '0',
      note: 'Volunteer submissions',
      icon: Building2,
      color: 'bg-yellow-500',
      link: '/admin'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Programs',
      description: 'Create and update program content',
      icon: Plus,
      link: '/admin/programs',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      title: 'Review Dashboard',
      description: 'Check latest system totals and status',
      icon: Edit,
      link: '/admin',
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    }
  ];

  const recentActivity = stats.recentActivity || [];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {statCards.map((stat, index) => (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.note}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className={`block p-4 rounded-lg border border-gray-200 ${action.color} transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm opacity-75">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {recentActivity.length === 0 ? (
                  <div className="p-6 text-sm text-gray-500">
                    No recent activity is available yet.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {recentActivity.map((activity: any) => (
                      <div key={activity.id} className="p-4 flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <BookOpen className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.message}
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}