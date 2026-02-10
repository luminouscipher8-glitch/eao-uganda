import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard,
  BookOpen,
  Newspaper,
  MessageSquare,
  Heart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Search,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Programs & Events',
      href: '/admin/programs',
      icon: BookOpen,
      current: location.pathname.startsWith('/admin/programs')
    },
    {
      name: 'News & Updates',
      href: '/admin/news',
      icon: Newspaper,
      current: location.pathname.startsWith('/admin/news')
    },
    {
      name: 'Contact Messages',
      href: '/admin/contacts',
      icon: MessageSquare,
      current: location.pathname.startsWith('/admin/contacts')
    },
    {
      name: 'Donations',
      href: '/admin/donations',
      icon: Heart,
      current: location.pathname.startsWith('/admin/donations')
    },
    {
      name: 'Volunteers',
      href: '/admin/volunteers',
      icon: Users,
      current: location.pathname.startsWith('/admin/volunteers')
    }
  ];

  const secondaryNavigation = [
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.startsWith('/admin/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-1024.png"
                alt="EAO Admin"
                className="w-8 h-8"
              />
              <div>
                <div className="text-lg font-bold text-gray-900">EAO Admin</div>
                <div className="text-xs text-gray-600">Management Panel</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${item.current
                      ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      ${item.current ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="px-3 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  System
                </h3>
              </div>
              <div className="space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${item.current
                        ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 h-5 w-5 flex-shrink-0
                        ${item.current ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@eao.ug</p>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="mr-3 h-4 w-4 text-gray-400" />
                View Website
              </Link>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200">
          {/* Breadcrumb and status row */}
          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-sm">
                <Link to="/admin" className="text-gray-500 hover:text-gray-700">Admin</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">
                  {location.pathname === '/admin' ? 'Dashboard' : 
                   location.pathname.includes('/admin/programs') ? 'Programs & Events' :
                   location.pathname.includes('/admin/news') ? 'News & Updates' :
                   location.pathname.includes('/admin/contacts') ? 'Contact Messages' :
                   location.pathname.includes('/admin/donations') ? 'Donations' :
                   location.pathname.includes('/admin/volunteers') ? 'Volunteers' :
                   'Dashboard'}
                </span>
              </nav>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Last sync: 2 min ago</span>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                  Live
                </button>
              </div>
            </div>
          </div>

          {/* Main header with search and actions */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Educate an Orphan Uganda Management</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quick stats */}
                <div className="hidden md:flex items-center gap-6 pr-6 border-r border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">156</div>
                    <div className="text-xs text-gray-500">Messages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">$45K</div>
                    <div className="text-xs text-gray-500">Donations</div>
                  </div>
                </div>

                {/* Search */}
                <div className="hidden md:flex relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search programs, news, contacts..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm shadow-sm">
                    + Add Content
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="px-6 pb-3">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-md text-sm font-medium border border-teal-200">
                Overview
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                Analytics
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                Reports
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
