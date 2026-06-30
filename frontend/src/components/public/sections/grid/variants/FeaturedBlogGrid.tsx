import { ReactNode } from "react";

import { Grid } from "@/components/shared/primitives";

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
      className={`grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr] ${className ?? ""}`}
    >
      <div className="min-w-0">{primary}</div>
      <div className="grid min-w-0 gap-6">{secondary}</div>
    </Grid>
  );
}
