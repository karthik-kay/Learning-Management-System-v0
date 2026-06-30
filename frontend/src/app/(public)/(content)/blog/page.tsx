import { Metadata } from "next";

import { BlogIndexView } from "@/components/public/sections/article/variants/BlogIndexView";

export const metadata: Metadata = {
  title: "Blog | LearnerSlate",
  description:
    "Practical engineering lessons, learning roadmaps, career advice, and learner stories from LearnerSlate.",
  openGraph: {
    title: "LearnerSlate Blog",
    description:
      "Practical ideas for building skills and growing a technology career.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogIndexView />;
}
