require("dotenv").config();
const express = require("express");
const app = express();
const Router = require("./routes/indexRouter");
const errorMiddleware = require("./middlewares/error-middleware")
const connectDB = require("./config/connection");
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
connectDB();
app.use(process.env.VERSION, Router);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
