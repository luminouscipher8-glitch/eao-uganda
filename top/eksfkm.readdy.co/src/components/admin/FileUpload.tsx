import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '../../contexts/AuthContext.tsx';

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

export default function FileUpload({
  label,
  value,
  onChange,
  onRemove,
  folder = 'uploads',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ''
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileType = file.type;
    const isAllowed = allowedTypes.some(type => {
      if (type === 'image/*') {
        return fileType.startsWith('image/');
      }
      return fileType === type;
    });

    if (!isAllowed) {
      setError('File type not allowed');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const session = await supabase.auth.getSession();
      const token = session?.data.session?.access_token;

      if (!token) {
        setError('Authentication required. Please log in.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData
        },
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.data.url);
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    setError('');
  };

  const getFileNameFromUrl = (url: string) => {
    return url.split('/').pop() || '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {value ? (
        <div className="relative">
          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 truncate">
                {getFileNameFromUrl(value)}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((maxSize / (1024 * 1024)) * 10) / 10}MB max
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 text-red-600 hover:text-red-800 transition-colors"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={`Upload ${label.toLowerCase()}`}
          />
          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 border-t-transparent"></div>
              <span className="mt-2 text-sm text-gray-600">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                {accept === 'image/*' ? 'PNG, JPG, GIF, WebP' : 'Allowed file types'}
              </p>
              <p className="text-xs text-gray-500">
                Max {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </>
          )}
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
