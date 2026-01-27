export type Nutrient = {
  amount: string;
  unit: string;
}

export type Ingredient = {
  ingname: string;
  ingimage: string;
}

export type Topping = {
  id: number;
  name: string;
  price: number;
}

export type FoodTag =
  | "Most Popular"
  | "Salad"
  | "Pizza"
  | "Pasta"
  | "Dessert"
  | "Burger"
  | "Soup"
  | "Grill"
  | "Vegan"
  | "Chicken"
  | "Breakfast";

export type PropType = {
  id: number;
  image: string;
  name: string;
  rating: number;
  star: string;
  reviews: number;
  price: number;
  text?: string;
  nutrients: Nutrient[];
  ingredients: Ingredient[];
  toppings: Topping[];
  tag?: FoodTag[];
};