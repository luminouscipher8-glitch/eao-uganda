-- Migration: Combine first_name and last_name into single name field
-- Date: 2026-03-15
-- Purpose: Migrate volunteer model from split names to single name field

-- BEGIN MIGRATION --

-- Step 1: Add new name column (temporary)
ALTER TABLE volunteers ADD COLUMN name_new VARCHAR(255);

-- Step 2: Populate name_new with combined values
UPDATE volunteers 
SET name_new = CASE 
    WHEN first_name IS NOT NULL AND last_name IS NOT NULL AND last_name != '-' THEN
        TRIM(first_name || ' ' || last_name)
    WHEN first_name IS NOT NULL THEN
        TRIM(first_name)
    ELSE
        'Unknown'
END;

-- Step 3: Verify the migration data
SELECT 
    id,
    first_name,
    last_name,
    name_new,
    email
FROM volunteers 
WHERE name_new IS NULL OR name_new = '' OR name_new = 'Unknown'
LIMIT 10;

-- Step 4: Drop old columns
ALTER TABLE volunteers DROP COLUMN first_name;
ALTER TABLE volunteers DROP COLUMN last_name;

-- Step 5: Rename new column to name
ALTER TABLE volunteers RENAME COLUMN name_new TO name;

-- Step 6: Add NOT NULL constraint
ALTER TABLE volunteers ALTER COLUMN name SET NOT NULL;

-- Step 7: Verify final schema
\d volunteers

-- Step 8: Verify final data
SELECT id, name, email FROM volunteers LIMIT 10;

-- END MIGRATION --
