-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access for restaurants" ON public.restaurants
    FOR SELECT USING (true);

-- Insert initial restaurant data
INSERT INTO public.restaurants (name, location, image, description)
VALUES 
    ('Gram Bistro', '790 8th Ave, New York', '/images/gram.svg', 'Welcome to Gram Bistro Restaurant. Find your flavor and browse our menu.'),
    ('Bin 71', '790 8th Ave, New York', '/images/bin.svg', 'Experience Italian excellence at Bin 71. Fine wines and authentic cuisine.'),
    ('Sushi Bar', '790 8th Ave, New York', '/images/sushi.svg', 'Fresh flavors and artistic presentation. The best sushi in the heart of the city.')
ON CONFLICT DO NOTHING;
