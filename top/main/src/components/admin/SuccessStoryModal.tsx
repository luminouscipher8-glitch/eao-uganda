import { useState, useEffect } from 'react';
import {
  Save,
  AlertCircle,
  Award,
  Star,
  BookOpen,
  Heart,
  Users
} from 'lucide-react';
import { useAdminApi } from '../../hooks/useAdminApi.js';
import { SuccessStory, SuccessStoryFormData } from '../../services/adminApi.tsx';
import Modal from './Modal.tsx';

const categoryIcons = {
  education: BookOpen,
  community: Heart,
  volunteer: Users,
};

const getCategoryColorClasses = (category: string, isSelected: boolean) => {
  if (!isSelected) return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50';

  switch (category) {
    case 'education':
      return 'border-teal-500 bg-teal-50 text-teal-700';
    case 'community':
      return 'border-blue-500 bg-blue-50 text-blue-700';
    case 'volunteer':
      return 'border-purple-500 bg-purple-50 text-purple-700';
    default:
      return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
  }
};

interface SuccessStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId?: string;
  onSuccess: () => void;
}

export default function SuccessStoryModal({
  isOpen,
  onClose,
  storyId,
  onSuccess
}: SuccessStoryModalProps) {
  const { successStories: successStoriesApi } = useAdminApi();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<SuccessStoryFormData>({
    student_name: '',
    age: 0,
    story: '',
    impact: '',
    category: 'education',
    image: '',
    is_featured: false,
    status: 'draft',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (storyId) {
        setIsEditing(true);
        fetchStory();
      } else {
        setIsEditing(false);
        resetForm();
      }
    }
  }, [isOpen, storyId]);

  const resetForm = () => {
    setFormData({
      student_name: '',
      age: 0,
      story: '',
      impact: '',
      category: 'education',
      image: '',
      is_featured: false,
      status: 'draft',
    });
    setImagePreview('');
    setErrors({});
    setPreviewMode(false);
  };

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await successStoriesApi.getSuccessStories();
      const story = response.data?.find((s: SuccessStory) => s.id === storyId);

      if (story) {
        setFormData({
          student_name: story.student_name,
          age: story.age,
          story: story.story,
          impact: story.impact,
          category: story.category,
          image: story.image || '',
          is_featured: story.is_featured,
          status: story.status,
        });
        setImagePreview(story.image || '');
      }
    } catch (error) {
      console.error('Failed to fetch story:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.student_name.trim()) {
      newErrors.student_name = 'Student name is required';
    }

    if (formData.age < 5 || formData.age > 25) {
      newErrors.age = 'Age must be between 5 and 25';
    }

    if (!formData.story.trim()) {
      newErrors.story = 'Student story is required';
    }

    if (!formData.impact.trim()) {
      newErrors.impact = 'Impact statement is required';
    }

    if (!(formData.image || '').trim()) {
      newErrors.image = 'Student photo is required';
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
      if (isEditing && storyId) {
        response = await successStoriesApi.updateSuccessStory(storyId, formData);
      } else {
        response = await successStoriesApi.createSuccessStory(formData);
      }

      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save success story:', error);
      setErrors({ submit: 'Failed to save success story. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (url: string) => {
    setImagePreview(url);
    setFormData((prev: SuccessStoryFormData) => ({ ...prev, image: url }));
    setErrors((prev: Record<string, string>) => ({ ...prev, image: '' }));
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData((prev: SuccessStoryFormData) => ({ ...prev, image: '' }));
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Success Story' : 'Create New Success Story'}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading success story...</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Success Story' : 'Create New Success Story'}>
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
              ? 'Update student story and impact information.'
              : 'Share an inspiring story of student achievement and transformation.'}
          </p>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              previewMode
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {previewMode ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="aspect-square relative overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={formData.student_name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Award className="h-12 w-12 text-gray-400" />
                </div>
              )}

              {formData.is_featured && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    <Star className="inline h-3 w-3 mr-1" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {formData.student_name || 'Student Name'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Age {formData.age || 0}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                      {formData.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                {formData.story || 'Student story will appear here...'}
              </p>

              <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                <h4 className="font-medium text-purple-900 mb-2">Impact</h4>
                <p className="text-sm text-purple-800">
                  {formData.impact || 'Impact statement will appear here...'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="student_name"
                      value={formData.student_name}
                      onChange={(e) => setFormData((prev: SuccessStoryFormData) => ({ ...prev, student_name: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                        errors.student_name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Amina Nakato"
                    />
                    {errors.student_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.student_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      min="5"
                      max="25"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData((prev: SuccessStoryFormData) => ({
                          ...prev,
                          age: parseInt(e.target.value, 10) || 0,
                        }))
                      }
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                        errors.age ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 14"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                    Student Story <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="story"
                    rows={6}
                    value={formData.story}
                    onChange={(e) => setFormData((prev: SuccessStoryFormData) => ({ ...prev, story: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                      errors.story ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Share the student's personal journey, challenges overcome, and achievements..."
                  />
                  {errors.story && (
                    <p className="mt-1 text-sm text-red-600">{errors.story}</p>
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
                    onChange={(e) => setFormData((prev: SuccessStoryFormData) => ({ ...prev, impact: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                      errors.impact ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Top student in her class for 3 consecutive years"
                  />
                  {errors.impact && (
                    <p className="mt-1 text-sm text-red-600">{errors.impact}</p>
                  )}
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
                          setFormData((prev: SuccessStoryFormData) => ({
                            ...prev,
                            category: key as any,
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
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev: SuccessStoryFormData) => ({
                        ...prev,
                        status: e.target.value as any,
                      }))
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Student Photo URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => handleImageChange(e.target.value)}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="/images/success-stories/example.jpg or https://..."
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}

                  {imagePreview && (
                    <div className="mt-3">
                      <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Student preview"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Story
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev: SuccessStoryFormData) => ({
                        ...prev,
                        is_featured: !prev.is_featured,
                      }))
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.is_featured
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    } border`}
                  >
                    <Star className="h-4 w-4" />
                    {formData.is_featured ? 'Featured' : 'Not Featured'}
                  </button>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Story Guidelines</span>
                  </div>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• Focus on transformation and growth</li>
                    <li>• Include specific achievements</li>
                    <li>• Keep stories authentic and respectful</li>
                    <li>• Use a real image URL for now</li>
                    <li>• Ensure consent before sharing</li>
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Story' : 'Create Story'}
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