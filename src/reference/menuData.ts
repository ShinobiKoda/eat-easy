import { MenuItem, MainCategory, ProductType } from "@/types/menu";

// Placeholder images - using food-related placeholder patterns
const FOOD_IMAGES = {
  // EAT items
  avocadoToast: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
  chickenSalad: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  chickenBreast: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop",
  salmon: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  macCheese: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&h=300&fit=crop",
  powerBowl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  vegSalad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  steak: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  omelette: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
  tacos: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
  rice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
  wings: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
  ribs: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  
  // DRINK items
  smoothie: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
  latte: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  juice: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
  tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
  coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  milkshake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
  cocktail: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
  water: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
  
  // DESSERT items
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  brownie: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop",
  iceCream: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
  tiramisu: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  cheesecake: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop",
  macaron: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop",
  waffle: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop",
  donut: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop",
  pudding: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
};

const defaultNutrients = [
  { amount: "400", unit: "kcal" },
  { amount: "510", unit: "gram" },
  { amount: "30", unit: "proteins" },
  { amount: "56", unit: "carbs" },
  { amount: "24", unit: "fats" },
];

const defaultIngredients = [
  { name: "Fresh Vegetables", image: "/placeholder.svg" },
  { name: "Premium Protein", image: "/placeholder.svg" },
  { name: "Herbs & Spices", image: "/placeholder.svg" },
];

const defaultToppings = [
  { id: 1, name: "Extra portion", price: 4.2 },
  { id: 2, name: "Add cheese", price: 2.8 },
  { id: 3, name: "Extra sauce", price: 1.5 },
];

// Helper to create menu items
const createMenuItem = (
  id: number,
  name: string,
  image: string,
  rating: number,
  reviews: number,
  price: number,
  category: MainCategory,
  productTypes: ProductType[],
  tags: string[],
  description?: string
): MenuItem => ({
  id,
  name,
  image,
  rating,
  reviews,
  price,
  description,
  nutrients: defaultNutrients,
  ingredients: defaultIngredients,
  toppings: defaultToppings,
  tags,
  category,
  productTypes,
});

