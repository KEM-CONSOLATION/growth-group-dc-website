-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  image_url TEXT,
  role VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  body TEXT,
  main_image_url TEXT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT FALSE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog post categories (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_categories (
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, category_id)
);

-- Blog post tags
CREATE TABLE IF NOT EXISTS blog_post_tags (
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL,
  PRIMARY KEY (blog_post_id, tag)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_post_id, session_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255),
  image_url TEXT,
  category VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  registration_link TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  is_registration_required BOOLEAN DEFAULT FALSE,
  organizer VARCHAR(255),
  contact_info TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  state VARCHAR(100),
  branch VARCHAR(255),
  description TEXT,
  leader VARCHAR(255),
  leader_details TEXT,
  activities TEXT[],
  members_count INTEGER DEFAULT 0,
  max_members INTEGER,
  image_url TEXT,
  meeting_time TIME,
  meeting_day VARCHAR(50),
  is_open BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  state VARCHAR(100),
  city VARCHAR(255),
  branch VARCHAR(255),
  leader_name VARCHAR(255),
  leader_email VARCHAR(255),
  leader_phone VARCHAR(50),
  meeting_day VARCHAR(50),
  meeting_time TIME,
  meeting_location TEXT,
  focus_areas TEXT[],
  current_members INTEGER DEFAULT 0,
  max_members INTEGER,
  is_open BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Reports table
CREATE TABLE IF NOT EXISTS weekly_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_name VARCHAR(255) NOT NULL,
  group_leader VARCHAR(255) NOT NULL,
  leader_email VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  city VARCHAR(255) NOT NULL,
  week_of DATE NOT NULL,
  total_members INTEGER NOT NULL,
  present_this_week INTEGER NOT NULL,
  new_visitors INTEGER DEFAULT 0,
  activities TEXT[] NOT NULL,
  topics_discussed TEXT NOT NULL,
  prayer_requests TEXT,
  testimonies TEXT,
  challenges TEXT,
  next_week_plans TEXT,
  additional_notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Report Photos table
CREATE TABLE IF NOT EXISTS weekly_report_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  weekly_report_id UUID REFERENCES weekly_reports(id) ON DELETE CASCADE,
  photo_type VARCHAR(50) NOT NULL, -- 'group' or 'activity'
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devotions table
CREATE TABLE IF NOT EXISTS devotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  scripture_reference VARCHAR(255),
  author VARCHAR(255),
  published_at TIMESTAMP WITH TIME ZONE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audio Messages table
CREATE TABLE IF NOT EXISTS audio_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration INTEGER, -- in seconds
  speaker VARCHAR(255),
  category VARCHAR(100),
  published_at TIMESTAMP WITH TIME ZONE,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users table (for admin dashboard)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_groups_state ON groups(state);
CREATE INDEX IF NOT EXISTS idx_weekly_reports_week_of ON weekly_reports(week_of);
CREATE INDEX IF NOT EXISTS idx_weekly_reports_status ON weekly_reports(status);
CREATE INDEX IF NOT EXISTS idx_devotions_published ON devotions(published_at);

-- Enable Row Level Security (RLS)
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_report_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access to published content
CREATE POLICY "Public read access to authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access to published blog posts" ON blog_posts FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());
CREATE POLICY "Public read access to blog post categories" ON blog_post_categories FOR SELECT USING (true);
CREATE POLICY "Public read access to blog post tags" ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Public read access to approved comments" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "Public read access to likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Public read access to events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access to departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read access to groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Public read access to published devotions" ON devotions FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());
CREATE POLICY "Public read access to published audio messages" ON audio_messages FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- RLS Policies: Allow public insert for comments and likes
CREATE POLICY "Public insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert likes" ON likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert weekly reports" ON weekly_reports FOR INSERT WITH CHECK (true);

-- RLS Policies: Admin full access (will be updated with proper auth)
CREATE POLICY "Admin full access to authors" ON authors FOR ALL USING (true);
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING (true);
CREATE POLICY "Admin full access to blog posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Admin full access to blog post categories" ON blog_post_categories FOR ALL USING (true);
CREATE POLICY "Admin full access to blog post tags" ON blog_post_tags FOR ALL USING (true);
CREATE POLICY "Admin full access to comments" ON comments FOR ALL USING (true);
CREATE POLICY "Admin full access to likes" ON likes FOR ALL USING (true);
CREATE POLICY "Admin full access to events" ON events FOR ALL USING (true);
CREATE POLICY "Admin full access to departments" ON departments FOR ALL USING (true);
CREATE POLICY "Admin full access to groups" ON groups FOR ALL USING (true);
CREATE POLICY "Admin full access to weekly reports" ON weekly_reports FOR ALL USING (true);
CREATE POLICY "Admin full access to weekly report photos" ON weekly_report_photos FOR ALL USING (true);
CREATE POLICY "Admin full access to devotions" ON devotions FOR ALL USING (true);
CREATE POLICY "Admin full access to audio messages" ON audio_messages FOR ALL USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weekly_reports_updated_at BEFORE UPDATE ON weekly_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devotions_updated_at BEFORE UPDATE ON devotions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_audio_messages_updated_at BEFORE UPDATE ON audio_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

