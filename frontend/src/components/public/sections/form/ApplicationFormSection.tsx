import { ReactNode } from "react";

import { Container } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

interface ApplicationFormSectionProps {
  content: ReactNode;
  form: ReactNode;
  formLabel?: string;
  className?: string;
  id?: string;
}

export function ApplicationFormSection({
  content,
  form,
  formLabel = "Application form",
  className,
  id,
}: ApplicationFormSectionProps) {
  return (
    <section id={id} className={cn("py-16 lg:py-24", className)}>
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)]">
          <div>{content}</div>
          <aside aria-label={formLabel} className="lg:sticky lg:top-24">
            {form}
          </aside>
        </div>
      </Container>
    </section>
  );
}
