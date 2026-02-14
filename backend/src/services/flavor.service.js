const createClient = require("../utils/apiClient");

const flavorClient = createClient(process.env.FLAVOR_API_BASE_URL);

async function getSimilarIngredients(name) {
  const res = await flavorClient.get(
    "/food/by-alias",
    { params: { food_pair: name } }
  );

  return res.data.topSimilarEntities;
}

module.exports = { getSimilarIngredients };
