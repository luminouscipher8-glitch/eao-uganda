import { useState, useEffect } from 'react';
import {
  Save,
  AlertCircle,
  Building,
  Calendar,
  Wallet,
} from 'lucide-react';
import { useAdminApi } from '../../hooks/useAdminApi.ts';
import { SchoolBuilding, SchoolBuildingFormData } from '../../services/adminApi.ts';
import Modal from './Modal.tsx';

const getStatusColorClasses = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'delayed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  delayed: 'Delayed',
};

interface SchoolBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId?: string;
  onSuccess: () => void;
}

export default function SchoolBuildingModal({
  isOpen,
  onClose,
  buildingId,
  onSuccess,
}: SchoolBuildingModalProps) {
  const { schoolBuilding: schoolBuildingApi } = useAdminApi();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<SchoolBuildingFormData>({
    title: '',
    description: '',
    phase: '',
    status: 'pending',
    start_date: '',
    end_date: '',
    budget: 0,
    progress: 0,
    image: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (buildingId) {
        setIsEditing(true);
        fetchBuilding();
      } else {
        setIsEditing(false);
        resetForm();
      }
    }
  }, [isOpen, buildingId]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      phase: '',
      status: 'pending',
      start_date: '',
      end_date: '',
      budget: 0,
      progress: 0,
      image: '',
    });
    setImagePreview('');
    setErrors({});
    setPreviewMode(false);
  };

  const fetchBuilding = async () => {
    try {
      setLoading(true);
      const response = await schoolBuildingApi.getSchoolBuilding();
      const building = response.data?.find((b: SchoolBuilding) => b.id === buildingId);

      if (building) {
        setFormData({
          title: building.title,
          description: building.description,
          phase: building.phase,
          status: building.status,
          start_date: building.start_date || '',
          end_date: building.end_date || '',
          budget: building.budget || 0,
          progress: building.progress || 0,
          image: building.image || '',
        });
        setImagePreview(building.image || '');
      }
    } catch (error) {
      console.error('Failed to fetch building phase:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Phase title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.phase.trim()) {
      newErrors.phase = 'Phase name is required';
    }

    if (!(formData.image || '').trim()) {
      newErrors.image = 'Phase image is required';
    }

    if ((formData.budget ?? 0) < 0) {
      newErrors.budget = 'Budget cannot be negative';
    }

    if ((formData.progress ?? 0) < 0 || (formData.progress ?? 0) > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      let response;
      if (isEditing && buildingId) {
        response = await schoolBuildingApi.updateSchoolBuildingPhase(buildingId, formData);
      } else {
        response = await schoolBuildingApi.createSchoolBuildingPhase(formData);
      }

      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save building phase:', error);
      setErrors({ submit: 'Failed to save building phase. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (url: string) => {
    setImagePreview(url);
    setFormData((prev: SchoolBuildingFormData) => ({ ...prev, image: url }));
    setErrors((prev: Record<string, string>) => ({ ...prev, image: '' }));
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData((prev: SchoolBuildingFormData) => ({ ...prev, image: '' }));
  };

  if (loading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditing ? 'Edit Building Phase' : 'Create New Building Phase'}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading building phase...</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Building Phase' : 'Create New Building Phase'}
      size="xl"
    >
      <div className="p-6">
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">{errors.submit}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-700">
            {isEditing
              ? 'Update building phase details and construction progress.'
              : 'Add a new building phase and track its progress.'}
          </p>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              previewMode
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {previewMode ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="bg-gray-100 relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={formData.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Building className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formData.title || 'Phase Title'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                      {formData.phase || 'Phase Name'}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColorClasses(
                    formData.status || 'pending'
                  )}`}
                >
                  {statusLabels[formData.status as keyof typeof statusLabels]}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                {formData.description || 'Phase description will appear here...'}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{formData.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${formData.progress || 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Budget: UGX {Number(formData.budget || 0).toLocaleString()}
                </div>
                {(formData.start_date || formData.end_date) && (
                  <div className="text-xs text-gray-600">
                    {formData.start_date || '—'} to {formData.end_date || '—'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev: SchoolBuildingFormData) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Classroom Block A"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  <div>
                    <label htmlFor="phase" className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phase"
                      value={formData.phase}
                      onChange={(e) =>
                        setFormData((prev: SchoolBuildingFormData) => ({
                          ...prev,
                          phase: e.target.value,
                        }))
                      }
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.phase ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Foundation"
                    />
                    {errors.phase && <p className="mt-1 text-sm text-red-600">{errors.phase}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev: SchoolBuildingFormData) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe the building phase and what it includes..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      value={formData.start_date || ''}
                      onChange={(e) =>
                        setFormData((prev: SchoolBuildingFormData) => ({
                          ...prev,
                          start_date: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      value={formData.end_date || ''}
                      onChange={(e) =>
                        setFormData((prev: SchoolBuildingFormData) => ({
                          ...prev,
                          end_date: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (UGX)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    min="0"
                    step="0.01"
                    value={formData.budget || 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setFormData((prev: SchoolBuildingFormData) => ({
                        ...prev,
                        budget: isNaN(value) ? 0 : value,
                      }));
                    }}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                      errors.budget ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                </div>

                <div>
                  <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-2">
                    Progress
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      id="progress"
                      min="0"
                      max="100"
                      value={formData.progress || 0}
                      onChange={(e) =>
                        setFormData((prev: SchoolBuildingFormData) => ({
                          ...prev,
                          progress: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">0%</span>
                      <span className="font-medium text-amber-600">
                        {formData.progress || 0}%
                      </span>
                      <span className="text-gray-600">100%</span>
                    </div>
                    {errors.progress && (
                      <p className="mt-1 text-sm text-red-600">{errors.progress}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev: SchoolBuildingFormData) => ({
                        ...prev,
                        status: e.target.value as any,
                      }))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Phase Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => handleImageChange(e.target.value)}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="/images/school-building/example.jpg or https://..."
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}

                  {imagePreview && (
                    <div className="mt-3">
                      <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Phase preview"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Phase Guidelines</span>
                  </div>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Keep phase names clear and specific</li>
                    <li>• Use real image URLs for now</li>
                    <li>• Track progress as a percentage</li>
                    <li>• Use budget for current phase cost</li>
                    <li>• Add realistic start and end dates</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">Planning Tips</span>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>Use progress to reflect actual construction completion.</p>
                    <p>Use budget to show the phase allocation, not total campaign amount.</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Budget Note</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    This phase now tracks a single budget value. It does not currently track separate
                    target and raised amounts in the active admin contract.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Phase' : 'Create Phase'}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}