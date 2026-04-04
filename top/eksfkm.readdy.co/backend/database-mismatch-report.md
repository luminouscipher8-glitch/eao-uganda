# Database Field and Type Mismatch Report - Phase 2

## A. Mismatch Report by Entity

### 1. Programs Entity

**Prisma Schema:**

```ts
model Program {
  id          String     @id @default(cuid())
  name        String     // ❌ MISMATCH: name vs title
  description String
  type        ProgramType
  status      ProgramStatus @default(ACTIVE)
  startDate   DateTime
  endDate     DateTime?
  budget      Float?
  location    String?
  coordinator String?
  goals       String[]
  metrics     Json?
  imageUrl    String?     // ❌ MISMATCH: imageUrl vs image
  notes       String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

**SQL Setup:**

```sql
CREATE TABLE api.programs (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,        -- ❌ MISMATCH: title vs name
  description TEXT NOT NULL,
  impact TEXT NOT NULL,        -- ❌ MISSING in Prisma
  category TEXT NOT NULL,      -- ❌ MISSING in Prisma
  image TEXT DEFAULT '/images/programs/default.jpg', -- ❌ MISMATCH: image vs imageUrl
  is_active BOOLEAN DEFAULT true, -- ❌ MISSING in Prisma
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Frontend Admin API:**

```ts
export interface Program {
  id: string;
  title: string;              // ✅ Matches SQL, ❌ Mismatch with Prisma (name)
  description: string;
  image: string;              // ✅ Matches SQL, ❌ Mismatch with Prisma (imageUrl)
  impact: string;             // ✅ Matches SQL, ❌ Missing in Prisma
  category: string;           // ✅ Matches SQL, ❌ Missing in Prisma
  is_active: boolean;         // ✅ Matches SQL, ❌ Missing in Prisma
  created_at: string;
}
```

### 2. News Entity

**Prisma Schema:** ❌ **MISSING** - No News model in Prisma

**SQL Setup:**

```sql
CREATE TABLE api.news (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT DEFAULT '/images/news/default.jpg', -- ❌ MISMATCH vs frontend (featured_image)
  author TEXT DEFAULT 'EAO Team',               -- ❌ MISSING in frontend
  is_published BOOLEAN DEFAULT false,           -- ❌ MISMATCH vs frontend (status)
  published_at TIMESTAMP WITH TIME ZONE,        -- ❌ MISMATCH vs frontend (published_at)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Frontend Admin API:**

```ts
export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;     // ❌ MISMATCH: featured_image vs image
  status: 'draft' | 'published'; // ❌ MISMATCH: status vs is_published
  published_at?: string;
}
```

### 3. Contacts Entity

**Prisma Schema:**

```ts
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String    // ❌ MISSING in SQL
  message   String
  phone     String?
  company   String?   // ❌ MISSING in SQL & frontend
  status    ContactStatus @default(PENDING) // ❌ DIFFERENT values than SQL
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**SQL Setup:**

