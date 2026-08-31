import AdminLayout from '../../../components/admin/AdminLayout.tsx';

export default function AdminNews() {
  return (
    <AdminLayout>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">News & Updates</h1>
            <p className="mt-2 text-sm text-gray-700">
              Publish news articles, announcements, and organization updates.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Write New Article
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">News Management</h3>
            <p className="text-gray-600">This section will allow you to:</p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <li>• Create and publish news articles</li>
              <li>• Schedule posts for future publication</li>
              <li>• Manage article categories and tags</li>
              <li>• Track article views and engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
