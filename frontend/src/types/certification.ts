export interface Certificate {
  id: string;
  credential_id: string;
  student_name: string;
  course_title: string;
  course_slug: string | null;
  course_level: string | null;
  course_domain: string | null;
  faculty_name: string;
  total_duration: string;
  org: {
    name: string;
    ceo_name: string;
    ceo_title: string;
  };
  issued_at: string;
}

export type PublicCertificationType = "Program" | "Track" | "Course";
export type PublicCertificationDomain =
  | "Full Stack"
  | "Data"
  | "AI"
  | "DevOps"
  | "Security";

export interface PublicCertificationListItem {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  type: PublicCertificationType;
  certification_type: "program" | "track" | "course";
  domain: "full-stack" | "data" | "ai" | "devops" | "security";
  domain_label: PublicCertificationDomain;
  level: string;
  duration: string;
  skills: string[];
  is_featured: boolean;
}

export interface PublicCertificationDetail
  extends PublicCertificationListItem {
  description: string;
  outcomes: string[];
  requirements: string[];
  assessment_methods: string[];
  projects: string[];
  related_course_slug: string | null;
  related_program_slug: string | null;
  updated_at: string;
}

export interface PublicCertificationListParams {
  type?: "program" | "track" | "course";
  domain?: "full-stack" | "data" | "ai" | "devops" | "security";
}
