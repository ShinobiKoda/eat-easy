import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Eat, Drink, Dessert } from '../data/data.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('Starting migration...');

  const allItems = [
    ...Eat.map(item => ({ ...item, category: 'Eat', id: item.id })),
    ...Drink.map(item => ({ ...item, category: 'Drink', id: item.id + 100 })),
    ...Dessert.map(item => ({ ...item, category: 'Dessert', id: item.id + 200 })),
  ].map(item => ({
    id: item.id,
    category: item.category,
    name: item.name,
    image: item.image,
    rating: item.rating,
    reviews: item.reviews,
    price: item.price,
    text: item.text || '',
    nutrients: item.nutrients,
    ingredients: item.ingredients,
    toppings: item.toppings,
    tag: item.tag || []
  }));

  const { data, error } = await supabase
    .from('menu_items')
    .upsert(allItems, { onConflict: 'id' });

  if (error) {
    console.error('Migration failed:', error.message);
  } else {
    console.log(`Successfully migrated ${allItems.length} items!`);
  }
}

migrate();
