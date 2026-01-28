import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-amber-600 text-primary-foreground shadow-sm hover:shadow-md",
        secondary:
          "border-transparent bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90",
        destructive:
          "border-transparent bg-gradient-to-r from-destructive to-red-800 text-destructive-foreground shadow-sm",
        outline:
          "border-border text-foreground hover:bg-muted/50 hover:border-primary/50",
        gold: "border-amber-700/50 bg-gradient-to-r from-amber-600 via-primary to-amber-600 text-primary-foreground shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
