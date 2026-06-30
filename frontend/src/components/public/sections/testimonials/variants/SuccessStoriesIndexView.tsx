"use client";

import { RefreshCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { FilterSection } from "@/components/public/sections/filter/FilterSection";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { StatsSection } from "@/components/public/sections/stats/StatsSection";
import { StoryCard } from "@/components/public/widgets/cards/StoryCard";
import { FilterBar } from "@/components/public/widgets/discovery/FilterBar";
import { LoadMore } from "@/components/public/widgets/discovery/LoadMore";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  usePublicSuccessStories,
  useSuccessStoryFilters,
  useSuccessStorySummary,
} from "@/hooks/queries/public";

export function SuccessStoriesIndexView() {
  const [track, setTrack] = useState("all");
  const [background, setBackground] = useState("all");
  const [outcome, setOutcome] = useState("all");
  const params = {
    track: track === "all" ? undefined : track,
    background: background === "all" ? undefined : background,
    outcome: outcome === "all" ? undefined : outcome,
  };
  const storiesQuery = usePublicSuccessStories(params);
  const featuredQuery = usePublicSuccessStories({ featured: true, page_size: 1 });
  const summaryQuery = useSuccessStorySummary();
  const filtersQuery = useSuccessStoryFilters();

  if (storiesQuery.isLoading || featuredQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[510px] bg-[#0F172A]" />
        <Container>
          <div className="my-12 h-72 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (storiesQuery.isError) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              Success stories could not be loaded
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              We couldn&apos;t reach the public outcomes service.
            </p>
            <Button type="button" onClick={() => storiesQuery.refetch()} className="mt-6 bg-[#0F172A] text-white hover:bg-[#1E293B]">
              <RefreshCcw className="size-4" />
              Try again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const summary = summaryQuery.data;
  const featured = featuredQuery.data?.pages[0]?.results[0];
  const stories = storiesQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const noFilters = track === "all" && background === "all" && outcome === "all";
  const gridStories =
    noFilters && featured
      ? stories.filter((story) => story.slug !== featured.slug)
      : stories;
  const total = storiesQuery.data?.pages[0]?.count ?? 0;
  const remaining = Math.max(total - stories.length, 0);
  const filters = filtersQuery.data;

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-20 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#57CC99]/30 bg-[#57CC99]/10 px-4 py-2 text-sm font-bold text-[#8DE2D8]">
              <Sparkles className="size-4" />
              Learner outcomes
            </span>
          }
          title={
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Real journeys.{" "}
              <span className="text-[#FF7A0E]">Measurable change.</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-[#CBD5E1]">
              See how learners used projects, mentor feedback, and career
              preparation to move from where they started to what came next.
            </p>
          }
          actions={
            <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href="#stories">Explore their stories</Link>
            </Button>
          }
        />
      </HeroSection>

      <StatsSection
        className="-mt-px bg-[#0F172A] pb-14 pt-0"
        stats={[
          { value: summary ? summary.total_placed : "—", label: "learners placed" },
          { value: summary ? `${summary.average_salary_jump_percent}%` : "—", label: "average salary growth" },
          { value: summary ? `${summary.average_time_to_hire_months} mo` : "—", label: "average time to hire" },
          { value: summary ? summary.total_stories : "—", label: "stories published" },
        ]}
      />

      {featured && (
        <GridSection
          className="bg-white"
          title={<h2 className="text-3xl font-black text-[#0F172A]">One journey, up close</h2>}
          description={<p className="max-w-2xl text-[#64748B]">The starting point matters—but it does not have to decide the destination.</p>}
        >
          <StoryCard story={featured} featured />
        </GridSection>
      )}

      <FilterSection className="py-5" sticky>
        <FilterBar className="grid gap-3 border-0 p-0 shadow-none md:grid-cols-3">
          <StoryFilter label="All tracks" value={track} options={filters?.tracks ?? []} onChange={setTrack} />
          <StoryFilter label="All backgrounds" value={background} options={filters?.backgrounds ?? []} onChange={setBackground} />
          <StoryFilter label="All outcomes" value={outcome} options={filters?.outcomes ?? []} onChange={setOutcome} />
        </FilterBar>
      </FilterSection>

      <GridSection
        id="stories"
        className="bg-[#F8FAFC]"
        title={<h2 className="text-3xl font-black text-[#0F172A]">More learner stories</h2>}
        description={<p className="text-[#64748B]">{total} {total === 1 ? "story matches" : "stories match"} your current filters.</p>}
      >
        {gridStories.length ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {gridStories.map((story) => <StoryCard key={story.id} story={story} />)}
            </div>
            <LoadMore
              label="Load more stories"
              noun="story"
              remaining={remaining}
              loading={storiesQuery.isFetchingNextPage}
              onClick={() => storiesQuery.fetchNextPage()}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
            <h3 className="text-xl font-bold text-[#0F172A]">No stories match those filters yet.</h3>
            <Button type="button" variant="outline" className="mt-5" onClick={() => { setTrack("all"); setBackground("all"); setOutcome("all"); }}>
              Clear filters
            </Button>
          </div>
        )}
      </GridSection>
    </>
  );
}

function StoryFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-full bg-[#F8FAFC]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{label}</SelectItem>
        {options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
