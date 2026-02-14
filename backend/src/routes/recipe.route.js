const express = require("express");
const router = express.Router();

const { searchRecipeByTitle, getRecipeById } = require("../services/recipe.service");

router.get("/ingredients", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Dish title is required"
      });
    }

    // search by title
    const recipes = await searchRecipeByTitle(title);

    if (!recipes || recipes.length === 0) {
      return res.json({
        success: false,
        message: "Recipe not found"
      });
    }

    const recipeId = recipes[0].Recipe_id;

    //  get full recipe
    const data = await getRecipeById(recipeId);

    return res.json({
      success: true,
      message: "Recipe fetched successfully",
      payload: {
        Recipe_title: data.recipe.Recipe_title,
        Calories: data.recipe.Calories,
        total_time: data.recipe.total_time,
        servings: data.recipe.servings,
        Region: data.recipe.Region,
        Sub_region: data.recipe.Sub_region,
        ingredients: data.ingredients.map(i => ({ name: i.ingredient })),
        instructions: data.instructions
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe"
    });
  }
});

module.exports = router;
