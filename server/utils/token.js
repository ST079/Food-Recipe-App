require("dotenv").config();
const jwt = require("jsonwebtoken");

const signJwt = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = {
  signJwt,
};
