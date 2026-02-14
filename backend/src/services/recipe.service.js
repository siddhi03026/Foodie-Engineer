const createClient = require("../utils/apiClient");

const recipeClient = createClient(process.env.RECIPE_API_BASE_URL);

// Search recipe by title
async function searchRecipeByTitle(title) {
  const res = await recipeClient.get(
    "/recipe2-api/recipe-bytitle/recipeByTitle",
    {
      params: { title },
      timeout: 8000 // ⬅ prevents infinite loading
    }
  );

  return res.data?.data || [];
}

// Get recipe + ingredients
async function getRecipeById(id) {
  const res = await recipeClient.get(
    `/recipe2-api/search-recipe/${id}`,
    { timeout: 8000 }
  );

  return res.data;
}

// Get instructions separately (IMPORTANT)
async function getRecipeInstructions(id) {
  const res = await recipeClient.get(
    `/recipe2-api/instructions/${id}`,
    { timeout: 8000 }
  );

  return res.data?.steps || [];
}

module.exports = {
  searchRecipeByTitle,
  getRecipeById,
  getRecipeInstructions
};