```sql
CREATE TABLE api.contacts (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded')), -- ❌ DIFFERENT values
  -- ❌ MISSING: subject, company
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Frontend Admin API:**

```ts
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;            // ✅ Matches Prisma, ❌ Missing in SQL
  message: string;
  status: 'new' | 'in_progress' | 'resolved'; // ❌ DIFFERENT from both
  created_at: string;
}
```

### 4. Donations Entity

**Prisma Schema:**

```ts
model Donation {
  id                    String           @id @default(cuid())
  payment_id            String?          @unique
  amount                Float
  currency              String           @default("UGX")
  flutterwaveTxRef      String?          @unique // Legacy
  flutterwaveTransactionId String?        // Legacy
  status                DonationStatus   @default(PENDING)
  message               String?
  isAnonymous           Boolean          @default(false)
  donorName             String?          // ❌ FIELD NAME MISMATCH
  donorEmail            String?          // ❌ FIELD NAME MISMATCH
  donorPhone            String?          // ❌ FIELD NAME MISMATCH
  paymentMethod         String?
  createdAt             DateTime         @default(now())
  updatedAt             DateTime         @updatedAt
}
```

**SQL Setup:**

```sql
CREATE TABLE api.donations (
  id UUID PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'UGX' NOT NULL,
  donor_name TEXT NOT NULL,      -- ✅ Matches Prisma field name
  donor_email TEXT NOT NULL,     -- ✅ Matches Prisma field name
  donor_phone TEXT,              -- ✅ Matches Prisma field name
  message TEXT,
  status TEXT DEFAULT 'pending', -- ❌ DIFFERENT values than Prisma enum
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Frontend Admin API:**

```ts
export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor_name: string;           // ✅ Matches Prisma/SQL
  donor_email: string;          // ✅ Matches Prisma/SQL
  donor_phone?: string;          // ✅ Matches Prisma/SQL
  payment_method: string;
  is_recurring: boolean;        // ❌ MISSING in Prisma/SQL
  campaign?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}
```

### 5. Events Entity

**Prisma Schema:**

```ts
model Event {
  id          String     @id @default(cuid())
  title       String
  description String
  type        EventType
  startDate   DateTime     // ❌ FIELD NAME MISMATCH
  endDate     DateTime     // ❌ FIELD NAME MISMATCH
  location    String
  maxAttendees Int?
  currentAttendees Int @default(0)
  imageUrl    String?      // ❌ FIELD NAME MISMATCH
  status      EventStatus @default(PLANNING)
  isPublic    Boolean    @default(true)
  registrationRequired Boolean @default(true)
  registrationDeadline DateTime?
  cost        Float?
  skills      String[]
  notes       String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

**SQL Setup:** ❌ **MISSING** - No events table in SQL

**Frontend Admin API:**

```ts
export interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'run' | 'celebration' | 'fundraiser' | 'corporate'; // ❌ FIELD NAME MISMATCH
  event_date: string;           // ❌ FIELD NAME MISMATCH
  location?: string;
  participants: number;          // ❌ FIELD NAME MISMATCH
  funds_raised: number;         // ❌ MISSING in Prisma
  currency: string;             // ❌ MISSING in Prisma
  image: string;                // ❌ FIELD NAME MISMATCH
  is_featured: boolean;         // ❌ MISSING in Prisma
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
}
```

### 6. School Building Entity

**Prisma Schema:**

```ts
model SchoolBuilding {
  id          String   @id @default(cuid())
  title       String
  description String
  phase       String
  status      String   @default("pending")
  startDate   DateTime?
  endDate     DateTime?
  budget      Float?    // ❌ MISSING in frontend
  progress    Int      @default(0) // ❌ FIELD NAME MISMATCH
  imageUrl    String?   // ❌ FIELD NAME MISMATCH
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**SQL Setup:** ❌ **MISSING** - No school_building table in SQL

**Frontend Admin API:**

```ts
export interface SchoolBuilding {
  id: string;
  phase: string;
  title: string;
  description: string;
  progress_percentage: number;  // ❌ FIELD NAME MISMATCH
  target_amount: number;        // ❌ MISSING in Prisma
  raised_amount: number;         // ❌ MISSING in Prisma
  currency: string;             // ❌ MISSING in Prisma
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  image: string;                // ❌ FIELD NAME MISMATCH
  completion_date?: string;
  is_featured?: boolean;         // ❌ MISSING in Prisma
  created_at: string;
}
```

### 7. Success Stories Entity

**Prisma Schema:**

```ts
model SuccessStory {
  id           String   @id @default(cuid())
  studentName  String   // ❌ FIELD NAME MISMATCH
  age          Int?
  story        String
  impact       String
  category     String   @default("education")
  imageUrl     String?  // ❌ FIELD NAME MISMATCH
  isFeatured   Boolean  @default(false) // ❌ FIELD NAME MISMATCH
  status       String   @default("published")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**SQL Setup:** ❌ **MISSING** - No success_stories table in SQL

**Frontend Admin API:**

```ts
export interface SuccessStory {
  id: string;
  student_name: string;         // ✅ Matches Prisma
  age: number;
  story: string;
  impact: string;
  category: 'education' | 'community' | 'volunteer';
  image: string;                // ❌ FIELD NAME MISMATCH
  is_featured: boolean;         // ✅ Matches Prisma
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}
```

### 8. Volunteers Entity

**Prisma Schema:**

```ts
model Volunteer {
  id                String           @id @default(cuid())
  firstName         String          // ❌ FIELD NAME MISMATCH
  lastName          String          // ❌ FIELD NAME MISMATCH
  email             String           @unique
  phone             String?
  dateOfBirth       DateTime?
  gender            Gender?
  address           String?
  city              String?
  country           String           @default("Uganda")
  profileImage      String?         // ❌ FIELD NAME MISMATCH
  bio               String?
  skills            String[]
  interests         String[]
  availability      Availability?
  emergencyContact  String?
  emergencyPhone    String?
  status            VolunteerStatus  @default(PENDING)
  applicationDate   DateTime         @default(now())
  approvedDate      DateTime?
  lastLoginAt       DateTime?
  totalHours        Float            @default(0)
  backgroundCheck   Boolean          @default(false)
  backgroundCheckDate DateTime?
  notes             String?
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
}
```

**SQL Setup:** ❌ **MISSING** - No volunteers table in SQL

**Frontend Admin API:**

```ts
export interface Volunteer {
  id: string;
  name: string;                // ❌ FIELD NAME MISMATCH - should be firstName + lastName
  email: string;
  phone: string;
  age: string;                // ❌ MISSING in Prisma - should be calculated from dateOfBirth
  occupation: string;         // ❌ MISSING in Prisma
  skills: string[];
  availability: string;
  motivation: string;         // ❌ MISSING in Prisma
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
```

### 9. Newsletter Entity

**Prisma Schema:**

```ts
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  source    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**SQL Setup:** ❌ **MISSING** - No newsletters table in SQL

**Frontend Admin API:** ❌ **MISSING** - No Newsletter interface in adminApi.ts

## B. Chosen Canonical Structure per Entity

### Decision Rules

1. **Prefer frontend field names** - They're most used and user-facing
2. **Keep Prisma enum values** - More type-safe than string literals
3. **Use consistent naming** - snake_case in DB, camelCase in code
4. **Add missing fields** - Include fields that exist in any layer

### Canonical Contracts

```ts
// 1. Programs
interface Program {
  id: string;
  title: string;              // ✅ Frontend/SQL over Prisma (name)
  description: string;
  impact: string;              // ✅ Add from SQL/frontend
  category: string;            // ✅ Add from SQL/frontend  
  image: string;               // ✅ Frontend/SQL over Prisma (imageUrl)
  is_active: boolean;          // ✅ Add from SQL/frontend
  type: ProgramType;           // ✅ Keep from Prisma
  status: ProgramStatus;       // ✅ Keep from Prisma
  start_date: DateTime;        // ✅ Normalize naming
  end_date?: DateTime;         // ✅ Normalize naming
  budget?: number;             // ✅ Keep from Prisma
  location?: string;           // ✅ Keep from Prisma
  coordinator?: string;        // ✅ Keep from Prisma
  goals: string[];             // ✅ Keep from Prisma
  metrics?: Json;              // ✅ Keep from Prisma
  notes?: string;              // ✅ Keep from Prisma
  created_at: DateTime;
  updated_at: DateTime;
}

// 2. News  
interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;      // ✅ Frontend over SQL (image)
  author?: string;             // ✅ Add from SQL
  status: 'draft' | 'published'; // ✅ Frontend over SQL (is_published)
  published_at?: DateTime;     // ✅ Both use this
  created_at: DateTime;
  updated_at: DateTime;
}

// 3. Contacts
interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;             // ✅ Keep from Prisma
  company?: string;            // ✅ Keep from Prisma
  message: string;
  status: ContactStatus;       // ✅ Use Prisma enum over SQL strings
  created_at: DateTime;
  updated_at: DateTime;
}

// 4. Donations
interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor_name: string;           // ✅ Keep Prisma/SQL naming
  donor_email: string;          // ✅ Keep Prisma/SQL naming  
  donor_phone?: string;          // ✅ Keep Prisma/SQL naming
  message?: string;
  status: DonationStatus;       // ✅ Use Prisma enum
  is_anonymous: boolean;        // ✅ Keep from Prisma
  payment_method?: string;      // ✅ Keep from Prisma
  is_recurring?: boolean;       // ✅ Add from frontend
  campaign?: string;            // ✅ Add from frontend
  created_at: DateTime;
  updated_at: DateTime;
}

// 5. Events
interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;             // ✅ Keep Prisma enum
  event_date: DateTime;         // ✅ Frontend naming over Prisma (startDate)
  end_date?: DateTime;         // ✅ Normalize naming
  location: string;
  max_attendees?: number;      // ✅ Normalize naming
  current_attendees: number;   // ✅ Normalize naming
  image: string;               // ✅ Frontend over Prisma (imageUrl)
  status: EventStatus;          // ✅ Keep Prisma enum
  is_public: boolean;           // ✅ Keep from Prisma
  registration_required: boolean; // ✅ Keep from Prisma
  registration_deadline?: DateTime; // ✅ Keep from Prisma
  cost?: number;                // ✅ Keep from Prisma
  funds_raised?: number;       // ✅ Add from frontend
  currency?: string;            // ✅ Add from frontend
  skills: string[];             // ✅ Keep from Prisma
  is_featured?: boolean;        // ✅ Add from frontend
  notes?: string;               // ✅ Keep from Prisma
  created_at: DateTime;
  updated_at: DateTime;
}

// 6. School Building
interface SchoolBuilding {
  id: string;
  title: string;
  description: string;
  phase: string;
  status: SchoolBuildingStatus; // ✅ Create proper enum
  start_date?: DateTime;        // ✅ Normalize naming
  end_date?: DateTime;          // ✅ Normalize naming
  budget?: number;              // ✅ Keep from Prisma
  target_amount?: number;       // ✅ Add from frontend
  raised_amount?: number;       // ✅ Add from frontend
  currency?: string;            // ✅ Add from frontend
  progress_percentage: number;  // ✅ Frontend over Prisma (progress)
  image: string;                // ✅ Frontend over Prisma (imageUrl)
  completion_date?: DateTime;   // ✅ Add from frontend
  is_featured?: boolean;        // ✅ Add from frontend
  notes?: string;               // ✅ Keep from Prisma
  created_at: DateTime;
  updated_at: DateTime;
}

// 7. Success Stories
interface SuccessStory {
  id: string;
  student_name: string;         // ✅ Keep Prisma/SQL naming
  age?: number;
  story: string;
  impact: string;
  category: StoryCategory;      // ✅ Create proper enum
  image: string;                // ✅ Frontend over Prisma (imageUrl)
  is_featured: boolean;         // ✅ Keep Prisma
  status: StoryStatus;          // ✅ Create proper enum
  created_at: DateTime;
  updated_at: DateTime;
}

// 8. Volunteers
interface Volunteer {
  id: string;
  first_name: string;           // ✅ Prisma over frontend (name)
  last_name: string;            // ✅ Prisma over frontend (name)
  email: string;
  phone?: string;
  date_of_birth?: DateTime;     // ✅ Keep from Prisma
  age?: number;                 // ✅ Add calculated field
  gender?: Gender;              // ✅ Keep from Prisma
  address?: string;             // ✅ Keep from Prisma
  city?: string;                // ✅ Keep from Prisma
  country: string;              // ✅ Keep from Prisma
  profile_image?: string;       // ✅ Normalize naming
  bio?: string;                 // ✅ Keep from Prisma
  skills: string[];             // ✅ Keep from Prisma
  interests: string[];          // ✅ Keep from Prisma
  availability?: Availability;  // ✅ Keep from Prisma
  occupation?: string;          // ✅ Add from frontend
  motivation?: string;          // ✅ Add from frontend
  emergency_contact?: string;   // ✅ Keep from Prisma
  emergency_phone?: string;     // ✅ Keep from Prisma
  status: VolunteerStatus;       // ✅ Keep Prisma enum
  application_date: DateTime;   // ✅ Normalize naming
  approved_date?: DateTime;     // ✅ Keep from Prisma
  last_login_at?: DateTime;     // ✅ Keep from Prisma
  total_hours: number;          // ✅ Normalize naming
  background_check: boolean;    // ✅ Keep from Prisma
  background_check_date?: DateTime; // ✅ Keep from Prisma
  notes?: string;               // ✅ Keep from Prisma
  created_at: DateTime;
  updated_at: DateTime;
}

// 9. Newsletter
interface Newsletter {
  id: string;
  email: string;
  is_active: boolean;           // ✅ Keep Prisma naming
  source?: string;              // ✅ Keep from Prisma
  created_at: DateTime;
  updated_at: DateTime;
}
```

## C. Required Code Updates

### 1. Prisma Schema Updates

- Add missing News model
- Fix field naming inconsistencies
- Add missing fields from frontend
- Create proper enums for all entities

### 2. SQL Schema Updates  

- Add missing tables (news, events, school_building, success_stories, volunteers, newsletters)
- Fix field naming to match canonical contracts
- Add missing columns
- Create proper constraints

### 3. Frontend Type Updates

- Update adminApi.ts interfaces to match canonical contracts
- Fix field naming inconsistencies
- Add missing fields

### 4. Backend Service Updates

- Update database service to use canonical field names
- Fix (prisma as any) casts with proper typing
- Update controllers to handle new structure

## D. Migration Requirements

### High Priority Migrations

1. **Programs table** - Add missing fields (impact, category, is_active)
2. **News table** - Create from scratch with proper structure
3. **Contacts table** - Add missing fields (subject, company)
4. **Donations table** - Add missing fields (is_recurring, campaign)

### Medium Priority Migrations

1. **Events table** - Create from scratch
2. **School Building table** - Create from scratch  
3. **Success Stories table** - Create from scratch
4. **Volunteers table** - Create from scratch
5. **Newsletter table** - Create from scratch

### Data Migration Notes

- **Programs**: Need to populate impact, category, is_active for existing records
- **Contacts**: Need to populate subject, company for existing records (nullable)
- **Donations**: Need to populate is_recurring, campaign for existing records (nullable)

## Next Steps

1. Update Prisma schema with canonical contracts
2. Generate new migration
3. Update SQL setup scripts
4. Update frontend types
5. Update backend services
6. Test all endpoints with new structure
