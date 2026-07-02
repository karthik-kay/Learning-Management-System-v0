import { ArrowUpRight, LineChart } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import {
  PublicButton,
  PublicChip,
} from "@/components/public/widgets/foundation";
import { cn } from "@/lib/utils";

export interface CareerCardData {
  title: string;
  tag: string;
  description: string;
  salary: string;
  skills: string[];
  slug?: string;
}

interface CareerCardProps {
  career: CareerCardData;
  className?: string;
  index?: number;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}

const careerTagTones = {
  "best seller": "accent",
  hot: "info",
  trending: "brand",
  "high demand": "success",
  advanced: "neutral",
  "creative tech": "muted",
} as const;

export function CareerCard({
  career,
  className,
  index,
  primaryAction,
  secondaryAction,
}: CareerCardProps) {
  const href = `/career-path/${career.slug ?? slugify(career.title)}`;
  const tagTone =
    careerTagTones[
      career.tag.toLowerCase() as keyof typeof careerTagTones
    ] ?? "neutral";

  return (
    <Card
      data-slot="career-card"
      className={cn(
        "grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-4 rounded-2xl border-public-neutral-200 bg-white p-5 py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        "lg:grid-cols-[40px_minmax(0,1fr)_140px_auto] lg:items-center lg:gap-6 lg:px-[26px] lg:py-[22px]",
        className,
      )}
    >
      <span className="font-mono text-base font-semibold text-public-neutral-300 tabular-nums lg:text-xl">
        {typeof index === "number"
          ? String(index + 1).padStart(2, "0")
          : ""}
      </span>

      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-extrabold tracking-[-0.01em] text-public-blue-900">
            {career.title}
          </h3>
          <PublicChip variant={tagTone} size="sm">
            {career.tag}
          </PublicChip>
        </div>

        <p className="mb-2.5 hidden text-[12.5px] leading-normal text-public-neutral-500 sm:block">
          {career.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {career.skills.map((skill) => (
            <PublicChip key={skill} variant="neutral" size="sm">
              {skill}
            </PublicChip>
          ))}
        </div>
      </div>

      <div className="col-start-2 min-w-0 lg:col-auto lg:text-right">
        <strong className="block font-mono text-base font-semibold text-public-mint-700 tabular-nums lg:text-[17px]">
          {career.salary}
        </strong>
        <span className="text-[10.5px] font-medium uppercase tracking-[0.04em] text-public-neutral-400">
          Starting range
        </span>
      </div>

      <div className="col-span-2 flex flex-wrap gap-2 lg:col-auto lg:justify-end [&>*]:min-w-0 [&>*]:flex-1 lg:[&>*]:flex-none">
        {secondaryAction ?? (
          <PublicButton variant="secondary" size="sm">
            <LineChart className="size-4" />
            Syllabus
          </PublicButton>
        )}
        {primaryAction ?? (
          <PublicButton asChild variant="primary" size="sm">
            <Link href={href}>
              View path
              <ArrowUpRight className="size-4" />
            </Link>
          </PublicButton>
        )}
      </div>
    </Card>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export type { CareerCardProps };
