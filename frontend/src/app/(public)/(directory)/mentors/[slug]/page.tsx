import { Metadata } from "next";

import { MentorProfile } from "@/components/public/sections/mentor/variants/MentorProfile";
import { publicService } from "@/services/public";

interface MentorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MentorPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const mentor = await publicService.getPublicFacultyProfile(slug);
    return {
      title: `${mentor.display_name} | LearnerSlate Mentor`,
      description: mentor.headline || mentor.bio.slice(0, 160),
    };
  } catch {
    return {
      title: "Mentor | LearnerSlate",
      description: "Meet a LearnerSlate industry mentor.",
    };
  }
}

export default async function MentorPage({ params }: MentorPageProps) {
  const { slug } = await params;
  return <MentorProfile slug={slug} />;
}
