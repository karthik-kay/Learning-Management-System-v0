import { Metadata } from "next";
import { Suspense } from "react";

import { EventsIndexView } from "@/components/public/sections/events/variants/EventsIndexView";

export const metadata: Metadata = {
  title: "Events | LearnerSlate",
  description:
    "Join LearnerSlate webinars, workshops, exams, bounties, hackathons, and community events.",
};

export default function EventsPage() {
  return (
    <Suspense
      fallback={<div className="min-h-[70vh] animate-pulse bg-[#0F172A]" />}
    >
      <EventsIndexView />
    </Suspense>
  );
}
