import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const contactCardVariants = cva(
  [
    "group flex h-full flex-col gap-0 rounded-2xl border p-5 py-5",
    "shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
    "transition-[transform,border-color,box-shadow] duration-200",
    "hover:-translate-y-1",
  ],
  {
    variants: {
      tone: {
        orange: [
          "border-public-orange-100 bg-public-orange-50/35 hover:border-public-orange-300",
          "hover:shadow-[0_16px_40px_rgba(255,122,14,0.1)]",
          "[&_[data-slot='contact-card-icon']]:border-public-orange-100",
          "[&_[data-slot='contact-card-icon']]:bg-white",
          "[&_[data-slot='contact-card-icon']]:text-public-orange-700",
        ],
        teal: [
          "border-public-teal-100 bg-public-teal-50/35 hover:border-public-teal-300",
          "hover:shadow-[0_16px_40px_rgba(56,163,165,0.12)]",
          "[&_[data-slot='contact-card-icon']]:border-public-teal-100",
          "[&_[data-slot='contact-card-icon']]:bg-white",
          "[&_[data-slot='contact-card-icon']]:text-public-teal-700",
        ],
        blue: [
          "border-public-blue-100 bg-public-blue-50/40 hover:border-public-blue-300",
          "hover:shadow-[0_16px_40px_rgba(34,87,122,0.12)]",
          "[&_[data-slot='contact-card-icon']]:border-public-blue-100",
          "[&_[data-slot='contact-card-icon']]:bg-white",
          "[&_[data-slot='contact-card-icon']]:text-public-blue-700",
        ],
        mint: [
          "border-public-mint-100 bg-public-mint-50/40 hover:border-public-mint-300",
          "hover:shadow-[0_16px_40px_rgba(87,204,153,0.12)]",
          "[&_[data-slot='contact-card-icon']]:border-public-mint-100",
          "[&_[data-slot='contact-card-icon']]:bg-white",
          "[&_[data-slot='contact-card-icon']]:text-public-mint-800",
        ],
      },
    },
    defaultVariants: {
      tone: "teal",
    },
  },
);

interface ContactCardProps extends VariantProps<typeof contactCardVariants> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ContactCard({
  icon,
  title,
  description,
  action,
  className,
  tone,
}: ContactCardProps) {
  return (
    <Card
      data-slot="contact-card"
      className={cn(contactCardVariants({ tone }), className)}
    >
      <span
        data-slot="contact-card-icon"
        className="flex size-10 items-center justify-center rounded-full border [&_svg]:size-5"
      >
        {icon}
      </span>

      <div className="mt-4 text-base font-extrabold text-public-blue-900 [&_h3]:text-base [&_h3]:font-extrabold [&_h3]:text-public-blue-900">
        {title}
      </div>

      <div className="mt-1.5 flex-1 text-sm leading-6 text-public-neutral-500 [&_p]:text-public-neutral-500">
        {description}
      </div>

      {action ? (
        <div className="mt-4 flex justify-center">{action}</div>
      ) : null}
    </Card>
  );
}

export { contactCardVariants };
export type { ContactCardProps };
