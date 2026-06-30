import { ReactNode } from "react";

import { Grid } from "@/components/shared/primitives";

interface FeaturedReviewsProps {
  children: ReactNode;
}

export function FeaturedReviews({ children }: FeaturedReviewsProps) {
  return (
    <Grid className="mt-8 grid-cols-1 gap-6 lg:grid-cols-2">{children}</Grid>
  );
}
