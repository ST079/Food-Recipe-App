const Recipes = require("../modules/recipeModel");

const getRecipes =async (res,next) => {
  try {
    const recipes = await Recipes.find();
    res.json({ data: recipes });
  } catch (error) {
    next(error);
  }
  
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipes.findById(id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
  

};

const addRecipe = (req, res) => {
  res.json({ message: "Recipe Fetched Successfully" });
};

const editRecipe = (req, res) => {
  res.json({ message: "Recipe Fetched Successfully" });
};

const deleteRecipe = (req, res) => {
  res.json({ message: "Recipe Fetched Successfully" });
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
