import { publicService } from "@/services/public";
import { PublicFacultyListParams } from "@/types";

export const publicFacultyApi = {
  list: (params?: PublicFacultyListParams) =>
    publicService.getPublicFaculty(params),
  detail: (slug: string) => publicService.getPublicFacultyProfile(slug),
};
