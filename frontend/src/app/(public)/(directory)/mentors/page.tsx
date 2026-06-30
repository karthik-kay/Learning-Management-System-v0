import { Metadata } from "next";

import { MentorDirectoryView } from "@/components/public/sections/mentor/variants/MentorDirectoryView";

export const metadata: Metadata = {
  title: "Industry Mentors | LearnerSlate",
  description:
    "Explore verified LearnerSlate mentors across engineering, data, AI, cloud, security, and career development.",
};

export default function MentorsPage() {
  return <MentorDirectoryView />;
}
