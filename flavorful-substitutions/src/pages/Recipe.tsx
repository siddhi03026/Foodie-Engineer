import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { FlavorCard } from "@/components/ui/FlavorCard";
import { mockRecipes} from "@/data/mockData";
import { 
  Clock, 
  Users, 
  Flame, 
  AlertTriangle, 
  ArrowRight,
  ChefHat
} from "lucide-react";

const Recipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe || mockRecipes[0];

  const unhealthyIngredients = recipe.ingredients.filter((ing: { isUnhealthy?: boolean }) => ing.isUnhealthy);

const fetchSubstituteFromBackend = async (ingredientName: string) => {
  try {
    const response = await fetch("http://localhost:5000/api/substitute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient: ingredientName }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching substitute:", error);
    return null;
  }
};
const handleFindSubstitutes = async () => {
  const substitutions = [];

  for (const ing of unhealthyIngredients) {
    const result = await fetchSubstituteFromBackend(ing.name);

    if (result && result.success) {
      substitutions.push({
        original: ing.name,
        substitute: result.data.substitute,
        reason: result.data.reason,
        flavorMatch: result.data.flavorMatch,
      });
    }
  }

  navigate("/substitution", {
    state: {
      recipe,
      unhealthyIngredients,
      substitutions,
    },
  });
};

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Recipe Header */}
          <FlavorCard variant="elevated" hover={false} className="mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-48 rounded-xl bg-sage-light flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-primary/50" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {recipe.name}
                </h1>
                <p className="text-muted-foreground mb-4">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                    <Flame className="w-4 h-4 text-muted-foreground" />
                    <span>{recipe.calories} cal/serving</span>
                  </div>
                </div>
              </div>
            </div>
          </FlavorCard>

          {/* Nutrition Highlights */}
          <FlavorCard variant="gradient" className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Nutrition Highlights</h2>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xl font-bold text-foreground">{value as number}g</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>
          </FlavorCard>

          {/* Ingredients List */}
          <FlavorCard variant="default" className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ingredients</h2>
            <div className="grid gap-2">
              {recipe.ingredients.map((ingredient: { name: string; amount: string; isUnhealthy?: boolean; unhealthyReason?: string }, index: number) => (
                <motion.div
                  key={ingredient.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    ingredient.isUnhealthy 
                      ? "bg-destructive/10 border border-destructive/30" 
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ingredient.isUnhealthy && (
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`font-medium ${ingredient.isUnhealthy ? "text-destructive" : "text-foreground"}`}>
                      {ingredient.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
                </motion.div>
              ))}
            </div>
          </FlavorCard>

          {/* Unhealthy Ingredients Warning */}
          {unhealthyIngredients.length > 0 && (
            <FlavorCard variant="bordered" hover={false} className="border-warning/50 bg-warning/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {unhealthyIngredients.length} Ingredient{unhealthyIngredients.length > 1 ? "s" : ""} Flagged
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've identified ingredients that may not align with your health goals. 
                    Our AI can suggest healthy alternatives that maintain the same flavor profile.
                  </p>
                  <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                    {unhealthyIngredients.map((ing: { name: string; unhealthyReason?: string }) => (
                      <li key={ing.name} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                        <span className="font-medium text-foreground">{ing.name}</span>
                        {ing.unhealthyReason && (
                          <span className="text-muted-foreground">— {ing.unhealthyReason}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <FlavorButton onClick={handleFindSubstitutes} variant="hero">
                    Find Healthy Substitutes
                    <ArrowRight className="w-4 h-4" />
                  </FlavorButton>
                </div>
              </div>
            </FlavorCard>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Recipe;
