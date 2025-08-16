const express = require('express');
const router = express.Router();
const {userSignup,userLogin,getUser}= require("../controller/userController")

router.post("/signup", userSignup); // User signup route
router.post("/login", userLogin); // User login route
router.get("/user/:id", getUser); // Get user by ID


module.exports = router;