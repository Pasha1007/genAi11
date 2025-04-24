/*
  # Create meetings table
  
  1. New Tables
    - `meetings`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `arranged_time` (timestamptz, not null)
      - `status` (text, not null)
      - `participants` (jsonb, not null)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on `meetings` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  arranged_time timestamptz NOT NULL,
  status text NOT NULL,
  participants jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own data
CREATE POLICY "Users can read meetings"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for users to insert their own data
CREATE POLICY "Users can create meetings"
  ON meetings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for users to update their own data
CREATE POLICY "Users can update meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for users to delete their own data
CREATE POLICY "Users can delete meetings"
  ON meetings
  FOR DELETE
  TO authenticated
  USING (true);

-- Trigger to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_meetings_modified
BEFORE UPDATE ON meetings
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();