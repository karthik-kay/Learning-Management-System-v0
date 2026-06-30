"use client";

import { Award, RefreshCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { CertificationSection } from "@/components/public/sections/certifications/CertificationSection";
import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { Box, Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { usePublicCertifications } from "@/hooks/queries/public";

import { CertificationCatalog } from "./CertificationCatalog";

export function CertificationIndexView() {
  const certificationsQuery = usePublicCertifications();

  if (certificationsQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[520px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-96 rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  if (certificationsQuery.isError) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] py-20">
        <Container size="md">
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">
              Certifications could not be loaded
            </h1>
            <p className="mt-3 text-sm text-[#64748B]">
              We couldn&apos;t reach the public certification service.
            </p>
            <Button
              type="button"
              onClick={() => certificationsQuery.refetch()}
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

  const certifications = (certificationsQuery.data ?? []).map(
    (certification) => ({
      id: String(certification.id),
      title: certification.title,
      description: certification.short_description,
      type: certification.type,
      domain: certification.domain_label,
      level: certification.level,
      duration: certification.duration,
      skills: certification.skills,
      href: `/certifications/${certification.slug}`,
    }),
  );

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-20 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#38A3A5]/30 bg-[#38A3A5]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#57CC99]">
              <Award className="size-4" />
              Certifications
            </span>
          }
          title={
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Credentials That Prove
              <br />
              <span className="text-[#FF7A0E]">Real Skill.</span>
            </h1>
          }
          description={
            <p className="text-base leading-relaxed text-[#E9EAF0]">
              Programme, track, and course credentials built around projects,
              assessments, and verifiable outcomes.
            </p>
          }
          actions={
            <>
              <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
                <Link href="#certifications">Browse certificates</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/verify">
                  <ShieldCheck className="size-4" />
                  Verify certificate
                </Link>
              </Button>
            </>
          }
        />
      </HeroSection>

      <CertificationSection
        id="certifications"
        className="bg-[#F9FAFB]"
        title={<h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Certification library</h2>}
        description={<p className="max-w-2xl text-sm leading-relaxed text-[#6B7280]">Search by skill, filter by credential type, or narrow by domain to find your next proof of learning.</p>}
      >
        <CertificationCatalog certifications={certifications} />
      </CertificationSection>

      <CTASection className="bg-white py-16 lg:py-20">
        <Box className="rounded-xl bg-[#1E293B] px-6 py-12 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] lg:px-12">
          <CenterCTA
            eyebrow="Certificate verification"
            title="Need to verify a LearnerSlate certificate?"
            description="Use a credential ID to confirm ownership, completion status, and issue date."
            primaryAction={
              <Button asChild size="lg" className="bg-[#38A3A5] text-white hover:bg-[#22577A]">
                <Link href="/verify">Verify certificate</Link>
              </Button>
            }
          />
        </Box>
      </CTASection>
    </>
  );
}
