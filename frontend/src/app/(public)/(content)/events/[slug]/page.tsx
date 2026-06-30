import { Metadata } from "next";

import { EventDetailView } from "@/components/public/sections/events/variants/EventDetailView";
import { publicService } from "@/services/public";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await publicService.getPublicEvent(slug);
    return {
      title: `${event.title} | LearnerSlate Events`,
      description: event.short_description,
    };
  } catch {
    return {
      title: "Event | LearnerSlate",
      description: "Join a LearnerSlate live learning event.",
    };
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  return <EventDetailView slug={slug} />;
}
