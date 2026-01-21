import AvocadoImage from "/images/Avocado-img.png"
import ChickenBreast from "/images/chicken-breast.png"
import ChickenSalad from "/images/chicken-salad.png"
import CurryImage from "/images/curry-img.png"
import MacImage from "/images/Mac-image.png"
import PowerImage from "/images/power-img.png"
import VegImage from "/images/vegetable-img.png"
import StarHalf from "/images/star-half-icon.png"
import Baklava from "/images/image-baklava.jpg"
import Brownie from "/images/image-brownie.jpg"
import Cake from "/images/image-cake.jpg"
import Creme from "/images/image-creme-brulee.jpg"
import Macaron from "/images/image-macaron.jpg"
import Meringue from "/images/image-meringue.jpg"
import Panna from "/images/image-panna-cotta.jpg"
import Tiramisu from "/images/image-tiramisu.jpg"
import Waffle from "/images/image-waffle.jpg"

import type { PropType } from "../types"

export const Eat: PropType[] = [
  {
    id: 1,
    image: AvocadoImage,
    name: "Avocado and Egg Toast",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    text: "You won't skip the most important meal of the day with this avocado toast recipe. Crispy, lacy eggs and creamy avocado top hot buttered toast. ",
    tag: ["most popular", "breakfast", "vegan"]
  },
  {
    id: 2,
    image: ChickenSalad,
    name: "Avocado Chicken Salad",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["salad", "chicken", "most popular"]
  },
  {
    id: 3,
    image: ChickenBreast,
    name: "Chicken Breast",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["grill", "chicken", "most popular"]
  },
  {
    id: 4,
    image: CurryImage,
    name: "Curry Salmon",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["grill", "most popular"]
  },
  {
    id: 5,
    image: MacImage,
    name: "Mac and Cheese",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["pasta", "most popular"]
  },
  {
    id: 6,
    image: PowerImage,
    name: "Power Bowl",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["vegan", "salad"]
  },
  {
    id: 7,
    image: VegImage,
    name: "Vegetable Salad",
    rating: 4.9,
    star: StarHalf,
    reviews: 120,
    price: 10.40,
    nutrients: [
      { amount: '400', unit: 'kcal' },
      { amount: '510', unit: 'gram' },
      { amount: '30', unit: 'proteins' },
      { amount: '56', unit: 'carbs' },
      { amount: '24', unit: 'fats' }
    ],
    ingredients: [
      { ingname: 'Egg', ingimage: '/images/egg.svg' },
      { ingname: 'Avocado', ingimage: '/images/avocado.png' },
      { ingname: 'Spinach', ingimage: '/images/salad.png' },
      { ingname: 'Bread', ingimage: '/images/bread.svg' }
    ],
    toppings: [
      { id: 1, name: "Extra eggs", price: 4.20 },
      { id: 2, name: "Extra spinach", price: 2.80 },
      { id: 3, name: "Extra avocado", price: 5.40 },
      { id: 4, name: "Extra bread", price: 1.80 },
      { id: 5, name: "Extra tomato", price: 2.10 },
      { id: 6, name: "Extra cucumber", price: 1.60 },
      { id: 7, name: "Extra pepper", price: 1.50 },
    ],
    tag: ["salad", "vegan"]
  },
  // Dessert items merged in, continuing IDs
  { id: 8, image: Baklava, name: "Pistachio Baklava", rating: 4.9, star: StarHalf, reviews: 322, price: 3.20, nutrients: [], ingredients: [], toppings: [], tag: ["dessert", "most popular"] },
  { id: 9, image: Brownie, name: "Salted Caramel Brownie", rating: 4.6, star: StarHalf, reviews: 88, price: 4.40, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 10, image: Cake, name: "Red Velvet Cake", rating: 4.7, star: StarHalf, reviews: 74, price: 4.80, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 11, image: Creme, name: "Vanilla Bean Crème Brûlée", rating: 4.8, star: StarHalf, reviews: 119, price: 5.50, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 12, image: Macaron, name: "Macaron Mix of Five", rating: 4.5, star: StarHalf, reviews: 45, price: 4.20, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 13, image: Panna, name: "Vanilla Panna Cotta", rating: 4.7, star: StarHalf, reviews: 95, price: 3.90, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 14, image: Meringue, name: "Lemon Meringue Pie", rating: 4.8, star: StarHalf, reviews: 145, price: 3.60, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 15, image: Tiramisu, name: "Classic Tiramisu", rating: 4.8, star: StarHalf, reviews: 141, price: 3.60, nutrients: [], ingredients: [], toppings: [], tag: ["dessert"] },
  { id: 16, image: Waffle, name: "Waffle with Berries", rating: 4.8, star: StarHalf, reviews: 146, price: 3.60, nutrients: [], ingredients: [], toppings: [], tag: ["dessert", "breakfast"] },
  // Additional food objects for more categories
  { id: 17, image: MacImage, name: "Classic Margherita Pizza", rating: 4.7, star: StarHalf, reviews: 210, price: 8.50, nutrients: [], ingredients: [], toppings: [], tag: ["pizza", "most popular"] },
  { id: 18, image: ChickenBreast, name: "Chicken Burger", rating: 4.6, star: StarHalf, reviews: 180, price: 7.20, nutrients: [], ingredients: [], toppings: [], tag: ["burger", "chicken"] },
  { id: 19, image: CurryImage, name: "Tomato Basil Soup", rating: 4.5, star: StarHalf, reviews: 95, price: 5.00, nutrients: [], ingredients: [], toppings: [], tag: ["soup", "vegan"] },
  { id: 20, image: PowerImage, name: "Vegan Grill Platter", rating: 4.8, star: StarHalf, reviews: 110, price: 12.00, nutrients: [], ingredients: [], toppings: [], tag: ["grill", "vegan"] },
  { id: 21, image: VegImage, name: "Vegan Breakfast Bowl", rating: 4.9, star: StarHalf, reviews: 130, price: 9.50, nutrients: [], ingredients: [], toppings: [], tag: ["breakfast", "vegan"] },
  { id: 22, image: ChickenSalad, name: "Chicken Noodle Soup", rating: 4.7, star: StarHalf, reviews: 100, price: 6.50, nutrients: [], ingredients: [], toppings: [], tag: ["soup", "chicken"] },
  { id: 23, image: MacImage, name: "Spaghetti Carbonara", rating: 4.8, star: StarHalf, reviews: 160, price: 9.80, nutrients: [], ingredients: [], toppings: [], tag: ["pasta", "most popular"] },
  { id: 24, image: ChickenBreast, name: "Grilled Chicken Sandwich", rating: 4.7, star: StarHalf, reviews: 140, price: 8.20, nutrients: [], ingredients: [], toppings: [], tag: ["grill", "chicken", "most popular"] },
  { id: 25, image: VegImage, name: "Vegan Caesar Salad", rating: 4.6, star: StarHalf, reviews: 90, price: 7.00, nutrients: [], ingredients: [], toppings: [], tag: ["salad", "vegan"] },
  { id: 26, image: CurryImage, name: "Breakfast Omelette", rating: 4.8, star: StarHalf, reviews: 115, price: 7.80, nutrients: [], ingredients: [], toppings: [], tag: ["breakfast", "most popular"] },
]

