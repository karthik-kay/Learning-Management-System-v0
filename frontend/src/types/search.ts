export type UniversalSearchResultType =
  | "program"
  | "course"
  | "mentor"
  | "certification"
  | "blog"
  | "event"
  | "career"
  | "roadmap"
  | "story";

export interface UniversalSearchResult {
  id: string;
  type: UniversalSearchResultType;
  type_label: string;
  title: string;
  description: string;
  url: string;
  meta: string;
  is_featured: boolean;
}

export interface UniversalSearchResponse {
  query: string;
  count: number;
  category_counts: Partial<Record<UniversalSearchResultType, number>>;
  results: UniversalSearchResult[];
}

export interface UniversalSearchParams {
  q: string;
  type?: UniversalSearchResultType;
  limit?: number;
}
