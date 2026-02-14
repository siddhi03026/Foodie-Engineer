export interface Ingredient {
  name: string;
  amount: string;
  isUnhealthy?: boolean;
  unhealthyReason?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  calories: number;
  ingredients: Ingredient[];
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
}

export interface Substitution {
  original: Ingredient;
  substitute: {
    name: string;
    amount: string;
  };
  flavorMatchScore: number;
  reason: string;
  benefits: string[];
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Classic Chocolate Chip Cookies",
    description: "Warm, chewy cookies with melty chocolate chips - a timeless favorite!",
    image: "/placeholder.svg",
    cookTime: "25 mins",
    servings: 24,
    calories: 180,
    ingredients: [
      { name: "All-purpose flour", amount: "2 1/4 cups" },
      { name: "Butter", amount: "1 cup", isUnhealthy: true, unhealthyReason: "High in saturated fat" },
      { name: "White sugar", amount: "3/4 cup", isUnhealthy: true, unhealthyReason: "High glycemic index" },
      { name: "Brown sugar", amount: "3/4 cup" },
      { name: "Eggs", amount: "2 large" },
      { name: "Vanilla extract", amount: "1 tsp" },
      { name: "Baking soda", amount: "1 tsp" },
      { name: "Salt", amount: "1 tsp" },
      { name: "Chocolate chips", amount: "2 cups" },
    ],
    nutrition: {
      protein: 2,
      carbs: 25,
      fat: 9,
      fiber: 1,
      sugar: 15,
    },
  },
  {
    id: "2",
    name: "Creamy Pasta Alfredo",
    description: "Rich and indulgent pasta in a velvety cheese sauce.",
    image: "/placeholder.svg",
    cookTime: "30 mins",
    servings: 4,
    calories: 650,
    ingredients: [
      { name: "Fettuccine pasta", amount: "1 lb" },
      { name: "Heavy cream", amount: "2 cups", isUnhealthy: true, unhealthyReason: "High in saturated fat and calories" },
      { name: "Butter", amount: "1/2 cup", isUnhealthy: true, unhealthyReason: "High in saturated fat" },
      { name: "Parmesan cheese", amount: "1 1/2 cups" },
      { name: "Garlic", amount: "4 cloves" },
      { name: "Salt", amount: "to taste" },
      { name: "Black pepper", amount: "to taste" },
      { name: "Parsley", amount: "for garnish" },
    ],
    nutrition: {
      protein: 18,
      carbs: 65,
      fat: 35,
      fiber: 3,
      sugar: 4,
    },
  },
];
export const mockSubstitutions: Substitution[] = [
  {
    original: { name: "Butter", amount: "1 cup", isUnhealthy: true },
    substitute: { name: "Avocado", amount: "1 cup mashed" },
    flavorMatchScore: 87,
    reason: "Avocado shares similar creamy, fatty flavor compounds with butter while providing heart-healthy monounsaturated fats. The compound profile includes similar aldehydes and esters.",
    benefits: [
      "50% less saturated fat",
      "Rich in potassium and fiber",
      "Contains vitamins E and K",
      "Heart-healthy monounsaturated fats",
    ],
  },
  {
    original: { name: "White sugar", amount: "3/4 cup", isUnhealthy: true },
    substitute: { name: "Monk fruit sweetener", amount: "1/2 cup" },
    flavorMatchScore: 92,
    reason: "Monk fruit sweetener provides the same sweet flavor profile with zero glycemic impact. Its mogrosides mimic the sweetness receptors activated by sucrose.",
    benefits: [
      "Zero calories",
      "Diabetic-friendly",
      "No blood sugar spike",
      "Natural origin sweetener",
    ],
  },
  {
    original: { name: "Heavy cream", amount: "2 cups", isUnhealthy: true },
    substitute: { name: "Cashew cream", amount: "2 cups" },
    flavorMatchScore: 85,
    reason: "Cashew cream replicates the rich, creamy mouthfeel with similar lactone compounds. Its neutral flavor allows it to blend seamlessly in sauces.",
    benefits: [
      "Dairy-free alternative",
      "Lower in saturated fat",
      "Contains healthy minerals",
      "Vegan-friendly",
    ],
  },
];
export const chatMessages = [
  {
    id: 1,
    type: "bot" as const,
    content: "Hi there! 👋 I'm your Flavorytics assistant. I help you find healthy ingredient substitutions that still taste amazing! What recipe would you like to make today?",
  },
];
export const healthPreferences = [
  { id: "low-calorie", label: "Low Calorie", icon: "🔥" },
  { id: "diabetic-friendly", label: "Diabetic Friendly", icon: "💚" },
  { id: "allergy-free", label: "Allergy Free", icon: "🛡️" },
  { id: "heart-healthy", label: "Heart Healthy", icon: "❤️" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "keto", label: "Keto", icon: "🥑" },
];
