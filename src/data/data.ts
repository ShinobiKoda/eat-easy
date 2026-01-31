import StarHalf from "/images/star-half-icon.png";

import type { PropType } from "../types"

export const Eat: PropType[] = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop", name: "Avocado and Egg Toast", rating: 4.9, star: StarHalf, reviews: 120, price: 10.4, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "Crispy toast topped with creamy avocado and perfectly poached eggs", tag: ["Most Popular", "Breakfast", "Healthy"] 
  },
  
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop", name: "Avocado Chicken Salad", rating: 4.8, star: StarHalf, reviews: 98, price: 12.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Salad", "Chicken", "Most Popular"] 
  },
  
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop", name: "Grilled Chicken Breast", rating: 4.7, star: StarHalf, reviews: 156, price: 14.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Grill", "Chicken", "Protein"] 
  },
  
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", name: "Curry Salmon Fillet", rating: 4.9, star: StarHalf, reviews: 87, price: 18.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Seafood", "Grill", "Premium"] 
  },
  
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400&h=300&fit=crop", name: "Mac and Cheese", rating: 4.6, star: StarHalf, reviews: 234, price: 11.2, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pasta", "Comfort Food"] 
  },
  
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", name: "Power Bowl", rating: 4.8, star: StarHalf, reviews: 145, price: 13.8, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Vegan", "Healthy", "Salad"] 
  },
  
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", name: "Vegetable Salad", rating: 4.5, star: StarHalf, reviews: 78, price: 9.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Salad", "Vegan", "Light"] 
  },
  
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", name: "Margherita Pizza", rating: 4.9, star: StarHalf, reviews: 312, price: 15.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pizza", "Most Popular", "Italian"] 
  },
  
  { 
    id: 9, 
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", name: "Pepperoni Pizza", rating: 4.8, star: StarHalf, reviews: 289, price: 16.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pizza", "Spicy"] 
  },
  
  { 
    id: 10,
     image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", name: "Spaghetti Carbonara", rating: 4.7, star: StarHalf, reviews: 198, price: 14.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pasta", "Italian", "Creamy"] 
  },
  
  { 
    id: 11,
     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", name: "Classic Burger", rating: 3.8, star: StarHalf, reviews: 267, price: 13.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Burger", "Most Popular"] 
  },
  
  { 
    id: 12,
     image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", name: "Tomato Basil Soup", rating: 2.9, star: StarHalf, reviews: 89, price: 7.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Soup", "Vegan", "Comfort"] 
  },
  
  { 
    id: 13,
     image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop", name: "Ribeye Steak", rating: 4.2, star: StarHalf, reviews: 156, price: 24.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Grill", "Premium", "Steak"] 
  },
  
  { 
    id: 14,
     image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop", name: "Club Sandwich", rating: 3.5, star: StarHalf, reviews: 134, price: 11.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Sandwich", "Quick"] 
  },
  
  { 
    id: 15,
     image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop", name: "Spanish Omelette", rating: 3.2, star: StarHalf, reviews: 98, price: 9.8, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Breakfast", "Eggs"] 
  },
  
  { 
    id: 16,
     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", name: "Beef Tacos", rating: 3.9, star: StarHalf, reviews: 178, price: 12.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Mexican", "Spicy"] 
  },
  
  { 
    id: 17,
     image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", name: "Fried Rice Bowl", rating: 3.0, star: StarHalf, reviews: 112, price: 10.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Asian", "Rice"] 
  },
  
  { 
    id: 18,
     image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop", name: "Buffalo Wings", rating: 4.1, star: StarHalf, reviews: 203, price: 13.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Chicken", "Spicy", "Most Popular"] 
  },
  
  { 
    id: 19,
     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", name: "BBQ Ribs", rating: 4.6, star: StarHalf, reviews: 145, price: 22.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Grill", "BBQ", "Premium"] 
  },
  
  { 
    id: 20,
     image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", name: "Caesar Salad", rating: 3.7, star: StarHalf, reviews: 167, price: 11.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Salad", "Classic"] 
  },
  
  { 
    id: 21,
     image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", name: "Mushroom Risotto", rating: 4.7, star: StarHalf, reviews: 89, price: 14.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Italian", "Creamy", "Vegan"] 
  },
  
  { 
    id: 22,
     image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", name: "Fish and Chips", rating: 4.5, star: StarHalf, reviews: 198, price: 15.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Seafood", "British"] 
  },
  
  { 
    id: 23,
     image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop", name: "Chicken Tikka", rating: 4.8, star: StarHalf, reviews: 156, price: 16.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Indian", "Spicy", "Chicken"] 
  },
  
  { 
    id: 24,
     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", name: "Veggie Burger", rating: 4.4, star: StarHalf, reviews: 89, price: 12.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Vegan", "Burger"] 
  },
  
  { 
    id: 25,
     image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", name: "Penne Arrabbiata", rating: 4.6, star: StarHalf, reviews: 134, price: 12.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pasta", "Spicy", "Italian"] 
  },
  
  { 
    id: 26,
     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", name: "Breakfast Burrito", rating: 4.7, star: StarHalf, reviews: 178, price: 11.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Breakfast", "Mexican"] 
  },
  
  { 
    id: 27,
     image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", name: "Minestrone Soup", rating: 4.4, star: StarHalf, reviews: 67, price: 8.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Soup", "Italian", "Vegan"] 
  },
  
  { 
    id: 28,
     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", name: "Chicken Quesadilla", rating: 4.6, star: StarHalf, reviews: 145, price: 13.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Mexican", "Chicken"] 
  },
  
  { 
    id: 29,
     image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", name: "Greek Salad", rating: 4.7, star: StarHalf, reviews: 112, price: 10.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Salad", "Mediterranean"] 
  },
  
  { 
    id: 30,
     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", name: "Lamb Chops", rating: 4.9, star: StarHalf, reviews: 78, price: 26.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Grill", "Premium"] 
  },
  
  { 
    id: 31,
     image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop", name: "Pancake Stack", rating: 4.8, star: StarHalf, reviews: 234, price: 9.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Breakfast", "Sweet", "Most Popular"] 
  },
  
  { 
    id: 32,
     image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", name: "Shrimp Scampi", rating: 4.7, star: StarHalf, reviews: 89, price: 18.9, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Seafood", "Pasta", "Italian"] 
  },
  
  { 
    id: 33,
     image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", name: "BBQ Chicken Pizza", rating: 4.8, star: StarHalf, reviews: 178, price: 17.5, 
    nutrients: [
      { amount: "400", unit: "kcal" }, { amount: "510", unit: "gram" }, { amount: "30", unit: "proteins" }, { amount: "56", unit: "carbs" }, { amount: "24", unit: "fats" }
    ], 
    ingredients: [
      { ingname: "Fresh Vegetables", ingimage: "/placeholder.svg" }, { ingname: "Premium Protein", ingimage: "/placeholder.svg" }, { ingname: "Herbs & Spices", ingimage: "/placeholder.svg" }
    ], 
    toppings: [
      { id: 1, name: "Extra portion", price: 4.2 }, { id: 2, name: "Add cheese", price: 2.8 }, { id: 3, name: "Extra sauce", price: 1.5 }
    ], 
    text: "", tag: ["Pizza", "BBQ", "Chicken"] 
  },
  
]

