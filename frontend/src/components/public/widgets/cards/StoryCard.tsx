import { ArrowRight, Clock3, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SuccessStoryListItem } from "@/types";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: SuccessStoryListItem;
  featured?: boolean;
}

export function StoryCard({ story, featured = false }: StoryCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]",
        featured && "grid lg:grid-cols-[0.75fr_1.25fr]",
      )}
    >
      <div
        className={cn(
          "relative flex min-h-48 items-end overflow-hidden bg-gradient-to-br from-[#22577A] via-[#38A3A5] to-[#57CC99] p-6",
          featured && "min-h-72 lg:min-h-full",
        )}
      >
        {story.photo_url ? (
          <Image
            src={story.photo_url}
            alt={story.student_name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="absolute right-5 top-4 text-8xl font-black text-white/12">
            {story.student_name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
        )}
        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {story.program_label}
          </span>
          <p className="mt-4 text-xl font-black text-white">
            {story.student_name}
          </p>
          {story.company_name && (
            <p className="mt-1 text-sm text-white/80">{story.company_name}</p>
          )}
        </div>
      </div>

      <div className={cn("flex flex-col p-6", featured && "justify-center p-8 lg:p-10")}>
        {featured && (
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FF7A0E]">
            Featured transformation
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">
            {story.before_title}
          </span>
          <ArrowRight className="size-4 text-[#FF7A0E]" />
          <span className="rounded-lg bg-[#57CC99]/15 px-3 py-2 text-[#167D7F]">
            {story.after_title}
          </span>
        </div>

        <h2 className={cn("mt-5 font-black leading-tight text-[#0F172A]", featured ? "text-3xl" : "text-xl")}>
          {story.headline}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#64748B]">{story.hook}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-[#475569]">
          {story.salary_jump_percent > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="size-4 text-[#167D7F]" />
              {story.salary_jump_percent}% salary growth
            </span>
          )}
          {story.time_to_hire_months && (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4 text-[#167D7F]" />
              {story.time_to_hire_months} months to hire
            </span>
          )}
        </div>

        <Link
          href={`/success-stories/${story.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#22577A] transition group-hover:text-[#FF7A0E]"
        >
          Read {story.student_name.split(" ")[0]}&apos;s story
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
