import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { FlavorCard } from "@/components/ui/FlavorCard";
import { 
  MessageCircle, 
  Database, 
  FlaskConical, 
  Sparkles, 
  ChefHat,
  ArrowRight,
  User,
  Bot,
  Leaf
} from "lucide-react";

const flowSteps = [
  {
    icon: User,
    title: "User Input",
    description: "Share your recipe and dietary preferences through our conversational interface",
    color: "bg-peach",
  },
  {
    icon: Bot,
    title: "Chatbot",
    description: "Our AI assistant understands your needs and guides the conversation",
    color: "gradient-primary",
  },
  {
    icon: Database,
    title: "RecipeDB",
    description: "Fetches detailed recipe data including ingredients and nutrition info",
    color: "bg-sage-light",
  },
  {
    icon: FlaskConical,
    title: "FlavorDB",
    description: "Analyzes flavor compounds to find taste-matching alternatives",
    color: "bg-mint",
  },
  {
    icon: Sparkles,
    title: "Smart Match",
    description: "AI combines all data to suggest optimal healthy substitutions",
    color: "bg-peach",
  },
  {
    icon: ChefHat,
    title: "Final Recipe",
    description: "Get your healthified recipe with full nutrition comparison",
    color: "gradient-primary",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <FlaskConical className="w-4 h-4" />
              The Science Behind Flavorytics
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From your favorite recipes to healthier versions — powered by AI and flavor science
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="mb-16">
            <div className="grid md:grid-cols-6 gap-4">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <FlavorCard variant="gradient" className="text-center h-full">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </FlavorCard>
                  
                  {index < flowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FlavorCard variant="elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">RecipeDB Integration</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                RecipeDB is a comprehensive database containing thousands of recipes with detailed 
                ingredient breakdowns, nutritional information, and cooking instructions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Detailed ingredient lists with quantities
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Complete nutritional data per serving
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Cuisine and dietary categorization
                </li>
              </ul>
            </FlavorCard>

            <FlavorCard variant="elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">FlavorDB Science</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                FlavorDB contains flavor compound profiles for thousands of ingredients, enabling 
                us to find substitutes that match the taste of the original.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  25,000+ flavor compound entries
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Chemical similarity scoring
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Taste profile matching algorithms
                </li>
              </ul>
            </FlavorCard>
          </div>

          {/* Problem & Solution */}
          <FlavorCard variant="bordered" className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">The Problem</h3>
                <p className="text-muted-foreground text-sm">
                  Finding healthy ingredient alternatives is challenging. Most substitution guides 
                  focus only on function (e.g., "use applesauce instead of butter") without 
                  considering whether the final dish will taste the same. This leads to disappointing 
                  results and people giving up on healthier eating.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Our Solution</h3>
                <p className="text-muted-foreground text-sm">
                  Flavorytics uses flavor-compound analysis to find substitutes that not only serve 
                  the same culinary function but also share similar taste profiles. This means your 
                  healthified recipes actually taste great, making it easier to stick to your 
                  dietary goals.
                </p>
              </div>
            </div>
          </FlavorCard>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <FlavorCard variant="elevated" hover={false} className="gradient-primary py-12">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Ready to Try It?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Start a conversation with our AI assistant and get personalized 
                healthy recipe substitutions in seconds.
              </p>
              <Link to="/chat">
                <FlavorButton variant="secondary" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Start Cooking Smart
                </FlavorButton>
              </Link>
            </FlavorCard>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
