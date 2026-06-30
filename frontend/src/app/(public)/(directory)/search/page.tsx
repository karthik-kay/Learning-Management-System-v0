import type { Metadata } from "next";
import { Suspense } from "react";

import { UniversalSearchView } from "@/components/public/sections/search/variants/UniversalSearchView";

export const metadata: Metadata = {
  title: "Search | LearnerSlate",
  description:
    "Search LearnerSlate programmes, courses, mentors, certifications, career paths, events, articles, and learner stories.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-[#0F172A]" />}>
      <UniversalSearchView />
    </Suspense>
  );
}
