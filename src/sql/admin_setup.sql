-- ============================================================
-- admin_setup.sql: Admin role and RLS policies
-- Run this in your Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add is_admin column to profile table
ALTER TABLE eat_easy_profile ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Create index on is_admin for faster lookups
CREATE INDEX IF NOT EXISTS idx_eat_easy_profile_is_admin ON eat_easy_profile(is_admin);

-- 3. Create a helper function to check admin status without triggering RLS recursively
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Bypasses RLS to avoid infinite recursion
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.eat_easy_profile
    WHERE user_id = auth.uid() AND is_admin = true
  );
END;
$$;

-- 4. Add admin read policies to all relevant tables

-- Drop the broken recursive policy if you already created it
DROP POLICY IF EXISTS "Admins can view all profiles" ON eat_easy_profile;

-- 4.1 Profile Table
CREATE POLICY "Admins can view all profiles"
  ON eat_easy_profile
  FOR SELECT
  USING (
    public.is_admin()
  );

-- Drop previous policies just in case
DROP POLICY IF EXISTS "Admins can view all orders" ON eat_easy_orders;
-- 4.2 Orders Table
CREATE POLICY "Admins can view all orders"
  ON eat_easy_orders
  FOR SELECT
  USING (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can view all cards" ON eat_easy_cards;
-- 4.3 Cards Table
-- (Assuming this table has RLS enabled already)
CREATE POLICY "Admins can view all cards"
  ON eat_easy_cards
  FOR SELECT
  USING (
    public.is_admin()
  );

DROP POLICY IF EXISTS "Admins can view all recommendations" ON recommendations;
-- 4.4 Recommendations Table
CREATE POLICY "Admins can view all recommendations"
  ON recommendations
  FOR SELECT
  USING (
    public.is_admin()
  );

-- IMPORTANT: You must manually set your own user account's is_admin to true
-- Update via Supabase UI or run:
-- UPDATE eat_easy_profile SET is_admin = true WHERE email = 'your_email@example.com';
