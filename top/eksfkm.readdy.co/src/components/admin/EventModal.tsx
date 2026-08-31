import { useState, useEffect } from 'react';
import {
  Save,
  AlertCircle,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Star,
  DollarSign
} from 'lucide-react';
import { useAdminApi } from '../../hooks/useAdminApi.ts';
import { Event, EventFormData } from '../../services/adminApi.ts';
import Modal from './Modal.tsx';

const statusColors = {
  upcoming: 'yellow',
  ongoing: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const getStatusBadgeClasses = (status: keyof typeof statusColors) => {
  switch (status) {
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800';
    case 'ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const eventTypeIcons = {
  run: Users,
  celebration: Star,
  fundraiser: DollarSign,
  corporate: TrendingUp,
};

type EventTypeIcon = keyof typeof eventTypeIcons;

const EventIcon: React.FC<{ icon: EventTypeIcon }> = ({ icon }) => {
  const Icon = eventTypeIcons[icon];
  
  return <Icon className="h-4 w-4" />;
};

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: string;
  onSuccess: () => void;
}

export default function EventModal({ isOpen, onClose, eventId, onSuccess }: EventModalProps) {
  const { events: eventsApi } = useAdminApi();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    event_type: 'run',
    event_date: '',
    location: '',
    participants: 0,
    funds_raised: 0,
    image: '',
    is_featured: false,
    status: 'upcoming',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (eventId) {
        setIsEditing(true);
        fetchEvent();
      } else {
        setIsEditing(false);
        resetForm();
      }
    }
  }, [isOpen, eventId]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: 'run',
      event_date: '',
      location: '',
      participants: 0,
      funds_raised: 0,
      image: '',
      is_featured: false,
      status: 'upcoming',
    });
    setImagePreview('');
    setErrors({});
    setPreviewMode(false);
  };

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await eventsApi.getEvents();
      const event = response.data?.find((e: Event) => e.id === eventId);
      
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          event_type: event.event_type,
          event_date: event.event_date.split('T')[0],
          location: event.location || '',
          participants: event.participants,
          funds_raised: event.funds_raised,
          image: event.image || '',
          is_featured: event.is_featured,
          status: event.status,
        });
        setImagePreview(event.image || '');
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.event_date) {
      newErrors.event_date = 'Event date is required';
    }
    
    if (!(formData.image || '').trim()) {
      newErrors.image = 'Event image is required';
    }
    
    if ((formData.participants ?? 0) < 0) {
      newErrors.participants = 'Participants must be a positive number';
    }
    
    if ((formData.funds_raised ?? 0) < 0) {
      newErrors.funds_raised = 'Funds raised must be a positive number';
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
      if (isEditing && eventId) {
        response = await eventsApi.updateEvent(eventId, formData);
      } else {
        response = await eventsApi.createEvent(formData);
      }

      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      setErrors({ submit: 'Failed to save event. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

    const handleImageChange = (url: string) => {
    setImagePreview(url);
    setFormData((prev: EventFormData) => ({ ...prev, image: url }));
    setErrors((prev: Record<string, string>) => ({ ...prev, image: '' }));
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData((prev: EventFormData) => ({ ...prev, image: '' }));
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Event' : 'Create New Event'}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Event' : 'Create New Event'}>
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
              ? 'Update event details and fundraising information.'
              : 'Add a new fundraising event to engage community.'
            }
          </p>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              previewMode 
                ? 'bg-blue-100 text-blue-700' 
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
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(
                    formData.status as keyof typeof statusColors
                  )}`}
                >
                  {formData.status}
                </span>
              </div>

              {/* Featured Badge */}
              {formData.is_featured && (
                <div className="absolute top-2 left-2">
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
                  <h3 className="text-lg font-medium text-gray-900">
                    {formData.title || 'Event Title'}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formData.event_date || 'Event date'}
                    </div>
                    {formData.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {formData.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                {formData.description || 'Event description will appear here...'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {(formData.participants ?? 0)} participants
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  UGX {(formData.funds_raised ?? 0)?.toLocaleString()}
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
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev: EventFormData) => ({ ...prev, title: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Educate an Orphan Run 2024"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
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
                    onChange={(e) => setFormData((prev: EventFormData) => ({ ...prev, description: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe the event in detail, including its purpose and what participants can expect..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                {/* Event Date and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="event_date"
                      value={formData.event_date}
                      onChange={(e) => setFormData((prev: EventFormData) => ({ ...prev, event_date: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.event_date ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.event_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.event_date}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev: EventFormData) => ({ ...prev, location: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Kampala, Uganda"
                    />
                  </div>
                </div>

                {/* Participants and Funds */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Participants
                    </label>
                    <input
                      type="number"
                      id="participants"
                      min="0"
                      value={formData.participants}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setFormData((prev: EventFormData) => ({ 
                          ...prev, 
                          participants: isNaN(value) ? 0 : value 
                        }));
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.participants ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.participants && (
                      <p className="mt-1 text-sm text-red-600">{errors.participants}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="funds_raised" className="block text-sm font-medium text-gray-700 mb-2">
                      Funds Raised (UGX)
                    </label>
                    <input
                      type="number"
                      id="funds_raised"
                      min="0"
                      step="0.01"
                      value={formData.funds_raised}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setFormData((prev: EventFormData) => ({ 
                          ...prev, 
                          funds_raised: isNaN(value) ? 0 : value 
                        }));
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.funds_raised ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.funds_raised && (
                      <p className="mt-1 text-sm text-red-600">{errors.funds_raised}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Event Type */}
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(eventTypeIcons).map(([key, _]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData((prev: EventFormData) => ({ ...prev, event_type: key as EventTypeIcon }))}
                        className={`flex items-center gap-2 p-3 border rounded-md text-sm font-medium transition-colors ${
                          formData.event_type === key
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <EventIcon icon={key as EventTypeIcon} />
                        <span className="capitalize">{key}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData((prev: EventFormData) => ({ ...prev, status: e.target.value as any }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => handleImageChange(e.target.value)}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="/images/events/example.jpg or https://..."
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}

                  {imagePreview && (
                    <div className="mt-3">
                      <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Event preview"
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

                {/* Featured Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Event
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((prev: EventFormData) => ({ ...prev, is_featured: !prev.is_featured }))}
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Event' : 'Create Event'}
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
