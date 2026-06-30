import type { Metadata } from "next";

import { FAQPageView } from "@/components/public/sections/faq/variants/FAQPageView";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | LearnerSlate",
  description:
    "Find answers about LearnerSlate admissions, programmes, payments, placements, certifications, and platform support.",
};

export default function FAQPage() {
  return <FAQPageView />;
}