export const Drink: PropType[] = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", name: "Orange Smoothie", rating: 4.8, star: StarHalf, reviews: 98, price: 4.5, 
    nutrients: [], ingredients: [], toppings: [], text: "Fresh orange juice blended with yogurt and honey", tag: ["Smoothie", "Healthy", "Refreshing"] 
  },
  
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop", name: "Avocado Shake", rating: 4.7, star: StarHalf, reviews: 76, price: 5.2, 
    nutrients: [], ingredients: [], toppings: [], text: "Creamy avocado blended with milk and sweetener", tag: ["Smoothie", "Healthy"] 
  },
  
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop", name: "Iced Latte", rating: 4.6, star: StarHalf, reviews: 210, price: 3.8, 
    nutrients: [], ingredients: [], toppings: [], text: "Chilled espresso with cold milk", tag: ["Coffee", "Cold"] 
  },
  
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1553909489-cd47e9adbef1?w=400&h=300&fit=crop", name: "Ginger Tea", rating: 4.5, star: StarHalf, reviews: 44, price: 2.4, 
    nutrients: [], ingredients: [], toppings: [], text: "Warm ginger tea with lemon", tag: ["Tea", "Healthy"] 
  },
  
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=400&h=300&fit=crop", name: "Detox Green Juice", rating: 4.7, star: StarHalf, reviews: 63, price: 6.0, 
    nutrients: [], ingredients: [], toppings: [], text: "Green vegetables and fruits juice", tag: ["Juice", "Detox", "Healthy"] 
  },
  
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Berry Blast", rating: 4.9, star: StarHalf, reviews: 150, price: 5.9, 
    nutrients: [], ingredients: [], toppings: [], text: "Mixed berries smoothie", tag: ["Smoothie", "Healthy"] 
  },
  
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop", name: "Hot Chocolate", rating: 4.8, star: StarHalf, reviews: 89, price: 4.2, 
    nutrients: [], ingredients: [], toppings: [], text: "Rich hot chocolate with marshmallows", tag: ["Hot", "Sweet"] 
  },
  
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop", name: "Cappuccino", rating: 4.7, star: StarHalf, reviews: 145, price: 4.5, 
    nutrients: [], ingredients: [], toppings: [], text: "Classic cappuccino with foam", tag: ["Coffee", "Hot"] 
  },
  
  { 
    id: 9, 
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", name: "Mango Smoothie", rating: 4.6, star: StarHalf, reviews: 112, price: 4.8, 
    nutrients: [], ingredients: [], toppings: [], text: "Sweet mango blended smoothie", tag: ["Smoothie", "Tropical"] 
  },
  
  { 
    id: 10,
     image: "https://images.unsplash.com/photo-1553909489-cd47e9adbef1?w=400&h=300&fit=crop", name: "Chamomile Tea", rating: 4.4, star: StarHalf, reviews: 67, price: 2.2, 
     nutrients: [], ingredients: [], toppings: [], text: "Calming chamomile tea", tag: ["Tea", "Relaxing"] 
  },
  
  { 
    id: 11,
     image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop", name: "Banana Shake", rating: 4.5, star: StarHalf, reviews: 98, price: 4.9, 
     nutrients: [], ingredients: [], toppings: [], text: "Banana blended with milk", tag: ["Smoothie", "Healthy"] 
  },
  
  { 
    id: 12,
     image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop", name: "Espresso", rating: 4.8, star: StarHalf, reviews: 178, price: 2.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Strong espresso shot", tag: ["Coffee", "Strong"] 
  },
  
  { 
    id: 13,
     image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=400&h=300&fit=crop", name: "Carrot Juice", rating: 4.6, star: StarHalf, reviews: 134, price: 5.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Fresh carrot juice", tag: ["Juice", "Healthy"] 
  },
  
  { 
    id: 14,
     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Strawberry Smoothie", rating: 4.7, star: StarHalf, reviews: 156, price: 5.2, 
     nutrients: [], ingredients: [], toppings: [], text: "Strawberry blended smoothie", tag: ["Smoothie", "Sweet"] 
  },
  
  { 
    id: 15,
     image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop", name: "Mocha", rating: 4.9, star: StarHalf, reviews: 203, price: 4.8, 
     nutrients: [], ingredients: [], toppings: [], text: "Coffee with chocolate", tag: ["Coffee", "Sweet"] 
  },
  
  { 
    id: 16,
     image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop", name: "Americano", rating: 4.5, star: StarHalf, reviews: 89, price: 3.2, 
     nutrients: [], ingredients: [], toppings: [], text: "Espresso with hot water", tag: ["Coffee", "Simple"] 
  },
  
  { 
    id: 17,
     image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", name: "Pineapple Smoothie", rating: 4.8, star: StarHalf, reviews: 145, price: 5.0, 
     nutrients: [], ingredients: [], toppings: [], text: "Pineapple blended smoothie", tag: ["Smoothie", "Tropical"] 
  },
  
  { 
    id: 18,
     image: "https://images.unsplash.com/photo-1553909489-cd47e9adbef1?w=400&h=300&fit=crop", name: "Peppermint Tea", rating: 4.6, star: StarHalf, reviews: 78, price: 2.3, 
     nutrients: [], ingredients: [], toppings: [], text: "Refreshing peppermint tea", tag: ["Tea", "Refreshing"] 
  },
  
  { 
    id: 19,
     image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop", name: "Kiwi Shake", rating: 4.7, star: StarHalf, reviews: 112, price: 5.1, 
     nutrients: [], ingredients: [], toppings: [], text: "Kiwi blended shake", tag: ["Smoothie", "Healthy"] 
  },
  
  { 
    id: 20,
     image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop", name: "Macchiato", rating: 4.8, star: StarHalf, reviews: 167, price: 4.0, 
     nutrients: [], ingredients: [], toppings: [], text: "Espresso with milk foam", tag: ["Coffee", "Italian"] 
  },
  
  { 
    id: 21,
     image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=400&h=300&fit=crop", name: "Apple Juice", rating: 4.4, star: StarHalf, reviews: 67, price: 4.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Fresh apple juice", tag: ["Juice", "Natural"] 
  },
  
  { 
    id: 22,
     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Blueberry Smoothie", rating: 4.9, star: StarHalf, reviews: 189, price: 5.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Blueberry blended smoothie", tag: ["Smoothie", "Antioxidant"] 
  },
  
]

