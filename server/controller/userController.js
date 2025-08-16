const userSchema = require("../modules/userModel");
const { hashedPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res, next) => {
  try {
    const { username, email, password ,isAdmin} = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let userExist = await userSchema.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await hashedPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Password hashing failed" });
    }
    const newUser = await userSchema.create({
      username,
      email,
      password: hash,
      isAdmin
    });
    if (!newUser) {
      return res.status(500).json({ message: "User creation failed" });
    }
    
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser.username });
  } catch (error) {
    next(error);
  }
};


const userLogin = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
};
