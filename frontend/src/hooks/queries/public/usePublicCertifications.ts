import { useQuery } from "@tanstack/react-query";

import { publicCertificationsApi } from "@/lib/api/public";
import { queryKeys } from "@/lib/query/queryKeys";
import { PublicCertificationListParams } from "@/types";

export function usePublicCertifications(params?: PublicCertificationListParams) {
  return useQuery({
    queryKey: queryKeys.public.certifications(params),
    queryFn: () => publicCertificationsApi.list(params),
  });
}

export function usePublicCertification(slug: string) {
  return useQuery({
    queryKey: queryKeys.public.certification(slug),
    queryFn: () => publicCertificationsApi.detail(slug),
    enabled: Boolean(slug),
  });
}
