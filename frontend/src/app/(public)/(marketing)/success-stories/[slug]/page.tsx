import type { Metadata } from "next";

import { SuccessStoryDetailView } from "@/components/public/sections/testimonials/variants/SuccessStoryDetailView";
import { publicService } from "@/services/public";

interface SuccessStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SuccessStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const story = await publicService.getSuccessStory(slug);
    return {
      title: `${story.headline} | LearnerSlate`,
      description: story.hook,
    };
  } catch {
    return {
      title: "Learner Success Story | LearnerSlate",
      description:
        "See how practical learning and project evidence can support career progress.",
    };
  }
}

export default async function SuccessStoryPage({
  params,
}: SuccessStoryPageProps) {
  const { slug } = await params;
  return <SuccessStoryDetailView slug={slug} />;
}
