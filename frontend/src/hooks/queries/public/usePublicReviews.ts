import { useQuery } from "@tanstack/react-query";

import { publicReviewsApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/queryKeys";
import { PublicReviewListParams } from "@/types";

export function usePublicReviews(params?: PublicReviewListParams) {
  return useQuery({
    queryKey: queryKeys.public.reviews(params),
    queryFn: () => publicReviewsApi.list(params),
  });
}

export function usePublicReviewSummary() {
  return useQuery({
    queryKey: queryKeys.public.reviewSummary(),
    queryFn: publicReviewsApi.summary,
  });
}
