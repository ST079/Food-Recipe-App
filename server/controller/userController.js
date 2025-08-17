const userSchema = require("../modules/userModel");
const { hashedPassword, comparePassword } = require("../utils/bcrypt");
const { signJwt } = require("../utils/token");

const userSignup = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;
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
      isAdmin,
    });
    if (!newUser) {
      return res.status(500).json({ message: "User creation failed" });
    }

    const userPyload = {
      id: newUser._id,
      username,
      email,
      isAdmin,
    };

    let token = signJwt({
      userPyload,
    });
    return res
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser.username,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userSchema.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      const userPyload = {
        id: user._id,
        email,
      };
      let token = signJwt({
        userPyload,
      });

      return res.status(200).json({
        message: "Login successful",
        user: user.username,
        token: token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.status(200).json({user:user.username});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
};
