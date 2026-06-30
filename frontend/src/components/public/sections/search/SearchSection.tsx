import { ReactNode } from "react";

import { Container } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

interface SearchSectionProps {
  children: ReactNode;
  className?: string;
}

export function SearchSection({ children, className }: SearchSectionProps) {
  return (
    <section className={cn("py-16 lg:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}
