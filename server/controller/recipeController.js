const Recipes = require("../modules/recipeModel");
const { slugGenerator } = require("../utils/textPraser");

const getRecipes = async (req, res, next) => {
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

const addRecipe = async (req, res, next) => {
  try {
    req.body.slug = slugGenerator(req.body.title);
    if (req.file) {
      req.body.img = "/".concat(
        "images",
        "/",
        "recipe-images",
        "/",
        req.file.filename
      );
    } else {
      req.body.img = "/".concat(
        "images",
        "/",
        "recipe-images",
        "/",
        "default.png"
      );
    }
    const result = await Recipes.create(req.body);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await req.body;
    console.log(req.file)
    req.body.slug = slugGenerator(req.body.title);
    if (req.file) {
      req.body.img = "/".concat(
        "images",
        "/",
        "recipe-images",
        "/",
        req.file.filename
      );
    } else {
      req.body.img = "/".concat(
        "images",
        "/",
        "recipe-images",
        "/",
        "default.png"
      );
    }
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipes.findByIdAndUpdate(id, recipe, { new: true });

    res.json({ message: "Recipe updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const favouriteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.findById(id);
    const currentUser = recipe.author;

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const isFavorite = recipe.whoseFavourite.includes(currentUser);

    if (isFavorite) {
      recipe.whoseFavourite = recipe.whoseFavourite.filter(
        (user) => user !== currentUser
      );
    } else {
      recipe.whoseFavourite.push(currentUser);
    }

    recipe.isFavorite = !isFavorite;

    await recipe.save();

    res.json({ data: recipe });

  } catch (error) {
    next(error);
  }
}

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe , favouriteRecipe };
