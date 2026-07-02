import { ArrowRight, BadgeCheck, Building2, Sparkles } from "lucide-react";
import Link from "next/link";

import { PricingCard } from "@/components/public/widgets/conversion/PricingCard";
import { PublicButton } from "@/components/public/widgets/foundation";

const plans = [
  {
    variant: "light" as const,
    plan: {
      eyebrow: "Self-paced",
      name: "Roadmap Access",
      price: "INR 999",
      cadence: "/month",
      features: [
        "Full roadmap library",
        "Community access",
        "Self-graded assessments",
        "Progress and skill tracking",
      ],
      actionLabel: "Start free trial",
      actionHref: "/register",
    },
  },
  {
    variant: "featured" as const,
    plan: {
      eyebrow: "Fast-track",
      name: "Career Program",
      price: "INR 4,999",
      cadence: "/month",
      features: [
        "Weekly mentor reviews",
        "Specialised track and projects",
        "Career-transition support",
        "Certificate on completion",
      ],
      actionLabel: "Enrol now",
      actionHref: "/programs",
    },
  },
  {
    variant: "outline" as const,
    plan: {
      eyebrow: "Institutional",
      name: "For Colleges",
      price: "Custom",
      cadence: "pricing",
      features: [
        "Cohort-based rollout",
        "Dedicated success manager",
        "Institution dashboard",
        "Placement reporting",
      ],
      actionLabel: "Talk to us",
      actionHref: "/become-partner",
    },
  },
];

const assurances = [
  {
    icon: Sparkles,
    title: "Clear inclusions",
    copy: "Every plan shows exactly what support, projects, and credentials are included.",
  },
  {
    icon: BadgeCheck,
    title: "Outcome focused",
    copy: "Upgrade only when you need mentor reviews, career support, or institutional tools.",
  },
  {
    icon: Building2,
    title: "Built to scale",
    copy: "College partnerships are shaped around cohort size, reporting, and delivery needs.",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white text-public-neutral-700">
      <section className="bg-public-blue-900 px-5 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-public-teal-300">
            Simple, intentional pricing
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Start with direction.
            <br />
            Add support when you need it.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-public-blue-100 sm:text-lg">
            Explore roadmaps independently, join a mentor-led career programme,
            or bring structured learning to your institution.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PublicButton asChild variant="conversion" size="lg">
              <Link href="#plans">
                Compare plans
                <ArrowRight />
              </Link>
            </PublicButton>
            <PublicButton asChild variant="secondary" size="lg">
              <Link href="/contact">Talk to a mentor</Link>
            </PublicButton>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-public-neutral-50 px-5 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-public-teal-700">
              Choose your level of support
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-public-blue-900 sm:text-4xl">
              Three routes, one learning system
            </h2>
            <p className="mt-4 leading-7 text-public-neutral-700">
              Move from self-directed learning to guided career outcomes without
              paying for support you do not need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map(({ plan, variant }) => (
              <PricingCard key={plan.name} plan={plan} variant={variant} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {assurances.map(({ copy, icon: Icon, title }) => (
            <article
              key={title}
              className="rounded-xl border border-public-neutral-200 bg-white p-6"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-public-teal-50 text-public-teal-700">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-5 text-lg font-extrabold text-public-neutral-900">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-public-neutral-700">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-public-orange-50 px-5 py-16 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl border border-public-orange-200 bg-white p-8 md:flex-row md:items-center lg:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-public-orange-700">
              Not sure yet?
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-public-blue-900">
              Let&apos;s choose the sensible path.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-public-neutral-700">
              Tell us your current stage, weekly availability, and target role.
              We&apos;ll help you compare the routes without the sales theatre.
            </p>
          </div>
          <PublicButton asChild variant="conversion" size="lg">
            <Link href="/contact">Talk to us</Link>
          </PublicButton>
        </div>
      </section>
    </main>
  );
}
