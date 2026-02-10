import { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  X, 
  AlertCircle,
  Building,
  Target
} from 'lucide-react';
import { useAdminApi } from '../../hooks/useAdminApi';
import { SchoolBuilding, SchoolBuildingFormData } from '../../services/adminApi';
import Modal from './Modal';

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

export default function SchoolBuildingModal({ isOpen, onClose, buildingId, onSuccess }: SchoolBuildingModalProps) {
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
    target_amount: 0,
    raised_amount: 0,
    currency: 'UGX',
    progress_percentage: 0,
    image: '',
    is_featured: false,
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
      target_amount: 0,
      raised_amount: 0,
      currency: 'UGX',
      progress_percentage: 0,
      image: '',
      is_featured: false,
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
          target_amount: building.target_amount,
          raised_amount: building.raised_amount,
          currency: building.currency,
          progress_percentage: building.progress_percentage,
          image: building.image,
          is_featured: building.is_featured,
        });
        setImagePreview(building.image);
      }
    } catch (error) {
      console.error('Failed to fetch building:', error);
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
    
    if (!formData.image.trim()) {
      newErrors.image = 'Phase image is required';
    }
    
    if ((formData.target_amount ?? 0) <= 0) {
      newErrors.target_amount = 'Target amount must be greater than 0';
    }
    
    if ((formData.raised_amount ?? 0) < 0) {
      newErrors.raised_amount = 'Raised amount cannot be negative';
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ image: 'Image size must be less than 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev: SchoolBuildingFormData) => ({ ...prev, image: result }));
        setErrors((prev: Record<string, string>) => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData((prev: SchoolBuildingFormData) => ({ ...prev, image: '' }));
  };

  const progressPercentage = formData.target_amount > 0 
    ? ((formData.raised_amount || 0) / formData.target_amount) * 100 
    : 0;

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Building Phase' : 'Create New Building Phase'}>
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Building Phase' : 'Create New Building Phase'} size="xl">
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
              ? 'Update building phase details and fundraising progress.'
              : 'Add a new building phase to track construction progress and fundraising goals.'
            }
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
          /* Preview Mode */
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
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
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColorClasses(formData.status || 'pending')}`}>
                  {statusLabels[formData.status as keyof typeof statusLabels]}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                {formData.description || 'Phase description will appear here...'}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  {formData.currency} {(formData.raised_amount ?? 0)?.toLocaleString()} / {(formData.target_amount ?? 0)?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Phase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, title: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Classroom Block A"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phase" className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phase"
                      value={formData.phase}
                      onChange={(e) => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, phase: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.phase ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Foundation"
                    />
                    {errors.phase && (
                      <p className="mt-1 text-sm text-red-600">{errors.phase}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, description: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe the building phase, its purpose, and what it includes..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                {/* Target and Raised Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="target_amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount ({formData.currency}) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="target_amount"
                      min="0"
                      step="0.01"
                      value={formData.target_amount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setFormData((prev: SchoolBuildingFormData) => ({ 
                          ...prev, 
                          target_amount: isNaN(value) ? 0 : value 
                        }));
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.target_amount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.target_amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.target_amount}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="raised_amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Raised Amount ({formData.currency})
                    </label>
                    <input
                      type="number"
                      id="raised_amount"
                      min="0"
                      step="0.01"
                      value={formData.raised_amount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setFormData((prev: SchoolBuildingFormData) => ({ 
                          ...prev, 
                          raised_amount: isNaN(value) ? 0 : value 
                        }));
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm ${
                        errors.raised_amount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.raised_amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.raised_amount}</p>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <label htmlFor="progress_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                    Progress Percentage
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      id="progress_percentage"
                      min="0"
                      max="100"
                      value={formData.progress_percentage}
                      onChange={(e) => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, progress_percentage: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">0%</span>
                      <span className="font-medium text-amber-600">{formData.progress_percentage}%</span>
                      <span className="text-gray-600">100%</span>
                    </div>
                    {errors.progress_percentage && (
                      <p className="mt-1 text-sm text-red-600">{errors.progress_percentage}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, status: e.target.value as any }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phase Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Phase preview"
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors relative">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-sm text-red-600">{errors.image}</p>
                    )}
                  </div>
                </div>

                {/* Featured Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Phase
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((prev: SchoolBuildingFormData) => ({ ...prev, is_featured: !prev.is_featured }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.is_featured
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    } border`}
                  >
                    <Target className="h-4 w-4" />
                    {formData.is_featured ? 'Featured' : 'Not Featured'}
                  </button>
                </div>

                {/* Guidelines */}
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Phase Guidelines</span>
                  </div>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Set realistic fundraising targets</li>
                    <li>• Update progress regularly</li>
                    <li>• Include clear descriptions</li>
                    <li>• Use high-quality images</li>
                    <li>• Track milestones carefully</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
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
