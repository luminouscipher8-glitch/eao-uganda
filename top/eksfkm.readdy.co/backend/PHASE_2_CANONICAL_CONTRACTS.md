# PHASE 2: CANONICAL CONTRACT DECISIONS
**Date**: 2026-03-08  
**Status**: 📋 Contracts Defined  

## A. CANONICAL CONTRACT SELECTION RATIONALE

### Decision Principles
1. **Database First**: Prisma schema as source of truth for structure
2. **Consistent Naming**: Use snake_case in DB, camelCase in frontend code
3. **Type Safety**: Proper TypeScript types matching DB constraints
4. **Minimal Breaking Changes**: Preserve existing working functionality
5. **Production Ready**: Choose contracts that support real-world usage

---

## B. CANONICAL CONTRACTS BY ENTITY

### 1. PROGRAMS

#### Canonical Schema (Based on Prisma + Admin Frontend)
```typescript
// Database Schema (snake_case)
interface ProgramDB {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
  image: string | null;
  is_active: boolean;
  type: ProgramType;          // EDUCATION, MENTORSHIP, etc.
  status: ProgramStatus;       // PLANNING, ACTIVE, etc.
  start_date: Date;
  end_date: Date | null;
  budget: number | null;
  location: string | null;
  coordinator: string | null;
  goals: string[];
  metrics: any;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Public API Response (camelCase, minimal fields)
interface ProgramPublic {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
  image: string;
}

// Admin API Response (camelCase, full fields)
interface ProgramAdmin {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
  image: string;
  isActive: boolean;
  type: string;
  status: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  location?: string;
  coordinator?: string;
  goals: string[];
  metrics?: any;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Naming**: DB uses snake_case, frontend uses camelCase
- ✅ **Public API**: Minimal fields for performance
- ✅ **Admin API**: Full field access
- ✅ **Dates**: Frontend receives ISO strings

---

### 2. EVENTS

#### Canonical Schema (Based on Prisma + Admin Frontend)
```typescript
// Database Schema (snake_case)
interface EventDB {
  id: string;
  title: string;
  description: string;
  type: EventType;            // FUNDRAISING, VOLUNTEER_ORIENTATION, etc.
  event_date: Date;
  end_date: Date | null;
  location: string;
  max_attendees: number | null;
  current_attendees: number;
  image: string | null;
  status: EventStatus;        // PLANNING, SCHEDULED, etc.
  is_public: boolean;
  registration_required: boolean;
  registration_deadline: Date | null;
  cost: number | null;
  funds_raised: number | null;
  currency: string | null;
  skills: string[];
  is_featured: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Public API Response (camelCase, minimal fields)
interface EventPublic {
  id: string;
  title: string;
  description: string;
  eventDate: string;           // ISO date string
  location: string;
  image: string;
  participants?: string;      // Formatted string
  raised?: string;             // Formatted string
}

// Admin API Response (camelCase, full fields)
interface EventAdmin {
  id: string;
  title: string;
  description: string;
  type: EventType;
  eventDate: string;
  endDate?: string;
  location?: string;
  maxAttendees?: number;
  currentAttendees: number;
  image: string;
  status: EventStatus;
  isPublic: boolean;
  registrationRequired: boolean;
  registrationDeadline?: string;
  cost?: number;
  fundsRaised?: number;
  currency?: string;
  skills: string[];
  isFeatured: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Event Types**: Use Prisma EventType enum (FUNDRAISING, etc.)
- ✅ **Status**: Use Prisma EventStatus enum (PLANNING, etc.)
- ✅ **Date Field**: Standardize on `eventDate` in frontend
- ✅ **Participants**: Public API gets formatted string, admin gets numbers

---

### 3. SUCCESS STORIES

#### Canonical Schema (Based on Prisma + Admin Frontend)
```typescript
// Database Schema (snake_case)
interface SuccessStoryDB {
  id: string;
  student_name: string;
  age: number | null;
  story: string;
  impact: string;
  category: string;            // Free-form string
  image: string | null;
  is_featured: boolean;
  status: string;              // draft, published, archived
  createdAt: Date;
  updatedAt: Date;
}

// Public API Response (camelCase, minimal fields)
interface SuccessStoryPublic {
  id: string;
  studentName: string;
  age: number;
  story: string;
  impact: string;
  category: string;
  image: string;
}

// Admin API Response (camelCase, full fields)
interface SuccessStoryAdmin {
  id: string;
  studentName: string;
  age: number;
  story: string;
  impact: string;
  category: string;
  image: string;
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **ID Type**: Use string consistently (not number)
- ✅ **Category**: Free-form string for flexibility
- ✅ **Status**: Enum values for admin UI
- ✅ **Age**: Number type for proper validation

---

### 4. SCHOOL BUILDING

#### Canonical Schema (Based on Prisma + Admin Frontend)
```typescript
// Database Schema (snake_case)
interface SchoolBuildingDB {
  id: string;
  title: string;
  description: string;
  phase: string;
  status: string;              // pending, in_progress, completed, delayed
  start_date: Date | null;
  end_date: Date | null;
  budget: number | null;
  target_amount: number | null;
  raised_amount: number | null;
  currency: string | null;
  progress_percentage: number;
  image: string | null;
  completion_date: Date | null;
  is_featured: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Admin API Response (camelCase, full fields)
interface SchoolBuildingAdmin {
  id: string;
  title: string;
  description: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  startDate?: string;
  endDate?: string;
  budget?: number;
  targetAmount: number;
  raisedAmount?: number;
  currency?: string;
  progressPercentage: number;
  image: string;
  completionDate?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Status**: Enum for admin UI
- ✅ **Progress**: Percentage as number
- ✅ **Amounts**: Numbers for calculations
- ✅ **Public API**: Not needed (admin-only entity)

---

### 5. CONTACTS

#### Canonical Schema (Based on Prisma + Frontend Forms)
```typescript
// Database Schema (snake_case)
interface ContactDB {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string | null;
  company: string | null;
  status: ContactStatus;       // PENDING, IN_PROGRESS, RESOLVED, CLOSED
  createdAt: Date;
  updatedAt: Date;
}

// Form Submission (camelCase)
interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Admin API Response (camelCase)
interface ContactAdmin {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Status**: Use Prisma ContactStatus enum
- ✅ **Company**: Include optional field
- ✅ **Form**: Simple structure for submission

---

### 6. DONATIONS

#### Canonical Schema (Based on Prisma + Frontend Forms)
```typescript
// Database Schema (snake_case)
interface DonationDB {
  id: string;
  payment_id: string | null;
  amount: number;
  currency: string;
  status: DonationStatus;      // PENDING, COMPLETED, FAILED, REFUNDED
  message: string | null;
  is_anonymous: boolean;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  payment_method: string | null;
  is_recurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form Submission (camelCase)
interface DonationForm {
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  paymentMethod?: string;
  isRecurring: boolean;
  campaign?: string;
}

// Admin API Response (camelCase)
interface DonationAdmin {
  id: string;
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  message?: string;
  status: DonationStatus;
  isAnonymous: boolean;
  paymentMethod?: string;
  isRecurring?: boolean;
  campaign?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Amount**: Number type for proper validation
- ✅ **Field Names**: camelCase in frontend, snake_case in DB
- ✅ **Status**: Use Prisma DonationStatus enum
- ✅ **Legacy Fields**: Keep Flutterwave fields for migration

---

### 7. VOLUNTEERS

#### Canonical Schema (Based on Prisma + Frontend Forms)
```typescript
// Database Schema (snake_case)
interface VolunteerDB {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: Date | null;
  age: number | null;
  gender: Gender | null;
  address: string | null;
  city: string | null;
  country: string;
  profile_image: string | null;
  bio: string | null;
  skills: string[];
  interests: string[];
  availability: Availability | null;
  occupation: string | null;
  motivation: string | null;
  emergency_contact: string | null;
  emergency_phone: string | null;
  status: VolunteerStatus;
  application_date: Date;
  approved_date: Date | null;
  last_login_at: Date | null;
  total_hours: number;
  background_check: boolean;
  background_check_date: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Form Submission (camelCase, simplified)
interface VolunteerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  age?: number;
  occupation?: string;
  skills: string[];
  availability?: string;
  motivation?: string;
}

// Admin API Response (camelCase, full fields)
interface VolunteerAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  age?: number;
  gender?: Gender;
  address?: string;
  city?: string;
  country: string;
  profileImage?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  availability?: Availability;
  occupation?: string;
  motivation?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  status: VolunteerStatus;
  applicationDate: string;
  approvedDate?: string;
  lastLoginAt?: string;
  totalHours: number;
  backgroundCheck: boolean;
  backgroundCheckDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Form Structure**: Split name into first/last for DB
- ✅ **Age**: Number type, calculated from dateOfBirth
- ✅ **Enums**: Use Prisma enums for consistency
- ✅ **Simplified Form**: Only essential fields for public submission

---

### 8. NEWSLETTER/SUBSCRIBERS

#### Canonical Schema (Based on Prisma)
```typescript
// Database Schema (snake_case)
interface NewsletterDB {
  id: string;
  email: string;
  is_active: boolean;
  source: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Form Submission (camelCase)
interface NewsletterForm {
  email: string;
}

// Admin API Response (camelCase)
interface NewsletterAdmin {
  id: string;
  email: string;
  isActive: boolean;
  source?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Remove Name Field**: Not supported by DB schema
- ✅ **Simple Form**: Email only for better conversion
- ✅ **Status**: Boolean for active/inactive

---

### 9. NEWS/BLOG

#### Canonical Schema (Based on Prisma + Admin Frontend)
```typescript
// Database Schema (snake_case)
interface NewsDB {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string | null;
  status: string;              // draft, published
  published_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Admin API Response (camelCase)
interface NewsAdmin {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Status**: Enum for admin UI
- ✅ **Author**: Include optional field
- ✅ **Public API**: Not needed (admin-only entity)

---

### 10. FINANCIAL REPORTS

#### Canonical Schema (New Design)
```typescript
// Database Schema (snake_case) - TO BE CREATED
interface FinancialReportDB {
  id: string;
  title: string;
  period: string;              // e.g., "Q1 2024", "2023 Annual"
  file_url: string;            // Storage URL
  file_size: number;            // Bytes
  mime_type: string;            // e.g., "application/pdf"
  summary: string | null;
  status: ReportStatus;         // DRAFT, PUBLISHED, etc.
  published_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Public API Response (camelCase)
interface FinancialReportPublic {
  id: string;
  title: string;
  period: string;
  downloadUrl: string;
  summary?: string;
}

// Admin API Response (camelCase)
interface FinancialReportAdmin {
  id: string;
  title: string;
  period: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  summary?: string;
  status: ReportStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Field Decisions:**
- ✅ **Create Schema**: Need proper database table
- ✅ **File Storage**: URL-based file access
- ✅ **Status**: Enum for publication workflow

---

## C. ENUM STANDARDIZATION

### Canonical Enums (From Prisma)

```typescript
// Event Types
enum EventType {
  FUNDRAISING = 'FUNDRAISING',
  VOLUNTEER_ORIENTATION = 'VOLUNTEER_ORIENTATION',
  COMMUNITY_SERVICE = 'COMMUNITY_SERVICE',
  TRAINING = 'TRAINING',
  AWARENESS_CAMPAIGN = 'AWARENESS_CAMPAIGN',
  RECRUITMENT_DRIVE = 'RECRUITMENT_DRIVE',
  CELEBRATION = 'CELEBRATION',
  MEETING = 'MEETING'
}

// Event Status
enum EventStatus {
  PLANNING = 'PLANNING',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED'
}

// Volunteer Status
enum VolunteerStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED'
}

// Contact Status
enum ContactStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

// Donation Status
enum DonationStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Program Types
enum ProgramType {
  EDUCATION = 'EDUCATION',
  MENTORSHIP = 'MENTORSHIP',
  HEALTH = 'HEALTH',
  NUTRITION = 'NUTRITION',
  COMMUNITY_DEVELOPMENT = 'COMMUNITY_DEVELOPMENT',
  ADVOCACY = 'ADVOCACY',
  RESEARCH = 'RESEARCH'
}

// Program Status
enum ProgramStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED'
}

// Report Status
enum ReportStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED'
}
```

---

## D. IMPLEMENTATION PRIORITY

### High Priority (Critical Functionality)
1. **Events** - Replace mock data with database
2. **Success Stories** - Replace mock data with database
3. **Newsletter** - Remove non-existent name field
4. **Financial Reports** - Create database schema

### Medium Priority (Consistency Improvements)
1. **Programs** - Align public API with admin fields
2. **Contacts** - Fix status enum mismatch
3. **Donations** - Fix form field naming
4. **Volunteers** - Fix form structure

### Low Priority (Nice to Have)
1. **School Building** - Add missing fields to admin API
2. **News** - Add missing author field to admin API

---

**Status**: 📋 Canonical Contracts Defined  
**Next Step**: Implement contract alignment across all layers
