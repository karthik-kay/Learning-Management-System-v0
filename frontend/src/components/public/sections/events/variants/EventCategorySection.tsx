import { EventCard, EventCardData } from "@/components/public/widgets/cards/EventCard";
import { Grid, Inline, Stack } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type EventCategoryTone = "teal" | "blue" | "neutral" | "mint" | "orange";

interface EventCategorySectionProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  events: EventCardData[];
  flipped?: boolean;
  tone?: EventCategoryTone;
}

const eyebrowToneClasses: Record<EventCategoryTone, string> = {
  teal:
    "border-public-teal-100 bg-public-teal-50 text-public-teal-800",
  blue:
    "border-public-blue-100 bg-public-blue-50 text-public-blue-800",
  neutral:
    "border-public-neutral-200 bg-public-neutral-100 text-public-blue-800",
  mint:
    "border-public-mint-100 bg-public-mint-50 text-public-mint-800",
  orange:
    "border-public-orange-100 bg-public-orange-50 text-public-orange-800",
};

export function EventCategorySection({
  eyebrow,
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  events,
  flipped = false,
  tone = "teal",
}: EventCategorySectionProps) {
  const info = (
    <Stack gap={24}>
      <Stack gap={12}>
        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${eyebrowToneClasses[tone]}`}
        >
          {eyebrow}
        </span>
        <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#0F172A] lg:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[#6B7280]">
          {description}
        </p>
      </Stack>

      <Stack gap={12}>
        {bullets.map((bullet) => (
          <Inline key={bullet} gap={10} justify="start" align="start">
            <CheckCircle2 className="mt-0.5 size-4 text-[#38A3A5]" />
            <span className="text-sm leading-6 text-[#6B7280]">{bullet}</span>
          </Inline>
        ))}
      </Stack>

      <Button asChild className="w-fit bg-[#0F172A] text-white hover:bg-[#1E293B]">
        <Link href={ctaHref}>
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </Stack>
  );

  const cards = (
    <Stack gap={14}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} compact />
      ))}
    </Stack>
  );

  return (
    <Grid className="grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
      <div className={flipped ? "order-1 lg:order-2" : "order-1"}>
        {info}
      </div>
      <div className={flipped ? "order-2 lg:order-1" : "order-2"}>
        {cards}
      </div>
    </Grid>
  );
}

export type { EventCategoryTone };
