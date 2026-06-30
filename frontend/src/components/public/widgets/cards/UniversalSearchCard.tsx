import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Map,
  Newspaper,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { UniversalSearchResult, UniversalSearchResultType } from "@/types";

const icons = {
  program: GraduationCap,
  course: BookOpen,
  mentor: UserRound,
  certification: Award,
  blog: Newspaper,
  event: CalendarDays,
  career: Target,
  roadmap: Map,
  story: Sparkles,
} satisfies Record<UniversalSearchResultType, typeof Award>;

export function UniversalSearchCard({
  result,
}: {
  result: UniversalSearchResult;
}) {
  const Icon = icons[result.type];

  return (
    <Link
      href={result.url}
      className="group flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_12px_38px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#38A3A5]/50 hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)]"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#22577A] transition group-hover:bg-[#22577A] group-hover:text-white">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-[#FF7A0E]">
            {result.type_label}
          </span>
          {result.meta && (
            <span className="truncate text-xs text-[#94A3B8]">
              · {result.meta}
            </span>
          )}
        </span>
        <span className="mt-2 block text-lg font-black text-[#0F172A]">
          {result.title}
        </span>
        <span className="mt-2 line-clamp-2 text-sm leading-6 text-[#64748B]">
          {result.description}
        </span>
      </span>
      <ArrowRight className="mt-1 size-5 shrink-0 text-[#CBD5E1] transition group-hover:translate-x-1 group-hover:text-[#FF7A0E]" />
    </Link>
  );
}
