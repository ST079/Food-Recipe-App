
require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("../modules/recipeModel");
const userModel = require("../modules/userModel");
// MongoDB connection string
const MONGO_URI = process.env.DB;// Change to your DB name

const {recipes} = require("./data"); // Importing the recipes from data.js



const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Starting User Seeding");
    const userA = await userModel.create({
      username: "SujanAdmin",
      email: "sujan@tamang.com",
      password: "123",
      isAdmin: true,
    });

    console.log("User Seeding Completed");

    console.log("Starting Recipe Seeding");
    await Recipe.deleteMany({});
    for(let i = 0; i < 16; i++) {
      const recipe = recipes[i];
      recipe.author = userA?._id; // Assigning the author to the recipe
      await Recipe.create(recipe);
    } 
    console.log("✅ 16 recipes inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
};

seedDB();
