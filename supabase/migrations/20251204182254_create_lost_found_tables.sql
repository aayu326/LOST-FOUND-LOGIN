/*
  # Lost & Found System - Initial Schema

  1. New Tables
    - `lost_items`
      - `id` (uuid, primary key) - Unique identifier for lost item
      - `title` (text) - Name/title of the lost item
      - `description` (text) - Detailed description
      - `image_url` (text) - URL to uploaded image in Supabase Storage
      - `color` (text) - Primary color of the item
      - `location` (text) - Where the item was lost
      - `date_lost` (date) - When the item was lost
      - `contact_name` (text) - Name of person who lost the item
      - `contact_info` (text) - Contact information (phone/email)
      - `status` (text) - Status: 'active', 'found', 'closed'
      - `created_at` (timestamptz) - When the report was created

    - `found_items`
      - `id` (uuid, primary key) - Unique identifier for found item
      - `title` (text) - Name/title of the found item
      - `description` (text) - Detailed description
      - `image_url` (text) - URL to uploaded image
      - `color` (text) - Primary color of the item
      - `location` (text) - Where the item was found
      - `date_found` (date) - When the item was found
      - `contact_name` (text) - Name of person who found the item
      - `contact_info` (text) - Contact information
      - `status` (text) - Status: 'active', 'matched', 'returned'
      - `created_at` (timestamptz) - When the report was created

    - `matches`
      - `id` (uuid, primary key) - Unique identifier for match
      - `lost_item_id` (uuid) - Reference to lost item
      - `found_item_id` (uuid) - Reference to found item
      - `similarity_score` (numeric) - AI matching score (0-100)
      - `status` (text) - Status: 'pending', 'confirmed', 'rejected'
      - `created_at` (timestamptz) - When the match was created

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (anyone can view lost/found items)
    - Add policies for public insert access (anyone can report items)
    - Add policies for matches table access

  3. Storage
    - Create storage bucket for item images
*/

-- Create lost_items table
CREATE TABLE IF NOT EXISTS lost_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  color text NOT NULL,
  location text NOT NULL,
  date_lost date NOT NULL,
  contact_name text NOT NULL,
  contact_info text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'found', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Create found_items table
CREATE TABLE IF NOT EXISTS found_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  color text NOT NULL,
  location text NOT NULL,
  date_found date NOT NULL,
  contact_name text NOT NULL,
  contact_info text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'matched', 'returned')),
  created_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lost_item_id uuid NOT NULL REFERENCES lost_items(id) ON DELETE CASCADE,
  found_item_id uuid NOT NULL REFERENCES found_items(id) ON DELETE CASCADE,
  similarity_score numeric NOT NULL CHECK (similarity_score >= 0 AND similarity_score <= 100),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(lost_item_id, found_item_id)
);

-- Enable Row Level Security
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policies for lost_items (public access for MVP)
CREATE POLICY "Anyone can view lost items"
  ON lost_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can report lost items"
  ON lost_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update lost items"
  ON lost_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policies for found_items (public access for MVP)
CREATE POLICY "Anyone can view found items"
  ON found_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can report found items"
  ON found_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update found items"
  ON found_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policies for matches (public access for MVP)
CREATE POLICY "Anyone can view matches"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create matches"
  ON matches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update matches"
  ON matches FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('item-images', 'item-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (public access for MVP)
CREATE POLICY "Anyone can upload item images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'item-images');

CREATE POLICY "Anyone can view item images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'item-images');

CREATE POLICY "Anyone can update item images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'item-images')
  WITH CHECK (bucket_id = 'item-images');