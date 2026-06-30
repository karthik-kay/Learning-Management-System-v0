"use client";

import {
  ArrowLeft,
  Award,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  RefreshCcw,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { TwoColumnDetailLayout } from "@/components/public/layouts/TwoColumnDetailLayout";
import { EventSection } from "@/components/public/sections/events/EventSection";
import {
  formatEventDate,
  formatEventTime,
} from "@/components/public/sections/events/eventData";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { Container, Grid, Stack } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicEvent } from "@/hooks/queries/public";

interface EventDetailViewProps {
  slug: string;
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface Speaker {
  name: string;
  role: string;
  company: string;
}

interface EventFaq {
  question: string;
  answer: string;
}

function recordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null,
      )
    : [];
}

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function eventTypeLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function EventDetailView({ slug }: EventDetailViewProps) {
  const eventQuery = usePublicEvent(slug);

  if (eventQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[520px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-96 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (eventQuery.isError || !eventQuery.data) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              We couldn&apos;t find that event
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              It may have ended, moved, or the event service may be unavailable.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/events">
                  <ArrowLeft className="size-4" />
                  All events
                </Link>
              </Button>
              <Button
                type="button"
                onClick={() => eventQuery.refetch()}
                className="bg-[#0F172A] text-white hover:bg-[#1E293B]"
              >
                <RefreshCcw className="size-4" />
                Try again
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const event = eventQuery.data;
  const agenda: AgendaItem[] = recordArray(event.payload.agenda).map((item) => ({
    time: text(item.time),
    title: text(item.title),
    description: text(item.description),
  }));
  const speakers: Speaker[] = recordArray(event.payload.speakers).map(
    (item) => ({
      name: text(item.name),
      role: text(item.role),
      company: text(item.company),
    }),
  );
  const faqs: EventFaq[] = recordArray(event.payload.faqs).map((item) => ({
    question: text(item.question),
    answer: text(item.answer),
  }));
  const requirements = stringArray(event.payload.requirements);
  const registerHref = event.register_url || "/login?next=/events";
  const externalRegistration = /^https?:\/\//.test(registerHref);
  const duration =
    event.starts_at && event.ends_at
      ? Math.max(
          Math.round(
            (new Date(event.ends_at).getTime() -
              new Date(event.starts_at).getTime()) /
              60000,
          ),
          0,
        )
      : null;

  const registrationButton = (
    <Button
      asChild
      size="lg"
      className="w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
    >
      {externalRegistration ? (
        <a href={registerHref} target="_blank" rel="noreferrer">
          Register now
          <ExternalLink className="size-4" />
        </a>
      ) : (
        <Link href={registerHref}>Register now</Link>
      )}
    </Button>
  );

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to events
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-[#38A3A5]/30 bg-[#38A3A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#57CC99]">
                {eventTypeLabel(event.event_type)}
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {event.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#CBD5E1]">
                {event.short_description}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#CBD5E1]">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-[#57CC99]" />
                  {formatEventDate(event.starts_at)}
                </span>
                {event.starts_at && (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4 text-[#57CC99]" />
                    {formatEventTime(event.starts_at)}
                  </span>
                )}
                {event.location_label && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-[#57CC99]" />
                    {event.location_label}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full lg:w-52">{registrationButton}</div>
          </div>
        </div>
      </HeroSection>

      <TwoColumnDetailLayout
        className="bg-white py-14 lg:py-20"
        sidebar={
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <h2 className="text-lg font-bold text-[#0F172A]">Event details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                  Date and time
                </dt>
                <dd className="mt-1 font-semibold text-[#334155]">
                  {formatEventDate(event.starts_at)}
                  {event.starts_at ? ` · ${formatEventTime(event.starts_at)}` : ""}
                </dd>
              </div>
              {duration !== null && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Duration
                  </dt>
                  <dd className="mt-1 font-semibold text-[#334155]">
                    {duration} minutes
                  </dd>
                </div>
              )}
              {event.mentor_name && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Mentor
                  </dt>
                  <dd className="mt-1 font-semibold text-[#334155]">
                    {event.mentor_name}
                  </dd>
                </div>
              )}
              {event.team_size && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Team size
                  </dt>
                  <dd className="mt-1 font-semibold text-[#334155]">
                    {event.team_size}
                  </dd>
                </div>
              )}
              {event.prize_pool && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                    Prize pool
                  </dt>
                  <dd className="mt-1 inline-flex items-center gap-2 font-bold text-[#E86C0D]">
                    <Trophy className="size-4" />
                    {event.prize_pool}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-6">{registrationButton}</div>
          </div>
        }
      >
        <Stack gap={48}>
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#38A3A5]">
              About this event
            </p>
            <div className="mt-4 text-base leading-8 text-[#475569] [&_a]:font-semibold [&_a]:text-[#22577A] [&_li]:my-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:text-[#0F172A] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
              <ReactMarkdown>
                {event.description || event.short_description}
              </ReactMarkdown>
            </div>
          </section>

          {agenda.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                Agenda
              </h2>
              <div className="mt-6 space-y-4 border-l-2 border-[#DDE7EF] pl-6">
                {agenda.map((item, index) => (
                  <div
                    key={`${item.time}-${item.title}-${index}`}
                    className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 before:absolute before:-left-[31px] before:top-6 before:size-3 before:rounded-full before:bg-[#38A3A5]"
                  >
                    {item.time && (
                      <p className="text-xs font-bold uppercase tracking-wide text-[#E86C0D]">
                        {item.time}
                      </p>
                    )}
                    <h3 className="mt-1 font-bold text-[#0F172A]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {requirements.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                What to bring
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm text-[#475569]"
                  >
                    {requirement}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Stack>
      </TwoColumnDetailLayout>

      {speakers.length > 0 && (
        <EventSection className="bg-[#F8FAFC]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#38A3A5]">
              Speakers and mentors
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Learn from people doing the work.
            </h2>
          </div>
          <Grid className="grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker, index) => (
              <div
                key={`${speaker.name}-${index}`}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#22577A] font-bold text-white">
                  {speaker.name.charAt(0) || "L"}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  {[speaker.role, speaker.company].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </Grid>
        </EventSection>
      )}

      {(event.related_programs.length > 0 ||
        event.related_courses.length > 0) && (
        <EventSection className="bg-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#38A3A5]">
              Continue learning
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Related programs and courses
            </h2>
          </div>
          <Grid className="grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {event.related_programs.map((program) => (
              <Link
                key={`program-${program.id}`}
                href={`/programs/${program.slug}`}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition hover:-translate-y-1 hover:border-[#38A3A5]"
              >
                <Award className="size-5 text-[#E86C0D]" />
                <h3 className="mt-4 font-bold text-[#0F172A]">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-[#64748B]">
                  {program.subtitle}
                </p>
              </Link>
            ))}
            {event.related_courses.map((course) => (
              <Link
                key={`course-${course.id}`}
                href="/courses"
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition hover:-translate-y-1 hover:border-[#38A3A5]"
              >
                <CalendarDays className="size-5 text-[#38A3A5]" />
                <h3 className="mt-4 font-bold text-[#0F172A]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-[#64748B]">
                  {course.short_description}
                </p>
              </Link>
            ))}
          </Grid>
        </EventSection>
      )}

      {faqs.length > 0 && (
        <EventSection className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-[#0F172A]">
              Event questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-[#E2E8F0] bg-white p-5"
                >
                  <summary className="cursor-pointer list-none font-bold text-[#0F172A]">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#64748B]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </EventSection>
      )}
    </>
  );
}
