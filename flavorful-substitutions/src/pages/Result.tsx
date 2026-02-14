import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { FlavorCard } from "@/components/ui/FlavorCard";
import { mockRecipes, mockSubstitutions } from "@/data/mockData";
import { 
  ChefHat, 
  Check, 
  RefreshCcw,
  Sparkles,
  Heart,
  Flame,
  TrendingDown,
  MessageCircle
} from "lucide-react";

const Result = () => {
  const location = useLocation();
  const { recipe = mockRecipes[0], substitutions = mockSubstitutions } = location.state || {};

  // Create modified ingredients list
  const modifiedIngredients = recipe.ingredients.map((ing: { name: string; amount: string; isUnhealthy?: boolean }) => {
    const sub = substitutions.find((s: typeof mockSubstitutions[0]) => s.original.name === ing.name);
    if (sub) {
      return {
        ...ing,
        name: sub.substitute.name,
        amount: sub.substitute.amount,
        isSubstituted: true,
        originalName: ing.name,
      };
    }
    return ing;
  });

  // Mock improved nutrition
  const improvedNutrition = {
    protein: recipe.nutrition.protein,
    carbs: recipe.nutrition.carbs - 5,
    fat: Math.round(recipe.nutrition.fat * 0.6),
    fiber: recipe.nutrition.fiber + 2,
    sugar: Math.round(recipe.nutrition.sugar * 0.3),
  };

  const improvements = [
    { label: "Less Saturated Fat", value: "-40%", icon: TrendingDown },
    { label: "Lower Sugar", value: "-70%", icon: TrendingDown },
    { label: "More Fiber", value: "+2g", icon: Heart },
    { label: "Fewer Calories", value: "-80 cal", icon: Flame },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow"
            >
              <Check className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Healthier Recipe is Ready! 🎉
            </h1>
            <p className="text-muted-foreground">
              We've optimized your recipe while maintaining the delicious taste
            </p>
          </div>

          {/* Improvements Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {improvements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FlavorCard variant="gradient" className="text-center py-4">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </FlavorCard>
              </motion.div>
            ))}
          </div>

          {/* Modified Recipe Card */}
          <FlavorCard variant="elevated" hover={false} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{recipe.name}</h2>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span>Healthified Version</span>
                </div>
              </div>
            </div>

            {/* Updated Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Updated Ingredients</h3>
              <div className="grid gap-2">
                {modifiedIngredients.map((ingredient: { name: string; amount: string; isSubstituted?: boolean; originalName?: string }, index: number) => (
                  <motion.div
                    key={ingredient.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      ingredient.isSubstituted 
                        ? "bg-success/10 border border-success/30" 
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {ingredient.isSubstituted && (
                        <Check className="w-4 h-4 text-success" />
                      )}
                      <div>
                        <span className={`font-medium ${ingredient.isSubstituted ? "text-success" : "text-foreground"}`}>
                          {ingredient.name}
                        </span>
                        {ingredient.isSubstituted && (
                          <span className="text-xs text-muted-foreground ml-2">
                            (replaces {ingredient.originalName})
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Improved Nutrition */}
            <div className="bg-sage-light/50 rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">Improved Nutrition</h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(improvedNutrition).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-xl font-bold text-primary">{value}g</div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </FlavorCard>

          {/* Why It Works Section */}
          <FlavorCard variant="bordered" className="mb-8">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Why These Substitutions Work
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              {substitutions.map((sub: typeof mockSubstitutions[0]) => (
                <div key={sub.original.name} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{sub.substitute.name}</span> replaces{" "}
                    <span className="text-destructive">{sub.original.name}</span>: {sub.reason}
                  </div>
                </div>
              ))}
            </div>
          </FlavorCard>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/chat">
              <FlavorButton variant="hero" size="lg" className="w-full sm:w-auto">
                <RefreshCcw className="w-5 h-5" />
                Try Another Recipe
              </FlavorButton>
            </Link>
            <Link to="/">
              <FlavorButton variant="outline" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="w-4 h-4" />
                Back to Home
              </FlavorButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Result;
