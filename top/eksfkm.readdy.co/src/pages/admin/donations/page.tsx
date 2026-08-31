import AdminLayout from '../../../components/admin/AdminLayout.tsx';

export default function AdminDonations() {
  return (
    <AdminLayout>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Donations Management</h1>
            <p className="mt-2 text-sm text-gray-700">
              Track donations, manage donor information, and generate financial reports.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Donation Management</h3>
            <p className="text-gray-600">This section will allow you to:</p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
              <li>• View all donation records</li>
              <li>• Track donation campaigns and goals</li>
              <li>• Manage donor information</li>
              <li>• Generate financial reports and receipts</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
