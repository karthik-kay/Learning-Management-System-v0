import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenCheck,
  Clock3,
  HelpCircle,
  LifeBuoy,
  LockKeyhole,
  MessageSquareText,
} from "lucide-react";

import { ApplicationFormSection } from "@/components/public/sections/form/ApplicationFormSection";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { SupportForm } from "@/components/public/widgets/forms/SupportForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support Centre | LearnerSlate",
  description:
    "Get help with admissions, programmes, payments, placements, certificates, accounts, and technical issues.",
};

const helpRoutes = [
  {
    icon: HelpCircle,
    title: "Find an instant answer",
    description: "Search common questions about learning, payments, placements, and certificates.",
    label: "Browse FAQs",
    href: "/faq",
  },
  {
    icon: LockKeyhole,
    title: "Existing learner ticket",
    description: "Sign in to create or continue a private ticket connected to your account.",
    label: "Open learner tickets",
    href: "/login?next=/student/tickets",
  },
  {
    icon: BookOpenCheck,
    title: "Explore before asking",
    description: "Compare published programmes, prerequisites, schedules, and outcomes.",
    label: "Browse programmes",
    href: "/programs",
  },
];

export default function SupportPage() {
  return (
    <>
      <HeroSection className="bg-[#0F172A] py-20 text-white lg:py-24">
        <CenterHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full border border-[#57CC99]/30 bg-[#57CC99]/10 px-4 py-2 text-sm font-bold text-[#8DE2D8]">
              <LifeBuoy className="size-4" />
              LearnerSlate support
            </span>
          }
          title={
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Let&apos;s get you{" "}
              <span className="text-[#FF7A0E]">unstuck.</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-[#CBD5E1]">
              Find an immediate answer, access learner tickets, or send our
              support team the details.
            </p>
          }
          stats={
            <div className="flex flex-wrap justify-center gap-6 border-t border-white/10 pt-7 text-sm text-[#CBD5E1]">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-[#57CC99]" />
                Requests receive a trackable reference
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquareText className="size-4 text-[#57CC99]" />
                Account holders can continue replies in tickets
              </span>
            </div>
          }
        />
      </HeroSection>

      <GridSection
        className="bg-[#F8FAFC]"
        title={<h2 className="text-3xl font-black text-[#0F172A]">Choose the fastest route</h2>}
        description={<p className="max-w-2xl text-[#64748B]">A support request is best for a specific issue. General questions may already have a clear published answer.</p>}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {helpRoutes.map(({ icon: Icon, title, description, label, href }) => (
            <article key={title} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#22577A]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-black text-[#0F172A]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">{description}</p>
              <Link href={href} className="mt-6 inline-flex text-sm font-black text-[#E86C0D] hover:underline">
                {label}
              </Link>
            </article>
          ))}
        </div>
      </GridSection>

      <ApplicationFormSection
        className="bg-white"
        formLabel="Public support request form"
        form={<SupportForm />}
        content={
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF7A0E]">Before you send</p>
            <h2 className="mt-3 text-3xl font-black text-[#0F172A]">Details help us solve the right problem.</h2>
            <p className="mt-4 max-w-xl leading-7 text-[#64748B]">
              Explain what you were doing, what happened, and what you expected.
              Never include passwords, OTPs, full card details, or other secrets.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Include the relevant page, programme, order, or certificate reference.",
                "For technical issues, add your browser and the exact error message.",
                "Use the email connected to your LearnerSlate account when possible.",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-xl bg-[#F8FAFC] p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#22577A] text-sm font-black text-white">{index + 1}</span>
                  <p className="text-sm leading-6 text-[#475569]">{item}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/contact">Contact and business enquiries</Link>
            </Button>
          </div>
        }
      />
    </>
  );
}
