import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AudienceCardProps {
  icon?: ReactNode;

  title: ReactNode;

  description?: ReactNode;

  features?: ReactNode;

  actions?: ReactNode;

  className?: string;
}

export function AudienceCard({
  icon,
  title,
  description,
  features,
  actions,
  className,
}: AudienceCardProps) {
  return (
    <Card
      data-slot="audience-card"
      className={cn(
        "h-full gap-0 rounded-2xl border-public-neutral-200 bg-white p-[22px] py-[22px]",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {icon ? (
        <div
          data-slot="audience-card-icon"
          className="mb-3.5 flex size-10 items-center justify-center rounded-[11px] bg-public-teal-50 text-public-teal-700 [&_svg]:size-[18px]"
        >
          {icon}
        </div>
      ) : null}

      <div
        data-slot="audience-card-title"
        className="mb-1.5 text-base font-extrabold tracking-[-0.01em] text-public-blue-900 [&>*]:!m-0 [&>*]:!text-base [&>*]:!font-extrabold [&>*]:!text-public-blue-900"
      >
        {title}
      </div>

      {description ? (
        <div
          data-slot="audience-card-description"
          className="mb-4 text-[13px] leading-[1.55] text-public-neutral-500 [&>*]:!m-0 [&>*]:!text-[13px] [&>*]:!leading-[1.55] [&>*]:!text-public-neutral-500"
        >
          {description}
        </div>
      ) : null}

      {features ? (
        <div
          data-slot="audience-card-features"
          className="mb-5 flex-1 text-[12.5px] leading-relaxed text-public-neutral-600 [&>div]:!gap-2 [&_p]:!text-[12.5px] [&_p]:!text-public-neutral-600"
        >
          {features}
        </div>
      ) : null}

      {actions ? (
        <div
          data-slot="audience-card-actions"
          className="mt-auto [&>*]:w-full"
        >
          {actions}
        </div>
      ) : null}
    </Card>
  );
}

export type { AudienceCardProps };
