import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export interface UploadOptions {
  folder?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  contentType: string;
  fileName: string;
}

class UploadService {
  private readonly defaultOptions: UploadOptions = {
    folder: 'uploads',
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  };

  /**
   * Upload file to Supabase Storage
   */
  async uploadFile(
    file: Buffer, 
    fileName: string, 
    contentType: string, 
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    const opts = { ...this.defaultOptions, ...options };

    // Validate file size
    if (file.length > (opts.maxSize || this.defaultOptions.maxSize!)) {
      throw new Error(`File size exceeds maximum allowed size of ${opts.maxSize} bytes`);
    }

    // Validate file type
    if (opts.allowedTypes && !opts.allowedTypes.includes(contentType)) {
      throw new Error(`File type ${contentType} is not allowed`);
    }

    // Generate unique file name
    const uniqueFileName = this.generateUniqueFileName(fileName, opts.folder);
    
    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('eao-uploads')
        .upload(uniqueFileName, file, {
          contentType,
          upsert: false
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
  .from('eao-uploads')
  .getPublicUrl(data.path);

const publicUrl = publicUrlData.publicUrl;

return {
  url: publicUrl,
  path: data.path,
  size: file.length,
  contentType,
  fileName: data.path.split('/').pop() || fileName
};

} catch (error: unknown) {
  console.error('Upload service error:', error);

  if (error instanceof Error) {
    throw new Error(`Upload service error: ${error.message}`);
  }

  throw new Error('Upload service error: Unknown error');
}
  }

  /**
   * Delete file from Supabase Storage
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('eao-uploads')
        .remove([path]);

      if (error) {
        console.error('Supabase storage delete error:', error);
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Delete service error:', error);
      throw error;
    }
  }

  /**
   * Generate unique file name with folder structure
   */
  private generateUniqueFileName(originalName: string, folder?: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const baseName = originalName.split('.').slice(0, -1).join('.');
    
    const sanitizedBaseName = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const uniqueName = `${sanitizedBaseName}-${timestamp}-${random}.${extension}`;
    
    return folder ? `${folder}/${uniqueName}` : uniqueName;
  }

  /**
   * Get file info from Supabase Storage
   */
  async getFileInfo(path: string): Promise<{ size: number; contentType: string } | null> {
  try {
    const { data, error } = await supabase.storage
      .from('eao-uploads')
      .createSignedUrl(path, 1);

    if (error) {
      throw error;
    }

    // Note: Supabase doesn't provide direct file metadata without downloading
    // This would require storing metadata in a separate table
    return null;
  } catch (error) {
    console.error('Get file info error:', error);
    return null;
  }
}

  /**
   * Validate file before upload
   */
  validateFile(file: Buffer, fileName: string, contentType: string, options: UploadOptions = {}): void {
    const opts = { ...this.defaultOptions, ...options };

    // Check file size
    if (file.length > (opts.maxSize || this.defaultOptions.maxSize!)) {
      throw new Error(`File size exceeds maximum allowed size of ${opts.maxSize} bytes`);
    }

    // Check file type
    if (opts.allowedTypes && !opts.allowedTypes.includes(contentType)) {
      throw new Error(`File type ${contentType} is not allowed. Allowed types: ${opts.allowedTypes.join(', ')}`);
    }

    // Check file name
    if (!fileName || fileName.length === 0) {
      throw new Error('File name is required');
    }

    // Check for potentially dangerous file extensions
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
    const extension = fileName.toLowerCase().split('.').pop();
    if (extension && dangerousExtensions.includes(`.${extension}`)) {
      throw new Error(`File extension .${extension} is not allowed for security reasons`);
    }
  }
}

export const uploadService = new UploadService();
