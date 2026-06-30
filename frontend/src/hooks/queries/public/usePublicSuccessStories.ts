import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { publicSuccessStoriesApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/queryKeys";
import { SuccessStoryListParams } from "@/types";

export function usePublicSuccessStories(params?: SuccessStoryListParams) {
  return useInfiniteQuery({
    queryKey: queryKeys.public.successStories(params),
    queryFn: ({ pageParam }) =>
      publicSuccessStoriesApi.list({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length + 1 : undefined,
  });
}

export function usePublicSuccessStory(slug: string) {
  return useQuery({
    queryKey: queryKeys.public.successStory(slug),
    queryFn: () => publicSuccessStoriesApi.detail(slug),
    enabled: Boolean(slug),
  });
}

export function useSuccessStorySummary() {
  return useQuery({
    queryKey: queryKeys.public.successStorySummary(),
    queryFn: publicSuccessStoriesApi.summary,
  });
}

export function useSuccessStoryFilters() {
  return useQuery({
    queryKey: queryKeys.public.successStoryFilters(),
    queryFn: publicSuccessStoriesApi.filters,
  });
}