export const Drink: PropType[] = [
  { id: 1, image: '/images/orange-smoothie.jpg', name: "Orange Smoothie", rating: 4.8, star: StarHalf, reviews: 98, price: 4.50, nutrients: [], ingredients: [], toppings: [] },
  { id: 2, image: '/images/iced-latte.jpg', name: "Avocado Shake", rating: 4.7, star: StarHalf, reviews: 76, price: 5.20, nutrients: [], ingredients: [], toppings: [] },
  { id: 3, image: '/images/iced-latte.jpg', name: "Iced Latte", rating: 4.6, star: StarHalf, reviews: 210, price: 3.80, nutrients: [], ingredients: [], toppings: [] },
  { id: 4, image: '/images/green-smoothie.avif', name: "Ginger Tea", rating: 4.5, star: StarHalf, reviews: 44, price: 2.40, nutrients: [], ingredients: [], toppings: [] },
  { id: 5, image: '/images/green-detox.jpg', name: "Detox Green Juice", rating: 4.7, star: StarHalf, reviews: 63, price: 6.00, nutrients: [], ingredients: [], toppings: [] },
  { id: 6, image: VegImage, name: "Berry Blast", rating: 4.9, star: StarHalf, reviews: 150, price: 5.90, nutrients: [], ingredients: [], toppings: [] }
]

