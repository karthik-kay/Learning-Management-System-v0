import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const publicButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-lg font-semibold transition-colors",
    "outline-none active:brightness-90",
    "focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:pointer-events-none disabled:bg-public-neutral-200 disabled:text-public-neutral-500 disabled:opacity-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        conversion: [
          "bg-public-orange-500 text-public-blue-900",
          "hover:bg-public-orange-400 active:bg-public-orange-600",
          "focus-visible:ring-public-orange-200",
        ],
        primary: [
          "bg-public-blue-800 text-white",
          "hover:bg-public-blue-900 active:bg-public-blue-900",
          "focus-visible:ring-public-blue-200",
        ],
        secondary: [
          "border border-public-blue-300 bg-white text-public-blue-800",
          "hover:bg-public-blue-50 active:bg-public-blue-100",
          "focus-visible:ring-public-blue-200",
        ],
        tertiary: [
          "bg-transparent text-public-teal-700",
          "hover:bg-public-teal-50 active:bg-public-teal-100",
          "focus-visible:ring-public-teal-100",
        ],
        destructive: [
          "bg-public-error-700 text-white",
          "hover:bg-public-error-800 active:bg-public-error-800",
          "focus-visible:ring-public-error-500/30",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-11 px-5 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-14 px-6 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type PublicButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
> &
  VariantProps<typeof publicButtonVariants>;

function PublicButton({
  className,
  variant,
  size,
  ...props
}: PublicButtonProps) {
  return (
    <Button
      data-slot="public-button"
      variant="unstyled"
      size="unstyled"
      className={cn(publicButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { PublicButton, publicButtonVariants };
export type { PublicButtonProps };
