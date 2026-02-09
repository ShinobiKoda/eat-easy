-- Create the menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id BIGINT PRIMARY KEY,
    category TEXT NOT NULL, -- 'Eat', 'Drink', or 'Dessert'
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    rating FLOAT4 NOT NULL DEFAULT 0,
    reviews INT4 NOT NULL DEFAULT 0,
    price FLOAT4 NOT NULL DEFAULT 0,
    text TEXT,
    nutrients JSONB NOT NULL DEFAULT '[]',
    ingredients JSONB NOT NULL DEFAULT '[]',
    toppings JSONB NOT NULL DEFAULT '[]',
    tag TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read the menu (idempotent)
DROP POLICY IF EXISTS "Allow public read access" ON public.menu_items;
CREATE POLICY "Allow public read access" ON public.menu_items
    FOR SELECT USING (true);
