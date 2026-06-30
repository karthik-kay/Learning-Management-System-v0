import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ArticleSectionProps {
  children: ReactNode;
  className?: string;
}

export function ArticleSection({
  children,
  className,
}: ArticleSectionProps) {
  return (
    <article className={cn("min-w-0 text-[#334155]", className)}>
      {children}
    </article>
  );
}
