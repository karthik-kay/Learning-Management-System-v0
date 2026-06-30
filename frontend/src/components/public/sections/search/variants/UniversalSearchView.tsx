"use client";

import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LoaderCircle,
  Map,
  Newspaper,
  Search,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";

import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { SearchSection } from "@/components/public/sections/search/SearchSection";
import { UniversalSearchCard } from "@/components/public/widgets/cards/UniversalSearchCard";
import { SearchBar } from "@/components/public/widgets/discovery/SearchBar";
import { Button } from "@/components/ui/button";
import { useUniversalSearch } from "@/hooks/queries/public";
import { UniversalSearchResultType } from "@/types";
import { cn } from "@/lib/utils";

const resultTypes = [
  ["program", "Programs", GraduationCap],
  ["course", "Courses", BookOpen],
  ["mentor", "Mentors", UserRound],
  ["certification", "Certificates", Award],
  ["blog", "Articles", Newspaper],
  ["event", "Events", CalendarDays],
  ["career", "Career paths", Target],
  ["roadmap", "Roadmaps", Map],
  ["story", "Stories", Sparkles],
] as const;

const validTypes = new Set<UniversalSearchResultType>(
  resultTypes.map(([type]) => type),
);

export function UniversalSearchView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = searchParams.get("type") as UniversalSearchResultType | null;
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [type, setType] = useState<"all" | UniversalSearchResultType>(
    initialType && validTypes.has(initialType) ? initialType : "all",
  );
  const deferredQuery = useDeferredValue(query.trim());
  const overviewQuery = useUniversalSearch({ q: deferredQuery, limit: 20 });
  const filteredQuery = useUniversalSearch({
    q: deferredQuery,
    type: type === "all" ? undefined : type,
    limit: 20,
  });
  const activeQuery = type === "all" ? overviewQuery : filteredQuery;

  useEffect(() => {
    const params = new URLSearchParams();
    if (deferredQuery) params.set("q", deferredQuery);
    if (type !== "all") params.set("type", type);
    const suffix = params.toString();
    router.replace(suffix ? `/search?${suffix}` : "/search", { scroll: false });
  }, [deferredQuery, router, type]);

  const results = activeQuery.data?.results ?? [];
  const total = activeQuery.data?.count ?? 0;
  const counts = overviewQuery.data?.category_counts ?? {};
  const searching = activeQuery.isFetching && deferredQuery.length >= 2;

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-16 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#57CC99]/30 bg-[#57CC99]/10 px-4 py-2 text-sm font-bold text-[#8DE2D8]">
              <Search className="size-4" />
              Search LearnerSlate
            </span>
          }
          title={
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Find the next useful{" "}
              <span className="text-[#FF7A0E]">thing.</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-[#CBD5E1]">
              Search programmes, courses, mentors, credentials, events,
              roadmaps, career paths, articles, and learner stories.
            </p>
          }
          actions={
            <div className="relative w-full max-w-3xl">
              <SearchBar
                value={query}
                onValueChange={setQuery}
                placeholder="Try “data analyst”, “React”, or “career switch”"
                label="Search all public LearnerSlate content"
                className="[&_input]:h-14 [&_input]:border-white/10 [&_input]:text-base [&_input]:shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
              />
              {searching && (
                <LoaderCircle className="absolute right-12 top-1/2 size-5 -translate-y-1/2 animate-spin text-[#38A3A5]" />
              )}
            </div>
          }
        />
      </HeroSection>

      <SearchSection className="min-h-[60vh] bg-[#F8FAFC]">
        {deferredQuery.length < 2 ? (
          <div>
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#FF7A0E]">
                Search everything public
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#0F172A]">
                Start with a topic or explore a content type
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resultTypes.map(([itemType, label, Icon]) => (
                <button
                  key={itemType}
                  type="button"
                  onClick={() => setType(itemType)}
                  className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#38A3A5]"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#22577A]">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <strong className="block text-[#0F172A]">{label}</strong>
                    <span className="text-xs text-[#64748B]">
                      Search {label.toLowerCase()}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {["full stack", "data analyst", "AI", "DevOps", "career switch"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#FF7A0E] hover:text-[#E86C0D]"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : activeQuery.isError ? (
          <SearchState
            title="Search is temporarily unavailable."
            description="Try again, or browse the main programme and course directories."
            action={
              <Button type="button" onClick={() => activeQuery.refetch()}>
                Try again
              </Button>
            }
          />
        ) : (
          <div>
            <div className="flex flex-col gap-5 border-b border-[#E2E8F0] pb-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#FF7A0E]">
                  Search results
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#0F172A]">
                  {total} {total === 1 ? "result" : "results"} for “{deferredQuery}”
                </h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <TypeChip active={type === "all"} onClick={() => setType("all")}>
                  All {overviewQuery.data ? `(${overviewQuery.data.count})` : ""}
                </TypeChip>
                {resultTypes.map(([itemType, label]) => {
                  const count = counts[itemType] ?? 0;
                  if (!count) return null;
                  return (
                    <TypeChip key={itemType} active={type === itemType} onClick={() => setType(itemType)}>
                      {label} ({count})
                    </TypeChip>
                  );
                })}
              </div>
            </div>

            {results.length ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {results.map((result) => (
                  <UniversalSearchCard key={result.id} result={result} />
                ))}
              </div>
            ) : !searching ? (
              <SearchState
                title="Nothing matched that search."
                description="Try fewer words, a broader skill, or switch back to all content types."
                action={
                  <Button type="button" variant="outline" onClick={() => { setQuery(""); setType("all"); }}>
                    Clear search
                  </Button>
                }
              />
            ) : null}
          </div>
        )}
      </SearchSection>
    </>
  );
}

function TypeChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full px-4 text-sm font-bold transition",
        active
          ? "bg-[#0F172A] text-white"
          : "border border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#38A3A5]",
      )}
    >
      {children}
    </button>
  );
}

function SearchState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
      <h3 className="text-xl font-black text-[#0F172A]">{title}</h3>
      <p className="mt-2 text-sm text-[#64748B]">{description}</p>
      <div className="mt-5">{action}</div>
    </div>
  );
}
