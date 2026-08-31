import AdminLayout from '../../../components/admin/AdminLayout.tsx';

export default function AdminContacts() {
  return (
    <AdminLayout>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and respond to contact form submissions from website visitors.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Management</h3>
            <p className="text-gray-600">This section will allow you to:</p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <li>• View all contact form submissions</li>
              <li>• Mark messages as read/unread</li>
              <li>• Respond to inquiries directly</li>
              <li>• Export contact data for analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
