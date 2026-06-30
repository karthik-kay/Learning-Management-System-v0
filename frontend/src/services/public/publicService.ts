import {
  BlogCategory,
  BlogListParams,
  BlogPostDetail,
  BlogPostListItem,
  CareerPathDetail,
  CareerPathListItem,
  EventListParams,
  FAQListParams,
  PublicContentListParams,
  PublicDomain,
  PublicCourseDetail,
  PublicCourseProductDetail,
  PublicCourseProductListItem,
  PublicEventDetail,
  PublicEventListItem,
  PublicFAQ,
  PublicFacultyProfile,
  PublicFacultyListItem,
  PublicFacultyListParams,
  PublicLearningProgramDetail,
  PublicLearningProgramListItem,
  PublicPageContent,
  PublicPageKey,
  RoadmapDetail,
  RoadmapListItem,
  PaginatedPublicReviews,
  PublicReviewListParams,
  PublicReviewSummary,
  InstructorApplicationInput,
  PartnerEnquiryInput,
  PublicFormReceipt,
  PublicCertificationDetail,
  PublicCertificationListItem,
  PublicCertificationListParams,
  PaginatedSuccessStories,
  SuccessStoryDetail,
  SuccessStoryFilters,
  SuccessStoryListParams,
  SuccessStorySummary,
  PublicSupportReceipt,
  PublicSupportRequestInput,
  UniversalSearchParams,
  UniversalSearchResponse,
} from "@/types";

import { publicRequest, toQueryString } from "./publicRequest";

function normalizePublicCourseProduct<
  T extends PublicCourseProductListItem | PublicCourseProductDetail,
>(course: T): T {
  const firstInstructor = course.instructors?.[0];
  const displayPriceInr =
    typeof course.display_price_paise === "number"
      ? course.display_price_paise / 100
      : undefined;
  const activePrice =
    course.active_price ??
    (typeof course.display_price_paise === "number"
      ? {
          base_paise: course.display_price_paise,
          final_paise: course.display_price_paise,
          base_inr: course.display_price_paise / 100,
          final_inr: course.display_price_paise / 100,
        }
      : null);

  return {
    ...course,
    active_price: activePrice,
    description: course.description ?? course.short_description,
    faculty_name:
      course.faculty_name ||
      firstInstructor?.display_name ||
      course.instructor_name ||
      "",
    instructor_image: course.instructor_image ?? firstInstructor?.avatar ?? null,
    original_price: course.original_price ?? displayPriceInr ?? null,
    price:
      course.price ??
      activePrice?.final_inr ??
      activePrice?.base_inr ??
      displayPriceInr ??
      0,
    course_type: course.course_type ?? "self_paced",
  };
}

