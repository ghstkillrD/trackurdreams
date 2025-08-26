-- Migration: Add missing columns to ai_insights table
-- Run this in your Supabase SQL editor to update the existing table

-- Add user_id column
ALTER TABLE ai_insights ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Add themes column
ALTER TABLE ai_insights ADD COLUMN IF NOT EXISTS themes TEXT[];

-- Add emotions column
ALTER TABLE ai_insights ADD COLUMN IF NOT EXISTS emotions TEXT[];

-- Add connections column
ALTER TABLE ai_insights ADD COLUMN IF NOT EXISTS connections TEXT[];

-- Add summary column
ALTER TABLE ai_insights ADD COLUMN IF NOT EXISTS summary TEXT;

-- Update existing records to set user_id based on the dream's user_id
UPDATE ai_insights 
SET user_id = dreams.user_id 
FROM dreams 
WHERE ai_insights.dream_id = dreams.id 
AND ai_insights.user_id IS NULL;

-- Make user_id NOT NULL after populating existing records
ALTER TABLE ai_insights ALTER COLUMN user_id SET NOT NULL;

-- Add index for user_id
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
