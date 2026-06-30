import { ArrowRight, BadgeCheck, Clock3, Star, Users } from "lucide-react";
import Link from "next/link";

import { MentorCard } from "@/components/public/widgets/cards/MentorCard";
import { Grid } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { PublicFacultyListItem } from "@/types";

interface MentorGridProps {
  mentors: PublicFacultyListItem[];
}

export function MentorGrid({ mentors }: MentorGridProps) {
  return (
    <Grid className="grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.id}
          className="border border-[#E2E8F0]"
          image={
            <div className="h-64 bg-gradient-to-br from-[#0F172A] via-[#22577A] to-[#38A3A5]">
              <div
                role="img"
                aria-label=""
                className="h-full bg-cover bg-center"
                style={
                  mentor.avatar
                    ? { backgroundImage: `url("${mentor.avatar}")` }
                    : undefined
                }
              />
            </div>
          }
          role={
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#22577A] shadow-sm">
              {mentor.expertise[0] || "Industry Mentor"}
            </span>
          }
          name={
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {mentor.display_name}
              </h2>
              {mentor.is_verified && (
                <BadgeCheck className="size-4 text-[#38A3A5]" />
              )}
            </div>
          }
          company={
            <div>
              <p className="text-sm font-semibold text-[#475569]">
                {[mentor.job_title, mentor.company].filter(Boolean).join(" · ") ||
                  mentor.headline}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-[#38A3A5]" />
                  {mentor.years_experience}+ years
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5 text-[#38A3A5]" />
                  {mentor.students_mentored} learners
                </span>
                {mentor.review_count > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-3.5 fill-[#FF7A0E] text-[#FF7A0E]" />
                    {mentor.average_rating} ({mentor.review_count})
                  </span>
                )}
              </div>
            </div>
          }
          actions={
            <Button
              asChild
              variant="outline"
              className="w-full border-[#CBD5E1] hover:border-[#38A3A5] hover:bg-[#F0FDFA]"
            >
              <Link href={`/mentors/${mentor.slug}`}>
                View profile
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
      ))}
    </Grid>
  );
}
