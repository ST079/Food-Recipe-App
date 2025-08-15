const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true ,trim:true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  time: { type: Number, min:1 },
  img: { type: String},
},{timestamps:true});

module.exports = mongoose.model("Recipe",recipeSchema);
