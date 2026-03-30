import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage",
        {
          "bg-sage text-white shadow-[0_16px_36px_rgba(48,68,55,0.2)] hover:bg-sage-deep": variant === "primary",
          "border border-line bg-white text-foreground hover:border-sage/30 hover:bg-sand/80": variant === "secondary",
          "text-foreground hover:bg-sand/70": variant === "ghost",
        },
        className,
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;
