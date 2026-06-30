"use client";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  Clock3,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

import { TwoColumnDetailLayout } from "@/components/public/layouts/TwoColumnDetailLayout";
import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { MentorSection } from "@/components/public/sections/mentor/MentorSection";
import { Container, Grid, Stack } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicFacultyProfile } from "@/hooks/queries/public";

interface MentorProfileProps {
  slug: string;
}

function availabilityCopy(value: "available" | "waitlist" | "unavailable") {
  return {
    available: "Available for mentoring",
    waitlist: "Join the mentoring waitlist",
    unavailable: "Currently unavailable",
  }[value];
}

export function MentorProfile({ slug }: MentorProfileProps) {
  const mentorQuery = usePublicFacultyProfile(slug);

  if (mentorQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[520px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-96 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (mentorQuery.isError || !mentorQuery.data) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              We couldn&apos;t find that mentor
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              Their profile may be private or temporarily unavailable.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/mentors">
                <ArrowLeft className="size-4" />
                Browse mentors
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const mentor = mentorQuery.data;
  const bookingHref =
    mentor.booking_url || `/contact?mentor=${encodeURIComponent(mentor.slug)}`;
  const externalBooking = /^https?:\/\//.test(bookingHref);

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-12 text-white lg:py-20">
        <Link
          href="/mentors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to mentors
        </Link>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#22577A] via-[#38A3A5] to-[#57CC99] shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div
              role="img"
              aria-label=""
              className="h-[420px] bg-cover bg-center"
              style={
                mentor.avatar
                  ? { backgroundImage: `url("${mentor.avatar}")` }
                  : undefined
              }
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#38A3A5]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#57CC99]">
                Industry mentor
              </span>
              {mentor.is_verified && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57CC99]">
                  <BadgeCheck className="size-4" />
                  Verified mentor
                </span>
              )}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {mentor.display_name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-[#CBD5E1]">
              {[mentor.job_title, mentor.company].filter(Boolean).join(" · ") ||
                mentor.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#94A3B8]">
              {mentor.headline}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#CBD5E1]">
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-[#57CC99]" />
                {mentor.years_experience}+ years experience
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="size-4 text-[#57CC99]" />
                {mentor.students_mentored} learners mentored
              </span>
              {mentor.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[#57CC99]" />
                  {mentor.location}
                </span>
              )}
              {mentor.review_count > 0 && (
                <span className="inline-flex items-center gap-2">
                  <Star className="size-4 fill-[#FF7A0E] text-[#FF7A0E]" />
                  {mentor.average_rating} from {mentor.review_count} reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </HeroSection>

      <TwoColumnDetailLayout
        className="bg-white py-14 lg:py-20"
        sidebar={
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#38A3A5]">
              One-to-one mentoring
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
              Book a session
            </h2>
            <div className="mt-5 space-y-3 text-sm text-[#475569]">
              <p className="flex items-center gap-2">
                <Clock3 className="size-4 text-[#38A3A5]" />
                {mentor.session_duration_minutes}-minute session
              </p>
              <p className="flex items-center gap-2">
                <CalendarCheck className="size-4 text-[#38A3A5]" />
                {availabilityCopy(mentor.availability)}
              </p>
              {mentor.session_price_paise !== null && (
                <p className="text-2xl font-bold text-[#0F172A]">
                  ₹{(mentor.session_price_paise / 100).toLocaleString("en-IN")}
                </p>
              )}
            </div>
            {mentor.availability === "unavailable" ? (
              <Button type="button" size="lg" disabled className="mt-6 w-full">
                Currently unavailable
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
              >
                {externalBooking ? (
                  <a href={bookingHref} target="_blank" rel="noreferrer">
                    {mentor.availability === "waitlist"
                      ? "Join waitlist"
                      : "Book session"}
                    <ExternalLink className="size-4" />
                  </a>
                ) : (
                  <Link href={bookingHref}>
                    {mentor.availability === "waitlist"
                      ? "Join waitlist"
                      : "Request session"}
                  </Link>
                )}
              </Button>
            )}

            <div className="mt-6 flex gap-2 border-t border-[#E2E8F0] pt-5">
              {mentor.linkedin_url && (
                <a
                  href={mentor.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="grid size-10 place-items-center rounded-lg border border-[#CBD5E1] text-[#475569] hover:border-[#38A3A5] hover:text-[#22577A]"
                >
                  <Linkedin className="size-4" />
                </a>
              )}
              {mentor.github_url && (
                <a
                  href={mentor.github_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="grid size-10 place-items-center rounded-lg border border-[#CBD5E1] text-[#475569] hover:border-[#38A3A5] hover:text-[#22577A]"
                >
                  <Github className="size-4" />
                </a>
              )}
              {mentor.website_url && (
                <a
                  href={mentor.website_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Personal website"
                  className="grid size-10 place-items-center rounded-lg border border-[#CBD5E1] text-[#475569] hover:border-[#38A3A5] hover:text-[#22577A]"
                >
                  <Globe className="size-4" />
                </a>
              )}
            </div>
          </div>
        }
      >
        <Stack gap={56}>
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#38A3A5]">
              About
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              Mentor profile
            </h2>
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#475569]">
              {mentor.bio}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Topics you can discuss
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {mentor.expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#38A3A5]/25 bg-[#F0FDFA] px-4 py-2 text-sm font-semibold text-[#22577A]"
                >
                  {item}
                </span>
              ))}
            </div>
            {mentor.languages.length > 0 && (
              <p className="mt-5 text-sm text-[#64748B]">
                Sessions available in: {mentor.languages.join(", ")}
              </p>
            )}
          </section>

          {mentor.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Experience
              </h2>
              <div className="mt-6 space-y-4 border-l-2 border-[#DDE7EF] pl-6">
                {mentor.experience.map((item, index) => (
                  <div
                    key={`${item.role}-${item.company}-${index}`}
                    className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 before:absolute before:-left-[31px] before:top-6 before:size-3 before:rounded-full before:bg-[#38A3A5]"
                  >
                    <h3 className="font-bold text-[#0F172A]">{item.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#22577A]">
                      {[item.company, item.period].filter(Boolean).join(" · ")}
                    </p>
                    {item.description && (
                      <p className="mt-3 text-sm leading-6 text-[#64748B]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {mentor.achievements.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Highlights
              </h2>
              <Grid className="mt-6 grid-cols-1 gap-4 sm:grid-cols-2">
                {mentor.achievements.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-xl border border-[#E2E8F0] bg-white p-5"
                  >
                    <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-[#64748B]">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </Grid>
            </section>
          )}
        </Stack>
      </TwoColumnDetailLayout>

      {mentor.reviews.length > 0 && (
        <MentorSection className="bg-[#F8FAFC] py-16 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#38A3A5]">
              Learner feedback
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
              What mentees say
            </h2>
          </div>
          <Grid className="mt-8 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mentor.reviews.map((review) => (
              <blockquote
                key={review.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <p
                  aria-label={`${review.rating} out of 5 stars`}
                  className="text-[#FF7A0E]"
                >
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                {review.title && (
                  <h3 className="mt-4 font-bold text-[#0F172A]">
                    {review.title}
                  </h3>
                )}
                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  “{review.comment}”
                </p>
                <footer className="mt-5 text-sm font-semibold text-[#334155]">
                  {review.student_name}
                </footer>
              </blockquote>
            ))}
          </Grid>
        </MentorSection>
      )}

      <CTASection className="bg-white py-16 lg:py-20">
        <div className="rounded-3xl bg-[#18263A] px-6 py-12 text-white sm:px-10">
          <CenterCTA
            eyebrow="Find your guide"
            title="The right feedback can save weeks of confusion."
            description="Explore more mentors or choose a structured learning program with regular expert support."
            primaryAction={
              <Button
                asChild
                size="lg"
                className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]"
              >
                <Link href="/mentors">Browse mentors</Link>
              </Button>
            }
            secondaryAction={
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/programs">Explore programs</Link>
              </Button>
            }
          />
        </div>
      </CTASection>
    </>
  );
}
