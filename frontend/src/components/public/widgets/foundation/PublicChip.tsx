import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const publicChipVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border font-semibold",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-public-teal-100",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  ],
  {
    variants: {
      variant: {
        neutral: [
          "border-public-neutral-200 bg-public-neutral-100 text-public-neutral-700",
          "[&_[data-slot='public-chip-dot']]:bg-public-neutral-500",
        ],
        brand: [
          "border-public-blue-200 bg-public-blue-50 text-public-blue-700",
          "[&_[data-slot='public-chip-dot']]:bg-public-blue-500",
        ],
        accent: [
          "border-public-orange-200 bg-public-orange-50 text-public-orange-700",
          "[&_[data-slot='public-chip-dot']]:bg-public-orange-500",
        ],
        info: [
          "border-public-teal-200 bg-public-teal-50 text-public-teal-700",
          "[&_[data-slot='public-chip-dot']]:bg-public-teal-500",
        ],
        success: [
          "border-public-mint-200 bg-public-mint-50 text-public-mint-800",
          "[&_[data-slot='public-chip-dot']]:bg-public-mint-500",
        ],
        muted: [
          "border-public-neutral-200 bg-public-neutral-100 text-public-neutral-500",
          "[&_[data-slot='public-chip-dot']]:bg-public-neutral-400",
        ],
        outline: [
          "border-public-neutral-200 bg-white text-public-blue-800",
          "hover:border-public-blue-200 hover:bg-public-blue-50",
          "[&_[data-slot='public-chip-dot']]:bg-public-neutral-400",
        ],
      },
      size: {
        sm: "min-h-5 gap-1 px-2.5 py-0.5 text-[11px]",
        md: "min-h-6 gap-1.5 px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

type PublicChipProps = Omit<
  React.ComponentProps<typeof Badge>,
  "variant"
> &
  VariantProps<typeof publicChipVariants> & {
    dot?: boolean;
  };

function PublicChip({
  children,
  className,
  dot = false,
  size,
  variant,
  ...props
}: PublicChipProps) {
  return (
    <Badge
      data-slot="public-chip"
      variant="unstyled"
      className={cn(publicChipVariants({ variant, size, className }))}
      {...props}
    >
      {dot ? (
        <span
          data-slot="public-chip-dot"
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full"
        />
      ) : null}
      {children}
    </Badge>
  );
}

export { PublicChip, publicChipVariants };
export type { PublicChipProps };
