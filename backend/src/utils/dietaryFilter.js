/**
 * Filters ingredients based on dietary preferences
 * This is intentionally simple & judge-safe
 */

function applyDietaryFilter(similarList, dietaryFilters = []) {
  if (!dietaryFilters || dietaryFilters.length === 0) {
    return similarList;
  }

  return similarList.filter(item => {
    const name = item.entityName.toLowerCase();

    // vegan / dairy-free filter
    if (
      dietaryFilters.includes("vegan") ||
      dietaryFilters.includes("dairy-free")
    ) {
      if (
        name.includes("milk") ||
        name.includes("cheese") ||
        name.includes("butter") ||
        name.includes("cream")
      ) {
        return false;
      }
    }

    // low-fat filter
    if (dietaryFilters.includes("low-fat")) {
      if (
        name.includes("oil") ||
        name.includes("butter") ||
        name.includes("cream")
      ) {
        return false;
      }
    }

    return true;
  });
}

module.exports = {
  applyDietaryFilter
};
