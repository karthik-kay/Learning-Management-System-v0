import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeIndianRupee,
  CalendarClock,
  Eye,
} from "lucide-react";

import { ApplicationFormSection } from "@/components/public/sections/form/ApplicationFormSection";
import { FAQSection } from "@/components/public/sections/faq/FAQSection";
import { SimpleFAQSection } from "@/components/public/sections/faq/variants/SimpleFAQ";
import { GridSection } from "@/components/public/sections/grid/GridSection";
import { ThreeColumnGrid } from "@/components/public/sections/grid/variants/ThreeColumnGrid";
import { HeroSection } from "@/components/public/sections/hero/HeroSection";
import { CenterHero } from "@/components/public/sections/hero/variants/CenterHero";
import { TestimonialsSection } from "@/components/public/sections/testimonials/TestimonialsSection";
import { GridTestimonials } from "@/components/public/sections/testimonials/variants/GridTestimonials";
import { VerticalTimeline } from "@/components/public/sections/timeline/variants/VerticalTimeline";
import { TestimonialCard } from "@/components/public/widgets/cards/TestimonialCard";
import { TimelineItem } from "@/components/public/widgets/display/TimelineItem";
import { InstructorApplicationForm } from "@/components/public/widgets/forms/InstructorApplicationForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become an Instructor | LearnerSlate",
  description:
    "Teach practical skills, mentor ambitious learners, and grow your professional reach with LearnerSlate.",
};

const benefits = [
  {
    icon: BadgeIndianRupee,
    title: "Earn for your expertise",
    description:
      "Build a meaningful additional income stream through live cohorts, workshops, and mentoring.",
  },
  {
    icon: CalendarClock,
    title: "Teach on your terms",
    description:
      "Choose a format and schedule that works around your professional commitments.",
  },
  {
    icon: Eye,
    title: "Grow your visibility",
    description:
      "Build authority through learner outcomes, public sessions, and a verified mentor profile.",
  },
];

const instructorFaqs = [
  {
    question: "Who can apply to become an instructor?",
    answer:
      "Working professionals, subject-matter experts, founders, and experienced educators with practical expertise can apply.",
  },
  {
    question: "Do I need previous teaching experience?",
    answer:
      "Not necessarily. Strong domain knowledge and clear communication matter most; our team helps with structure and delivery.",
  },
  {
    question: "How are instructors selected?",
    answer:
      "We review your experience, expertise, communication, and proposed learning outcomes before a short verification conversation.",
  },
  {
    question: "Can I teach while working full-time?",
    answer:
      "Yes. Cohort schedules and delivery formats are planned around instructor availability.",
  },
];

export default function BecomeInstructorPage() {
  return (
    <>
      <HeroSection className="overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
        <CenterHero
          badge={
            <span className="rounded-full border border-[#38A3A5]/40 bg-[#38A3A5]/10 px-4 py-2 text-sm font-semibold text-[#8DE2D8]">
              Teach what the industry actually needs
            </span>
          }
          title={
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Turn your experience into{" "}
              <span className="text-[#FF7A0E]">learner outcomes.</span>
            </h1>
          }
          description={
            <p className="text-lg leading-8 text-slate-300">
              Create practical learning experiences, mentor serious learners,
              and build a teaching brand without doing it alone.
            </p>
          }
          actions={
            <Button asChild size="lg" className="bg-[#FF7A0E] text-white hover:bg-[#E86C0D]">
              <Link href="#apply">Apply to teach</Link>
            </Button>
          }
          stats={
            <div className="grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div><strong className="block text-2xl">4-step</strong><span className="text-sm text-slate-400">guided onboarding</span></div>
              <div><strong className="block text-2xl">Live + async</strong><span className="text-sm text-slate-400">teaching formats</span></div>
              <div><strong className="block text-2xl">1:1</strong><span className="text-sm text-slate-400">curriculum support</span></div>
            </div>
          }
        />
      </HeroSection>

      <ApplicationFormSection
        id="apply"
        className="bg-slate-50"
        form={<InstructorApplicationForm />}
        content={
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A0E]">
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              From application to your first live class
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              We help shape your expertise into a focused, outcome-led learning
              experience.
            </p>
            <div className="mt-10">
              <VerticalTimeline
                checkpoint={<span className="text-sm font-black text-[#FF7A0E]">✓</span>}
              >
                <TimelineItem label="Step 01" title="Apply" description="Share your expertise, experience, and the topics you want to teach." />
                <TimelineItem label="Step 02" title="Get verified" description="Meet our academic team for a focused domain and delivery conversation." />
                <TimelineItem label="Step 03" title="Build the curriculum" description="Work with our team to define projects, milestones, and learner outcomes." />
                <TimelineItem label="Step 04" title="Go live" description="Launch your cohort with operational, content, and learner-support systems behind you." />
              </VerticalTimeline>
            </div>
          </div>
        }
      />

      <GridSection
        title={<h2 className="text-3xl font-black tracking-tight text-slate-950">Why teach with LearnerSlate?</h2>}
        description={<p className="max-w-2xl text-slate-600">You bring the expertise. We help turn it into a learning experience people can finish and apply.</p>}
      >
        <ThreeColumnGrid>
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#38A3A5]/10 text-[#167D7F]">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </ThreeColumnGrid>
      </GridSection>

      <TestimonialsSection className="bg-slate-950 py-16 text-white lg:py-24">
        <GridTestimonials
          title={<h2 className="text-3xl font-black">Built around the mentor, too.</h2>}
          description={<p className="max-w-2xl text-slate-300">What instructors value about turning industry experience into structured guidance.</p>}
        >
          <TestimonialCard
            quote="The curriculum team helped turn years of project experience into a clear six-week journey. I could focus on teaching and feedback."
            name={<strong>Arjun Mehta</strong>}
            role="Full-stack mentor"
            company="6-week cohort"
          />
          <TestimonialCard
            quote="Live sessions gave me a sharper professional voice, while learner questions kept the content grounded in real career needs."
            name={<strong>Meera Nair</strong>}
            role="Data mentor"
            company="Project-led learning"
          />
          <TestimonialCard
            quote="The flexible format made mentoring possible alongside my role. The strongest part was seeing learners ship portfolio-ready work."
            name={<strong>Nisha Rao</strong>}
            role="Cloud mentor"
            company="Weekend cohorts"
          />
        </GridTestimonials>
      </TestimonialsSection>

      <FAQSection className="py-16 lg:py-24">
        <SimpleFAQSection
          title="Instructor questions"
          description="The essentials before you apply. Our academic team covers the details during verification."
          faqs={instructorFaqs}
          link={{ label: "Talk to support", href: "/support" }}
        />
      </FAQSection>
    </>
  );
}
