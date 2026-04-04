# PHASE 2: ENTITY MISMATCH REPORT
**Date**: 2026-03-08  
**Status**: 🔍 Analysis Complete  

## A. ENTITY-BY-ENTITY MISMATCH ANALYSIS

### 1. PROGRAMS

#### Prisma Schema (Database Layer)
```typescript
model Program {
  id          String     @id @default(cuid())
  title       String     // ✅ Matches frontend
  description String     // ✅ Matches frontend
  impact       String     // ✅ Matches frontend
  category    String     // ✅ Matches frontend
  image       String?    // ✅ Matches frontend
  is_active   Boolean    @default(true) // ❌ Missing in frontend
  type        ProgramType // ❌ Missing in frontend
  status      ProgramStatus @default(ACTIVE) // ❌ Missing in frontend
  start_date  DateTime   // ❌ Missing in frontend
  end_date    DateTime?  // ❌ Missing in frontend
  budget      Float?     // ❌ Missing in frontend
  location    String?    // ❌ Missing in frontend
  coordinator String?    // ❌ Missing in frontend
  goals       String[]   // ❌ Missing in frontend
  metrics     Json?      // ❌ Missing in frontend
  notes       String?    // ❌ Missing in frontend
  createdAt   DateTime   @default(now()) // ❌ Missing in frontend
  updatedAt   DateTime   @updatedAt     // ❌ Missing in frontend
}
```

#### Frontend Public API (`src/services/api.ts`)
```typescript
export interface Program {
  id: string;        // ✅ Matches DB
  title: string;     // ✅ Matches DB
  description: string; // ✅ Matches DB
  image: string;     // ✅ Matches DB
  impact: string;    // ✅ Matches DB
  category: string; // ✅ Matches DB
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface Program {
  id: string;              // ✅ Matches DB
  title: string;           // ✅ Matches DB
  description: string;     // ✅ Matches DB
  impact: string;          // ✅ Matches DB
  category: string;        // ✅ Matches DB
  image: string;           // ✅ Matches DB
  is_active: boolean;      // ✅ Matches DB
  type: string;            // ✅ Matches DB
  status: string;          // ✅ Matches DB
  start_date: string;      // ✅ Matches DB
  end_date?: string;       // ✅ Matches DB
  budget?: number;         // ✅ Matches DB
  location?: string;       // ✅ Matches DB
  coordinator?: string;    // ✅ Matches DB
  goals: string[];         // ✅ Matches DB
  metrics?: any;           // ✅ Matches DB
  notes?: string;          // ✅ Matches DB
  created_at: string;      // ✅ Matches DB
  updated_at: string;      // ✅ Matches DB
}
```

#### Backend Route (`backend/src/routes/programs.ts`)
```typescript
// Returns subset of fields
select: {
  id: true,
  title: true,
  description: true,
  impact: true,
  category: true,
  image: true,
  is_active: true,     // ✅ Good
  createdAt: true,     // ✅ Good
}
```

**MISMATCHES FOUND:**
- ❌ **Public API**: Missing 8 admin fields (is_active, type, status, dates, etc.)
- ❌ **Field Naming**: Frontend uses `created_at` vs DB `createdAt`
- ❌ **Data Types**: Frontend uses `string` for dates vs DB `DateTime`

---

### 2. EVENTS

