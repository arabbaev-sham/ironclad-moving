-- QuoteModal migration
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Add new columns
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS job_type       TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS type_of_job    TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS crew_count     TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS need_truck     BOOLEAN;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS heavy_items    BOOLEAN;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS estimated_time TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS loading_address   TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS unloading_address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS job_date       TEXT;

-- 2. Drop NOT NULL from legacy columns so QuoteModal inserts don't fail
ALTER TABLE bookings ALTER COLUMN move_type          DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN move_date          DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN pickup_address     DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN destination_address DROP NOT NULL;

-- 3. Allow anon (public) users to insert bookings (needed for browser-side form)
DROP POLICY IF EXISTS "Public can insert bookings" ON bookings;
CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT TO anon
  WITH CHECK (true);
