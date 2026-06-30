import { useQuery } from "@tanstack/react-query";

import { publicFacultyApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/queryKeys";
import { PublicFacultyListParams } from "@/types";

export function usePublicFaculty(params?: PublicFacultyListParams) {
  return useQuery({
    queryKey: queryKeys.public.faculty(params),
    queryFn: () => publicFacultyApi.list(params),
  });
}

export function usePublicFacultyProfile(slug: string) {
  return useQuery({
    queryKey: queryKeys.public.facultyProfile(slug),
    queryFn: () => publicFacultyApi.detail(slug),
    enabled: Boolean(slug),
  });
}
