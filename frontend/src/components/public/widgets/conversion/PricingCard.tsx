import { Check } from "lucide-react";
import Link from "next/link";

import { PublicButton } from "@/components/public/widgets/foundation";
import { cn } from "@/lib/utils";

export type PricingCardVariant = "light" | "featured" | "outline";

export interface PricingCardData {
  name: string;
  eyebrow: string;
  price: string;
  cadence?: string;
  features: string[];
  actionLabel: string;
  actionHref: string;
}

interface PricingCardProps {
  plan: PricingCardData;
  variant?: PricingCardVariant;
  className?: string;
}

const pricingStyles: Record<
  PricingCardVariant,
  {
    card: string;
    eyebrow: string;
    heading: string;
    price: string;
    cadence: string;
    feature: string;
    icon: string;
    button: "secondary" | "conversion";
  }
> = {
  light: {
    card: "border-public-neutral-200 bg-white",
    eyebrow: "text-public-neutral-500",
    heading: "text-public-neutral-900",
    price: "text-public-neutral-900",
    cadence: "text-public-neutral-500",
    feature: "text-public-neutral-700",
    icon: "text-public-mint-600",
    button: "secondary",
  },
  featured: {
    card: "border-public-blue-900 bg-public-blue-900",
    eyebrow: "text-public-orange-300",
    heading: "text-white",
    price: "text-white",
    cadence: "text-public-blue-300",
    feature: "text-public-blue-100",
    icon: "text-public-mint-400",
    button: "conversion",
  },
  outline: {
    card: "border-2 border-public-teal-500 bg-white",
    eyebrow: "text-public-teal-700",
    heading: "text-public-neutral-900",
    price: "text-public-neutral-900",
    cadence: "text-public-neutral-500",
    feature: "text-public-neutral-700",
    icon: "text-public-teal-600",
    button: "secondary",
  },
};

export function PricingCard({
  plan,
  variant = "light",
  className,
}: PricingCardProps) {
  const styles = pricingStyles[variant];

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-8",
        styles.card,
        className,
      )}
    >
      {variant === "featured" ? (
        <span className="absolute -top-3 right-7 rounded-full bg-public-orange-500 px-4 py-1.5 text-[11px] font-extrabold text-public-blue-900">
          Most popular
        </span>
      ) : null}
      <p
        className={cn(
          "text-[11px] font-extrabold uppercase tracking-[0.08em]",
          styles.eyebrow,
        )}
      >
        {plan.eyebrow}
      </p>
      <h3 className={cn("mt-3 text-xl font-extrabold", styles.heading)}>
        {plan.name}
      </h3>
      <div className="my-6 flex items-baseline gap-2">
        <strong
          className={cn(
            "text-4xl font-extrabold tracking-[-0.04em]",
            styles.price,
          )}
        >
          {plan.price}
        </strong>
        {plan.cadence ? (
          <span className={cn("text-sm", styles.cadence)}>
            {plan.cadence}
          </span>
        ) : null}
      </div>
      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn("flex gap-2 text-sm leading-6", styles.feature)}
          >
            <Check className={cn("mt-1 size-4 shrink-0", styles.icon)} />
            {feature}
          </li>
        ))}
      </ul>
      <PublicButton
        asChild
        className="w-full"
        variant={styles.button}
        size="lg"
      >
        <Link href={plan.actionHref}>{plan.actionLabel}</Link>
      </PublicButton>
    </article>
  );
}
