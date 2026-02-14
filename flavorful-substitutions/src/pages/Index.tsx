import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { FlavorCard } from "@/components/ui/FlavorCard";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-food-tech.jpg";
import { 
  MessageCircle, 
  Search, 
  Sparkles, 
  ChefHat,
  Leaf,
  Heart,
  Zap,
  ArrowRight,
  Database,
  FlaskConical
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Conversational AI",
    description: "Chat naturally about your recipes and dietary needs. Our AI understands context and preferences.",
  },
  {
    icon: Database,
    title: "RecipeDB Integration",
    description: "Access thousands of recipes with detailed ingredient breakdowns and nutritional data.",
  },
  {
    icon: FlaskConical,
    title: "FlavorDB Science",
    description: "Leveraging flavor compound analysis to find substitutes that maintain taste profiles.",
  },
  {
    icon: Heart,
    title: "Health-First",
    description: "Support for diabetic-friendly, low-calorie, allergy-free, and other dietary requirements.",
  },
];

const steps = [
  { number: "01", title: "Tell Us Your Recipe", description: "Share what you're cooking today" },
  { number: "02", title: "Identify Concerns", description: "We detect unhealthy or restricted ingredients" },
  { number: "03", title: "Flavor Analysis", description: "FlavorDB matches compound profiles" },
  { number: "04", title: "Get Substitutes", description: "Receive smart, tasty alternatives" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Flavor Intelligence
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Healthy Substitutions{" "}
                <span className="text-gradient">Without Sacrificing Taste</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Flavorytics uses flavor-compound intelligence to find the perfect healthy alternatives 
                for any ingredient—keeping your dishes delicious while meeting your dietary needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/chat">
                  <FlavorButton variant="hero" size="lg" className="w-full sm:w-auto">
                    <ChefHat className="w-5 h-5" />
                    Start Cooking Smart
                  </FlavorButton>
                </Link>
                <Link to="/about">
                  <FlavorButton variant="outline" size="lg" className="w-full sm:w-auto">
                    How It Works
                    <ArrowRight className="w-4 h-4" />
                  </FlavorButton>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-foreground">1000+</div>
                  <div className="text-sm text-muted-foreground">Recipes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">25K+</div>
                  <div className="text-sm text-muted-foreground">Flavor Compounds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-sm text-muted-foreground">Taste Match</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Fresh healthy ingredients with food science visualization"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-1/4 bg-card rounded-xl p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-peach flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">87% Match</div>
                    <div className="text-xs text-muted-foreground">Avocado → Butter</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 bottom-1/4 bg-card rounded-xl p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">-50% Calories</div>
                    <div className="text-xs text-muted-foreground">Healthier swap</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powered by Food Science
            </h2>
            <p className="text-muted-foreground">
              We combine AI conversation with deep flavor chemistry analysis to deliver 
              substitutions that actually work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FlavorCard key={feature.title} variant="gradient" className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              </FlavorCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Flavorytics Works
            </h2>
            <p className="text-muted-foreground">
              From recipe to healthy alternative in four simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-sage-light mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-3 w-6 h-6 text-muted-foreground/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FlavorCard variant="elevated" hover={false} className="gradient-primary text-center py-16 px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Cook Smarter?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Start your healthy cooking journey today. No signup required.
              </p>
              <Link to="/chat">
                <FlavorButton variant="secondary" size="xl">
                  <ChefHat className="w-5 h-5" />
                  Start Cooking Smart
                </FlavorButton>
              </Link>
            </motion.div>
          </FlavorCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Flavorytics</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by RecipeDB & FlavorDB • Made with 💚 for healthy eating
          </p>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
