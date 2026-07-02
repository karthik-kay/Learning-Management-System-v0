import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const publicLinkVariants = cva(
  [
    "inline-flex items-center gap-2 font-semibold",
    "outline-none transition-colors",
    "focus-visible:rounded-sm focus-visible:ring-[3px]",
    "focus-visible:ring-public-teal-100 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-transparent",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-public-teal-700 underline decoration-public-teal-200 underline-offset-4",
          "hover:text-public-teal-800 hover:decoration-public-teal-500",
        ],
        subtle: [
          "border-b border-public-blue-300 pb-1 text-public-blue-800",
          "hover:border-public-teal-500 hover:text-public-teal-700",
        ],
        inverse: [
          "text-white underline decoration-public-blue-400 underline-offset-4",
          "hover:text-public-teal-300 hover:decoration-public-teal-300",
        ],
        nav: [
          "min-h-10 rounded-md px-4 py-2.5 leading-5 text-public-blue-800",
          "hover:bg-public-orange-50 hover:text-public-orange-700",
          "focus-visible:ring-public-orange-200",
        ],
      },
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type PublicLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof publicLinkVariants>;

function PublicLink({ className, variant, size, ...props }: PublicLinkProps) {
  return (
    <Link
      data-slot="public-link"
      className={cn(publicLinkVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { PublicLink, publicLinkVariants };
export type { PublicLinkProps };
