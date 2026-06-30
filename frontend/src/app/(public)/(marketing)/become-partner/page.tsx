import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Handshake,
  Network,
  Rocket,
  Users,
} from "lucide-react";

import { CTASection } from "@/components/public/sections/cta/CTASection";
import CenterCTA from "@/components/public/sections/cta/variants/CenterCTA";
import { ApplicationFormSection } from "@/components/public/sections/form/ApplicationFormSection";
import { FAQSection } from "@/components/public/sections/faq/FAQSection";
import { SimpleFAQSection } from "@/components/public/sections/faq/variants/SimpleFAQ";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { ThreeColumnGrid } from "@/components/public/sections/grid/variants/ThreeColumnGrid";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { StatsSection } from "@/components/public/sections/stats/StatsSection";
import { TestimonialsSection } from "@/components/public/sections/testimonials/TestimonialsSection";
import { TestimonialCard } from "@/components/public/widgets/cards/TestimonialCard";
import { EnquiryForm } from "@/components/public/widgets/forms/EnquiryForm";
import { PartnerLogos } from "@/components/public/widgets/social-proof/PartnerLogos";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become a Partner | LearnerSlate",
  description:
    "Partner with LearnerSlate to deliver practical education, professional programmes, and stronger placement outcomes.",
};

const partnershipModels = [
  {
    icon: Building2,
    title: "Institution Partner",
    description:
      "Add industry-led programmes, faculty support, and project learning to your student experience.",
    fit: "For colleges, universities, and academies",
  },
  {
    icon: GraduationCap,
    title: "PRO Partner",
    description:
      "Co-create workforce learning, certification pathways, and professional upskilling programmes.",
    fit: "For training providers and professional bodies",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Partner",
    description:
      "Meet verified learners, shape job-ready skills, and build a more relevant early-talent pipeline.",
    fit: "For employers and recruitment teams",
  },
];

const partnerFaqs = [
  {
    question: "What kind of organisations can partner with LearnerSlate?",
    answer:
      "We work with educational institutions, training organisations, professional networks, employers, and placement teams.",
  },
  {
    question: "Can a partnership be customised?",
    answer:
      "Yes. The programme model, curriculum depth, delivery format, reporting, and success measures can be tailored to the partnership.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "After discovery and scope alignment, a straightforward partnership can usually move into planning within a few working weeks.",
  },
  {
    question: "Do you support co-branded programmes?",
    answer:
      "Yes. Co-branding, learner communications, certificates, and programme operations can be included in the agreed model.",
  },
];

export default function BecomePartnerPage() {
  return (
    <>
      <HeroSection className="overflow-hidden bg-[#F2FBFA] py-20 lg:py-28">
        <CenterHero
          badge={
            <span className="rounded-full border border-[#38A3A5]/25 bg-white px-4 py-2 text-sm font-bold text-[#167D7F]">
              Build better learning-to-career pathways
            </span>
          }
          title={
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Let&apos;s create outcomes{" "}
              <span className="text-[#FF7A0E]">neither of us can build alone.</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-slate-600">
              Combine your reach with our practical learning ecosystem to
              deliver programmes, talent, and measurable career progress.
            </p>
          }
          actions={
            <Button asChild size="lg" className="bg-slate-950 text-white hover:bg-slate-800">
              <Link href="#partner-enquiry">Explore a partnership</Link>
            </Button>
          }
        />
      </HeroSection>

      <GridSection
        title={<h2 className="text-3xl font-black tracking-tight text-slate-950">Choose the partnership that fits</h2>}
        description={<p className="max-w-2xl text-slate-600">Three clear starting points, each shaped around a different outcome.</p>}
      >
        <ThreeColumnGrid>
          {partnershipModels.map(({ icon: Icon, title, description, fit }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#FF7A0E]/10 text-[#FF7A0E]">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
              <p className="mt-6 border-t border-slate-100 pt-4 text-sm font-semibold text-[#167D7F]">{fit}</p>
            </article>
          ))}
        </ThreeColumnGrid>
      </GridSection>

      <StatsSection
        className="bg-slate-50"
        stats={[
          { value: "3", label: "partnership models" },
          { value: "Flexible", label: "programme delivery" },
          { value: "Outcome-led", label: "curriculum design" },
          { value: "Shared", label: "success reporting" },
        ]}
      />

      <GridSection
        className="bg-slate-50 pt-8"
        title={<h2 className="text-2xl font-black text-slate-950">One connected partnership ecosystem</h2>}
        description={<p className="text-slate-600">Designed for the organisations that move learners from education into meaningful work.</p>}
      >
        <PartnerLogos partners={["Universities", "Career cells", "Academies", "Hiring teams", "Communities", "PRO networks"]} />
      </GridSection>

      <GridSection
        title={<h2 className="text-3xl font-black tracking-tight text-slate-950">A simple route from idea to impact</h2>}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Discover", "Align on the audience, challenge, and outcome."],
            ["02", "Design", "Shape the model, curriculum, delivery, and measures."],
            ["03", "Launch", "Onboard teams and learners with a shared plan."],
            ["04", "Improve", "Review outcomes and strengthen the next cycle."],
          ].map(([step, title, description]) => (
            <article key={step} className="rounded-2xl bg-slate-950 p-6 text-white">
              <span className="text-sm font-black text-[#FF7A0E]">{step}</span>
              <h3 className="mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </GridSection>

      <TestimonialsSection className="bg-[#F2FBFA] py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Handshake className="size-10 text-[#167D7F]" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-black text-slate-950">
              Partnership should feel like a shared operating model.
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Clear ownership, visible outcomes, and a feedback loop that
              improves each delivery.
            </p>
          </div>
          <TestimonialCard
            quote="The strongest part of the partnership was the clarity: every module connected to a project, every project to a skill, and every review to a learner outcome."
            name={<strong>Academic programme lead</strong>}
            role="Institution partner"
            company="Cohort delivery"
          />
        </div>
      </TestimonialsSection>

      <ApplicationFormSection
        id="partner-enquiry"
        formLabel="Partnership enquiry form"
        form={<EnquiryForm />}
        content={
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A0E]">Start the conversation</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Tell us what you want to build.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              You do not need a finished brief. Give us the audience, the
              problem, and the outcome you care about—we will help shape the
              route forward.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                [Users, "Audience and learner profile"],
                [Network, "Delivery and integration requirements"],
                [Rocket, "Launch window and success measures"],
              ].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof Users;
                return (
                  <li key={label as string} className="flex items-center gap-3 font-semibold text-slate-800">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#38A3A5]/10 text-[#167D7F]">
                      <ItemIcon className="size-5" aria-hidden="true" />
                    </span>
                    {label as string}
                  </li>
                );
              })}
            </ul>
          </div>
        }
      />

      <FAQSection className="bg-slate-50 py-16 lg:py-24">
        <SimpleFAQSection
          title="Partnership questions"
          description="A quick overview before the discovery call."
          faqs={partnerFaqs}
          link={{ label: "Contact support", href: "/support" }}
        />
      </FAQSection>

      <CTASection className="bg-slate-950 py-16 text-white">
        <CenterCTA
          eyebrow="Build together"
          title="Have a partnership idea already?"
          description="Share it with our team and turn it into a practical next step."
          primaryAction={
            <Button asChild className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href="#partner-enquiry">Send an enquiry</Link>
            </Button>
          }
        />
      </CTASection>
    </>
  );
}
