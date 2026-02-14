// services/ai.service.js

function extractIntent(message) {
  if (!message || typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  const lower = message.toLowerCase();

  // Explicit Replacement Intent
 
  const replaceMatch = message.match(/replace\s+(.+?)\s+in\s+(.+)/i);

  if (replaceMatch) {
    return {
      type: "replace",
      ingredient: replaceMatch[1].trim(),
      dish: replaceMatch[2].trim(),
      dietary: null
    };
  }

  // Health Intent
  
  const healthyMatch = message.match(
    /(make|create|give).*?(healthy|healthier).*?(version\s+of)?\s*(.+)/i
  );

  if (healthyMatch) {
    return {
      type: "health",
      ingredient: null,
      dish: healthyMatch[4].trim(),
      dietary: "healthy"
    };
  }

  throw new Error(
    "Invalid format. Try:\n- Replace <ingredient> in <dish>\n- Make <dish> healthier"
  );
}

/**
 * Generates explanation for user
 */
function generateExplanation(original, replacement, score, mode = "replace") {
  if (mode === "health") {
    return `${replacement} is a healthier alternative to ${original}. 
It maintains approximately ${score}% flavor similarity while reducing calorie or fat impact, helping improve the nutritional profile of the dish.`;
  }

  return `${replacement} is a good substitute for ${original} because they share similar flavor compounds. 
This replacement preserves approximately ${score}% of the flavor similarity, helping maintain the original taste profile of the dish.`;
}

module.exports = { extractIntent, generateExplanation };
