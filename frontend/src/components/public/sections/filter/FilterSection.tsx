import { ReactNode } from "react";

import { Container } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export function FilterSection({
  children,
  className,
  sticky = false,
}: FilterSectionProps) {
  return (
    <section
      className={cn(
        "border-y border-[#E9EAF0] bg-white py-3",
        sticky && "sticky top-0 z-30 shadow-sm",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
