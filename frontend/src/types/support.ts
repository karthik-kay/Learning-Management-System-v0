export type PublicSupportCategory =
  | "admissions"
  | "program"
  | "payment"
  | "placement"
  | "certificate"
  | "technical"
  | "account"
  | "other";

export interface PublicSupportRequestInput {
  name: string;
  email: string;
  phone: string;
  category: PublicSupportCategory;
  subject: string;
  message: string;
  source_path: string;
  honeypot?: string;
}

export interface PublicSupportReceipt {
  reference_code: string;
  name: string;
  email: string;
  phone: string;
  category: PublicSupportCategory;
  subject: string;
  message: string;
  source_path: string;
  created_at: string;
}
