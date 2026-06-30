import { PublicReviewListParams } from "@/types";
import { publicService } from "@/services/public";

export const publicReviewsApi = {
  list: (params?: PublicReviewListParams) =>
    publicService.getPublicReviews(params),
  summary: () => publicService.getPublicReviewSummary(),
};
