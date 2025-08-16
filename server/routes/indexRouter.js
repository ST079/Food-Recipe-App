const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const recipeRouter = require("./recipe")


router.use("/recipe",recipeRouter);
router.use("/user",userRouter);

module.exports=router;