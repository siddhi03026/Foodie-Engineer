const { applyDietaryFilter } = require("../utils/dietaryFilter");

function findBestSubstitute(similarList, original, mode) {
  if (!Array.isArray(similarList) || similarList.length === 0) {
    throw new Error("No similar ingredients found");
  }

  // remove same ingredient
  const filtered = similarList.filter(
    item => item.entityName.toLowerCase() !== original.toLowerCase()
  );

  if (filtered.length === 0) {
    throw new Error("No suitable substitute available");
  }

  // highest similarity first
  filtered.sort((a, b) => b.similarMolecules - a.similarMolecules);

  const best = filtered[0];

  const max = filtered[0].similarMolecules || 1;
  const score = ((best.similarMolecules / max) * 100).toFixed(1);

  return {
    name: best.entityName,
    score
  };
}

module.exports = {
  findBestSubstitute
};
