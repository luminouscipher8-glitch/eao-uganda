-- EAO Uganda Database Setup
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rogxpucnkqwbeohpkolj/sql

-- Create programs table
CREATE TABLE IF NOT EXISTS api.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT '/images/programs/default.jpg',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for programs
ALTER TABLE api.programs ENABLE ROW LEVEL SECURITY;

-- Programs RLS policies
CREATE POLICY "Authenticated users can view programs" ON api.programs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can insert programs" ON api.programs
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin users can update programs" ON api.programs
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin users can delete programs" ON api.programs
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- Programs indexes
CREATE INDEX IF NOT EXISTS idx_programs_category ON api.programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_is_active ON api.programs(is_active);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON api.programs(created_at DESC);

-- Create news table
CREATE TABLE IF NOT EXISTS api.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT DEFAULT '/images/news/default.jpg',
  author TEXT DEFAULT 'EAO Team',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for news
ALTER TABLE api.news ENABLE ROW LEVEL SECURITY;

-- News RLS policies
CREATE POLICY "Authenticated users can view published news" ON api.news
  FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);

CREATE POLICY "Admin users can manage news" ON api.news
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- News indexes
CREATE INDEX IF NOT EXISTS idx_news_is_published ON api.news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON api.news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON api.news(created_at DESC);

-- Create contacts table
CREATE TABLE IF NOT EXISTS api.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for contacts
ALTER TABLE api.contacts ENABLE ROW LEVEL SECURITY;

-- Contacts RLS policies
CREATE POLICY "Anyone can create contacts" ON api.contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin users can manage contacts" ON api.contacts
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Contacts indexes
CREATE INDEX IF NOT EXISTS idx_contacts_status ON api.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON api.contacts(created_at DESC);

-- Create donations table
CREATE TABLE IF NOT EXISTS api.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'UGX' NOT NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  payment_method TEXT DEFAULT 'mobile_money',
  is_recurring BOOLEAN DEFAULT false,
  campaign TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for donations
ALTER TABLE api.donations ENABLE ROW LEVEL SECURITY;

-- Donations RLS policies
CREATE POLICY "Users can view own donations" ON api.donations
  FOR SELECT USING (auth.email() = donor_email);

CREATE POLICY "Admin users can manage donations" ON api.donations
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Donations indexes
CREATE INDEX IF NOT EXISTS idx_donations_status ON api.donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON api.donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON api.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_campaign ON api.donations(campaign);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS api.volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT[],
  availability TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for volunteers
ALTER TABLE api.volunteers ENABLE ROW LEVEL SECURITY;

-- Volunteers RLS policies
CREATE POLICY "Users can view own volunteer applications" ON api.volunteers
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Admin users can manage volunteers" ON api.volunteers
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Volunteers indexes
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON api.volunteers(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON api.volunteers(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON api.volunteers(created_at DESC);

-- Create events table for fundraising events
CREATE TABLE IF NOT EXISTS api.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('run', 'celebration', 'fundraiser', 'corporate')),
  event_date DATE NOT NULL,
  location TEXT,
  participants INTEGER DEFAULT 0,
  funds_raised DECIMAL(12,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'UGX',
  image TEXT DEFAULT '/images/events/default.jpg',
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for events
ALTER TABLE api.events ENABLE ROW LEVEL SECURITY;

-- Events RLS policies
CREATE POLICY "Authenticated users can view events" ON api.events
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can manage events" ON api.events
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_type ON api.events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_status ON api.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON api.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_featured ON api.events(is_featured);

-- Create school_building table for construction progress
CREATE TABLE IF NOT EXISTS api.school_building (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phase TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  target_amount DECIMAL(12,2) NOT NULL,
  raised_amount DECIMAL(12,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'UGX',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'delayed')),
  image TEXT DEFAULT '/images/school/default.jpg',
  completion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for school_building
ALTER TABLE api.school_building ENABLE ROW LEVEL SECURITY;

-- School building RLS policies
CREATE POLICY "Authenticated users can view school building progress" ON api.school_building
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can manage school building" ON api.school_building
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- School building indexes
CREATE INDEX IF NOT EXISTS idx_school_building_status ON api.school_building(status);
CREATE INDEX IF NOT EXISTS idx_school_building_phase ON api.school_building(phase);

-- Create success_stories table for student testimonials
CREATE TABLE IF NOT EXISTS api.success_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0),
  story TEXT NOT NULL,
  impact TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('education', 'community', 'volunteer')),
  image TEXT DEFAULT '/images/stories/default.jpg',
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for success_stories
ALTER TABLE api.success_stories ENABLE ROW LEVEL SECURITY;

