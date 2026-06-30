import type { Metadata } from "next";

import { CertificationDetailView } from "@/components/public/sections/certifications/variants/CertificationDetailView";
import { publicService } from "@/services/public";

interface CertificationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CertificationPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const certification = await publicService.getPublicCertification(slug);
    return {
      title: `${certification.title} | LearnerSlate`,
      description: certification.short_description,
    };
  } catch {
    return {
      title: "Certification | LearnerSlate",
      description:
        "Explore practical, assessment-backed LearnerSlate certifications.",
    };
  }
}

export default async function CertificationPage({
  params,
}: CertificationPageProps) {
  const { slug } = await params;
  return <CertificationDetailView slug={slug} />;
}
