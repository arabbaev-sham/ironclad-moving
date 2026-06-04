-- RLS INSERT policies — run this in Supabase SQL Editor
-- Allows anonymous (public) users to submit bookings, reviews, and contact messages

-- BOOKINGS: public can submit
CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT TO anon
  WITH CHECK (true);

-- REVIEWS: public can submit (approved=false by default, admin approves)
CREATE POLICY "Public can insert reviews"
  ON reviews FOR INSERT TO anon
  WITH CHECK (approved = false);

-- CONTACT: public can submit
CREATE POLICY "Public can insert contact_messages"
  ON contact_messages FOR INSERT TO anon
  WITH CHECK (true);

-- GALLERY: public can read all gallery items
DROP POLICY IF EXISTS "Public gallery" ON gallery;
CREATE POLICY "Public gallery"
  ON gallery FOR SELECT TO anon
  USING (true);

-- SITE SETTINGS: public can read (needed for hero bg image)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT TO anon
  USING (true);
