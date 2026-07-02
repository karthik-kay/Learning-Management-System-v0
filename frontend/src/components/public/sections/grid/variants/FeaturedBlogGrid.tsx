import type { ReactNode } from "react";

import { Grid } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

interface FeaturedBlogGridProps {
  primary: ReactNode;
  secondary: ReactNode[];
  className?: string;
}

export function FeaturedBlogGrid({
  primary,
  secondary,
  className,
}: FeaturedBlogGridProps) {
  return (
    <Grid
      className={cn(
        "grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]",
        className,
      )}
    >
      <div className="min-w-0 lg:h-full">{primary}</div>
      <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-2">
        {secondary}
      </div>
    </Grid>
  );
}
