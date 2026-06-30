export interface SuccessStoryListItem {
  id: number;
  student_name: string;
  slug: string;
  headline: string;
  hook: string;
  photo_url: string;
  track: string;
  background: string;
  outcome_type: string;
  program_label: string;
  related_program_slug: string | null;
  before_title: string;
  after_title: string;
  company_name: string;
  salary_jump_percent: number;
  time_to_hire_months: number | null;
  is_placed: boolean;
  quote: string;
  is_featured: boolean;
  display_order: number;
  published_at: string | null;
}

export interface SuccessStoryJourneyItem {
  phase: string;
  title: string;
  description: string;
}

export interface SuccessStoryProject {
  title: string;
  description: string;
  skills: string[];
}

export interface SuccessStoryOutcome {
  label: string;
  value: string;
}

export interface SuccessStoryDetail extends SuccessStoryListItem {
  before_description: string;
  after_description: string;
  salary_before_lpa: string | null;
  salary_after_lpa: string | null;
  journey: SuccessStoryJourneyItem[];
  challenges: string[];
  projects: SuccessStoryProject[];
  outcomes: SuccessStoryOutcome[];
  advice: string;
}

export interface SuccessStoryListParams {
  page?: number;
  page_size?: number;
  track?: string;
  background?: string;
  outcome?: string;
  featured?: boolean;
}

export interface PaginatedSuccessStories {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuccessStoryListItem[];
}

export interface SuccessStorySummary {
  total_placed: number;
  average_salary_jump_percent: number;
  average_time_to_hire_months: number;
  total_stories: number;
}

export interface SuccessStoryFilters {
  tracks: string[];
  backgrounds: string[];
  outcomes: string[];
}
