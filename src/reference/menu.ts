export type MainCategory = "EAT" | "DRINK" | "DESSERT";

export type ProductType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "pizza"
  | "pasta"
  | "chicken"
  | "grilled"
  | "salad"
  | "soup";

export interface Nutrient {
  amount: string;
  unit: string;
}

export interface Ingredient {
  name: string;
  image: string;
}

export interface Topping {
  id: number;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  description?: string;
  nutrients: Nutrient[];
  ingredients: Ingredient[];
  toppings: Topping[];
  tags: string[];
  category: MainCategory;
  productTypes: ProductType[];
}

export interface FilterState {
  mainCategory: MainCategory;
  productTypes: ProductType[];
  ratings: number[];
  priceRange: [number, number];
}

export const PRODUCT_TYPES: ProductType[] = [
  "breakfast",
  "lunch",
  "dinner",
  "pizza",
  "pasta",
  "chicken",
  "grilled",
  "salad",
  "soup",
];

export const RATING_OPTIONS = [1, 2, 3, 4, 5];

export const PRICE_MIN = 1.0;
export const PRICE_MAX = 6.0;
