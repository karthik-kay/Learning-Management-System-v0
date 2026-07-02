import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";

import {
  PublicButton,
  PublicChip,
} from "@/components/public/widgets/foundation";
import { cn } from "@/lib/utils";

export type ProgramCardVariant =
  | "light"
  | "featured"
  | "muted"
  | "info"
  | "success";

export interface ProgramCardData {
  title: string;
  audience: string;
  description: string;
  duration: string;
  price: string;
  skills: string[];
  href: string;
  eyebrow?: string;
  cohortDate?: string;
}

interface ProgramCardProps {
  program: ProgramCardData;
  variant?: ProgramCardVariant;
  className?: string;
}

const variantStyles: Record<
  ProgramCardVariant,
  {
    card: string;
    eyebrow: string;
    heading: string;
    audience: string;
    copy: string;
    divider: string;
    meta: string;
    chip: "outline" | "brand" | "info" | "success";
    button: "primary" | "conversion" | "tertiary";
  }
> = {
  light: {
    card: "border-public-neutral-200 bg-white",
    eyebrow: "text-public-neutral-500",
    heading: "text-public-neutral-900",
    audience: "text-public-neutral-500",
    copy: "text-public-neutral-700",
    divider: "border-public-neutral-200",
    meta: "text-public-blue-900",
    chip: "outline",
    button: "primary",
  },
  featured: {
    card: "border-public-blue-900 bg-public-blue-900",
    eyebrow: "text-public-teal-300",
    heading: "text-white",
    audience: "text-public-blue-300",
    copy: "text-public-blue-100",
    divider: "border-white/15",
    meta: "text-white",
    chip: "brand",
    button: "conversion",
  },
  muted: {
    card: "border-public-neutral-200 bg-public-neutral-50",
    eyebrow: "text-public-neutral-500",
    heading: "text-public-neutral-900",
    audience: "text-public-neutral-500",
    copy: "text-public-neutral-700",
    divider: "border-public-neutral-300",
    meta: "text-public-blue-900",
    chip: "outline",
    button: "primary",
  },
  info: {
    card: "border-public-teal-200 bg-public-teal-50",
    eyebrow: "text-public-teal-700",
    heading: "text-public-teal-900",
    audience: "text-public-teal-700",
    copy: "text-public-neutral-700",
    divider: "border-public-teal-200",
    meta: "text-public-teal-900",
    chip: "info",
    button: "tertiary",
  },
  success: {
    card: "border-public-mint-200 bg-public-mint-50",
    eyebrow: "text-public-mint-800",
    heading: "text-public-mint-900",
    audience: "text-public-mint-800",
    copy: "text-public-neutral-700",
    divider: "border-public-mint-200",
    meta: "text-public-mint-900",
    chip: "success",
    button: "tertiary",
  },
};

export function ProgramCard({
  program,
  variant = "light",
  className,
}: ProgramCardProps) {
  const styles = variantStyles[variant];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border p-6 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none",
        styles.card,
        className,
      )}
    >
      <p
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.08em]",
          styles.eyebrow,
        )}
      >
        {program.eyebrow ?? "Career program"}
      </p>
      <h3
        className={cn(
          "mt-3 text-xl font-extrabold tracking-[-0.02em]",
          styles.heading,
        )}
      >
        {program.title}
      </h3>
      <p className={cn("mt-1 text-sm", styles.audience)}>
        {program.audience}
      </p>

      <div className="mt-5 flex flex-wrap gap-6">
        <CardMeta
          icon={<Clock3 />}
          label="Duration"
          value={program.duration}
          className={styles.meta}
        />
        <CardMeta
          icon={<CalendarDays />}
          label={program.cohortDate ? "Next cohort" : "Starting at"}
          value={program.cohortDate ?? program.price}
          className={styles.meta}
        />
      </div>

      <p className={cn("mt-5 text-sm leading-6", styles.copy)}>
        {program.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {program.skills.map((skill) => (
          <PublicChip key={skill} variant={styles.chip} size="sm">
            {skill}
          </PublicChip>
        ))}
      </div>

      <div
        className={cn(
          "mt-auto flex items-end justify-between gap-4 border-t pt-5",
          styles.divider,
        )}
      >
        <div>
          <strong className={cn("block text-lg font-extrabold", styles.meta)}>
            {program.price}
          </strong>
          <span className={cn("text-xs", styles.audience)}>per month</span>
        </div>
        <PublicButton asChild variant={styles.button} size="sm">
          <Link href={program.href}>
            View program
            <ArrowRight />
          </Link>
        </PublicButton>
      </div>
    </article>
  );
}

function CardMeta({
  className,
  icon,
  label,
  value,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className={cn("mt-0.5 [&_svg]:size-4", className)}>{icon}</span>
      <span>
        <strong className={cn("block text-sm font-extrabold", className)}>
          {value}
        </strong>
        <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-public-neutral-500">
          {label}
        </span>
      </span>
    </div>
  );
}
