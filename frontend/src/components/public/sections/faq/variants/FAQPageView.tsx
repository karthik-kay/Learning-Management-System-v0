"use client";

import {
  BadgeIndianRupee,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Headphones,
  LoaderCircle,
  MessageCircle,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { FAQSection } from "@/components/public/sections/faq/FAQSection";
import { FilterSection } from "@/components/public/sections/filter/FilterSection";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { FAQAccordion } from "@/components/public/widgets/display/FAQAccordion";
import { Container } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePublicFAQs } from "@/hooks/queries/public";

const categories = [
  { label: "Admissions", id: "admissions", icon: GraduationCap },
  { label: "Programs & Curriculum", id: "programs-curriculum", icon: BookOpen },
  { label: "Payments & EMI", id: "payments-emi", icon: BadgeIndianRupee },
  { label: "Placements", id: "placements", icon: BriefcaseBusiness },
  { label: "Certifications", id: "certifications", icon: ShieldCheck },
  { label: "Platform & Technical", id: "platform-technical", icon: Wrench },
] as const;

export function FAQPageView() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());
  const faqQuery = usePublicFAQs({
    search: deferredSearch || undefined,
  });

  if (faqQuery.isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-[#F8FAFC]">
        <div className="h-[460px] bg-[#0F172A]" />
        <Container>
          <div className="my-16 h-[520px] rounded-2xl bg-[#E2E8F0]" />
        </Container>
      </div>
    );
  }

  const faqs = faqQuery.data ?? [];
  const grouped = categories
    .map((category) => ({
      ...category,
      items: faqs.filter((faq) => faq.category === category.label),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <>
      <HeroSection className="bg-[#0F172A] py-16 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="rounded-full border border-[#57CC99]/30 bg-[#57CC99]/10 px-4 py-2 text-sm font-bold text-[#8DE2D8]">
              LearnerSlate help centre
            </span>
          }
          title={
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              What can we help you{" "}
              <span className="text-[#FF7A0E]">figure out?</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-[#CBD5E1]">
              Search admissions, programmes, payments, placements,
              certifications, and platform questions.
            </p>
          }
          actions={
            <div className="relative w-full max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#64748B]" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search questions, topics, or keywords"
                aria-label="Search frequently asked questions"
                className="h-14 rounded-xl border-white/10 bg-white pl-12 pr-12 text-base text-[#0F172A] shadow-[0_18px_55px_rgba(0,0,0,0.24)] placeholder:text-[#94A3B8]"
              />
              {faqQuery.isFetching && (
                <LoaderCircle className="absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin text-[#38A3A5]" />
              )}
            </div>
          }
        />
      </HeroSection>

      {!deferredSearch && (
        <FilterSection sticky className="top-16 overflow-x-auto py-3">
          <nav aria-label="FAQ categories" className="flex min-w-max gap-2">
            {categories.map(({ label, id, icon: Icon }) => (
              <Link
                key={id}
                href={`#${id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 text-sm font-bold text-[#475569] transition hover:border-[#38A3A5] hover:bg-[#F0FDFA] hover:text-[#167D7F]"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </FilterSection>
      )}

      <FAQSection className="bg-[#F8FAFC] py-16 lg:py-24">
        <div>
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF7A0E]">
              {deferredSearch ? "Search results" : "Browse by topic"}
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#0F172A]">
              {deferredSearch
                ? `${faqs.length} ${faqs.length === 1 ? "answer" : "answers"} found`
                : "Answers organised around your questions"}
            </h2>
          </div>

          {faqQuery.isError ? (
            <FAQState
              title="We couldn't load the FAQ library."
              description="Please try again, or contact the support team directly."
              action={
                <Button type="button" onClick={() => faqQuery.refetch()}>
                  Try again
                </Button>
              }
            />
          ) : grouped.length ? (
            <div className="grid items-start gap-6 lg:grid-cols-2">
              {grouped.map(({ label, id, icon: Icon, items }) => (
                <section
                  id={id}
                  key={id}
                  className="scroll-mt-36 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-6"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#167D7F]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-[#0F172A]">{label}</h3>
                      <p className="text-xs text-[#64748B]">{items.length} questions</p>
                    </div>
                  </div>
                  <FAQAccordion items={items} multiple />
                </section>
              ))}
            </div>
          ) : (
            <FAQState
              title="No matching questions yet."
              description="Try a broader phrase, or ask the support team directly."
              action={
                <Button type="button" variant="outline" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              }
            />
          )}
        </div>
      </FAQSection>

      <CTASection className="bg-white py-16 lg:py-20">
        <div className="rounded-2xl bg-[#0F172A] px-6 py-12 text-white lg:px-12">
          <CenterCTA
            eyebrow="Still need help?"
            title="Talk to a real person."
            description="Send the support team the details, or start a live-chat request for faster guidance."
            primaryAction={
              <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
                <Link href="/support">
                  <Headphones className="size-4" />
                  Support centre
                </Link>
              </Button>
            }
            secondaryAction={
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/support?channel=chat">
                  <MessageCircle className="size-4" />
                  Start live chat
                </Link>
              </Button>
            }
          />
        </div>
      </CTASection>
    </>
  );
}

function FAQState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
      <h3 className="text-xl font-black text-[#0F172A]">{title}</h3>
      <p className="mt-2 text-sm text-[#64748B]">{description}</p>
      <div className="mt-5">{action}</div>
    </div>
  );
}
