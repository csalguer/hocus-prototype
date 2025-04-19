/*
  # Initial Schema for Vietnamese Learning Platform

  1. New Tables
    - users
      - Stores user information and progress
    - vocabulary_items
      - Stores vocabulary words with translations and examples
    - units
      - Contains learning units organized by level
    - lessons
      - Individual lessons within units
    - user_progress
      - Tracks user completion and scores

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  current_level text NOT NULL DEFAULT 'A1',
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_level CHECK (current_level IN ('A1', 'A2', 'B1', 'B2', 'C1'))
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Vocabulary items table
CREATE TABLE IF NOT EXISTS vocabulary_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vietnamese text NOT NULL,
  english text NOT NULL,
  pronunciation text NOT NULL,
  example text,
  level text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_level CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1'))
);

ALTER TABLE vocabulary_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read vocabulary items"
  ON vocabulary_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Units table
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  level text NOT NULL,
  description text NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_level CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1'))
);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read units"
  ON units
  FOR SELECT
  TO authenticated
  USING (true);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES units(id),
  title text NOT NULL,
  type text NOT NULL,
  content jsonb NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('vocabulary', 'grammar', 'speaking', 'listening'))
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (true);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  lesson_id uuid REFERENCES lessons(id),
  completed boolean DEFAULT false,
  score integer DEFAULT 0,
  last_attempt timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= 100)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
