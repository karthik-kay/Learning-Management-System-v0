import { publicService } from "@/services/public";
import { PublicCertificationListParams } from "@/types";

export const publicCertificationsApi = {
  list: (params?: PublicCertificationListParams) =>
    publicService.getPublicCertifications(params),
  detail: (slug: string) => publicService.getPublicCertification(slug),
};
