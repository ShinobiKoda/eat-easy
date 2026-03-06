-- ============================================================
-- eat_easy_orders: stores completed orders per user
-- Run this in your Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE eat_easy_orders (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  restaurant_name TEXT NOT NULL DEFAULT 'Gram Bistro',

  -- Array of ordered items: [{ id, name, image, price, qty }]
  items      JSONB NOT NULL DEFAULT '[]'::jsonb,

  subtotal   NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tip        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total      NUMERIC(10, 2) NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Row Level Security ──
ALTER TABLE eat_easy_orders ENABLE ROW LEVEL SECURITY;

-- Users can only read their own orders
CREATE POLICY "Users can view own orders"
  ON eat_easy_orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own orders
CREATE POLICY "Users can insert own orders"
  ON eat_easy_orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fast user-based lookups
CREATE INDEX idx_eat_easy_orders_user_id ON eat_easy_orders(user_id);
