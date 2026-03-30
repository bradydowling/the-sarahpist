import type { HTMLAttributes, ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  containerClassName?: string;
}

export default function Section({
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)} {...props}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="font-serif text-4xl leading-none text-foreground sm:text-5xl">{title}</h2> : null}
            {description ? <p className="mt-4 text-lg leading-8 text-muted">{description}</p> : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
