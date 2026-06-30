import { publicService } from "@/services/public";
import { SuccessStoryListParams } from "@/types";

export const publicSuccessStoriesApi = {
  list: (params?: SuccessStoryListParams) =>
    publicService.getSuccessStories(params),
  detail: (slug: string) => publicService.getSuccessStory(slug),
  summary: () => publicService.getSuccessStorySummary(),
  filters: () => publicService.getSuccessStoryFilters(),
};
