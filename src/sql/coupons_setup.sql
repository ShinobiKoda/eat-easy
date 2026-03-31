-- ============================================================
-- coupons_setup.sql: eat_easy_coupons table and RLS policies
-- Run this in your Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS eat_easy_coupons (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code        TEXT NOT NULL UNIQUE,
  type        TEXT NOT NULL, -- 'welcome' | 'milestone' | 'free_drink'
  description TEXT NOT NULL,
  discount_percent  NUMERIC(5,2) DEFAULT 0,
  is_free_item      BOOLEAN DEFAULT false,
  is_used     BOOLEAN DEFAULT false,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Turn on Row Level Security
ALTER TABLE eat_easy_coupons ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can interact with their own coupons
CREATE POLICY "Users can manage their own coupons"
  ON eat_easy_coupons
  FOR ALL
  USING (auth.uid() = user_id);

-- Policy 2: Admins can view all coupons
-- Requires the public.is_admin() function created in admin_setup.sql
CREATE POLICY "Admins can view all coupons"
  ON eat_easy_coupons
  FOR SELECT
  USING (public.is_admin());
