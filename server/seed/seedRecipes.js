const mongoose = require("mongoose");
const Recipe = require("../modules/recipeModel");
require("dotenv").config();

// MongoDB connection string
const MONGO_URI = process.env.DB;// Change to your DB name

const recipes = [
  {
    title: "Spaghetti Bolognese",
    ingredients: [
      "spaghetti",
      "ground beef",
      "tomato sauce",
      "onion",
      "garlic",
    ],
    instructions:
      "Cook spaghetti. Brown beef. Add sauce and simmer. Serve over pasta.",
    time: 30,
    category: "Italian",
    img: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fHww",
    rating: 4.5,
  },
  {
    title: "Chicken Curry",
    ingredients: [
      "chicken",
      "onion",
      "garlic",
      "ginger",
      "curry powder",
      "coconut milk",
    ],
    instructions:
      "Sauté onion, garlic, ginger. Add chicken and curry powder. Stir in coconut milk. Simmer until cooked.",
    time: 40,
    category: "Indian",
    img: "https://plus.unsplash.com/premium_photo-1723708871094-2c02cf5f5394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGN1cnJ5fGVufDB8fDB8fHww",
    rating: 4.7,
  },
  {
    title: "Pancakes",
    ingredients: ["flour", "milk", "egg", "butter", "sugar"],
    instructions:
      "Mix ingredients. Pour onto hot griddle. Flip when bubbles form. Serve with syrup.",
    time: 15,
    category: "Breakfast",
    img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D",
    rating: 4.3,
  },
  {
    title: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheddar cheese", "butter"],
    instructions:
      "Butter bread, add cheese, and grill until golden brown on both sides.",
    time: 10,
    category: "Snack",
    img: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEdyaWxsZWQlMjBjaGVlc2UlMjBzYW5kd2l0Y2h8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
  },
  {
    title: "Caesar Salad",
    ingredients: [
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "Caesar dressing",
    ],
    instructions: "Toss lettuce with dressing. Top with croutons and cheese.",
    time: 10,
    category: "Salad",
    img: "https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VzYXIlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.2,
  },
  {
    title: "Vegetable Stir Fry",
    ingredients: [
      "mixed vegetables",
      "soy sauce",
      "garlic",
      "ginger",
      "sesame oil",
    ],
    instructions:
      "Stir fry vegetables with garlic and ginger. Add soy sauce. Serve hot.",
    time: 15,
    category: "Vegetarian",
    img: "https://plus.unsplash.com/premium_photo-1664475934279-2631a25c42ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlJTIwc3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.4,
  },
  {
    title: "Beef Tacos",
    ingredients: ["taco shells", "ground beef", "lettuce", "tomato", "cheese"],
    instructions:
      "Cook beef with seasoning. Fill taco shells with beef and toppings.",
    time: 20,
    category: "Mexican",
    img: "https://images.unsplash.com/photo-1640983743761-4f0e0204bc58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlZiUyMHRhY29zfGVufDB8fDB8fHww",
    rating: 4.6,
  },
  {
    title: "Chocolate Cake",
    ingredients: ["flour", "sugar", "cocoa powder", "eggs", "butter", "milk"],
    instructions:
      "Mix dry ingredients. Add wet ingredients. Bake at 180°C for 30 minutes.",
    time: 45,
    category: "Dessert",
    img: "https://images.unsplash.com/photo-1586985289906-406988974504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
  },
  {
    title: "Omelette",
    ingredients: ["eggs", "milk", "cheese", "bell peppers", "onion"],
    instructions:
      "Beat eggs with milk. Cook with vegetables and cheese until set.",
    time: 10,
    category: "Breakfast",
    img: "https://images.unsplash.com/photo-1677137261161-0095c10418ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9tZWxldHRlfGVufDB8fDB8fHww",
    rating: 4.1,
  },
  {
    title: "Margherita Pizza",
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
    instructions:
      "Spread sauce on dough. Add cheese and basil. Bake until golden.",
    time: 20,
    category: "Italian",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww",
    rating: 4.8,
  },
  {
    title: "Tomato Soup",
    ingredients: ["tomatoes", "onion", "garlic", "vegetable broth"],
    instructions:
      "Cook tomatoes with onion and garlic. Blend and simmer with broth.",
    time: 25,
    category: "Soup",
    img: "https://images.unsplash.com/photo-1673021889619-0677506b56ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0byUyMHNvdXB8ZW58MHx8MHx8fDA%3D",
    rating: 4.3,
  },
  {
    title: "BBQ Chicken",
    ingredients: ["chicken", "BBQ sauce"],
    instructions: "Coat chicken with BBQ sauce. Grill until cooked through.",
    time: 35,
    category: "Grill",
    img: "https://plus.unsplash.com/premium_photo-1692835633701-ad06af67cec7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyYmVjdWUlMjBDaGlja2VufGVufDB8fDB8fHww",
    rating: 4.7,
  },
  {
    title: "French Toast",
    ingredients: ["bread", "eggs", "milk", "sugar", "cinnamon"],
    instructions:
      "Dip bread in egg mixture. Cook on skillet until golden brown.",
    time: 15,
    category: "Breakfast",
    img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwdG9hc3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
  },
  {
    title: "Burrito",
    ingredients: ["tortilla", "rice", "beans", "chicken", "cheese"],
    instructions: "Fill tortilla with ingredients. Wrap tightly and serve.",
    time: 20,
    category: "Mexican",
    img: "https://plus.unsplash.com/premium_photo-1664478294917-c11274b9ce79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVycml0b3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
  },
  {
    title: "Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "mixed vegetables"],
    instructions: "Fry rice with vegetables and egg. Add soy sauce.",
    time: 15,
    category: "Asian",
    img: "https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww",
    rating: 4.4,
  },
  {
    title: "Fish Curry",
    ingredients: ["fish", "curry powder", "coconut milk", "onion", "tomato"],
    instructions:
      "Cook onion and tomato. Add fish, curry powder, and coconut milk. Simmer.",
    time: 30,
    category: "Seafood",
    img: "https://plus.unsplash.com/premium_photo-1712678665724-7c3faa117a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmlzaCUyMGN1cnJ5fGVufDB8fDB8fHww",
    rating: 4.6,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);
    console.log("✅ 20 recipes inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
};

seedDB();
