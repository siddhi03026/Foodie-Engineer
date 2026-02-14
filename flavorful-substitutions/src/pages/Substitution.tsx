import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { FlavorButton } from "@/components/ui/FlavorButton";
import { FlavorCard } from "@/components/ui/FlavorCard";
import {
  ArrowRight,
  Sparkles,
  FlaskConical,
  Leaf,
  Zap,
  Check
} from "lucide-react";

const Substitution = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { recipe, substitutions = [] } = location.state || {};

  const handleApplySubstitutions = () => {
    navigate("/result", { state: { recipe, substitutions } });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <FlaskConical className="w-4 h-4" />
              Powered by FlavorDB
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Smart Substitutions Found
            </h1>
            <p className="text-muted-foreground">
              Based on flavor compound analysis, here are your best alternatives
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-6 mb-8">
            {substitutions.map((sub: any, index: number) => {

              const score = parseInt(sub.flavorMatch);

              return (
                <motion.div
                  key={sub.original}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FlavorCard variant="elevated" hover={false}>
                    
                    {/* Replace Section */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">

                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center">
                          ❌
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Replace</div>
                          <div className="font-semibold text-foreground">
                            {sub.original}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-6 h-6 text-primary" />

                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center">
                          ✅
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">With</div>
                          <div className="font-semibold text-primary">
                            {sub.substitute}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Flavor Score */}
                    <div className="bg-sage-light/50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">
                            Flavor Match Score
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {score}%
                        </span>
                      </div>

                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1 }}
                          className="h-full gradient-primary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Why This Works
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {sub.reason}
                      </p>
                    </div>

                    {/* Simple Health Benefit */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Leaf className="w-4 h-4 text-success" />
                      <Check className="w-3 h-3 text-success" />
                      Healthier alternative with similar taste profile
                    </div>

                  </FlavorCard>
                </motion.div>
              );
            })}
          </div>

          {/* Button */}
          <div className="text-center">
            <FlavorButton onClick={handleApplySubstitutions} variant="hero" size="lg">
              <Zap className="w-5 h-5" />
              Apply Substitutions & See Results
            </FlavorButton>
          </div>

        </motion.div>
      </div>
    </Layout>
  );
};

export default Substitution;