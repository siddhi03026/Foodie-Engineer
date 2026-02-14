import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FlavorCardProps {
  variant?: "default" | "elevated" | "bordered" | "gradient";
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FlavorCard = React.forwardRef<HTMLDivElement, FlavorCardProps>(
  ({ className, variant = "default", hover = true, children }, ref) => {
    const variants = {
      default: "bg-card shadow-soft",
      elevated: "bg-card shadow-card",
      bordered: "bg-card border-2 border-border",
      gradient: "gradient-card shadow-soft",
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "rounded-2xl p-6",
          variants[variant],
          hover && "transition-all duration-300 hover:shadow-card hover:-translate-y-1",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);
FlavorCard.displayName = "FlavorCard";

export { FlavorCard };
