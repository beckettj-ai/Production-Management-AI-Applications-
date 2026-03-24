-- Archive IQ: Supabase PostgreSQL Schema

-- Enums for strict status management
CREATE TYPE copyright_status AS ENUM ('Public Domain', 'Creative Commons', 'Orphan Work', 'Copyrighted', 'Cleared');
CREATE TYPE risk_level AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE workflow_stage AS ENUM ('Backlog', 'Searching', 'Pending Response', 'Cleared', 'Rejected');
CREATE TYPE asset_type AS ENUM ('Video', 'Image', 'Audio');

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  production_company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  synopsis TEXT,
  intended_distribution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets Table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  asset_name TEXT NOT NULL,
  file_url TEXT,
  youtube_url TEXT,
  asset_type asset_type NOT NULL,
  thumbnail_url TEXT,
  detected_source TEXT,
  copyright_status copyright_status DEFAULT 'Copyrighted',
  risk_level risk_level DEFAULT 'High',
  workflow_stage workflow_stage DEFAULT 'Backlog',
  ai_confidence_score FLOAT DEFAULT 0.0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rights Holders Table
CREATE TABLE rights_holders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_email TEXT,
  organization TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asset Matches (Reverse Search Results)
CREATE TABLE asset_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  match_url TEXT NOT NULL,
  source_name TEXT, -- e.g., "Getty Images", "Prelinger Archives"
  match_confidence FLOAT,
  match_metadata JSONB
);

-- Clearance Requests (Outreach Drafts)
CREATE TABLE clearance_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  rights_holder_id UUID REFERENCES rights_holders(id),
  subject_line TEXT,
  email_body TEXT,
  status TEXT DEFAULT 'Draft', -- Draft, Sent, Replied
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_assets_project ON assets(project_id);
CREATE INDEX idx_assets_status ON assets(copyright_status);