// EAT ITEMS (30+ items)
const eatItems: MenuItem[] = [
  createMenuItem(1, "Avocado and Egg Toast", FOOD_IMAGES.avocadoToast, 4.9, 120, 10.4, "EAT", ["breakfast"], ["Most Popular", "Breakfast", "Healthy"], "Crispy toast topped with creamy avocado and perfectly poached eggs"),
  createMenuItem(2, "Avocado Chicken Salad", FOOD_IMAGES.chickenSalad, 4.8, 98, 12.5, "EAT", ["lunch", "salad", "chicken"], ["Salad", "Chicken", "Most Popular"]),
  createMenuItem(3, "Grilled Chicken Breast", FOOD_IMAGES.chickenBreast, 4.7, 156, 14.9, "EAT", ["lunch", "dinner", "chicken", "grilled"], ["Grilled", "Chicken", "Protein"]),
  createMenuItem(4, "Curry Salmon Fillet", FOOD_IMAGES.salmon, 4.9, 87, 18.5, "EAT", ["dinner", "grilled"], ["Seafood", "Grilled", "Premium"]),
  createMenuItem(5, "Mac and Cheese", FOOD_IMAGES.macCheese, 4.6, 234, 11.2, "EAT", ["lunch", "pasta"], ["Pasta", "Comfort Food"]),
  createMenuItem(6, "Power Bowl", FOOD_IMAGES.powerBowl, 4.8, 145, 13.8, "EAT", ["lunch", "salad"], ["Vegan", "Healthy", "Salad"]),
  createMenuItem(7, "Vegetable Salad", FOOD_IMAGES.vegSalad, 4.5, 78, 9.9, "EAT", ["lunch", "salad"], ["Salad", "Vegan", "Light"]),
  createMenuItem(8, "Margherita Pizza", FOOD_IMAGES.pizza, 4.9, 312, 15.5, "EAT", ["lunch", "dinner", "pizza"], ["Pizza", "Most Popular", "Italian"]),
  createMenuItem(9, "Pepperoni Pizza", FOOD_IMAGES.pizza, 4.8, 289, 16.9, "EAT", ["lunch", "dinner", "pizza"], ["Pizza", "Spicy"]),
  createMenuItem(10, "Spaghetti Carbonara", FOOD_IMAGES.pasta, 4.7, 198, 14.5, "EAT", ["lunch", "dinner", "pasta"], ["Pasta", "Italian", "Creamy"]),
  createMenuItem(11, "Classic Burger", FOOD_IMAGES.burger, 4.8, 267, 13.9, "EAT", ["lunch", "dinner"], ["Burger", "Most Popular"]),
  createMenuItem(12, "Tomato Basil Soup", FOOD_IMAGES.soup, 4.5, 89, 7.5, "EAT", ["lunch", "soup"], ["Soup", "Vegan", "Comfort"]),
  createMenuItem(13, "Ribeye Steak", FOOD_IMAGES.steak, 4.9, 156, 24.9, "EAT", ["dinner", "grilled"], ["Grilled", "Premium", "Steak"]),
  createMenuItem(14, "Club Sandwich", FOOD_IMAGES.sandwich, 4.6, 134, 11.5, "EAT", ["breakfast", "lunch"], ["Sandwich", "Quick"]),
  createMenuItem(15, "Spanish Omelette", FOOD_IMAGES.omelette, 4.7, 98, 9.8, "EAT", ["breakfast"], ["Breakfast", "Eggs"]),
  createMenuItem(16, "Beef Tacos", FOOD_IMAGES.tacos, 4.8, 178, 12.9, "EAT", ["lunch", "dinner"], ["Mexican", "Spicy"]),
  createMenuItem(17, "Fried Rice Bowl", FOOD_IMAGES.rice, 4.5, 112, 10.5, "EAT", ["lunch", "dinner"], ["Asian", "Rice"]),
  createMenuItem(18, "Buffalo Wings", FOOD_IMAGES.wings, 4.7, 203, 13.5, "EAT", ["dinner", "chicken"], ["Chicken", "Spicy", "Most Popular"]),
  createMenuItem(19, "BBQ Ribs", FOOD_IMAGES.ribs, 4.9, 145, 22.5, "EAT", ["dinner", "grilled"], ["Grilled", "BBQ", "Premium"]),
  createMenuItem(20, "Caesar Salad", FOOD_IMAGES.vegSalad, 4.6, 167, 11.9, "EAT", ["lunch", "salad"], ["Salad", "Classic"]),
  createMenuItem(21, "Mushroom Risotto", FOOD_IMAGES.rice, 4.7, 89, 14.5, "EAT", ["dinner", "pasta"], ["Italian", "Creamy", "Vegan"]),
  createMenuItem(22, "Fish and Chips", FOOD_IMAGES.salmon, 4.5, 198, 15.9, "EAT", ["lunch", "dinner"], ["Seafood", "British"]),
  createMenuItem(23, "Chicken Tikka", FOOD_IMAGES.chickenBreast, 4.8, 156, 16.5, "EAT", ["dinner", "chicken", "grilled"], ["Indian", "Spicy", "Chicken"]),
  createMenuItem(24, "Veggie Burger", FOOD_IMAGES.burger, 4.4, 89, 12.5, "EAT", ["lunch", "dinner"], ["Vegan", "Burger"]),
  createMenuItem(25, "Penne Arrabbiata", FOOD_IMAGES.pasta, 4.6, 134, 12.9, "EAT", ["lunch", "dinner", "pasta"], ["Pasta", "Spicy", "Italian"]),
  createMenuItem(26, "Breakfast Burrito", FOOD_IMAGES.tacos, 4.7, 178, 11.5, "EAT", ["breakfast"], ["Breakfast", "Mexican"]),
  createMenuItem(27, "Minestrone Soup", FOOD_IMAGES.soup, 4.4, 67, 8.5, "EAT", ["lunch", "soup"], ["Soup", "Italian", "Vegan"]),
  createMenuItem(28, "Chicken Quesadilla", FOOD_IMAGES.tacos, 4.6, 145, 13.9, "EAT", ["lunch", "dinner", "chicken"], ["Mexican", "Chicken"]),
  createMenuItem(29, "Greek Salad", FOOD_IMAGES.vegSalad, 4.7, 112, 10.9, "EAT", ["lunch", "salad"], ["Salad", "Mediterranean"]),
  createMenuItem(30, "Lamb Chops", FOOD_IMAGES.ribs, 4.9, 78, 26.5, "EAT", ["dinner", "grilled"], ["Grilled", "Premium"]),
  createMenuItem(31, "Pancake Stack", FOOD_IMAGES.waffle, 4.8, 234, 9.9, "EAT", ["breakfast"], ["Breakfast", "Sweet", "Most Popular"]),
  createMenuItem(32, "Shrimp Scampi", FOOD_IMAGES.pasta, 4.7, 89, 18.9, "EAT", ["dinner", "pasta"], ["Seafood", "Pasta", "Italian"]),
  createMenuItem(33, "BBQ Chicken Pizza", FOOD_IMAGES.pizza, 4.8, 178, 17.5, "EAT", ["lunch", "dinner", "pizza", "chicken"], ["Pizza", "BBQ", "Chicken"]),
];

