const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/recipeController");
const router = express.Router();
const multer = require("multer");

const fs = require("fs");
const path = require("path");

// Folder where images will be stored
const uploadFolder = path.join(__dirname, "../public/images/recipe-images");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const imageName = "image".concat("-",Date.now(),".",file.originalname.split(".").pop());
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });



router.get("/", getRecipes); // get all the available recipes

router.get("/:id", getRecipe); // get recipe by id

router.post("/",upload.single("img"), addRecipe); // to add the recipe

router.put("/:id",upload.single("img"), editRecipe); // to edit the recipe by id

router.delete("/:id", deleteRecipe); // to delet the recipe
module.exports = router;
