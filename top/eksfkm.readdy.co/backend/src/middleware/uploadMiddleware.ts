import { Request, Response, NextFunction } from 'express';
import { uploadService } from '../services/uploadService.js';

export interface FileUploadRequest extends Request {
  file?: Express.Multer.File;
  uploadResult?: unknown;
}

/**
 * Middleware to handle file uploads
 * This would typically use multer, but for now provides the structure
 */
export const handleFileUpload = (options: {
  maxSize?: number;
  allowedTypes?: string[];
  folder?: string;
}) => {
  return async (
    req: FileUploadRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'No file provided'
        });
        return;
      }

      uploadService.validateFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        options
      );

      const uploadOptions = {
        folder: options.folder ?? 'uploads',
        ...(options.maxSize !== undefined && { maxSize: options.maxSize }),
        ...(options.allowedTypes !== undefined && {
          allowedTypes: options.allowedTypes
        })
      };

      const uploadResult = await uploadService.uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        uploadOptions
      );

      req.uploadResult = uploadResult;
      next();
      return;
    } catch (error) {
      console.error('Upload middleware error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'File upload failed'
      });
      return;
    }
  };
};

/**
 * Validation middleware for upload parameters
 */
export const validateUploadParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { folder } = req.body;

  if (folder && typeof folder !== 'string') {
    res.status(400).json({
      success: false,
      error: 'Folder must be a string'
    });
    return;
  }

  const allowedFolders = [
    'uploads',
    'images',
    'documents',
    'news',
    'success-stories',
    'school-buildings',
    'events',
    'programs',
    'volunteers',
    'reports'
  ];

  if (folder && !allowedFolders.includes(folder)) {
    res.status(400).json({
      success: false,
      error: `Folder not allowed. Allowed folders: ${allowedFolders.join(', ')}`
    });
    return;
  }

  next();
};