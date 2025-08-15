require("dotenv").config();
const express = require('express');
const app = express();
const Router = require("./routes/recipe")

const PORT = process.env.PORT || 5000;


app.use("/recipe",Router);

app.listen(PORT, ()=>{
    console.log(`App is running at port ${PORT}`)
})