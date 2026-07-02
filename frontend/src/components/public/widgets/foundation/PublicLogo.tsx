import * as React from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const publicLogoVariants = cva("block h-auto", {
  variants: {
    size: {
      sm: "w-32",
      md: "w-40",
      lg: "w-52",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type PublicLogoProps = Omit<
  React.ComponentProps<typeof Link>,
  "children" | "href"
> &
  VariantProps<typeof publicLogoVariants> & {
    alt?: string;
    href?: React.ComponentProps<typeof Link>["href"];
    imageClassName?: string;
    priority?: ImageProps["priority"];
    src?: ImageProps["src"];
  };

function PublicLogo({
  alt = "LearnerSlate",
  className,
  href = "/",
  imageClassName,
  priority = false,
  size,
  src = "/vaarada_logo.png",
  ...props
}: PublicLogoProps) {
  return (
    <Link
      data-slot="public-logo"
      href={href}
      aria-label="LearnerSlate home"
      className={cn(
        "inline-flex rounded-sm outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-public-teal-100",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
      {...props}
    >
      <Image
        data-slot="public-logo-image"
        src={src}
        alt={alt}
        width={506}
        height={140}
        priority={priority}
        className={cn(publicLogoVariants({ size }), imageClassName)}
      />
    </Link>
  );
}

export { PublicLogo, publicLogoVariants };
export type { PublicLogoProps };