// DRINK ITEMS (20+ items)
const drinkItems: MenuItem[] = [
  createMenuItem(101, "Orange Smoothie", FOOD_IMAGES.smoothie, 4.8, 98, 4.5, "DRINK", [], ["Smoothie", "Fruity", "Healthy"]),
  createMenuItem(102, "Avocado Shake", FOOD_IMAGES.smoothie, 4.7, 76, 5.2, "DRINK", [], ["Smoothie", "Creamy"]),
  createMenuItem(103, "Iced Latte", FOOD_IMAGES.latte, 4.6, 210, 3.8, "DRINK", [], ["Coffee", "Cold", "Most Popular"]),
  createMenuItem(104, "Ginger Tea", FOOD_IMAGES.tea, 4.5, 44, 2.4, "DRINK", [], ["Tea", "Herbal", "Healthy"]),
  createMenuItem(105, "Detox Green Juice", FOOD_IMAGES.juice, 4.7, 63, 6.0, "DRINK", [], ["Juice", "Healthy", "Vegan"]),
  createMenuItem(106, "Berry Blast Smoothie", FOOD_IMAGES.smoothie, 4.9, 150, 5.9, "DRINK", [], ["Smoothie", "Fruity", "Most Popular"]),
  createMenuItem(107, "Cappuccino", FOOD_IMAGES.coffee, 4.8, 189, 3.5, "DRINK", [], ["Coffee", "Hot", "Classic"]),
  createMenuItem(108, "Chocolate Milkshake", FOOD_IMAGES.milkshake, 4.7, 167, 5.5, "DRINK", [], ["Milkshake", "Sweet"]),
  createMenuItem(109, "Fresh Lemonade", FOOD_IMAGES.juice, 4.6, 134, 3.2, "DRINK", [], ["Juice", "Refreshing"]),
  createMenuItem(110, "Matcha Latte", FOOD_IMAGES.latte, 4.8, 112, 4.8, "DRINK", [], ["Tea", "Japanese", "Healthy"]),
  createMenuItem(111, "Mango Lassi", FOOD_IMAGES.smoothie, 4.7, 89, 4.5, "DRINK", [], ["Smoothie", "Indian", "Fruity"]),
  createMenuItem(112, "Espresso Shot", FOOD_IMAGES.coffee, 4.5, 178, 2.5, "DRINK", [], ["Coffee", "Strong"]),
  createMenuItem(113, "Strawberry Shake", FOOD_IMAGES.milkshake, 4.8, 145, 5.2, "DRINK", [], ["Milkshake", "Fruity"]),
  createMenuItem(114, "Chai Latte", FOOD_IMAGES.tea, 4.6, 98, 4.2, "DRINK", [], ["Tea", "Spiced", "Warm"]),
  createMenuItem(115, "Watermelon Juice", FOOD_IMAGES.juice, 4.7, 78, 4.0, "DRINK", [], ["Juice", "Refreshing", "Summer"]),
  createMenuItem(116, "Mocha Frappuccino", FOOD_IMAGES.milkshake, 4.8, 156, 5.8, "DRINK", [], ["Coffee", "Cold", "Sweet"]),
  createMenuItem(117, "Sparkling Water", FOOD_IMAGES.water, 4.2, 45, 1.5, "DRINK", [], ["Water", "Light"]),
  createMenuItem(118, "Tropical Punch", FOOD_IMAGES.cocktail, 4.6, 89, 4.8, "DRINK", [], ["Mocktail", "Fruity", "Tropical"]),
  createMenuItem(119, "Vanilla Latte", FOOD_IMAGES.latte, 4.7, 134, 4.2, "DRINK", [], ["Coffee", "Sweet"]),
  createMenuItem(120, "Protein Shake", FOOD_IMAGES.smoothie, 4.5, 67, 6.5, "DRINK", [], ["Smoothie", "Fitness", "Healthy"]),
  createMenuItem(121, "Hot Chocolate", FOOD_IMAGES.coffee, 4.8, 178, 4.0, "DRINK", [], ["Hot", "Sweet", "Comfort"]),
  createMenuItem(122, "Mint Mojito", FOOD_IMAGES.cocktail, 4.7, 112, 4.5, "DRINK", [], ["Mocktail", "Refreshing", "Mint"]),
];

