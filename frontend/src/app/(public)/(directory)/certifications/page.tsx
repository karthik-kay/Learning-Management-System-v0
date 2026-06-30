import type { Metadata } from "next";

import { CertificationIndexView } from "@/components/public/sections/certifications/variants/CertificationIndexView";

export const metadata: Metadata = {
  title: "Certifications | LearnerSlate",
  description:
    "Explore project-based, assessment-backed, and verifiable LearnerSlate certifications.",
};

export default function CertificationsPage() {
  return <CertificationIndexView />;
}
