const Recipes = require("../modules/recipeModel");
const {slugGenerator} = require("../utils/textPraser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const getRecipes =async (req,res,next) => {
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

const addRecipe = async(req, res,next) => {
  try {
    req.body.slug = slugGenerator(req.body.title);
    console.log(req.body.slug);
    const recipe = await Recipes.create(req.body);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const editRecipe = async (req,res,next) => {
  const { id } = req.params;
  const recipe = await req.body;
  try{
    if(!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await Recipes.findByIdAndUpdate(id, recipe, { new: true });
    res.json({ message: "Recipe updated successfully" });
  }catch (error) {
    next(error);
  }
  };

const deleteRecipe = async (req, res,next) => {
  try {
    const {id}= req.params;
    const recipe = await Recipes.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
    
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
