import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const publicStatValueVariants = cva(
  "font-mono font-semibold leading-none tracking-tight tabular-nums",
  {
    variants: {
      tone: {
        default: "text-public-blue-900",
        info: "text-public-teal-700",
        positive: "text-public-mint-700",
      },
      size: {
        sm: "text-2xl",
        md: "text-[30px]",
        lg: "text-4xl",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  },
);

type PublicStatProps = React.ComponentProps<"div"> &
  VariantProps<typeof publicStatValueVariants> & {
    label: React.ReactNode;
    labelClassName?: string;
    value: React.ReactNode;
    valueClassName?: string;
  };

function PublicStat({
  className,
  label,
  labelClassName,
  size,
  tone,
  value,
  valueClassName,
  ...props
}: PublicStatProps) {
  return (
    <div data-slot="public-stat" className={cn("grid gap-1", className)} {...props}>
      <p
        data-slot="public-stat-value"
        className={cn(
          publicStatValueVariants({ tone, size }),
          valueClassName,
        )}
      >
        {value}
      </p>
      <p
        data-slot="public-stat-label"
        className={cn("text-[13px] text-public-neutral-600", labelClassName)}
      >
        {label}
      </p>
    </div>
  );
}

export { PublicStat, publicStatValueVariants };
export type { PublicStatProps };
