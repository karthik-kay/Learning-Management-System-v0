export interface InstructorApplicationInput {
  name: string;
  email: string;
  phone: string;
  current_role: string;
  company: string;
  expertise: string[];
  years_experience: number;
  linkedin_url: string;
  portfolio_url: string;
  motivation: string;
  honeypot?: string;
}

export interface PartnerEnquiryInput {
  organization_name: string;
  contact_name: string;
  work_email: string;
  phone: string;
  partnership_type: "institution" | "pro" | "placement";
  website_url: string;
  organization_size: string;
  message: string;
  honeypot?: string;
}

export interface PublicFormReceipt {
  id: number;
  created_at: string;
}