#### Prisma Schema (Database Layer)
```typescript
model Event {
  id          String     @id @default(cuid())
  title       String
  description String
  type        EventType  // ❌ Different from frontend
  event_date  DateTime   // ✅ Matches frontend
  end_date    DateTime?  // ❌ Missing in frontend
  location    String
  max_attendees Int?     // ❌ Missing in frontend
  current_attendees Int @default(0) // ❌ Missing in frontend
  image       String?
  status      EventStatus // ❌ Different from frontend
  is_public   Boolean    @default(true) // ❌ Missing in frontend
  registration_required Boolean @default(true) // ❌ Missing
  registration_deadline DateTime? // ❌ Missing
  cost        Float?     // ❌ Missing
  funds_raised Float?    // ✅ Matches frontend
  currency    String?    // ✅ Matches frontend
  skills      String[]   // ❌ Missing
  is_featured Boolean    @default(false) // ✅ Matches frontend
  notes       String?    // ❌ Missing
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

#### Frontend Public API (`src/services/api.ts`)
```typescript
export interface Event {
  id: string;           // ✅ Matches DB
  title: string;        // ✅ Matches DB
  description: string;  // ✅ Matches DB
  date: string;         // ⚠️ Different name (event_date)
  location: string;     // ✅ Matches DB
  image: string;        // ✅ Matches DB
  participants?: string; // ❌ Different structure
  raised?: string;      // ❌ Different type/name
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'run' | 'celebration' | 'fundraiser' | 'corporate'; // ❌ Different enum
  event_date: string;  // ✅ Matches DB name
  location?: string;
  participants: number; // ❌ Different from DB structure
  funds_raised: number; // ✅ Matches DB
  currency: string;    // ✅ Matches DB
  image: string;
  is_featured: boolean; // ✅ Matches DB
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'; // ❌ Different enum
  created_at: string;
}
```

#### Backend Route (`backend/src/routes/events.ts`)
```typescript
// MOCK DATA - Not using database
const events = [
  {
    id: '1',
    title: 'Annual Fundraising Gala',
    description: '...',
    date: '2024-06-15T19:00:00Z', // ❌ Different name
    location: 'Kampala Serena Hotel',
    image: '/images/events/gala.jpg',
    participants: '200+',        // ❌ Different type
    raised: '$50,000'             // ❌ Different type
  }
];
```

**MISMATCHES FOUND:**
- ❌ **Backend Route**: Using mock data instead of database
- ❌ **Event Types**: Different enum values across layers
- ❌ **Field Names**: `date` vs `event_date`
- ❌ **Data Types**: `participants` as string vs number
- ❌ **Status Enums**: Different values across layers
- ❌ **Missing Fields**: Many DB fields missing in frontend

---

### 3. SUCCESS STORIES

#### Prisma Schema (Database Layer)
```typescript
model SuccessStory {
  id           String   @id @default(cuid())
  student_name String   // ✅ Matches admin frontend
  age          Int?     // ✅ Matches admin frontend
  story        String
  impact       String
  category     String   @default("education") // ❌ Different from frontend
  image        String?
  is_featured  Boolean  @default(false)
  status       String   @default("published") // ❌ Different from frontend
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### Frontend Public API (`src/services/api.ts`)
```typescript
export interface SuccessStory {
  id: number;        // ❌ Different type (string vs number)
  name: string;      // ❌ Different name (student_name)
  age: string;       // ❌ Different type (string vs number)
  story: string;     // ✅ Matches DB
  impact: string;    // ✅ Matches DB
  category: string;  // ❌ Different enum
  image: string;     // ✅ Matches DB
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface SuccessStory {
  id: string;           // ✅ Matches DB
  student_name: string; // ✅ Matches DB
  age: number;          // ✅ Matches DB
  story: string;        // ✅ Matches DB
  impact: string;       // ✅ Matches DB
  category: 'education' | 'community' | 'volunteer'; // ❌ Different enum
  image: string;         // ✅ Matches DB
  is_featured: boolean;  // ✅ Matches DB
  status: 'draft' | 'published' | 'archived'; // ❌ Different enum
  created_at: string;    // ✅ Matches DB naming
}
```

#### Backend Route (`backend/src/routes/successStories.ts`)
```typescript
// MOCK DATA - Not using database
const successStories = [
  {
    id: '1',                    // ✅ String
    student_name: 'Sarah Nakato', // ✅ Matches DB
    age: 16,                    // ✅ Number
    story: '...',
    impact: '...',
    category: 'education',      // ✅ String
    image: '/images/stories/sarah.jpg',
    is_featured: true,
    status: 'published',
    created_at: '2024-01-15T10:00:00Z'
  }
];
```

**MISMATCHES FOUND:**
- ❌ **Backend Route**: Using mock data instead of database
- ❌ **Public API**: Wrong ID type, wrong field names, wrong data types
- ❌ **Category Enums**: Different values across layers
- ❌ **Status Enums**: Different values across layers

---

### 4. SCHOOL BUILDING

#### Prisma Schema (Database Layer)
```typescript
model SchoolBuilding {
  id                  String   @id @default(cuid())
  title               String
  description         String
  phase               String
  status              String   @default("pending")
  start_date          DateTime?
  end_date            DateTime?
  budget              Float?
  target_amount       Float?
  raised_amount       Float?
  currency            String?
  progress_percentage Int      @default(0)
  image               String?
  completion_date     DateTime?
  is_featured         Boolean  @default(false)
  notes               String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface SchoolBuilding {
  id: string;                    // ✅ Matches DB
  phase: string;                 // ✅ Matches DB
  title: string;                 // ✅ Matches DB
  description: string;           // ✅ Matches DB
  progress_percentage: number;   // ✅ Matches DB
  target_amount: number;         // ✅ Matches DB
  raised_amount: number;         // ✅ Matches DB
  currency: string;              // ✅ Matches DB
  status: 'pending' | 'in_progress' | 'completed' | 'delayed'; // ✅ Matches DB
  image: string;                 // ✅ Matches DB
  completion_date?: string;      // ✅ Matches DB
  is_featured?: boolean;         // ✅ Matches DB
  created_at: string;           // ✅ Matches DB naming
}
```

**MISMATCHES FOUND:**
- ✅ **Good Alignment**: Admin API matches DB well
- ❌ **Missing Fields**: Admin API missing `start_date`, `end_date`, `budget`, `notes`
- ❌ **Public API**: No public API for school building

---

### 5. CONTACTS

#### Prisma Schema (Database Layer)
```typescript
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  phone     String?
  company   String?
  status    ContactStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Frontend Contact Form (`src/services/api.ts`)
```typescript
export interface ContactFormData {
  name: string;      // ✅ Matches DB
  email: string;     // ✅ Matches DB
  phone?: string;    // ✅ Matches DB
  subject: string;   // ✅ Matches DB
  message: string;   // ✅ Matches DB
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface Contact {
  id: string;        // ✅ Matches DB
  name: string;      // ✅ Matches DB
  email: string;     // ✅ Matches DB
  phone?: string;    // ✅ Matches DB
  subject: string;   // ✅ Matches DB
  message: string;   // ✅ Matches DB
  status: 'new' | 'in_progress' | 'resolved'; // ❌ Different enum
  created_at: string; // ✅ Matches DB naming
}
```

**MISMATCHES FOUND:**
- ❌ **Status Enum**: Frontend uses 'new' vs DB 'PENDING'
- ❌ **Missing Fields**: Frontend missing `company` field
- ❌ **Field Naming**: `created_at` vs `createdAt`

---

### 6. DONATIONS

#### Prisma Schema (Database Layer)
```typescript
model Donation {
  id                    String           @id @default(cuid())
  payment_id            String?          @unique
  amount                Float
  currency              String           @default("UGX")
  flutterwaveTxRef      String?          @unique // Legacy
  flutterwaveTransactionId String?        // Legacy
  status                DonationStatus   @default(PENDING)
  message               String?
  is_anonymous          Boolean          @default(false)
  donor_name            String?
  donor_email           String?
  donor_phone           String?
  payment_method        String?
  is_recurring          Boolean          @default(false)
  createdAt             DateTime         @default(now())
  updatedAt             DateTime         @updatedAt
}
```

#### Frontend Donation Form (`src/services/api.ts`)
```typescript
export interface DonationFormData {
  amount: string;      // ❌ Different type (string vs number)
  currency: string;    // ✅ Matches DB
  donorName: string;   // ❌ Different name (donor_name)
  donorEmail: string;  // ❌ Different name (donor_email)
  donorPhone?: string; // ❌ Different name (donor_phone)
  paymentMethod: string; // ❌ Different name (payment_method)
  isRecurring: boolean; // ❌ Different name (is_recurring)
  campaign?: string;   // ✅ Matches DB
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface Donation {
  id: string;                    // ✅ Matches DB
  amount: number;                // ✅ Matches DB
  currency: string;              // ✅ Matches DB
  donor_name: string;            // ✅ Matches DB
  donor_email: string;           // ✅ Matches DB
  donor_phone?: string;          // ✅ Matches DB
  message?: string;              // ✅ Matches DB
  status: string;                // ✅ Matches DB
  is_anonymous: boolean;         // ✅ Matches DB
  payment_method?: string;       // ✅ Matches DB
  is_recurring?: boolean;        // ✅ Matches DB
  campaign?: string;             // ✅ Matches DB
  created_at: string;            // ✅ Matches DB naming
  updated_at: string;            // ✅ Matches DB naming
}
```

**MISMATCHES FOUND:**
- ❌ **Field Naming**: Frontend form uses camelCase vs DB snake_case
- ❌ **Data Types**: Amount as string vs number
- ❌ **Legacy Fields**: Flutterwave fields still in schema but not used

---

### 7. VOLUNTEERS

#### Prisma Schema (Database Layer)
```typescript
model Volunteer {
  id                String           @id @default(cuid())
  first_name        String           // snake_case
  last_name         String           // snake_case
  email             String           @unique
  phone             String?
  date_of_birth     DateTime?        // snake_case
  age               Int?
  gender            Gender?
  address           String?
  city              String?
  country           String           @default("Uganda")
  profile_image     String?          // snake_case
  bio               String?
  skills            String[]
  interests         String[]
  availability      Availability?
  occupation        String?
  motivation        String?
  emergency_contact String?          // snake_case
  emergency_phone   String?          // snake_case
  status            VolunteerStatus  @default(PENDING)
  application_date  DateTime         @default(now()) // snake_case
  approved_date     DateTime?
  last_login_at     DateTime?        // snake_case
  total_hours       Float            @default(0) // snake_case
  background_check   Boolean          @default(false)
  background_check_date DateTime?     // snake_case
  notes             String?
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
}
```

#### Frontend Volunteer Form (`src/services/api.ts`)
```typescript
export interface VolunteerFormData {
  name: string;        // ❌ Different structure (first_name + last_name)
  email: string;       // ✅ Matches DB
  phone: string;       // ✅ Matches DB
  age: string;         // ❌ Different type (string vs number)
  occupation: string;   // ✅ Matches DB
  skills: string[];    // ✅ Matches DB
  availability: string; // ✅ Matches DB
  motivation: string;   // ✅ Matches DB
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface Volunteer {
  id: string;                    // ✅ Matches DB
  first_name: string;            // ✅ Matches DB
  last_name: string;             // ✅ Matches DB
  email: string;                 // ✅ Matches DB
  phone?: string;                // ✅ Matches DB
  date_of_birth?: string;        // ✅ Matches DB
  age?: number;                  // ✅ Matches DB
  gender?: string;               // ✅ Matches DB
  address?: string;              // ✅ Matches DB
  city?: string;                 // ✅ Matches DB
  country: string;               // ✅ Matches DB
  profile_image?: string;        // ✅ Matches DB
  bio?: string;                  // ✅ Matches DB
  skills: string[];             // ✅ Matches DB
  interests: string[];          // ✅ Matches DB
  availability?: string;        // ✅ Matches DB
  occupation?: string;          // ✅ Matches DB
  motivation?: string;          // ✅ Matches DB
  emergency_contact?: string;    // ✅ Matches DB
  emergency_phone?: string;      // ✅ Matches DB
  status: string;                // ✅ Matches DB
  application_date: string;      // ✅ Matches DB
  approved_date?: string;        // ✅ Matches DB
  last_login_at?: string;        // ✅ Matches DB
  total_hours: number;           // ✅ Matches DB
  background_check: boolean;     // ✅ Matches DB
  background_check_date?: string; // ✅ Matches DB
  notes?: string;                // ✅ Matches DB
  created_at: string;            // ✅ Matches DB naming
  updated_at: string;            // ✅ Matches DB naming
}
```

**MISMATCHES FOUND:**
- ❌ **Form Structure**: Public form uses `name` vs DB `first_name` + `last_name`
- ❌ **Data Types**: Age as string vs number
- ❌ **Missing Fields**: Public form missing many DB fields

---

### 8. NEWSLETTER/SUBSCRIBERS

#### Prisma Schema (Database Layer)
```typescript
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  is_active Boolean  @default(true) // snake_case
  source    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Frontend Newsletter Form (`src/services/api.ts`)
```typescript
export interface NewsletterData {
  email: string;  // ✅ Matches DB
  name?: string;  // ❌ Field doesn't exist in DB
}
```

**MISMATCHES FOUND:**
- ❌ **Extra Field**: Frontend has `name` field that doesn't exist in DB
- ❌ **Field Naming**: `is_active` vs potential frontend expectations

---

### 9. NEWS/BLOG

#### Prisma Schema (Database Layer)
```typescript
model News {
  id             String   @id @default(cuid())
  title          String
  content        String
  excerpt        String?
  featured_image String?
  author         String? @default("EAO Team")
  status         String   @default("draft")
  published_at   DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

#### Frontend Admin API (`src/services/adminApi.ts`)
```typescript
export interface News {
  id: string;           // ✅ Matches DB
  title: string;        // ✅ Matches DB
  content: string;      // ✅ Matches DB
  excerpt: string;      // ✅ Matches DB
  featured_image: string; // ✅ Matches DB
  status: 'draft' | 'published'; // ✅ Matches DB
  published_at?: string; // ✅ Matches DB
}
```

**MISMATCHES FOUND:**
- ✅ **Good Alignment**: Admin API matches DB well
- ❌ **Missing Fields**: Admin API missing `author` field
- ❌ **Public API**: No public API for news

---

### 10. FINANCIAL REPORTS

**Status**: No database schema found, only frontend interfaces

#### Frontend Public API (`src/services/api.ts`)
```typescript
export interface FinancialReport {
  id: string;        // No DB schema
  title: string;     // No DB schema
  period: string;    // No DB schema
  downloadUrl: string; // No DB schema
  summary: string;   // No DB schema
}
```

**MISMATCHES FOUND:**
- ❌ **Missing Schema**: No database schema for financial reports
- ❌ **Backend Route**: Returns static mock data

---

## B. SUMMARY OF CRITICAL ISSUES

### 🚨 HIGH PRIORITY MISMATCHES

1. **Events**: Backend using mock data, enum mismatches
2. **Success Stories**: Backend using mock data, public API completely wrong
3. **Newsletter**: Frontend sending non-existent `name` field
4. **Field Naming**: Inconsistent camelCase vs snake_case across layers
5. **Data Types**: Date fields as strings vs DateTime, numbers vs strings

### ⚠️ MEDIUM PRIORITY MISMATCHES

1. **Programs**: Public API missing admin fields
2. **Contacts**: Status enum mismatch
3. **Donations**: Form field naming inconsistencies
4. **Volunteers**: Form structure differences

### 📝 LOW PRIORITY MISMATCHES

1. **Missing Fields**: Some optional fields not exposed in frontend
2. **Financial Reports**: No database schema (uses mock data)

---

**Status**: 🔍 Analysis Complete, Ready for Canonical Contract Selection  
**Next Step**: Choose canonical contracts and implement alignment