export const Dessert: PropType[] = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", name: "Pistachio Baklava", rating: 4.9, star: StarHalf, reviews: 322, price: 3.2, 
    nutrients: [], ingredients: [], toppings: [], text: "Layers of filo pastry with pistachio filling", tag: ["Dessert", "Most Popular", "Vegan"] 
  },
  
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop", name: "Salted Caramel Brownie", rating: 4.6, star: StarHalf, reviews: 88, price: 4.4, 
    nutrients: [], ingredients: [], toppings: [], text: "Rich chocolate brownie with salted caramel", tag: ["Dessert", "Chocolate"] 
  },
  
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", name: "Red Velvet Cake", rating: 4.7, star: StarHalf, reviews: 74, price: 4.8, 
    nutrients: [], ingredients: [], toppings: [], text: "Classic red velvet cake", tag: ["Dessert", "Cake"] 
  },
  
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Vanilla Bean Crème Brûlée", rating: 4.8, star: StarHalf, reviews: 119, price: 5.5, 
    nutrients: [], ingredients: [], toppings: [], text: "Creamy vanilla custard with caramelized sugar", tag: ["Dessert", "French"] 
  },
  
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop", name: "Macaron Mix of Five", rating: 4.5, star: StarHalf, reviews: 45, price: 4.2, 
    nutrients: [], ingredients: [], toppings: [], text: "Assorted French macarons", tag: ["Dessert", "French"] 
  },
  
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop", name: "Vanilla Panna Cotta", rating: 4.7, star: StarHalf, reviews: 95, price: 3.9, 
    nutrients: [], ingredients: [], toppings: [], text: "Silky vanilla panna cotta", tag: ["Dessert", "Italian"] 
  },
  
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Lemon Meringue Pie", rating: 4.8, star: StarHalf, reviews: 145, price: 3.6, 
    nutrients: [], ingredients: [], toppings: [], text: "Tangy lemon filling with meringue", tag: ["Dessert", "Pie"] 
  },
  
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", name: "Classic Tiramisu", rating: 4.8, star: StarHalf, reviews: 141, price: 3.6, 
    nutrients: [], ingredients: [], toppings: [], text: "Coffee-soaked ladyfingers with mascarpone", tag: ["Dessert", "Italian"] 
  },
  
  { 
    id: 9, 
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop", name: "Waffle with Berries", rating: 4.8, star: StarHalf, reviews: 146, price: 3.6, 
    nutrients: [], ingredients: [], toppings: [], text: "Crispy waffle topped with fresh berries", tag: ["Dessert", "Breakfast"] 
  },
  
  { 
    id: 10,
     image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop", name: "Chocolate Lava Cake", rating: 4.9, star: StarHalf, reviews: 203, price: 4.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Warm chocolate cake with molten center", tag: ["Dessert", "Chocolate"] 
  },
  
  { 
    id: 11,
     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", name: "Strawberry Cheesecake", rating: 4.7, star: StarHalf, reviews: 178, price: 4.2, 
     nutrients: [], ingredients: [], toppings: [], text: "Creamy cheesecake with strawberry topping", tag: ["Dessert", "Cheesecake"] 
  },
  
  { 
    id: 12,
     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Apple Pie", rating: 4.6, star: StarHalf, reviews: 134, price: 3.8, 
     nutrients: [], ingredients: [], toppings: [], text: "Classic apple pie with cinnamon", tag: ["Dessert", "Pie"] 
  },
  
  { 
    id: 13,
     image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop", name: "Éclair", rating: 4.5, star: StarHalf, reviews: 89, price: 3.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Choux pastry filled with cream", tag: ["Dessert", "French"] 
  },
  
  { 
    id: 14,
     image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop", name: "Gelato", rating: 4.8, star: StarHalf, reviews: 156, price: 3.0, 
     nutrients: [], ingredients: [], toppings: [], text: "Italian gelato in various flavors", tag: ["Dessert", "Italian"] 
  },
  
  { 
    id: 15,
     image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop", name: "Pancakes with Syrup", rating: 4.7, star: StarHalf, reviews: 112, price: 4.0, 
     nutrients: [], ingredients: [], toppings: [], text: "Fluffy pancakes with maple syrup", tag: ["Dessert", "Breakfast"] 
  },
  
  { 
    id: 16,
     image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop", name: "Black Forest Cake", rating: 4.9, star: StarHalf, reviews: 167, price: 5.0, 
     nutrients: [], ingredients: [], toppings: [], text: "Chocolate cake with cherries and cream", tag: ["Dessert", "Cake"] 
  },
  
  { 
    id: 17,
     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", name: "Profiteroles", rating: 4.6, star: StarHalf, reviews: 78, price: 4.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Cream puffs filled with ice cream", tag: ["Dessert", "French"] 
  },
  
  { 
    id: 18,
     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", name: "Banana Split", rating: 4.8, star: StarHalf, reviews: 145, price: 4.8, 
     nutrients: [], ingredients: [], toppings: [], text: "Banana with ice cream and toppings", tag: ["Dessert", "Ice Cream"] 
  },
  
  { 
    id: 19,
     image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop", name: "Cannoli", rating: 4.7, star: StarHalf, reviews: 134, price: 3.2, 
     nutrients: [], ingredients: [], toppings: [], text: "Sicilian pastry tubes filled with cream", tag: ["Dessert", "Italian"] 
  },
  
  { 
    id: 20,
     image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop", name: "French Toast", rating: 4.5, star: StarHalf, reviews: 98, price: 3.5, 
     nutrients: [], ingredients: [], toppings: [], text: "Sweet bread soaked in egg and fried", tag: ["Dessert", "Breakfast"] 
  },
  
]