export const publicService = {
  getPublicCourseProducts: async () => {
    const courses = await publicRequest<PublicCourseProductListItem[]>(
      "/public/course-products/",
    );
    return courses.map(normalizePublicCourseProduct);
  },

  getPublicCourseProduct: async (slug: string) => {
    const course = await publicRequest<PublicCourseProductDetail>(
      `/public/course-products/${slug}/`,
    );
    return normalizePublicCourseProduct(course);
  },

  getPublicCourses: async () => {
    const courses = await publicRequest<PublicCourseProductListItem[]>(
      "/public/course-products/",
    );
    return courses.map(normalizePublicCourseProduct);
  },

  getPublicCourse: async (
    slugOrCourseId: string | number,
  ): Promise<PublicCourseDetail> => {
    const endpoint =
      typeof slugOrCourseId === "number"
        ? `/courses/public/courses/${slugOrCourseId}/`
        : `/public/course-products/${slugOrCourseId}/`;
    const course = await publicRequest<PublicCourseProductDetail>(endpoint);
    return normalizePublicCourseProduct(course);
  },

  getPublicPrograms: () =>
    publicRequest<PublicLearningProgramListItem[]>("/public/programs/"),

  getPublicProgram: (slug: string) =>
    publicRequest<PublicLearningProgramDetail>(`/public/programs/${slug}/`),

  getPublicFaculty: (params?: PublicFacultyListParams) =>
    publicRequest<PublicFacultyListItem[]>(
      `/public/faculty/${toQueryString(params)}`,
    ),

  getPublicFacultyProfile: (slug: string) =>
    publicRequest<PublicFacultyProfile>(`/public/faculty/${slug}/`),

  getPublicPage: (pageKey: PublicPageKey) =>
    publicRequest<PublicPageContent>(`/public/content/pages/${pageKey}/`),

  getPublicFAQs: (params?: FAQListParams) =>
    publicRequest<PublicFAQ[]>(
      `/public/content/faqs/${toQueryString(params)}`,
    ),

  getBlogCategories: () =>
    publicRequest<BlogCategory[]>("/public/content/blog/categories/"),

  getBlogPosts: (params?: BlogListParams) =>
    publicRequest<BlogPostListItem[]>(
      `/public/content/blog/${toQueryString(params)}`,
    ),

  getBlogPost: (slug: string) =>
    publicRequest<BlogPostDetail>(`/public/content/blog/${slug}/`),

  getPublicDomains: () =>
    publicRequest<PublicDomain[]>("/public/content/domains/"),

  getCareerPaths: (params?: PublicContentListParams) =>
    publicRequest<CareerPathListItem[]>(
      `/public/content/career-paths/${toQueryString(params)}`,
    ),

  getCareerPath: (slug: string) =>
    publicRequest<CareerPathDetail>(
      `/public/content/career-paths/${slug}/`,
    ),

  getRoadmaps: (params?: PublicContentListParams & { career_path?: string }) =>
    publicRequest<RoadmapListItem[]>(
      `/public/content/roadmaps/${toQueryString(params)}`,
    ),

  getRoadmap: (slug: string) =>
    publicRequest<RoadmapDetail>(`/public/content/roadmaps/${slug}/`),

  getPublicEvents: (params?: EventListParams) =>
    publicRequest<PublicEventListItem[]>(
      `/public/content/events/${toQueryString(params)}`,
    ),

  getPublicEvent: (slug: string) =>
    publicRequest<PublicEventDetail>(`/public/content/events/${slug}/`),

  getPublicReviews: (params?: PublicReviewListParams) =>
    publicRequest<PaginatedPublicReviews>(
      `/public/reviews/${toQueryString(params)}`,
    ),

  getPublicReviewSummary: () =>
    publicRequest<PublicReviewSummary>("/public/reviews/summary/"),

  getPublicCertifications: (params?: PublicCertificationListParams) =>
    publicRequest<PublicCertificationListItem[]>(
      `/public/certifications/${toQueryString(params)}`,
    ),

  getPublicCertification: (slug: string) =>
    publicRequest<PublicCertificationDetail>(`/public/certifications/${slug}/`),

  getSuccessStories: (params?: SuccessStoryListParams) =>
    publicRequest<PaginatedSuccessStories>(
      `/public/content/success-stories/${toQueryString(params)}`,
    ),

  getSuccessStory: (slug: string) =>
    publicRequest<SuccessStoryDetail>(
      `/public/content/success-stories/${slug}/`,
    ),

  getSuccessStorySummary: () =>
    publicRequest<SuccessStorySummary>(
      "/public/content/success-stories/summary/",
    ),

  getSuccessStoryFilters: () =>
    publicRequest<SuccessStoryFilters>(
      "/public/content/success-stories/filters/",
    ),

  search: (params: UniversalSearchParams) =>
    publicRequest<UniversalSearchResponse>(
      `/public/content/search/${toQueryString(params)}`,
    ),

  submitSupportRequest: (data: PublicSupportRequestInput) =>
    publicRequest<PublicSupportReceipt>("/public/support/requests/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitInstructorApplication: (data: InstructorApplicationInput) =>
    publicRequest<PublicFormReceipt>("/public/conversion/instructor-applications/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitPartnerEnquiry: (data: PartnerEnquiryInput) =>
    publicRequest<PublicFormReceipt>("/public/conversion/partner-enquiries/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
