import { useQuery } from "@tanstack/react-query";

import { publicContentApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/queryKeys";
import { UniversalSearchParams } from "@/types";

export function useUniversalSearch(params: UniversalSearchParams) {
  return useQuery({
    queryKey: queryKeys.public.search(params),
    queryFn: () => publicContentApi.search(params),
    enabled: params.q.trim().length >= 2,
  });
}
