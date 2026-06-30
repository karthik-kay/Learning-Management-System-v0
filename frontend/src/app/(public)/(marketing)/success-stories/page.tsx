import type { Metadata } from "next";

import { SuccessStoriesIndexView } from "@/components/public/sections/testimonials/variants/SuccessStoriesIndexView";

export const metadata: Metadata = {
  title: "Success Stories | LearnerSlate",
  description:
    "Explore learner journeys, portfolio projects, placement outcomes, and career transformations.",
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesIndexView />;
}
