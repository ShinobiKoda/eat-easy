-- Create recommendations table for storing AI-generated food recommendations
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  moods TEXT[] NOT NULL DEFAULT '{}',
  budget_range TEXT NOT NULL DEFAULT 'any',
  party_size TEXT NOT NULL DEFAULT 'solo',
  food_preferences TEXT[] NOT NULL DEFAULT '{}',
  item_ids INT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast user lookups (most recent first)
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id
  ON recommendations(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Users can only read their own recommendations
CREATE POLICY "Users can read own recommendations"
  ON recommendations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own recommendations
CREATE POLICY "Users can insert own recommendations"
  ON recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own recommendations
CREATE POLICY "Users can delete own recommendations"
  ON recommendations FOR DELETE
  USING (auth.uid() = user_id);
