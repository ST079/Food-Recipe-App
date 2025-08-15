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
    img: "https://example.com/spaghetti.jpg",
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
    img: "https://example.com/chicken-curry.jpg",
  },
  {
    title: "Pancakes",
    ingredients: ["flour", "milk", "egg", "butter", "sugar"],
    instructions:
      "Mix ingredients. Pour onto hot griddle. Flip when bubbles form. Serve with syrup.",
    time: 15,
    img: "https://example.com/pancakes.jpg",
  },
  {
    title: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheddar cheese", "butter"],
    instructions:
      "Butter bread, add cheese, and grill until golden brown on both sides.",
    time: 10,
    img: "https://example.com/grilled-cheese.jpg",
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
    img: "https://example.com/caesar-salad.jpg",
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
    img: "https://example.com/veg-stirfry.jpg",
  },
  {
    title: "Beef Tacos",
    ingredients: ["taco shells", "ground beef", "lettuce", "tomato", "cheese"],
    instructions:
      "Cook beef with seasoning. Fill taco shells with beef and toppings.",
    time: 20,
    img: "https://example.com/beef-tacos.jpg",
  },
  {
    title: "Chocolate Cake",
    ingredients: ["flour", "sugar", "cocoa powder", "eggs", "butter", "milk"],
    instructions:
      "Mix dry ingredients. Add wet ingredients. Bake at 180°C for 30 minutes.",
    time: 45,
    img: "https://example.com/chocolate-cake.jpg",
  },
  {
    title: "Omelette",
    ingredients: ["eggs", "milk", "cheese", "bell peppers", "onion"],
    instructions:
      "Beat eggs with milk. Cook with vegetables and cheese until set.",
    time: 10,
    img: "https://example.com/omelette.jpg",
  },
  {
    title: "Margherita Pizza",
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
    instructions:
      "Spread sauce on dough. Add cheese and basil. Bake until golden.",
    time: 20,
    img: "https://example.com/margherita.jpg",
  },
  {
    title: "Tomato Soup",
    ingredients: ["tomatoes", "onion", "garlic", "vegetable broth"],
    instructions:
      "Cook tomatoes with onion and garlic. Blend and simmer with broth.",
    time: 25,
    img: "https://example.com/tomato-soup.jpg",
  },
  {
    title: "BBQ Chicken",
    ingredients: ["chicken", "BBQ sauce"],
    instructions: "Coat chicken with BBQ sauce. Grill until cooked through.",
    time: 35,
    img: "https://example.com/bbq-chicken.jpg",
  },
  {
    title: "French Toast",
    ingredients: ["bread", "eggs", "milk", "sugar", "cinnamon"],
    instructions:
      "Dip bread in egg mixture. Cook on skillet until golden brown.",
    time: 15,
    img: "https://example.com/french-toast.jpg",
  },
  {
    title: "Greek Salad",
    ingredients: ["cucumber", "tomato", "feta cheese", "olives", "olive oil"],
    instructions: "Combine vegetables. Drizzle with olive oil and toss.",
    time: 10,
    img: "https://example.com/greek-salad.jpg",
  },
  {
    title: "Burrito",
    ingredients: ["tortilla", "rice", "beans", "chicken", "cheese"],
    instructions: "Fill tortilla with ingredients. Wrap tightly and serve.",
    time: 20,
    img: "https://example.com/burrito.jpg",
  },
  {
    title: "Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "mixed vegetables"],
    instructions: "Fry rice with vegetables and egg. Add soy sauce.",
    time: 15,
    img: "https://example.com/fried-rice.jpg",
  },
  {
    title: "Lentil Soup",
    ingredients: ["lentils", "onion", "carrot", "celery", "vegetable broth"],
    instructions: "Simmer lentils with vegetables and broth until tender.",
    time: 40,
    img: "https://example.com/lentil-soup.jpg",
  },
  {
    title: "Fish Curry",
    ingredients: ["fish", "curry powder", "coconut milk", "onion", "tomato"],
    instructions:
      "Cook onion and tomato. Add fish, curry powder, and coconut milk. Simmer.",
    time: 30,
    img: "https://example.com/fish-curry.jpg",
  },
  {
    title: "Gnocchi",
    ingredients: ["gnocchi", "tomato sauce", "parmesan cheese"],
    instructions: "Boil gnocchi. Toss with sauce and cheese.",
    time: 15,
    img: "https://example.com/gnocchi.jpg",
  },
  {
    title: "Veggie Burger",
    ingredients: ["burger bun", "veggie patty", "lettuce", "tomato", "cheese"],
    instructions: "Cook patty. Assemble burger with toppings.",
    time: 15,
    img: "https://example.com/veggie-burger.jpg",
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
