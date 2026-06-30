"use client";

import { cn } from "@/lib/utils";

export interface CategoryTab {
  label: string;
  value: string;
  count?: number;
}

interface CategoryTabsProps {
  categories: CategoryTab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

export function CategoryTabs({
  categories,
  value,
  onValueChange,
  className,
  ariaLabel = "Content categories",
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {categories.map((category) => {
        const active = category.value === value;

        return (
          <button
            key={category.value || "all"}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(category.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38A3A5] focus-visible:ring-offset-2",
              active
                ? "border-[#0F172A] bg-[#0F172A] text-white"
                : "border-[#E9EAF0] bg-white text-[#475569] hover:border-[#38A3A5] hover:text-[#22577A]",
            )}
          >
            {category.label}
            {typeof category.count === "number" && (
              <span
                className={cn(
                  "text-xs",
                  active ? "text-white/70" : "text-[#94A3B8]",
                )}
              >
                {category.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
