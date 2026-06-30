"use client";

import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Quote,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { VerticalTimeline } from "@/components/public/sections/timeline/variants/VerticalTimeline";
import { TimelineItem } from "@/components/public/widgets/display/TimelineItem";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicSuccessStory } from "@/hooks/queries/public";

interface SuccessStoryDetailViewProps {
  slug: string;
}

export function SuccessStoryDetailView({ slug }: SuccessStoryDetailViewProps) {
  const storyQuery = usePublicSuccessStory(slug);

  if (storyQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[560px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-[520px] rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (storyQuery.isError || !storyQuery.data) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              We couldn&apos;t find that success story
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              It may have moved or the outcomes service may be unavailable.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/success-stories">
                  <ArrowLeft className="size-4" />
                  All stories
                </Link>
              </Button>
              <Button type="button" onClick={() => storyQuery.refetch()} className="bg-[#0F172A] text-white hover:bg-[#1E293B]">
                <RefreshCcw className="size-4" />
                Try again
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const story = storyQuery.data;
  const programHref = story.related_program_slug
    ? `/programs/${story.related_program_slug}`
    : "/programs";

  return (
    <>
      <HeroSection className="overflow-hidden bg-[#0F172A] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/success-stories" className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-white">
            <ArrowLeft className="size-4" />
            Back to success stories
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-[#57CC99]/30 bg-[#57CC99]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#8DE2D8]">
                {story.program_label}
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {story.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
                {story.hook}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-bold">
                <span className="rounded-xl bg-white/10 px-4 py-3 text-[#CBD5E1]">
                  {story.before_title}
                </span>
                <ArrowRight className="size-5 text-[#FF7A0E]" />
                <span className="rounded-xl bg-[#57CC99]/15 px-4 py-3 text-[#8DE2D8]">
                  {story.after_title}
                </span>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#38A3A5] to-[#57CC99] text-xl font-black text-white">
                {story.student_name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <p className="mt-5 text-xl font-black">{story.student_name}</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                {story.after_title} · {story.company_name}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <strong className="block text-xl text-[#FF7A0E]">
                    {story.time_to_hire_months} mo
                  </strong>
                  <span className="text-xs text-[#94A3B8]">time to hire</span>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <strong className="block text-xl text-[#57CC99]">
                    {story.salary_jump_percent
                      ? `${story.salary_jump_percent}%`
                      : "First"}
                  </strong>
                  <span className="text-xs text-[#94A3B8]">
                    {story.salary_jump_percent ? "salary growth" : "tech role"}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </HeroSection>

      <GridSection
        className="bg-white"
        title={<h2 className="text-3xl font-black text-[#0F172A]">The journey</h2>}
        description={<p className="max-w-2xl text-[#64748B]">Progress came from a sequence of smaller changes—not one dramatic shortcut.</p>}
      >
        <div className="mx-auto max-w-3xl">
          <VerticalTimeline checkpoint={<Rocket className="size-4 text-[#FF7A0E]" />}>
            {story.journey.map((item) => (
              <TimelineItem
                key={`${item.phase}-${item.title}`}
                label={item.phase}
                title={item.title}
                description={item.description}
              />
            ))}
          </VerticalTimeline>
        </div>
      </GridSection>

      <GridSection
        className="bg-[#F8FAFC]"
        title={<h2 className="text-3xl font-black text-[#0F172A]">The challenges</h2>}
        description={<p className="max-w-2xl text-[#64748B]">The hard parts were real—and each one needed a practical response.</p>}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {story.challenges.map((challenge, index) => (
            <article key={challenge} className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <span className="text-sm font-black text-[#FF7A0E]">0{index + 1}</span>
              <p className="mt-6 font-semibold leading-7 text-[#334155]">{challenge}</p>
            </article>
          ))}
        </div>
      </GridSection>

      <GridSection
        className="bg-white"
        title={<h2 className="text-3xl font-black text-[#0F172A]">Projects that changed the conversation</h2>}
        description={<p className="max-w-2xl text-[#64748B]">Each project created evidence that could be reviewed, improved, and discussed in interviews.</p>}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {story.projects.map((project, index) => (
            <article key={project.title} className="rounded-2xl bg-[#0F172A] p-7 text-white">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#57CC99]">Project {index + 1}</span>
              <h3 className="mt-4 text-2xl font-black">{project.title}</h3>
              <p className="mt-3 leading-7 text-[#CBD5E1]">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </GridSection>

      <GridSection
        className="bg-[#F2FBFA]"
        title={<h2 className="text-3xl font-black text-[#0F172A]">The outcomes</h2>}
      >
        <div className="grid overflow-hidden rounded-2xl border border-[#DDE7EF] bg-white sm:grid-cols-2 lg:grid-cols-4">
          {story.outcomes.map((outcome) => (
            <div key={outcome.label} className="border-b border-[#E2E8F0] p-6 last:border-0 sm:border-r lg:border-b-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#64748B]">{outcome.label}</p>
              <p className="mt-2 text-xl font-black text-[#0F172A]">{outcome.value}</p>
            </div>
          ))}
        </div>
        {story.quote && (
          <blockquote className="mx-auto max-w-3xl rounded-2xl bg-[#22577A] p-8 text-white">
            <Quote className="size-8 text-[#57CC99]" />
            <p className="mt-5 text-xl font-semibold leading-9">&ldquo;{story.quote}&rdquo;</p>
            <footer className="mt-5 text-sm text-[#C7E9E5]">— {story.student_name}</footer>
          </blockquote>
        )}
      </GridSection>

      <GridSection className="bg-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] p-8 lg:p-10">
          <Lightbulb className="size-9 text-[#FF7A0E]" />
          <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#64748B]">
            {story.student_name.split(" ")[0]}&apos;s advice
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#0F172A]">What I would tell someone starting now</h2>
          <p className="mt-5 text-lg leading-8 text-[#475569]">{story.advice}</p>
          <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#167D7F]">
            <ShieldCheck className="size-5" />
            Progress is built through evidence, iteration, and consistency.
          </div>
        </div>
      </GridSection>

      <CTASection className="bg-[#0F172A] py-16 text-white">
        <CenterCTA
          eyebrow="Write your next chapter"
          title="Ready to build proof of what you can do?"
          description="Explore structured programmes with projects, mentor review, and career preparation."
          primaryAction={
            <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href={programHref}>
                Explore programmes
                <Trophy className="size-4" />
              </Link>
            </Button>
          }
          secondaryAction={
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/success-stories">Read more stories</Link>
            </Button>
          }
        />
      </CTASection>
    </>
  );
}
