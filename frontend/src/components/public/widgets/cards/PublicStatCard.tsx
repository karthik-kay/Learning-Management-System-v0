import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const publicStatCardVariants = cva(
  [
    "grid gap-4 rounded-xl border border-public-neutral-200 bg-white p-[22px]",
    "[&_[data-slot='public-stat-label']]:text-public-neutral-600",
  ],
  {
    variants: {
      tone: {
        default:
          "[&_[data-slot='public-stat-value']]:text-public-blue-900",
        info:
          "[&_[data-slot='public-stat-value']]:text-public-teal-700",
        positive:
          "[&_[data-slot='public-stat-value']]:text-public-mint-700",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type PublicStatCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof publicStatCardVariants> & {
    actions?: React.ReactNode;
    logo?: React.ReactNode;
    metric: React.ReactNode;
  };

function PublicStatCard({
  actions,
  className,
  logo,
  metric,
  tone,
  ...props
}: PublicStatCardProps) {
  return (
    <div
      data-slot="public-stat-card"
      className={cn(publicStatCardVariants({ tone }), className)}
      {...props}
    >
      {logo ? <div data-slot="public-stat-card-logo">{logo}</div> : null}
      <div data-slot="public-stat-card-metric">{metric}</div>
      {actions ? (
        <div data-slot="public-stat-card-actions">{actions}</div>
      ) : null}
    </div>
  );
}

export { PublicStatCard, publicStatCardVariants };
export type { PublicStatCardProps };
