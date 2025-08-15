const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/recipeController");
const router = express.Router();

router.get("/", getRecipes); // get all the available recipes

router.get("/:id", getRecipe); // get recipe by id

router.post("/", addRecipe); // to add the recipe

router.put("/:id", editRecipe); // to edit the recipe by id

router.delete("/:id", deleteRecipe); // to delet the recipe
module.exports = router;
