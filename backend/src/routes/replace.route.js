const express = require("express");
const router = express.Router();

const { extractIntent, generateExplanation } = require("../services/ai.service");
const { getSimilarIngredients } = require("../services/flavor.service");
const { findBestSubstitute } = require("../services/substitution.service");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const intent = extractIntent(message);

    if (intent.type !== "replace") {
      return res.status(400).json({
        success: false,
        message: "Invalid intent"
      });
    }

    const similarList = await getSimilarIngredients(intent.ingredient);

    const substitute = findBestSubstitute(
      similarList,
      intent.ingredient
    );

    const explanation = generateExplanation(
      intent.ingredient,
      substitute.name,
      substitute.score,
      "replace"
    );

    return res.json({
      success: true,
      modification: {
        originalIngredient: intent.ingredient,
        suggestedReplacement: substitute.name,
        flavorSimilarityScore: `${substitute.score}%`
      },
      explanation
    });

  } catch (err) {
    console.error("Replace Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Replacement failed"
    });
  }
});

module.exports = router;
