import { supabase } from "../config/supabaseClient";
import type { PropType } from "../types";
import StarHalf from "/images/star-half-icon.png";

export async function getMenuItems() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  // Map the database structure back to the PropType structure
  // The 'star' icon is static for now as it's a local import in the original data.ts
  return (data || []).map((item) => ({
    id: Number(item.id),
    category: item.category,
    name: item.name,
    image: item.image,
    rating: item.rating,
    reviews: item.reviews,
    price: item.price,
    text: item.text,
    nutrients: item.nutrients || [],
    ingredients: item.ingredients || [],
    toppings: item.toppings || [],
    tag: item.tag || [],
    star: StarHalf, // Default star icon from the project
  })) as (PropType & { category: string })[];
}