-- Success stories RLS policies
CREATE POLICY "Anyone can view published success stories" ON api.success_stories
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin users can manage success stories" ON api.success_stories
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Success stories indexes
CREATE INDEX IF NOT EXISTS idx_success_stories_category ON api.success_stories(category);
CREATE INDEX IF NOT EXISTS idx_success_stories_status ON api.success_stories(status);
CREATE INDEX IF NOT EXISTS idx_success_stories_featured ON api.success_stories(is_featured);

-- Insert sample data for testing
INSERT INTO api.programs (title, description, impact, category, image) VALUES
('Education Support Program', 'Providing educational resources and support to orphaned children', 'Helped 50+ children access quality education', 'education', '/images/programs/education.jpg'),
('Healthcare Initiative', 'Ensuring access to basic healthcare services for vulnerable children', 'Provided medical care to 100+ children', 'healthcare', '/images/programs/healthcare.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO api.events (title, description, event_type, event_date, participants, funds_raised, image, status) VALUES
('Educate an Orphan Run 2023', 'Annual fundraising run to support education programs', 'run', '2023-12-15', 850, 45000000.00, '/images/events/run-2023.jpg', 'completed'),
('Community Celebration', 'Celebrating our community achievements and student success', 'celebration', '2023-11-20', 500, 12000000.00, '/images/events/celebration-2023.jpg', 'completed'),
('School Fundraiser', 'Special fundraising event for school construction', 'fundraiser', '2023-10-10', 300, 8000000.00, '/images/events/fundraiser-2023.jpg', 'completed')
ON CONFLICT DO NOTHING;

INSERT INTO api.school_building (phase, title, description, progress_percentage, target_amount, raised_amount, status) VALUES
('Phase 1', 'Foundation and Ground Floor', 'Complete foundation work and ground floor classrooms', 35, 2500000000.00, 875000000.00, 'in_progress'),
('Phase 2', 'Upper Classrooms', 'Build first and second floor classrooms', 0, 1500000000.00, 0.00, 'pending')
ON CONFLICT DO NOTHING;

INSERT INTO api.success_stories (student_name, age, story, impact, category, image, is_featured) VALUES
('Amina Nakato', 14, 'When my parents passed away, I thought my education was over. Thanks to EAO, I am now top of my class and dream of becoming a doctor.', 'Top student in her class for 3 consecutive years', 'education', '/images/stories/amina.jpg', true),
('David Okello', 16, 'The sanitary support program changed everything. I no longer miss school during my period and can focus on my studies.', '95% attendance rate since joining program', 'community', '/images/stories/david.jpg', true),
('Sarah Nalubega', 15, 'Volunteers helped me with math after school. Now I am helping other students and want to become a teacher myself.', 'Now tutors 5 younger students', 'volunteer', '/images/stories/sarah.jpg', true)
ON CONFLICT DO NOTHING;

INSERT INTO api.news (title, content, excerpt, is_published, published_at) VALUES
('New School Building Completed', 'We are excited to announce the completion of our new school building...', 'A new milestone in our education mission', true, NOW()),
('Healthcare Camp Success', 'Our recent healthcare camp served over 200 children...', 'Making healthcare accessible to all', true, NOW())
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA api TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA api TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA api TO anon;
