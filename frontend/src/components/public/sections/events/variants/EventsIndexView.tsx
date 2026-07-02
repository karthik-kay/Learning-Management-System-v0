"use client";

import { CalendarDays, RefreshCcw, Users } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { EventSection } from "@/components/public/sections/events/EventSection";
import { mapPublicEventToCard } from "@/components/public/sections/events/eventData";
import { BountyLeaderboard } from "@/components/public/sections/events/variants/BountyLeaderboard";
import {
  EventCategorySection,
  type EventCategoryTone,
} from "@/components/public/sections/events/variants/EventCategorySection";
import { EventHeroCarousel } from "@/components/public/sections/events/variants/EventHeroCarousel";
import { EventNotifyStrip } from "@/components/public/sections/events/variants/EventNotifyStrip";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { Box, Container, Stack } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicEvents } from "@/hooks/queries/public";
import { PublicEventType } from "@/types";

const categoryContent: Record<
  PublicEventType,
  {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    flipped?: boolean;
    background: string;
    tone: EventCategoryTone;
  }
> = {
  webinar: {
    eyebrow: "Webinars",
    title: "Live sessions with engineers and career mentors.",
    description:
      "Short, focused sessions that explain what to learn, why it matters, and how to apply it.",
    bullets: [
      "Career breakdowns from working professionals",
      "Live Q&A for roadmap and interview doubts",
      "Practical takeaways you can apply immediately",
    ],
    background:
      "border-t border-public-teal-100 bg-public-teal-50/30 py-12 lg:py-20",
    tone: "teal",
  },
  workshop: {
    eyebrow: "Workshops",
    title: "Hands-on builds guided by mentors.",
    description:
      "Practical build sessions where you create something useful while learning the patterns behind it.",
    bullets: [
      "Code-along product and engineering sessions",
      "Starter files, review prompts, and practice tasks",
      "Portfolio-ready outcomes",
    ],
    flipped: true,
    background:
      "border-t border-public-blue-100 bg-public-blue-50/35 py-12 lg:py-20",
    tone: "blue",
  },
  exam: {
    eyebrow: "Exams",
    title: "Assessment windows tied to certifications.",
    description:
      "Validate skill milestones and earn verifiable program, track, or course credentials.",
    bullets: [
      "Timed assessments mapped to outcomes",
      "Practical questions and coding tasks",
      "Clear score visibility and retake windows",
    ],
    background:
      "border-t border-public-neutral-200 bg-public-neutral-50 py-12 lg:py-20",
    tone: "neutral",
  },
  bounty: {
    eyebrow: "Bounties",
    title: "Solve real challenges and climb the leaderboard.",
    description:
      "Submit solutions to practical engineering tasks for prizes, recognition, and proof of skill.",
    bullets: [
      "Open challenges with clear scoring rubrics",
      "Prize pools for top submissions",
      "Public evidence of practical skill",
    ],
    background:
      "border-t border-public-mint-100 bg-public-mint-50/30 py-12 lg:py-20",
    tone: "mint",
  },
  hackathon: {
    eyebrow: "Hackathons",
    title: "Build with a team. Ship under pressure.",
    description:
      "Theme-led build events with mentors, judging, prizes, and public showcases.",
    bullets: [
      "Small collaborative teams",
      "Mentor checkpoints during the build",
      "Prize pools and winner showcases",
    ],
    flipped: true,
    background:
      "border-t border-public-orange-100 bg-public-orange-50/25 py-12 lg:py-20",
    tone: "orange",
  },
  community: {
    eyebrow: "Community",
    title: "Meet, learn, and build alongside other learners.",
    description:
      "Community sessions make it easier to find collaborators, exchange feedback, and stay consistent.",
    bullets: [
      "Peer learning and open discussions",
      "Project showcases and feedback",
      "Connections across learning tracks",
    ],
    background:
      "border-t border-public-teal-100 bg-public-teal-50/20 py-12 lg:py-20",
    tone: "teal",
  },
};

const validTypes = new Set<PublicEventType>(
  Object.keys(categoryContent) as PublicEventType[],
);

