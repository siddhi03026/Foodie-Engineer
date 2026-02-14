const express = require("express");
const cors = require("cors");

//Create app FIRST
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes (AFTER app exists)
const recipeRoute = require("./routes/recipe.route");
const replaceRoute = require("./routes/replace.route");

app.use("/api/recipe", recipeRoute);
app.use("/api/replace", replaceRoute);

//Export app
module.exports = app;


