import { useState, useEffect } from 'react';
import {
  Save,
  AlertCircle,
  BookOpen,
  Users,
  Building2,
} from 'lucide-react';
import { useAdminApi } from '../../hooks/useAdminApi';
import { Program } from '../../services/adminApi';
import Modal from './Modal';

const categoryIcons = {
  education: BookOpen,
  community: Users,
  building: Building2,
};

const getCategoryColorClasses = (category: string, isSelected: boolean) => {
  if (!isSelected) return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50';

  switch (category) {
    case 'education':
      return 'border-teal-500 bg-teal-50 text-teal-700';

    case 'community':
      return 'border-blue-500 bg-blue-50 text-blue-700';
    case 'building':
      return 'border-amber-500 bg-amber-50 text-amber-700';
    default:
      return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
  }
};

interface ProgramFormData {
  title: string;
  description: string;
  category: 'education' | 'community' | 'building';
  impact: string;
  image: string;
}

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId?: string;
  onSuccess: () => void;
}

export default function ProgramModal({
  isOpen,
  onClose,
  programId,
  onSuccess,
}: ProgramModalProps) {
  const { programs: programsApi } = useAdminApi();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<ProgramFormData>({
    title: '',
    description: '',
    category: 'education',
    impact: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (programId) {
        setIsEditing(true);
        fetchProgram();
      } else {
        setIsEditing(false);
        resetForm();
      }
    }
  }, [isOpen, programId]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'education',
      impact: '',
      image: '',
    });
    setErrors({});
    setPreviewMode(false);
  };

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const response = await programsApi.getPrograms();
      const program = response.data?.find((p: Program) => p.id === programId);

      if (program) {
        setFormData({
          title: program.title,
          description: program.description,
          category: program.category as ProgramFormData['category'],
          impact: program.impact,
          image: program.image,
        });
      }
    } catch (error) {
      console.error('Failed to fetch program:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Program title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.impact.trim()) {
      newErrors.impact = 'Impact statement is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Program image is required';
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
      if (isEditing && programId) {
        response = await programsApi.updateProgram(programId, formData);
      } else {
        response = await programsApi.createProgram(formData);
      }

      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save program:', error);
      setErrors({ submit: 'Failed to save program. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Program' : 'Create New Program'}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading program...</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Program' : 'Create New Program'}>
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
              ? 'Update program details and impact information.'
              : 'Add a new educational program to showcase your impact.'}
          </p>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              previewMode
                ? 'bg-teal-100 text-teal-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {previewMode ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formData.title || 'Program Title'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {formData.category && (
                      <>
                        {(() => {
                          const Icon = categoryIcons[formData.category];
                          return <Icon className="h-3 w-3 text-gray-500" />;
                        })()}
                        <span className="text-sm text-gray-500 capitalize">
                          {formData.category}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                {formData.description || 'Program description will appear here...'}
              </p>

              <div className="text-xs text-teal-600 font-medium">
                {formData.impact || 'Impact statement will appear here...'}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., School Lunch Program"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe the program, its goals, and who it serves..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Statement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="impact"
                    rows={3}
                    value={formData.impact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, impact: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                      errors.impact ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Providing daily nutritious meals to 500+ students"
                  />
                  {errors.impact && <p className="mt-1 text-sm text-red-600">{errors.impact}</p>}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(categoryIcons).map(([key, Icon]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            category: key as ProgramFormData['category'],
                          }))
                        }
                        className={`flex items-center gap-2 p-3 border rounded-md text-sm font-medium transition-colors ${getCategoryColorClasses(
                          key,
                          formData.category === key
                        )}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">{key}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Program Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleImageChange(e.target.value)}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="/images/programs/example.jpg or https://..."
                  />
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}

                  {formData.image && (
                    <div className="mt-3">
                      <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={formData.image}
                          alt="Program preview"
                          className="w-full h-40 object-cover"
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

                <div className="bg-teal-50 border border-teal-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium text-teal-800">Program Guidelines</span>
                  </div>
                  <ul className="text-xs text-teal-700 space-y-1">
                    <li>• Focus on measurable impact</li>
                    <li>• Keep the description clear and specific</li>
                    <li>• Use a real image URL for now</li>
                    <li>• Match the category to the program focus</li>
                    <li>• Highlight who benefits from the program</li>
                  </ul>
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Program' : 'Create Program'}
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