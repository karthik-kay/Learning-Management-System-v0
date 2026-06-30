export type PublicReviewSort = "helpful" | "recent" | "highest";

export interface PublicReviewTarget {
  key: string;
  id: number;
  kind: "course" | "course_product" | "program";
  name: string;
  slug: string;
  category: string;
}

export interface PublicReview {
  id: number;
  rating: number;
  title: string;
  comment: string;
  sentiments: string[];
  is_verified: boolean;
  is_featured: boolean;
  helpful_count: number;
  published_at: string | null;
  created_at: string;
  student_name: string;
  student_initials: string;
  student_avatar: string;
  target: PublicReviewTarget;
}

export interface PublicReviewBreakdown {
  rating: number;
  count: number;
  percentage: number;
}

export interface PublicReviewSentiment {
  label: string;
  count: number;
}

export interface PublicReviewSummary {
  average_rating: number;
  total_reviews: number;
  verified_reviews: number;
  featured_reviews: number;
  breakdown: PublicReviewBreakdown[];
  sentiments: PublicReviewSentiment[];
  targets: PublicReviewTarget[];
}

export interface PublicReviewListParams {
  page?: number;
  page_size?: number;
  target?: string;
  rating?: number;
  sort?: PublicReviewSort;
  featured?: boolean;
  exclude_featured?: boolean;
}

export interface PaginatedPublicReviews {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: PublicReview[];
}
