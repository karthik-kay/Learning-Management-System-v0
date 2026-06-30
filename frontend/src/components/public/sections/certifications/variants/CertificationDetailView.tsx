"use client";

import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  RefreshCcw,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";

import { TwoColumnDetailLayout } from "@/components/public/layouts/TwoColumnDetailLayout";
import { CertificationSection } from "@/components/public/sections/certifications/CertificationSection";
import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicCertification } from "@/hooks/queries/public";

interface CertificationDetailViewProps {
  slug: string;
}

export function CertificationDetailView({ slug }: CertificationDetailViewProps) {
  const certificationQuery = usePublicCertification(slug);

  if (certificationQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[500px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-[520px] rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (certificationQuery.isError || !certificationQuery.data) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              We couldn&apos;t find that certification
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              It may be unavailable, renamed, or the certification service may
              be temporarily offline.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/certifications">
                  <ArrowLeft className="size-4" />
                  All certifications
                </Link>
              </Button>
              <Button type="button" onClick={() => certificationQuery.refetch()} className="bg-[#0F172A] text-white hover:bg-[#1E293B]">
                <RefreshCcw className="size-4" />
                Try again
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const certification = certificationQuery.data;
  const learningHref = certification.related_program_slug
    ? `/programs/${certification.related_program_slug}`
    : certification.related_course_slug
      ? `/courses/${certification.related_course_slug}`
      : "/programs";

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/certifications" className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-white">
            <ArrowLeft className="size-4" />
            Back to certifications
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#38A3A5]/30 bg-[#38A3A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#57CC99]">
                <Award className="size-4" />
                {certification.type} certificate
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {certification.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#CBD5E1]">
                {certification.short_description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href={learningHref}>
                View learning path
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </HeroSection>

      <TwoColumnDetailLayout
        className="bg-white py-14 lg:py-20"
        sidebarWidth="340px"
        sidebar={
          <aside className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#22577A]">
              <ShieldCheck className="size-6" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-[#0F172A]">Credential overview</h2>
            <dl className="mt-5 divide-y divide-[#E2E8F0] text-sm">
              {[
                ["Type", certification.type],
                ["Domain", certification.domain_label],
                ["Level", certification.level],
                ["Typical duration", certification.duration],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-[#64748B]">{label}</dt>
                  <dd className="text-right font-bold text-[#0F172A]">{value}</dd>
                </div>
              ))}
            </dl>
            <Button asChild size="lg" className="mt-6 w-full bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href={learningHref}>Start this path</Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link href="/verify">
                <ShieldCheck className="size-4" />
                Verify a credential
              </Link>
            </Button>
            <p className="mt-4 text-xs leading-5 text-[#64748B]">
              Certificates are issued only after all published completion and
              assessment requirements are met.
            </p>
          </aside>
        }
      >
        <div className="space-y-14">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#38A3A5]">About this credential</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0F172A]">Evidence of practical capability.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#475569]">{certification.description}</p>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <Target className="size-6 text-[#FF7A0E]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">What you will prove</h2>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {certification.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-sm leading-6 text-[#475569]">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#57CC99]/15 text-[#167D7F]">
                    <Check className="size-4" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <BookOpenCheck className="size-6 text-[#FF7A0E]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">Portfolio projects</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certification.projects.map((project, index) => (
                <article key={project} className="rounded-xl bg-[#0F172A] p-6 text-white">
                  <span className="text-xs font-black uppercase tracking-widest text-[#57CC99]">Project {index + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{project}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">Reviewed against the published skills and outcome rubric.</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <ClipboardCheck className="size-6 text-[#FF7A0E]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">How you are assessed</h2>
            </div>
            <ol className="mt-6 space-y-3">
              {certification.assessment_methods.map((method, index) => (
                <li key={method} className="flex items-center gap-4 rounded-xl border border-[#E2E8F0] p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#22577A] text-sm font-black text-white">{index + 1}</span>
                  <span className="font-semibold text-[#334155]">{method}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <Clock3 className="size-6 text-[#FF7A0E]" />
              <h2 className="text-2xl font-bold text-[#0F172A]">Certification requirements</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {certification.requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3 text-sm leading-6 text-[#475569]">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#167D7F]" />
                  {requirement}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </TwoColumnDetailLayout>

      <CertificationSection className="bg-[#F2FBFA]">
        <div className="mx-auto max-w-4xl text-center">
          <ShieldCheck className="mx-auto size-10 text-[#167D7F]" />
          <h2 className="mt-5 text-3xl font-black text-[#0F172A]">Portable proof, easy to verify.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#64748B]">
            Every earned certificate receives a unique credential ID that can
            be checked through LearnerSlate&apos;s public verification flow.
          </p>
        </div>
      </CertificationSection>

      <CTASection className="bg-[#0F172A] py-16 text-white">
        <CenterCTA
          eyebrow="Your next milestone"
          title="Ready to work towards this credential?"
          description="Explore the learning path, projects, and assessments that lead to certification."
          primaryAction={
            <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href={learningHref}>Explore the learning path</Link>
            </Button>
          }
        />
      </CTASection>
    </>
  );
}