const leaderboard = [
  { rank: 1, name: "Aarav M.", score: "980 pts", prize: "INR 12K" },
  { rank: 2, name: "Diya S.", score: "930 pts", prize: "INR 8K" },
  { rank: 3, name: "Kiran P.", score: "880 pts", prize: "INR 5K" },
];

export function EventsIndexView() {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("type") as PublicEventType | null;
  const eventType =
    requestedType && validTypes.has(requestedType) ? requestedType : undefined;
  const eventsQuery = usePublicEvents({
    event_type: eventType,
  });

  if (eventsQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[560px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-96 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (eventsQuery.isError) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              Events could not be loaded
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              We couldn&apos;t reach the public events service.
            </p>
            <Button
              type="button"
              onClick={() => eventsQuery.refetch()}
              className="mt-6 bg-[#0F172A] text-white hover:bg-[#1E293B]"
            >
              <RefreshCcw className="size-4" />
              Try again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const events = eventsQuery.data ?? [];
  const featured = events.filter((event) => event.is_featured);
  const heroEvents = (featured.length ? featured : events)
    .slice(0, 4)
    .map(mapPublicEventToCard);
  const grouped = Object.fromEntries(
    (Object.keys(categoryContent) as PublicEventType[]).map((type) => [
      type,
      events
        .filter((event) => event.event_type === type)
        .map(mapPublicEventToCard),
    ]),
  ) as Record<PublicEventType, ReturnType<typeof mapPublicEventToCard>[]>;

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-20 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#38A3A5]/30 bg-[#38A3A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#57CC99]">
              <CalendarDays className="size-4" />
              Live Events
            </span>
          }
          title={
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn, Compete,
              <br />
              <span className="text-[#FF7A0E]">Get Noticed.</span>
            </h1>
          }
          description={
            <p className="text-base leading-relaxed text-[#E9EAF0]">
              Join webinars, workshops, exams, bounties, and hackathons built
              for learners moving toward real software careers.
            </p>
          }
        />
        {heroEvents.length > 0 && <EventHeroCarousel events={heroEvents} />}
      </HeroSection>

      {events.length === 0 ? (
        <EventSection className="bg-white">
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center">
            <CalendarDays className="mx-auto size-10 text-[#38A3A5]" />
            <h2 className="mt-4 text-2xl font-bold text-[#0F172A]">
              New events are being scheduled
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Check back soon for the next live session or challenge.
            </p>
          </div>
        </EventSection>
      ) : (
        (Object.keys(categoryContent) as PublicEventType[]).map((type) => {
          const categoryEvents = grouped[type];
          if (!categoryEvents.length) return null;
          const content = categoryContent[type];

          return (
            <EventSection key={type} className={content.background}>
              <Stack gap={32}>
                <EventCategorySection
                  eyebrow={content.eyebrow}
                  title={content.title}
                  description={content.description}
                  bullets={content.bullets}
                  ctaLabel={`View All ${content.eyebrow}`}
                  ctaHref={`/events?type=${type}`}
                  events={categoryEvents}
                  flipped={content.flipped}
                  tone={content.tone}
                />
                {type === "bounty" && (
                  <BountyLeaderboard
                    entries={leaderboard}
                    href="/leaderboard"
                  />
                )}
              </Stack>
            </EventSection>
          );
        })
      )}

      <EventSection className="bg-[#F9FAFB]">
        <EventNotifyStrip />
      </EventSection>

      <CTASection className="bg-white py-16 lg:py-20">
        <Box className="rounded-xl border border-[#E9EAF0] bg-[#F9FAFB] px-6 py-12 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <CenterCTA
            title="Ready to Participate?"
            description="Choose the right session, register, and join the LearnerSlate community."
            primaryAction={
              <Button
                asChild
                size="lg"
                className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
              >
                <Link href="/events">Browse All Events</Link>
              </Button>
            }
            secondaryAction={
              <Button asChild size="lg" variant="outline">
                <Link href="/community">
                  <Users className="size-4" />
                  Join Community
                </Link>
              </Button>
            }
          />
        </Box>
      </CTASection>
    </>
  );
}
