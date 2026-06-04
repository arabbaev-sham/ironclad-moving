-- IronClad Movers Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  move_type TEXT NOT NULL,
  move_date TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_floor TEXT DEFAULT 'Ground',
  destination_address TEXT NOT NULL,
  destination_floor TEXT DEFAULT 'Ground',
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  photo_urls TEXT[] DEFAULT '{}'
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  move_type TEXT,
  approved BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  image_urls TEXT[] DEFAULT '{}'
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied'))
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'photo' CHECK (type IN ('photo', 'video')),
  category TEXT CHECK (category IN ('move', 'truck', 'team', 'before-after')),
  featured BOOLEAN DEFAULT FALSE
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT
);

-- Site settings table (hero bg URL, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed default setting
INSERT INTO site_settings (key, value) VALUES ('hero_bg_url', '')
ON CONFLICT (key) DO NOTHING;

-- Storage bucket for uploaded media (run separately in Supabase dashboard > Storage)
-- Bucket name: ironclad-media
-- Public access: true

-- Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read approved reviews and gallery
CREATE POLICY "Public reviews" ON reviews FOR SELECT USING (approved = TRUE);
CREATE POLICY "Public gallery" ON gallery FOR SELECT USING (TRUE);
CREATE POLICY "Public blog" ON blog_posts FOR SELECT USING (published = TRUE);

-- Service role (used by supabaseAdmin) can do everything
-- This is handled by the service role key bypassing RLS

-- Indexes for performance
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS reviews_approved_idx ON reviews(approved);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS messages_status_idx ON contact_messages(status);
CREATE INDEX IF NOT EXISTS blog_slug_idx ON blog_posts(slug);

-- Sample approved reviews (optional seed data)
INSERT INTO reviews (name, email, rating, text, move_type, approved, featured) VALUES
  ('Jennifer M.', 'jennifer@example.com', 5, 'Best movers in Seattle! They were on time, incredibly careful with my furniture, and finished faster than expected.', 'Local Move', TRUE, TRUE),
  ('David K.', 'david@example.com', 5, 'Moved from Bellevue to Tacoma and the whole experience was flawless. Professional crew, no hidden fees, and nothing broken.', 'Long Distance', TRUE, TRUE),
  ('Sarah L.', 'sarah@example.com', 5, 'I was so stressed about moving my entire apartment. These guys made it effortless. Amazing!', 'Apartment Move', TRUE, FALSE)
ON CONFLICT DO NOTHING;