// DESSERT ITEMS (20+ items)
const dessertItems: MenuItem[] = [
  createMenuItem(201, "Red Velvet Cake", FOOD_IMAGES.cake, 4.7, 74, 4.8, "DESSERT", [], ["Cake", "Most Popular"]),
  createMenuItem(202, "Salted Caramel Brownie", FOOD_IMAGES.brownie, 4.6, 88, 4.4, "DESSERT", [], ["Brownie", "Chocolate"]),
  createMenuItem(203, "Vanilla Ice Cream", FOOD_IMAGES.iceCream, 4.8, 156, 3.5, "DESSERT", [], ["Ice Cream", "Classic"]),
  createMenuItem(204, "Classic Tiramisu", FOOD_IMAGES.tiramisu, 4.8, 141, 5.6, "DESSERT", [], ["Italian", "Coffee", "Most Popular"]),
  createMenuItem(205, "New York Cheesecake", FOOD_IMAGES.cheesecake, 4.9, 189, 5.9, "DESSERT", [], ["Cheesecake", "Classic", "Most Popular"]),
  createMenuItem(206, "Macaron Mix of Five", FOOD_IMAGES.macaron, 4.5, 45, 4.2, "DESSERT", [], ["French", "Delicate"]),
  createMenuItem(207, "Waffle with Berries", FOOD_IMAGES.waffle, 4.8, 146, 6.6, "DESSERT", [], ["Waffle", "Fruity", "Most Popular"]),
  createMenuItem(208, "Chocolate Donut", FOOD_IMAGES.donut, 4.5, 98, 2.8, "DESSERT", [], ["Donut", "Chocolate"]),
  createMenuItem(209, "Crème Brûlée", FOOD_IMAGES.pudding, 4.8, 119, 5.5, "DESSERT", [], ["French", "Creamy"]),
  createMenuItem(210, "Butter Croissant", FOOD_IMAGES.croissant, 4.7, 167, 3.2, "DESSERT", [], ["French", "Pastry"]),
  createMenuItem(211, "Chocolate Lava Cake", FOOD_IMAGES.brownie, 4.9, 178, 6.2, "DESSERT", [], ["Chocolate", "Hot", "Most Popular"]),
  createMenuItem(212, "Strawberry Cheesecake", FOOD_IMAGES.cheesecake, 4.8, 134, 6.5, "DESSERT", [], ["Cheesecake", "Fruity"]),
  createMenuItem(213, "Pistachio Gelato", FOOD_IMAGES.iceCream, 4.7, 89, 4.2, "DESSERT", [], ["Ice Cream", "Italian"]),
  createMenuItem(214, "Apple Pie", FOOD_IMAGES.cake, 4.6, 112, 4.8, "DESSERT", [], ["Pie", "Classic", "Warm"]),
  createMenuItem(215, "Churros", FOOD_IMAGES.donut, 4.8, 145, 4.5, "DESSERT", [], ["Spanish", "Fried"]),
  createMenuItem(216, "Panna Cotta", FOOD_IMAGES.pudding, 4.7, 78, 4.9, "DESSERT", [], ["Italian", "Creamy"]),
  createMenuItem(217, "Banana Split", FOOD_IMAGES.iceCream, 4.6, 98, 5.8, "DESSERT", [], ["Ice Cream", "Classic"]),
  createMenuItem(218, "Carrot Cake", FOOD_IMAGES.cake, 4.5, 67, 4.5, "DESSERT", [], ["Cake", "Spiced"]),
  createMenuItem(219, "Chocolate Mousse", FOOD_IMAGES.pudding, 4.8, 123, 5.2, "DESSERT", [], ["Chocolate", "Light"]),
  createMenuItem(220, "Fruit Tart", FOOD_IMAGES.cake, 4.7, 89, 5.5, "DESSERT", [], ["Tart", "Fruity"]),
];

// Combined menu data
export const menuData: MenuItem[] = [...eatItems, ...drinkItems, ...dessertItems];

// Helper functions
export const getItemsByCategory = (category: MainCategory): MenuItem[] => {
  return menuData.filter((item) => item.category === category);
};

export const filterItems = (
  items: MenuItem[],
  productTypes: ProductType[],
  ratings: number[],
  priceRange: [number, number]
): MenuItem[] => {
  return items.filter((item) => {
    // Product type filter (only for EAT category)
    if (productTypes.length > 0 && item.category === "EAT") {
      const hasMatchingType = item.productTypes.some((type) =>
        productTypes.includes(type)
      );
      if (!hasMatchingType) return false;
    }

    // Rating filter
    if (ratings.length > 0) {
      const itemRatingFloor = Math.floor(item.rating);
      if (!ratings.includes(itemRatingFloor)) return false;
    }

    // Price range filter
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }

    return true;
  });
};
