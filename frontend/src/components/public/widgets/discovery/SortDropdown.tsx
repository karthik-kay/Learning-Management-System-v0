"use client";

import { ArrowDownUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SortOption[];
  label?: string;
  className?: string;
}

export function SortDropdown({
  value,
  onValueChange,
  options,
  label = "Sort reviews",
  className,
}: SortDropdownProps) {
  return (
    <label
      className={cn(
        "relative flex min-w-[220px] items-center gap-2",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <ArrowDownUp className="pointer-events-none absolute left-3 size-4 text-[#64748B]" />
      <select
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-[#CBD5E1] bg-white pl-10 pr-9 text-sm font-semibold text-[#334155] outline-none transition focus:border-[#38A3A5] focus:ring-4 focus:ring-[#38A3A5]/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-xs text-[#64748B]">
        ▾
      </span>
    </label>
  );
}
