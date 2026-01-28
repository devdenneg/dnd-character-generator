import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-amber-700 text-primary-foreground shadow-md hover:shadow-lg hover:from-amber-500 hover:to-amber-700 border border-amber-900/30",
        destructive:
          "bg-gradient-to-b from-destructive to-red-900 text-destructive-foreground shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-900",
        outline:
          "border-2 border-border bg-transparent shadow-sm hover:bg-muted/50 hover:text-accent hover:border-primary/50",
        secondary:
          "bg-gradient-to-b from-secondary to-secondary/80 text-secondary-foreground shadow-sm hover:shadow-md hover:from-secondary/90 hover:to-secondary/70 border border-border",
        ghost: "hover:bg-muted/50 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline hover:text-amber-400",
        tavern:
          "bg-gradient-to-b from-primary via-amber-600 to-amber-800 text-primary-foreground shadow-md hover:shadow-xl hover:from-amber-400 hover:via-primary hover:to-amber-700 border-2 border-amber-900/50 font-semibold",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
