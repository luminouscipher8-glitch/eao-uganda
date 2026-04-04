# DATABASE MIGRATION GUIDE

## Migration: Volunteer Name Field Consolidation

**Purpose**: Migrate volunteer model from `first_name`/`last_name` to single `name` field  
**Date**: 2026-03-15  
**Risk**: LOW (data transformation only)

---

## 🚨 PRE-MIGRATION CHECKLIST

### 1. Backup Database

```bash
# Create backup
pg_dump $DATABASE_URL > backup_before_volunteer_migration_$(date +%Y%m%d_%H%M%S).sql

# Verify backup
ls -la backup_before_volunteer_migration_*.sql
```

### 2. Stop Application

```bash
# Stop backend to prevent writes during migration
npm run stop
# or kill process
pkill -f "node.*backend"
```

### 3. Check Current Schema

```sql
-- Verify current volunteer table structure
\d volunteers

-- Check existing data
SELECT COUNT(*) as total_volunteers FROM volunteers;
SELECT id, first_name, last_name, email FROM volunteers LIMIT 5;
```

---

## 🔄 MIGRATION STEPS

### Step 1: Add Temporary Name Column

```sql
-- Add new column for temporary storage
ALTER TABLE volunteers ADD COLUMN name_new VARCHAR(255);
```

### Step 2: Populate New Name Field

```sql
-- Combine first_name and last_name into single field
UPDATE volunteers 
SET name_new = CASE 
    WHEN first_name IS NOT NULL AND last_name IS NOT NULL AND last_name != '-' THEN
        TRIM(first_name || ' ' || last_name)
    WHEN first_name IS NOT NULL THEN
        TRIM(first_name)
    ELSE
        'Unknown'
END;
```

### Step 3: Verify Migration Data

```sql
-- Check for any NULL or empty names
SELECT 
    id, 
    first_name, 
    last_name, 
    name_new, 
    email
FROM volunteers 
WHERE name_new IS NULL OR name_new = '' OR name_new = 'Unknown'
LIMIT 10;

-- Count how many records will be affected
SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN name_new = 'Unknown' THEN 1 END) as unknown_names
FROM volunteers;
```

### Step 4: Fix Any Problem Records (if needed)

```sql
-- If any records have 'Unknown' names, update them manually
UPDATE volunteers 
SET name_new = 'Volunteer_' || SUBSTRING(id, 1, 8)
WHERE name_new = 'Unknown';
```

### Step 5: Drop Old Columns

```sql
-- Remove old split name columns
ALTER TABLE volunteers DROP COLUMN first_name;
ALTER TABLE volunteers DROP COLUMN last_name;
```

### Step 6: Rename New Column

```sql
-- Rename temporary column to final name
ALTER TABLE volunteers RENAME COLUMN name_new TO name;
```

### Step 7: Add Constraints

```sql
-- Make name field required
ALTER TABLE volunteers ALTER COLUMN name SET NOT NULL;

-- Add check constraint for minimum length
ALTER TABLE volunteers ADD CONSTRAINT chk_name_length 
    CHECK (LENGTH(TRIM(name)) > 0);
```

### Step 8: Final Verification

```sql
-- Verify final schema
\d volunteers

-- Check final data
SELECT id, name, email FROM volunteers LIMIT 10;

-- Verify no data loss
SELECT COUNT(*) as total_volunteers FROM volunteers;
```

---

## 🔄 PRISMA MIGRATION

Since you're using Prisma, you'll also need to:

### 1. Generate Prisma Migration

```bash
cd backend
npx prisma migrate dev --name volunteer-name-consolidation
```

### 2. Update Prisma Schema (already done)

Your schema already has the single `name` field.

### 3. Regenerate Prisma Client

```bash
npx prisma generate
```

---

## ✅ POST-MIGRATION VERIFICATION

### 1. Test Backend API

```bash
# Start backend
npm run dev

# Test volunteer submission
curl -X POST http://localhost:3001/api/volunteers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "skills": ["teaching"],
    "availability": "weekends",
    "motivation": "Test motivation"
  }'
```

### 2. Test Frontend Integration

```bash
# Start frontend
cd ../
npm run dev

# Test volunteer form submission through UI
```

### 3. Verify Admin Panel

- Login to admin panel
- Check volunteer management
- Verify names display correctly

---

## 🚨 ROLLBACK PLAN

If migration fails, rollback with:

```sql
-- Step 1: Add back old columns
ALTER TABLE volunteers ADD COLUMN first_name VARCHAR(255);
ALTER TABLE volunteers ADD COLUMN last_name VARCHAR(255);

-- Step 2: Split names back (approximate)
UPDATE volunteers 
SET first_name = SPLIT_PART(name, ' ', 1),
    last_name = CASE 
        WHEN POSITION(' ' IN name) > 0 THEN 
            SUBSTRING(name, POSITION(' ' IN name) + 1)
        ELSE '-'
    END;

-- Step 3: Drop new column
ALTER TABLE volunteers DROP COLUMN name;

-- Step 4: Restore backup (if needed)
psql $DATABASE_URL < backup_before_volunteer_migration_YYYYMMDD_HHMMSS.sql
```

---

## 📞 SUPPORT

### Migration Commands Summary

```bash
# 1. Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Run SQL migration
psql $DATABASE_URL < migration_script.sql

# 3. Update Prisma
npx prisma migrate dev --name volunteer-name-consolidation
npx prisma generate

# 4. Test
npm run dev
npm test
```

### Environment Variables Needed

```env
DATABASE_URL="postgresql://..."
```

---

## ✅ SUCCESS CRITERIA

- [ ] All volunteers have a non-empty `name` field
- [ ] Volunteer form submissions work correctly
- [ ] Admin panel displays volunteer names properly
- [ ] No data loss occurred
- [ ] API tests pass
- [ ] Frontend integration works

---

**Migration Time**: ~5-10 minutes  
**Downtime Required**: ~2-3 minutes  
**Risk Level**: LOW (with backup)
