import { Metadata } from "next";
import { Suspense } from "react";

import { ReviewIndexView } from "@/components/public/sections/testimonials/variants/ReviewIndexView";

export const metadata: Metadata = {
  title: "Learner Reviews | LearnerSlate",
  description:
    "Read verified learner reviews of LearnerSlate programs and courses.",
  openGraph: {
    title: "LearnerSlate Reviews",
    description:
      "Honest feedback from learners building practical skills and careers.",
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] animate-pulse bg-[#F8FAFC] p-10">
          <div className="mx-auto h-96 max-w-7xl rounded-3xl bg-[#18263A]" />
        </div>
      }
    >
      <ReviewIndexView />
    </Suspense>
  );
}
