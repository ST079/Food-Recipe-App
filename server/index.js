require("dotenv").config();
const express = require("express");
const app = express();
const Router = require("./routes/recipe");
const errorMiddleware = require("./middlewares/error-middleware")
const connectDB = require("./config/connection");

app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();
app.use("/recipe", Router);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
