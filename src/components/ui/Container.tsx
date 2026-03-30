import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "md" | "lg" | "xl";
}

const sizeClasses = {
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return <div ref={ref} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)} {...props} />;
  },
);

Container.displayName = "Container";

export default Container;
