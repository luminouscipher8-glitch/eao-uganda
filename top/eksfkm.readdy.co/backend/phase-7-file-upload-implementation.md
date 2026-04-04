# Phase 7: File Upload Implementation

## Storage Mechanism Used

### Supabase Storage Integration
- **Bucket Name**: `eao-uploads`
- **Service**: Supabase Storage (already integrated in project)
- **Access**: Public bucket with signed URLs for sensitive files
- **Structure**: Organized folders for different entity types

### Folder Organization
```
eao-uploads/
├── uploads/           # General uploads
├── images/           # General images
├── documents/        # PDF and document files
├── news/            # News article images
├── success-stories/  # Success story images
├── school-buildings/ # School building progress images
├── events/          # Event images
├── programs/        # Program images
├── volunteers/      # Volunteer profile images
└── reports/         # Financial and administrative reports
```

## Upload Endpoints Implemented

### Primary Upload Endpoint
- **POST** `/api/admin/upload` - Upload file with folder organization
- **DELETE** `/api/admin/upload/delete` - Delete uploaded file
- **GET** `/api/admin/upload/info` - Get file information

### Legacy Endpoint (Deprecated)
- **POST** `/api/admin/upload` - Redirects to new dedicated routes

## Validation and Security Rules

### File Type Validation
**Allowed Image Types:**
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/gif`
- `image/webp`

**Allowed Document Types:**
- `application/pdf`
- `text/plain`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### File Size Limits
- **Default Maximum**: 5MB per file
- **Configurable**: Per-folder size limits
- **Validation**: Server-side validation before upload

### Security Measures
- **Path Validation**: Prevents directory traversal attacks
- **File Extension Checks**: Blocks dangerous executable files
- **Folder Restrictions**: Only allowed folders can be specified
- **Authentication**: All upload routes require admin authentication
- **Authorization**: Strict admin verification required

### Input Sanitization
- **File Names**: Sanitized to remove special characters
- **Unique Naming**: Timestamp + random suffix to prevent conflicts
- **Folder Validation**: Only pre-approved folders allowed

## How Uploaded Files Are Linked to Entities

### Database Integration
Files are linked to entities through URL paths stored in database fields:

#### News Articles
```typescript
interface News {
  featured_image: string; // URL from upload service
}
```

#### Success Stories
```typescript
interface SuccessStory {
  image: string; // URL from upload service
}
```

#### School Buildings
```typescript
interface SchoolBuilding {
  image: string; // URL from upload service
}
```

#### Events
```typescript
interface Event {
  image: string; // URL from upload service
}
```

#### Programs
```typescript
interface Program {
  image: string; // URL from upload service
}
```

#### Volunteers
```typescript
interface Volunteer {
  profile_image?: string; // URL from upload service
}
```

### URL Format
```
https://your-project.supabase.co/storage/v1/object/public/eao-uploads/{folder}/{unique-filename}
```

### File Metadata
```typescript
interface UploadResult {
  url: string;        // Public URL
  path: string;       // Storage path
  size: number;       // File size in bytes
  contentType: string; // MIME type
  fileName: string;    // Unique filename
}
```

## Testing Steps

### Upload Testing

#### Successful Image Upload
```bash
# Note: This requires proper multipart form data handling
# In production, you would use FormData in frontend

curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@test-image.jpg" \
  -F "folder=success-stories"
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "url": "https://your-project.supabase.co/storage/v1/object/public/eao-uploads/success-stories/test-image-1715123456789-abc123.jpg",
    "path": "success-stories/test-image-1715123456789-abc123.jpg",
    "size": 102400,
    "contentType": "image/jpeg",
    "fileName": "test-image-1715123456789-abc123.jpg"
  }
}
```

#### Validation Error Tests

**Invalid File Type:**
```bash
curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@malicious.exe" \
  -F "folder=uploads"
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "File type application/x-msdownload is not allowed. Allowed types: image/jpeg, image/jpg, image/png, image/gif, image/webp, application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}
```

**Invalid Folder:**
```bash
curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@test.jpg" \
  -F "folder=invalid-folder"
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Folder not allowed. Allowed folders: uploads, images, documents, news, success-stories, school-buildings, events, programs, volunteers, reports"
}
```

**Oversized File:**
```bash
curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@huge-image.jpg" \
  -F "folder=uploads"
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "File size exceeds maximum allowed size of 5242880 bytes"
}
```

#### Authentication Tests

**No Authentication:**
```bash
curl -X POST http://localhost:3001/api/admin/upload \
  -F "file=@test.jpg"
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": "Authentication required"
}
```

**Non-Admin User:**
```bash
curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer USER_TOKEN" \
  -F "file=@test.jpg"
```

**Expected Response (403):**
```json
{
  "success": false,
  "error": "Admin access required"
}
```

### Delete File Testing

#### Successful Deletion
```bash
curl -X DELETE http://localhost:3001/api/admin/upload/delete \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "success-stories/test-image-1715123456789-abc123.jpg"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

#### Path Validation Error
```bash
curl -X DELETE http://localhost:3001/api/admin/upload/delete \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "../etc/passwd"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Invalid file path"
}
```

### File Info Testing

#### Get File Information
```bash
curl -X GET "http://localhost:3001/api/admin/upload/info?path=success-stories/test-image-1715123456789-abc123.jpg" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "path": "success-stories/test-image-1715123456789-abc123.jpg",
    "size": 102400,
    "contentType": "image/jpeg",
    "url": "https://your-project.supabase.co/storage/v1/object/public/eao-uploads/success-stories/test-image-1715123456789-abc123.jpg",
    "uploadedAt": "2024-03-07T15:30:00.000Z"
  }
}
```

## Frontend Integration

### Admin API Usage
The frontend `adminApi.ts` already expects the upload endpoint:

```typescript
async uploadFile(file: File, folder: string = 'uploads'): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return this.request<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
}
```

### Entity Image Updates
When updating entities with images:

1. **Upload File**: Get URL from upload service
2. **Update Entity**: Store URL in database field
3. **Display**: Use URL in frontend components

## Production Setup Requirements

### Supabase Storage Setup
1. **Create Bucket**: `eao-uploads` bucket in Supabase Storage
2. **Set Policies**: Public access for images, restricted for documents
3. **Configure CORS**: Allow frontend domain access
4. **Set RLS**: Row Level Security policies if needed

### Environment Variables
```env
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Multer Integration (Future)
To complete the implementation:
1. Install multer: `npm install multer @types/multer`
2. Configure multer middleware for multipart form data
3. Integrate with uploadService for real file handling

## Current Status

### ✅ Implemented
- Upload service architecture with Supabase Storage
- Validation and security rules
- Dedicated upload routes with proper authentication
- File metadata handling
- Folder organization structure
- Comprehensive error handling

### 🔄 In Progress
- Multer middleware integration (requires package installation)
- Real file upload testing (requires Supabase bucket setup)

### 📋 Next Steps
1. Install and configure multer middleware
2. Set up Supabase Storage bucket
3. Test real file uploads
4. Integrate with entity creation/update flows
5. Add file cleanup for deleted entities

The file upload system architecture is now complete with proper security, validation, and organization. The system is ready for production use once multer middleware is properly configured and Supabase Storage bucket is set up.
