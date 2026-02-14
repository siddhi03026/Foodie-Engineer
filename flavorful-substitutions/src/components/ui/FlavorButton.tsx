import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const flavorButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:shadow-card",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        hero:
          "gradient-primary text-primary-foreground shadow-card hover:shadow-elevated hover:-translate-y-1 hover:shadow-glow",
        peach:
          "bg-peach text-secondary-foreground hover:bg-peach-dark shadow-soft hover:shadow-card",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface FlavorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof flavorButtonVariants> {
  asChild?: boolean;
}

const FlavorButton = React.forwardRef<HTMLButtonElement, FlavorButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(flavorButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
FlavorButton.displayName = "FlavorButton";

export { FlavorButton, flavorButtonVariants };
