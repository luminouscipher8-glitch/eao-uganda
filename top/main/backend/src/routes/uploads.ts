import { Router, Response } from 'express';
import { ApiResponse } from '../types/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { SupabaseAuth } from '../middleware/supabaseAuth.js';
import { validateUploadParams, handleFileUpload } from '../middleware/uploadMiddleware.js';
import multer from 'multer';
import { uploadService } from '../services/uploadService.js';

const router = Router();

// Apply authentication to all upload routes
router.use(SupabaseAuth.authenticate);
router.use(SupabaseAuth.requireAdmin);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // Only one file at a time
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed`));
    }
  }
});

/**
 * @swagger
 * /api/admin/upload:
 *   post:
 *     summary: Upload file to storage
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folder:
 *                 type: string
 *                 description: Target folder for upload
 *                 enum: [uploads, images, documents, news, success-stories, school-buildings, events, programs, volunteers, reports]
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     path:
 *                       type: string
 *                     size:
 *                       type: number
 *                     contentType:
 *                       type: string
 *                     fileName:
 *                       type: string
 *       400:
 *         description: Validation error or upload failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */

// File upload endpoint
router.post('/', upload.single('file'), validateUploadParams, asyncHandler(async (req: any, res: Response) => {
  try {
    const { folder = 'uploads' } = req.body;
    const file = req.file;

    if (!file) {
      const response: ApiResponse = {
        success: false,
        error: 'No file provided'
      };
      res.status(400).json(response);
      return;
    }

    console.log(`File upload requested for folder: ${folder}`);
    console.log(`File details:`, {
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    // Use the uploadService to upload file to Supabase Storage
    const uploadResult = await uploadService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      {
        folder,
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
      }
    );

    const response: ApiResponse = {
      success: true,
      data: uploadResult
    };

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error('Upload error:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file'
    };
    res.status(500).json(response);
    return;
  }
}));

/**
 * @swagger
 * /api/admin/upload/delete:
 *   delete:
 *     summary: Delete uploaded file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - path
 *             properties:
 *               path:
 *                 type: string
 *                 description: File path in storage
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       400:
 *         description: Invalid path or deletion failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */

// Delete file endpoint
router.delete('/delete', asyncHandler(async (req: any, res: Response) => {
  try {
    const { path } = req.body;

    if (!path || typeof path !== 'string') {
      const response: ApiResponse = {
        success: false,
        error: 'File path is required'
      };
      return res.status(400).json(response);
    }

    // Validate path to prevent directory traversal
    if (path.includes('..') || path.startsWith('/')) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid file path'
      };
      return res.status(400).json(response);
    }

    console.log(`File deletion requested for path: ${path}`);

    // Use uploadService to delete file from Supabase Storage
    await uploadService.deleteFile(path);

    const response: ApiResponse = {
      success: true,
      message: 'File deleted successfully'
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Delete error:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file'
    };
    return res.status(500).json(response);
  }
}));

/**
 * @swagger
 * /api/admin/upload/info:
 *   get:
 *     summary: Get file information
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: path
 *         required: true
 *         schema:
 *           type: string
 *         description: File path in storage
 *     responses:
 *       200:
 *         description: File information retrieved successfully
 *       400:
 *         description: Invalid path
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get('/info', asyncHandler(async (req: any, res: Response) => {
  try {
    const { path } = req.query;

    if (!path || typeof path !== 'string') {
      const response: ApiResponse = {
        success: false,
        error: 'File path is required'
      };
      return res.status(400).json(response);
    }

    // Validate path to prevent directory traversal
    if (path.includes('..') || path.startsWith('/')) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid file path'
      };
      return res.status(400).json(response);
    }

    console.log(`File info requested for path: ${path}`);

    // Get file info using uploadService
    const fileInfo = await uploadService.getFileInfo(path);
    
    if (!fileInfo) {
      const response: ApiResponse = {
        success: false,
        error: 'File not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: {
        path: path,
        size: fileInfo.size,
        contentType: fileInfo.contentType,
        url: `https://your-supabase-project.supabase.co/storage/v1/object/public/eao-uploads/${path}`,
        uploadedAt: new Date().toISOString()
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Get file info error:', error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get file information'
    };

    return res.status(500).json(response);
  }
}));

export { router as uploadRoutes };
